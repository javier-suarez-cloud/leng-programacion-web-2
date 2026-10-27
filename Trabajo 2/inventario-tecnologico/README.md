# Inventario de Equipamiento Tecnológico

App web para llevar el inventario de equipos tecnológicos de una institución: ver, agregar, editar y eliminar equipos.

**Estudiante:** Javier Suarez · Lenguaje de Programación Web II · IPVG Chillán 2026-2

## Tecnologías

Vue 3 (Vite) · NestJS 11 · TypeORM · MySQL 8

## Requisitos

Node.js 24, npm 11, MySQL 8, Nest CLI 11 y Git.

## Base de datos

Crear la base y dar permisos (como administrador de MySQL):

```sql
CREATE DATABASE inventario_tecnologico CHARACTER SET utf8mb4;
GRANT ALL ON inventario_tecnologico.* TO 'turismo'@'localhost';
FLUSH PRIVILEGES;
```

La tabla `equipos` se crea sola al iniciar el backend (TypeORM, `synchronize: true`).

## Variables de entorno

Copiar `backend/.env.example` a `backend/.env` y poner la clave en `DB_PASSWORD`. El `.env` no se sube a GitHub.

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=turismo
DB_PASSWORD=
DB_NAME=inventario_tecnologico
PORT=3000
```

## Cómo ejecutar

Backend (puerto 3000):

```bash
cd backend
npm install
npm run start
```

Frontend (puerto 5173):

```bash
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`.

## Endpoints

| Método | Ruta | Qué hace | Respuestas |
|---|---|---|---|
| GET | /equipos | Lista todos | 200 |
| GET | /equipos/:id | Trae uno | 200, 404 |
| POST | /equipos | Crea uno | 201, 400 |
| PATCH | /equipos/:id | Actualiza | 200, 400, 404 |
| DELETE | /equipos/:id | Elimina | 200, 404 |

Validaciones: código y nombre con mínimo 3 caracteres; tipo, marca, modelo y ubicación no vacíos; estado solo `Disponible`, `En uso`, `Mantención` o `Baja`; fecha válida; observaciones opcional. Campos extra dan 400.

## Estructura

```
backend/src/equipos/   dto, entities, controller, service, module
backend/src/           app.module.ts (conexión MySQL), main.ts (ValidationPipe, CORS)
frontend/src/          views, services (fetch), router, components
```

## Pruebas

| Prueba | Resultado |
|---|---|
| Backend conecta a MySQL y crea la tabla | ✔ |
| CRUD completo de la API | ✔ |
| POST inválido da 400 | ✔ |
| ID inexistente da 404 | ✔ |
| Los datos siguen al reiniciar el backend | ✔ |
| Vue lista, crea, edita y elimina (con confirmación) | ✔ |
| Buscador filtra la lista | ✔ |
| Con el backend apagado sale mensaje de error | ✔ |

La base tiene 5 equipos de prueba.

## Uso de IA

- **Herramienta:** Claude.
- **Dónde:** guía de armado del proyecto (backend, frontend y base de datos), en situaciones donde quedaba estancado o me daba muchos errores.
- **Tipo de apoyo:** explicación, generación de código, corrección de errores.
- Para ayudarme a escribir este README.
- **Lo que hice yo:** hice el código por etapas con ayuda de las actividades anteriores, lo probé, arreglé errores de configuración y de carpetas, hice los commits y estudié cada archivo para poder explicarlo.
