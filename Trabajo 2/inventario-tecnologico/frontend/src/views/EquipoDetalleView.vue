<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { actualizarEquipo, obtenerEquipo } from '../services/equiposService'

const route = useRoute()

const equipo = ref(null)
const cargando = ref(true)
const error = ref('')
const editando = ref(false)

async function cargar() {
  try {
    cargando.value = true
    error.value = ''
    equipo.value = await obtenerEquipo(route.params.id)
  } catch (e) {
    error.value = e.message
    equipo.value = null
  } finally {
    cargando.value = false
  }
}

async function guardarCambios() {
  try {
    await actualizarEquipo(route.params.id, {
      codigoInventario: equipo.value.codigoInventario,
      nombre: equipo.value.nombre,
      tipo: equipo.value.tipo,
      marca: equipo.value.marca,
      modelo: equipo.value.modelo,
      ubicacion: equipo.value.ubicacion,
      estado: equipo.value.estado,
      fechaAdquisicion: equipo.value.fechaAdquisicion,
      observaciones: equipo.value.observaciones,
    })

    editando.value = false
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

function cancelar() {
  editando.value = false
  cargar()
}

onMounted(cargar)
</script>

<template>
  <section class="pagina">
    <p v-if="cargando">Cargando equipo...</p>

    <div v-else-if="!equipo">
      <h2>{{ error || 'Equipo no encontrado' }}</h2>
      <RouterLink to="/equipos">Volver</RouterLink>
    </div>

    <!-- Modo lectura -->
    <div v-else-if="!editando" class="detalle-producto">
      <div>
        <span>{{ equipo.tipo }}</span>
        <h1>{{ equipo.nombre }}</h1>
        <p>Código de inventario: {{ equipo.codigoInventario }}</p>
        <p>Marca: {{ equipo.marca }}</p>
        <p>Modelo: {{ equipo.modelo }}</p>
        <p>Ubicación: {{ equipo.ubicacion }}</p>
        <p>Estado: {{ equipo.estado }}</p>
        <p>Fecha de adquisición: {{ equipo.fechaAdquisicion }}</p>
        <p>Observaciones: {{ equipo.observaciones || '—' }}</p>
        <p v-if="error" class="error">{{ error }}</p>
        <button @click="editando = true">Editar</button>
        <RouterLink to="/equipos">← Volver al listado</RouterLink>
      </div>
    </div>

    <!-- Modo edición -->
    <form v-else class="formulario" @submit.prevent="guardarCambios">
      <h1>Editar equipo</h1>

      <label>Código de inventario</label>
      <input v-model="equipo.codigoInventario" required />

      <label>Nombre</label>
      <input v-model="equipo.nombre" required />

      <label>Tipo</label>
      <input v-model="equipo.tipo" required />

      <label>Marca</label>
      <input v-model="equipo.marca" required />

      <label>Modelo</label>
      <input v-model="equipo.modelo" required />

      <label>Ubicación</label>
      <input v-model="equipo.ubicacion" required />

      <label>Estado</label>
      <select v-model="equipo.estado" required>
        <option>Disponible</option>
        <option>En uso</option>
        <option>Mantención</option>
        <option>Baja</option>
      </select>

      <label>Fecha de adquisición</label>
      <input v-model="equipo.fechaAdquisicion" type="date" required />

      <label>Observaciones</label>
      <textarea v-model="equipo.observaciones"></textarea>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="acciones">
        <button type="submit">Guardar cambios</button>
        <button type="button" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </section>
</template>