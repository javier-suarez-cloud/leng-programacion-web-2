<script setup>
import { ref } from 'vue'
import { apiFetch } from '../api'

const emit = defineEmits(['login'])

const email = ref('')
const password = ref('')
const error = ref('')
const cargando = ref(false)

async function iniciarSesion() {
  error.value = ''
  cargando.value = true
  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    emit('login', data)
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <form class="tarjeta login" @submit.prevent="iniciarSesion">
    <h2>Iniciar sesión</h2>

    <label>
      Email
      <input v-model="email" type="email" required />
    </label>

    <label>
      Password
      <input v-model="password" type="password" required />
    </label>

    <button type="submit" :disabled="cargando">
      {{ cargando ? 'Ingresando...' : 'Iniciar sesión' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>
