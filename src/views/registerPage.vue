<template>
  <main>
    <base-toast-transition>
      <base-toast @closeToast="closeToast()" v-if="errMessage"
        >{{ errMessage }}
      </base-toast>
    </base-toast-transition>
    <div class="box">
      <div class="block is-flex is-justify-content-center">
        <h1 class="subtitle">create your todo</h1>
      </div>
      <div class="tabs">
        <ul class="is-justify-content-center">
          <li>
            <router-link active-class="active" class="link" to="/sign-in"
              >Sign In</router-link
            >
          </li>
          <li>
            <router-link active-class="active" class="link" to="/register"
              >Register</router-link
            >
          </li>
        </ul>
      </div>
      <div class="field">
        <div v-for="(input, i) in authForm" :key="i">
          <p class="control has-icons-left has-icons-right mb-3">
            <base-input
              class="input"
              :type="input.type"
              v-model="input.model.value"
              :placeholder="input.placeholder"
            >
            </base-input>
          </p>
        </div>
      </div>
      <div class="field">
        <p class="control is-flex is-justify-content-center">
          <base-button @click="LogIn" class="is-success">Login</base-button>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFirebaseApi } from "@/composables/useFirebaseApi";
import { useNotification } from "@/composables/useNotification";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useErrorHandler } from "@/composables/useErrorHandler";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const { auth } = useFirebaseApi();
const { getError } = useErrorHandler();
const { errMessage, closeToast, autoHideToast } = useNotification();

const currentRoute = computed(() => {
  return router.currentRoute.value.path;
});

const authForm = computed(() => {
  let arrOfInputs = [
    { model: email, placeholder: "email", type: "email",},
    { model: password, placeholder: "password", type: "password",},
    { model: confirmPassword, placeholder: "confirm password", type: "password",},
  ];
  return currentRoute.value !== "/sign-in"
    ? arrOfInputs
    : arrOfInputs.slice(0, 2);
});

const register = () => {
  if (confirmPassword.value === password.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        errMessage.value = "Succesfully registered!";
        router.push("/");
        autoHideToast();
      })
      .catch((error) => {
        errMessage.value = getError(error.code);
        autoHideToast();
      });
  } else {
    errMessage.value = "passwords should be the same";
    autoHideToast();
  }
};

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      errMessage.value = "Succesfully sign in!";
      router.push("/");
      autoHideToast();
    })
    .catch((error) => {
      errMessage.value = getError(error.code);
      autoHideToast();
    });
};

const LogIn = () => {
  return currentRoute.value === "/sign-in" ? signIn() : register();
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
.active {
  color: rgb(56, 212, 137);
}
</style>
