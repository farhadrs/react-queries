// Single instance of our API client
import APIClient from "./apiClient.ts";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export default new APIClient<Todo>('/todos');
