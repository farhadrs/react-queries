import APIClient from "./apiClient.ts";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostQuery {
    pageSize: number;
}

export default new APIClient('/posts');