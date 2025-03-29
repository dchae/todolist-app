import "./Group.css";
import { NavButton } from "../Nav";
import { Todo, TodosHook } from "../../types";
import utils from "../../utils";

const TodoItem = ({ title, month, year, completed }: Todo) => {
  const date = utils.toDateStr(month, year);
  const completedClass = completed ? " completed" : "";

  return (
    <li className={"todo" + completedClass}>
      <button className="checkbox" type="button">
        Complete
      </button>
      <a href="#">
        {title} - {date}
      </a>
      <button className="delete" type="button">
        Delete
      </button>
    </li>
  );
};

interface GroupProps {
  todos: TodosHook;
}

const Group = ({ todos }: GroupProps) => {
  return (
    <main>
      <NavButton />

      <header className="current-group-header">
        <h1>{todos.activeGroupName}</h1>
        <span className="badge">{todos.filtered.length}</span>
      </header>

      <button id="show-create-form" type="button">
        Add new todo
      </button>

      <ul className="todo-list">
        {todos.filtered.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </main>
  );
};

export default Group;
