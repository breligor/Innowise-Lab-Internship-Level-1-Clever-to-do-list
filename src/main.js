import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useNotificationApi } from "@/toastFunctions"

const { options } = useNotificationApi();

const app = createApp(App);
app.use(router).use(Toast, options).mount("#app");
