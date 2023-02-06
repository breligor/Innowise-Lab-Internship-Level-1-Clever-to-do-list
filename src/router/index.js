import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/todoItem", component: () => import("../views/todoItem.vue") },
    { path: "/register", component: () => import("../views/Register.vue") },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
    {
      path: "/feed",
      component: () => import("../views/Feed.vue"),
      meta: {
        requireAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        res(user);
      },
      rej
    );
  });
};

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
