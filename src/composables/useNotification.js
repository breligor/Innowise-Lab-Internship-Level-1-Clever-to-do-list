import { ref } from "vue";

export function useNotification() {
  const errMessage = ref("");

  const closeToast = () => {
    errMessage.value = "";
  };

  const autoHideToast = () => {
    setTimeout(() => (errMessage.value = ""), 3000);
  };

  const showToastWithDelay = (value) => {
    setTimeout(() => (errMessage.value = value), 1000);
  };

  return { errMessage, closeToast, autoHideToast, showToastWithDelay };
}
