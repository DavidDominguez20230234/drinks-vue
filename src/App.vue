<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Notificacion from "./components/Notificacion.vue";
</script>
<template>
  <Header />
  <main class="container mx-auto mt-10 mb-20 px-5">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <Notificacion />
</template>
