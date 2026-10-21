# Semana 2 - Backend con Express.js (CRUD y validaciones)

API REST de **atractivos turísticos de Chillán** con datos en memoria, validaciones y un frontend Vue
que la consume para listar y eliminar.

## Estructura
```
Actividad Semana 2/
├─ backend-express/          # API Express (http://localhost:3000)
│  └─ server.js              # rutas CRUD, validaciones y 404
└─ mi-primer-proyecto/       # Frontend Vue (http://localhost:5173)
   └─ src/components/Atractivos.vue   # lista y elimina usando fetch
```

## Cómo ejecutarlo
**Backend:**
```bash
cd backend-express
npm install
npm start          # o npm run dev (nodemon)
```
**Frontend:**
```bash
cd mi-primer-proyecto
npm install
npm run dev
```

## Endpoints
| Método | Ruta | Respuestas |
|---|---|---|
| GET | `/atractivos` | 200 |
| GET | `/atractivos/:id` | 200 / 404 |
| POST | `/atractivos` | 201 / 400 |
| PUT | `/atractivos/:id` | 200 / 400 / 404 |
| DELETE | `/atractivos/:id` | 200 / 404 |

Validaciones: `nombre` con al menos 3 caracteres y `descripcion` con al menos 10.

## Pruebas realizadas
| Petición | Resultado |
|---|---|
| GET /atractivos | 200, lista los 3 atractivos |
| POST /atractivos (Feria de Chillán) | 201, creado con id 4 |
| GET /atractivos/4 | 200, devuelve el creado |
| PUT /atractivos/4 | 200, descripción actualizada |
| POST con nombre "ab" | 400, "El nombre debe tener al menos 3 caracteres." |
| DELETE /atractivos/4 | 200, "Atractivo eliminado correctamente" |
| GET /atractivos/4 después de borrar | 404 |
| Frontend | Muestra la lista desde la API y el botón Eliminar la borra |

## Nota
Los datos viven en memoria: al reiniciar el servidor vuelven los 3 atractivos iniciales. Si el proyecto
está dentro de OneDrive, conviene usar `npm start` en vez de `npm run dev`, porque la sincronización puede
hacer que nodemon reinicie el servidor y se pierdan los cambios.

## Autor
Javier Suárez
