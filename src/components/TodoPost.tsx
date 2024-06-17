import usePosts from "../hooks/usePosts.ts";
import {useState} from "react";

const TodoList = () => {
    const [userId, setUserId] = useState<number>();
    const {data, error, isLoading} = usePosts(userId);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <>
            <select
                onChange={(event) => setUserId(parseInt(event.target.value))}
                value={userId}
                className='form-select mb-3'>
                <option value=''></option>
                <option value='1'>User 1</option>
                <option value='2'>User 2</option>
                <option value='3'>User 3</option>
            </select>
            <table className='table'>
                {data?.map((post) => <tr className='table-light' key={post.id}>{post.title}</tr>)}
            </table>
        </>
    );
};

export default TodoList;