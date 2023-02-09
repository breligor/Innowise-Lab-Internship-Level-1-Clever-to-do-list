<template>
  <main>
    <div class="box">
      <div class="block is-flex is-justify-content-center">
        <h1 class="subtitle">create your todo</h1>
      </div>

      <div class="tabs">
        <ul class="is-justify-content-center">
          <li>
            <router-link class="link" to="/sign-in">Sign in</router-link>
          </li>
          <li class="is-active"><a>Register</a></li>
        </ul>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <baseInput
            class="input"
            v-model="email"
            type="email"
            placeholder="Email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <baseInput
            class="input"
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <div class="block is-flex is-justify-content-center">
          <p class="subtitle" v-if="errMsg">{{ errMsg }}</p>
        </div>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <baseInput
            class="input"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <div class="block is-flex is-justify-content-center">
          <p class="subtitle" v-if="errMsg">{{ errMsg }}</p>
        </div>
      </div>
      <div class="field">
        <p class="control is-flex is-justify-content-center">
          <button @click="register" class="button is-success">Login</button>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import baseInput from "@/components/baseInput.vue";

const email = ref("");
const password = ref("");
const userName = ref("");
const confirmPassword = ref("");
const router = useRouter();
const auth = getAuth();
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
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 50px;
}

// .input {
//   margin-bottom: 10px;
//   width: 200px;
//   height: 30px;
//   border: 0;
//   border-bottom: 2px solid rgb(255, 251, 251);
//   outline: 0;
//   color: antiquewhite;
//   padding: 7px 0;
//   background: transparent;
//   transition: border-color 0.2s;
// }
// h1 {
//   color: antiquewhite;
//   font-size: 15px;
//   letter-spacing: 2px;
// }
// .btn {
//   margin-bottom: 15px;
//   margin-top: 10px;
//   width: 80px;
//   height: 30px;
//   &:hover {
//     cursor: pointer;
//   }
// }
// .link {
//   text-decoration: none;
//   color: antiquewhite;
//   font-size: 15px;
// }
</style>
