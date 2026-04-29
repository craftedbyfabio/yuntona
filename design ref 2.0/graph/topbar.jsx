// Top chrome for the Graph page — page header, view toggle, filter row.

const { useState } = React;
const { CATEGORIES } = window.GraphData;

function GraphTopBar({ view, setView, scope, setScope, activeCats, setActiveCats }) {
  return (
    <div style={{
      borderBottom:'1px solid rgba(240,238,233,0.08)',
      padding:'18px 32px 14px',
      background:'#0a0e14',
      display:'flex', flexDirection:'column', gap:14,
    }}>
      {/* Row 1: title, view toggle, search */}
      <div style={{ display:'flex', alignItems:'center', gap:24 }}>
        <a href="Yuntona Landing.html" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'#f0eee9' }}>
          <YuntonaMark size={26} color="#c96442"/>
          <span style={{ fontFamily:'Fraunces', fontSize:22, fontWeight:600, letterSpacing:'-0.01em' }}>YUNTONA</span>
        </a>
        <span style={{ width:1, height:22, background:'rgba(240,238,233,0.12)' }}/>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <span style={{ fontSize:11, letterSpacing:'0.18em', color:'rgba(240,238,233,0.5)' }}>KNOWLEDGE GRAPH</span>
          <span style={{ fontFamily:'Fraunces', fontSize:18, fontStyle:'italic', color:'rgba(240,238,233,0.85)' }}>
            161 tools · 8 stages · 20 risks
          </span>
        </div>

        <div style={{ flex:1 }}/>

        <div style={{
          display:'flex', alignItems:'center', gap:8,
          background:'rgba(240,238,233,0.05)',
          border:'1px solid rgba(240,238,233,0.1)',
          borderRadius:999, padding:'6px 14px', minWidth:280,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,233,0.5)" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input
            placeholder="Search tools, risks, stages…"
            style={{
              background:'transparent', border:'none', outline:'none',
              color:'#f0eee9', fontFamily:'Inter', fontSize:13, flex:1,
            }}
          />
          <kbd style={{
            fontSize:10, padding:'2px 6px', borderRadius:4,
            background:'rgba(240,238,233,0.08)', color:'rgba(240,238,233,0.55)',
            border:'1px solid rgba(240,238,233,0.1)',
          }}>⌘K</kbd>
        </div>

        <ViewToggle view={view} setView={setView}/>
      </div>

      {/* Row 2: scope + categories */}
      <div style={{ display:'flex', alignItems:'center', gap:18, flexWrap:'wrap' }}>
        <Pillset
          label="VIEW"
          options={[
            { id:'all',       label:'All' },
            { id:'llm',       label:'LLM Risks' },
            { id:'lifecycle', label:'Lifecycle' },
            { id:'asi',       label:'ASI Risks' },
          ]}
          active={scope}
          onChange={setScope}
        />
        <span style={{ width:1, height:18, background:'rgba(240,238,233,0.1)' }}/>
        <span style={{ fontSize:11, letterSpacing:'0.18em', color:'rgba(240,238,233,0.5)' }}>CATEGORY</span>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          <CatChip
            color="#c96442" label="All"
            active={activeCats.length===0}
            onClick={()=>setActiveCats([])}
          />
          {CATEGORIES.map(c => (
            <CatChip
              key={c.id} color={c.color} label={c.label}
              active={activeCats.includes(c.id)}
              onClick={()=>setActiveCats(
                activeCats.includes(c.id) ? activeCats.filter(x=>x!==c.id) : [...activeCats, c.id]
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewToggle({ view, setView }) {
  const opts = [
    { id:'sankey',  label:'Sankey',  icon:(
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h4c4 0 4 12 8 12h6"/><path d="M3 12h4c4 0 4 0 8 0h6" opacity=".55"/><path d="M3 18h4c4 0 4-12 8-12h6" opacity=".75"/>
      </svg>
    )},
    { id:'network', label:'Network', icon:(
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
        <path d="M7.5 7.5 11 12M16.5 7.5 13 12M11 14l-3.5 3.5M13 14l3.5 3.5"/>
      </svg>
    )},
    { id:'heatmap', label:'Heatmap', icon:(
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="6" height="6"/><rect x="10" y="3" width="6" height="6" opacity=".4"/><rect x="17" y="3" width="4" height="6" opacity=".7"/>
        <rect x="3" y="10" width="6" height="6" opacity=".7"/><rect x="10" y="10" width="6" height="6"/><rect x="17" y="10" width="4" height="6" opacity=".4"/>
        <rect x="3" y="17" width="6" height="4" opacity=".4"/><rect x="10" y="17" width="6" height="4" opacity=".7"/><rect x="17" y="17" width="4" height="4"/>
      </svg>
    )},
  ];
  return (
    <div style={{
      display:'flex', gap:2, padding:3, borderRadius:8,
      background:'rgba(240,238,233,0.05)',
      border:'1px solid rgba(240,238,233,0.1)',
    }}>
      {opts.map(o => {
        const on = view===o.id;
        return (
          <button key={o.id} onClick={()=>setView(o.id)} style={{
            display:'flex', alignItems:'center', gap:7,
            padding:'7px 14px', borderRadius:6,
            background: on ? '#c96442' : 'transparent',
            color: on ? '#fff' : 'rgba(240,238,233,0.7)',
            border:'none', cursor:'pointer',
            fontFamily:'Inter', fontSize:12.5, fontWeight:500,
            transition:'all 0.15s',
          }}>
            {o.icon}{o.label}
          </button>
        );
      })}
    </div>
  );
}

function Pillset({ label, options, active, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ fontSize:11, letterSpacing:'0.18em', color:'rgba(240,238,233,0.5)' }}>{label}</span>
      <div style={{ display:'flex', gap:4 }}>
        {options.map(o => {
          const on = active===o.id;
          return (
            <button key={o.id} onClick={()=>onChange(o.id)} style={{
              padding:'5px 12px', borderRadius:999, fontSize:12, fontWeight:500,
              background: on ? 'rgba(201,100,66,0.18)' : 'transparent',
              color: on ? '#e8a888' : 'rgba(240,238,233,0.65)',
              border: on ? '1px solid rgba(201,100,66,0.5)' : '1px solid rgba(240,238,233,0.12)',
              cursor:'pointer', fontFamily:'Inter',
            }}>{o.label}</button>
          );
        })}
      </div>
    </div>
  );
}

function CatChip({ color, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:7,
      padding:'5px 11px', borderRadius:999,
      background: active ? `${color}28` : 'transparent',
      border: active ? `1px solid ${color}80` : '1px solid rgba(240,238,233,0.1)',
      color: active ? '#f0eee9' : 'rgba(240,238,233,0.65)',
      fontFamily:'Inter', fontSize:11.5, fontWeight:500, cursor:'pointer',
    }}>
      <span style={{ width:7, height:7, borderRadius:99, background:color }}/>
      {label}
    </button>
  );
}

window.GraphTopBar = GraphTopBar;
