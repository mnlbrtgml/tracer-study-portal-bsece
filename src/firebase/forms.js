import { database } from "@/firebase/configuration";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useGetProfile } from "@/firebase/profile";

const useGetForms = async () => {
  const response = await getDocs(collection(database, "forms"));
  const result = [];

  response.forEach((key) => result.push({ id: key.id, data: key.data() }));

  return result;
};

const useCreateForm = async (form) => {
  try {
    const getProfileResponse = await useGetProfile();
    const getProfileResult = getProfileResponse[0].id;
    const { 0: generalInformation, 1: educationalBackground, 2: employmentInformation } = form;
    const data = {
      generalInformation: {
        age: generalInformation[0],
        sex: generalInformation[1],
        civilStatus: generalInformation[2],
        regionOfOrigin: generalInformation[3]
      },

      educationalBackground: {
        yearGraduated: educationalBackground[0],
        highestEducationalAttainment: educationalBackground[1],
        honorsOrAwards: educationalBackground[2],
        reasonsForPursuing: educationalBackground[3],
        competenciesLearned: educationalBackground[4],
        trainingOrAdvanceStudies: educationalBackground[5],
        monthsYearsBeforeEmployment: educationalBackground[6]
      },

      employmentInformation: {
        presentOccupation: employmentInformation[0],
        employmentStatus: employmentInformation[1],
        salaryLevel: employmentInformation[2],
        placeOfWork: employmentInformation[3],
        nameOfCompany: employmentInformation[4],
        reasonsForStaying: employmentInformation[5],
        yearsOfFirstEmployment: employmentInformation[6],
        reasonsForChanging: employmentInformation[7],
        mediumChannelUsed: employmentInformation[8],
        awardsRecognitionReceived: employmentInformation[9],
        employersFeedback: employmentInformation[10],
        certificationTrainingSkill: employmentInformation[11]
      }
    };

    await setDoc(doc(database, "forms", getProfileResult), data);

    return {
      code: 201,
      message: "Form submitted successfully"
    };
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export { useGetForms, useCreateForm };
