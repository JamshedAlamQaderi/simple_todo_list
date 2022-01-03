<template>
  <div class="p-0">
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
        <div class="text-2xl bold text-black uppercase">
          Simple Todo List App
        </div>
        <div class="flex border-2 border-gray-200">
          <input class="px-2 w-72" type="text" placeholder="Search" />
          <!-- search icon -->
          <div
            class="
              w-16
              h-12
              flex
              items-center
              justify-center
              border-l-2 border-gray-200
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
          <div class="shadow-lg border-2 border-gray-200">
            <div class="w-full text-lg bold text-center border-b-2">Todo's</div>
            <div v-if="todos.length > 0">
              <TodoItem
                v-for="todoItem in todos"
                :key="todoItem.todoItemId"
                :todo-item-data="todoItem"
              />
            </div>
            <div v-else class="w-full text-center py-4">No todo's found</div>
          </div>
        </div>

        <!-- completed todos -->
        <div class="w-1/4">
          <div class="shadow-lg border-2 border-gray-200">
            <div class="w-full text-lg bold text-center border-b-2">
              Completed todo's
            </div>
            <div v-if="completed.length > 0"></div>
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
                class="border-2 w-full h-12 px-2 rounded-md"
                type="text"
                placeholder="todo here"
              />
              <button
                class="
                  mt-4
                  w-full
                  h-12
                  rounded-md
                  uppercase
                  text-white
                  bg-green-500
                "
              >
                Create
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

export default {
  name: "App",
  components: { TodoItem },
  setup() {
    let item = {
      todoItemId: 12,
      todoText: "Create a todo list app",
      priority: "Low",
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return {
      todos: [item],
      completed: [],
    };
  },
};
</script>

<style></style>
