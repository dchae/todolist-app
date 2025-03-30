import "./Group.css";
import { NavButton } from "../Nav";
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

interface GroupProps {
  todos: TodosHook;
  openModal: () => void;
  formDataDispatch: (action: FormDataAction) => void;
}

const Group = ({ todos, openModal, formDataDispatch }: GroupProps) => {
  return (
    <main>
      <NavButton />

      <header className="current-group-header">
        <h1>{todos.activeGroupName}</h1>
        <span className="badge">{todos.filtered.length}</span>
      </header>

      <button id="show-create-form" type="button" onClick={openModal}>
        Add new todo
      </button>

      <ul className="todo-list">
        {todos.filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            openModal={openModal}
            formDataDispatch={formDataDispatch}
            todos={todos}
            todo={todo}
          />
        ))}
      </ul>
    </main>
  );
};

export default Group;
