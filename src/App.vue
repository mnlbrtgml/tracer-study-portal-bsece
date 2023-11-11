<template>
  <TheNavbar v-if="isNavbarVisible" />

  <main
    :class="`bg-gray-200 text-gray-800  p-4 transition-colors dark:bg-gray-800 dark:text-gray-200 ${
      isNavbarVisible ? `min-h-[calc(100dvh-3.75rem)]` : `min-h-[100dvh]`
    }`"
  >
    <RouterView />
  </main>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import TheNavbar from "@/components/TheNavbar.vue";

const route = useRoute();
const isNavbarVisible = computed(() => (route.name === "error" ? false : true));
</script>
