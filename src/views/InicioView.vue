<script setup>
import Receta from "../components/Receta.vue";
import RecetaSkeleton from "../components/RecetaSkeleton.vue";
import { useBebidasStore } from "../stores/bebidas";
const bebidas = useBebidasStore();
</script>
<template>
  <div>
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-ink-900">
      Recetas
    </h1>

    <div
      v-if="bebidas.cargando"
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
    >
      <RecetaSkeleton v-for="n in 6" :key="n" />
    </div>

    <p
      v-else-if="bebidas.error"
      class="my-10 text-center text-2xl text-red-600"
    >
      Ocurrió un error al buscar recetas. Intenta de nuevo.
    </p>

    <p v-else-if="bebidas.noRecetas" class="my-10 text-center text-2xl">
      No hay resultados
    </p>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
    >
      <Receta
        v-for="(receta, index) in bebidas.recetas"
        :receta="receta"
        :index="index"
        :key="receta.idDrink"
      />
    </div>
  </div>
</template>
