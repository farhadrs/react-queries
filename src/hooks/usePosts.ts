import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const UsePosts = (userId: number | undefined) => {
    const fetchPosts = () => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {params: {userId}})
        .then(res => res.data)

    return useQuery<Post[], Error>({
        queryKey: userId ? ['users', userId, 'posts'] : [],
        queryFn: fetchPosts,
        staleTime: 10 * 1000,
    });
}

export default UsePosts;