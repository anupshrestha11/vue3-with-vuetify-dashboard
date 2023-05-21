// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/modules/login/store";

const routes = [
  {
    path: "/",
    name: "Private",
    component: () => import("@/layouts/auth/auth_layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/modules/home/home_view.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/properties",
        name: "properties",
        component: () => import("@/modules/properties/page_view.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/projects",
        name: "projects",
        component: () => import("@/modules/projects/projects-page.vue"),
        meta: {
          layout: "auth",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/layouts/app/app_layout.vue"),
    children: [
      {
        path: "",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/modules/login/login_view.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }

  const redirectPages = ["/", "/login"];
  const redirectToHome = redirectPages.includes(to.path);

  if (auth.user && redirectToHome) {
    return "/home";
  }
});

export default router;
