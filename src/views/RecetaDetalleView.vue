<script setup>
import { computed, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useBebidasStore } from "@/stores/bebidas";
import { useFavoritosStore } from "@/stores/favoritos";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const bebidas = useBebidasStore();
const favoritos = useFavoritosStore();

onMounted(() => {
  bebidas.cargarReceta(props.id);
});

watch(
  () => props.id,
  (nuevoId) => {
    bebidas.cargarReceta(nuevoId);
  }
);

const ingredientes = computed(() => {
  const receta = bebidas.receta;
  if (!receta) return [];

  const lista = [];
  for (let i = 1; i <= 15; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    if (ingrediente) {
      lista.push({ ingrediente, cantidad: receta[`strMeasure${i}`] });
    }
  }
  return lista;
});

const textoBoton = computed(() =>
  favoritos.existeFavorito() ? "Eliminar de Favoritos" : "Agregar a Favoritos"
);
</script>

<template>
  <div>
    <RouterLink
      :to="{ name: 'inicio' }"
      class="inline-block mb-8 font-bold text-brand-700 hover:text-brand-900"
    >
      &larr; Volver a la búsqueda
    </RouterLink>

    <div
      v-if="bebidas.cargandoReceta"
      class="animate-pulse max-w-4xl mx-auto"
    >
      <div class="h-10 w-2/3 bg-ink-100 rounded mb-6"></div>
      <div
        class="w-96 max-w-full h-96 bg-ink-100 rounded-xl mx-auto mb-6"
      ></div>
      <div class="h-6 w-1/2 bg-ink-100 rounded mb-3"></div>
      <div class="h-4 w-full bg-ink-100 rounded mb-2"></div>
      <div class="h-4 w-full bg-ink-100 rounded mb-2"></div>
    </div>

    <p
      v-else-if="!bebidas.receta"
      class="my-10 text-center text-2xl text-ink-700"
    >
      No se encontró esa receta.
    </p>

    <div v-else class="max-w-4xl mx-auto">
      <h1
        class="text-4xl md:text-5xl font-extrabold tracking-tight text-ink-900 my-5"
      >
        {{ bebidas.receta.strDrink }}
      </h1>

      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-if="bebidas.receta.strCategory"
          class="bg-brand-100 text-brand-800 text-xs font-bold uppercase px-3 py-1 rounded-full"
        >
          {{ bebidas.receta.strCategory }}
        </span>
        <span
          v-if="bebidas.receta.strAlcoholic"
          class="bg-ink-100 text-ink-800 text-xs font-bold uppercase px-3 py-1 rounded-full"
        >
          {{ bebidas.receta.strAlcoholic }}
        </span>
        <span
          v-if="bebidas.receta.strGlass"
          class="bg-ink-100 text-ink-800 text-xs font-bold uppercase px-3 py-1 rounded-full"
        >
          {{ bebidas.receta.strGlass }}
        </span>
      </div>

      <img
        :src="bebidas.receta.strDrinkThumb"
        :alt="'Imagen de ' + bebidas.receta.strDrink"
        class="mx-auto w-96 max-w-full rounded-xl shadow"
      />

      <div class="bg-ink-50 rounded-xl p-6 md:p-8 mt-8">
        <h2 class="text-2xl font-bold text-ink-900 mb-4">
          Ingredientes y Cantidades
        </h2>
        <ul class="space-y-2">
          <li
            v-for="({ ingrediente, cantidad }, index) in ingredientes"
            :key="index"
            class="flex items-start gap-2 text-lg text-ink-600"
          >
            <CheckCircleIcon
              class="w-5 h-5 mt-1 text-brand-500 shrink-0"
              aria-hidden="true"
            />
            <span>{{ ingrediente }} - {{ cantidad }}</span>
          </li>
        </ul>

        <h2 class="text-2xl font-bold text-ink-900 mt-8 mb-4">
          Instrucciones
        </h2>
        <p class="text-lg text-ink-600 leading-relaxed">
          {{ bebidas.receta.strInstructions }}
        </p>
      </div>

      <button
        type="button"
        class="mt-8 w-full rounded-lg bg-brand-600 p-3 font-bold uppercase text-white shadow hover:bg-brand-700"
        @click="favoritos.handeClickFavorito()"
      >
        {{ textoBoton }}
      </button>
    </div>
  </div>
</template>
