# Inventario de Equipamiento Tecnológico

Este proyecto es una aplicación web para guardar y ordenar los equipos tecnológicos de una institución (notebooks, PC, monitores, proyectores, etc.). Así toda la información queda en un solo lugar y se puede ver, agregar, cambiar y borrar equipos.

**Estudiante:** Javier Suarez

## Tecnologías

- Vue.js 3 con Vite: la parte que ve el usuario (frontend).
- NestJS 11: el servidor que atiende las peticiones (backend, API REST).
- TypeORM: conecta el servidor con la base de datos.
- MySQL 8: donde se guardan los datos.

## Requisitos de instalación

Antes de empezar hay que tener instalado:

- Node.js 24 y npm 11
- MySQL 8
- Nest CLI 11
- Git

## Variables de entorno

Las variables están en el archivo `backend/.env.example`. Para usarlas hay que copiar ese archivo como `backend/.env` y escribir la clave de MySQL en `DB_PASSWORD`.

El archivo `.env` tiene la clave real, por eso no se sube a GitHub.

## Base de datos MySQL

1. Crear la base de datos y darle permisos al usuario (se hace como administrador de MySQL):

```sql
CREATE DATABASE inventario_tecnologico CHARACTER SET utf8mb4;
GRANT ALL ON inventario_tecnologico.* TO 'turismo'@'localhost';
FLUSH PRIVILEGES;
```

2. Copiar `backend/.env.example` como `backend/.env` y completar `DB_PASSWORD` con la clave del usuario de MySQL.

3. No hay que crear las tablas a mano. Cuando se inicia el backend, TypeORM crea la tabla `equipos` solo, usando la entidad (`synchronize: true`, que sirve para desarrollo).

Así queda la tabla `equipos`:

| Campo | Tipo | Obligatorio |
|---|---|---|
| id | int (autoincremental, clave primaria) | Sí |
| codigoInventario | varchar(50) | Sí |
| nombre | varchar(100) | Sí |
| tipo | varchar(50) | Sí |
| marca | varchar(50) | Sí |
| modelo | varchar(50) | Sí |
| ubicacion | varchar(100) | Sí |
| estado | varchar(20) | Sí |
| fechaAdquisicion | date | Sí |
| observaciones | text | No |

## Endpoints de la API

El backend funciona en `http://localhost:3000`.

| Método | Ruta | Para qué sirve | Respuestas |
|---|---|---|---|
| GET | /equipos | Ver todos los equipos | 200 |
| GET | /equipos/:id | Ver un equipo por su ID | 200, 404 si no existe |
| POST | /equipos | Registrar un equipo nuevo | 201, 400 si los datos son inválidos |
| PATCH | /equipos/:id | Cambiar datos de un equipo | 200, 400, 404 |
| DELETE | /equipos/:id | Eliminar un equipo | 200, 404 |

### Reglas de validación

- `codigoInventario` y `nombre`: obligatorios y con mínimo 3 caracteres.
- `tipo`, `marca`, `modelo` y `ubicacion`: obligatorios, no pueden ir vacíos.
- `estado`: solo puede ser `Disponible`, `En uso`, `Mantención` o `Baja`.
- `fechaAdquisicion`: obligatoria y con una fecha válida (por ejemplo `2024-03-15`).
- `observaciones`: es opcional.
- Si se envía un campo que no existe en el equipo, la API responde 400 y no lo guarda.
- Si el ID no existe, la API responde 404.
- Si el ID no es un número, la API responde 400.
