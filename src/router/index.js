import { createRouter, createWebHistory } from "vue-router";
import { useFirebaseApi } from "@/composables/useFirebaseApi";

const { getCurrentUser } = useFirebaseApi();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/homePage.vue"),
      meta: {
        requireAuth: true,
      },
    },   
    { path: "/register", name:"Register",component: () => import("../views/registerPage.vue") },
    { path: "/sign-in", name:"Sign In", component: () => import("../views/registerPage.vue") },   
    
  ],
});

//guard to prevent transition to feed page without auth
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("PLEASE SIGN IN !");
      next("/sign-in");
    }
  } else {
    next();
  }
});

export default router;
