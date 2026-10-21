<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductoCard from '../components/ProductoCard.vue'

const productos = ref([])
const favoritos = ref([])
const error = ref('')

onMounted(async () => {
  const guardados = localStorage.getItem('favoritos')
  favoritos.value = guardados ? JSON.parse(guardados) : []

  // Los productos ahora vienen desde la API
  try {
    const respuesta = await fetch('http://localhost:3000/productos')
    if (!respuesta.ok) throw new Error('Error HTTP: ' + respuesta.status)
    productos.value = await respuesta.json()
  } catch (e) {
    console.error(e)
    error.value = 'No fue posible conectar con la API.'
  }
})

const productosFavoritos = computed(() => {
  return productos.value.filter(producto => favoritos.value.includes(producto.id))
})

function cambiarFavorito(id) {
  favoritos.value = favoritos.value.filter(item => item !== id)
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}
</script>

<template>
  <section class="pagina">
    <h1>Mis favoritos</h1>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-else-if="productosFavoritos.length" class="productos-grid">
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
