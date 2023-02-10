<template>
  <main>
    <div class="box">
      <div class="block is-flex is-justify-content-center">
        <h1 class="subtitle">create your todo</h1>
      </div>
      <div class="tabs">
        <ul class="is-justify-content-center">
          <li class="is-active"><a>Sign in</a></li>
          <li>
            <router-link class="link" to="/register">Register</router-link>
          </li>
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
        <p class="control is-flex is-justify-content-center">
          <button @click="signIn" class="button is-success">Login</button>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import baseInput from "@/components/baseInput.vue";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");

const signIn = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Succesfully signed in");
      router.push("/");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No created account was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Enter correct password";
          break;
        default:
          errMsg.value = "Email or password are incorrect";
          break;
      }
    });
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
