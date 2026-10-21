# Actividad 14 - Proyecto completo: Vue.js + NestJS + MySQL

## Descripción
Feria Artesanal de Ñuble con **persistencia real**: el frontend Vue consume una API REST NestJS que guarda
los productos en MySQL mediante TypeORM. Permite listar, consultar, crear, editar y eliminar productos,
con validación de datos y manejo de errores.

```
Vue (5173) → fetch / JSON → NestJS Controller → Service → TypeORM Repository → MySQL (feria_db)
```

## Tecnologías
- Frontend: Vue 3, Vite, Vue Router
- Backend: NestJS 11, TypeORM 0.3, class-validator, @nestjs/config
- Base de datos: MySQL 8

## Requisitos
Node.js, npm y MySQL en ejecución.

## Script SQL
```sql
CREATE DATABASE feria_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```
La tabla `productos` la crea TypeORM automáticamente (`synchronize: true`, solo para desarrollo).

## Configuración (.env)
En `feria-api`, copiar `.env.example` como `.env` y completar:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=CAMBIAR
DB_NAME=feria_db
PORT=3000
```
`.env` no se publica en GitHub; `.env.example` sí.

## Cómo ejecutar
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

## Endpoints
| Método | Ruta | Acción | Respuestas |
|---|---|---|---|
| GET | `/productos` | Listar (más nuevos primero) | 200 |
| GET | `/productos/:id` | Consultar | 200 / 400 (id no numérico) / 404 |
| GET | `/productos/buscar?comuna=` | Buscar por comuna (desafío) | 200 |
| POST | `/productos` | Crear | 201 / 400 |
| PATCH | `/productos/:id` | Actualizar parcialmente | 200 / 400 / 404 |
| DELETE | `/productos/:id` | Eliminar | 200 / 404 |
| GET | `/health` | Estado de la API | 200 |

**Ejemplo POST**
```json
{
  "nombre": "Mermelada de frambuesa",
  "categoria": "Alimentos",
  "comuna": "Coihueco",
  "precio": 5500,
  "descripcion": "Mermelada artesanal elaborada con fruta local.",
  "imagen": "/img/mermelada.jpg",
  "stock": 12
}
```

**Ejemplo PATCH** (`/productos/3`): solo se envían los campos que cambian.
```json
{ "precio": 5900, "stock": 10 }
```

## Estructura
```
Actividad 14/
├─ feria-api/                         # backend
│  ├─ src/productos/entities/producto.entity.ts
│  ├─ src/productos/dto/              # CreateProductoDto / UpdateProductoDto
│  ├─ src/productos/productos.service.ts      # Repository<Producto>
│  ├─ src/productos/productos.controller.ts
│  ├─ src/app.module.ts               # ConfigModule + TypeORM (MySQL)
│  ├─ src/main.ts                     # ValidationPipe + CORS
│  ├─ .env.example
└─ actividad10-feria-nuble/           # frontend
   └─ src/
      ├─ services/productosService.js # funciones fetch del CRUD
      ├─ views/ProductosView.vue      # listado, búsqueda y eliminar
      ├─ views/NuevoProductoView.vue  # formulario de creación
      └─ views/ProductoDetalleView.vue# detalle y edición (PATCH)
```

## Datos iniciales cargados
| Producto | Categoría | Comuna | Precio | Stock |
|---|---|---|---|---|
| Miel artesanal | Alimentos | Pinto | 7500 | 10 |
| Canasto de mimbre | Artesanía | Chillán | 15990 | 5 |
| Mermelada de frambuesa | Alimentos | Coihueco | 5500 | 12 |
| Tazón de greda | Artesanía | Quinchamalí | 12000 | 7 |
| Tejido de lana | Textil | San Fabián | 18000 | 4 |

## Pruebas realizadas
| N.º | Prueba | Resultado |
|---|---|---|
| 1 | Iniciar NestJS | Conecta a feria_db sin error ✔ |
| 2 | SHOW TABLES / DESCRIBE productos | Existe `productos` con sus 8 campos ✔ |
| 3 | POST /productos | Guarda en MySQL ✔ |
| 4 | POST inválido (nombre "ab", precio negativo) | 400 con la lista de errores ✔ |
| 5 | GET /productos | Devuelve los registros ✔ |
| 6 | PATCH /productos/:id | El cambio persiste ✔ |
| 7 | DELETE /productos/:id | El registro se elimina (luego 404) ✔ |
| 8 | Reiniciar NestJS | Los 5 productos siguen en MySQL ✔ |
| 9 | Crear, editar y eliminar desde Vue | Aparece en la lista y queda en MySQL ✔ |
| 10 | Detener MySQL | Al detener el servicio MySQL80 (requiere permisos de administrador), NestJS informa el error de conexión |

## Desafío individual: búsqueda por comuna
- **Archivos:** `productos.service.ts` (método `buscarPorComuna` con QueryBuilder y `LIKE`) y
  `productos.controller.ts` (ruta `GET /productos/buscar`).
- La ruta `buscar` se declara **antes** de `:id`; si no, Nest intentaría convertir "buscar" en número.
- Ejemplo: `GET /productos/buscar?comuna=chill` devuelve el Canasto de mimbre (Chillán).

## Nota
Se mantuvo el `AppController` de la Actividad 13 (`GET /` y `GET /health`) agregándolo a `controllers` en
`AppModule`.

## Preguntas de cierre
- **Memoria vs MySQL:** en la Actividad 13 los datos vivían en un arreglo y se perdían al reiniciar; ahora
  quedan guardados en la base de datos.
- **TypeORM:** traduce objetos TypeScript a tablas y consultas SQL.
- **Entidad:** una clase que representa una tabla (`Producto` → `productos`).
- **Repository<Producto>:** objeto con los métodos para consultar y modificar la tabla (`find`, `save`, `remove`...).
- **DTO:** define qué datos se aceptan y sus reglas de validación.
- **ValidationPipe:** aplica esas reglas a cada petición y responde 400 si no se cumplen.
- **POST vs PATCH:** POST crea un registro nuevo; PATCH modifica solo algunos campos de uno existente.
- **Si MySQL está detenido:** TypeORM no puede conectarse y la API no responde a las consultas.

## Autor
Javier Suárez · Lenguaje de Programación Web II · IPVG Chillán
