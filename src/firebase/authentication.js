import { reactive } from "vue";
import { app } from "@/firebase/configuration";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const auth = getAuth(app);
const status = reactive({
  code: 0,
  message: ""
});

const useSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential) {
      status.code = 201;
      status.message = "User created successfully";
    } else {
      status.code = 400;
      status.message = "User creation failed";
    }

    return status;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const useSignIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response) {
      status.code = 200;
      status.message = "User signed in successfully";

      localStorage.setItem("firebase", response.user.uid);
    }

    return status;
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      status.code = 404;
      status.message = "User not found";
    } else {
      console.error(error.code);
      console.error(error.message);
    }
  }
};

const useSignOut = async () => {
  try {
    const response = await signOut(auth);

    if (response) {
      status.code = 200;
      status.message = "User signed out successfully";

      localStorage.setItem("firebase", response.user.uid);
    }

    return status;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useSignUp, useSignIn, useSignOut };
