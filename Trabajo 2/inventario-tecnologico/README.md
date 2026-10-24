# Inventario de Equipamiento Tecnológico

Descripción: Aplicación web para registrar y administrar el equipamiento tecnológico de una institución, con un inventario centralizado donde se pueden consultar, crear, editar y eliminar equipos.

**Estudiante:** Javier Suarez

## Tecnologías
- Vue.js 3 con Vite
- NestJS 11
- TypeORM
- MySQL 8

## Requisitos de instalación
- Node.js 24, npm 11, MySQL 8, Nest CLI 11

## Variables de entorno
Copiar `backend/.env.example` a `backend/.env` y completar la clave.

## Base de datos MySQL

1. Crear la base de datos y dar permisos al usuario (ejecutar como administrador de MySQL):

```sql
CREATE DATABASE inventario_tecnologico CHARACTER SET utf8mb4;
GRANT ALL ON inventario_tecnologico.* TO 'turismo'@'localhost';
FLUSH PRIVILEGES;
```

2. Copiar `backend/.env.example` como `backend/.env` y completar `DB_PASSWORD` con la clave del usuario de MySQL. El archivo `.env` no se sube al repositorio.

3. No es necesario crear tablas a mano: al iniciar el backend, TypeORM crea la tabla `equipos` automáticamente a partir de la entidad (`synchronize: true`, pensado para desarrollo).

Estructura de la tabla `equipos`:

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