import { useDatabase, useAuthentication } from "@/firebase/configuration";
import { updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uid = useAuthentication.currentUser?.uid;
const status = {
  success: { code: 200, message: "succes" },
  error: { code: 400, message: "error" }
};

const useReadProfile = async () => {
  try {
    const response = await getDoc(doc(useDatabase, "users", uid));
    const result = response.data();
    return { ...status.success, id: response.id, data: result };
  } catch (error) {
    console.log(`Error reading profile!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

const useUpdateImage = async (image) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${uid}`);
    const uploadResponse = await uploadBytes(storageRef, image);

    if (uploadResponse) {
      const downloadUrlResponse = await getDownloadURL(uploadResponse.ref);

      if (downloadUrlResponse) {
        await updateDoc(doc(useDatabase, "users", uid), {
          image: downloadUrlResponse
        });
        return status.success;
      } else {
        return status.error;
      }
    } else {
      return status.error;
    }
  } catch (error) {
    console.log(`Error updating image!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

const useUpdatePersonalInformation = async (form) => {
  try {
    await updateDoc(doc(useDatabase, "users", uid), {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      birthday: form.birthday,
      fieldOfWork: form.fieldOfWork,
      yearGraduated: form.yearGraduated
    });
    return status.success;
  } catch (error) {
    console.log(
      `Error updating personal information!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`
    );
    return status.error;
  }
};

const useUpdatePassword = async (password) => {
  try {
    await updatePassword(useAuthentication.currentUser, password);
    return status.success;
  } catch (error) {
    console.log(`Error updating password!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

export { useReadProfile, useUpdateImage, useUpdatePersonalInformation, useUpdatePassword };
