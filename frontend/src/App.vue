<template>
  <div class="p-0 pb-20">
    <div>
      <!-- for title & search bar -->
      <div
        class="
          px-4
          bg-white
          h-20
          flex
          shadow-lg
          items-center
          justify-between
          flex-row
        "
      >
        <div class="text-2xl bold text-green-700 uppercase font-serif">
          Simple Todo List App
        </div>
        <div class="flex border-2 border-gray-200 gap">
          <input
            class="
              px-2
              w-72
              ring-inset
              focus:outline-none focus:ring-1 focus:ring-green-600
              border-r-2
            "
            type="text"
            placeholder="Search"
            v-model="searchText"
          />
          <!-- search icon -->
          <div
            class="
              w-16
              h-12
              flex
              items-center
              justify-center
              border-gray-200
              hover:bg-gray-100
              cursor-pointer
            "
          >
            <svg height="24px" viewBox="0 0 24 24" width="24px">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- flex flex-row flex-wrap  -->
      <div class="mt-10 mx-4 gap-8 flex justify-center">
        <!-- for pending todos -->
        <div class="w-1/4">
          <div class="shadow-lg border-2 border-gray-200 pb-6">
            <div class="w-full text-lg bold text-center border-b-2">Todo's</div>
            <div v-if="todos.length > 0">
              <TodoItem
                v-for="todoItem in todos"
                :key="todoItem.todoItemId"
                :todo-item-data="todoItem"
                v-on:deletedTodo="deletedTodo($event)"
                v-on:refreshData="refreshTodoData()"
                v-on:editTodo="editTodoText($event)"
              />
            </div>
            <div v-else class="w-full text-center py-4">No todo's found</div>
          </div>
        </div>

        <!-- completed todos -->
        <div class="w-1/4">
          <div class="shadow-lg border-2 border-gray-200 pb-6">
            <div class="w-full text-lg bold text-center border-b-2">
              Completed todo's
            </div>
            <div v-if="completed.length > 0">
              <TodoItem
                v-for="todoItem in completed"
                :key="todoItem.todoItemId"
                :todo-item-data="todoItem"
                v-on:deletedTodo="deletedTodo($event)"
                v-on:refreshData="refreshTodoData()"
              />
            </div>
            <div v-else class="w-full text-center py-4">
              No completed todo's found
            </div>
          </div>
        </div>

        <!-- add new todo -->
        <div class="w-1/4">
          <div class="shadow-lg border-2 border-gray-200">
            <div class="w-full text-lg bold text-center border-b-2">
              New Todo
            </div>
            <div class="p-4">
              <input
                class="
                  border-2
                  w-full
                  h-12
                  px-2
                  rounded-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-600
                  focus:border-0
                "
                type="text"
                placeholder="type todo here"
                v-model.trim="todoText"
              />
              <button
                class="
                  mt-4
                  w-full
                  h-12
                  rounded-md
                  uppercase
                  text-white
                  focus:outline-none focus:shadow-xl focus:translate-y-0.5
                  transform
                  active:translate-y-0.5
                  focus:border-0
                "
                :class="[
                  todoText.length > 0 ? 'bg-green-600' : 'bg-gray-600',
                  todoText.length > 0 ? '' : 'bg-opacity-30',
                ]"
                @click="createTodo"
                :disabled="todoText.length === 0"
              >
                {{ createButtonMode === "new" ? "Create" : "Update" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";
import TodoApi from "./services/TodoApi";
const api = new TodoApi();
let todoData = [];

export default {
  name: "App",
  components: { TodoItem },
  data() {
    return {
      todos: [],
      completed: [],
      todoText: "",
      editTodoItemId: null,
      createButtonMode: "new", // edit or new
      searchText: "",
    };
  },
  watch: {
    searchText: function (newSearchText) {
      if (newSearchText.trim().length > 0) {
        let searchedData = todoData.filter((todoItem) =>
          todoItem.todoText.toLowerCase().includes(newSearchText)
        );
        this.todos = searchedData.filter((item) => !item.isCompleted);
        this.completed = searchedData.filter((item) => item.isCompleted);
      } else {
        this.todos = todoData.filter((item) => !item.isCompleted);
        this.completed = todoData.filter((item) => item.isCompleted);
      }
    },
  },
  mounted() {
    this.refreshTodoData();
  },
  methods: {
    deletedTodo() {
      this.refreshTodoData();
    },
    editTodoText(todoId) {
      this.createButtonMode = "edit";
      let editTodo = this.todos.filter((item) => item.todoItemId == todoId);
      if (editTodo.length > 0) {
        this.todoText = editTodo[0].todoText;
        this.editTodoItemId = editTodo[0].todoItemId;
      }
    },
    refreshTodoData() {
      api
        .getAllTodo()
        .then((response) => response.json())
        .then((data) => {
          let allTodoData = data.map((item) => {
            return {
              todoItemId: item.id,
              todoText: item.todo_text,
              priority: api.convertPriorityIdxToText(item.priority),
              isCompleted: item.completed,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
            };
          });
          this.todos = allTodoData.filter((item) => !item.isCompleted);
          this.completed = allTodoData.filter((item) => item.isCompleted);
          todoData = allTodoData
        })
        .catch((err) => console.error("allTodo: ", err));
    },
    createTodo() {
      if (this.createButtonMode === "new") {
        api
          .createTodo(this.todoText)
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            console.log(text);
            this.todoText = "";
            this.refreshTodoData();
          })
          .catch((err) => console.error("CreateTodo: ", err));
      } else if (this.createButtonMode === "edit" && this.editTodoItemId) {
        api
          .updateTodoText(this.editTodoItemId, this.todoText)
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            console.log(text);
            this.todoText = "";
            this.editTodoItemId = null;
            this.createButtonMode = "new";
            this.refreshTodoData();
          })
          .catch((err) => console.error("UpdateTodo: ", err));
      }
    },
  },
};
</script>

<style></style>
