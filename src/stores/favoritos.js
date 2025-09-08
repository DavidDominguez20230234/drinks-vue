import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificaciones";

export const useFavoritosStore = defineStore("favoritos", () => {
  const modal = useModalStore();
  const bebidas = useBebidasStore();
  const notificaciones = useNotificacionStore();
  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  });

  watch(
    favoritos,
    () => {
      sicronizarLocalStorage();
    },
    { deep: true }
  );

  const sicronizarLocalStorage = () => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  const existeFavorito = () => {
    const favoritosLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];

    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  };

  const elimminarFavorito = () => {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );

    notificaciones.mostrar = true;
    notificaciones.texto = "Eliminado de favoritos";
  };

  const agregarFavorito = () => {
    favoritos.value.push(bebidas.receta);

    notificaciones.mostrar = true;
    notificaciones.texto = "Se agregó a favoritos";
  };

  const handeClickFavorito = () => {
    if (existeFavorito()) {
      elimminarFavorito();
    } else {
      agregarFavorito();
    }
    modal.modal = false;
  };

  const noFavoritos = computed(() => favoritos.value.length === 0);

  return {
    favoritos,
    handeClickFavorito,
    existeFavorito,
    noFavoritos,
  };
});
