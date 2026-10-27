<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="marca">
      <h2>Inventario Tecnológico</h2>
    </div>

    <nav>
      <RouterLink to="/equipos">Equipos</RouterLink>
      <RouterLink to="/equipos/nuevo">
        Nuevo equipo
      </RouterLink>
    </nav>
  </header>
</template>