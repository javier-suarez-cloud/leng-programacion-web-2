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

## Autor
Javier Suárez
