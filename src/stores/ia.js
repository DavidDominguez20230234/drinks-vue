import IAServide from "@/services/IAServide";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useIAStore = defineStore("ia", () => {
  const prompt = ref("");
  const respuesta = ref("");
  const loading = ref(false);

  const generarReceta = async () => {
    respuesta.value = "";
    loading.value = true;
    const result = await IAServide.generarReceta(prompt.value);

    for await (const text of result) {
      respuesta.value += text;
    }
    loading.value = false;
  };

  return {
    prompt,
    loading,
    respuesta,
    generarReceta,
  };
});
