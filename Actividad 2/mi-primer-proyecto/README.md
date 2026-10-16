# Actividad 2 - Componentes y props en Vue.js

Proyecto de la Actividad 2 de Lenguaje de Programación Web II (IPVG).
El objetivo fue crear una estructura de componentes en Vue y comunicar datos
desde un componente padre hacia un componente hijo usando props.

## ¿Qué hace la aplicación?
El componente `Padre` envía el mensaje "Hola desde el padre" al componente `Hijo`,
y el hijo lo muestra en pantalla. La comunicación es unidireccional (padre → hijo).

## Estructura
- `src/App.vue`: componente principal; importa y muestra a `Padre`.
- `src/components/Padre.vue`: importa a `Hijo` y le pasa la prop `mensaje`.
- `src/components/Hijo.vue`: declara la prop `mensaje` y la muestra con `{{ mensaje }}`.

## Tecnologías
- Node.js
- Vue 3 (Options API)
- Vite

## Cómo ejecutarlo
1. Instalar dependencias: `npm install`
2. Levantar el servidor: `npm run dev`
3. Abrir en el navegador: http://localhost:5173

## Autor
Javier Suárez