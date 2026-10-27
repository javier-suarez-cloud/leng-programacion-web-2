<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  eliminarEquipo,
  obtenerEquipos,
} from '../services/equiposService'

const equipos = ref([])
const cargando = ref(true)
const error = ref('')
const busqueda = ref('')

const equiposFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase()

  return equipos.value.filter(e =>
    e.nombre.toLowerCase().includes(texto) ||
    e.codigoInventario.toLowerCase().includes(texto) ||
    e.tipo.toLowerCase().includes(texto) ||
    e.ubicacion.toLowerCase().includes(texto) ||
    e.estado.toLowerCase().includes(texto)
  )
})

async function cargar() {
  try {
    cargando.value = true
    error.value = ''
    equipos.value = await obtenerEquipos()
  } catch (e) {
    console.error(e)
    error.value = 'No fue posible conectar con la API.'
  } finally {
    cargando.value = false
  }
}

async function borrar(id) {
  if (!confirm('¿Eliminar este equipo?')) return

  try {
    await eliminarEquipo(id)
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

onMounted(cargar)
</script>

<template>
  <main>
    <h1>Equipos tecnológicos</h1>

    <input
      v-model="busqueda"
      placeholder="Buscar por nombre, código, tipo, ubicación o estado"
    />

    <p v-if="cargando">Cargando equipos...</p>

    <div v-else-if="error" class="error-api">
      <p>{{ error }}</p>
      <button @click="cargar">Reintentar</button>
    </div>

    <section v-else>
      <article
        v-for="equipo in equiposFiltrados"
        :key="equipo.id"
      >
        <h2>{{ equipo.nombre }}</h2>
        <p>{{ equipo.codigoInventario }} · {{ equipo.tipo }}</p>
        <p>{{ equipo.marca }} {{ equipo.modelo }}</p>
        <p>Ubicación: {{ equipo.ubicacion }}</p>
        <strong>{{ equipo.estado }}</strong>

        <RouterLink :to="`/equipos/${equipo.id}`">
          Ver detalle
        </RouterLink>

        <button @click="borrar(equipo.id)">
          Eliminar
        </button>
      </article>
    </section>
  </main>
</template>