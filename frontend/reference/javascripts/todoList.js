class Todo {
  constructor({ id, title, day, month, year, completed, description }) {
    this.id = id;
    this.title = title;
    this.day = day;
    this.month = month;
    this.year = year;
    this.completed = completed;
    this.description = description;
    this.date = "";
    this.setDate();
  }

  setDate() {
    const date =
      this.month && this.year
        ? `${this.month}/${this.year.slice(-2)}`
        : "No Due Date";
    this.date = date;
  }
}

class TodoList {
  #todos;
  constructor(todoDataArr = []) {
    this.#todos = new Map();
    this.add(...todoDataArr);
  }

  get length() {
    return this.#todos.size;
  }

  get items() {
    return [...this.#todos.values()];
  }

  get completed() {
    return this.filterBy({ completed: true });
  }

  get noDueDateTodos() {
    return this.items.filter(({ month, year }) => !(month && year));
  }

  get dates() {
    return [...new Set(this.items.map(({ date }) => date))];
  }

  get datesTally() {
    const tally = {};
    for (const todo of this.items) {
      tally[todo.date] = (tally[todo.date] ?? 0) + 1;
    }
    return tally;
  }

  get completedDatesTally() {
    const tally = {};
    for (const todo of this.completed) {
      tally[todo.date] = (tally[todo.date] ?? 0) + 1;
    }
    return tally;
  }

  add(...todoDataArr) {
    todoDataArr.forEach((todoData) =>
      this.#todos.set(todoData.id, new Todo(todoData)),
    );
  }

  has(id) {
    return this.#todos.has(id);
  }

  get(id) {
    return this.#todos.get(id);
  }

  set(id, todoData) {
    if (id !== todoData.id)
      throw new Error(
        `Key id: ${id} and todo id: ${todoData.id} do not match.`,
      );
    return this.#todos.set(id, new Todo(todoData));
  }

  filterBy(criteria) {
    return this.items.filter((todo) =>
      Object.entries(criteria).every(
        ([key, value]) => todo[key] === (value ?? todo[key]),
      ),
    );
  }

  delete(id) {
    return this.#todos.delete(id);
  }
}

export default TodoList;
