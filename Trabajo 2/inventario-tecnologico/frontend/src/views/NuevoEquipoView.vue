<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { crearEquipo } from '../services/equiposService'

const router = useRouter()
const error = ref('')
const guardando = ref(false)

const equipo = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: '',
  observaciones: '',
})

async function guardar() {
  try {
    guardando.value = true
    error.value = ''

    await crearEquipo({
      ...equipo.value,
    })

    router.push('/equipos')
  } catch (e) {
    error.value = e.message
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <main>
    <h1>Nuevo equipo</h1>

    <form class="formulario" @submit.prevent="guardar">
      <label>Código de inventario</label>
      <input v-model="equipo.codigoInventario" required />

      <label>Nombre</label>
      <input v-model="equipo.nombre" required />

      <label>Tipo</label>
      <input v-model="equipo.tipo" placeholder="Notebook, PC, Monitor, Proyector" required />

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

      <button :disabled="guardando">
        {{ guardando ? 'Guardando...' : 'Guardar equipo' }}
      </button>
    </form>
  </main>
</template>