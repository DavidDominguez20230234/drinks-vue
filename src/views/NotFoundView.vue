<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-20">
    <img class="w-24 mb-6" src="/img/icon-mark.svg" alt="Mixly" />
    <p class="text-7xl font-extrabold text-brand-500">404</p>
    <h1 class="text-3xl font-extrabold text-ink-900 mt-4">
      Esta página se sirvió vacía
    </h1>
    <p class="text-lg text-ink-500 mt-2 max-w-md">
      No encontramos lo que buscabas. Puede que el enlace esté roto o la
      receta ya no exista.
    </p>
    <RouterLink
      :to="{ name: 'inicio' }"
      class="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-bold uppercase text-white shadow hover:bg-brand-700"
    >
      Volver a Inicio
    </RouterLink>
  </div>
</template>
