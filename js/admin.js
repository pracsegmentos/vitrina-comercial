const OWNER = "pracsegmentos";
const REPO = "vitrina-comercial";
const BRANCH = "main";
const DATA_PATH = "data/initiatives.json";
const API = "https://api.github.com";

let token = localStorage.getItem("vitrina_gh_token") || "";
let initiatives = [];
let currentId = null;

function ghHeaders() {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function base64ToUtf8(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

// Reintenta ante fallas de red pasajeras antes de darse por vencido.
async function fetchConReintento(url, options, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try { return await fetch(url, options); }
    catch (err) {
      if (i === attempts) throw new Error("No se pudo conectar con GitHub. Revisa tu conexión a internet e intenta de nuevo.");
      await sleep(500 * i);
    }
  }
}

async function ghGetFile(path) {
  const res = await fetchConReintento(`${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}&_=${Date.now()}`, {
    headers: ghHeaders(), cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`No se pudo leer ${path} (${res.status})`);
  return res.json();
}

async function ghPutFile(path, base64Content, message, sha) {
  const body = { message, content: base64Content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await fetchConReintento(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { ...ghHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error guardando ${path} (${res.status})`);
  }
  return res.json();
}

async function putFileWithRetry(path, base64Content, message, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const existing = await ghGetFile(path);
    try { return await ghPutFile(path, base64Content, message, existing ? existing.sha : null); }
    catch (err) {
      const isConflict = /does not match|sha/i.test(err.message);
      if (!isConflict || attempt === maxAttempts) throw err;
      await sleep(300 * attempt);
    }
  }
}

async function fetchLatestInitiatives() {
  const file = await ghGetFile(DATA_PATH);
  return { list: JSON.parse(base64ToUtf8(file.content)), sha: file.sha };
}

async function loadInitiatives() {
  const { list } = await fetchLatestInitiatives();
  initiatives = list;
  renderList();
}

// Relee la última versión justo antes de guardar, para no pisar cambios
// hechos por otra persona u otra pestaña mientras esta seguía abierta.
async function guardarConMerge(construirLista, message, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { list, sha } = await fetchLatestInitiatives();
    const nuevaLista = construirLista(list);
    if (nuevaLista === null) return null;
    const content = utf8ToBase64(JSON.stringify(nuevaLista, null, 2));
    try {
      const result = await ghPutFile(DATA_PATH, content, message, sha);
      initiatives = nuevaLista;
      return { list: nuevaLista, sha: result.content.sha };
    } catch (err) {
      const isConflict = /does not match|sha/i.test(err.message);
      if (!isConflict || attempt === maxAttempts) throw err;
      await sleep(300 * attempt);
    }
  }
}

function renderList(filter = "") {
  const list = document.getElementById("admin-list");
  const f = filter.trim().toLowerCase();
  const filtered = initiatives.filter(
    (p) => !f || (p.nombre || "").toLowerCase().includes(f) || p.id.toLowerCase().includes(f)
  );
  list.innerHTML = filtered
    .map((p) => `
      <div class="item ${p.id === currentId ? "active" : ""}" data-id="${p.id}">
        <div>${p.nombre || "(sin nombre)"}</div>
        <div class="codigo">${p.id} · ${p.segmento || "—"}</div>
      </div>`)
    .join("");
  list.querySelectorAll(".item").forEach((elm) => {
    elm.addEventListener("click", () => openInitiative(elm.dataset.id));
  });
}

function setChipChoice(field, value) {
  document.querySelectorAll(`.chip-choice[data-field="${field}"] button`).forEach((b) => {
    b.classList.toggle("active", b.dataset.value === value);
  });
}
function getChipChoice(field) {
  const active = document.querySelector(`.chip-choice[data-field="${field}"] button.active`);
  return active ? active.dataset.value : null;
}
function setMonths(meses) {
  document.querySelectorAll("#month-grid button").forEach((b) => {
    b.classList.toggle("active", (meses || []).includes(Number(b.dataset.m)));
  });
}
function getMonths() {
  return [...document.querySelectorAll("#month-grid button.active")].map((b) => Number(b.dataset.m));
}
function setInversionVisibility(on) {
  document.getElementById("inversion-fields").hidden = !on;
}

function openInitiative(id) {
  const p = initiatives.find((x) => x.id === id);
  if (!p) return;
  currentId = id;
  document.getElementById("form-title").textContent = `Editar: ${p.nombre}`;
  const form = document.getElementById("initiative-form");
  form.elements.id.value = p.id;
  form.elements.id.disabled = true;
  form.nombre.value = p.nombre || "";
  form.resumen.value = p.resumen || "";
  form.vigenciaTexto.value = p.vigenciaTexto || "";
  form.anio.value = p.anio ?? "";
  form.link.value = p.link || "";
  setChipChoice("segmento", p.segmento || "superetes");
  setChipChoice("creador", p.creador || "trade");
  setChipChoice("tipo", p.tipo || "na");
  setMonths(p.meses);
  document.getElementById("preview-imagen").src = p.imagen || "images/placeholder.svg";
  document.getElementById("file-imagen").value = "";
  document.getElementById("chk-inversion").checked = !!p.tieneInversion;
  setInversionVisibility(!!p.tieneInversion);
  form.inversionMonto.value = p.inversionMonto ?? "";
  form.inversionTexto.value = p.inversionTexto || "";
  document.getElementById("btn-eliminar").hidden = false;
  document.getElementById("form-status").textContent = "";
  document.getElementById("admin-form-box").hidden = false;
  renderList(document.getElementById("admin-buscador").value);
}

function openNewInitiative() {
  currentId = null;
  document.getElementById("form-title").textContent = "Nueva iniciativa";
  const form = document.getElementById("initiative-form");
  form.reset();
  form.elements.id.disabled = false;
  setChipChoice("segmento", "superetes");
  setChipChoice("creador", "trade");
  setChipChoice("tipo", "na");
  setMonths([]);
  document.getElementById("preview-imagen").src = "images/placeholder.svg";
  document.getElementById("chk-inversion").checked = false;
  setInversionVisibility(false);
  document.getElementById("btn-eliminar").hidden = true;
  document.getElementById("form-status").textContent = "";
  document.getElementById("admin-form-box").hidden = false;
  renderList(document.getElementById("admin-buscador").value);
}

async function compressImage(file, maxDim = 1600, quality = 0.85) {
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
  let { width, height } = img;
  if (width > maxDim || height > maxDim) {
    const scale = maxDim / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(img.src);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

async function uploadImageIfNeeded(id) {
  const input = document.getElementById("file-imagen");
  const file = input.files[0];
  if (!file) return null;
  const path = `images/iniciativas/${id}.jpg`;
  const blob = await compressImage(file, 1600, 0.85);
  const buffer = await blob.arrayBuffer();
  const base64 = arrayBufferToBase64(buffer);
  await putFileWithRetry(path, base64, `Actualizar imagen de ${id}`);
  return path;
}

let isSaving = false;
let imageWasRemoved = false;

async function handleSave(e) {
  e.preventDefault();
  if (isSaving) return;
  const status = document.getElementById("form-status");
  const btn = document.getElementById("btn-guardar");
  const form = document.getElementById("initiative-form");
  const id = form.elements.id.value.trim();

  if (!id || !form.nombre.value.trim()) {
    status.textContent = "Id y nombre son obligatorios.";
    return;
  }
  const segmento = getChipChoice("segmento");
  const creador = getChipChoice("creador");
  const tipo = getChipChoice("tipo");
  if (!segmento || !creador || !tipo) {
    status.textContent = "Selecciona canal, creador y tipo.";
    return;
  }

  isSaving = true;
  btn.disabled = true;
  status.textContent = "Guardando...";
  try {
    const nuevaImagen = await uploadImageIfNeeded(id);
    const tieneInversion = document.getElementById("chk-inversion").checked;

    let duplicado = false;
    const message = `${currentId ? "Actualizar" : "Agregar"} iniciativa ${id}`;

    await guardarConMerge((list) => {
      const idEnUso = list.some((p) => p.id === id && p.id !== currentId);
      if (idEnUso) { duplicado = true; return null; }
      const existing = currentId ? list.find((p) => p.id === currentId) : null;

      const updated = {
        id,
        segmento,
        creador,
        tipo,
        nombre: form.nombre.value.trim(),
        resumen: form.resumen.value.trim(),
        vigenciaTexto: form.vigenciaTexto.value.trim(),
        meses: getMonths(),
        anio: form.anio.value === "" ? null : Number(form.anio.value),
        link: form.link.value.trim(),
        imagen: imageWasRemoved ? null : (nuevaImagen || existing?.imagen || null),
        tieneInversion,
        inversionMonto: tieneInversion && form.inversionMonto.value !== "" ? Number(form.inversionMonto.value) : null,
        inversionTexto: tieneInversion ? form.inversionTexto.value.trim() : "",
      };

      const nuevaLista = [...list];
      const idx = currentId ? nuevaLista.findIndex((p) => p.id === currentId) : -1;
      if (idx >= 0) nuevaLista[idx] = updated; else nuevaLista.push(updated);
      return nuevaLista;
    }, message);

    if (duplicado) { status.textContent = "Ya existe otra iniciativa con ese id."; return; }

    currentId = id;
    imageWasRemoved = false;
    status.textContent = "Guardado. El sitio público se actualiza en 1-2 minutos.";
    renderList(document.getElementById("admin-buscador").value);
  } catch (err) {
    status.textContent = "Error: " + err.message;
  } finally {
    isSaving = false;
    btn.disabled = false;
  }
}

async function handleDelete() {
  if (!currentId) return;
  const status = document.getElementById("form-status");
  if (status.dataset.confirming !== currentId) {
    status.dataset.confirming = currentId;
    status.textContent = "¿Seguro? Haz clic en \"Eliminar iniciativa\" de nuevo para confirmar.";
    return;
  }
  status.dataset.confirming = "";
  status.textContent = "Eliminando...";
  try {
    await guardarConMerge((list) => list.filter((p) => p.id !== currentId), `Eliminar iniciativa ${currentId}`);
    document.getElementById("admin-form-box").hidden = true;
    currentId = null;
    renderList(document.getElementById("admin-buscador").value);
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }
}

function init() {
  // selectores tipo chip
  document.querySelectorAll(".chip-choice").forEach((group) => {
    group.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => setChipChoice(group.dataset.field, b.dataset.value));
    });
  });
  document.querySelectorAll("#month-grid button").forEach((b) => {
    b.addEventListener("click", () => b.classList.toggle("active"));
  });
  document.getElementById("chk-inversion").addEventListener("change", (e) => setInversionVisibility(e.target.checked));
  document.getElementById("file-imagen").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    imageWasRemoved = false;
    document.getElementById("preview-imagen").src = URL.createObjectURL(file);
  });
  document.getElementById("btn-quitar-imagen").addEventListener("click", () => {
    imageWasRemoved = true;
    document.getElementById("file-imagen").value = "";
    document.getElementById("preview-imagen").src = "images/placeholder.svg";
  });

  document.getElementById("btn-save-token").addEventListener("click", async () => {
    const val = document.getElementById("token-input").value.trim();
    if (!val) return;
    token = val;
    localStorage.setItem("vitrina_gh_token", token);
    document.getElementById("login-box").hidden = true;
    document.getElementById("app-box").hidden = false;
    try {
      await loadInitiatives();
      maybeOpenFromQuery();
    } catch (err) {
      alert("No se pudo conectar: " + err.message);
      localStorage.removeItem("vitrina_gh_token");
      token = "";
      document.getElementById("login-box").hidden = false;
      document.getElementById("app-box").hidden = true;
    }
  });

  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("vitrina_gh_token");
    location.reload();
  });

  document.getElementById("btn-nuevo").addEventListener("click", openNewInitiative);
  document.getElementById("btn-cancelar").addEventListener("click", () => {
    document.getElementById("admin-form-box").hidden = true;
    currentId = null;
    renderList(document.getElementById("admin-buscador").value);
  });
  document.getElementById("btn-eliminar").addEventListener("click", handleDelete);
  document.getElementById("initiative-form").addEventListener("submit", handleSave);
  document.getElementById("admin-buscador").addEventListener("input", (e) => renderList(e.target.value));

  boot();
}

function maybeOpenFromQuery() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (id && initiatives.some((p) => p.id === id)) openInitiative(id);
}

async function boot() {
  if (token) {
    document.getElementById("login-box").hidden = true;
    document.getElementById("app-box").hidden = false;
    try {
      await loadInitiatives();
      maybeOpenFromQuery();
    } catch (err) {
      alert("No se pudo conectar con GitHub: " + err.message + "\nRevisa que el token sea válido.");
      localStorage.removeItem("vitrina_gh_token");
      token = "";
      document.getElementById("login-box").hidden = false;
      document.getElementById("app-box").hidden = true;
    }
  }
}

init();
