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
import { useFirebaseApi } from "@/firebaseApp";
import { useRouter } from "vue-router";
import baseInput from "@/components/baseInput.vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNotificationApi } from "@/toastFunctions";

const { auth } = useFirebaseApi();
const { showToastSuccess, showToastError } = useNotificationApi();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const register = () => {
  if (confirmPassword.value === password.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        showToastSuccess("Succesfully registered");
        router.push("/");
      })
      .catch((error) => {
        showToastError(error.message);
      });
  } else {
    showToastError("passwords should be the same");
  }
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";
main {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 50px;
}
</style>
