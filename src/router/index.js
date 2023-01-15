import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import DiscoverView from "../views/DiscoverView.vue";
import SetView from "../views/SetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/user/:userId",
      name: "user",
      component: UserView,
    },
    {
      path: "/set/:setId",
      name: "set",
      component: SetView,
    },
    {
      path: "/sets/",
      name: "sets",
      component: DiscoverView,
    },
  ],
});

export default router;
