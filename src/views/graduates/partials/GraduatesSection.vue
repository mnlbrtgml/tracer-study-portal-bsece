<template>
  <div class="container mx-auto p-2 flex flex-col gap-4 md:h-[calc(100vh-7.73rem)]">
    <div
      class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg flex flex-col gap-2 md:flex-row"
    >
      <InputText v-model.trim="filterByName" id="filter-name" label="Search" class="md:flex-1" />

      <select v-model.trim="filterByYear" id="filter-year">
        <option value="all" selected>All</option>
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

      <PrimaryButton @click="filterGraduates"> Apply filter </PrimaryButton>
    </div>

    <div
      class="flex-1 grid gap-2 sm:grid-cols-2 px-2 md:grid-cols-3 md:overflow-y-auto lg:grid-cols-4 xl:grid-cols-5"
    >
      <GraduateCard v-for="(user, index) in users" :key="index" :src="user.data.image">
        <template #name>
          {{
            `${user.data.lastName}, ${user.data.firstName} ${formatMiddleName(
              user.data.middleName
            )}`
          }}
        </template>
        <template #yearGraduated>
          {{ user.data.yearGraduated }}
        </template>
        <template #email>
          {{ user.data.email }}
        </template>
        <template #fieldOfWork>
          {{ user.data.fieldOfWork }}
        </template>
      </GraduateCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useReadUsers } from "@/firebase/users";

import InputText from "@/components/InputText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import GraduateCard from "@/components/GraduateCard.vue";

const getUsersResponse = await useReadUsers();
const users = ref([]);
const filterByName = ref(null);
const filterByYear = ref("all");

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

const filterGraduates = () => {
  const filteredUsers = getUsersResponse.data.filter((key) =>
    Object.values(key.data).every((key) => key !== "")
  );

  if (filterByName.value) {
    users.value = filteredUsers.filter((user) => {
      const name = `${user.data.firstName} ${user.data.middleName} ${user.data.lastName}`;
      return name.toLowerCase().includes(filterByName.value.toLowerCase());
    });
  } else {
    users.value = filteredUsers.filter((user) => {
      return filterByYear.value === "all" || user.data.yearGraduated === filterByYear.value;
    });
  }

  users.value.sort((keyA, keyB) =>
    Number(keyA.data.yearGraduated) > Number(keyB.data.yearGraduated)
      ? 1
      : Number(keyA.data.yearGraduated) < Number(keyB.data.yearGraduated)
      ? -1
      : 0
  );
};

filterGraduates();
</script>

<style lang="postcss" scoped>
:is(select) {
  @apply border-gray-400 bg-gray-100 text-gray-700 rounded-lg appearance-none truncate;
}
</style>
