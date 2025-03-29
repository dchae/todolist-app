class TodoAPI {
  async #request(method, id, body) {
    method = method.toUpperCase();

    const url = ["api/todos", id].filter(Boolean).join("/");
    const headers = {};
    if (body) headers["Content-Type"] = "application/json";

    const response = await fetch(url, { method, headers, body });

    if (response.ok) return response;

    let msg;
    try {
      msg = await response.text();
    } catch {
      msg = response.statusText;
    }
    const errorMsg = `API request failed: ${method} ${url} - ${msg}`;
    throw new Error(errorMsg);
  }

  async fetchTodos() {
    const response = await this.#request("GET");
    const todoArray = await response.json();
    return todoArray;
  }

  async fetchTodo(id) {
    const response = await this.#request("GET", id);
    const todoArray = await response.json();
    return todoArray;
  }

  async createTodo(json) {
    const response = await this.#request("POST", null, json);
    const newTodo = await response.json();
    return newTodo;
  }

  async setCompleted(id, completed = true) {
    const json = JSON.stringify({ completed });
    const response = await this.#request("PUT", id, json);
    const updatedTodo = await response.json();
    return updatedTodo;
  }

  async updateTodo(id, json) {
    const response = await this.#request("PUT", id, json);
    const updatedTodo = await response.json();
    return updatedTodo;
  }

  async deleteTodo(id) {
    await this.#request("DELETE", id);
    return id;
  }
}

export default TodoAPI;
