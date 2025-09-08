import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";

export const useModalStore = defineStore("modal", () => {
  const bebidas = useBebidasStore();
  const favoritos = useFavoritosStore();
  const modal = ref(false);

  function handleClickModal() {
    modal.value = !modal.value;
  }

  const textoBoton = computed(() => {
    return favoritos.existeFavorito(bebidas.receta.idDrink)
      ? "Eliminar de Favoritos"
      : "Agregar a Favoritos";
  });

  return {
    modal,
    textoBoton,
    handleClickModal,
  };
});
