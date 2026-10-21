<script setup>
import { ref } from 'vue'

// Avisa a la vista padre que se creó un producto, para recargar el catálogo
const emit = defineEmits(['creado'])

const nuevoProducto = ref({
  nombre: '',
  categoria: '',
  comuna: '',
  precio: '',
  descripcion: '',
  imagen: ''
})

const mensaje = ref('')
const errorFormulario = ref('')

async function guardarProducto() {
  mensaje.value = ''
  errorFormulario.value = ''

  if (!nuevoProducto.value.nombre ||
      !nuevoProducto.value.categoria ||
      !nuevoProducto.value.comuna ||
      !nuevoProducto.value.precio) {
    errorFormulario.value = 'Complete los campos obligatorios.'
    return
  }

  try {
    const respuesta = await fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...nuevoProducto.value,
        precio: Number(nuevoProducto.value.precio)
      })
    })

    if (!respuesta.ok) {
      throw new Error('No fue posible guardar')
    }

    mensaje.value = 'Producto registrado correctamente.'
    emit('creado')

    nuevoProducto.value = {
      nombre: '',
      categoria: '',
      comuna: '',
      precio: '',
      descripcion: '',
      imagen: ''
    }
  } catch (e) {
    errorFormulario.value = 'Error al conectar con la API.'
  }
}
</script>

<template>
  <form class="formulario" @submit.prevent="guardarProducto">
    <h2>Nuevo producto</h2>

    <input v-model="nuevoProducto.nombre" placeholder="Nombre" />
    <input v-model="nuevoProducto.categoria" placeholder="Categoría" />
    <input v-model="nuevoProducto.comuna" placeholder="Comuna" />
    <input v-model="nuevoProducto.precio" type="number" placeholder="Precio" />
    <textarea v-model="nuevoProducto.descripcion"
              placeholder="Descripción"></textarea>
    <input v-model="nuevoProducto.imagen"
           placeholder="/img/producto.jpg" />

    <button type="submit">Guardar producto</button>

    <p v-if="mensaje" class="correcto">{{ mensaje }}</p>
    <p v-if="errorFormulario" class="error">{{ errorFormulario }}</p>
  </form>
</template>
