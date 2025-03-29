import axios from "axios";
import { Todo, FormData } from "../types";

const getAll = async () => {
  const response = await axios.get<Todo[]>("/api/todos");
  return response.data;
};

const create = async (data: FormData) => {
  const response = await axios.post("/api/todos", data);
  return response.data;
};

const deleteTodo = async (id: number) => {
  await axios.delete(`/api/todos/${id}`);
};

export default { getAll, create, deleteTodo };
