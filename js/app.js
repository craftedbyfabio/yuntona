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

let RES=[],aCat='All',aAud='All',aTier='all',aRisk='All',aStage='All',aFramework='LLM',sQ='';

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
  // OWASP Framework toggle
  const fwWrap=document.createElement('div');fwWrap.className='framework-toggle';
  fwWrap.innerHTML=`<button class="fw-btn${aFramework==='LLM'?' active':''}" data-fw="LLM">LLM Top 10</button><button class="fw-btn${aFramework==='ASI'?' active':''}" data-fw="ASI">Agentic Top 10</button>`;
  fwWrap.querySelectorAll('.fw-btn').forEach(b=>{b.onclick=()=>{aFramework=b.dataset.fw;aRisk='All';buildFilters();render();updateChips()}});
  bar.appendChild(fwWrap);
  if(aFramework==='LLM'){mkDrop('risk','LLM Top 10',[{key:'All',label:'All LLM Risks',count:RES.length},...['LLM01','LLM02','LLM03','LLM04','LLM05','LLM06','LLM07','LLM08','LLM09','LLM10'].map(r=>{const n={'LLM01':'Prompt Injection','LLM02':'Insecure Output','LLM03':'Supply Chain','LLM04':'Data Poisoning','LLM05':'Improper Output','LLM06':'Info Disclosure','LLM07':'Insecure Plugin','LLM08':'Excessive Agency','LLM09':'Overreliance','LLM10':'Model Theft'};return{key:r,label:n[r],code:r,count:RES.filter(x=>(x.owaspLLM||[]).includes(r)).length}})],()=>aRisk,v=>{aRisk=v})}
  else{mkDrop('risk','Agentic Top 10',[{key:'All',label:'All Agentic Risks',count:RES.length},...['ASI01','ASI02','ASI03','ASI04','ASI05','ASI06','ASI07','ASI08','ASI09','ASI10'].map(r=>{const n={'ASI01':'Goal Hijack','ASI02':'Tool Misuse','ASI03':'Identity Abuse','ASI04':'Supply Chain','ASI05':'Code Execution','ASI06':'Memory Poisoning','ASI07':'Inter-Agent Comms','ASI08':'Cascading Failures','ASI09':'Trust Exploitation','ASI10':'Rogue Agents'};return{key:r,label:n[r],code:r,count:RES.filter(x=>(x.owaspASI||[]).includes(r)).length}})],()=>aRisk,v=>{aRisk=v})}
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

function getF(){return RES.filter(r=>{if(aCat!=='All'&&r.category!==aCat)return false;if(aAud!=='All'&&r.audience!==aAud&&r.audience!=='All')return false;if(aTier!=='all'&&r.complexity.tierKey!==aTier)return false;if(aRisk!=='All'){if(aFramework==='LLM'){if(!(r.owaspLLM||[]).includes(aRisk))return false}else{if(!(r.owaspASI||[]).includes(aRisk))return false}}if(aStage!=='All'&&!(r.stages||[]).includes(aStage))return false;if(sQ){const q=sQ.toLowerCase();return(r.name+' '+r.category+' '+r.desc+' '+r.tags.join(' ')+' '+r.audience+' '+r.complexity.tier+' '+(r.owaspLLM||[]).join(' ')+' '+(r.owaspASI||[]).join(' ')).toLowerCase().includes(q)}return true})}

function mkCard(r){
  const cx=r.complexity,c=document.createElement('div');c.className=`card ${catMap[r.category]||''} tier-${cx.tierKey}`;c.style.cursor='pointer';
  c.addEventListener('click',function(e){e.preventDefault();showCardDetail(r)});
  const ag=r.agentic?'<span class="tag agentic">⚡ Agentic</span>':'';
  const rt=(r.owaspLLM||[]).length>0?r.owaspLLM.slice(0,2).map(l=>`<span class="tag llm-risk">${l}</span>`).join(''):'';
  const at=(r.owaspASI||[]).length>0?r.owaspASI.slice(0,2).map(l=>`<span class="tag asi-risk">${l}</span>`).join(''):'';
  c.innerHTML=`<div class="card-top"><div class="card-identity"><div class="card-icon">${faviconImg(r.url,r.name,24)}</div><div><div class="card-name">${r.name}</div><div class="card-category">${r.category}</div></div></div><span class="complexity-badge tier-${cx.tierKey}"><span class="badge-dot"></span>${cx.tier}</span></div><div class="card-desc">${r.desc}</div><div class="card-footer">${ag}${r.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}${rt}${at}</div>`;
  return c;
}

function render(){const g=document.getElementById('cardGrid'),f=getF();g.innerHTML='';f.forEach(r=>g.appendChild(mkCard(r)));document.getElementById('resultCount').textContent=`${f.length} of ${RES.length} resources`;document.getElementById('noResults').style.display=f.length?'none':'block'}
function stats(){document.getElementById('totalCount').textContent=RES.length;document.getElementById('catCount').textContent=new Set(RES.map(r=>r.category)).size;document.getElementById('tagCount').textContent=new Set(RES.flatMap(r=>r.tags)).size}
function isQ(q){const l=q.toLowerCase().trim();return l.includes('?')||/^(what|which|how|why|where|who|can|do|does|is|are|show|find|list|recommend|suggest|help|tell|give|compare)/.test(l)}

function aiSearch(query){
  var ov=document.getElementById('aiOverlay'),body=document.getElementById('aiBody');
  ov.classList.add('active');

  // Detect if query looks like natural language (question or intent)
  var useNL=window.typesenseNLReady&&isQ(query);

  if(useNL){
    body.innerHTML='<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div><span class="nl-badge">NL</span> Understanding your question across '+RES.length+' resources...</div>';
    window.typesenseNLSearch(query,{perPage:8,queryBy:'name,desc,tags,url,backWhat,backSecurity,backWhen,category,audience'})
      .then(function(result){
        if(result.found===0){
          // NL returned nothing — fall back to keyword search
          body.innerHTML='<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div>Retrying with keyword search...</div>';
          aiSearchKeyword(query);return;
        }
        renderAiResults(query,result.hits.map(function(h){
          var doc=h.document;
          var match=RES.find(function(r){return r.name===doc.name})||doc;
          return match;
        }),result.nlParsed);
      })
      .catch(function(err){
        console.warn('NL search failed, falling back to keyword:',err);
        aiSearchKeyword(query);
      });
  }else if(window.typesenseReady){
    body.innerHTML='<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div>Searching '+RES.length+' resources...</div>';
    aiSearchKeyword(query);
  }else{
    body.innerHTML='<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div>Searching '+RES.length+' resources...</div>';
    aiSearchFallback(query);
  }
}

function aiSearchKeyword(query){
  if(window.typesenseReady){
    window.typesenseSearch(query,{perPage:8,queryBy:'name,desc,tags,url,backWhat,backSecurity,backWhen,category,audience',queryByWeights:'6,3,4,3,2,2,1,3,2'})
      .then(function(result){
        if(result.found===0){aiSearchFallback(query);return}
        renderAiResults(query,result.hits.map(function(h){
          var doc=h.document;
          var match=RES.find(function(r){return r.name===doc.name})||doc;
          return match;
        }));
      })
      .catch(function(err){
        console.warn('Typesense search failed, using fallback:',err);
        aiSearchFallback(query);
      });
  }else{
    aiSearchFallback(query);
  }
}

function aiSearchFallback(query){
  setTimeout(function(){
    var q=query.toLowerCase(),kw=q.replace(/[?.,!]/g,'').split(/\s+/).filter(function(w){return w.length>2&&!['what','which','how','the','that','this','for','are','can','with','from','does','about','help','show','find','list','some','best','good','tools','tool','any','easy','simple'].includes(w)});
    var scored=RES.map(function(r){var sc=0;var h=(r.name+' '+r.desc+' '+r.tags.join(' ')+' '+r.category+' '+r.audience+' '+r.complexity.tier+' '+(r.owaspLLM||[]).join(' ')+' '+(r.owaspASI||[]).join(' ')).toLowerCase();kw.forEach(function(k){if(h.includes(k))sc+=h.split(k).length});r.tags.forEach(function(t){if(q.includes(t.toLowerCase()))sc+=3});
    if(q.includes('tprm')||q.includes('third-party')||q.includes('vendor risk'))if(r.category==='Third-Party Risk')sc+=5;
    if(q.includes('questionnaire')&&r.desc.toLowerCase().includes('questionnaire'))sc+=5;
    if(q.includes('compliance')&&(r.category==='Compliance Automation'||r.tags.some(function(t){return t.toLowerCase().includes('compliance')})))sc+=4;
    if(q.includes('red team')&&r.category==='AI Red Teaming')sc+=4;
    if((q.includes('guard')||q.includes('injection')||q.includes('firewall'))&&(r.category==='AI Guardrails & Firewalls'||r.tags.some(function(t){return t.toLowerCase().includes('guard')||t.toLowerCase().includes('firewall')})))sc+=5;
    if(q.includes('identity')&&r.category==='Identity & AppSec')sc+=4;
    if((q.includes('code')||q.includes('copilot'))&&r.category==='AI Code Assistants')sc+=4;
    if(q.includes('observ')||q.includes('trac')||q.includes('monitor'))if(r.tags.some(function(t){return t==='Observability'||t==='Tracing'}))sc+=5;
    if((q.includes('beginner')||q.includes('easy'))&&r.complexity.tierKey==='plug-and-play')sc+=4;
    if(q.includes('governance')||q.includes('standard'))if(r.category==='AI Governance & Standards')sc+=4;
    if(q.includes('agent')||q.includes('agentic'))if(r.agentic)sc+=5;
    if(q.match(/llm0[1-9]|llm10/)){var m=q.match(/llm0[1-9]|llm10/g);m.forEach(function(lm){if((r.owaspLLM||[]).includes(lm.toUpperCase()))sc+=6})}
    if(q.match(/asi0[1-9]|asi10/)){var ma=q.match(/asi0[1-9]|asi10/g);ma.forEach(function(ai){if((r.owaspASI||[]).includes(ai.toUpperCase()))sc+=6})}
    return Object.assign({},r,{score:sc})}).filter(function(r){return r.score>0}).sort(function(a,b){return b.score-a.score}).slice(0,8);
    renderAiResults(query,scored);
  },300);
}

function renderAiResults(query,results,nlParsed){
  var body=document.getElementById('aiBody');
  if(!results.length){body.innerHTML='<div class="ai-response">No resources found matching "<strong>'+query+'</strong>". Try different keywords or use the LLM Top 10 filters.</div>';return}
  var tc=[...new Set(results.map(function(r){return r.category}))].slice(0,2).join(' and ');

  // Build NL interpretation banner if available
  var nlBanner='';
  if(nlParsed&&nlParsed.generated_params){
    var gp=nlParsed.generated_params;
    var chips=[];
    if(gp.filter_by){
      // Parse filter_by into human-readable chips
      gp.filter_by.split('&&').forEach(function(f){
        var ft=f.trim();
        if(!ft)return;
        // Map known filters to readable labels
        var label=ft
          .replace(/category:=/g,'Category: ').replace(/category:/g,'Category: ')
          .replace(/riskRaw:=/g,'Risk: ').replace(/riskRaw:/g,'Risk: ')
          .replace(/audience:=/g,'Audience: ').replace(/audience:/g,'Audience: ')
          .replace(/complexity:=/g,'Complexity: ').replace(/complexity:/g,'Complexity: ')
          .replace(/agentic:=/g,'Agentic: ').replace(/agentic:/g,'Agentic: ')
          .replace(/owaspLLM:=/g,'OWASP LLM: ').replace(/owaspLLM:/g,'OWASP LLM: ')
          .replace(/owaspASI:=/g,'OWASP ASI: ').replace(/owaspASI:/g,'OWASP ASI: ')
          .replace(/stages:=/g,'Stage: ').replace(/stages:/g,'Stage: ')
          .replace(/tags:=/g,'Tag: ').replace(/tags:/g,'Tag: ');
        chips.push('<span class="nl-chip">'+label+'</span>');
      });
    }
    if(gp.sort_by){
      chips.push('<span class="nl-chip nl-chip-sort">Sort: '+gp.sort_by.replace(':',' ')+'</span>');
    }
    if(gp.q&&gp.q!=='*'){
      chips.unshift('<span class="nl-chip nl-chip-q">Search: '+gp.q+'</span>');
    }
    if(chips.length){
      nlBanner='<div class="nl-interpretation"><span class="nl-badge">NL</span> Interpreted as: '+chips.join(' ')+'<span class="nl-time">'+(nlParsed.parse_time_ms||'')+'ms</span></div>';
    }
  }

  body.innerHTML=nlBanner+'<div class="ai-response">Found <strong>'+results.length+'</strong> resources for "<strong>'+query+'</strong>", primarily in '+tc+'.</div><div class="ai-results">'+results.map(function(r){
    var cx=r.complexity||{tier:'',tierKey:''};
    return '<a class="ai-result-card" href="'+r.url+'" target="_blank" rel="noopener"><div class="ai-result-icon '+(catMap[r.category]||'')+'"><div class="card-icon" style="width:36px;height:36px;font-size:.7rem">'+faviconImg(r.url,r.name,20)+'</div></div><div class="ai-result-info"><h4>'+r.name+'<span class="complexity-badge tier-'+cx.tierKey+'" style="font-size:.55rem;padding:2px 6px;margin-left:4px"><span class="badge-dot"></span>'+cx.tier+'</span>'+(r.agentic?'<span class="tag agentic" style="font-size:.55rem;padding:1px 6px">⚡</span>':'')+'</h4><p>'+r.desc+'</p></div></a>'
  }).join('')+'</div>';
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

const si=document.getElementById('searchInput'),ah=document.getElementById('aiHint'),acDrop=document.getElementById('acDropdown');
let db,acIdx=-1,acItems=[];

// --- Autocomplete: search-as-you-type ---
si.addEventListener('input',function(e){
  clearTimeout(db);
  var v=e.target.value.trim();
  ah.classList.toggle('visible',v.length>1);
  acIdx=-1;

  if(v.length<2){
    acDrop.classList.remove('open');
    sQ=v;render();return;
  }

  db=setTimeout(function(){
    if(window.typesenseReady){
      window.typesenseSearch(v,{
        perPage:6,
        queryBy:'name,desc,tags,url,category,backWhat,backSecurity,backWhen,audience',
        queryByWeights:'6,3,4,3,3,1,1,1,2'
      }).then(function(result){
        if(!result.hits.length){
          acDrop.classList.remove('open');
          sQ=v;render();return;
        }
        renderAutocomplete(v,result);
      }).catch(function(){
        acDrop.classList.remove('open');
        sQ=v;render();
      });
    }else{
      sQ=v;render();
    }
  },120);
});

function renderAutocomplete(query,result){
  var html='';

  // Tool results
  html+='<div class="ac-section"><div class="ac-section-label">Tools — '+result.found+' found</div>';
  result.hits.forEach(function(h){
    var doc=h.document;
    var match=RES.find(function(r){return r.name===doc.name});
    var cx=match?match.complexity:{tier:'',tierKey:''};
    var name=highlightName(doc.name,query);
    html+='<div class="ac-item" data-url="'+doc.url+'" data-name="'+doc.name+'">'
      +'<div class="ac-item-icon">'+faviconImg(doc.url,doc.name,20)+'</div>'
      +'<div class="ac-item-info"><div class="ac-item-name">'+name+'</div>'
      +'<div class="ac-item-meta"><span class="ac-cat">'+doc.category+'</span>'
      +(cx.tier?'<span class="ac-tier">'+cx.tier+'</span>':'')
      +(doc.agentic?'<span style="color:var(--accent)">⚡ Agentic</span>':'')
      +'</div></div></div>';
  });
  html+='</div>';

  // Facets
  var catFacet=(result.facets||[]).find(function(f){return f.field_name==='category'});
  if(catFacet&&catFacet.counts&&catFacet.counts.length>1){
    html+='<div class="ac-section"><div class="ac-section-label">Categories</div><div class="ac-facets">';
    catFacet.counts.slice(0,6).forEach(function(c){
      html+='<span class="ac-facet" data-filter="category:='+c.value+'">'+c.value+'<span class="ac-count">'+c.count+'</span></span>';
    });
    html+='</div></div>';
  }

  // Footer
  html+='<div class="ac-footer"><kbd>↵</kbd> full results &nbsp; <kbd>↑↓</kbd> navigate &nbsp; <kbd>esc</kbd> close</div>';

  acDrop.innerHTML=html;
  acDrop.classList.add('open');
  // Position fixed dropdown below the search input
  var rect=si.getBoundingClientRect();
  acDrop.style.left=rect.left+'px';
  acDrop.style.top=(rect.bottom+4)+'px';
  acDrop.style.width=rect.width+'px';

  // Cache items for keyboard nav
  acItems=acDrop.querySelectorAll('.ac-item');

  // Click handlers
  acDrop.querySelectorAll('.ac-item').forEach(function(el){
    el.addEventListener('click',function(){
      var name=el.getAttribute('data-name');
      var tool=RES.find(function(r){return r.name===name});
      if(tool){acDrop.classList.remove('open');showCardDetail(tool)}
    });
  });

  acDrop.querySelectorAll('.ac-facet').forEach(function(el){
    el.addEventListener('click',function(){
      var val=el.textContent.replace(/\d+$/,'').trim();
      acDrop.classList.remove('open');si.value='';
      // Set the category filter
      aCat=val;sQ='';buildFilters();render();
    });
  });
}

function highlightName(name,query){
  var words=query.toLowerCase().split(/\s+/);
  var result=name;
  words.forEach(function(w){
    if(w.length<2)return;
    var re=new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
    result=result.replace(re,'<mark>$1</mark>');
  });
  return result;
}

// --- Keyboard navigation in autocomplete ---
si.addEventListener('keydown',function(e){
  if(acDrop.classList.contains('open')){
    if(e.key==='ArrowDown'){
      e.preventDefault();
      acIdx=Math.min(acIdx+1,acItems.length-1);
      updateAcActive();return;
    }
    if(e.key==='ArrowUp'){
      e.preventDefault();
      acIdx=Math.max(acIdx-1,-1);
      updateAcActive();return;
    }
    if(e.key==='Escape'){
      acDrop.classList.remove('open');return;
    }
    if(e.key==='Enter'){
      if(acIdx>=0&&acItems[acIdx]){
        e.preventDefault();
        acItems[acIdx].click();return;
      }
    }
  }

  if(e.key==='Enter'){
    var v=si.value.trim();
    if(v){acDrop.classList.remove('open');aiSearch(v);}
  }
});

function updateAcActive(){
  acItems.forEach(function(el,i){
    el.classList.toggle('active',i===acIdx);
  });
  if(acIdx>=0&&acItems[acIdx])acItems[acIdx].scrollIntoView({block:'nearest'});
}

// Global shortcuts
document.addEventListener('keydown',function(e){
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();si.focus()}
  if(e.key==='Escape'){
    acDrop.classList.remove('open');
    document.getElementById('aiOverlay').classList.remove('active');
    si.blur();
  }
});

si.addEventListener('focus',function(){
  if(si.value.trim().length>=2&&acDrop.innerHTML){
    acDrop.classList.add('open');
    repositionAc();
  }
});
document.addEventListener('click',function(e){
  if(!e.target.closest('.search-container')&&!e.target.closest('.ac-dropdown'))acDrop.classList.remove('open');
});

// Reposition dropdown on scroll/resize
function repositionAc(){
  if(!acDrop.classList.contains('open'))return;
  var rect=si.getBoundingClientRect();
  acDrop.style.left=rect.left+'px';
  acDrop.style.top=(rect.bottom+4)+'px';
  acDrop.style.width=rect.width+'px';
}
window.addEventListener('scroll',repositionAc,{passive:true});
window.addEventListener('resize',repositionAc);

document.getElementById('aiClose').onclick=function(){document.getElementById('aiOverlay').classList.remove('active')};
document.getElementById('aiOverlay').onclick=function(e){if(e.target===e.currentTarget)e.currentTarget.classList.remove('active')};
document.querySelectorAll('.view-btn').forEach(function(b){b.onclick=function(){document.querySelectorAll('.view-btn').forEach(function(x){x.classList.remove('active')});b.classList.add('active');document.getElementById('cardGrid').classList.toggle('list-view',b.dataset.view==='list')}});

function showCardDetail(tool){
  const overlay=document.getElementById('cardOverlay'),detail=document.getElementById('cardDetail');
  const catColors={'AI Red Teaming':'var(--red)','AI Governance & Standards':'var(--yellow)','AI Guardrails & Firewalls':'var(--green)','AI Development Tools':'var(--cyan)','AI Code Assistants':'var(--pink)','Foundation Models':'var(--purple)','Identity & AppSec':'#3b82f6','Third-Party Risk':'var(--orange)','Compliance Automation':'#14b8a6'};
  const color=catColors[tool.category]||'var(--accent)';
  const ini=initials(tool.name);
  let metaTags='';
  if(tool.complexity)metaTags+=`<span class="meta-tag">${tool.complexity.tier}</span>`;
  if(tool.audience&&tool.audience!=='All')metaTags+=`<span class="meta-tag">${tool.audience}</span>`;
  if(tool.agentic)metaTags+=`<span class="meta-tag">Agentic</span>`;
  (tool.owaspLLM||[]).forEach(r=>{metaTags+=`<span class="meta-tag">${r}</span>`});
  (tool.owaspASI||[]).forEach(r=>{metaTags+=`<span class="meta-tag asi">${r}</span>`});
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
