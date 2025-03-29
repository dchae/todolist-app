import { useState, useReducer, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import TodoService from "./services/TodoListAPI.ts";
import Nav from "./components/Nav";
import Group from "./components/Group";
import FormModal from "./components/FormModal";
import {
  Todo,
  Filter,
  GroupName,
  TodosHook,
  FormData,
  FormDataAction,
} from "./types";
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

  const deleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setAll(all.filter((todo) => todo.id !== id));
    } catch (e: unknown) {
      let msg = "An unknown error occurred.";
      if (axios.isAxiosError(e)) {
        if (e.response?.data) {
          msg = e.response.data;
        } else if (e.status === 404) {
          msg = "404 not found";
        }
      } else if (e instanceof Error) {
        msg = e.message;
      }
      alert(msg);
    }
  };

  const create = async (data: FormData) => {
    try {
      const created = await TodoService.create(data);
      setAll(all.concat(created));
    } catch (e: unknown) {
      let msg = "An unknown error occurred.";
      if (axios.isAxiosError(e) && e.response?.data) {
        msg = e.response.data;
      } else if (e instanceof Error) {
        msg = e.message;
      }
      alert(msg);
    }
  };

  return {
    all,
    setAll,
    filter,
    setFilter,
    filtered,
    activeGroupName,
    deleteTodo,
    create,
  };
};

const emptyFormData: FormData = {
  title: "",
  day: "",
  month: "",
  year: "",
  description: "",
};

const formDataReducer = (state: FormData, action: FormDataAction) => {
  const newState: FormData = { ...state };
  if ("reset" in action && action.reset) return emptyFormData;

  switch (action.field) {
    case "title":
      newState.title = action.newValue;
      break;
    case "day":
      newState.day = action.newValue;
      break;
    case "month":
      newState.month = action.newValue;
      break;
    case "year":
      newState.year = action.newValue;
      break;
    case "description":
      newState.description = action.newValue;
      break;
    default:
      throw new Error(
        `Unexpected action field. Action: ${JSON.stringify(action)}`,
      );
  }

  return newState;
};

const App = () => {
  const todos = useTodos();
  const setAll = todos.setAll;
  useEffect(() => {
    TodoService.getAll().then((data) => setAll(data));
  }, [setAll]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, formDataDispatch] = useReducer(
    formDataReducer,
    emptyFormData,
  );

  return (
    <>
      <div id="wrapper">
        <Nav />
        <Group
          todos={todos}
          openModal={() => setModalOpen(true)}
          formDataDispatch={formDataDispatch}
        />
      </div>

      <FormModal
        todos={todos}
        isOpen={modalOpen}
        setOpen={setModalOpen}
        formData={formData}
        dispatch={formDataDispatch}
      />
    </>
  );
};

export default App;
