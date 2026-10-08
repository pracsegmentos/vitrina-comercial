# Vitrina Comercial

Catálogo visual de las iniciativas comerciales por canal (Minimercados, Superetes, Droguería/Masivo/Bienestar), pensado para ver rápido qué está corriendo, quién la creó (Trade, Negocios o Regional), su vigencia y su inversión — en reemplazo de ir a buscarlo en el Word/Excel de iniciativas.

## Cómo funciona

Es un sitio web simple (sin backend). Toda la información de las iniciativas vive en un solo archivo:

```
data/initiatives.json
```

Las imágenes de las iniciativas van en `images/iniciativas/`.

Para actualizar el catálogo **no hay que tocar código**: se edita `data/initiatives.json` directamente en GitHub (botón de lápiz ✏️ en la página del archivo) y se guarda el cambio ("commit"). El sitio se actualiza solo. También se puede editar desde **admin.html**, que ofrece un formulario en vez de JSON crudo.

## Cómo corregir una iniciativa existente

1. En GitHub, abre `data/initiatives.json`.
2. Busca la iniciativa por su `id` (Ctrl+F / Cmd+F).
3. Edita el valor que necesites y guarda el cambio (commit). El sitio se actualiza solo.

O, más fácil: entra a **admin.html**, conéctate con un token de GitHub (ver abajo) y edita desde el formulario.

## Cómo agregar/editar iniciativas desde admin.html

1. Abre `admin.html` en el sitio publicado.
2. La primera vez necesitas un **token personal de GitHub** con acceso de escritura solo a este repositorio:
   - Ve a **github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
   - Crea uno nuevo, dale acceso solo al repositorio `vitrina-comercial`.
   - En permisos, activa **Contents: Read and write**.
   - Copia el token generado y pégalo en admin.html.
3. El token se guarda solo en tu navegador (nunca se sube al repositorio).
4. Desde ahí puedes crear, editar o eliminar iniciativas, y subir la imagen de cada una (se comprime automáticamente para que el sitio cargue rápido).

## Cómo agregar una iniciativa nueva a mano (editando el JSON)

Copia este bloque, pégalo dentro de los corchetes `[ ]` de `data/initiatives.json` (separado por una coma de la iniciativa anterior) y reemplaza los valores:

```json
{
  "id": "t24",
  "segmento": "superetes",
  "creador": "trade",
  "tipo": "push",
  "nombre": "Nombre de la iniciativa",
  "resumen": "Mecánica, condiciones comerciales, puntos de venta…",
  "vigenciaTexto": "1 al 30 de noviembre",
  "meses": [11],
  "anio": 2026,
  "link": "https://docs.google.com/presentation/d/…",
  "imagen": null,
  "tieneInversion": true,
  "inversionMonto": 15000000,
  "inversionTexto": "50 puntos de venta. $300.000 por PDV."
}
```

Notas:
- `id` debe ser único por iniciativa.
- `segmento`: `minimercados`, `superetes` o `drogueria`.
- `creador`: `trade`, `negocio` o `regional`.
- `tipo`: `push`, `pull`, `push_pull` o `na`.
- `meses` es un arreglo con los números de los meses activos (1 = enero … 12 = diciembre); se usa para el filtro por mes.
- Si no hay inversión tangible, deja `tieneInversion: false` y `inversionMonto: null`.
- Si todavía no tienes imagen, deja `"imagen": null` (el sitio muestra un placeholder).

## Estructura del proyecto

```
index.html                 → catálogo público (solo lectura)
admin.html                 → panel para crear/editar/eliminar iniciativas
css/style.css               → estilos del catálogo público
css/admin.css                → estilos del panel admin
js/app.js                   → lógica de búsqueda, filtros y detalle
js/admin.js                  → lógica del panel admin (lee/escribe en GitHub vía su API)
data/initiatives.json       → toda la información de las iniciativas (lo único que se edita normalmente)
images/iniciativas/         → imágenes de cada iniciativa
images/placeholder.svg      → aviso de "sin imagen"
images/logo-nutresa.png     → logo usado en el encabezado
manifest.json, sw.js, icons/ → hacen que el sitio se pueda "instalar" como app y funcione offline
```

## Publicar en GitHub Pages

En este repositorio: **Settings → Pages → Source: branch `main` / carpeta `/ (root)`**. El sitio queda disponible en `https://pracsegmentos.github.io/vitrina-comercial/`.

## Pendiente

- Cargar iniciativas de Minimercados y Droguería/Masivo/Bienestar (hoy solo tiene datos de Superetes, octubre).
- Revisar la ambigüedad de PDV marcada con ⚠️ en "PRIA campaña Yupi" (la mecánica dice 40 puntas de góndola, la tabla de asignación suma 50).
- Publicar en GitHub Pages (ver arriba).
