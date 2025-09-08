import { createRouter, createWebHistory } from "vue-router";
import InicioView from "@/views/InicioView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
    },
    {
      path: "/favoritos",
      name: "favoritos",
      component: () => import("../views/FavoritosView.vue"),
    },
    {
      path: "/ia",
      name: "ia",
      component: () => import("../views/IAView.vue"),
    },
  ],
});

export default router;
