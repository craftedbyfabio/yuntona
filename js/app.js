const TL=['Plug & Play','Guided Setup','Expert Required','Enterprise Only'],TK=['plug-and-play','guided-setup','expert-required','enterprise-only'];

const catMap={'AI Red Teaming':'cat-redteam','AI Governance & Standards':'cat-governance','AI Guardrails & Firewalls':'cat-guardrails','AI Development Tools':'cat-devtools','AI Code Assistants':'cat-codeassist','Foundation Models':'cat-models','Identity & AppSec':'cat-identity','Third-Party Risk':'cat-tprm','Compliance Automation':'cat-compliance','Education & Research':'cat-education'};
const initials=n=>{const w=n.replace(/[()]/g,'').split(/[\s-]+/);return w.length===1?w[0].substring(0,2).toUpperCase():(w[0][0]+w[1][0]).toUpperCase()};
const getDomain=u=>{try{return new URL(u).hostname}catch(e){return''}};
const faviconImg=(url,name,size=24)=>{const d=getDomain(url);if(!d)return initials(name);return `<img src="https://icons.duckduckgo.com/ip3/${d}.ico" alt="" width="${size}" height="${size}" class="fav-ico" data-fallback="${initials(name)}"><span class="fav-fb" style="font-size:${size<30?'.7':'1'}rem">${initials(name)}</span>`};
// Global favicon error handler — CSP-safe, no inline onerror
document.addEventListener('error',function(e){var t=e.target;if(t.tagName==='IMG'&&t.classList.contains('fav-ico')){t.style.display='none';var fb=t.nextElementSibling;if(fb&&fb.classList.contains('fav-fb'))fb.style.display='flex'}},true);

function assess(r){
  let s=0,d=0,g=0,p=0;const cat=r.category||'',risk=(r.riskRaw||'').toLowerCase(),tags=(r.tags||[]).map(t=>t.toLowerCase()),desc=(r.desc||'').toLowerCase(),aud=(r.audience||'').toLowerCase();
  if(cat==='AI Red Teaming')s=Math.max(s,2);
  if(risk.includes('caution')||risk.includes('offensive'))s=3;
  if(tags.some(t=>['exploit','pentesting','injection','phishing','cracking'].includes(t)))s=Math.max(s,2);
  if(tags.some(t=>['cli','dev','devsecops','sdk'].includes(t)))s=Math.max(s,1);
  if(tags.some(t=>['framework','standard','protocol'].includes(t)))s=Math.max(s,1);
  if(tags.some(t=>['game','training'].includes(t)))s=0;
  if(aud==='builder')s=Math.max(s,1);
  if(tags.some(t=>['saas','platform'].includes(t))||desc.includes('platform'))d=Math.max(d,1);
  if(tags.includes('open source')&&(desc.includes('self-host')||desc.includes('deploy')))d=Math.max(d,2);
  if(tags.includes('enterprise'))d=Math.max(d,2);
  if(desc.includes('docker')||desc.includes('kubernetes'))d=Math.max(d,2);
  if(cat==='AI Governance & Standards'&&!tags.some(t=>['game','training','article','influencer'].includes(t)))g=Math.max(g,1);
  if(risk.includes('caution')||risk.includes('offensive'))g=Math.max(g,2);
  if(tags.some(t=>['enterprise','procurement'].includes(t)))g=Math.max(g,3);
  if(desc.includes('governance'))g=Math.max(g,1);
  if(risk.includes('critical')||risk.includes('red flag'))p=3;
  if(risk.includes('high')||risk.includes('privacy'))p=Math.max(p,2);
  if(risk.includes('medium'))p=Math.max(p,1);
  if(tags.some(t=>['shadow ai','privacy risk','dlp'].includes(t)))p=Math.max(p,2);
  if(tags.includes('china'))p=3;
  if(desc.includes('proprietary code')||desc.includes('data privacy'))p=Math.max(p,1);
  const total=s+d+g+p;let ti;if(total<=3)ti=0;else if(total<=6)ti=1;else if(total<=9)ti=2;else ti=3;
  return{tier:TL[ti],tierKey:TK[ti],scores:{skill:s,deployment:d,governance:g,privacy:p},total};
}

function parseTier(v){if(!v)return null;const l=v.trim().toLowerCase();for(let i=0;i<TL.length;i++){if(l===TL[i].toLowerCase()||l===TK[i])return i}return null}

function enrich(raw){return raw.map(r=>{const oi=parseTier(r.complexityOverride);let cx;if(oi!==null){cx={tier:TL[oi],tierKey:TK[oi],scores:{skill:0,deployment:0,governance:0,privacy:0},total:-1,overridden:true}}else{cx=assess(r)}return{...r,complexity:cx}})}

let RES=[],aCat='All',aAud='All',aTier='all',aRisk='All',aStage='All',sQ='';

// UI Builders
function buildFilters(){
  const bar=document.getElementById('filterBar');bar.innerHTML='';
  const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>';
  function mkDrop(id,label,options,getter,setter){
    const wrap=document.createElement('div');wrap.className='filter-dropdown';wrap.id='dd-'+id;
    const cur=options.find(o=>o.key===getter())||options[0];
    const isAll=cur.key==='All'||cur.key==='all';
    wrap.innerHTML=`<div class="filter-trigger${isAll?'':' has-value'}" data-dd="${id}"><span class="filter-label">${label}</span><span class="filter-value">${isAll?'All':cur.label}</span>${chevron}</div><div class="filter-menu"></div>`;
    const menu=wrap.querySelector('.filter-menu');
    options.forEach(o=>{
      const opt=document.createElement('div');opt.className='filter-option'+(o.key===getter()?' active':'');
      opt.innerHTML=(o.code?`<span><span class="opt-code">${o.code}</span>${o.label}</span>`:`<span>${o.label}</span>`)+(o.count!=null?`<span class="opt-count">${o.count}</span>`:'');
      opt.onclick=(e)=>{e.stopPropagation();setter(o.key);closeAll();buildFilters();render();updateChips()};
      menu.appendChild(opt);
    });
    bar.appendChild(wrap);
  }
  const cats=[{key:'All',label:'All Categories',count:RES.length},...[...new Set(RES.map(r=>r.category))].sort().map(c=>({key:c,label:c,count:RES.filter(r=>r.category===c).length}))];
  mkDrop('cat','Category',cats,()=>aCat,v=>{aCat=v});
  mkDrop('role','Role',[{key:'All',label:'All Roles',count:RES.length},{key:'Blue Team',label:'Blue Team',count:RES.filter(r=>r.audience==='Blue Team').length},{key:'Red Team',label:'Red Team',count:RES.filter(r=>r.audience==='Red Team').length},{key:'Builder',label:'Builder',count:RES.filter(r=>r.audience==='Builder').length}],()=>aAud,v=>{aAud=v});
  mkDrop('tier','Expertise',[{key:'all',label:'All Levels',count:RES.length},{key:'plug-and-play',label:'Plug & Play',count:RES.filter(r=>r.complexity.tierKey==='plug-and-play').length},{key:'guided-setup',label:'Guided Setup',count:RES.filter(r=>r.complexity.tierKey==='guided-setup').length},{key:'expert-required',label:'Expert Required',count:RES.filter(r=>r.complexity.tierKey==='expert-required').length},{key:'enterprise-only',label:'Enterprise Only',count:RES.filter(r=>r.complexity.tierKey==='enterprise-only').length}],()=>aTier,v=>{aTier=v});
  mkDrop('risk','LLM Risk',[{key:'All',label:'All Risks',count:RES.length},...['LLM01','LLM02','LLM03','LLM04','LLM05','LLM06','LLM07','LLM08','LLM09','LLM10'].map(r=>{const n={'LLM01':'Prompt Injection','LLM02':'Insecure Output','LLM03':'Supply Chain','LLM04':'Data Poisoning','LLM05':'Improper Output','LLM06':'Info Disclosure','LLM07':'Insecure Plugin','LLM08':'Excessive Agency','LLM09':'Overreliance','LLM10':'Model Theft'};return{key:r,label:n[r],code:r,count:RES.filter(x=>(x.llm||[]).includes(r)).length}})],()=>aRisk,v=>{aRisk=v});
  const sl={scope:'Scope & Plan',augment:'Augment Data',develop:'Develop',test:'Test & Eval',release:'Release',deploy:'Deploy',operate:'Operate',monitor:'Monitor',govern:'Govern'};
  mkDrop('stage','Stage',[{key:'All',label:'All Stages',count:RES.length},...Object.entries(sl).map(([k,v])=>({key:k,label:v,count:RES.filter(x=>(x.stages||[]).includes(k)).length}))],()=>aStage,v=>{aStage=v});
  updateChips();
}

function closeAll(){document.querySelectorAll('.filter-dropdown.open').forEach(d=>d.classList.remove('open'))}
document.addEventListener('click',e=>{const trg=e.target.closest('.filter-trigger');if(trg){e.stopPropagation();const dd=trg.parentElement;const wasOpen=dd.classList.contains('open');closeAll();if(!wasOpen)dd.classList.add('open')}else{closeAll()}});

function updateChips(){
  const af=document.getElementById('activeFilters');af.innerHTML='';
  const x='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  if(aCat!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aCat+x;c.onclick=()=>{aCat='All';buildFilters();render()};af.appendChild(c)}
  if(aAud!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aAud+x;c.onclick=()=>{aAud='All';buildFilters();render()};af.appendChild(c)}
  if(aTier!=='all'){const lbl={'plug-and-play':'Plug & Play','guided-setup':'Guided Setup','expert-required':'Expert Required','enterprise-only':'Enterprise Only'};const c=document.createElement('span');c.className='active-chip';c.innerHTML=(lbl[aTier]||aTier)+x;c.onclick=()=>{aTier='all';buildFilters();render()};af.appendChild(c)}
  if(aRisk!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aRisk+x;c.onclick=()=>{aRisk='All';buildFilters();render()};af.appendChild(c)}
  if(aStage!=='All'){const sl={scope:'Scope & Plan',augment:'Augment Data',develop:'Develop',test:'Test & Eval',release:'Release',deploy:'Deploy',operate:'Operate',monitor:'Monitor',govern:'Govern'};const c=document.createElement('span');c.className='active-chip';c.innerHTML=(sl[aStage]||aStage)+x;c.onclick=()=>{aStage='All';buildFilters();render()};af.appendChild(c)}
}

function getF(){return RES.filter(r=>{if(aCat!=='All'&&r.category!==aCat)return false;if(aAud!=='All'&&r.audience!==aAud&&r.audience!=='All')return false;if(aTier!=='all'&&r.complexity.tierKey!==aTier)return false;if(aRisk!=='All'&&!(r.llm||[]).includes(aRisk))return false;if(aStage!=='All'&&!(r.stages||[]).includes(aStage))return false;if(sQ){const q=sQ.toLowerCase();return(r.name+' '+r.category+' '+r.desc+' '+r.tags.join(' ')+' '+r.audience+' '+r.complexity.tier+' '+(r.llm||[]).join(' ')).toLowerCase().includes(q)}return true})}

function mkCard(r){
  const cx=r.complexity,c=document.createElement('div');c.className=`card ${catMap[r.category]||''} tier-${cx.tierKey}`;c.style.cursor='pointer';
  c.addEventListener('click',function(e){e.preventDefault();showCardDetail(r)});
  const ag=r.agentic?'<span class="tag agentic">⚡ Agentic</span>':'';
  const rt=(r.llm||[]).length>0?r.llm.slice(0,3).map(l=>`<span class="tag llm-risk">${l}</span>`).join('')+(r.llm.length>3?`<span class="tag llm-risk">+${r.llm.length-3}</span>`:''):'';
  c.innerHTML=`<div class="card-top"><div class="card-identity"><div class="card-icon">${faviconImg(r.url,r.name,24)}</div><div><div class="card-name">${r.name}</div><div class="card-category">${r.category}</div></div></div><span class="complexity-badge tier-${cx.tierKey}"><span class="badge-dot"></span>${cx.tier}</span></div><div class="card-desc">${r.desc}</div><div class="card-footer">${ag}${r.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}${rt}</div>`;
  return c;
}

function render(){const g=document.getElementById('cardGrid'),f=getF();g.innerHTML='';f.forEach(r=>g.appendChild(mkCard(r)));document.getElementById('resultCount').textContent=`${f.length} of ${RES.length} resources`;document.getElementById('noResults').style.display=f.length?'none':'block'}
function stats(){document.getElementById('totalCount').textContent=RES.length;document.getElementById('catCount').textContent=new Set(RES.map(r=>r.category)).size;document.getElementById('tagCount').textContent=new Set(RES.flatMap(r=>r.tags)).size}
function isQ(q){const l=q.toLowerCase().trim();return l.includes('?')||/^(what|which|how|why|where|who|can|do|does|is|are|show|find|list|recommend|suggest|help|tell|give|compare)/.test(l)}

function aiSearch(query){
  const ov=document.getElementById('aiOverlay'),body=document.getElementById('aiBody');ov.classList.add('active');
  body.innerHTML=`<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div>Searching ${RES.length} resources...</div>`;
  setTimeout(()=>{
    const q=query.toLowerCase(),kw=q.replace(/[?.,!]/g,'').split(/\s+/).filter(w=>w.length>2&&!['what','which','how','the','that','this','for','are','can','with','from','does','about','help','show','find','list','some','best','good','tools','tool','any','easy','simple'].includes(w));
    const scored=RES.map(r=>{let sc=0;const h=(r.name+' '+r.desc+' '+r.tags.join(' ')+' '+r.category+' '+r.audience+' '+r.complexity.tier+' '+(r.llm||[]).join(' ')).toLowerCase();kw.forEach(k=>{if(h.includes(k))sc+=h.split(k).length});r.tags.forEach(t=>{if(q.includes(t.toLowerCase()))sc+=3});
    if(q.includes('tprm')||q.includes('third-party')||q.includes('vendor risk'))if(r.category==='Third-Party Risk')sc+=5;
    if(q.includes('questionnaire')&&r.desc.toLowerCase().includes('questionnaire'))sc+=5;
    if(q.includes('compliance')&&(r.category==='Compliance Automation'||r.tags.some(t=>t.toLowerCase().includes('compliance'))))sc+=4;
    if(q.includes('red team')&&r.category==='AI Red Teaming')sc+=4;
    if((q.includes('guard')||q.includes('injection')||q.includes('firewall'))&&(r.category==='AI Guardrails & Firewalls'||r.tags.some(t=>t.toLowerCase().includes('guard')||t.toLowerCase().includes('firewall'))))sc+=5;
    if(q.includes('identity')&&r.category==='Identity & AppSec')sc+=4;
    if((q.includes('code')||q.includes('copilot'))&&r.category==='AI Code Assistants')sc+=4;
    if(q.includes('observ')||q.includes('trac')||q.includes('monitor'))if(r.tags.some(t=>t==='Observability'||t==='Tracing'))sc+=5;
    if((q.includes('beginner')||q.includes('easy'))&&r.complexity.tierKey==='plug-and-play')sc+=4;
    if(q.includes('governance')||q.includes('standard'))if(r.category==='AI Governance & Standards')sc+=4;
    if(q.includes('agent')||q.includes('agentic'))if(r.agentic)sc+=5;
    if(q.match(/llm0[1-9]|llm10/)){const m=q.match(/llm0[1-9]|llm10/g);m.forEach(lm=>{if((r.llm||[]).includes(lm.toUpperCase()))sc+=6})}
    return{...r,score:sc}}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,6);
    if(!scored.length){body.innerHTML=`<div class="ai-response">No resources found matching "<strong>${query}</strong>". Try different keywords or use the LLM Top 10 filters.</div>`;return}
    const tc=[...new Set(scored.map(r=>r.category))].slice(0,2).join(' and ');
    body.innerHTML=`<div class="ai-response">Found <strong>${scored.length}</strong> resources for "<strong>${query}</strong>", primarily in ${tc}.</div><div class="ai-results">${scored.map(r=>`<a class="ai-result-card" href="${r.url}" target="_blank" rel="noopener"><div class="ai-result-icon ${catMap[r.category]||''}"><div class="card-icon" style="width:36px;height:36px;font-size:.7rem">${faviconImg(r.url,r.name,20)}</div></div><div class="ai-result-info"><h4>${r.name}<span class="complexity-badge tier-${r.complexity.tierKey}" style="font-size:.55rem;padding:2px 6px;margin-left:4px"><span class="badge-dot"></span>${r.complexity.tier}</span>${r.agentic?'<span class="tag agentic" style="font-size:.55rem;padding:1px 6px">⚡</span>':''}</h4><p>${r.desc}</p></div></a>`).join('')}</div>`;
  },400);
}

// Initialisation — fetch tool data from JSON (single source of truth)
function init(){
  var ls=document.getElementById('loadingScreen');
  fetch('data/tools.json')
    .then(function(r){
      if(!r.ok)throw new Error('HTTP '+r.status);
      return r.json();
    })
    .then(function(data){
      RES=enrich(data);
      if(document.getElementById('sourceBanner')) document.getElementById('sourceBanner').style.display='none';
      buildFilters();stats();render();
      ls.classList.add('hidden');
    })
    .catch(function(e){
      console.error('Init error:',e);
      ls.classList.add('hidden');
    });
}
// Fallback: hide loading screen after 3s no matter what
setTimeout(()=>{const ls=document.getElementById('loadingScreen');if(ls)ls.classList.add('hidden')},3000);

const si=document.getElementById('searchInput'),ah=document.getElementById('aiHint');let db;
si.addEventListener('input',e=>{clearTimeout(db);const v=e.target.value.trim();ah.classList.toggle('visible',v.length>3&&isQ(v));db=setTimeout(()=>{sQ=v;if(!isQ(v))render()},200)});
si.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=si.value.trim();if(v&&isQ(v))aiSearch(v);else{sQ=v;render()}}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();si.focus()}if(e.key==='Escape'){document.getElementById('aiOverlay').classList.remove('active');si.blur()}});
document.getElementById('aiClose').onclick=()=>document.getElementById('aiOverlay').classList.remove('active');
document.getElementById('aiOverlay').onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.classList.remove('active')};
document.querySelectorAll('.view-btn').forEach(b=>{b.onclick=()=>{document.querySelectorAll('.view-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('cardGrid').classList.toggle('list-view',b.dataset.view==='list')}});

function showCardDetail(tool){
  const overlay=document.getElementById('cardOverlay'),detail=document.getElementById('cardDetail');
  const catColors={'AI Red Teaming':'var(--red)','AI Governance & Standards':'var(--yellow)','AI Guardrails & Firewalls':'var(--green)','AI Development Tools':'var(--cyan)','AI Code Assistants':'var(--pink)','Foundation Models':'var(--purple)','Identity & AppSec':'#3b82f6','Third-Party Risk':'var(--orange)','Compliance Automation':'#14b8a6'};
  const color=catColors[tool.category]||'var(--accent)';
  const ini=initials(tool.name);
  let metaTags='';
  if(tool.complexity)metaTags+=`<span class="meta-tag">${tool.complexity.tier}</span>`;
  if(tool.audience&&tool.audience!=='All')metaTags+=`<span class="meta-tag">${tool.audience}</span>`;
  if(tool.agentic)metaTags+=`<span class="meta-tag">Agentic</span>`;
  (tool.llm||[]).forEach(r=>{metaTags+=`<span class="meta-tag">${r}</span>`});
  (tool.stages||[]).forEach(s=>{metaTags+=`<span class="meta-tag">${s}</span>`});
  detail.innerHTML=`<button class="back-close" id="closeDetailBtn" title="Close">&times;</button>
    <div class="back-header"><div class="back-avatar" style="background:${color}20;color:${color}">${faviconImg(tool.url,tool.name,32)}</div><div><div class="back-title">${tool.name}</div><div class="back-cat">${tool.category}</div></div></div>
    ${tool.backWhat?`<div class="back-section"><div class="back-section-title">What It Does</div><p>${tool.backWhat}</p></div>`:''}
    ${tool.backSecurity?`<div class="back-section"><div class="back-section-title">Security Relevance</div><p>${tool.backSecurity}</p></div>`:''}
    ${tool.backWhen?`<div class="back-section"><div class="back-section-title">When to Use It</div><p>${tool.backWhen}</p></div>`:''}
    <div class="back-meta">${metaTags}</div>
    <a href="${tool.url}" target="_blank" rel="noopener" class="back-link">Visit ${tool.name} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></a>`;
  overlay.classList.add('active');
  document.body.style.overflow='hidden';
  document.getElementById('closeDetailBtn').addEventListener('click',closeCardDetail);
}
function closeCardDetail(){
  document.getElementById('cardOverlay').classList.remove('active');
  document.body.style.overflow='';
}
document.getElementById('cardOverlay').addEventListener('click',function(e){if(e.target===this)closeCardDetail()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCardDetail()});

init();

// View switcher (three dots nav)
(function(){
  var btn=document.getElementById('viewSwitchBtn'),menu=document.getElementById('viewSwitchMenu');
  if(!btn||!menu)return;
  btn.addEventListener('click',function(e){e.stopPropagation();var open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',open)});
  menu.addEventListener('click',function(e){e.stopPropagation()});
  document.addEventListener('click',function(e){if(!e.target.closest('.view-switch')){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
})();
