# Buffet 411 · I.P.E.T. 411 (Noetinger, Córdoba)

Pre-pedidos del buffet escolar: bizcochos ($500) y facturas ($1000), retiro en los recreos.

## Fases del proyecto
1. **App de alumnos** (`index.html`): registro, pedidos, ticket y app instalable. ← esta fase
2. Panel de pedidos del buffet
3. Panel de administración (usuarios y actividad)
4. Editor de productos del buffet

## Estructura
- `index.html`: la app
- `manifest.json` y `sw.js`: la hacen instalable
- `icons/` e `img/`: logo e iconos (192 y 512 px)

## Publicar en GitHub Pages
1. Subí todo el contenido de esta carpeta al repositorio (Add file > Upload files).
2. Settings > Pages > Branch: `main`, carpeta `/ (root)` > Save.
3. En 1 o 2 minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
4. Cada vez que cambies archivos, cambiá `VERSION` en `sw.js` (por ejemplo `buffet-411-v2`).

> Por ahora los datos se guardan en cada celular (localStorage). Para que los pedidos lleguen al panel del buffet hace falta conectar Firebase (fase 2).
