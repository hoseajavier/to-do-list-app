import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const getTodos = (params = {}) => api.get("/todos", { params });
export const addTodo = (data) => api.post("/todos", data);
export const updateTodoStatus = (id, data) => api.patch(`/todos/${id}`, data);
export const updateTodo = (id, data) => api.patch(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);