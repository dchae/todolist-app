import { useState, useEffect, useMemo } from "react";
import "./App.css";
import TodoService from "./services/TodoListAPI.ts";
import Nav from "./components/Nav";
import Group from "./components/Group";
import FormModal from "./components/FormModal";
import { Todo, Filter, GroupName, TodosHook } from "./types";
import utils from "./utils";

const useTodos = (): TodosHook => {
  const [all, setAll] = useState<Todo[]>([]);
  const defaultFilter: Filter = { date: undefined, completedOnly: false };
  const [filter, setFilter] = useState(defaultFilter);

  const filtered = useMemo(() => {
    return all.filter((todo) => {
      const date = utils.toDateStr(todo.month, todo.year);
      if (filter.date !== undefined && filter.date !== date) return false;
      if (filter.completedOnly) return todo.completed;
      return true;
    });
  }, [all, filter]);

  const activeGroupName = useMemo(() => {
    let name;
    if (filter.date === undefined) {
      name = filter.completedOnly ? "Completed" : "All Todos";
    } else {
      name = filter.date;
    }
    return name as GroupName;
  }, [filter]);

  return { all, setAll, filter, setFilter, filtered, activeGroupName };
};

const App = () => {
  const todos = useTodos();
  useEffect(() => {
    TodoService.getAll().then((data) => todos.setAll(data));
  }, [todos]);

  return (
    <>
      <div id="wrapper">
        <Nav />
        <Group todos={todos} />
      </div>

      <FormModal />
    </>
  );
};

export default App;
