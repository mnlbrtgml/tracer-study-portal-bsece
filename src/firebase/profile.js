import { app, database } from "@/firebase/configuration";
import { getAuth, updatePassword } from "firebase/auth";
import { useGetUsers } from "@/firebase/users";
import { doc, updateDoc } from "firebase/firestore";
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
    const storageRef = ref(storage, `users/${userId}`);
    const uploadResponse = await uploadBytes(storageRef, image);

    if (uploadResponse) {
      const downloadUrlResponse = await getDownloadURL(uploadResponse.ref);

      if (downloadUrlResponse) {
        await updateDoc(doc(database, "users", userId), {
          image: downloadUrlResponse
        });

        return {
          code: 201,
          message: "Successfully updated image!"
        };
      }
    }
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const useUpdatePersonalInformation = async (form) => {
  try {
    await updateDoc(doc(database, "users", userId), {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      birthday: form.birthday,
      fieldOfWork: form.fieldOfWork,
      yearGraduated: form.yearGraduated
    });

    return {
      code: 201,
      message: "Successfully updated personal information!"
    };
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

const useUpdatePassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);

    return {
      code: 201,
      message: "Successfully updated password!"
    };
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useGetProfile, useUpdateImage, useUpdatePersonalInformation, useUpdatePassword };
