// Directory UI — filter rail + top search bar + dense tool list.
// Matches the landing page's dark, technical palette.

function DirectoryPage() {
  const [query, setQuery] = React.useState('');
  const [activeCats, setActiveCats] = React.useState(new Set());
  const [activeRisks, setActiveRisks] = React.useState(new Set());
  const [activeStages, setActiveStages] = React.useState(new Set());
  const [activeAud, setActiveAud] = React.useState(new Set());
  const [activeComp, setActiveComp] = React.useState(new Set());
  const [activePrice, setActivePrice] = React.useState(new Set());
  const [riskTab, setRiskTab] = React.useState('LLM');
  const [view, setView] = React.useState('list');
  const [sort, setSort] = React.useState('relevance');

  const toggle = (setter) => (k) => setter(prev => {
    const n = new Set(prev);
    n.has(k) ? n.delete(k) : n.add(k);
    return n;
  });

  // Filter pipeline
  const results = React.useMemo(() => {
    let r = TOOLS.slice();
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
    }
    if (activeCats.size) r = r.filter(t => activeCats.has(t.cat));
    if (activeRisks.size) r = r.filter(t => t.risks.some(x => activeRisks.has(x)));
    if (activeStages.size) r = r.filter(t => activeStages.has(t.stage));
    if (activeAud.size) r = r.filter(t => t.audience.some(x => activeAud.has(x)));
    if (activeComp.size) r = r.filter(t => activeComp.has(t.complexity));
    if (activePrice.size) r = r.filter(t => activePrice.has(t.pricing));
    if (sort === 'updated') r.sort((a,b)=>b.updated.localeCompare(a.updated));
    if (sort === 'name') r.sort((a,b)=>a.name.localeCompare(b.name));
    return r;
  }, [query, activeCats, activeRisks, activeStages, activeAud, activeComp, activePrice, sort]);

  const activeCount = activeCats.size+activeRisks.size+activeStages.size+activeAud.size+activeComp.size+activePrice.size;
  const clearAll = () => {
    setActiveCats(new Set()); setActiveRisks(new Set()); setActiveStages(new Set());
    setActiveAud(new Set()); setActiveComp(new Set()); setActivePrice(new Set()); setQuery('');
  };

  return (
    <div>
      <TopNav/>
      <div style={{
        maxWidth:1400, margin:'0 auto', padding:'24px 24px 40px',
        display:'grid', gridTemplateColumns:'260px 1fr', gap:28,
      }}>
        {/* Sidebar */}
        <aside style={{position:'sticky', top:72, alignSelf:'start', maxHeight:'calc(100vh - 90px)', overflowY:'auto', paddingRight:4}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#c96442', letterSpacing:1.5, textTransform:'uppercase'}}>Filters</div>
            {activeCount > 0 && (
              <button onClick={clearAll} style={{background:'transparent', border:'none', color:'#9aa6b2', fontSize:11, cursor:'pointer', fontFamily:'"JetBrains Mono", monospace'}}>
                clear · {activeCount}
              </button>
            )}
          </div>

          {/* OWASP risks — has its own tab switch */}
          <FacetGroup title="OWASP risk">
            <div style={{display:'flex', gap:2, background:'rgba(255,255,255,0.04)', padding:3, borderRadius:6, marginBottom:10, border:'1px solid rgba(255,255,255,0.06)'}}>
              {[['LLM','LLM · 2025'],['ASI','Agentic · 2026']].map(([k,l])=>(
                <button key={k} onClick={()=>setRiskTab(k)} style={{
                  flex:1, background: riskTab===k ? '#f0eee9' : 'transparent',
                  color: riskTab===k ? '#0a0e14' : '#9aa6b2',
                  border:'none', padding:'6px 8px', borderRadius:4,
                  fontSize:10, fontFamily:'"JetBrains Mono", monospace', cursor:'pointer',
                }}>{l}</button>
              ))}
            </div>
            {(riskTab==='LLM' ? LLM_TOP10 : ASI_TOP10).map(([id, name, c])=>(
              <FacetRow key={id} id={id} label={<span><span style={{color:'#c96442', fontFamily:'"JetBrains Mono", monospace', fontSize:11, marginRight:6}}>{id}</span>{name}</span>} count={c}
                active={activeRisks.has(id)} onClick={()=>toggle(setActiveRisks)(id)}/>
            ))}
          </FacetGroup>

          <FacetGroup title="Category">
            {FACETS.category.map(([id,name,c])=>(
              <FacetRow key={id} id={id} label={name} count={c}
                active={activeCats.has(id)} onClick={()=>toggle(setActiveCats)(id)}/>
            ))}
          </FacetGroup>

          <FacetGroup title="Lifecycle stage">
            {FACETS.stage.map(([id,name,c])=>(
              <FacetRow key={id} id={id} label={name} count={c}
                active={activeStages.has(id)} onClick={()=>toggle(setActiveStages)(id)}/>
            ))}
          </FacetGroup>

          <FacetGroup title="Audience">
            {FACETS.audience.map(([id,name,c])=>(
              <FacetRow key={id} id={id} label={name} count={c}
                active={activeAud.has(id)} onClick={()=>toggle(setActiveAud)(id)}/>
            ))}
          </FacetGroup>

          <FacetGroup title="Complexity">
            {FACETS.complexity.map(([id,name,c])=>(
              <FacetRow key={id} id={id} label={name} count={c}
                active={activeComp.has(id)} onClick={()=>toggle(setActiveComp)(id)}/>
            ))}
          </FacetGroup>

          <FacetGroup title="Pricing">
            {FACETS.pricing.map(([id,name,c])=>(
              <FacetRow key={id} id={id} label={name} count={c}
                active={activePrice.has(id)} onClick={()=>toggle(setActivePrice)(id)}/>
            ))}
          </FacetGroup>
        </aside>

        {/* Main */}
        <main>
          <DirectoryHeader
            query={query} setQuery={setQuery}
            count={results.length}
            view={view} setView={setView}
            sort={sort} setSort={setSort}
            activeCount={activeCount}
          />

          <ActivePills
            activeCats={activeCats} setActiveCats={setActiveCats}
            activeRisks={activeRisks} setActiveRisks={setActiveRisks}
            activeStages={activeStages} setActiveStages={setActiveStages}
            activeAud={activeAud} setActiveAud={setActiveAud}
            activeComp={activeComp} setActiveComp={setActiveComp}
            activePrice={activePrice} setActivePrice={setActivePrice}
          />

          {view === 'list' ? (
            <div style={{
              border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
              overflow:'hidden', background:'rgba(255,255,255,0.015)',
            }}>
              {results.length === 0 ? (
                <EmptyState onClear={clearAll}/>
              ) : results.map((t, i)=>(
                <ToolRow key={t.id} t={t} last={i===results.length-1}/>
              ))}
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:14}}>
              {results.map(t => <ToolCard key={t.id} t={t}/>)}
            </div>
          )}

          <div style={{
            marginTop:24, padding:'16px 4px',
            display:'flex', justifyContent:'space-between',
            fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88', letterSpacing:0.3,
          }}>
            <span>Showing {results.length} of {TOOLS.length} (sample view · full directory has 161 tools)</span>
            <span>v1.7.0 · last indexed 2026-04-22</span>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sidebar facet building blocks
// ─────────────────────────────────────────────────────────────
function FacetGroup({title, children}) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{marginBottom:22, borderBottom:'1px solid rgba(255,255,255,0.05)', paddingBottom:18}}>
      <button onClick={()=>setOpen(!open)} style={{
        width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
        background:'transparent', border:'none', padding:'4px 0', cursor:'pointer',
        fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#9aa6b2',
        letterSpacing:1.5, textTransform:'uppercase', marginBottom:10,
      }}>
        <span>{title}</span>
        <span style={{color:'#6b7a88', transform: open ? 'rotate(0)' : 'rotate(-90deg)', transition:'transform .15s'}}>▾</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}
function FacetRow({id, label, count, active, onClick}) {
  return (
    <button onClick={onClick} style={{
      width:'100%', display:'grid', gridTemplateColumns:'14px 1fr auto', gap:8, alignItems:'center',
      padding:'5px 6px', marginBottom:1, borderRadius:4,
      background: active ? 'rgba(201,100,66,0.12)' : 'transparent',
      border:'none', cursor: count===0 ? 'default' : 'pointer', textAlign:'left',
      opacity: count===0 ? 0.35 : 1,
    }}
    onMouseEnter={e=>{ if(count>0 && !active) e.currentTarget.style.background='rgba(255,255,255,0.04)';}}
    onMouseLeave={e=>{ if(!active) e.currentTarget.style.background='transparent';}}>
      <span style={{
        width:12, height:12, borderRadius:3,
        background: active ? '#c96442' : 'transparent',
        border: active ? 'none' : '1px solid rgba(255,255,255,0.18)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:9, color:'#0a0e14', fontWeight:700,
      }}>{active ? '✓' : ''}</span>
      <span style={{fontSize:12, color: active ? '#f0eee9' : '#c2cbd4'}}>{label}</span>
      <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', fontVariantNumeric:'tabular-nums'}}>{count}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Header: search bar, view toggle, sort, result count
// ─────────────────────────────────────────────────────────────
function DirectoryHeader({query, setQuery, count, view, setView, sort, setSort}) {
  return (
    <>
      <div style={{marginBottom:18}}>
        <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:6}}>
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#c96442', letterSpacing:2, textTransform:'uppercase'}}>Directory</span>
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88'}}>/directory</span>
        </div>
        <h1 style={{
          fontFamily:'Fraunces, serif', fontSize:40, fontWeight:500, letterSpacing:-1.2,
          color:'#f0eee9', margin:0, lineHeight:1,
        }}>
          161 <em style={{fontStyle:'italic', fontFamily:'"Instrument Serif", serif', fontWeight:400, color:'#7fb8aa'}}>AI security</em> tools
        </h1>
      </div>

      {/* Search bar */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr auto auto', gap:10,
        marginBottom:14,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          background:'#10161f', border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:8, padding:'11px 14px',
        }}>
          <span style={{color:'#7fb8aa', fontFamily:'"JetBrains Mono", monospace', fontSize:14}}>›</span>
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            placeholder="Search tools or ask in plain English — 'prompt injection for production'"
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              color:'#f0eee9', fontSize:14, fontFamily:'"Inter", sans-serif',
            }}/>
          <kbd style={{background:'rgba(255,255,255,0.06)', padding:'3px 7px', borderRadius:4, fontSize:10, color:'#9aa6b2'}}>⌘K</kbd>
        </div>

        <div style={{
          display:'flex', background:'#10161f', border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:8, padding:3,
        }}>
          {[['list','List'],['grid','Grid']].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{
              background: view===k ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: view===k ? '#f0eee9' : '#9aa6b2',
              border:'none', padding:'7px 14px', borderRadius:5,
              fontSize:12, fontFamily:'"JetBrains Mono", monospace', cursor:'pointer',
            }}>{l}</button>
          ))}
        </div>

        <select value={sort} onChange={e=>setSort(e.target.value)} style={{
          background:'#10161f', border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:8, padding:'10px 14px', color:'#c2cbd4', fontSize:12,
          fontFamily:'"JetBrains Mono", monospace', cursor:'pointer', outline:'none',
        }}>
          <option value="relevance">sort: relevance</option>
          <option value="updated">sort: updated</option>
          <option value="name">sort: name</option>
        </select>
      </div>

      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88', marginBottom:14, letterSpacing:0.3}}>
        {count} result{count===1?'':'s'}
      </div>
    </>
  );
}

function ActivePills({activeCats, setActiveCats, activeRisks, setActiveRisks, activeStages, setActiveStages, activeAud, setActiveAud, activeComp, setActiveComp, activePrice, setActivePrice}) {
  const pill = (label, onRemove, key) => (
    <span key={key} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      background:'rgba(201,100,66,0.12)', color:'#f0eee9',
      border:'1px solid rgba(201,100,66,0.3)',
      padding:'4px 6px 4px 10px', borderRadius:4,
      fontSize:11, fontFamily:'"JetBrains Mono", monospace',
    }}>
      {label}
      <button onClick={onRemove} style={{background:'transparent', border:'none', color:'#c96442', cursor:'pointer', padding:'0 4px', fontSize:12}}>×</button>
    </span>
  );
  const all = [];
  activeCats.forEach(k=>all.push(pill(`cat:${k}`, ()=>{const n=new Set(activeCats);n.delete(k);setActiveCats(n);}, `cat-${k}`)));
  activeRisks.forEach(k=>all.push(pill(`risk:${k}`, ()=>{const n=new Set(activeRisks);n.delete(k);setActiveRisks(n);}, `risk-${k}`)));
  activeStages.forEach(k=>all.push(pill(`stage:${k}`, ()=>{const n=new Set(activeStages);n.delete(k);setActiveStages(n);}, `st-${k}`)));
  activeAud.forEach(k=>all.push(pill(`audience:${k}`, ()=>{const n=new Set(activeAud);n.delete(k);setActiveAud(n);}, `a-${k}`)));
  activeComp.forEach(k=>all.push(pill(`complexity:${k}`, ()=>{const n=new Set(activeComp);n.delete(k);setActiveComp(n);}, `c-${k}`)));
  activePrice.forEach(k=>all.push(pill(`pricing:${k}`, ()=>{const n=new Set(activePrice);n.delete(k);setActivePrice(n);}, `p-${k}`)));
  if (!all.length) return null;
  return <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:14}}>{all}</div>;
}

// ─────────────────────────────────────────────────────────────
// Tool row (list view)
// ─────────────────────────────────────────────────────────────
function ToolRow({t, last}) {
  const catLabel = (FACETS.category.find(c=>c[0]===t.cat) || [,''])[1];
  const stageLabel = (FACETS.stage.find(c=>c[0]===t.stage) || [,t.stage])[1];
  const priceLabel = (FACETS.pricing.find(c=>c[0]===t.pricing) || [,t.pricing])[1];
  const compLabel = (FACETS.complexity.find(c=>c[0]===t.complexity) || [,t.complexity])[1];

  return (
    <a href={`#${t.id}`} style={{
      display:'grid',
      gridTemplateColumns:'44px minmax(240px, 1fr) minmax(140px, 180px) minmax(140px, 170px)',
      gap:16,
      padding:'18px 20px', textDecoration:'none',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)',
      transition:'background .12s', alignItems:'center',
    }}
    onMouseEnter={e=>e.currentTarget.style.background='rgba(201,100,66,0.04)'}
    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      {/* glyph */}
      <div style={{
        width:40, height:40, borderRadius:8, background:t.glyphBg,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'Fraunces, serif', fontSize:15, fontWeight:600, color:'#f0eee9',
        letterSpacing:-0.3, flexShrink:0,
      }}>{t.glyph}</div>

      {/* name + desc */}
      <div style={{minWidth:0}}>
        <div style={{display:'flex', alignItems:'baseline', gap:10, marginBottom:4}}>
          <span style={{fontSize:16, fontWeight:600, color:'#f0eee9', letterSpacing:-0.2}}>{t.name}</span>
          {t.stars && <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#9aa6b2'}}>★ {t.stars}</span>}
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88'}}>· {catLabel}</span>
        </div>
        <div style={{fontSize:13, color:'#9aa6b2', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
          {t.desc}
        </div>
      </div>

      {/* risk tags */}
      <div style={{display:'flex', gap:4, flexWrap:'wrap', alignItems:'center'}}>
        {t.risks.slice(0,4).map(r=>(
          <span key={r} style={{
            fontFamily:'"JetBrains Mono", monospace', fontSize:10,
            color: r.startsWith('ASI') ? '#c96442' : '#7fb8aa',
            background: r.startsWith('ASI') ? 'rgba(201,100,66,0.1)' : 'rgba(31,107,94,0.12)',
            border: `1px solid ${r.startsWith('ASI') ? 'rgba(201,100,66,0.25)' : 'rgba(31,107,94,0.25)'}`,
            padding:'3px 7px', borderRadius:3,
          }}>{r}</span>
        ))}
        {t.risks.length > 4 && <span style={{fontSize:10, color:'#6b7a88', fontFamily:'"JetBrains Mono", monospace'}}>+{t.risks.length-4}</span>}
      </div>

      {/* meta badges */}
      <div style={{display:'flex', flexDirection:'column', gap:4, fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#9aa6b2', alignItems:'flex-end'}}>
        <div style={{display:'flex', gap:6}}>
          <span style={{color:'#6b7a88'}}>stage</span>
          <span style={{color:'#c2cbd4'}}>{stageLabel}</span>
        </div>
        <div style={{display:'flex', gap:6}}>
          <span style={{color:'#6b7a88'}}>pricing</span>
          <span style={{color: t.pricing==='oss' ? '#7fb8aa' : '#c2cbd4'}}>{priceLabel}</span>
        </div>
        <div style={{display:'flex', gap:6}}>
          <span style={{color:'#6b7a88'}}>complexity</span>
          <span style={{color:'#c2cbd4'}}>{compLabel}</span>
        </div>
      </div>
    </a>
  );
}

function ToolCard({t}) {
  const catLabel = (FACETS.category.find(c=>c[0]===t.cat) || [,''])[1];
  return (
    <a href={`#${t.id}`} style={{
      display:'block', padding:18,
      background:'rgba(255,255,255,0.02)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:10, textDecoration:'none',
      transition:'border-color .12s, background .12s',
    }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,100,66,0.35)';}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';}}>
      <div style={{display:'flex', gap:12, marginBottom:12, alignItems:'center'}}>
        <div style={{
          width:36, height:36, borderRadius:7, background:t.glyphBg,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Fraunces, serif', fontSize:13, fontWeight:600, color:'#f0eee9',
        }}>{t.glyph}</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:15, fontWeight:600, color:'#f0eee9'}}>{t.name}</div>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88'}}>{catLabel}</div>
        </div>
      </div>
      <div style={{fontSize:12, color:'#9aa6b2', lineHeight:1.5, marginBottom:12, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{t.desc}</div>
      <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
        {t.risks.slice(0,3).map(r=>(
          <span key={r} style={{
            fontFamily:'"JetBrains Mono", monospace', fontSize:10,
            color: r.startsWith('ASI') ? '#c96442' : '#7fb8aa',
            background: r.startsWith('ASI') ? 'rgba(201,100,66,0.1)' : 'rgba(31,107,94,0.12)',
            border: `1px solid ${r.startsWith('ASI') ? 'rgba(201,100,66,0.25)' : 'rgba(31,107,94,0.25)'}`,
            padding:'2px 6px', borderRadius:3,
          }}>{r}</span>
        ))}
      </div>
    </a>
  );
}

function EmptyState({onClear}) {
  return (
    <div style={{padding:'80px 32px', textAlign:'center'}}>
      <div style={{fontFamily:'Fraunces, serif', fontSize:24, color:'#f0eee9', marginBottom:8}}>No tools match.</div>
      <div style={{color:'#9aa6b2', fontSize:14, marginBottom:22}}>Try widening your filters or clearing them.</div>
      <button onClick={onClear} style={{
        background:'#c96442', color:'#0a0e14', border:'none',
        padding:'10px 18px', borderRadius:6, fontFamily:'"JetBrains Mono", monospace',
        fontSize:12, cursor:'pointer', fontWeight:600,
      }}>Clear all filters</button>
    </div>
  );
}

Object.assign(window, { DirectoryPage });
