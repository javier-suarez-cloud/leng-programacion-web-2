# Actividad 12 - Vue + Docker + Nginx

## Objetivo
Contenerizar la SPA Feria Artesanal de Ñuble (Actividad 11) y servirla con Nginx.

## Construir imagen
```bash
docker build -t feria-nuble-vue:1.0.0 .
```

## Ejecutar
```bash
docker run -d --name feria-nuble-web -p 8080:80 feria-nuble-vue:1.0.0
```

## Abrir
http://localhost:8080

## Rutas verificadas
- /
- /productos
- /productos/1
- /favoritos
- /contacto
- /ruta-que-no-existe

## Logs
```bash
docker logs feria-nuble-web
docker logs -f feria-nuble-web   # en tiempo real (Ctrl + C para salir)
```

## Detener
```bash
docker stop feria-nuble-web
```

## Archivos Docker
- **Dockerfile**: construcción en dos etapas (*multi-stage*).
  - Etapa `build` (`node:22-alpine`): instala dependencias con `npm ci` y ejecuta `npm run build`, que genera `dist/`.
  - Etapa `production` (`nginx:alpine`): copia solo `dist/` con `COPY --from=build` y la sirve con Nginx en el puerto 80.
  La imagen final no lleva Node.js, npm ni el código fuente: solo Nginx y los archivos compilados.
- **.dockerignore**: evita copiar al contexto de construcción `node_modules`, `dist`, `.git`, logs y archivos `.env`.
- **nginx.conf**: configura Nginx con `try_files $uri $uri/ /index.html`. Si la URL no corresponde a un
  archivo físico (por ejemplo `/productos/1`), Nginx devuelve `index.html` y Vue Router muestra la vista correcta.
  Sin esta regla, actualizar el navegador en una ruta interna daría error 404 de Nginx.

## Pruebas funcionales (sobre el contenedor)
| Prueba | Acción | Resultado |
|---|---|---|
| P1 | Abrir http://localhost:8080 | Carga Inicio ✔ |
| P2 | Ir a /productos | Muestra el catálogo ✔ |
| P3 | Abrir /productos/1 | Muestra Miel de Las Trancas ✔ |
| P4 | Actualizar estando en /productos/1 | Sigue funcionando, Nginx no da 404 ✔ |
| P5 | Agregar un favorito y actualizar | El favorito permanece (localStorage) ✔ |
| P6 | Abrir /favoritos | Solo aparece el producto seleccionado ✔ |
| P7 | Enviar /contacto vacío | Muestra "Debe completar todos los campos." ✔ |
| P8 | Abrir /ruta-que-no-existe | Muestra la vista 404 de Vue ✔ |

## Administración del contenedor
```bash
docker exec -it feria-nuble-web sh      # entrar al contenedor
ls -la /usr/share/nginx/html            # archivos publicados (index.html, assets, img)
cat /etc/nginx/conf.d/default.conf      # configuración con try_files
docker stop / start / restart feria-nuble-web
docker ps -a
```

**Reproducibilidad:** se eliminó el contenedor (`docker rm`) y se volvió a crear con `docker run` desde la
misma imagen; el sitio quedó disponible sin ejecutar `npm install` ni `npm run dev` en el computador.

## Desafío: nueva versión 1.0.1
**Cambio entre 1.0.0 y 1.0.1:** se agregó la vista **Acerca de** (`src/views/AcercaView.vue`), su ruta
`/acerca` en `src/router/index.js` y el enlace "Acerca de" en `src/components/Navbar.vue`.

```bash
docker build -t feria-nuble-vue:1.0.1 .
docker run -d --name feria-nuble-web-v101 -p 8081:80 feria-nuble-vue:1.0.1
```

| Versión | URL | ¿Tiene "Acerca de"? |
|---|---|---|
| 1.0.0 | http://localhost:8080 | No |
| 1.0.1 | http://localhost:8081 | Sí |

**Cómo se comprobó:** ambas versiones se ejecutaron al mismo tiempo. El menú de 8081 muestra "Acerca de" y
`/acerca` abre la vista; en 8080 el menú no tiene el enlace y `/acerca` muestra la página 404. Esto demuestra
que una imagen es inmutable: el cambio en el código solo aparece al construir una imagen nueva.

## Publicar en Docker Hub (opcional)
```bash
docker login
docker tag feria-nuble-vue:1.0.0 nombreusuario/feria-nuble-vue:1.0.0
docker push nombreusuario/feria-nuble-vue:1.0.0
```

## Preguntas de cierre
- **npm run dev vs npm run build:** `dev` levanta un servidor de desarrollo con recarga automática;
  `build` genera los archivos optimizados para publicar en `dist/`.
- **¿Qué contiene dist?** El `index.html`, el JavaScript y CSS compilados y minificados (`assets/`) y lo de `public/` (imágenes).
- **¿Por qué Nginx y no Vite?** Vite es para desarrollar; Nginx es un servidor web liviano y rápido pensado para producción.
- **Ventaja del multi-stage:** la imagen final es pequeña y no incluye Node, npm ni el código fuente.
- **COPY --from=build:** copia a la etapa final solo la carpeta `dist` generada en la etapa de compilación.
- **-p 8080:80:** el puerto 8080 del computador se redirige al puerto 80 del contenedor, donde escucha Nginx.
- **¿Por qué try_files?** Para que Nginx devuelva `index.html` en rutas que no son archivos y Vue Router las resuelva.
- **Si se elimina el contenedor pero no la imagen:** se puede volver a crear el contenedor con `docker run` sin reconstruir.
- **¿Por qué un cambio requiere nueva imagen?** Porque la imagen es inmutable: guarda el código del momento del build.
- **Archivos versionados:** `Dockerfile`, `.dockerignore`, `nginx.conf`, el código fuente y el README (no `dist` ni `node_modules`).

## Autor
Javier Suárez
