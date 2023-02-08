<template>
  <div class="btnWrapper">
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);
let auth;

onBeforeMount(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/sign-in");
    } else if (router.path == "/register" || router.path == "sign-in") {
      router.replace("/");
    }
  });
});

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/sign-in");
    console.log("Succesfully signed out");
  });
};

</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
main {
  width: 400px;
  height: 400px;
}
.btnWrapper {
  
    width: 100%;
    display: flex;
    justify-content: flex-end;

}
</style>
