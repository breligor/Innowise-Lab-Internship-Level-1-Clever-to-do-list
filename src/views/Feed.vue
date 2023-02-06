<template>
  <main>
    <h1>TO DO LIST</h1>
    <p>ЧИСЛО ЗАДАЧ:{{ taskArr.length }}</p>

    <div class="formWrapper">
      <form @submit.prevent="writeUserData" class="form">
        <baseInput
          v-model="taskDescription"
          type="text"
          placeholder="Add task..."
          required
          class="input"
        />
        <button class="addBtn" @click="addTask" type="submit">add task</button>
      </form>
    </div>
    <div>
      <ol>
        <li v-for="(task, i) in taskArr" :key="task.id">
          <div class="li">
            <div>
              <p :class="{ task_isDone: task.completed }">
                {{ task.description }}
              </p>
            </div>
            <div class="btnWrapper">
              <input class="through" v-model="task.completed" type="checkbox" />
              <button class="del" @click="deleteTask(i)">x</button>
              <router-link class="todoItemlink" to="/todoItem"
              tag="button"             
                >edit</router-link
              >
            </div>
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";

import baseInput from "@/components/baseInput.vue";
import { db } from "../main.js";
import { ref as fbRef, set } from "firebase/database";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";

const router = useRouter();
const taskDescription = ref("");
const auth = getAuth();
const user = auth.currentUser;
const userId = user.uid;
const currentDate = Date.now();
const taskArr = reactive([]);
const isComplete = false;
const date = new Date();
const taskId = date.setDate(date.getDate());

//set data to firebase db
function writeUserData() {
  set(
    fbRef(
      db,
      "users/" +
        `${"userId : " + userId}/${"currentDate : " + currentDate}/${
          "taskId : " + taskId
        }`
    ),
    {
      mail: user.email,
      taskDescription: taskDescription.value,
      completed: isComplete,
      creationTime: currentDate,
    }
  );
}

//add task to task list
const addTask = () => {
  const newTask = {
    description: taskDescription.value,
    id: taskId,
    completed: isComplete,
  };
  taskArr.push(newTask);
  //taskDescription.value = ""; clear input after submit
};
const deleteTask = (i) => {
  taskArr.splice(i, 1);
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.addBtn {
  width: 100px;
}
.formWrapper {
  width: 800px;
  display: flex;
  justify-content: center;
}
.form {
  width: 100%;
  display: flex;
  justify-content: center;
}
.input {
  width: 100%;
  max-width: 500px;
  height: 30px;
}
.task_isDone {
  text-decoration: line-through;
}
button {
  cursor: pointer;
}
.del {
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.through {
  width: 15px;
  height: 15px;
}
.li {
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnWrapper {
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todoItemlink {
  width: 35px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
  text-transform: uppercase;
  font-size: 10px;
}

</style>
