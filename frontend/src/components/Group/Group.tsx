import "./Group.css";
import { NavButton } from "../Nav";
import TodoItem from "../TodoItem";
import { Todo, UpdateTodoData, Filter } from "../../types";
import utils from "../../utils";

interface GroupProps {
  todos: Todo[];
  filter: Filter;
  openModal: () => void;
  deleteTodo: (id: number) => void;
  updateTodo: (values: UpdateTodoData) => void;
  setCurTodo: (todo: Todo | null) => void;
}

const Group = ({
  todos,
  filter,
  openModal,
  deleteTodo,
  updateTodo,
  setCurTodo,
}: GroupProps) => {
  const filteredTodos = utils.getFiltered(todos, filter);
  return (
    <main>
      <NavButton />

      <header className="current-group-header">
        <h1>{utils.activeGroupName(filter)}</h1>
        <span className="badge">{filteredTodos.length}</span>
      </header>

      <button
        id="show-create-form"
        type="button"
        onClick={() => {
          setCurTodo(null);
          openModal();
        }}
      >
        Add new todo
      </button>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            openModal={openModal}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            setCurTodo={setCurTodo}
          />
        ))}
      </ul>
    </main>
  );
};

export default Group;
