<template>
  <TheNavbar v-if="isNavbarVisible" />

  <main class="bg-gray-200 text-gray-800 min-h-[100vh]">
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
