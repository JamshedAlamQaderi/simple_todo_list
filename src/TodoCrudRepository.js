const { RunQuery, GetQuery } = require("./database");

// priority levels {Normal: 1, Medium: 2, High: 3}

const priority = { Normal: 1, Medium: 2, High: 3 };

module.exports = {
  createTodo: (todoText) => {
    return RunQuery(
      `INSERT INTO todo_list(todo_text, completed, priority, created_at, updated_at) VALUES(?, ?, ?, ?, ?)`,
      [todoText, false, priority.Normal, Date.now(), Date.now()]
    );
  },

  deleteTodo: (todoId) => {
    return RunQuery("DELETE FROM todo_list WHERE id=?", [todoId]);
  },

  allTodo: () => {
    return GetQuery("SELECT * FROM todo_list");
  },

  updateTodoText: (todoId, todoText) => {
    return RunQuery(
      "UPDATE todo_list SET todo_text=?, updated_at = ? WHERE id=?",
      [todoText, Date.now(), todoId]
    );
  },

  updateTodoCompleted: (todoId) => {
    return RunQuery(
      "UPDATE todo_list SET completed=true, updated_at=? WHERE id=?",
      [Date.now(), todoId]
    );
  },

  updateTodoPriority: (todoId, priority_text) => {
    return RunQuery(
      "UPDATE todo_list SET priority=?, updated_at=? WHERE id=?",
      [priority[priority_text], Date.now(), todoId]
    );
  },

  searchTodo: (search_text) => {
    return GetQuery(
      `SELECT * FROM todo_list WHERE todo_text LIKE '%${search_text}%'`
    );
  },
};
