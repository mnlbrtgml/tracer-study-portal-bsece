<template>
  <TheNavbar v-if="isNavbarVisible" />

  <main>
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
