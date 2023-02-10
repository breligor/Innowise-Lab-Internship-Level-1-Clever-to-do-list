import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";


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
const FirebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getDatabase();
export const dbStore = getFirestore(FirebaseApp);
const app = createApp(App);
app.use(router).mount("#app");
