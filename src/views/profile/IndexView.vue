<template>
  <Suspense>
    <template #default>
      <ProfileSection />
    </template>

    <template #fallback>
      <TheLoading />
    </template>
  </Suspense>
</template>

<script setup>
import ProfileSection from "@/views/profile/partials/ProfileSection.vue";
import TheLoading from "@/components/TheLoading.vue";
</script>
