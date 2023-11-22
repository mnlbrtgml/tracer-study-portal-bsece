import { app } from "@/firebase/configuration";
import { getAuth } from "firebase/auth";
import { useGetUsers } from "@/firebase/users";

const auth = getAuth(app);

const useGetProfile = async () => {
  try {
    const getUsersResponse = await useGetUsers();
    const userId = auth.currentUser.uid;
    const profile = getUsersResponse.filter((key) => key.id === userId);

    return profile;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useGetProfile };
