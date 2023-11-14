<template>
  <button
    :type="props.type"
    class="border-blue-600 bg-blue-600 text-gray-100 px-4 py-2 border rounded-lg"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button"
  }
});
</script>
