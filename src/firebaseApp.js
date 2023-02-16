import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export { dbStore, auth, getCurrentUser };

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY, //"AIzaSyBFSEdbMDCv-GDl-HNgwHtjb2gN8lt2X90",
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
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

export default { fbApp: fbApp };

