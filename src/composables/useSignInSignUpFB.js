import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useFirebaseApi } from "@/composables/useFirebaseApi";

const { auth } = useFirebaseApi();

export function useSignInSignUpFB() {
  const signUpFB = async (email, password, confirm) => {
    if (password === confirm) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      throw new Error("wrong-confirm");
    }
  };
  const signInFB = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const authObject = {
    "/sign-in": signInFB,
    "/register": signUpFB,
  };

  return { authObject };
}
