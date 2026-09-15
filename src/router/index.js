import { createRouter, createWebHistory } from "vue-router";
import InicioView from "@/views/InicioView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
      meta: { title: "Inicio" },
    },
    {
      path: "/favoritos",
      name: "favoritos",
      component: () => import("../views/FavoritosView.vue"),
      meta: { title: "Favoritos" },
    },
    {
      path: "/receta/:id",
      name: "receta",
      component: () => import("../views/RecetaDetalleView.vue"),
      props: true,
      meta: { title: "Receta" },
    },
    {
      path: "/ia",
      name: "ia",
      component: () => import("../views/IAView.vue"),
      meta: { title: "Generar con IA" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
      meta: { title: "Página no encontrada" },
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} | Mixly`
    : "Mixly";
});

export default router;
