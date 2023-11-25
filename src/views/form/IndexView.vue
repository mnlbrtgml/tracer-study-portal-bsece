<template>
  <Suspense>
    <template #default>
      <FormSection />
    </template>

    <template #fallback>
      <TheLoading />
    </template>
  </Suspense>
</template>

<script setup>
import TheLoading from "@/components/TheLoading.vue";
import FormSection from "@/views/form/partials/FormSection.vue";
</script>
