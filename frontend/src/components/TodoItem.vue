<template>
  <div
    class="
      m-2
      border-2 border-gray-200
      p-2
      rounded-lg
      shadow-md
      hover:bg-gray-100
    "
    :class="{ 'bg-gray-100': todoItemData.isCompleted }"
  >
    <div class="flex flex-row justify-between">
      <div class="text-xs text-gray-500">#{{ todoItemData.todoItemId }}</div>
      <div
        class="
          rounded-full
          uppercase
          bold
          px-2
          text-xs
          cursor-pointer
          relative
          hover:opacity-80
        "
        @click="togglePriorityMenu"
        :class="[priorityClasses[todoItemData.priority]]"
      >
        <div
          v-if="visiblePriority"
          class="
            absolute
            -bottom-9
            right-0
            gap-2
            bg-gray-100
            shadow-lg
            p-2
            rounded-lg
            flex flex-row
          "
        >
          <div
            class="rounded-full text-white text-xs font-sans px-1 bg-gray-600"
            @click="priorityChange('Low')"
          >
            Low
          </div>
          <div
            class="rounded-full text-white text-xs font-sans px-1 bg-green-600"
            @click="priorityChange('Medium')"
          >
            Medium
          </div>
          <div
            class="rounded-full text-white text-xs font-sans px-1 bg-red-600"
            @click="priorityChange('High')"
          >
            High
          </div>
        </div>
        <div class="text-white">
          {{ todoItemData.priority }}
        </div>
      </div>
    </div>
    <div class="text-lg text-gray-700 bold">{{ todoItemData.todoText }}</div>
    <div class="mt-2 flex flex-row justify-between">
      <div class="flex flex-col">
        <div class="text-xs text-gray-500">Created at</div>
        <div class="text-xs text-gray-500">
          {{ formatDateTime(todoItemData.createdAt) }}
        </div>
      </div>

      <div class="flex flex-row items-center gap-2">
        <!-- cancel todo button -->
        <div
          class="w-4 h-4 hover:-translate-y-0.5 transform cursor-pointer"
          @click="onDeleteButton"
        >
          <svg
            class="w-full h-full text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <!-- completed todo button -->
        <div
          class="w-6 h-6 hover:-translate-y-0.5 transform cursor-pointer"
          v-if="!todoItemData.isCompleted"
          @click="onCompletedButton"
        >
          <svg
            class="w-full h-full text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <!-- edit button -->
        <div
          class="w-5 h-5 hover:-translate-y-0.5 transform cursor-pointer"
          v-if="!todoItemData.isCompleted"
          @click="onEditButton"
        >
          <svg
            class="h-full w-full text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-xs text-gray-500">Last updated at</div>
        <div class="text-xs text-gray-500">
          {{ formatDateTime(todoItemData.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoApi from "../services/TodoApi";
const api = new TodoApi();
export default {
  name: "TodoItem",
  props: {
    todoItemData: {
      todoItemId: Number,
      todoText: String,
      priority: {
        validator(value) {
          return ["Low", "Medium", "High"].includes(value);
        },
      },
      isCompleted: Boolean,
      createdAt: Date,
      updatedAt: Date,
    },
  },
  data() {
    return {
      visiblePriority: false,
      priorityClasses: {
        Low: "bg-gray-600",
        Medium: "bg-green-600",
        High: "bg-red-600",
      },
    };
  },
  methods: {
    padZeroToDateTime(value) {
      return (value < 10 ? "0" : "") + value;
    },
    formatDateTime(epochTime) {
      let dateTime = new Date(epochTime);
      let today = new Date();

      if (
        dateTime.getDate() === today.getDate() &&
        dateTime.getMonth() === today.getMonth() &&
        dateTime.getFullYear() === today.getFullYear()
      ) {
        return (
          this.padZeroToDateTime(dateTime.getHours()) +
          ":" +
          this.padZeroToDateTime(dateTime.getMinutes()) +
          ":" +
          this.padZeroToDateTime(dateTime.getSeconds())
        );
      } else {
        return dateTime.toLocaleDateString("en-us", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    },
    togglePriorityMenu() {
      if (!this.todoItemData.isCompleted) {
        this.visiblePriority = !this.visiblePriority;
      }
    },
    priorityChange(priorityValue) {
      api
        .updateTodoPriority(this.todoItemData.todoItemId, priorityValue)
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
          this.$emit("refreshData");
        })
        .catch((err) => console.error("UpdateTodoPriority:", err));
    },
    onDeleteButton() {
      api
        .deleteTodo(this.todoItemData.todoItemId)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          console.log(text);
          this.$emit("deletedTodo", { todoId: this.todoItemData.todoItemId });
        })
        .catch((err) => console.error("DeleteTodo:", err));
    },
    onCompletedButton() {
      // server call for completed todo
      api
        .updateTodoCompleted(this.todoItemData.todoItemId)
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
          this.$emit("refreshData");
        })
        .catch((err) => console.error("UpdateTodoCompleted:", err));
    },
    onEditButton() {
      this.$emit("editTodo", this.todoItemData.todoItemId);
    },
  },
};
</script>

<style>
</style>