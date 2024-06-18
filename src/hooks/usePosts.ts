import axios from "axios";
import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants.ts";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostQuery {
    pageSize: number;
}

const UsePosts = (query: PostQuery) => {
    const fetchPosts = ({pageParam = 1}) => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _start: (pageParam - 1) * query.pageSize,
                _limit: query.pageSize
            }
        })
        .then(res => res.data)

    return useInfiniteQuery<Post[], Error>({
        queryKey: [CACHE_KEY_TODOS, query],
        queryFn: fetchPosts,
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
    });
}

export default UsePosts;