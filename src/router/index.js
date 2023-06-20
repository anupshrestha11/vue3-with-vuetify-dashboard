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
        path: "/projects",
        name: "projects",
        component: () => import("@/modules/projects/projects-page.vue"),
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
        path: "/users",
        name: "users",
        component: () => import("@/modules/users/users-page.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/bookings",
        name: "bookings",
        component: () => import("@/modules/bookings/booking-page.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("@/modules/roles/role-page.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/payment-types",
        name: "payment-types",
        component: () =>
          import("@/modules/payment-types/payment-type-page.vue"),
        meta: {
          layout: "auth",
        },
      },

      {
        path: "/project-details/:id",
        name: "project-details",
        component: () =>
          import("@/modules/projects/components/project-details.vue"),
        meta: {
          layout: "auth",
        },
      },
      {
        path: "/property-details/:id",
        name: "property-details",
        component: () =>
          import("@/modules/properties/components/property-details.vue"),
        meta: {
          layout: "auth",
        },
      },

      {
        path: "/booking-details/:id",
        name: "booking-details",
        component: () =>
          import("@/modules/bookings/components/booking-details.vue"),
        meta: {
          layout: "auth",
        },
      },

      {
        path: "/user-details/:id",
        name: "user-details",
        component: () => import("@/modules/users/components/user-details.vue"),
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
