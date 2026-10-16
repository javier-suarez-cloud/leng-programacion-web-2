# Actividad 3 - API Express con MySQL

Proyecto de la Actividad 3 de Lenguaje de Programación Web II (IPVG).
Se migró la API de atractivos turísticos de Chillán a una base de datos relacional
MySQL, manteniendo los mismos endpoints para que el frontend siga funcionando.

## Tecnologías
- Node.js + Express
- MySQL 8 (driver `mysql2` con pool de conexiones)
- dotenv (variables de entorno)
- nodemon (desarrollo)

## Estructura
- `server.js`: rutas de la API y validaciones.
- `db.js`: conexión a MySQL (pool) y funciones CRUD con consultas parametrizadas.
- `schema.sql`: creación de la tabla `atractivos` y datos iniciales.
- `.env.example`: plantilla de variables de entorno.

## Configuración de la base de datos
1. Crear la base y el usuario en MySQL:
   ```sql
   CREATE DATABASE turismo_chillan CHARACTER SET utf8mb4;
   CREATE USER 'turismo'@'localhost' IDENTIFIED BY '123456';
   GRANT ALL PRIVILEGES ON turismo_chillan.* TO 'turismo'@'localhost';
   USE turismo_chillan;
   ```
2. Ejecutar el contenido de `schema.sql`.
3. Copiar `.env.example` como `.env` y ajustar las credenciales.

## Cómo ejecutarlo
1. Instalar dependencias: `npm install`
2. Levantar el servidor: `npm start`
3. La API queda en: http://localhost:3000

## Endpoints
| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/atractivos` | Lista todos los atractivos | 200 |
| GET | `/atractivos/:id` | Obtiene un atractivo por id | 200 / 404 |
| GET | `/buscar?nombre=&ubicacion=` | Busca por nombre y/o ubicación | 200 |
| POST | `/atractivos` | Crea un atractivo | 201 / 400 |
| PUT | `/atractivos/:id` | Actualiza un atractivo | 200 / 400 / 404 |
| DELETE | `/atractivos/:id` | Elimina un atractivo | 200 / 404 |

Validaciones: `nombre` mínimo 3 caracteres y `descripcion` mínimo 10 caracteres.

## Seguridad
- Las consultas usan parámetros (`?`), lo que evita la inyección SQL.
- Las credenciales están en `.env`, que no se sube al repositorio.
- La app usa un usuario de MySQL (`turismo`) con permisos solo sobre su base de datos.

## Autor
Javier Suárez


## Problemas encontrados
- Al iniciar daba "Access denied ... (using password: NO)" porque el archivo `.env`
  no existía / tenía la contraseña vacía. Se solucionó creando `.env` a partir de `.env.example`.