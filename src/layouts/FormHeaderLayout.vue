<template>
  <div
    class="border-gray-300 border-t-blue-600 bg-gray-50 text-gray-700 p-4 border border-t-8 rounded-lg grid"
  >
    <p class="text-lg font-bold uppercase"><slot name="title" /></p>
    <p><slot name="subtitle" /></p>
  </div>
</template>
