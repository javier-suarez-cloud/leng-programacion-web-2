<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="marca">
      <h2>Feria Ñuble</h2>
    </div>

    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/productos">Productos</RouterLink>
      <RouterLink to="/productos/nuevo">
        Nuevo producto
      </RouterLink>
      <RouterLink to="/favoritos">Favoritos</RouterLink>
      <RouterLink to="/contacto">Contacto</RouterLink>
    </nav>
  </header>
</template>
