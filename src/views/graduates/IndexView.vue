<template>
  <section>
    <Suspense>
      <template #default>
        <GraduatesSection />
      </template>

      <template #fallback>
        <TheLoading />
      </template>
    </Suspense>
  </section>
</template>

<script setup>
import GraduatesSection from "@/views/graduates/partials/GraduatesSection.vue";
import TheLoading from "@/components/TheLoading.vue";
</script>
