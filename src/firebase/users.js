import { useDatabase } from "@/firebase/configuration";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const status = {
  success: { code: 200, message: "succes" },
  error: { code: 400, message: "error" }
};

const useReadUsers = async () => {
  const response = await getDocs(collection(useDatabase, "users"));
  const result = [];
  response.forEach((key) => result.push({ id: key.id, data: key.data() }));
  return { ...status.success, data: result };
};

const useCreateUser = async (user) => {
  try {
    const { id, firstName, middleName, lastName, birthday, email } = user;

    await setDoc(doc(useDatabase, "users", id), {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      fieldOfWork: "",
      image: "",
      yearGraduated: ""
    });
    return status.success;
  } catch (error) {
    console.log(`Error creating user!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

export { useReadUsers, useCreateUser };
