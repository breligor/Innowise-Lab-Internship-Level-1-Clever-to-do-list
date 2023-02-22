import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export const app = createApp(App);

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
