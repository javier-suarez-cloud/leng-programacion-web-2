<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '../api'

const props = defineProps({
  token: { type: String, required: true },
  rol: { type: String, required: true }
})
const emit = defineEmits(['sesion-expirada'])

const RUBROS = ['Apicultura', 'Lácteos', 'Textiles', 'Turismo', 'Artesanía', 'Agricultura']
const formularioVacio = { nombre: '', comuna: '', rubro: 'Apicultura', descripcion: '', contacto: '' }

const lista = ref([])
const form = ref({ ...formularioVacio })
const editandoId = ref(null)
const mensaje = ref('')
const error = ref('')

const esAdmin = computed(() => props.rol === 'admin')

async function cargar() {
  try {
    lista.value = await apiFetch('/emprendedores')
  } catch (e) {
    error.value = 'No se pudo conectar con el backend: ' + e.message
  }
}

// Ejecuta una acción protegida y maneja los errores en un solo lugar
async function ejecutar(accion, textoExito) {
  mensaje.value = ''
  error.value = ''
  try {
    await accion()
    mensaje.value = textoExito
    await cargar()
  } catch (e) {
    if (e.status === 401) emit('sesion-expirada') // token vencido o inválido
    else error.value = e.message
  }
}

function guardar() {
  const id = editandoId.value
  ejecutar(async () => {
    if (id) {
      await apiFetch(`/emprendedores/${id}`, { method: 'PUT', body: form.value, token: props.token })
    } else {
      await apiFetch('/emprendedores', { method: 'POST', body: form.value, token: props.token })
    }
    cancelar()
  }, id ? 'Emprendedor actualizado.' : 'Emprendedor agregado.')
}

function editar(emprendedor) {
  const { id, ...datos } = emprendedor
  editandoId.value = id
  form.value = datos
}

function cancelar() {
  editandoId.value = null
  form.value = { ...formularioVacio }
}

function eliminar(emprendedor) {
  if (!confirm(`¿Eliminar "${emprendedor.nombre}"?`)) return
  ejecutar(
    () => apiFetch(`/emprendedores/${emprendedor.id}`, { method: 'DELETE', token: props.token }),
    'Emprendedor eliminado.'
  )
}

onMounted(cargar)
</script>

<template>
  <!-- Formulario: solo lo ve el admin -->
  <form v-if="esAdmin" class="tarjeta formulario" @submit.prevent="guardar">
    <h2 class="completo">{{ editandoId ? 'Editar emprendedor' : 'Agregar emprendedor' }}</h2>

    <label>Nombre <input v-model="form.nombre" /></label>
    <label>Comuna <input v-model="form.comuna" /></label>
    <label>
      Rubro
      <select v-model="form.rubro">
        <option v-for="r in RUBROS" :key="r">{{ r }}</option>
      </select>
    </label>
    <label>Contacto <input v-model="form.contacto" /></label>
    <label class="completo">Descripción <textarea v-model="form.descripcion" rows="2"></textarea></label>

    <div class="acciones completo">
      <button type="submit">{{ editandoId ? 'Guardar cambios' : 'Agregar' }}</button>
      <button v-if="editandoId" type="button" class="secundario" @click="cancelar">Cancelar</button>
    </div>
  </form>

  <p v-if="mensaje" class="ok">{{ mensaje }}</p>
  <p v-if="error" class="error">{{ error }}</p>

  <section class="tarjeta">
    <h2>Listado ({{ lista.length }})</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Comuna</th>
          <th>Rubro</th>
          <th>Contacto</th>
          <th v-if="esAdmin">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in lista" :key="e.id">
          <td :title="e.descripcion">{{ e.nombre }}</td>
          <td>{{ e.comuna }}</td>
          <td>{{ e.rubro }}</td>
          <td>{{ e.contacto }}</td>
          <!-- Botones de editar/eliminar: solo admin -->
          <td v-if="esAdmin" class="acciones">
            <button class="secundario" @click="editar(e)">Editar</button>
            <button class="peligro" @click="eliminar(e)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
