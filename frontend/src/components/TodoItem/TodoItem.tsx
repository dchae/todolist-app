import "./TodoItem.css";
import { Todo, TodosHook, FormDataAction } from "../../types";
import utils from "../../utils";

interface TodoItemProps {
  todo: Todo;
  todos: TodosHook;
  openModal: () => void;
  formDataDispatch: (action: FormDataAction) => void;
}

const TodoItem = ({
  todos,
  todo,
  openModal,
  formDataDispatch,
}: TodoItemProps) => {
  const date = utils.toDateStr(todo.month, todo.year);
  const completedClass = todo.completed ? " completed" : "";
  const handleOpenModal = () => {
    formDataDispatch({ field: "id", value: todo.id });
    formDataDispatch({ field: "title", value: todo.title });
    formDataDispatch({ field: "day", value: todo.day });
    formDataDispatch({ field: "month", value: todo.month });
    formDataDispatch({ field: "year", value: todo.year });
    formDataDispatch({ field: "description", value: todo.description });
    openModal();
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) todos.deleteTodo(todo.id);
  };

  const handleToggleComplete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      todos.update({ id: todo.id, completed: !todo.completed });
    }
  };

  return (
    <li className={"todo" + completedClass} onClick={handleToggleComplete}>
      <button className="checkbox" type="button" onClick={handleToggleComplete}>
        Complete
      </button>
      <a href="#" onClick={handleOpenModal}>
        {todo.title} - {date}
      </a>
      <button className="delete" type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
