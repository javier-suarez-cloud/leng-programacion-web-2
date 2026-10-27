<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <main>
    <RouterView />
  </main>

  <footer>
    <p>Inventario de Equipamiento Tecnológico · Trabajo 2</p>
  </footer>
</template>