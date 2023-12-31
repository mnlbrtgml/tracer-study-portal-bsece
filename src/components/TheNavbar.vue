<template>
  <header
    class="border-gray-100 border-b-gray-300 bg-gray-100 text-gray-700 h-[3.75rem] p-1 border shadow sticky top-0 z-40"
  >
    <nav class="container h-full mx-auto px-3 py-1 flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <IconedButton @click="toggleSidebar" class="lg:hidden">
          <MenuIcon />
        </IconedButton>

        <RouterLink
          @click="scrollToTop"
          :to="{ name: routes[0].name }"
          class="font-bold flex items-center"
        >
          <img :src="UrsLogo" alt="" width="24" height="24" />
          <span class="text-blue-600 hidden min-[375px]:block min-[425px]:text-xl">
            Tracer Study Portal
          </span>
        </RouterLink>
      </div>

      <div class="lg:flex lg:items-center lg:gap-8">
        <ul class="hidden lg:flex">
          <li
            v-for="(route, index) in hasSignedIn
              ? routes
              : routes.filter((key) => !key.requiresAuthentication)"
            :key="index"
          >
            <RouterLink :to="{ name: route.name }" class="p-2 font-semibold capitalize">
              {{ route.name }}
            </RouterLink>
          </li>
        </ul>

        <PrimaryButton v-if="hasSignedIn" @click="signOut"> Sign out </PrimaryButton>

        <PrimaryButton v-else @click="navigateToSignInView"> Sign in </PrimaryButton>
      </div>
    </nav>
  </header>

  <aside
    :class="`bg-gray-900/80 h-[100vh] fixed inset-0 z-50 transition-transform lg:hidden ${sidebarClass}`"
  >
    <nav
      ref="sidebar"
      class="bg-gray-100 text-gray-700 w-3/4 max-w-xs h-full p-4 flex flex-col gap-4"
    >
      <IconedButton @click="toggleSidebar" class="self-end">
        <CloseIcon />
      </IconedButton>

      <ul>
        <li
          v-for="(route, index) in hasSignedIn
            ? routes
            : routes.filter((key) => !key.requiresAuthentication)"
          :key="index"
        >
          <RouterLink
            @click="toggleSidebar"
            :to="{ name: route.name }"
            class="px-4 py-2 rounded-lg font-semibold capitalize flex items-center gap-2"
          >
            <component :is="route.icon" />
            <span> {{ route.name }} </span>
          </RouterLink>
        </li>
      </ul>

      <PrimaryButton v-if="hasSignedIn" @click="signOut"> Sign out </PrimaryButton>

      <PrimaryButton v-else @click="navigateToSignInView"> Sign in </PrimaryButton>
    </nav>
  </aside>

  <TheLoading v-if="isLoading" />
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useSignOut } from "@/firebase/authentication";
import { useAuthentication } from "@/firebase/configuration";
import { onAuthStateChanged } from "firebase/auth";

import TheLoading from "@/components/TheLoading.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
// import GalleryIcon from "@/assets/icons/GalleryIcon.vue";
import GraduatesIcon from "@/assets/icons/GraduatesIcon.vue";
import AboutIcon from "@/assets/icons/AboutIcon.vue";
import FormIcon from "@/assets/icons/FormIcon.vue";
import ProfileIcon from "@/assets/icons/ProfileIcon.vue";
import UrsLogo from "@/assets/images/UrsLogo.png";

const routes = [
  {
    name: "home",
    icon: HomeIcon,
    requiresAuthentication: false
  },
  // {
  //   name: "gallery",
  //   icon: GalleryIcon,
  //   requiresAuthentication: true
  // },
  {
    name: "graduates",
    icon: GraduatesIcon,
    requiresAuthentication: true
  },
  {
    name: "about",
    icon: AboutIcon,
    requiresAuthentication: false
  },
  {
    name: "form",
    icon: FormIcon,
    requiresAuthentication: true
  },
  {
    name: "profile",
    icon: ProfileIcon,
    requiresAuthentication: true
  }
];

const router = useRouter();
const isLoading = ref(null);
const sidebar = ref(null);
const hasSignedIn = ref(false);
const isSidebarVisible = ref(false);
const sidebarClass = computed(() =>
  isSidebarVisible.value ? "translate-x-0" : "-translate-x-full"
);
const button = reactive({
  text: null,
  function: null
});

const toggleSidebar = () => (isSidebarVisible.value = !isSidebarVisible.value);
const scrollToTop = () => window.scrollTo(0, 0);
const navigateToSignInView = async () => await router.push({ name: "signin" });
const signOut = () => {
  isLoading.value = true;

  useSignOut();

  setTimeout(() => {
    isLoading.value = false;
    hasSignedIn.value = false;

    navigateToSignInView();
  }, 1000);
};

onClickOutside(sidebar, (event) => event.target.tagName === "ASIDE" && toggleSidebar());

onAuthStateChanged(useAuthentication, (user) => {
  const isAuthenticated = user ? true : false;
  hasSignedIn.value = isAuthenticated;

  if (isAuthenticated) {
    button.text = "Sign out";
    button.function = signOut;
  } else {
    button.text = "Sign in";
    button.function = navigateToSignInView;
  }
});
</script>

<style lang="postcss" scoped>
:is(aside a.router-link-active) {
  @apply text-blue-600 relative;
}

:is(aside a.router-link-active::after) {
  @apply bg-blue-600 content-[''] w-1 h-6 rounded-lg absolute right-0 top-2;
}

:is(header ul::after) {
  @apply bg-blue-600 content-[''] w-active h-1 rounded-full absolute -bottom-px translate-x-active transition-all;
}

:is(header ul a.router-link-active) {
  @apply text-blue-600;
}
</style>
