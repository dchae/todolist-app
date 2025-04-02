import "./TodoItem.css";
import { Todo, UpdateTodoData } from "../../types";
import utils from "../../utils";

interface TodoItemProps {
  todo: Todo;
  openModal: () => void;
  deleteTodo: (id: number) => void;
  updateTodo: (values: UpdateTodoData) => void;
  setCurTodo: (todo: Todo | null) => void;
}

const TodoItem = ({
  todo,
  openModal,
  deleteTodo,
  updateTodo,
  setCurTodo,
}: TodoItemProps) => {
  const date = utils.toDateStr(todo.month, todo.year);
  const completedClass = todo.completed ? " completed" : "";

  const handleOpenModal = () => {
    setCurTodo(todo);
    openModal();
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) deleteTodo(todo.id);
  };

  const handleToggleComplete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      updateTodo({ id: todo.id, completed: !todo.completed });
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
