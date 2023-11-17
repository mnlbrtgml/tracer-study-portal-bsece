<template>
  <div class="relative">
    <input
      @input="updateValue($event.target.value)"
      :id="props.id"
      :value="modelValue"
      :required="required"
      type="email"
      class="border-gray-400 bg-gray-100 text-gray-700 block px-4 py-2 w-full rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
    />
    <label
      :for="props.id"
      class="absolute text-gray-400 duration-300 transform -translate-y-4 scale-[.6] top-1 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.6] peer-focus:-translate-y-4 left-1"
      >{{ props.label }}</label
    >
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  modelValue: String,
  required: Boolean,
  label: String
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
