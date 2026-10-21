<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductoCard from '../components/ProductoCard.vue'
import { productos } from '../data/productos'

const buscar = ref('')
const categoria = ref('Todas')
const favoritos = ref([])

const categorias = computed(() => {
  return ['Todas', ...new Set(productos.map(p => p.categoria))]
})

const productosFiltrados = computed(() => {
  return productos.filter(producto => {
    const coincideTexto = producto.nombre
      .toLowerCase()
      .includes(buscar.value.toLowerCase())

    const coincideCategoria =
      categoria.value === 'Todas' ||
      producto.categoria === categoria.value

    return coincideTexto && coincideCategoria
  })
})

function cambiarFavorito(id) {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter(item => item !== id)
  } else {
    favoritos.value.push(id)
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

onMounted(() => {
  const guardados = localStorage.getItem('favoritos')
  if (guardados) favoritos.value = JSON.parse(guardados)
})
</script>

<template>
  <section class="pagina">
    <h1>Catálogo</h1>

    <div class="filtros">
      <input v-model="buscar" placeholder="Buscar producto..." />

      <select v-model="categoria">
        <option v-for="cat in categorias" :key="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div v-if="productosFiltrados.length" class="productos-grid">
      <ProductoCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
        :favorito="favoritos.includes(producto.id)"
        @cambiar-favorito="cambiarFavorito"
      />
    </div>

    <p v-else>No existen productos que coincidan con la búsqueda.</p>
  </section>
</template>
