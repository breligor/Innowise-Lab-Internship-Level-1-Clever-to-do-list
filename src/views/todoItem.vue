<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <div class="taskWindow">
      <div class="header">
        <h3>Task detail</h3>
        <router-link class="backBtn" to="/feed">X</router-link>
      </div>
      <hr />
      <div>
        <button @click="">!</button>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../main.js";
import { userId, taskArr } from "../views/Feed.vue";

// const readDB = dbRef(db, userId);

// onValue(readDB, (snapshot) => {

//   const data = snapshot.val();  

//   putData(data);

// });
// const putData = (data) => {
//   console.log(data);
// };
</script>

<style lang="scss" scoped>
.taskWindow {
  width: 500px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0 10px 10px -5px black;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px 0 35px;
}
.backBtn {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid gray;
}
</style>
