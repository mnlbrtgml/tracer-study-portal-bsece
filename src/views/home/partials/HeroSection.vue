<template>
  <section
    class="h-[calc(100dvh-3.75rem)] bg-[url('@/assets/images/UrsmFacade.webp')] bg-center bg-no-repeat bg-cover relative z-30 after:h-full after:content-[''] after:bg-gradient-to-br after:from-gray-900/70 after:via-gray-800/60 after:to-gray-700/50 after:absolute after:inset-0"
  >
    <div class="grid place-items-center absolute inset-0 z-50">
      <div class="text-gray-100 p-4 text-center">
        <img src="@/assets/images/UrsLogo.png" alt="" class="w-20 mx-auto mb-4" />

        <p>Mapping Alumni Careers:</p>
        <h1 class="mb-8 text-4xl font-bold uppercase">
          Tracer study portal for bs ece program alumni
        </h1>

        <PrimaryButton @click="scrollToNextSection"> Get started </PrimaryButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";

const scrollToNextSection = () => window.scrollTo({ top: window.innerHeight - 60 });
</script>
