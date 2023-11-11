import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/home/IndexView.vue";
import GalleryView from "@/views/gallery/IndexView.vue";
import GraduatesView from "@/views/graduates/IndexView.vue";
import AboutView from "@/views/about/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/gallery",
      name: "gallery",
      component: GalleryView
    },
    {
      path: "/graduates",
      name: "graduates",
      component: GraduatesView
    },
    {
      path: "/about",
      name: "about",
      component: AboutView
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/profile/IndexView.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/views/signin/IndexView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("@/views/error/IndexView.vue")
    }
  ]
});

export default router;
