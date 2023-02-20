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
          <!-- <p class="subtitle" v-if="errMsg">{{ errMsg }}</p> -->
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
import { useRouter } from "vue-router";
import baseInput from "@/components/baseInput.vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNotificationApi } from "@/toastFunctions";
import { useFirebaseApi } from "@/firebaseApp";

const { auth } = useFirebaseApi();
const { showToastSuccess, showToastError } = useNotificationApi();
const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      showToastSuccess('Succesfully signed in');      
      router.push("/");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "invalid email";
          showToastError(errMsg.value);
          break;
        case "auth/user-not-found":
          errMsg.value = "No created account was found";
          showToastError(errMsg.value);
          break;
        case "auth/wrong-password":
          errMsg.value = "Enter correct password";
          showToastError(errMsg.value);
          break;
        default:
          errMsg.value = "Email or password are incorrect";
          showToastError(errMsg.value);
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
.toast-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY();
}
.toast-enter-active {
  transition: all 0.5s ease;
}
</style>
