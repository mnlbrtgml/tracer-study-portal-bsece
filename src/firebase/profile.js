import { app, database } from "@/firebase/configuration";
import { getAuth } from "firebase/auth";
import { useGetUsers } from "@/firebase/users";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
const userId = auth.currentUser.uid;

const useGetProfile = async () => {
  try {
    const getUsersResponse = await useGetUsers();
    const profile = getUsersResponse.filter((key) => key.id === userId);

    return profile;
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const useUpdateImage = async (image) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, "users");
    const uploadResponse = await uploadBytes(storageRef, image);

    if (uploadResponse) {
      const downloadUrlResponse = await getDownloadURL(uploadResponse.ref);

      if (downloadUrlResponse) {
        await setDoc(doc(database, "users", userId), {
          image: downloadUrlResponse
        });

        return {
          code: 201,
          message: "Image uploaded successfully"
        };
      }
    }
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useGetProfile, useUpdateImage };
