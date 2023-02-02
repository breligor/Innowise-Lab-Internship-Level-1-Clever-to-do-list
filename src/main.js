import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFSEdbMDCv-GDl-HNgwHtjb2gN8lt2X90",
  authDomain: "todo-vue-f2bff.firebaseapp.com",
  databaseURL:
    "https://todo-vue-f2bff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-vue-f2bff",
  storageBucket: "todo-vue-f2bff.appspot.com",
  messagingSenderId: "915399087042",
  appId: "1:915399087042:web:ea3945101f2d074ac17c5b",
};
const FirebaseApp = firebase.initializeApp(firebaseConfig); //firebase init
export const db = getFirestore(FirebaseApp); // database

const app = createApp(App);
app.use(router).mount("#app");
