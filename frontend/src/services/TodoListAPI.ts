import axios from "axios";
import { Todo, NewTodoData, UpdateTodoData } from "../types";

const getAll = async () => {
  const response = await axios.get<Todo[]>("/api/todos");
  return response.data;
};

const create = async (data: NewTodoData) => {
  const response = await axios.post("/api/todos", data);
  return response.data;
};

const deleteTodo = async (id: number) => {
  await axios.delete(`/api/todos/${id}`);
};

const update = async (id: number, values: UpdateTodoData) => {
  const response = await axios.put(`/api/todos/${id}`, values);
  return response.data;
};

export default { getAll, create, deleteTodo, update };
