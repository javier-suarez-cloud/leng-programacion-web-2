# Actividad 13 - Integración de Vue.js con una API REST en NestJS

## Objetivo
La Feria Artesanal de Ñuble deja de depender de datos escritos en el frontend: se construyó una API REST
con NestJS (`feria-api`) y la SPA Vue (`actividad10-feria-nuble`) la consume para consultar y registrar productos.

## Estructura
```
Actividad 13/
├─ feria-api/                  # Backend NestJS (http://localhost:3000)
│  └─ src/
│     ├─ main.ts               # CORS para http://localhost:5173
│     ├─ app.controller.ts     # GET / y GET /health
│     └─ productos/            # módulo, controlador y servicio (datos en memoria)
└─ actividad10-feria-nuble/    # Frontend Vue + Vue Router (http://localhost:5173)
   └─ src/
      ├─ views/ProductosView.vue       # fetch GET, estados de carga/error, Reintentar
      ├─ components/NuevoProducto.vue  # formulario que hace POST
      ├─ views/ProductoDetalleView.vue # GET /productos/:id
      └─ views/FavoritosView.vue       # favoritos con productos de la API
```

## Cómo ejecutarlo (dos terminales)
**Backend:**
```bash
cd feria-api
npm install
npm run start:dev
```
**Frontend:**
```bash
cd actividad10-feria-nuble
npm install
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Endpoints implementados
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Mensaje de bienvenida |
| GET | `/health` | Estado del servicio: `{ "status": "ok", "servicio": "feria-api" }` |
| GET | `/productos` | Listado de productos |
| GET | `/productos/:id` | Un producto (404 si no existe) |
| POST | `/productos` | Registra un producto |

## Ejemplo de JSON para POST
```json
{
  "nombre": "Tazón de greda",
  "categoria": "Artesanía",
  "comuna": "Quinchamalí",
  "precio": 12000,
  "descripcion": "Producto artesanal de greda.",
  "imagen": "/img/tazon.jpg"
}
```

## Conceptos
- **GET:** pide información al servidor sin modificarla (listar o ver un producto).
- **POST:** envía datos al servidor para crear un recurso nuevo (registrar un producto).
- **JSON:** formato de texto con pares clave-valor que entienden tanto JavaScript como NestJS; es el
  "idioma" en que viajan los datos entre el frontend y el backend.
- **CORS:** Vue (puerto 5173) y NestJS (puerto 3000) son orígenes distintos. El navegador bloquea las
  peticiones entre orígenes salvo que el servidor las autorice; por eso `main.ts` usa
  `app.enableCors({ origin: 'http://localhost:5173' })`.

## Pruebas realizadas
| # | Prueba | Resultado |
|---|---|---|
| 1 | GET /productos | Devuelve el listado ✔ |
| 2 | GET /productos/1 | Devuelve Miel de Las Trancas ✔ |
| 3 | GET /productos/99 | 404 "Producto no encontrado" ✔ |
| 4 | Vue con la API activa | Muestra el catálogo ✔ |
| 5 | Vue con la API detenida | "No fue posible conectar con la API." + botón Reintentar ✔ |
| 6 | POST desde Thunder Client | Agrega el producto ✔ |
| 7 | POST desde Vue | Registra el producto y el catálogo se actualiza ✔ |
| 8 | Reiniciar NestJS | Los productos agregados desaparecen ✔ |

## Desafío individual: cantidad total de productos
- **Archivo modificado:** `actividad10-feria-nuble/src/views/ProductosView.vue`.
- Se muestra "Productos recibidos desde la API: N · Mostrando: M", donde N es el total recibido y M la
  cantidad que queda después de aplicar los filtros. Al registrar un producto nuevo, el total aumenta solo.

## Limitación actual
Los productos se guardan **solo en memoria** (un arreglo dentro de `ProductosService`). Al detener NestJS
esa memoria se libera y los productos agregados se pierden. La solución es agregar una base de datos
(Actividad 14: MySQL + TypeORM).

## Preguntas de cierre
- **Frontend vs backend:** el frontend muestra la interfaz y captura acciones del usuario; el backend
  guarda y entrega los datos.
- **fetch():** función del navegador para hacer peticiones HTTP. **await** espera la respuesta antes de
  seguir, sin bloquear la página.
- **onMounted():** ejecuta `cargarProductos()` apenas el componente aparece en pantalla.
- **Si NestJS está detenido:** `fetch` lanza un error, se captura en el `catch` y se muestra el mensaje con
  el botón Reintentar.

## Autor
Javier Suárez
