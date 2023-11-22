<template>
  <section>
    <div class="container mx-auto p-2 grid gap-4 md:p-4 lg:p-8">
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
            <PrimaryButton>Update personal information</PrimaryButton>
            <PrimaryButton>Change password</PrimaryButton>
          </div>
        </div>

        <div class="flex-1 px-4 flex flex-col gap-8 md:flex-row">
          <div class="flex flex-col items-center gap-2 md:items-start">
            <span v-if="isLoading" class="text-xs italic">Loading image</span>
            <img
              v-else
              :src="getProfileResult.image"
              alt="Alum Image"
              class="bg-gray-200 text-gray-400 w-full aspect-square rounded-lg text-xs italic object-cover object-center"
            />

            <PrimaryButton @click="showModal(`image`)">Select new photo</PrimaryButton>
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

  <dialog ref="modal" class="bg-transparent container max-w-3xl">
    <div class="border-gray-300 bg-gray-100 text-gray-700 h-full p-4 border rounded-lg grid gap-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p>{{ modalProperties.title }}</p>
          <p>{{ modalProperties.subtitle }}</p>
        </div>

        <IconedButton @click="unshowModal">
          <CloseIcon />
        </IconedButton>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGetProfile, useUpdateImage } from "@/firebase/profile";
import { useImage } from "@vueuse/core";
import { useFileDialog } from "@vueuse/core";

import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const getProfileResponse = await useGetProfile();
const getProfileResult = getProfileResponse[0].data;
const { isLoading } = useImage({ src: getProfileResult.image });
const modal = ref(null);
const modalProperties = reactive({
  title: null,
  subtitle: null
});

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
});

const showModal = (target) => {
  reset();

  switch (target) {
    case "image":
      modalProperties.title = "Change Image";
      modalProperties.subtitle = "Select new photo";
      break;
  }

  modal.value.show();
};

const unshowModal = () => {
  modal.value.close();
};

onChange((files) => {
  /** do something with files */
});
</script>
