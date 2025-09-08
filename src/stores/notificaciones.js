import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useNotificacionStore = defineStore("notificacion", () => {
  const texto = ref("");
  const error = ref(false);
  const mostrar = ref(false);

  watch(mostrar, () => {
    if (mostrar) {
      setTimeout(() => {
        texto.value = "";
        error.value = false;
        mostrar.value = false;
      }, 3000);
    }
  });

  return { texto, error, mostrar };
});
