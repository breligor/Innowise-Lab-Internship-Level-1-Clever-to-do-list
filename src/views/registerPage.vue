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

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const { auth } = useFirebaseApi();
const { errMessage, closeToast, autoHideToast } = useNotification();

const currentRoute = computed(() => {
  return router.currentRoute.value.path;
});

const authForm = computed(() => {
  return currentRoute.value === "/sign-in"
    ? [
        { model: email, placeholder: "email", type: "email" },
        { model: password, placeholder: "password", type: "password" },
      ]
    : [
        { model: email, placeholder: "email", type: "email" },
        { model: password, placeholder: "password", type: "password" },
        {
          model: confirmPassword,
          placeholder: "confirm password",
          type: "password",
        },
      ];
});

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

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
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
  color: rgb(212, 56, 56);
}
</style>
