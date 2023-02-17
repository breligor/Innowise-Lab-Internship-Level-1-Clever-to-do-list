<template>
  <div class="btnWrapper">
    <button
      @click="handleSignOut"
      v-if="isLoggedIn"
      class="button is-danger is-hovered"
      title="would you like to get out?"
    >
      Get out
    </button>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseApp";
import { showToastSuccess } from "@/toastFunctions"

const router = useRouter();
const isLoggedIn = ref(false);

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/sign-in");
    } else if (router.path == "/register" || router.path == "sign-in") {
      router.replace("/");
    }
  });
});

onMounted(() => {
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
    showToastSuccess("By-By!")
    router.push("/sign-in");
  });
};
</script>

<style lang="scss" scoped>
.btnWrapper {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
