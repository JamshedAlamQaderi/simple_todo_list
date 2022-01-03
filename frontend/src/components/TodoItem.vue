<template>
  <div class="m-2 h-24 border-2 border-gray-200 p-2 rounded-lg shadow-md">
    <div class="flex flex-row justify-between">
      <div class="text-xs text-gray-500">#{{ todoItemData.todoItemId }}</div>
      <div
        class="
          rounded-full
          uppercase
          bold
          bg-gray-600
          px-2
          text-xs
          cursor-pointer
          relative
          hover:bg-gray-500
        "
        @click="togglePriorityMenu"
      >
        <div
          v-if="visiblePriority"
          class="
            absolute
            -bottom-8
            right-0
            gap-2
            bg-gray-200
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

      <div
        class="flex flex-row items-center gap-2"
        v-if="!todoItemData.isCompleted"
      >
        <!-- cancel todo button -->
        <div class="w-4 h-4 hover:-translate-y-0.5 transform cursor-pointer">
          <svg
            class="w-full h-full text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="onDeleteButton"
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
        <div class="w-6 h-6 hover:-translate-y-0.5 transform cursor-pointer">
          <svg
            class="w-full h-full text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="onCompletedButton"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
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
        return (
          this.padZeroToDateTime(dateTime.getDate()) +
          " " +
          this.padZeroToDateTime(dateTime.getMonth()) +
          ", " +
          dateTime.getFullYear()
        );
      }
    },
    togglePriorityMenu() {
      this.visiblePriority = !this.visiblePriority;
    },
    priorityChange(priorityValue) {
      console.log("Priority:", priorityValue);
    },
    onDeleteButton() {
      // server call for delete todo
    },
    onCompletedButton() {
      // server call for completed todo
    },
  },
};
</script>

<style>
</style>