<template>
  <header
    class="border-gray-100 border-b-gray-300 bg-gray-100 text-gray-700 h-[3.75rem] p-1 border sticky top-0 z-40"
  >
    <nav class="h-full px-3 py-1 flex items-center justify-between gap-4">
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
          <span class="hidden sm:block"> Tracer Study Portal </span>
        </RouterLink>
      </div>

      <div class="lg:flex lg:items-center">
        <ul class="hidden lg:flex">
          <li
            v-for="(route, index) in routes.filter((key) =>
              true ? key.requiresAuthentication === false : key
            )"
            :key="index"
          >
            <RouterLink :to="{ name: route.name }" class="px-4 py-2 font-semibold capitalize">
              {{ route.name }}
            </RouterLink>
          </li>
        </ul>

        <PrimaryButton> Sign in </PrimaryButton>
      </div>
    </nav>
  </header>

  <aside
    :class="`bg-gray-900/80 h-[100vh] fixed inset-0 z-50 transition-transform lg:hidden ${sidebarClass}`"
  >
    <nav class="bg-gray-100 text-gray-700 w-3/4 max-w-xs h-full p-4 flex flex-col gap-4">
      <IconedButton @click="toggleSidebar" class="self-end">
        <CloseIcon />
      </IconedButton>

      <ul>
        <li
          v-for="(route, index) in routes.filter((key) =>
            true ? key.requiresAuthentication === false : key
          )"
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

      <PrimaryButton> Sign in </PrimaryButton>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import GalleryIcon from "@/assets/icons/GalleryIcon.vue";
import GraduatesIcon from "@/assets/icons/GraduatesIcon.vue";
import AboutIcon from "@/assets/icons/AboutIcon.vue";
import UrsLogo from "@/assets/images/UrsLogo.png";

const routes = [
  {
    name: "home",
    icon: HomeIcon,
    requiresAuthentication: false
  },
  {
    name: "gallery",
    icon: GalleryIcon,
    requiresAuthentication: false
  },
  {
    name: "graduates",
    icon: GraduatesIcon,
    requiresAuthentication: false
  },
  {
    name: "about",
    icon: AboutIcon,
    requiresAuthentication: false
  },
  {
    name: "form",
    icon: HomeIcon,
    requiresAuthentication: true
  },
  {
    name: "profile",
    icon: HomeIcon,
    requiresAuthentication: true
  }
];

const isSidebarVisible = ref(false);
const sidebarClass = computed(() =>
  isSidebarVisible.value ? "translate-x-0" : "-translate-x-full"
);

const toggleSidebar = () => (isSidebarVisible.value = !isSidebarVisible.value);
const scrollToTop = () => window.scrollTo(0, 0);
</script>

<style lang="postcss" scoped>
:is(aside a.router-link-active) {
  @apply text-blue-600 relative;
}

:is(aside a.router-link-active::after) {
  @apply bg-blue-600 content-[''] w-1 h-6 rounded-lg absolute right-0 top-2;
}

:is(header a.router-link-active) {
  @apply text-blue-600;
}
</style>
