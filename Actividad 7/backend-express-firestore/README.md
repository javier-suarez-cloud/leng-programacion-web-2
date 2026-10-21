# Actividad 7 - API Express con Firebase Firestore

Proyecto de la Actividad 7 de Lenguaje de Programación Web II (IPVG).
Se conectó la API de atractivos turísticos de Chillán a Firebase Firestore,
una base de datos NoSQL en la nube, manteniendo los mismos endpoints.

## Tecnologías
- Node.js + Express
- Firebase Firestore (SDK `firebase-admin` v13)
- dotenv

## Estructura
- `server.js`: rutas de la API y validaciones.
- `db.js`: conexión a Firestore y funciones CRUD + búsqueda.
- `.env.example`: plantilla de variables de entorno.
- `serviceAccountKey.json`: clave de servicio de Firebase (NO se sube al repositorio).

## Configuración
1. Crear un proyecto en Firebase Console y una base de datos Firestore.
2. En Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada.
3. Guardar el archivo como `serviceAccountKey.json` en la raíz del proyecto.
4. Copiar `.env.example` como `.env` y poner el ID del proyecto.

## Cómo ejecutarlo
1. `npm install`
2. `npm start`
3. API en http://localhost:3000

## Endpoints
| Método | Ruta | Respuestas |
|---|---|---|
| GET | `/atractivos` | 200 |
| GET | `/atractivos/:id` | 200 / 404 |
| GET | `/buscar?nombre=&ubicacion=` | 200 |
| POST | `/atractivos` | 201 / 400 |
| PUT | `/atractivos/:id` | 200 / 400 / 404 |
| DELETE | `/atractivos/:id` | 200 / 404 |

## Decisiones técnicas
- Se usó `firebase-admin@13` porque la versión 14 eliminó la API que usa este código
  (`admin.apps`, `admin.credential.cert`).
- Firestore no tiene autoincremento: el `id` numérico se calcula como el mayor existente + 1.
- La búsqueda trae todos los documentos y filtra en el servidor, porque Firestore
  no permite búsquedas "contiene" sin distinguir mayúsculas.

## Nota
La Actividad 7 tiene el mismo enunciado que la Actividad 4 (Express + Firestore, recurso atractivos).
Se reutilizó el mismo proyecto de Firebase (`turismo-chillan`) y el mismo código, verificado nuevamente
con las pruebas de GET, búsqueda, POST, PUT, DELETE y validaciones.

## Autor
Javier Suárez