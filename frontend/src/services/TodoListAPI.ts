import axios from "axios";
import { Todo } from "../types";

const getAll = async () => {
  const response = await axios.get<Todo[]>("/api/todos");
  return response.data;
};

export default { getAll };
