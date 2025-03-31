import "./Group.css";
import { NavButton } from "../Nav";
import TodoItem from "../TodoItem";
import { TodosHook, FormDataAction } from "../../types";

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
