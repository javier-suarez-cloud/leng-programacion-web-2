<script setup>
import { ref, onMounted } from 'vue'

const API = 'http://localhost:3000'
const atractivos = ref([])
const cargando = ref(false)
const error = ref('')

async function cargar() {
  try {
    cargando.value = true
    const r = await fetch(`${API}/atractivos`)
    atractivos.value = await r.json()
  } catch (e) {
    error.value = 'No se pudo cargar la lista.'
  } finally {
    cargando.value = false
  }
}

async function eliminar(id) {
  const ok = confirm('¿Eliminar este atractivo?')
  if (!ok) return
  await fetch(`${API}/atractivos/${id}`, { method: 'DELETE' })
  atractivos.value = atractivos.value.filter(a => a.id !== id)
}

onMounted(cargar)
</script>
<template>
  <div>
    <h2>Atractivos de Chillán</h2>
    <p v-if="cargando">Cargando…</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="!cargando && atractivos.length">
      <li v-for="a in atractivos" :key="a.id">
        <strong>{{ a.nombre }}</strong> — {{ a.descripcion }}
        <em v-if="a.ubicacion"> ({{ a.ubicacion }})</em>
        <button @click="eliminar(a.id)" style="margin-left:8px">Eliminar</button>
      </li>
    </ul>

    <p v-else-if="!cargando">Sin datos por ahora.</p>
  </div>
</template>
