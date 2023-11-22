<template>
  <section
    class="bg-[url('@/assets/images/UrsmFacade.webp')] bg-center bg-no-repeat bg-cover h-[100dvh] max-h-[50rem] relative z-30 after:h-full after:content-[''] after:bg-gradient-to-br after:from-gray-900/70 after:via-gray-800/60 after:to-gray-700/50 after:absolute after:inset-0"
  >
    <div
      class="flex flex-col items-center justify-center absolute inset-0 z-50 lg:flex-row lg:gap-16 xl:gap-40"
    >
      <div class="text-gray-100 hidden w-2/5 max-w-sm p-4 text-center lg:block">
        <img src="@/assets/images/UrsLogo.png" alt="" class="w-10 lg:w-32 mx-auto mb-4" />

        <p class="text-sm">Mapping Alumni Careers:</p>
        <h1 class="text-lg font-bold uppercase lg:text-4xl">
          Tracer study portal for bs ece program alumni
        </h1>
      </div>

      <form
        @submit.prevent="signIn"
        class="border-blue-600 border-t-blue-600 bg-gray-100 text-gray-700 w-4/5 max-w-sm m-4 px-4 py-8 border border-t-8 rounded-lg grid gap-2"
      >
        <div class="grid place-items-center">
          <img src="@/assets/images/UrsLogo.png" alt="" class="w-20" />
          <p class="text-blue-600 text-lg font-bold">Tracer Study Portal</p>
        </div>

        <p class="mb-4 font-medium text-center">Sign in to continue</p>

        <div class="px-2 grid gap-4 lg:px-4">
          <InputEmail
            v-model.trim="credentials.signIn.email"
            id="signin-email"
            label="Email"
            required
          />

          <InputPassword
            v-model.trim="credentials.signIn.password"
            id="signin-password"
            label="Password"
            required
          />
        </div>

        <div class="h-10 grid place-items-center">
          <p
            v-if="isError.signIn"
            class="border-red-300 bg-red-100 text-red-400 px-2 py-1 border rounded-full text-xs"
          >
            Invalid email and password
          </p>
        </div>

        <PrimaryButton type="submit"> Sign in </PrimaryButton>
        <button @click="showModal" type="button">Create new account</button>
      </form>
    </div>
  </section>

  <dialog
    ref="modal"
    class="bg-transparent container max-w-3xl h-full max-h-[calc(100vh-2rem)] p-4 overflow-hidden md:h-max"
  >
    <div
      class="border-gray-300 bg-gray-100 text-gray-700 h-full p-4 border rounded-lg flex flex-col gap-4 overflow-y-auto"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="font-bold">Create new account</p>
          <p class="text-xs">Fill out the form for the validation</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div class="border-blue-300 bg-blue-200 text-blue-800 p-2 border rounded-lg text-xs grid">
        <p>Use the name from your diploma.</p>
        <p>Use this format: surname, first name middle initial. Ex. Doe, John D.</p>
      </div>

      <form @submit.prevent="signUp" class="grid gap-4 overflow-y-auto">
        <div class="py-2 grid gap-2 md:grid-cols-2">
          <div class="px-2 grid gap-2.5 lg:px-4">
            <InputText
              v-model.trim="credentials.signUp.firstName"
              id="signup-first-name"
              label="First name"
              required
            />

            <InputText
              v-model.trim="credentials.signUp.middleName"
              id="signup-middle-name"
              label="Middle name"
            />

            <InputText
              v-model.trim="credentials.signUp.lastName"
              id="signup-last-name"
              label="Last name"
              required
            />
          </div>

          <div class="px-2 grid gap-2.5 lg:px-4">
            <div
              :class="credentials.signUp.birthday ? `text-gray-700` : `text-gray-400`"
              class="flex flex-col md:flex-row md:items-center md:gap-2"
            >
              <label for="signup-birthday">Birthday</label>
              <input
                v-model="credentials.signUp.birthday"
                ref="date"
                type="date"
                id="signup-birthday"
                class="border-gray-400 bg-gray-100 flex-1 rounded-lg border appearance-none"
              />
            </div>

            <InputEmail
              v-model.trim="credentials.signUp.email"
              id="signup-email"
              label="Email"
              required
            />

            <InputPassword
              v-model.trim="credentials.signUp.password"
              id="signup-password"
              label="Password"
              required
            />
          </div>
        </div>

        <div class="h-10 grid place-items-center">
          <p
            v-if="isError.signUp"
            class="border-red-300 bg-red-100 text-red-400 px-2 py-1 border rounded-full text-xs text-center"
          >
            {{ isError.message }}
          </p>
        </div>

        <PrimaryButton type="submit"> Sign up </PrimaryButton>

        <TheLoading v-if="isLoading" />
      </form>
    </div>
  </dialog>

  <TheLoading v-if="isLoading" />
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { read, utils } from "xlsx";
import { useSignIn, useSignUp } from "@/firebase/authentication";
import { useGetUsers } from "@/firebase/users";

import TheLoading from "@/components/TheLoading.vue";
import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";
import InputText from "@/components/InputText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const modal = ref(null);
const isLoading = ref(false);
const isError = reactive({
  signIn: false,
  signUp: false,
  message: null
});
const credentials = reactive({
  signIn: {
    email: null,
    password: null
  },

  signUp: {
    firstName: null,
    middleName: null,
    lastName: null,
    birthday: null,
    email: null,
    password: null
  }
});

const useGetAlumniList = async () => {
  try {
    const response = await fetch("/src/assets/excel/Record.xlsx");
    const result = await response.arrayBuffer();
    const workBook = read(result);
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const data = utils.sheet_to_json(workSheet);
    const alumni = [];

    data.forEach((item) => {
      const { __EMPTY: index, Name: name, "School Year": schoolYear, Semester: semester } = item;

      alumni.push({
        index,
        name,
        schoolYear,
        semester
      });
    });

    return alumni;
  } catch (error) {
    console.error(error);
  }
};

const useGetAlum = async (name) => {
  const alumniList = await useGetAlumniList();
  const alumNamesList = alumniList.map((item) => item.name);
  return alumNamesList.includes(name) ? "Record found!" : "No record found!";
};

const signUp = async () => {
  isLoading.value = true;
  isError.signUp = false;

  const errorMessages = [
    "Sorry! Your name is not on the list of alumni.",
    "Sorry! Your have already created an account.",
    "Sorry, You cannot create an account."
  ];

  const { firstName, middleName, lastName, email } = toRefs(credentials.signUp);

  const showErrorMessage = (message) => {
    isLoading.value = false;
    isError.signUp = true;
    isError.message = message;
  };

  const validateNameOnExcelRecord = async (firstName, middleName, lastName) => {
    const formatMiddleName = (middleName) => {
      const formattedMiddleName = ref(null);
      if (middleName.trim()) {
        formattedMiddleName.value = middleName
          .split(" ")
          .map((key) => `${key.charAt(0)}.`)
          .join("");
      }
      return formattedMiddleName.value;
    };

    const name = `${lastName}, ${firstName} ${formatMiddleName(middleName)}`;
    const nameResponse = await useGetAlum(name);
    return nameResponse === "Record found!" ? true : false;
  };

  const validateOnDatabaseRecord = async (firstName, middleName, lastName) => {
    const getUsersResponse = await useGetUsers();
    const nameResponse = getUsersResponse.filter((key) => {
      key.data.firstName === firstName &&
        key.data.middleName === middleName &&
        key.data.lastName === lastName;
    });
    const emailResponse = getUsersResponse.filter((key) => key.data.email === email.value);
    return nameResponse.length || emailResponse.length;
  };

  const isNameOnExcel = await validateNameOnExcelRecord(
    firstName.value,
    middleName.value,
    lastName.value
  );

  console.log(isNameOnExcel);

  if (isNameOnExcel) {
    const isNameOrEmailOnDatabase = await validateOnDatabaseRecord(
      firstName.value,
      middleName.value,
      lastName.value
    );

    if (!isNameOrEmailOnDatabase) {
      const signUpResponse = await useSignUp(credentials.signUp);

      if (signUpResponse && signUpResponse.code === 201) {
        isLoading.value = false;
        unshowModal();
        router.push({ name: "home" });
      } else {
        showErrorMessage(errorMessages[2]);
      }
    } else {
      showErrorMessage(errorMessages[1]);
    }
  } else {
    showErrorMessage(errorMessages[0]);
  }
};

const signIn = async () => {
  isError.signIn = false;
  isLoading.value = true;

  const { email, password } = toRefs(credentials.signIn);
  const signInResponse = await useSignIn(email.value, password.value);

  if (signInResponse && signInResponse.code === 200) {
    isLoading.value = false;
    router.push({ name: "home" });
  } else {
    isLoading.value = false;
    isError.signIn = true;
  }
};

const resetCredentials = () => {
  credentials.signIn.email = null;
  credentials.signIn.password = null;
  credentials.signUp.firstName = null;
  credentials.signUp.middleName = null;
  credentials.signUp.lastName = null;
  credentials.signUp.birthday = null;
  credentials.signUp.email = null;
  credentials.signUp.password = null;
};

const showModal = () => {
  resetCredentials();
  modal.value.showModal();
};

const unshowModal = () => {
  resetCredentials();
  modal.value.close();
};
</script>
