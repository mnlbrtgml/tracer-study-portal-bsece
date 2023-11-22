import { createRouter, createWebHistory } from "vue-router";
import { useHasSignedIn } from "@/firebase/authentication";

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
      meta: { requiresAuthentication: false },
      component: HomeView
    },
    {
      path: "/gallery",
      name: "gallery",
      meta: { requiresAuthentication: true },
      component: GalleryView
    },
    {
      path: "/graduates",
      name: "graduates",
      meta: { requiresAuthentication: true },
      component: GraduatesView
    },
    {
      path: "/about",
      name: "about",
      meta: { requiresAuthentication: false },
      component: AboutView
    },
    {
      path: "/form",
      name: "form",
      meta: { requiresAuthentication: true },
      component: () => import("@/views/form/IndexView.vue")
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuthentication: true },
      component: () => import("@/views/profile/IndexView.vue")
    },
    {
      path: "/signin",
      name: "signin",
      meta: { requiresAuthentication: false },
      component: () => import("@/views/signin/IndexView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      meta: { requiresAuthentication: false },
      component: () => import("@/views/error/IndexView.vue")
    }
  ]
});

router.beforeEach((to, _, next) => {
  const account = useHasSignedIn();
  const meta = to.meta.requiresAuthentication;
  const name = to.name;

  if (name === "signin") {
    if (account) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (meta && !account) {
      next({ name: "signin" });
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  if (to.name !== "signin" && to.name !== "error") {
    const header = Array.from(document.querySelectorAll("header ul a"));
    const links = header.map((key) => ({
      name: key.innerText.toLowerCase(),
      width: Math.round(key.getBoundingClientRect().width)
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
  }
});

export default router;
