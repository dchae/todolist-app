import TodoAPI from "/javascripts/todoAPI.js";
import TodoList from "/javascripts/todoList.js";
import TodoView from "/javascripts/todoView.js";

class TodoApp {
  constructor() {
    this.todoList = null;
    this.currentGroup = null;
    this.resetCurrentGroup();
    this.API = new TodoAPI();
    this.view = new TodoView();
  }

  resetCurrentGroup() {
    this.currentGroup = "all";
  }

  // dependent initialisations
  async init() {
    await this.loadTodos();
    this.renderAll();
    this.initEventListeners();
  }

  async loadTodos() {
    const todos = await this.API.fetchTodos();
    this.todoList = new TodoList(todos);
  }

  // getters / setters
  get todos() {
    return this.filterByGroup(this.currentGroup);
  }

  filterByGroup(groupKey) {
    let [group, date] = groupKey.split("-");
    let completed;
    switch (group) {
      case "all":
        break;
      case "completed":
        completed = true;
        break;
      default:
        throw new Error("Invalid value for group key");
    }

    return this.todoList.filterBy({ date, completed });
  }

  // render
  renderAll() {
    this.renderNav();
    this.renderMain();
  }

  renderNav() {
    this.view.renderNavAllGroupBadge(this.todoList.length);
    this.view.renderNavAllDateGroups(this.todoList.datesTally);
    this.view.renderNavAllCompletedGroupBadge(this.todoList.completed.length);
    this.view.renderNavCompletedDateGroups(this.todoList.completedDatesTally);
    this.view.changeCurrentGroup(this.currentGroup);
  }

  renderMain() {
    this.view.renderHeader(this.todos.length);
    this.view.renderTodos(this.todos);
  }

  // state management
  async createTodo(form) {
    try {
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData));
      const newTodo = await this.API.createTodo(json);
      this.todoList.add(newTodo);
    } catch (e) {
      alert(e.message);
    }
  }

  async updateTodo(form) {
    try {
      const id = this.view.getTodoId(form);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData));
      const updatedTodo = await this.API.updateTodo(id, json);
      this.todoList.set(id, updatedTodo);
    } catch (e) {
      alert(e.message);
    }
  }

  async setCompleted(id, completed = true) {
    try {
      const updated = await this.API.setCompleted(id, completed);
      this.todoList.set(id, updated);
    } catch (e) {
      alert(e.message);
    }
  }

  async toggleCompleted(id) {
    const completed = !this.todoList.get(id).completed;
    return this.setCompleted(id, completed);
  }

  async deleteTodo(id) {
    try {
      await this.API.deleteTodo(id);
      this.todoList.delete(id);
    } catch (e) {
      alert(e.message);
    }
  }

  // event listeners
  #on(element, eventType, handler) {
    element.addEventListener(eventType, handler.bind(this));
  }

  initEventListeners() {
    this.#on(this.view.nav, "click", this.handleGroupChange);
    this.#on(this.view.createTodoButton, "click", this.handleShowCreateForm);
    this.#on(this.view.todoList, "click", this.handleShowEditForm);
    this.#on(this.view.formModal, "click", this.handleHideForm);
    this.#on(this.view.form, "submit", this.handleCreateTodo);
    this.#on(this.view.form, "submit", this.handleUpdateTodo);
    this.#on(this.view.markCompleteButton, "click", this.handleMarkComplete);
    this.#on(this.view.todoList, "click", this.handleToggleComplete);
    this.#on(this.view.todoList, "click", this.deleteButtonHandler);
  }

  handleGroupChange(event) {
    if (!event.target.matches("a")) return;
    event.preventDefault();
    const group = event.target.closest(".group");
    this.currentGroup = group.dataset.group;

    this.renderAll();
  }

  handleShowCreateForm(event) {
    event.preventDefault();
    this.view.resetForm();
    this.view.showCreateForm();
  }

  handleShowEditForm(event) {
    if (!event.target.matches(".todo a")) return;
    event.preventDefault();
    const id = this.view.getTodoId(event.target);
    const todo = this.todoList.get(id);
    this.view.resetForm();
    this.view.showEditForm(todo);
  }

  handleHideForm(event) {
    if (this.view.form.contains(event.target)) return;
    this.view.hideForm();
  }

  async handleCreateTodo(event) {
    const form = event.currentTarget;
    if (!form.classList.contains("create-todo-form")) return;
    event.preventDefault();
    await this.createTodo(form);
    this.resetCurrentGroup();
    this.view.resetForm();
    this.view.hideForm();
    this.renderAll();
  }

  async handleUpdateTodo(event) {
    const form = event.currentTarget;
    if (!form.classList.contains("edit-todo-form")) return;
    event.preventDefault();
    await this.updateTodo(form);
    this.view.resetForm();
    this.view.hideForm();
    this.renderAll();
  }

  async handleMarkComplete(event) {
    event.preventDefault();
    const id = this.view.getTodoId(this.view.form);
    if (!this.todoList.has(id)) {
      alert("Cannot mark a todo as completed before it has been created!");
      return;
    }
    await this.setCompleted(id);
    this.view.hideForm();
    this.view.resetForm();
    this.renderAll();
  }

  async handleToggleComplete(event) {
    if (!event.target.matches(".todo, .checkbox")) return;
    event.preventDefault();

    const id = this.view.getTodoId(event.target);
    await this.toggleCompleted(id);
    this.renderAll();
  }

  async deleteButtonHandler(event) {
    if (!event.target.matches(".delete")) return;
    event.preventDefault();

    const id = this.view.getTodoId(event.target);
    await this.deleteTodo(id);
    this.renderAll();
  }
}

export default TodoApp;
