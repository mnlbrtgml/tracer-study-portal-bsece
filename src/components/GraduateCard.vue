<template>
  <div
    class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 w-full h-max max-w-xs mx-auto p-4 border border-t-4 rounded-lg shadow grid gap-4"
  >
    <div class="bg-gray-300 aspect-square rounded-lg grid place-items-center">
      <span v-if="isLoading" class="text-xs italic">Loading image</span>
      <img
        v-else
        :src="props.src"
        alt="Alum Image"
        class="text-gray-400 w-full aspect-square rounded-lg text-xs italic object-cover object-center"
      />
    </div>

    <div class="grid">
      <p class="font-bold truncate">
        <slot name="name" />
      </p>
      <p class="text-xs flex items-center gap-2">
        <span>BSECE </span>
        (<slot name="yearGraduated" />)
      </p>
      <p class="text-xs uppercase">
        <slot name="fieldOfWork" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { useImage } from "@vueuse/core";

const props = defineProps(["src", "name"]);
const { isLoading } = useImage({ src: props.src });
</script>
