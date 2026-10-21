<script setup>
import { productos } from './data/productos'
import ProductoCard from './components/ProductoCard.vue'
</script>

<template>
  <main>
    <h1>Feria Artesanal de Ñuble</h1>
    <ProductoCard v-for="producto in productos" :key="producto.id" :producto="producto" />
  </main>
</template>
