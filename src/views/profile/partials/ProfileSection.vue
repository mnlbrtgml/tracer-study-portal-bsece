<template>
  <section>
    <div class="container mx-auto p-2 grid gap-4 md:p-4">
      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg flex flex-col gap-4"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-blue-600 font-bold uppercase">Personal Information</p>
            <p class="text-xs">
              Keep your information up-to-date. Make sure your profile reflects your current status.
            </p>
          </div>

          <div class="flex flex-col gap-2 md:flex-row">
            <PrimaryButton @click="showModal(`information`)"
              >Update personal information</PrimaryButton
            >
            <PrimaryButton @click="showModal(`password`)">Update password</PrimaryButton>
          </div>
        </div>

        <div class="flex-1 px-4 flex flex-col gap-8 md:flex-row">
          <div
            class="w-full aspect-square flex flex-col items-center gap-2 md:w-1/4 md:items-start xl:w-1/6"
          >
            <span v-if="isLoading" class="text-xs italic">Loading image</span>
            <img
              v-else
              :src="getProfileResult.image"
              alt="Alum Image"
              class="bg-gray-200 text-gray-400 w-full aspect-square rounded-lg text-xs italic object-cover object-center"
            />

            <PrimaryButton @click="showModal(`image`)" class="mx-auto">Update photo</PrimaryButton>
          </div>

          <div class="flex-1 grid gap-2.5">
            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">First name</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.firstName }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Middle Name</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.middleName || `n/a` }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Last Name</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.lastName }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Email address</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.email }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Birthday</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.birthday }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Year Graduated</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.yearGraduated || `n/a` }}</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg grid">
              <p class="text-xs font-semibold">Field of Work</p>
              <p class="text-gray-800 truncate">{{ getProfileResult.fieldOfWork || `n/a` }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <dialog
    ref="modal"
    class="bg-transparent container w-full max-w-sm max-h-[calc(100vh-2rem)] p-4 sm:w-[50%] sm:max-w-3xl md:w-[50%]"
  >
    <form
      @submit.prevent="submitForm"
      class="border-gray-300 bg-gray-100 text-gray-700 h-full p-4 border rounded-lg grid gap-4 overflow-y-auto"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p>{{ modalProperties.title }}</p>
          <p class="text-xs">{{ modalProperties.subtitle }}</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>

      <div v-if="modalProperties.title === `Change Image`" class="flex flex-col gap-4">
        <div class="grid place-items-center">
          <img
            :src="image.preview ? image.preview : getProfileResult.image"
            class="bg-gray-200 w-full aspect-square rounded-lg object-cover object-center md:w-auto md:h-60"
          />
        </div>

        <PrimaryButton @click="open" class="self-start"> Choose file </PrimaryButton>
      </div>

      <div
        v-if="modalProperties.title === `Change Personal Information`"
        class="flex flex-col gap-4"
      >
        <div class="px-2 grid gap-2.5 lg:px-4">
          <InputText v-model.trim="profile.firstName" id="first-name" label="First name" required />

          <InputText v-model.trim="profile.middleName" id="middle-name" label="Middle name" />

          <InputText v-model.trim="profile.lastName" id="last-name" label="Last name" required />
        </div>

        <div class="px-2 grid gap-2.5 lg:px-4">
          <div :class="profile.birthday ? `text-gray-700` : `text-gray-400`" class="grid gap-1">
            <label for="birthday">Birthday</label>
            <input
              v-model="profile.birthday"
              ref="date"
              type="date"
              id="birthday"
              class="border-gray-400 bg-gray-100 flex-1 rounded-lg border appearance-none"
            />
          </div>

          <div class="grid gap-1">
            <label for="profile.fieldOfWork">Present occupation</label>
            <select v-model="profile.fieldOfWork" id="profile.fieldOfWork" required>
              <option :value="null" disabled selected></option>
              <option value="Broadcasting">Broadcasting</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Semiconductor Device Fabrication/ Manufacturing (Engineer)">
                Semiconductor Device Fabrication/ Manufacturing (Engineer)
              </option>
              <option value="Electronics Design">Electronics Design</option>
              <option value="Computers Systems">Computers Systems</option>
              <option value="Instrumentation and Telemetry">Instrumentation and Telemetry</option>
              <option value="Automation, Feedback, Process Control, Robotics, and Mechatronics">
                Automation, Feedback, Process Control, Robotics, and Mechatronics
              </option>
              <option value="Industrial Electronics">Industrial Electronics</option>
              <option value="Signal Processing">Signal Processing</option>
              <option value="Optics">Optics</option>
              <option value="Medical/Biomedical Electronics">Medical/Biomedical Electronics</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div class="grid gap-1">
            <label for="profile.yearGraduated">Year graduated</label>
            <select v-model="profile.yearGraduated" id="profile.yearGraduated" required>
              <option :value="null" disabled selected></option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      <div v-else class="grid gap-2.5">
        <InputPassword v-model="password.new" id="old-password" label="New password" required />
        <InputPassword
          v-model="password.retype"
          id="retype-password"
          label="Retype new password"
          required
        />
      </div>

      <div class="flex justify-end">
        <NeutralButton @click="unshowModal">Cancel</NeutralButton>
        <PrimaryButton type="submit">Save</PrimaryButton>
      </div>

      <TheLoading v-if="isLoading" />
    </form>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  useReadProfile,
  useUpdateImage,
  useUpdatePersonalInformation,
  useUpdatePassword
} from "@/firebase/profile";
import { useFileDialog } from "@vueuse/core";
import { useSignOut } from "@/firebase/authentication";
import { useRouter } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";
import NeutralButton from "@/components/NeutralButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import TheLoading from "@/components/TheLoading.vue";
import InputText from "@/components/InputText.vue";
import InputPassword from "@/components/InputPassword.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const router = useRouter();
const getProfileResponse = await useReadProfile();
const getProfileResult = ref(getProfileResponse.data);
const isLoading = ref(false);
const image = reactive({
  preview: null,
  file: null
});
const modal = ref(null);
const modalProperties = reactive({
  title: null,
  subtitle: null
});
const profile = reactive({
  firstName: getProfileResult.value.firstName,
  middleName: getProfileResult.value.middleName,
  lastName: getProfileResult.value.lastName,
  birthday: getProfileResult.value.birthday,
  fieldOfWork: getProfileResult.value.fieldOfWork,
  yearGraduated: getProfileResult.value.yearGraduated
});
const password = reactive({
  new: null,
  retype: null
});

const { files, open, reset, onChange } = useFileDialog({ accept: "image/*" });

const resetImage = () => {
  URL.revokeObjectURL(files[0]);
  image.preview = null;
  image.file = null;
};

const resetForm = () => {
  profile.firstName = getProfileResult.value.firstName;
  profile.middleName = getProfileResult.value.middleName;
  profile.lastName = getProfileResult.value.lastName;
  profile.birthday = getProfileResult.value.birthday;
  profile.fieldOfWork = getProfileResult.value.fieldOfWork;
  profile.yearGraduated = getProfileResult.value.yearGraduated;
};

const resetPassword = () => {
  password.new = null;
  password.retype = null;
};

const showModal = (target) => {
  reset();
  resetImage();
  resetForm();
  resetPassword();

  if (target === "image") {
    modalProperties.title = "Change Image";
    modalProperties.subtitle = "Select new photo";
  } else if (target === "information") {
    modalProperties.title = "Change Personal Information";
    modalProperties.subtitle = "Input all needed information";
  } else {
    modalProperties.title = "Change Password";
    modalProperties.subtitle = "Make sure to use valid password";
  }

  modal.value.showModal();
};

const unshowModal = () => {
  resetImage();
  resetForm();
  resetPassword();
  modal.value.close();
};

const submitForm = async () => {
  isLoading.value = true;

  if (modalProperties.title === "Change Image") {
    const updateImageResponse = await useUpdateImage(image.file);
    const updateImageResult = updateImageResponse.code;

    isLoading.value = false;

    alert(
      updateImageResult === 200 ? "Successfully updated image!" : "Unsuccessfully updated image!"
    );

    unshowModal();
  } else if (modalProperties.title === "Change Personal Information") {
    const updatePersonalInformationResponse = await useUpdatePersonalInformation(profile);
    const updatePersonalInformationResult = updatePersonalInformationResponse.code;

    isLoading.value = false;

    alert(
      updatePersonalInformationResult === 200
        ? "Successfully updated personal information!"
        : "Unsuccessfully updated personal information!"
    );

    unshowModal();
  } else {
    if (password.new === password.retype) {
      const updatePasswordResponse = await useUpdatePassword(password.new);
      const updatePasswordResult = updatePasswordResponse.code;

      isLoading.value = false;

      alert(
        updatePasswordResult === 200
          ? "Successfully updated password!"
          : "Unsuccessfully updated password!"
      );

      unshowModal();
      useSignOut();

      router.go(0);
    } else {
      isLoading.value = false;
      alert("Passwords do not match!");
      unshowModal();
    }
  }

  reset();
  resetImage();
  resetPassword();

  const getProfileResponse = await useReadProfile();
  getProfileResult.value = getProfileResponse.data;
};

onChange((files) => {
  resetImage();

  image.preview = URL.createObjectURL(files[0]);
  image.file = files[0];
});
</script>

<style lang="postcss" scoped>
:is(label) {
  @apply text-sm;
}

:is(select) {
  @apply border-gray-400 bg-gray-100 w-full rounded-lg appearance-none truncate;
}

:is(select option:not([value="null"])) {
  @apply text-gray-700;
}
</style>
