# Actividad 5 - Autenticación y roles de usuario (Vue + Express)

Plataforma de **Emprendedores de Ñuble** con login mediante **JWT** y control de acceso por **roles**.
Solo los administradores pueden crear, editar o eliminar; los viewers solo pueden listar y buscar.

## Estructura

```
Actividad 5/
├─ backend-auth/                 # API Express
│  ├─ server.js                  # arma la app y monta las rutas
│  ├─ data.js                    # usuarios y emprendedores en memoria
│  ├─ middleware/auth.js         # verificarToken y soloAdmin
│  └─ routes/
│     ├─ auth.routes.js          # /auth/register y /auth/login
│     └─ emprendedores.routes.js # CRUD protegido
└─ frontend-vue/                 # aplicación Vue 3 + Vite
   └─ src/
      ├─ api.js                  # fetch con header Authorization
      ├─ App.vue                 # muestra Login o Emprendedores según la sesión
      └─ components/
         ├─ Login.vue
         └─ Emprendedores.vue
```

## Cómo ejecutarlo

**Backend** (terminal 1):
```bash
cd backend-auth
npm install
cp .env.example .env   # en Windows: Copy-Item .env.example .env
npm start              # http://localhost:3000
```

**Frontend** (terminal 2):
```bash
cd frontend-vue
npm install
npm run dev            # http://localhost:5173
```

## Usuarios de prueba

| Email | Password | Rol |
|---|---|---|
| admin@nuble.cl | admin123 | admin |
| viewer@nuble.cl | viewer123 | viewer |

## Endpoints

| Método | Ruta | Acceso | Respuestas |
|---|---|---|---|
| POST | `/auth/register` | Abierta | 201 / 400 / 409 |
| POST | `/auth/login` | Abierta | 200 / 401 |
| GET | `/emprendedores` | Pública | 200 |
| GET | `/emprendedores/buscar?comuna=&rubro=` | Pública | 200 |
| POST | `/emprendedores` | Solo admin | 201 / 400 / 401 / 403 |
| PUT | `/emprendedores/:id` | Solo admin | 200 / 400 / 401 / 403 / 404 |
| DELETE | `/emprendedores/:id` | Solo admin | 200 / 401 / 403 / 404 |

- **401**: no hay token, o es inválido o está vencido.
- **403**: el token es válido pero el rol no es admin.

## Decisiones técnicas

- Las contraseñas se guardan encriptadas con bcrypt (librería `bcryptjs`, que implementa el
  mismo algoritmo sin necesidad de compilar código nativo en Windows).
- El token JWT incluye `id`, `email` y `rol`, y expira en 2 horas (`JWT_EXPIRES`).
- La clave para firmar los tokens está en `.env` (`JWT_SECRET`), que no se sube al repositorio.
- Las rutas protegidas usan dos middlewares en orden: `verificarToken` y luego `soloAdmin`.
- En el frontend, el token se guarda en `localStorage`; los botones de agregar, editar y
  eliminar solo se muestran al admin (`v-if`). La seguridad real está en el backend.
- Si el backend responde 401 (token vencido), el frontend cierra la sesión automáticamente.
- Los datos se guardan en memoria: al reiniciar el servidor vuelven a los valores iniciales.

## Autor
Javier Suárez
