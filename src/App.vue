<template>
  <main class="bg-gray-100 h-[100dvh] p-4 grid place-items-center">
    <div class="text-center grid place-items-center">
      <div class="w-52">
        <a href="https://storyset.com/online" class="sr-only">Online illustrations by Storyset</a>
        <ConstructionIcon />
      </div>

      <div>
        <h4
          class="bg-blue-600 text-gray-100 w-max mx-auto px-4 py-2 rounded-lg text-xl font-bold uppercase"
        >
          Under Construction
        </h4>
        <p class="mt-4 mb-2 text-sm">
          We are working hard creating an amazing experience for you. In the meantime, please check
          back soon, to see our progress
        </p>
        <p class="font-semibold">Thank you for your patience!</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import ConstructionIcon from "@/assets/icons/ConstructionIcon.vue";
</script>
