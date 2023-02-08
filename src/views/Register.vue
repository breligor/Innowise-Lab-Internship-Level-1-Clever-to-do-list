<template>
  <main>
    
    <h1>Create your own account!</h1>
    <div>
      <baseInput class="input" v-model="email" type="email" placeholder="Email" />
    </div>
    <div>
      <baseInput class="input" v-model="password" type="password" placeholder="Password" />
    </div>
    <div>
      <baseInput class="input"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm password"
      />
    </div>
    <div>
      <baseInput class="input" v-model="userName" type="text" placeholder="Name" />
    </div>
    <button class="btn" @click="register">Sign up</button>
    <nav>
      <router-link class="link" to="/sign-in">SIGN IN</router-link>
    </nav>
  </main>
</template>

<script setup>
import { ref } from "vue";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import baseInput from "@/components/baseInput.vue";

const email = ref("");
const password = ref("");
const userName = ref("");
const confirmPassword = ref("");
const router = useRouter();

const register = () => {
  if (confirmPassword.value === password.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Succesfully registered");
        router.push("/");
      })
      .catch((error) => {
        //console.log(error.code);
        alert(error.message);
        console.log(email.value);
      });
  } else {
    alert("password should be the same");
  }
};
</script>

<style lang="scss" scoped>
main {
  background-color: rgb(100, 50, 122);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px -5px black;
  border-radius: 3px;
}
.input {
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
  border: 0;
  border-bottom: 2px solid rgb(255, 251, 251);
  outline: 0;
  color: antiquewhite;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
h1 {
  color: antiquewhite;
  font-size: 15px;
  letter-spacing: 2px;
}
.btn {
  margin-bottom: 15px;
  margin-top: 10px;
  width: 80px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
}
.link {
  text-decoration: none;
  color: antiquewhite;
  font-size: 15px;
}
</style>
