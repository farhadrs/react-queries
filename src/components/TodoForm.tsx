import {useRef} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "../hooks/useTodos.ts";
import axios from "axios";

interface AddTodoContext {
    previousTodos: Todo[];
}

const TodoForm = () => {
    const queryClient = useQueryClient();
    const writeTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (todo: Todo) =>
            axios
                .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
                .then(res => res.data),
        // If the call to API was success
        // Approach #3: Optimistic update
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
            queryClient.setQueryData<Todo[]>(
                ['todos'],
                todos =>
                    [newTodo, ...(todos || [])
                    ]);
            if (ref.current) ref.current.value = '';
            return {previousTodos};
        },
        // Pessimistic Update
        onSuccess: (respondedTodo, newTodo) => {

            //     Approach #1: Invalidation the cache
            // queryClient.invalidateQueries({
            //     queryKey: ['todos']
            // })

            // Approach #2: Update data in the cache directly
            // queryClient.setQueryData<Todo[]>(
            //     ['todos'],
            //     todos =>
            //         [respondedTodo, ...(todos || [])
            //         ]);
            // if (ref.current) ref.current.value = '';

            //  Implementing Approach #3
            queryClient.setQueryData<Todo[]>(['todos'],
                (todos) =>
                    todos?.map((todo) =>
                        todo === newTodo ? respondedTodo : todo));
        },

        onError: (error, newTodo, context) => {
            if (!context) return;
            queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
        }
    });

    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            {writeTodo.error && (
                <div className="alert alert-danger">
                    {writeTodo.error.message}
                </div>
            )}
            <form className="row mb-3" onSubmit={event => {
                event.preventDefault();
                // Check if there's an entry to send to the api
                if (ref.current && ref.current.value)
                    // Send hardcoded data to server
                    writeTodo.mutate({
                        id: 0,
                        title: ref.current?.value,
                        completed: false,
                        userId: 1
                    });
            }}>
                <div className="col">
                    <input ref={ref} type="text" className="form-control"/>
                </div>
                <div className="col">
                    <button className="btn btn-primary">{writeTodo.isPending ? 'Adding ...' : "Add"}</button>
                </div>
            </form>
        </>
    )
}

export default TodoForm;