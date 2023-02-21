<template>
  <main>
    <baseToast @closeToast="closeToast()" v-if="errMessage"
      >{{ errMessage }}
    </baseToast>

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
          <baseInput v-model="email" type="email" placeholder="Email" />
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <baseInput
            v-model="password"
            type="password"
            placeholder="Password"
          />
        </p>
      </div>
      <div class="field">
        <p class="control is-flex is-justify-content-center">
          <baseButton @click="signIn" class="is-success">Login</baseButton>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import baseInput from "@/components/base/baseInput.vue";
import baseButton from "@/components/base/baseButton.vue";
import baseToast from "@/components/base/baseToast.vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNotificationApi } from "@/toastFunctions";
import { useFirebaseApi } from "@/firebaseApp";

const { auth } = useFirebaseApi();
const { errMessage, closeToast, autoHideToast } = useNotificationApi();
const email = ref("");
const password = ref("");
const router = useRouter();

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      errMessage.value = "Succesfully signed in";
      autoHideToast(errMessage.value);
      router.push("/");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMessage.value = "invalid email or password";
          autoHideToast(errMessage.value);
          break;
        case "auth/user-not-found":
          errMessage.value = "No created account was found";
          autoHideToast(errMessage.value);
          break;
        case "auth/wrong-password":
          errMessage.value = "Enter correct password";
          autoHideToast(errMessage.value);
          break;
        default:
          errMessage.value = "Email or password are incorrect";
          autoHideToast(errMessage.value);
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
