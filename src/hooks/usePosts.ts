import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants.ts";
import postService, {Post, PostQuery} from "../services/postService.ts";

const UsePosts = (query: PostQuery) => {
    return useInfiniteQuery<Post[], Error>({
        queryKey: [CACHE_KEY_TODOS, query],
        queryFn: postService.getAll,
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
    });
}

export default UsePosts;


// const fetchPosts = ({pageParam = 1}) => axios
//     .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
//         params: {
//             _start: (pageParam - 1) * query.pageSize,
//             _limit: query.pageSize
//         }
//     })
//     .then(res => res.data)