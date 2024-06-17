import usePosts from "../hooks/usePosts.ts";
import React from "react";


const TodoList = () => {
    const pageSize = 10;
    const {data, error, isLoading, fetchNextPage, isFetchingNextPage} = usePosts({pageSize});

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <>
            <table className='table'>
                {data.pages.map((page, index) =>
                    <React.Fragment key={index}>
                        {page.map(post => <tr className='table-light' key={post.id}>{post.title}</tr>)}
                    </React.Fragment>)}
            </table>
            <button
                onClick={() => fetchNextPage()}
                className="btn btn-primary my-3 ms-1"
                disabled={isFetchingNextPage}
            >{isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
        </>
    );
};

export default TodoList;