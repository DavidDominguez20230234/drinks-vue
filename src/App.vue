<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Modal from "./components/Modal.vue";
import Notificacion from "./components/Notificacion.vue";
</script>
<template>
  <Header />
  <main class="container mx-auto mt-10">
    <RouterView />
  </main>
  <Modal />
  <Notificacion />
</template>
