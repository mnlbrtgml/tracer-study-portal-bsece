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
      path: "/form",
      name: "form",
      component: () => import("@/views/form/IndexView.vue")
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

router.afterEach((to) => {
  const header = Array.from(document.querySelectorAll("header ul a"));
  const links = header.map((key) => ({
    name: key.innerText.toLowerCase(),
    width: key.getBoundingClientRect().width
  }));
  const active = { name: to.name, index: links.findIndex((key) => key.name === to.name) };

  if (active !== -1) {
    const root = document.querySelector(":root");

    const width = links
      .slice(0, active.index)
      .map((key) => key.width)
      .reduce((prev, curr) => prev + curr, 0);

    root.style.setProperty("--width", `${links[active.index].width}px`);
    root.style.setProperty("--translate", `${width}px`);
  }
});

export default router;
