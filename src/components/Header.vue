<script setup>
import { computed, ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon, SparklesIcon } from "@heroicons/vue/24/outline";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useBebidasStore } from "../stores/bebidas";
import { useNotificacionStore } from "@/stores/notificaciones";

const route = useRoute();
const router = useRouter();
const store = useBebidasStore();
const notificaciones = useNotificacionStore();
const paginaInicio = computed(() => route.name === "inicio");
const buscandoAleatoria = ref(false);

const enlaces = [
  { name: "inicio", texto: "Inicio" },
  { name: "favoritos", texto: "Favoritos" },
  { name: "ia", texto: "Generar con IA" },
];

const handelSubmit = () => {
  if (!store.busqueda.nombre && !store.busqueda.categoria) {
    notificaciones.$patch({
      texto: "Ingresa un nombre/ingrediente o selecciona una categoría",
      mostrar: true,
      error: true,
    });
    return;
  }
  store.obtenerRecetas();
};

const handleAleatoria = async () => {
  buscandoAleatoria.value = true;
  const receta = await store.obtenerRecetaAleatoria();
  buscandoAleatoria.value = false;

  if (receta) {
    router.push({ name: "receta", params: { id: receta.idDrink } });
  }
};
</script>
<template>
  <Disclosure
    v-slot="{ open }"
    as="header"
    class="bg-ink-900"
    :class="{ header: paginaInicio }"
  >
    <div class="max-auto container px-5 py-6 md:py-16">
      <div class="flex justify-between items-center">
        <RouterLink :to="{ name: 'inicio' }" class="flex items-center gap-2">
          <img class="h-9" src="/img/logo.svg" alt="Mixly" />
        </RouterLink>

        <nav class="hidden md:flex gap-6 text-white">
          <RouterLink
            v-for="enlace in enlaces"
            :key="enlace.name"
            :to="{ name: enlace.name }"
            class="uppercase font-bold tracking-wide hover:text-brand-400 transition-colors"
            active-class="text-brand-400"
          >
            {{ enlace.texto }}
          </RouterLink>
        </nav>

        <DisclosureButton
          class="md:hidden text-white p-2 rounded hover:bg-white/10"
        >
          <XMarkIcon v-if="open" class="w-8 h-8" />
          <Bars3Icon v-else class="w-8 h-8" />
        </DisclosureButton>
      </div>

      <DisclosurePanel class="md:hidden mt-6 flex flex-col gap-4 text-white">
        <RouterLink
          v-for="enlace in enlaces"
          :key="enlace.name"
          :to="{ name: enlace.name }"
          class="uppercase font-bold tracking-wide hover:text-brand-400"
          active-class="text-brand-400"
        >
          {{ enlace.texto }}
        </RouterLink>
      </DisclosurePanel>

      <form
        class="md:w-2/3 2xl:w-1/2 bg-brand-500 my-16 p-10 rounded-lg shadow space-y-6"
        v-if="paginaInicio"
        @submit.prevent="handelSubmit"
      >
        <div class="space-y-4">
          <label
            id="ingredientes"
            class="block text-white uppercase font-semibold text-lg"
            for="ingrediente"
            >Nombre O Ingredientes</label
          >
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
            v-model="store.busqueda.nombre"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label
              class="block text-white uppercase font-semibold text-sm"
              for="categoria"
              >Categoría</label
            >
            <select
              id="categoria"
              class="p-3 w-full rounded-lg focus:outline-none"
              v-model="store.busqueda.categoria"
            >
              <option value="">-- Todas --</option>
              <option
                v-for="categoria in store.categorias"
                :key="categoria.strCategory"
                :value="categoria.strCategory"
              >
                {{ categoria.strCategory }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label
              class="block text-white uppercase font-semibold text-sm"
              for="alcoholica"
              >Alcohólica</label
            >
            <select
              id="alcoholica"
              class="p-3 w-full rounded-lg focus:outline-none"
              v-model="store.busqueda.alcoholica"
            >
              <option value="">-- Todas --</option>
              <option
                v-for="opcion in store.alcoholicas"
                :key="opcion.strAlcoholic"
                :value="opcion.strAlcoholic"
              >
                {{ opcion.strAlcoholic }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label
              class="block text-white uppercase font-semibold text-sm"
              for="vaso"
              >Tipo de Vaso</label
            >
            <select
              id="vaso"
              class="p-3 w-full rounded-lg focus:outline-none"
              v-model="store.busqueda.vaso"
            >
              <option value="">-- Todos --</option>
              <option
                v-for="opcion in store.vasos"
                :key="opcion.strGlass"
                :value="opcion.strGlass"
              >
                {{ opcion.strGlass }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <input
            type="submit"
            class="bg-ink-900 hover:bg-ink-800 cursor-pointer text-white font-extrabold flex-1 p-3 rounded-lg uppercase"
            value="Buscar Recetas"
          />
          <button
            type="button"
            :disabled="buscandoAleatoria"
            :class="{ 'opacity-60 cursor-not-allowed': buscandoAleatoria }"
            class="bg-white hover:bg-brand-50 text-brand-700 font-extrabold p-3 rounded-lg uppercase flex items-center justify-center gap-2"
            @click="handleAleatoria"
          >
            <SparklesIcon class="w-5 h-5" />
            {{ buscandoAleatoria ? "Buscando..." : "Sorpréndeme" }}
          </button>
        </div>
      </form>
    </div>
  </Disclosure>
</template>
<style scoped>
.header {
  background-image: linear-gradient(
      to bottom,
      rgba(13, 15, 23, 0.75),
      rgba(13, 15, 23, 0.9)
    ),
    url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
