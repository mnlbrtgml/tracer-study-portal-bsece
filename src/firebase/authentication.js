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

const useHasSignedIn = () => {
  const userResponse = auth.currentUser;
  const localStorageResponse = localStorage.getItem("accessToken");

  if (userResponse) {
    return true;
  } else {
    if (localStorageResponse) {
      return true;
    } else {
      return false;
    }
  }
};

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
    const signOutResponse = await useSignOut();

    if (signOutResponse.code === 200) {
      const signInResponse = await signInWithEmailAndPassword(auth, email, password);

      if (signInResponse && signInResponse.user) {
        localStorage.setItem("accessToken", signInResponse.user.accessToken);

        status.code = 200;
        status.message = "User signed in successfully";
      } else {
        status.code = 404;
        status.message = "User not found";
      }
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
    await signOut(auth);

    status.code = 200;
    status.message = "User signed out successfully";
    localStorage.removeItem("accessToken");

    return status;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useSignUp, useSignIn, useSignOut, useHasSignedIn };
