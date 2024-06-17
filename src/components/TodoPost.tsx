import usePosts from "../hooks/usePosts.ts";
import {useState} from "react";

const TodoList = () => {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const {data, error, isLoading} = usePosts({page, pageSize});

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <>
            <table className='table'>
                {data?.map((post) => <tr className='table-light' key={post.id}>{post.title}</tr>)}
            </table>
            <button
                onClick={() => setPage(page + 1)}
                className="btn btn-primary my-3 ms-1">Next
            </button>
            <button
                disabled={page === 1}
                className="btn btn-primary my-3 ms-1"
                onClick={() => setPage(page - 1)}>Previous
            </button>
        </>
    );
};

export default TodoList;