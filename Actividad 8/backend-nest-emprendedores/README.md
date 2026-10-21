# Actividad 8 - Backend con NestJS (compatibilidad Express)

API REST en **NestJS** para el recurso **emprendedores** de Ñuble, con los mismos endpoints que la versión
Express. Usa TypeORM + MySQL, validación con class-validator, Swagger y CORS.

## Requisitos
- Node.js 18+ y npm
- Nest CLI 11 (`npm i -g @nestjs/cli@11`)
- MySQL 8

## Cómo levantar
1. Crear la base de datos:
   ```sql
   CREATE DATABASE emprendedores_db CHARACTER SET utf8mb4;
   ```
2. Copiar `.env.example` como `.env` y completar las credenciales de MySQL.
3. Instalar y ejecutar:
   ```bash
   npm install
   npm run seed        # inserta 3 emprendedores de ejemplo (opcional)
   npm run start:dev   # o npm run start
   ```
- API: http://localhost:3000
- Swagger: http://localhost:3000/api

## Endpoints
| Método | Ruta | Respuestas |
|---|---|---|
| GET | `/emprendedores` | 200 |
| GET | `/emprendedores/:id` | 200 / 404 |
| GET | `/emprendedores/buscar?comuna=&rubro=` | 200 |
| POST | `/emprendedores` | 201 / 400 |
| PUT | `/emprendedores/:id` | 200 / 400 / 404 |
| DELETE | `/emprendedores/:id` | 200 / 404 |

**Ejemplo POST**
```json
{
  "nombre": "Miel Las Trancas",
  "comuna": "Pinto",
  "rubro": "Apicultura",
  "descripcion": "Miel de montaña 100% natural.",
  "contacto": "+56 9 1234 5678"
}
```
Respuesta 201: el mismo objeto con su `id`.

**Ejemplo de error 404**: `{ "error": "Emprendedor no encontrado" }`

**Ejemplo de error 400** (nombre de 2 caracteres):
```json
{ "message": ["nombre must be longer than or equal to 3 characters"], "error": "Bad Request", "statusCode": 400 }
```

## Reglas de validación (DTO)
- `nombre`: texto, mínimo 3 caracteres.
- `comuna`: obligatoria.
- `rubro`: uno de Apicultura, Lácteos, Textiles, Turismo, Artesanía, Agricultura.
- `descripcion`: mínimo 10 caracteres.
- `contacto`: obligatorio (teléfono o email).

## Búsqueda
- Solo `comuna` o solo `rubro`: devuelve las coincidencias exactas.
- Ambos: devuelve la intersección (condición AND).
- **Ninguno:** se decidió devolver el listado completo (igual que `findAll`), porque el QueryBuilder
  no agrega condiciones.

## Decisiones técnicas
- **Pipe global** (`ValidationPipe` con `whitelist`, `transform` y `forbidNonWhitelisted`): valida todos los
  DTO, convierte tipos y rechaza campos que no están definidos.
- **DTOs**: `CreateEmprendedorDto` define las reglas; `UpdateEmprendedorDto` usa `PartialType`, por lo que en
  PUT todos los campos son opcionales pero se validan si vienen.
- **TypeORM**: la entidad `Emprendedor` se sincroniza con MySQL (`synchronize: true`, solo para desarrollo).
- **Versiones**: se usa NestJS 11 con `@nestjs/swagger@11`, `@nestjs/typeorm@11` y `typeorm@0.3`, porque las
  versiones más nuevas de esas librerías requieren NestJS 12 y no son compatibles con el código de la guía.
- **Ruta `/buscar`** se declara antes de `/:id` para que Nest no la interprete como un id.

## Nota
La Actividad 8 tiene el mismo enunciado que la Actividad 6. Se reutilizó el mismo diseño
(módulo, DTOs, entidad, servicio, controlador y seed) y se verificó nuevamente con los casos de prueba.

## Autor
Javier Suárez
