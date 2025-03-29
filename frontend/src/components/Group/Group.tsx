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
  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      formDataDispatch({ field: "title", newValue: todo.title });
      formDataDispatch({ field: "day", newValue: todo.day });
      formDataDispatch({ field: "month", newValue: todo.month });
      formDataDispatch({ field: "year", newValue: todo.year });
      formDataDispatch({ field: "description", newValue: todo.description });
      openModal();
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) todos.deleteTodo(todo.id);
  };

  return (
    <li className={"todo" + completedClass} onClick={handleClick}>
      <button className="checkbox" type="button">
        Complete
      </button>
      <a href="#">
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
