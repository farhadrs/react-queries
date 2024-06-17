import axios from "axios";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostQuery {
    page: number;
    pageSize: number;
}

const UsePosts = (query: PostQuery) => {
    const fetchPosts = () => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _start: (query.page - 1) * query.pageSize,
                _limit: query.pageSize
            }
        })
        .then(res => res.data)

    return useQuery<Post[], Error>({
        queryKey: ['posts', query],
        queryFn: fetchPosts,
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData,
    });
}

export default UsePosts;