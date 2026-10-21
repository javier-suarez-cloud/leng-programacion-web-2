# Actividad 10 - Feria Artesanal de Ñuble

## Objetivo
Construir un catálogo interactivo con Vue.js.

## Conceptos aplicados
- v-model
- v-if / v-else
- v-show
- v-for
- computed
- props y eventos

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura
- `src/App.vue`: componente principal. Contiene el buscador (`v-model="filtro"`), el selector de
  categoría (`v-model="categoria"`), el botón para mostrar/ocultar el catálogo (`v-show`), el mensaje
  sin resultados (`v-if` / `v-else`) y las propiedades computadas `categorias` y `listaFiltrada`.
- `src/components/ProductoCard.vue`: tarjeta reutilizable. Recibe un `producto` por props, formatea el
  precio en pesos chilenos con una propiedad computada y emite `ver-detalle` al presionar el botón.
- `src/components/ProductoModal.vue`: ventana con el detalle del producto. Recibe `producto` y
  `visible` por props, existe solo cuando está visible (`v-if`) y emite `close` al presionar la X,
  la tecla Escape o hacer clic fuera del contenido.
- `src/data/productos.js`: arreglo con los productos del catálogo y sus imágenes.

## Cambios realizados (desafío)
- Se agregó un cuarto producto: **Chanchito de greda de Quinchamalí** (categoría Artesanía), con su
  imagen. El selector de categorías lo reconoce solo, porque `categorias` se calcula desde los datos.
- Se modificó el texto principal del sitio para presentar productos de distintas comunas de Ñuble.
- Se agregó un aviso amarillo que aparece cuando el catálogo está oculto (`v-show="!mostrarCatalogo"`).

## Pruebas realizadas
| Prueba | Acción | Resultado |
|---|---|---|
| P1 | Buscar "miel" | Solo aparece Miel de Quillón |
| P2 | Seleccionar categoría Textil | Solo aparece el poncho |
| P3 | Buscar un texto inexistente | Aparece "No se encontraron productos" |
| P4 | Presionar Ocultar catálogo | La sección se oculta con v-show y aparece el aviso |
| P5 | Presionar Ver detalle | Se abre el modal del producto |
| P6 | Cerrar el modal | Se cierra con X, Escape o clic fuera |
| P7 | Cambiar el tamaño de la ventana | La grilla pasa de 1 a 2 o 3 columnas |

## Preguntas de cierre
- **v-if vs v-show:** `v-if` crea o elimina el elemento del DOM; `v-show` lo deja en el DOM y solo lo
  oculta con `display: none`.
- **¿Por qué :key en v-for?** Para que Vue identifique cada elemento y actualice solo los que cambian.
- **¿Ventaja de separar ProductoCard y ProductoModal?** Cada componente tiene una sola
  responsabilidad, se puede reutilizar y App.vue queda más ordenado.
- **¿Por qué listaFiltrada se actualiza sola?** Porque es una propiedad `computed`: Vue la recalcula
  automáticamente cuando cambian `filtro` o `categoria`.
- **¿Cómo viaja el producto de ProductoCard a ProductoModal?** ProductoCard emite `ver-detalle` con el
  producto → App.vue lo guarda en `seleccionado` → lo entrega a ProductoModal por la prop `producto`.

## Nota sobre las imágenes
Las imágenes de `src/assets/img` son ilustraciones propias con los mismos nombres de archivo que indica
la guía (`quesos-chillan.jpg`, `miel-chillan.jpg`, `tejidos-chillan.jpg`).

## Autor
Javier Suárez
