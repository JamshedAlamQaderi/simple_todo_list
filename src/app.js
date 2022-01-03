require("dotenv").config();
const localIp = require("./LocalIp");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRepository = require("./TodoCrudRepository");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('Server running on ' + process.env.NODE_ENV + ' mode')

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: `http://${localIp.local_ip}:8080`, // use this option available for dev mode for ui development testing purpose only
      optionsSuccessStatus: 200,
    })
  );
}

app.get("/all_todo", (req, res) => {
  todoRepository
    .allTodo()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// delete todo using todo_id
app.delete("/:todo_id", (req, res) => {
  if (req.params.todo_id) {
    todoRepository
      .deleteTodo(req.params.todo_id)
      .then((data) => {
        res.send("deleted");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).send("todo_id is missing from url params");
  }
});

app.post("/create", (req, res) => {
  if (req.body.todo_text) {
    todoRepository
      .createTodo(req.body.todo_text)
      .then((data) => {
        res.send("todo created successfully");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).send("todo_text param is missing from body");
  }
});

// updateTodoText
app.post("/update_todo_text", (req, res) => {
  if (req.body.todo_text && req.body.todo_id) {
    todoRepository
      .updateTodoText(req.body.todo_id, req.body.todo_text)
      .then((data) => {
        res.send(
          "todo_text of id=" + req.body.todo_id + " updated successfully"
        );
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res
      .status(400)
      .send("todo_text && todo_id body param is missing from body");
  }
});
// updateTodoCompleted
app.post("/update_todo_completed", (req, res) => {
  if (req.body.todo_id) {
    todoRepository
      .updateTodoCompleted(req.body.todo_id)
      .then((data) => {
        res.send(`Mark completed of todo with id=${req.body.todo_id}`);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).send("todo_id body param is missing from body");
  }
});
// updateTodoPrioriy
app.post("/update_todo_priority", (req, res) => {
  if (req.body.todo_priority && req.body.todo_id) {
    todoRepository
      .updateTodoPriority(req.body.todo_id, req.body.todo_priority)
      .then((data) => {
        res.send(
          `Todo Priority has changed to ${req.body.todo_priority} with id=${req.body.todo_id}`
        );
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res
      .status(400)
      .send("todo_priority && todo_id body param is missing from body");
  }
});

// search todo with todo_text
app.get("/search/:search_text", (req, res) => {
  if (req.params.search_text) {
    todoRepository
      .searchTodo(req.params.search_text)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.status(404).send(err));
  } else {
    res.status(400).send("search_text param is missing from url params");
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Todo List app listening at http://${localIp.local_ip}:${process.env.SERVER_PORT}`
  );
});
