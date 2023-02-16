import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/firebaseApp";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { options } from "@/toastFunctions"


const app = createApp(App);
app.use(router).use(Toast, options).mount("#app");
