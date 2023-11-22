<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 p-4 border rounded-lg grid gap-2">
    <p class="font-medium"><slot name="question" /></p>
    <div class="grid gap-0.5"><slot name="options" /></div>
  </div>
</template>
