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
    <p>Feria Artesanal de Ñuble · Actividad 11</p>
  </footer>
</template>
