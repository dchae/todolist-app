import { useState, useReducer, useEffect } from "react";
import "./App.css";
import TodoService from "./services/TodoListAPI.ts";
import Nav from "./components/Nav";
import Group from "./components/Group";
import FormModal from "./components/FormModal";
import useTodos from "./hooks/useTodos";
import { FormData, FormDataAction } from "./types";

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
    case "id":
      newState.id = action.value;
      break;
    case "title":
      newState.title = action.value;
      break;
    case "day":
      newState.day = action.value;
      break;
    case "month":
      newState.month = action.value;
      break;
    case "year":
      newState.year = action.value;
      break;
    case "description":
      newState.description = action.value;
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
        <Nav todos={todos} />
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
