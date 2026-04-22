// Middle sections: OWASP coverage heatmap, how-it-works, positioning.

// ─────────────────────────────────────────────────────────────
// CoverageMatrix — the centerpiece. Treats the OWASP Top 10 as a
// visual heatmap. Density of the bar = number of tools. Clicking a
// cell would deep-link to the filtered directory.
// ─────────────────────────────────────────────────────────────
function CoverageMatrix() {
  const [tab, setTab] = React.useState('LLM');
  const risks = tab === 'LLM' ? LLM_RISKS : ASI_RISKS;
  const max = Math.max(...risks.map(r => r.count));

  return (
    <section style={{padding:'96px 32px', position:'relative'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <SectionLabel label="Coverage"/>
        <SectionTitle>
          Every OWASP risk, mapped to the tools<br/>
          that <em style={italicAccent}>actually address it</em>.
        </SectionTitle>
        <p style={leadCopy}>
          Twenty risk categories. 161 tools. Every cell below is a live filter — one click takes you to the tools that cover that specific risk.
        </p>

        {/* Tab switch */}
        <div style={{display:'inline-flex', gap:2, background:'rgba(255,255,255,0.04)', padding:4, borderRadius:8, marginBottom:36, border:'1px solid rgba(255,255,255,0.06)'}}>
          {[['LLM','OWASP LLM Top 10 · 2025'], ['ASI','OWASP Agentic Top 10 · 2026']].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              background: tab===k ? '#f0eee9' : 'transparent',
              color: tab===k ? '#0a0e14' : '#9aa6b2',
              border:'none', padding:'9px 16px', borderRadius:6,
              fontSize:12, fontFamily:'"JetBrains Mono", monospace',
              fontWeight: tab===k ? 600 : 400,
              cursor:'pointer', letterSpacing:0.3,
            }}>{l}</button>
          ))}
        </div>

        {/* Heatmap grid */}
        <div style={{
          border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
          overflow:'hidden', background:'rgba(255,255,255,0.015)',
        }}>
          {risks.map((r, i) => {
            const pct = r.count / max;
            return (
              <a key={r.id} href={`/directory?risk=${r.id}`} style={{
                display:'grid',
                gridTemplateColumns: '110px 1fr 100px 80px',
                gap:24, alignItems:'center',
                padding:'16px 24px',
                borderBottom: i === risks.length-1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                textDecoration:'none',
                transition:'background .15s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(201,100,66,0.05)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{
                  fontFamily:'"JetBrains Mono", monospace', fontSize:12,
                  color:'#c96442', letterSpacing:1,
                }}>{r.id}</span>
                <span style={{fontSize:15, color:'#f0eee9', fontFamily:'"Inter", sans-serif'}}>{r.name}</span>
                <div style={{position:'relative', height:6, background:'rgba(255,255,255,0.06)', borderRadius:3, overflow:'hidden'}}>
                  <div style={{
                    position:'absolute', inset:0, right:'auto',
                    width: `${pct * 100}%`,
                    background:'linear-gradient(90deg, #1f6b5e 0%, #7fb8aa 100%)',
                    borderRadius:3,
                  }}/>
                </div>
                <span style={{
                  fontFamily:'"JetBrains Mono", monospace', fontSize:13,
                  color:'#f0eee9', textAlign:'right',
                  fontVariantNumeric:'tabular-nums',
                }}>
                  {String(r.count).padStart(3,' ')} <span style={{color:'#6b7a88', fontSize:11}}>tools</span>
                </span>
              </a>
            );
          })}
        </div>

        <div style={{
          marginTop:18, fontFamily:'"JetBrains Mono", monospace',
          fontSize:11, color:'#6b7a88', letterSpacing:0.3,
          display:'flex', gap:20,
        }}>
          <span>· Counts updated 2026-04-22</span>
          <span>· v1.7.0</span>
          <span>· Tools may address multiple risks</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Three paths in
// ─────────────────────────────────────────────────────────────
function ThreeWaysIn() {
  const paths = [
    {
      n: '01',
      k: 'Filter by risk',
      d: 'Toggle between LLM Top 10 and Agentic Top 10. Pick a risk. Directory instantly filters — tools grouped by category with counts.',
      code: [
        ['filter', 'risk:LLM01'],
        ['stage',  'production'],
        ['result', '24 tools'],
      ],
    },
    {
      n: '02',
      k: 'Natural language',
      d: 'Plain English. "Tools for supply chain scanning in CI." Parser extracts filters, returns ranked results from the full directory.',
      code: [
        ['query',  '"scan models in CI"'],
        ['parsed', 'risk:LLM03 stage:ci'],
        ['result', '9 tools'],
      ],
    },
    {
      n: '03',
      k: 'Explore the graph',
      d: 'Every tool, risk, and lifecycle stage as an interactive network. Click a node, see its connections. Coverage clusters and defence gaps at a glance.',
      code: [
        ['nodes',  '161 + 20 + 8'],
        ['edges',  '642'],
        ['layout', 'force-directed'],
      ],
    },
  ];
  return (
    <section style={{padding:'96px 32px', background:'linear-gradient(180deg, transparent, rgba(201,100,66,0.02))'}}>
      <div style={{maxWidth: 1240, margin: '0 auto'}}>
        <SectionLabel label="How it works"/>
        <SectionTitle>Three paths from risk to tool.</SectionTitle>
        <p style={leadCopy}>Start from whatever you already know — a specific OWASP risk, a plain-English question, or no starting point at all.</p>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, marginTop:48,
        }}>
          {paths.map(p => (
            <div key={p.n} style={{
              background:'rgba(255,255,255,0.02)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:12, padding:28,
              display:'flex', flexDirection:'column', gap:16,
            }}>
              <div style={{
                fontFamily:'"JetBrains Mono", monospace', fontSize:11,
                color:'#c96442', letterSpacing:1.5,
              }}>{p.n}</div>
              <h3 style={{
                fontFamily:'Fraunces, serif', fontSize:26, fontWeight:500,
                letterSpacing:-0.4, color:'#f0eee9', margin:0, lineHeight:1.15,
              }}>{p.k}</h3>
              <p style={{color:'#9aa6b2', fontSize:14, lineHeight:1.55, margin:0}}>{p.d}</p>
              <div style={{
                marginTop:'auto', padding:14,
                background:'#0a0e14', border:'1px solid rgba(255,255,255,0.06)',
                borderRadius:8, fontFamily:'"JetBrains Mono", monospace', fontSize:11,
              }}>
                {p.code.map(([k,v])=>(
                  <div key={k} style={{display:'flex', justifyContent:'space-between', padding:'3px 0'}}>
                    <span style={{color:'#6b7a88'}}>{k}</span>
                    <span style={{color:'#7fb8aa'}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Positioning — between awesome-lists & analyst reports
// ─────────────────────────────────────────────────────────────
function Positioning() {
  const cols = [
    {
      t: 'Awesome-lists',
      s: 'Crowd-sourced',
      rows: [['Cost','Free'],['Structure','Flat links'],['Risk mapping','None'],['Search / filter','None'],['Accountability','Community'],['Freshness','Drift after fork']],
      dim: true,
    },
    {
      t: 'Yuntona',
      s: 'Practitioner-curated',
      rows: [['Cost','Free · MIT'],['Structure','Evaluated entries'],['Risk mapping','LLM + Agentic Top 10'],['Search / filter','Plain English + filters'],['Accountability','Named maintainer'],['Freshness','Continuous']],
      dim: false,
    },
    {
      t: 'Analyst reports',
      s: 'Paywalled snapshots',
      rows: [['Cost','£££'],['Structure','PDF chapters'],['Risk mapping','Often'],['Search / filter','No'],['Accountability','Institution'],['Freshness','Months']],
      dim: true,
    },
  ];
  return (
    <section style={{padding:'96px 32px'}}>
      <div style={{maxWidth:1240, margin:'0 auto'}}>
        <SectionLabel label="Where Yuntona sits"/>
        <SectionTitle>Between <em style={italicAccent}>awesome-lists</em> and <em style={italicAccent}>analyst reports</em>.</SectionTitle>
        <p style={leadCopy}>Free and open like the first. Individually evaluated and structurally mapped like the second. Accountable to one named practitioner either way.</p>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16, marginTop:48,
        }}>
          {cols.map(c => (
            <div key={c.t} style={{
              background: c.dim ? 'transparent' : 'linear-gradient(180deg, rgba(201,100,66,0.08) 0%, rgba(201,100,66,0.02) 100%)',
              border: c.dim ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(201,100,66,0.25)',
              borderRadius: 12, padding: '26px 24px',
              opacity: c.dim ? 0.62 : 1,
            }}>
              <div style={{
                fontFamily:'Fraunces, serif', fontSize:22, fontWeight:500,
                color:'#f0eee9', letterSpacing:-0.3,
              }}>{c.t}</div>
              <div style={{
                fontFamily:'"JetBrains Mono", monospace', fontSize:11,
                color: c.dim ? '#6b7a88' : '#c96442', marginTop:4, letterSpacing:0.5, textTransform:'uppercase',
              }}>{c.s}</div>
              <div style={{marginTop:22, borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                {c.rows.map(([k,v])=>(
                  <div key={k} style={{
                    display:'grid', gridTemplateColumns:'1fr 1.3fr',
                    padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)',
                    fontSize:13,
                  }}>
                    <span style={{color:'#6b7a88', fontFamily:'"JetBrains Mono", monospace', fontSize:11, letterSpacing:0.3, textTransform:'uppercase', alignSelf:'center'}}>{k}</span>
                    <span style={{color: c.dim ? '#8593a0' : '#f0eee9'}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section header primitives
// ─────────────────────────────────────────────────────────────
const italicAccent = {
  fontStyle:'italic', fontFamily:'"Instrument Serif", serif',
  fontWeight:400, color:'#7fb8aa',
};
const leadCopy = {
  fontSize:17, lineHeight:1.55, color:'#9aa6b2',
  maxWidth:620, margin:'0 0 8px',
};
function SectionLabel({label}) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      fontFamily:'"JetBrains Mono", monospace', fontSize:11,
      color:'#c96442', letterSpacing:2, textTransform:'uppercase',
      marginBottom:18,
    }}>
      <span style={{width:20, height:1, background:'#c96442'}}/>
      <span>{label}</span>
    </div>
  );
}
function SectionTitle({children}) {
  return (
    <h2 style={{
      fontFamily:'Fraunces, serif', fontSize:44, fontWeight:500,
      letterSpacing:-1.2, lineHeight:1.1, color:'#f0eee9',
      margin:'0 0 20px', maxWidth:880,
    }}>{children}</h2>
  );
}

Object.assign(window, { CoverageMatrix, ThreeWaysIn, Positioning, SectionLabel, SectionTitle });
