<template>
  <section>
    <div class="container mx-auto p-2 md:p-4 lg:p-8">
      <div class="grid gap-2">
        <FormHeaderLayout>
          <template #title> General Information </template>
          <template #subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, repudiandae.
          </template>
        </FormHeaderLayout>

        <FormBodyLayout>
          <template #question> Age </template>
          <template #options> <input type="number" name="age" id="age" /> </template>
        </FormBodyLayout>

        <FormBodyLayout>
          <template #question> Sex </template>
          <template #options>
            <label for="male" class="flex items-center gap-1">
              <input type="radio" name="sex" id="male" />
              Male
            </label>

            <label for="female" class="flex items-center gap-1">
              <input type="radio" name="sex" id="female" />
              Female
            </label>
          </template>
        </FormBodyLayout>

        <FormBodyLayout>
          <template #question> Civil Status </template>
          <template #options>
            <label
              for="single"
              class="flex items-center gap-1 group group-checked:text-emerald-600"
            >
              <input type="radio" name="civil status" id="single" class="" />
              <span>Single</span>
            </label>

            <label for="married" class="flex items-center gap-1">
              <input type="radio" name="civil status" id="married" />
              <span>Married</span>
            </label>

            <label for="widowed" class="flex items-center gap-1">
              <input type="radio" name="civil status" id="widowed" />
              <span>Widowed</span>
            </label>

            <label for="legally-separated" class="flex items-center gap-1">
              <input type="radio" name="civil status" id="legally-separated" />
              <span>Legally Separated</span>
            </label>

            <label for="annulled" class="flex items-center gap-1">
              <input type="radio" name="civil status" id="annulled" />
              <span>Annulled</span>
            </label>
          </template>
        </FormBodyLayout>

        <FormBodyLayout>
          <template #question> Region of Origin </template>
          <template #options>
            <input type="text" name="region of origin" id="region-of-origin" />
          </template>
        </FormBodyLayout>
      </div>
    </div>
  </section>
</template>

<script setup>
import FormHeaderLayout from "@/layouts/FormHeaderLayout.vue";
import FormBodyLayout from "@/layouts/FormBodyLayout.vue";
</script>

<style lang="postcss" scoped>
input:not([type="radio"]) {
  @apply border-gray-50 border-b-gray-300 bg-gray-50 w-full block px-1 py-0.5 border border-b-2 outline-none transition-colors active:border-b-blue-600 focus-visible:border-b-blue-600;
}

input[type="radio"] {
  @apply accent-blue-600;
}
</style>
