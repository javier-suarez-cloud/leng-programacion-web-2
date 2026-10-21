<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Emprendedores from './components/Emprendedores.vue'

// Al cargar la página se recupera la sesión guardada (si existe)
const token = ref(localStorage.getItem('token'))
const rol = ref(localStorage.getItem('rol'))
const email = ref(localStorage.getItem('email'))

function iniciarSesion(data) {
  localStorage.setItem('token', data.token)
  localStorage.setItem('rol', data.rol)
  localStorage.setItem('email', data.email)
  token.value = data.token
  rol.value = data.rol
  email.value = data.email
}

function cerrarSesion() {
  localStorage.removeItem('token')
  localStorage.removeItem('rol')
  localStorage.removeItem('email')
  token.value = null
  rol.value = null
  email.value = null
}
</script>

<template>
  <header class="barra">
    <h1>Emprendedores de Ñuble</h1>
    <div v-if="token" class="usuario">
      <span>{{ rol === 'admin' ? 'Admin' : 'Viewer' }} conectado ({{ email }})</span>
      <button class="secundario" @click="cerrarSesion">Cerrar sesión</button>
    </div>
  </header>

  <main>
    <!-- Sin token se muestra el login; con token, el listado -->
    <Login v-if="!token" @login="iniciarSesion" />
    <Emprendedores v-else :token="token" :rol="rol" @sesion-expirada="cerrarSesion" />
  </main>
</template>
