import { ref } from "vue";

export function useNotificationApi() {
  const errMessage = ref("");

  const closeToast = () => {
    errMessage.value = "";
  };

  const autoHideToast = () => {
    setTimeout(() => (errMessage.value = ""), 3000);
  };
  return { errMessage, closeToast, autoHideToast };
}
