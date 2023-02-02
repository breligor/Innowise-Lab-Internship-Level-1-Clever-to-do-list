<template>
  <div>
    <form @submit.prevent="createNewTask">
      <label for="newTaskDescription">Task</label>
      <div>
        <baseInput
          v-model="newTask.description"
          type="text"
          placeholder="Add task"
          required
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/App.vue";

export default {
  setup() {
    const newTask = reactive({
      creationTime: null,
      description: "",
      completed: false,
    });

    const taskCollection = collection(db, "task");
    const createNewTask = () => {
      taskCollection.add({
        ...newTask,
        creationTime: Date.now(),
      });
      newTask.description = "";
    };
    return {
      newTask,
      createNewTask,
    };
  },
};
</script>

<style lang="scss" scoped></style>
