<template>
  <main>
    <router-view />
    <h1>SIGN IN YOUR ACCAUNT</h1>
    <div>
      <baseInput
        class="input"
        v-model="email"
        type="email"
        placeholder="Email"
      />
    </div>
    <div>
      <baseInput
        class="input"
        v-model="password"
        type="password"
        placeholder="Password"
      />
    </div>
    <p v-if="errMsg">{{ errMsg }}</p>
    <button class="btn" @click="register">SIGN IN</button>
    <nav>
      <router-link class="link" to="/register"
        >Don't have account yet?</router-link
      >
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
    </nav>
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

const register = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
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
  color: rgb(253, 253, 253);
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
