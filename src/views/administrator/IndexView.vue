<template>
  <section>
    <div
      class="container h-[calc(100dvh-1rem)] mx-auto p-2 md:h-[calc(100dvh-2rem)] md:p-4 lg:h-[calc(100dvh-4rem)] lg:p-8"
    >
      <div
        class="border-t-blue-600 border-gray-300 bg-gray-100 text-gray-700 w-full p-4 border border-t-4 rounded-lg grid"
      >
        <div class="text-left font-medium grid grid-cols-12 gap-2">
          <p class="col-span-2">Name</p>
          <p class="col-span-2">Competencies Learned</p>
          <p class="col-span-2">Present Occupation</p>
          <p class="col-span-2">Employment Status</p>
          <p class="col-span-2">Name of company</p>
          <p class="col-span-2">Reasons for taking BSECE</p>
        </div>

        <div
          v-for="(item, index) in forms"
          :key="index"
          class="px-4 py-2 text-left text-xs grid grid-cols-12 gap-2"
        >
          <p class="col-span-2 truncate">{{ item.name }}</p>
          <p class="col-span-2 truncate">{{ item.competencies }}</p>
          <p class="col-span-2 truncate">{{ item.presentOccupation }}</p>
          <p class="col-span-2 truncate">{{ item.employmentStatus }}</p>
          <p class="col-span-2 truncate">{{ item.nameOfCompany }}</p>
          <p class="col-span-2 truncate">{{ item.reasonsForTaking }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReadUsers } from "@/firebase/users";
import { useReadForms } from "@/firebase/forms";

const forms = ref([]);

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

  forms.value = readFormsResult.filter((key) => {
    return readUsersResult.map((key) => key.id).includes(key.id);
  });
});
</script>
