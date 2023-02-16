import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";

export {dbStore, auth, getCurrentUser};

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

const fbApp = initializeApp(firebaseConfig);
const dbStore = getFirestore(fbApp);
const auth = getAuth(fbApp);

const getCurrentUser = () => {
    return new Promise((res, rej) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          res(user);
        },
        rej
      );
    });
  };

