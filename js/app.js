/* ===================== data & constants ===================== */
const SEGMENTS = [
  { id:'minimercados', label:'Minimercados', color:'var(--negocio)', bg:'var(--negocio-bg)',
    icon:'<path d="M4 10h24l-2 15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L4 10Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 10V8a7 7 0 0 1 14 0v2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 15v4M21 15v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
  { id:'superetes', label:'Superetes', color:'var(--trade)', bg:'var(--trade-bg)',
    icon:'<path d="M4 9h24l-1.6 15.2A2 2 0 0 1 24.4 26H9.6a2 2 0 0 1-2-1.8L6 9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 9l2-4h18l2 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 13v3M16 13v3M20 13v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
  { id:'drogueria', label:'Droguería / Masivo / Bienestar', color:'var(--regional)', bg:'var(--regional-bg)',
    icon:'<path d="M12 4h8a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 16h4M16 14v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
];
const TODOS_TAB = { id:'todos', label:'Todos los segmentos', color:'var(--nutresa-dark)',
  icon:'<rect x="5" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="17" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="17" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="17" y="17" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>' };

const CREADORES = [
  { id:'trade', label:'Trade', color:'var(--trade)', bg:'var(--trade-bg)' },
  { id:'negocio', label:'Negocios', color:'var(--negocio)', bg:'var(--negocio-bg)' },
  { id:'regional', label:'Regionales', color:'var(--regional)', bg:'var(--regional-bg)' },
];
const TIPOS = {
  push:     { label:'Push',  color:'var(--push)',  bg:'var(--push-bg)' },
  pull:     { label:'Pull',  color:'var(--pull)',  bg:'var(--pull-bg)' },
  push_pull:{ label:'Ambas', color:'var(--ambas)', bg:'var(--ambas-bg)' },
  na:       { label:'N/A',   color:'var(--na)',    bg:'var(--na-bg)' },
};
const ESTADOS = {
  activa:     { label:'Activa',     color:'var(--status-activa)',     bg:'var(--status-activa-bg)' },
  proxima:    { label:'Próxima',    color:'var(--status-proxima)',    bg:'var(--status-proxima-bg)' },
  finalizada: { label:'Finalizada', color:'var(--status-finalizada)', bg:'var(--status-finalizada-bg)' },
};
const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const ICONS = {
  search:'<svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2"/><path d="m18 18-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  close:'<svg viewBox="0 0 20 20" fill="none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  calendar:'<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  coin:'<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M10 6.5v7M7.8 13v.3c0 1 .9 1.7 2.2 1.7s2.2-.6 2.2-1.6c0-2.3-4.4-1.4-4.4-3.7 0-1 1-1.6 2.2-1.6s2 .6 2.2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  link:'<svg viewBox="0 0 20 20" fill="none"><path d="M8.3 11.7a3 3 0 0 0 4.2 0l2.1-2.1a3 3 0 1 0-4.2-4.2l-1 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M11.7 8.3a3 3 0 0 0-4.2 0l-2.1 2.1a3 3 0 1 0 4.2 4.2l1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  edit:'<svg viewBox="0 0 20 20" fill="none"><path d="M11.3 4.3 15.7 8.7 7 17.4 3 18l.6-4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  empty:'<svg viewBox="0 0 40 40" fill="none"><rect x="6" y="12" width="28" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M6 18h28M13 12V8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4" stroke="currentColor" stroke-width="2"/></svg>',
};

/* ===================== state ===================== */
const S = {
  booted:false, loadError:false,
  docs:[],
  tab:'todos',
  filters:{ search:'', creador:'all', mes:'all', anio:'all' },
  detailId:null,
};

/* ===================== helpers ===================== */
function el(tag, attrs, html){
  const e=document.createElement(tag);
  if(attrs) for(const k in attrs) e.setAttribute(k,attrs[k]);
  if(html!==undefined) e.innerHTML=html;
  return e;
}
function esc(s){
  return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatCOP(n){
  if(n==null || isNaN(n)) return null;
  const sign = n<0 ? '-' : '';
  const v = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  return sign+'$'+v;
}
function formatMeses(arr, anio){
  if(!arr || !arr.length) return 'Vigencia no especificada';
  const sorted=[...arr].sort((a,b)=>a-b);
  const labels=sorted.map(m=>MESES[m-1]);
  return labels.join(' · ') + (anio ? ' '+anio : '');
}
function getEstado(d){
  if(!d.anio || !d.meses || !d.meses.length) return null;
  const now=new Date(), y=now.getFullYear(), m=now.getMonth()+1;
  const minM=Math.min(...d.meses), maxM=Math.max(...d.meses);
  if(d.anio < y || (d.anio===y && maxM < m)) return 'finalizada';
  if(d.anio > y || (d.anio===y && minM > m)) return 'proxima';
  return 'activa';
}
function segmentOf(id){ return SEGMENTS.find(s=>s.id===id); }
function creadorOf(id){ return CREADORES.find(c=>c.id===id) || CREADORES[0]; }
function tipoOf(id){ return TIPOS[id] || TIPOS.na; }
function tabConfig(id){ return id==='todos' ? TODOS_TAB : (segmentOf(id) || TODOS_TAB); }

function docsForSegment(segId){ return S.docs.filter(d=>d.segmento===segId); }
function docsForTab(tabId){ return tabId==='todos' ? S.docs : docsForSegment(tabId); }
function applyFilters(list){
  const f=S.filters;
  return list.filter(d=>{
    if(f.search){
      const q=f.search.toLowerCase();
      if(!(d.nombre||'').toLowerCase().includes(q)) return false;
    }
    if(f.creador!=='all' && d.creador!==f.creador) return false;
    if(f.mes!=='all' && !(d.meses||[]).includes(Number(f.mes))) return false;
    if(f.anio!=='all' && Number(d.anio)!==Number(f.anio)) return false;
    return true;
  });
}

/* ===================== render: root ===================== */
function render(){
  const app=document.getElementById('app');
  app.innerHTML='';
  app.appendChild(renderHeader());
  const main=el('main');
  if(!S.booted){
    main.appendChild(el('div',{class:'boot'}, S.loadError
      ? 'No se pudo cargar data/initiatives.json.'
      : '<div class="spinner"></div><span>Cargando iniciativas…</span>'));
  } else {
    main.appendChild(renderBoard());
  }
  app.appendChild(main);

  app.appendChild(el('div',{class:'footer-note'},
    `Catálogo de iniciativas comerciales. ¿Necesitas agregar o editar una? Ve a <a href="admin.html">admin.html</a>.`));

  const overlay=el('div',{class:'overlay', 'data-open': S.detailId ? 'true':'false'});
  overlay.addEventListener('click', closeDetail);
  app.appendChild(overlay);
  if(S.detailId){ app.appendChild(renderDetailDrawer()); }
}

function renderHeader(){
  const wrap=el('div',{class:'topbar'});

  const inner=el('div',{class:'topbar-inner'});
  const brand=el('button',{class:'brand'},
    `<img class="brand-logo" src="images/logo-nutresa.png" alt="Nutresa">
     <span class="brand-div"></span>
     <span><span class="brand-name">Vitrina Comercial</span><br><span class="brand-sub">Iniciativas por canal</span></span>`);
  brand.addEventListener('click', ()=>setTab('todos'));
  inner.appendChild(brand);
  inner.appendChild(el('div',{class:'topbar-spacer'}));
  inner.appendChild(el('a',{class:'admin-link', href:'admin.html'}, ICONS.edit+'<span>Administrar</span>'));
  wrap.appendChild(inner);

  const tabs=el('div',{class:'tabbar'});
  [TODOS_TAB, ...SEGMENTS].forEach(t=>{
    const count = docsForTab(t.id).length;
    const tab=el('button',{class:'tab'}, `<svg viewBox="0 0 30 30" fill="none">${t.icon}</svg><span>${esc(t.label)}</span><span class="tab-count">${count}</span>`);
    tab.setAttribute('data-active', S.tab===t.id);
    tab.addEventListener('click', ()=>setTab(t.id));
    tabs.appendChild(tab);
  });
  wrap.appendChild(tabs);
  return wrap;
}

/* ===================== render: board ===================== */
function renderBoard(){
  const cfg=tabConfig(S.tab);
  const all=docsForTab(S.tab);
  const filtered=applyFilters(all);

  const wrap=el('div',{class:'segview'});
  const totalInv = all.reduce((sum,d)=> sum + (typeof d.inversionMonto==='number' ? d.inversionMonto : 0), 0);
  const conInv = all.filter(d=>d.tieneInversion).length;
  const activas = all.filter(d=>getEstado(d)==='activa').length;

  const head=el('div',{class:'segview-head'});
  head.innerHTML=`
    <div>
      <h2 class="segview-title" style="--seg-color:${cfg.color}"><svg viewBox="0 0 30 30" fill="none">${cfg.icon}</svg>${esc(cfg.label)}</h2>
      <div class="segview-sub">${all.length} iniciativa${all.length===1?'':'s'} registrada${all.length===1?'':'s'} · ${activas} activa${activas===1?'':'s'} ahora · ${conInv} con inversión tangible</div>
    </div>
    <div class="kpis">
      <div class="kpi"><div class="kpi-label">Iniciativas</div><div class="kpi-value">${all.length}</div></div>
      <div class="kpi"><div class="kpi-label">Inversión total</div><div class="kpi-value">${formatCOP(totalInv)||'—'}</div></div>
    </div>
  `;
  wrap.appendChild(head);
  wrap.appendChild(renderToolbar());

  if(!all.length){
    wrap.appendChild(el('div',{class:'empty-state'},
      `${ICONS.empty}<h3>Aún no hay iniciativas en ${esc(cfg.label)}</h3>
       <p>Cuando el equipo cargue información para este canal aparecerá aquí, organizada por quién la creó.</p>
       <p><a href="admin.html" class="link-btn" style="margin-top:10px;">${ICONS.edit} Agregar la primera iniciativa</a></p>`));
    return wrap;
  }

  const board=el('div',{class:'board'});
  CREADORES.forEach(cr=>{
    const laneDocs=filtered.filter(d=>d.creador===cr.id);
    const lane=el('div',{class:'lane'});
    lane.innerHTML=`<div class="lane-head" style="--lane-color:${cr.color}">
        <span class="lane-tag"></span><span class="lane-title">${esc(cr.label)}</span>
        <span class="lane-count">${laneDocs.length}</span>
      </div>`;
    const cardsWrap=el('div',{class:'lane-cards', style:`--lane-color:${cr.color}`});
    if(!laneDocs.length){
      cardsWrap.appendChild(el('div',{class:'lane-empty'}, 'Sin coincidencias'));
    } else {
      laneDocs.forEach(d=> cardsWrap.appendChild(renderCard(d, {showSegment: S.tab==='todos'})));
    }
    lane.appendChild(cardsWrap);
    board.appendChild(lane);
  });
  wrap.appendChild(board);
  return wrap;
}

function renderToolbar(){
  const bar=el('div',{class:'toolbar'});

  const search=el('div',{class:'search-box'});
  search.innerHTML=ICONS.search;
  const input=el('input',{type:'text', placeholder:'Buscar iniciativa por nombre…'});
  input.value=S.filters.search;
  input.addEventListener('input', e=>{
    S.filters.search=e.target.value;
    render();
    requestAnimationFrame(()=>{
      const fresh=document.querySelector('.search-box input');
      if(fresh){ fresh.focus(); const v=fresh.value; fresh.setSelectionRange(v.length, v.length); }
    });
  });
  search.appendChild(input);
  bar.appendChild(search);

  const pillGroup=el('div',{class:'pillgroup'});
  const allPill=el('button',{class:'pill'}, 'Todas');
  allPill.setAttribute('data-active', S.filters.creador==='all');
  allPill.addEventListener('click', ()=>{ S.filters.creador='all'; render(); });
  pillGroup.appendChild(allPill);
  CREADORES.forEach(cr=>{
    const p=el('button',{class:'pill', style:`--pill-color:${cr.color}`}, `<span class="dot"></span>${esc(cr.label)}`);
    p.setAttribute('data-active', S.filters.creador===cr.id);
    p.addEventListener('click', ()=>{ S.filters.creador = S.filters.creador===cr.id ? 'all' : cr.id; render(); });
    pillGroup.appendChild(p);
  });
  bar.appendChild(pillGroup);

  const mesSel=el('select',{class:'selectbox'});
  mesSel.innerHTML='<option value="all">Todos los meses</option>'+MESES.map((m,i)=>`<option value="${i+1}">${m}</option>`).join('');
  mesSel.value=S.filters.mes;
  mesSel.addEventListener('change', e=>{ S.filters.mes=e.target.value; render(); });
  bar.appendChild(mesSel);

  const years=Array.from(new Set(docsForTab(S.tab).map(d=>d.anio).filter(Boolean))).sort();
  const anioSel=el('select',{class:'selectbox'});
  anioSel.innerHTML='<option value="all">Todos los años</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('');
  anioSel.value=S.filters.anio;
  anioSel.addEventListener('change', e=>{ S.filters.anio=e.target.value; render(); });
  bar.appendChild(anioSel);

  bar.appendChild(el('div',{class:'toolbar-spacer'}));
  const addLink=el('a',{class:'btn btn-ghost', href:'admin.html'}, ICONS.edit+'Nueva iniciativa');
  bar.appendChild(addLink);
  return bar;
}

function renderCard(d, opts){
  opts = opts || {};
  const tipo=tipoOf(d.tipo);
  const estadoKey=getEstado(d);
  const estado=estadoKey ? ESTADOS[estadoKey] : null;
  const seg=segmentOf(d.segmento);
  const card=el('button',{class:'card'});
  card.innerHTML=`
    <div class="card-top">
      <div class="card-name">${esc(d.nombre||'Sin nombre')}</div>
      <span class="badge" style="color:${tipo.color}; background:${tipo.bg}">${tipo.label}</span>
    </div>
    ${d.resumen ? `<div class="card-resumen">${esc(d.resumen)}</div>` : ''}
    <div class="card-meta-row">
      ${estado ? `<span class="status-dot" style="color:${estado.color}; background:${estado.bg}">${estado.label}</span>` : ''}
      ${opts.showSegment && seg ? `<span class="seg-chip" style="color:${seg.color}; background:${seg.bg}">${esc(seg.label)}</span>` : ''}
    </div>
    <div class="card-meta"><span>${ICONS.calendar}${esc(formatMeses(d.meses, d.anio))}</span></div>
    ${d.tieneInversion ? `<div class="card-meta inv-flag">${ICONS.coin} Inversión tangible${typeof d.inversionMonto==='number' ? ' · '+formatCOP(d.inversionMonto) : ''}</div>` : ''}
  `;
  card.addEventListener('click', ()=> openDetail(d.id));
  return card;
}

/* ===================== detail drawer ===================== */
function renderDetailDrawer(){
  const d=S.docs.find(x=>x.id===S.detailId);
  const wrap=el('div',{class:'drawer', 'data-open':'true'});
  if(!d){ return wrap; }
  const tipo=tipoOf(d.tipo); const cr=creadorOf(d.creador); const seg=segmentOf(d.segmento);
  const estadoKey=getEstado(d); const estado=estadoKey ? ESTADOS[estadoKey] : null;

  const head=el('div',{class:'drawer-head'});
  head.innerHTML=`
    <div class="drawer-head-main">
      <h3 style="font-size:18px; line-height:1.3;">${esc(d.nombre)}</h3>
      <div class="tagrow">
        <span class="chip" style="color:${tipo.color}; background:${tipo.bg}">${tipo.label}</span>
        ${estado ? `<span class="chip" style="color:${estado.color}; background:${estado.bg}">${estado.label}</span>` : ''}
        <span class="chip" style="color:${cr.color}; background:${cr.bg}">${esc(cr.label)}</span>
        ${seg ? `<span class="chip" style="color:${seg.color}; background:${seg.bg}">${esc(seg.label)}</span>` : ''}
      </div>
    </div>`;
  const closeBtn=el('button',{class:'drawer-close'}, ICONS.close);
  closeBtn.addEventListener('click', closeDetail);
  head.appendChild(closeBtn);

  const body=el('div',{class:'drawer-body'});
  if(d.imagen){
    body.appendChild(el('img',{class:'dimg', src:d.imagen, alt:esc(d.nombre)}));
  }
  body.appendChild(el('div',{class:'dblock'},
    `<div class="dblock-label">Vigencia</div><div class="dblock-text mono">${esc(d.vigenciaTexto || formatMeses(d.meses,d.anio))}</div>`));
  if(d.resumen){
    body.appendChild(el('div',{class:'dblock'},
      `<div class="dblock-label">Resumen / mecánica</div><div class="dblock-text">${esc(d.resumen)}</div>`));
  }
  const invBlock=el('div',{class:'dblock'});
  invBlock.innerHTML=`<div class="dblock-label">Inversión</div>`;
  if(d.tieneInversion){
    const box=el('div',{class:'inv-box'});
    box.innerHTML = `${typeof d.inversionMonto==='number' ? `<div class="inv-amount">${formatCOP(d.inversionMonto)}</div>` : ''}
      ${d.inversionTexto ? `<div class="dblock-text" style="margin-top:6px;">${esc(d.inversionTexto)}</div>` : ''}`;
    invBlock.appendChild(box);
  } else {
    invBlock.appendChild(el('div',{class:'dblock-text', style:'color:var(--ink-faint)'}, 'No se reporta una inversión económica tangible en esta iniciativa.'));
  }
  body.appendChild(invBlock);
  if(d.link){
    body.appendChild(el('div',{class:'dblock'},
      `<a class="link-btn" href="${esc(d.link)}" target="_blank" rel="noopener">${ICONS.link} Ver presentación</a>`));
  }
  body.appendChild(el('div',{class:'meta-foot'}, `Iniciativa ${esc(d.id)}`));

  const foot=el('div',{class:'drawer-foot'});
  const editLink=el('a',{class:'btn btn-ghost', href:`admin.html?id=${encodeURIComponent(d.id)}`}, ICONS.edit+'Editar en admin');
  foot.appendChild(editLink);

  wrap.appendChild(head);
  wrap.appendChild(body);
  wrap.appendChild(foot);
  return wrap;
}

/* ===================== navigation ===================== */
function setTab(id){ S.tab=id; S.filters={search:'',creador:'all',mes:'all',anio:'all'}; S.detailId=null; render(); }
function openDetail(id){ S.detailId=id; render(); }
function closeDetail(){ S.detailId=null; render(); }

/* ===================== boot ===================== */
async function boot(){
  render();
  try{
    const res = await fetch('data/initiatives.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    S.docs = await res.json();
    S.booted=true;
  }catch(e){
    S.booted=true; S.loadError=true;
  }
  render();
}
boot();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* sin soporte offline: el sitio sigue funcionando igual */ });
  });
}
