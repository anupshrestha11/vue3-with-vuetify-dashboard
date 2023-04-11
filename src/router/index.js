// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Private",
    component: () => import("@/layouts/auth/auth_layout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/modules/home/home_page.vue"),
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
        component: () => import("@/modules/login/login_page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
