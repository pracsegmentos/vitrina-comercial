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

## Publicación (GitHub Pages)

El sitio ya está publicado en `https://pracsegmentos.github.io/vitrina-comercial/` vía **GitHub Actions** (`.github/workflows/pages.yml`, Settings → Pages → Source: "GitHub Actions"). Cada push a `main` — tuyo o desde `admin.html` — dispara un deploy automático; no hay build, solo copia los archivos tal cual. (Se cambió desde el método "legacy" porque ese empezó a fallar sin detalle.)

## Cómo se maneja un mes nuevo

Cuando llega información de un mes nuevo (ej. noviembre) para un canal que ya tenía iniciativas:

- Si la iniciativa **sigue siendo la misma** (mismo nombre y mecánica, solo se renueva) → se **extiende** el campo `meses` del registro existente para incluir el mes nuevo, en vez de crear una tarjeta duplicada. Ejemplo: `t15` (PRIA campaña Yupi), `t18` (PRIA Ducales Queso) y `t21` (PRIA Plan Expertise Monticello) ya cubren octubre y noviembre en un solo registro.
- Si es una **iniciativa distinta** (otro producto, otra mecánica) aunque se vea parecida → se carga como una tarjeta nueva con su propio `id`.

## Pendiente

- Cargar iniciativas de Droguería/Masivo/Bienestar (hoy solo tiene datos de Superetes y Minimercados, octubre-noviembre).
- Revisar la ambigüedad de PDV marcada con ⚠️ en "PRIA campaña Yupi" (la mecánica dice 40 puntas de góndola, la tabla de asignación suma 50).
- Completar mecánica, vigencia e inversión de las iniciativas cuya presentación de origen no tiene texto extraíble (solo imágenes): `r02` (Pasto Aniversario Titán), `r04` (Quincenazo de Café — Santander), `m02` (Reto 50-100 Antioquia), `m04` (Mes del Desatrace Ahorramax Bogotá), `m05` (Septiembrazo MM Tolima).
- Confirmar con el equipo regional si "Cierre de Brechas — Altillano" (`r01`) debe quedar como una sola iniciativa o separarse en sus 3 incentivos por cliente (Su Amigo, Donde Vicson, Manaba Merkafruver).
