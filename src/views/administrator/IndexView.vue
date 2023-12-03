<template>
  <section>
    <div
      class="container h-[calc(100dvh-1rem)] mx-auto p-2 flex flex-col gap-4 md:h-[calc(100dvh-2rem)] md:p-4 lg:h-[calc(100dvh-4rem)] lg:p-8 lg:overflow-hidden"
    >
      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border rounded-lg shadow flex justify-between gap-4"
      >
        <div class="hidden lg:block">
          <p><strong>YG</strong> = Year Graduated</p>
          <p><strong>CL</strong> = Competencies Learned</p>
          <p><strong>PO</strong> = Present Occupation</p>
          <p><strong>ES</strong> = Employment Status</p>
          <p><strong>NC</strong> = Name of Company</p>
          <p><strong>RTB</strong> = Reasons for Taking BSECE</p>
        </div>

        <div>
          <PrimaryButton> Sign out </PrimaryButton>
        </div>
      </div>

      <div
        class="border-gray-300 bg-gray-100 text-gray-700 border rounded-lg shadow grid lg:hidden"
      >
        <table class="rounded-lg flex flex-col">
          <thead>
            <tr class="text-gray-100 grid">
              <th class="bg-blue-600 p-2 rounded-t-lg">Name</th>
            </tr>
          </thead>

          <tbody class="text-xs grid">
            <tr v-for="(item, index) in forms" :key="index">
              <td class="grid">
                <button
                  @click="showModal(item.id)"
                  :class="[index % 2 === 0 && `bg-gray-200/50`]"
                  type="button"
                  class="p-2 text-left truncate"
                >
                  {{ item.name }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="border-gray-300 bg-gray-100 text-gray-700 hidden flex-1 border rounded-lg shadow overflow-hidden lg:grid"
      >
        <table class="h-full rounded-lg flex flex-col overflow-y-auto">
          <thead>
            <tr class="text-gray-100 grid grid-cols-12 gap-px">
              <th class="bg-blue-600 p-2 rounded-tl-lg col-span-2">Name</th>
              <th class="bg-blue-600 p-2">YG</th>
              <th class="bg-blue-600 p-2 col-span-2">CL</th>
              <th class="bg-blue-600 p-2 col-span-2">PO</th>
              <th class="bg-blue-600 p-2">ES</th>
              <th class="bg-blue-600 p-2 col-span-2">NC</th>
              <th class="bg-blue-600 p-2 rounded-tr-lg col-span-2">RTB</th>
            </tr>
          </thead>

          <tbody class="flex-1 grid overflow-y-auto">
            <tr
              v-for="(item, index) in forms"
              :key="index"
              class="text-xs grid grid-cols-12 gap-px transition-colors"
              :class="[
                index % 2 === 0 ? `bg-gray-200/50 hover:bg-gray-300/80` : `hover:bg-gray-300/50 `
              ]"
            >
              <td class="p-2 col-span-2">{{ item.name }}</td>
              <td class="p-2 2">{{ item.yearGraduated }}</td>
              <td class="p-2 col-span-2">{{ item.competencies }}</td>
              <td class="p-2 col-span-2">{{ item.presentOccupation }}</td>
              <td class="p-2">{{ item.employmentStatus }}</td>
              <td class="p-2 col-span-2">{{ item.nameOfCompany }}</td>
              <td class="p-2 col-span-2">{{ item.reasonsForTaking }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <dialog
    ref="modal"
    class="bg-transparent container max-w-3xl h-full max-h-[calc(100vh-2rem)] p-4 overflow-hidden md:h-max lg:hidden"
  >
    <div
      class="border-gray-300 bg-gray-100 text-gray-700 h-full p-4 border rounded-lg flex flex-col gap-4 overflow-y-auto"
    >
      <IconedButton @click="unshowModal" class="self-end">
        <CloseIcon />
      </IconedButton>

      <div v-if="studentData" class="pr-2 grid gap-2 overflow-y-auto">
        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Name</p>
          <p class="p-2 text-xs">
            {{ studentData[0].name }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Year Graduated</p>
          <p class="p-2 text-xs">
            {{ studentData[0].yearGraduated }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Competencies Learned</p>
          <p class="p-2 text-xs">
            {{ studentData[0].competencies }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Present Occupation</p>
          <p class="p-2 text-xs">
            {{ studentData[0].presentOccupation }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Employment Status</p>
          <p class="p-2 text-xs">
            {{ studentData[0].employmentStatus }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Name of Company</p>
          <p class="p-2 text-xs">
            {{ studentData[0].nameOfCompany }}
          </p>
        </div>

        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="font-semibold">Reasons for Taking BSECE</p>
          <p class="p-2 text-xs">
            {{ studentData.reasonsForTaking }}
          </p>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReadUsers } from "@/firebase/users";
import { useReadForms } from "@/firebase/forms";

import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const forms = ref([]);
const modal = ref(null);
const studentData = ref(null);

const showModal = (id) => {
  studentData.value = forms.value.filter((key) => key.id === id);
  modal.value.showModal();
};

const unshowModal = () => {
  studentData.value = null;
  modal.value.close();
};

onMounted(async () => {
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

  const readUsersResponse = await useReadUsers();
  const readUsersResult = readUsersResponse.data.map((key) => ({
    id: key.id,
    name: `${key.data.lastName}, ${key.data.firstName} ${formatMiddleName(key.data.middleName)}`,
    yearGraduated: key.data.yearGraduated
  }));

  const readFormsResponse = await useReadForms();
  const readFormsResult = readFormsResponse.data.map((key) => ({
    id: key.id,
    competencies: key.data.educationalBackground.competenciesLearned,
    presentOccupation: key.data.employmentInformation.presentOccupation,
    employmentStatus: key.data.employmentInformation.employmentStatus,
    nameOfCompany: key.data.employmentInformation.nameOfCompany,
    reasonsForTaking: key.data.educationalBackground.reasonsForPursuing
  }));

  readUsersResult.forEach((user) => {
    if (readFormsResult.some((form) => form.id === user.id)) {
      const userForm = {
        ...user,
        ...readFormsResult.find((form) => form.id === user.id)
      };
      forms.value.push(userForm);
    }
  });
});
</script>
