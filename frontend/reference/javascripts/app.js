"use strict";

import TodoApp from "/javascripts/todoApp.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoApp = new TodoApp();
  todoApp.init();
});
