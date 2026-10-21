<script setup>
import { ref, onMounted, computed } from 'vue'
import ProductoCard from '../components/ProductoCard.vue'
import NuevoProducto from '../components/NuevoProducto.vue'

const productos = ref([])
const cargando = ref(true)
const error = ref('')

const buscar = ref('')
const categoria = ref('Todas')
const comuna = ref('Todas')
const favoritos = ref([])

async function cargarProductos() {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await fetch('http://localhost:3000/productos')

    if (!respuesta.ok) {
      throw new Error('Error HTTP: ' + respuesta.status)
    }

    productos.value = await respuesta.json()
  } catch (e) {
    console.error(e)
    error.value = 'No fue posible conectar con la API.'
  } finally {
    cargando.value = false
  }
}

const categorias = computed(() => {
  return ['Todas', ...new Set(productos.value.map(p => p.categoria))]
})

const comunas = computed(() => {
  return ['Todas', ...new Set(productos.value.map(p => p.comuna))]
})

const productosFiltrados = computed(() => {
  return productos.value.filter(producto => {
    const coincideTexto = producto.nombre
      .toLowerCase()
      .includes(buscar.value.toLowerCase())

    const coincideCategoria =
      categoria.value === 'Todas' ||
      producto.categoria === categoria.value

    const coincideComuna =
      comuna.value === 'Todas' ||
      producto.comuna === comuna.value

    return coincideTexto && coincideCategoria && coincideComuna
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
  cargarProductos()
})
</script>

<template>
  <section class="pagina">
    <h1>Catálogo</h1>

    <NuevoProducto @creado="cargarProductos" />

    <p v-if="cargando">Cargando productos...</p>

    <div v-else-if="error" class="error-api">
      <p>{{ error }}</p>
      <button @click="cargarProductos">Reintentar</button>
    </div>

    <div v-else>
      <!-- Desafío: cantidad total de productos recibidos desde la API -->
      <p class="total-api">
        Productos recibidos desde la API: <strong>{{ productos.length }}</strong>
        · Mostrando: <strong>{{ productosFiltrados.length }}</strong>
      </p>

      <div class="filtros">
        <input v-model="buscar" placeholder="Buscar producto..." />

        <select v-model="categoria">
          <option v-for="cat in categorias" :key="cat">
            {{ cat }}
          </option>
        </select>

        <select v-model="comuna">
          <option v-for="c in comunas" :key="c">
            {{ c }}
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
    </div>
  </section>
</template>
