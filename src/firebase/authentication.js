import { reactive } from "vue";
import { app } from "@/firebase/configuration";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { useCreateUser } from "@/firebase/users";

const auth = getAuth(app);
const status = reactive({
  code: 0,
  message: ""
});

const formatStatus = () => {
  status.code = 0;
  status.message = "";
};

const useHasSignedIn = () => {
  const userResponse = auth.currentUser?.accessToken;
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

const useSignUp = async (form) => {
  formatStatus();

  try {
    const signUpResponse = await createUserWithEmailAndPassword(auth, form.email, form.password);

    if (signUpResponse) {
      const user = {
        id: signUpResponse.user.uid,
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        birthday: form.birthday,
        email: form.email
      };

      await useCreateUser(user);

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
  formatStatus();

  try {
    const signInResponse = await signInWithEmailAndPassword(auth, email, password);

    if (signInResponse && signInResponse.user) {
      localStorage.setItem("accessToken", signInResponse.user.accessToken);
      localStorage.setItem("accessId", signInResponse.user.uid);

      status.code = 200;
      status.message = "User signed in successfully";
    } else {
      status.code = 404;
      status.message = "User not found";
    }

    return status;
  } catch (error) {
    status.code = 404;
    status.message = "User not found";
  }
};

const useSignOut = () => {
  formatStatus();

  try {
    signOut(auth).then(() => localStorage.clear());
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useSignUp, useSignIn, useSignOut, useHasSignedIn };
