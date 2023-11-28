import { useDatabase } from "@/firebase/configuration";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useReadProfile } from "@/firebase/profile";

const status = {
  success: { code: 200, message: "succes" },
  error: { code: 400, message: "error" }
};

const useReadForms = async () => {
  try {
    const response = await getDocs(collection(useDatabase, "forms"));
    const result = [];
    response.forEach((key) => result.push({ id: key.id, data: key.data() }));
    return { ...status.success, data: result };
  } catch (error) {
    console.log(`Error reading forms!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

const useCreateForm = async (form) => {
  try {
    const getProfileResponse = await useReadProfile();
    const getProfileResult = getProfileResponse.id;
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

    await setDoc(doc(useDatabase, "forms", getProfileResult), data);
    return status.success;
  } catch (error) {
    console.log(`Error creating form!\nCODE: [${error.code}]\nMESSAGE: [${error.message}]`);
    return status.error;
  }
};

export { useReadForms, useCreateForm };
