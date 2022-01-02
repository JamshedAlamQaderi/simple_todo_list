const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("todo_database.db", (err) => {
  if (err) {
    return console.error("Sqlite3 Database connection error: " + err.message);
  }
  console.log("Connected to the sqlite3 database");
});

const RunQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  });
};

const GetQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

// create todo app table
RunQuery(
  "create table if not exists todo_list(id integer primary key autoincrement, todo_text varchar(200), completed bool, priority integer, created_at long, updated_at long)",
  []
)
  .then((result) => {
    console.log("todo_list table creation Result:", result);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

module.exports = { RunQuery, GetQuery };
