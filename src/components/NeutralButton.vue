<template>
  <button
    :type="props.type"
    class="border-transparent bg-transparent text-gray-700 px-4 py-2 border rounded-lg"
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
