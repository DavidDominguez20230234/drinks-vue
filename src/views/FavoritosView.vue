<script setup>
import Receta from "@/components/Receta.vue";
import { useFavoritosStore } from "@/stores/favoritos";

const favoritos = useFavoritosStore();
</script>
<template>
  <div>
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-ink-900">
      Favoritos
    </h1>
    <p v-if="favoritos.noFavoritos" class="my-10 text-center text-2xl">
      Aún no tienes favoritos. Busca una receta y agrégala desde su página.
    </p>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
    >
      <Receta
        v-for="(receta, index) in favoritos.favoritos"
        :receta="receta"
        :index="index"
        :key="receta.idDrink"
      />
    </div>
  </div>
</template>
