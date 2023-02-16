import { useToast } from "vue-toastification";

const toast = useToast();

const options = {
  position: "top-center",
  timeout: 2970,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

const showToastError = (data) => {
  toast.error(data);
};
const showToastSuccess = (data) => {
  toast.success(data);
};

export { options, showToastError, showToastSuccess };
