import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseApi } from "@/composables/useFirebaseApi";

const { auth } = useFirebaseApi();
export const app = createApp(App);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    if (window.location.href.indexOf("/sign-in") === -1) {
      window.location.replace("/sign-in");
    }
  } //else if (router.path == "/register" || router.path == "/sign-in") {
  //   window.location.replace("/");
  // }
});

//глобальная регистрация Base components
const requireComponent = require.context(
  "./components/base",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
  app.component(componentName, componentConfig.default || componentConfig);
});

app.use(router).mount("#app");
