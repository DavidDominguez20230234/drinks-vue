import IAServide from "@/services/IAServide";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useNotificacionStore } from "./notificaciones";

export const useIAStore = defineStore("ia", () => {
  const notificaciones = useNotificacionStore();

  const prompt = ref("");
  const respuesta = ref("");
  const loading = ref(false);

  const generarReceta = async () => {
    respuesta.value = "";
    loading.value = true;

    try {
      const result = await IAServide.generarReceta(prompt.value);

      for await (const text of result) {
        respuesta.value += text;
      }
    } catch (e) {
      notificaciones.$patch({
        texto: "No se pudo generar la receta. Intenta de nuevo",
        mostrar: true,
        error: true,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    prompt,
    loading,
    respuesta,
    generarReceta,
  };
});
