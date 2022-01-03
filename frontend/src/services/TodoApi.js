export default class {
  getAllTodo() {
    return fetch(process.env.VUE_APP_API_URL + "/all_todo");
  }

  deleteTodo(todoId) {
    return fetch(process.env.VUE_APP_API_URL + "/" + todoId, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  createTodo(todoText) {
    return fetch(process.env.VUE_APP_API_URL + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo_text: todoText }),
    });
  }

  updateTodoText(todoId, todoText) {
    return fetch(process.env.VUE_APP_API_URL + "/update_todo_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo_id: todoId, todo_text: todoText }),
    });
  }

  updateTodoCompleted(todoId) {
    return fetch(process.env.VUE_APP_API_URL + "/update_todo_completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo_id: todoId }),
    });
  }

  updateTodoPriority(todoId, todoPriority) {
    return fetch(process.env.VUE_APP_API_URL + "/update_todo_priority", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo_id: todoId, todo_priority: todoPriority }),
    });
  }

  searchTodo(searchText) {
    return fetch(process.env.VUE_APP_API_URL + "/search/" + searchText);
  }

  convertPriorityIdxToText(priorityIdx) {
    let idx = priorityIdx !== null? priorityIdx:1;
    let priorities = { 1: "Low", 2: "Medium", 3: "High" };
    return priorities[idx];
  }
}
