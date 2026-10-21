<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductoCard from '../components/ProductoCard.vue'
import { productos } from '../data/productos'

const favoritos = ref([])

onMounted(() => {
  const guardados = localStorage.getItem('favoritos')
  favoritos.value = guardados ? JSON.parse(guardados) : []
})

const productosFavoritos = computed(() => {
  return productos.filter(producto => favoritos.value.includes(producto.id))
})

function cambiarFavorito(id) {
  favoritos.value = favoritos.value.filter(item => item !== id)
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}
</script>

<template>
  <section class="pagina">
    <h1>Mis favoritos</h1>

    <div v-if="productosFavoritos.length" class="productos-grid">
      <ProductoCard
        v-for="producto in productosFavoritos"
        :key="producto.id"
        :producto="producto"
        :favorito="true"
        @cambiar-favorito="cambiarFavorito"
      />
    </div>

    <div v-else>
      <p>Aún no has seleccionado productos favoritos.</p>
      <RouterLink to="/productos">Revisar catálogo</RouterLink>
    </div>
  </section>
</template>
