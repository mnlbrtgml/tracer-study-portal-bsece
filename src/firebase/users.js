import { database } from "@/firebase/configuration";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const useGetUsers = async () => {
  const response = await getDocs(collection(database, "users"));
  const result = [];

  response.forEach((key) => result.push({ id: key.id, data: key.data() }));

  return result;
};

const useCreateUser = async (user) => {
  try {
    const { id, firstName, middleName, lastName, birthday, email } = user;

    await setDoc(doc(database, "users", id), {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      fieldOfWork: "",
      image: "",
      yearGraduated: ""
    });
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useGetUsers, useCreateUser };
