# Qué me pongo

PWA para iPhone que propone qué ponerse los días de oficina con la ropa que hay en el armario, según el tiempo de Manresa (a la hora de salida) y de Barcelona (máxima).

- `index.html`: toda la app (HTML, CSS y JavaScript sin dependencias). El motor de reglas está en `<script id="motor">`; pesos, umbrales y textos en el objeto `CONFIG`.
- `sw.js`: funcionamiento sin conexión y aviso de «Nueva versión disponible». Cambiar `VERSION` en cada entrega.
- `icons/make_icons.py`: dibuja los iconos PNG (180, 192, 512 y maskable); el workflow los genera al publicar.
- `tests/run-tests.mjs`: ejecuta `runTests()` del motor. `node tests/run-tests.mjs`.

Los datos de uso (disponibilidad, historial, favoritos, fotos) viven solo en el iPhone. El repositorio contiene el código y el inventario base.

Publicación: cada push a `main` pasa los tests y publica en GitHub Pages (Ajustes → Pages → Source: GitHub Actions).
