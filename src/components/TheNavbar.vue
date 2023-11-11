<template>
  <header
    class="border border-gray-300 bg-gray-50 text-gray-700 h-[3.75rem] p-1 border-b-gray-300 sticky top-0 z-40 transition-colors dark:border-gray-900 dark:border-b-gray-700 dark:bg-gray-950 dark:text-gray-300"
  >
    <nav class="h-full p-1 flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <IconedButton @click="toggleSidebar">
          <MenuIcon />
        </IconedButton>

        <RouterLink :to="{ name: routes[0] }" class="font-bold"> Tracer Study Portal </RouterLink>
      </div>

      <div>
        <IconedButton @click="toggleColorTheme">
          <component :is="colorThemeIcon" />
        </IconedButton>
      </div>
    </nav>
  </header>

  <aside
    :class="`bg-gray-900/80 h-[100dvh] fixed inset-0 z-50 transition-transform lg:hidden ${sidebarClass}`"
  >
    <nav
      class="bg-gray-50 text-gray-700 w-3/4 max-w-xs h-full p-4 flex flex-col dark:bg-gray-950 dark:text-gray-300"
    >
      <IconedButton @click="toggleSidebar" class="self-end">
        <CloseIcon />
      </IconedButton>

      <ul>
        <li v-for="(route, index) in routes" :key="index">
          <RouterLink
            @click="toggleSidebar"
            :to="{ name: route }"
            class="border-transparent px-4 py-2 border rounded-lg font-semibold capitalize flex items-center gap-2"
          >
            <component :is="routeIcons[index]" />
            <span> {{ route }} </span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import IconedButton from "@/components/IconedButton.vue";
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import MoonIcon from "@/assets/icons/MoonIcon.vue";
import SunIcon from "@/assets/icons/SunIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import GalleryIcon from "@/assets/icons/GalleryIcon.vue";
import GraduatesIcon from "@/assets/icons/GraduatesIcon.vue";
import AboutIcon from "@/assets/icons/AboutIcon.vue";

const routes = ["home", "gallery", "graduates", "about"];
const routeIcons = [HomeIcon, GalleryIcon, GraduatesIcon, AboutIcon];
const colorTheme = ref(localStorage.getItem("color-theme") || "light");
const colorThemeIcon = computed(() => (colorTheme.value === "dark" ? MoonIcon : SunIcon));
const isSidebarVisible = ref(false);
const sidebarClass = computed(() =>
  isSidebarVisible.value ? "translate-x-0" : "-translate-x-full"
);

const toggleColorTheme = () => {
  const newColorTheme = colorTheme.value === "dark" ? "light" : "dark";

  document.documentElement.classList.toggle("dark");
  localStorage.setItem("color-theme", newColorTheme);
  colorTheme.value = newColorTheme;
};

const toggleSidebar = () => (isSidebarVisible.value = !isSidebarVisible.value);
</script>
