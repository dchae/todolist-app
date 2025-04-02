import { useState, useEffect } from "react";
import "./App.css";
import TodoService from "./services/TodoListAPI.ts";
import Nav from "./components/Nav";
import Group from "./components/Group";
import FormModal from "./components/FormModal";
import { Todo, NewTodoData, UpdateTodoData, Filter } from "./types";
import utils from "./utils.ts";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [curTodo, setCurTodo] = useState<Todo | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    TodoService.getAll().then((data) => setTodos(data));
  }, []);

  const createTodo = async (data: NewTodoData) => {
    try {
      const created = await TodoService.create(data);
      setTodos(todos.concat(created));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  const updateTodo = async ({ id, ...newValues }: UpdateTodoData) => {
    try {
      if (typeof id !== "number") throw new Error("invalid id");
      const updated = await TodoService.update(id, newValues);
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (e: unknown) {
      utils.handleAPIError(e);
    }
  };

  return (
    <>
      <div id="wrapper">
        <Nav todos={todos} filter={filter} setFilter={setFilter} />
        <Group
          todos={todos}
          filter={filter}
          openModal={() => setModalOpen(true)}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          setCurTodo={setCurTodo}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        curTodo={curTodo}
        setCurTodo={setCurTodo}
        createTodo={createTodo}
        updateTodo={updateTodo}
        setFilter={setFilter}
      />
    </>
  );
};

export default App;
