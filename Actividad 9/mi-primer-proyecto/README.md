# Actividad 9 - Formularios, v-model y validación en Vue.js

Proyecto de la Actividad 9 de Lenguaje de Programación Web II (IPVG).
Se agregó un formulario de contacto que enlaza sus campos con variables reactivas
mediante `v-model` y valida los campos obligatorios antes de mostrar los datos enviados.

## ¿Qué hace la aplicación?
- `Contacto.vue` tiene los campos nombre, correo, teléfono, mensaje y una casilla de suscripción al boletín.
- Cada campo está enlazado con `v-model`, por lo que el dato se actualiza en tiempo real.
- Al presionar **Enviar**, `validarFormulario()` revisa que los campos obligatorios estén completos:
  - Si falta alguno, muestra en rojo "Todos los campos son obligatorios".
  - Si están completos, muestra un resumen con los datos ingresados.
- Se mantiene el componente `Padre` / `Hijo` de la Actividad 2.

## Estructura
- `src/App.vue`: muestra los componentes `Padre` y `Contacto`.
- `src/components/Contacto.vue`: formulario con `v-model` y validación (Options API).
- `src/components/Padre.vue` y `Hijo.vue`: comunicación por props (Actividad 2).

## Tecnologías
- Vue 3 (Options API)
- Vite

## Cómo ejecutarlo
1. Instalar dependencias: `npm install`
2. Levantar el servidor: `npm run dev`
3. Abrir en el navegador: http://localhost:5173

## Autor
Javier Suárez
