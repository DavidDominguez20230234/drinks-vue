<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  receta: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div
    class="group rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-fade-in-up"
    :style="{ animationDelay: `${Math.min(index, 10) * 60}ms` }"
  >
    <div class="overflow-hidden aspect-square">
      <img
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        :src="receta.strDrinkThumb"
        :alt="'Imagen de ' + receta.strDrink"
      />
    </div>
    <div class="p-4">
      <h2
        class="text-xl truncate font-bold text-ink-900"
        :title="receta.strDrink"
      >
        {{ receta.strDrink }}
      </h2>
      <RouterLink
        :to="{ name: 'receta', params: { id: receta.idDrink } }"
        class="mt-4 block text-center border border-brand-500 text-brand-700 font-semibold rounded-lg p-2.5 uppercase text-sm transition-colors group-hover:bg-brand-500 group-hover:text-white"
      >
        Ver Receta
      </RouterLink>
    </div>
  </div>
</template>
