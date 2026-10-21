# Feria Artesanal de Ñuble

## Actividad 11 - Vue Router

En esta actividad se transformó el proyecto Feria Artesanal de Ñuble
en una SPA utilizando Vue Router.

### Funcionalidades
- Navegación mediante RouterLink.
- Rutas para Inicio, Productos, Favoritos y Contacto.
- Ruta dinámica para detalle de producto.
- Página 404.
- Filtro de productos.
- Componentes reutilizables.
- Props y emit.
- Favoritos persistentes mediante localStorage.

### Tecnologías
- Vue 3
- Vite
- Vue Router
- JavaScript
- CSS
- localStorage

### Rutas
| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con buscador, filtro por categoría y por comuna |
| `/productos/:id` | Detalle del producto |
| `/favoritos` | Productos marcados como favoritos |
| `/contacto` | Formulario de contacto con validación |
| Otra ruta | Página 404 |

### Cómo ejecutarlo
```bash
npm install
npm run dev
```

### Estructura
- `src/router/index.js`: define las rutas y crea el router con `createWebHistory`.
- `src/components/Navbar.vue`: menú con `RouterLink`.
- `src/components/ProductoCard.vue`: tarjeta que recibe `producto` y `favorito` por props y emite `cambiar-favorito`.
- `src/views/`: una vista por ruta (Inicio, Productos, Detalle, Favoritos, Contacto, 404).
- `src/data/productos.js`: datos del catálogo; las imágenes están en `public/img`.

### Desafío individual: filtro por comuna
- **Archivo modificado:** `src/views/ProductosView.vue`.
- **Comportamiento agregado:** un segundo `<select>` con las comunas, calculadas automáticamente con
  `computed` a partir de los productos. El listado se filtra por texto, categoría **y** comuna al mismo tiempo.
- **Cómo se verificó:** al elegir "San Carlos" solo aparece la mermelada; combinado con la categoría
  "Alimentos" se mantiene la intersección; con "Todas" vuelven los 4 productos.

### Pruebas realizadas
1. `/` muestra Inicio. ✔
2. `/productos` muestra el catálogo. ✔
3. El buscador filtra por nombre. ✔
4. El selector de categorías filtra correctamente. ✔
5. "Ver detalle" abre `/productos/:id` con el producto correspondiente. ✔
6. Un producto inexistente (`/productos/99`) muestra "Producto no encontrado". ✔
7. Un favorito se mantiene después de actualizar el navegador. ✔
8. `/favoritos` muestra solo los productos seleccionados. ✔
9. Se puede quitar un favorito desde la vista de favoritos. ✔
10. El formulario de contacto impide enviar campos vacíos. ✔
11. Una dirección inexistente muestra la página 404. ✔

## Autor
Javier Suárez
