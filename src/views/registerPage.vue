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
          <li>
            <router-link class="link" to="/sign-in">Sign in</router-link>
          </li>
          <li class="is-active"><a>Register</a></li>
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
        <p class="control has-icons-left">
          <baseInput
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
        </p>
      </div>
      <div class="field">
        <p class="control is-flex is-justify-content-center">
          <baseButton @click="register" class="is-success">Login</baseButton>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useFirebaseApi } from "@/firebaseApp";
import { useNotificationApi } from "@/toastFunctions";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import baseInput from "@/components/base/baseInput.vue";
import baseToast from "@/components/base/baseToast.vue";
import baseButton from "@/components/base/baseButton.vue";

const { auth } = useFirebaseApi();
const { errMessage, closeToast, autoHideToast } = useNotificationApi();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const register = () => {
  if (confirmPassword.value === password.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        errMessage.value = "Succesfully registered";
        autoHideToast(errMessage.value);
        router.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            errMessage.value = "please check your email";
            autoHideToast(errMessage.value);
            break;
          case "auth/email-already-in-use":
            errMessage.value = "this account already exists";
            autoHideToast(errMessage.value);
            break;
          case "auth/internal-error":
            errMessage.value = "Enter correct password";
            autoHideToast(errMessage.value);
            break;
          default:
            errMessage.value = "Email or password are incorrect";
            autoHideToast(errMessage.value);
            break;
        }
      });
  } else {
    errMessage.value = "passwords should be the same";
    autoHideToast(errMessage.value);
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
