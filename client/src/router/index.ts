import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/connection",
    component: () => import("@/pages/ConnectToRoom/ConnectToRoom.vue"),
  },
  {
    path: "/share-files",
    component: () => import("@/pages/ShareFiles/ShareFiles.vue"),
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
