import { useAuthentication } from "@/firebase/configuration";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCreateUser } from "@/firebase/users";

const status = {
  success: { code: 200, message: "succes" },
  error: { code: 400, message: "error" }
};

const useSignUp = async (form) => {
  try {
    const signUpResponse = await createUserWithEmailAndPassword(
      useAuthentication,
      form.email,
      form.password
    );

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
      return status.success;
    } else {
      return status.error;
    }
  } catch (error) {
    console.log(`Error signing up!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

const useSignIn = async (email, password) => {
  try {
    const signInResponse = await signInWithEmailAndPassword(useAuthentication, email, password);

    if (signInResponse && signInResponse.user) {
      localStorage.setItem("accessToken", signInResponse.user.accessToken);
      localStorage.setItem("accessId", signInResponse.user.uid);

      return status.success;
    } else {
      return status.error;
    }
  } catch (error) {
    console.log(`Error signing in!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

const useSignOut = () => {
  try {
    signOut(useAuthentication);
    return status.success;
  } catch (error) {
    console.log(`Error signing out!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

export { useSignUp, useSignIn, useSignOut };
