import {useRef} from "react";
import useAddTodo from "../hooks/useAddTodo.ts";


const TodoForm = () => {
    const ref = useRef<HTMLInputElement>(null);
    const writeTodo = useAddTodo(() => {
        if (ref.current) ref.current.value = '';
    })

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