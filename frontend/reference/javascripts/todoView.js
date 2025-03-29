class TodoView {
  constructor() {
    this.templates = {};
    this.initHandlebars();
    this.createTodoButton = document.querySelector("#show-create-form");
    this.todoGroupHeader = document.querySelector(".current-group-header");
    this.todoList = document.querySelector(".todo-list");
    this.formModal = document.querySelector("#form-modal");
    this.form = document.querySelector("#form-modal > form");
    this.formFields = this.form.querySelectorAll("input, select, textarea");
    this.markCompleteButton = this.form.querySelector(".mark-complete");
    this.nav = document.querySelector("nav");
    this.navAllGroup = document.querySelector("#all-group");
    this.navAllDateGroups = document.querySelector("nav .all-date-groups");
    this.navAllCompletedGroup = document.querySelector("#all-completed-group");
    this.navCompletedDateGroups = document.querySelector(
      "nav .completed-date-groups",
    );
  }

  initHandlebars() {
    // init handlebars templates
    const rawTemplates = document.querySelectorAll(
      "script[type='text/x-handlebars']",
    );

    rawTemplates.forEach((script) => {
      const key = script.id.replace("template-", "");
      this.templates[key] = Handlebars.compile(script.innerHTML);
    });
  }

  // helpers
  htmlToNode(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const nodes = template.content.childNodes;
    if (nodes.length === 1) return nodes[0];
    return [...nodes];
  }

  tallyToNodes(tally, supergroup = "all") {
    const nodes = Object.entries(tally).map(([date, total]) => {
      const group = [supergroup, date].join("-");
      const html = this.templates["todo-group"]({ name: date, total, group });
      const node = this.htmlToNode(html);
      return node;
    });

    return nodes;
  }

  sortGroupNodes(nodes) {
    const dateSort = (a, b) => {
      const names = [a, b].map((node) =>
        node.querySelector("a").textContent.trim(),
      );
      const [[aMonth, aYear], [bMonth, bYear]] = names.map((name) =>
        name.split("/"),
      );
      return aYear === bYear ? aMonth - bMonth : (aYear ?? "") - (bYear ?? "");
    };
    nodes.sort(dateSort);
  }

  getTodoId(element) {
    return parseInt(element.closest("[data-id]").dataset.id, 10);
  }

  // nav
  renderNavAllGroupBadge(total) {
    this.navAllGroup.querySelector(".badge").textContent = total;
  }

  renderNavAllCompletedGroupBadge(total) {
    this.navAllCompletedGroup.querySelector(".badge").textContent = total;
  }

  renderNavAllDateGroups(datesTally) {
    const nodes = this.tallyToNodes(datesTally, "all");
    this.sortGroupNodes(nodes);
    this.navAllDateGroups.replaceChildren(...nodes);
  }

  renderNavCompletedDateGroups(datesTally) {
    const nodes = this.tallyToNodes(datesTally, "completed");
    this.sortGroupNodes(nodes);
    this.navCompletedDateGroups.replaceChildren(...nodes);
  }

  clearCurrentGroup() {
    this.nav
      .querySelectorAll(".current")
      .forEach((node) => node.classList.remove("current"));
  }

  changeCurrentGroup(group) {
    this.clearCurrentGroup();
    const current = this.nav.querySelector(`[data-group="${group}"]`);
    if (current) current.classList.add("current");
  }

  // main
  renderHeader(total) {
    const curName = this.todoGroupHeader.querySelector("h1")?.textContent;
    const name = this.nav.querySelector(".current a")?.textContent ?? curName;
    const html = this.templates["current-group-header"]({ name, total });
    const nodes = this.htmlToNode(html);
    this.todoGroupHeader.replaceChildren(...nodes);
  }

  renderTodos(todos) {
    const uncompleted = [];
    const completed = [];
    todos.forEach((todo) => {
      const html = this.templates.todo(todo);
      const node = this.htmlToNode(html);
      if (!todo.completed) {
        uncompleted.push(node);
      } else {
        node.classList.add("completed");
        completed.push(node);
      }
    });

    this.todoList.replaceChildren(...uncompleted, ...completed);
  }

  // form modal
  showCreateForm() {
    this.form.className = "create-todo-form";
    this.formModal.showModal();
  }

  showEditForm(todo) {
    this.form.className = "edit-todo-form";
    this.form.dataset.id = todo.id;
    this.populateForm(todo);
    this.formModal.showModal();
  }

  populateForm(todo) {
    this.formFields.forEach((field) => {
      const key = field.getAttribute("name");
      field.value = todo[key] ?? "";
    });
  }

  resetForm() {
    this.form.className = "";
    this.form.dataset.id = "";
    this.form.reset();
  }

  hideForm() {
    this.formModal.close();
  }
}

export default TodoView;
