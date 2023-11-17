<template>
  <section
    class="bg-[url('@/assets/images/UrsmFacade.webp')] bg-center bg-no-repeat bg-cover h-[100dvh] max-h-[50rem] relative z-30 after:h-full after:content-[''] after:bg-gradient-to-br after:from-gray-900/70 after:via-gray-800/60 after:to-gray-700/50 after:absolute after:inset-0"
  >
    <div
      class="flex flex-col items-center justify-center absolute inset-0 z-50 lg:flex-row lg:gap-16 xl:gap-40"
    >
      <div class="text-gray-100 hidden w-2/5 max-w-sm p-4 text-center lg:block">
        <img src="@/assets/images/UrsLogo.png" alt="" class="w-10 lg:w-32 mx-auto mb-4" />

        <p class="text-sm">Mapping Alumni Careers:</p>
        <h1 class="text-lg font-bold uppercase lg:text-4xl">
          Tracer study portal for bs ece program alumni
        </h1>
      </div>

      <form
        @submit.prevent="signIn"
        class="border-blue-600 border-t-blue-600 bg-gray-100 text-gray-700 w-4/5 max-w-sm m-4 px-4 py-8 border border-t-8 rounded-lg grid gap-2"
      >
        <div class="grid place-items-center">
          <img src="@/assets/images/UrsLogo.png" alt="" class="w-20" />
          <p class="text-blue-600 text-lg font-bold">Tracer Study Portal</p>
        </div>

        <p class="mb-4 font-medium text-center">Sign in to continue</p>

        <div class="px-2 grid gap-4 lg:px-4">
          <InputEmail v-model="credentials.email" id="email" label="Email" required />
          <InputPassword v-model="credentials.password" id="password" label="Password" required />
        </div>

        <PrimaryButton type="submit" class="mt-8"> Sign in </PrimaryButton>
        <button type="button">Create new account</button>
      </form>
    </div>
  </section>

  <TheLoading v-if="loading" />
</template>

<script setup>
import { ref, reactive } from "vue";
import { useSignIn } from "@/firebase/authentication";
import { useRouter } from "vue-router";
import TheLoading from "@/components/TheLoading.vue";

import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();
const loading = ref(false);
const credentials = reactive({
  email: "",
  password: ""
});

const signIn = async () => {
  loading.value = true;

  const response = await useSignIn(credentials.email, credentials.password);

  if (response && response.code === 200) {
    loading.value = false;
    router.push({ name: "home" });
  }
};
</script>
