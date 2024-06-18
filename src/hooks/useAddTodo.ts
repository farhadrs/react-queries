import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants.ts";
import todoService, {Todo} from "../services/todoService.ts";

interface AddTodoContext {
    previousTodos: Todo[];
}

const UseAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.post,
        // If the call to API was success
        // Approach #3: Optimistic update
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
            queryClient.setQueryData<Todo[]>(
                CACHE_KEY_TODOS,
                todos =>
                    [newTodo, ...(todos || [])
                    ]);
            onAdd();
            return {previousTodos};
        },
        // Pessimistic Update
        onSuccess: (respondedTodo, newTodo) => {

            //     Approach #1: Invalidation the cache
            // queryClient.invalidateQueries({
            //     queryKey: CACHE_KEY_TODOS
            // })

            // Approach #2: Update data in the cache directly
            // queryClient.setQueryData<Todo[]>(
            //     CACHE_KEY_TODOS,
            //     todos =>
            //         [respondedTodo, ...(todos || [])
            //         ]);
            // if (ref.current) ref.current.value = '';

            //  Implementing Approach #3
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS,
                (todos) =>
                    todos?.map((todo) =>
                        todo === newTodo ? respondedTodo : todo));
        },

        onError: (error, newTodo, context) => {
            if (!context) return;
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
            console.log(error, newTodo);
        }
    });
}

export default UseAddTodo;