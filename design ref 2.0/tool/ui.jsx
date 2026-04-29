// Tool detail page UI — two-column layout with metadata sidebar.

function ToolPage() {
  return (
    <div>
      <TopNav/>

      {/* Breadcrumb */}
      <div style={{maxWidth:1240, margin:'0 auto', padding:'20px 32px 0'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88'}}>
          <a href="/" style={{color:'#9aa6b2', textDecoration:'none'}}>~</a>
          <span>/</span>
          <a href="/directory" style={{color:'#9aa6b2', textDecoration:'none'}}>directory</a>
          <span>/</span>
          <span style={{color:'#c96442'}}>{TOOL.slug}</span>
        </div>
      </div>

      {/* Header */}
      <header style={{
        maxWidth:1240, margin:'0 auto', padding:'24px 32px 36px',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{display:'flex', gap:24, alignItems:'flex-start'}}>
          <div style={{
            width:72, height:72, borderRadius:12, background:TOOL.glyphBg,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Fraunces, serif', fontSize:34, fontWeight:600,
            color:TOOL.glyphAccent, letterSpacing:-1, flexShrink:0,
            border:`1px solid ${TOOL.glyphAccent}22`,
          }}>{TOOL.glyph}</div>

          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6, flexWrap:'wrap'}}>
              <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#c96442', letterSpacing:1.5, textTransform:'uppercase', padding:'3px 8px', border:'1px solid rgba(201,100,66,0.3)', borderRadius:4, background:'rgba(201,100,66,0.08)'}}>
                {TOOL.type}
              </span>
              <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#9aa6b2'}}>· {TOOL.category}</span>
              <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88'}}>· reviewed {TOOL.reviewed}</span>
            </div>
            <h1 style={{
              fontFamily:'Fraunces, serif', fontSize:52, fontWeight:500, letterSpacing:-1.6,
              color:'#f0eee9', margin:'0 0 14px', lineHeight:1,
            }}>{TOOL.name}</h1>
            <p style={{fontSize:16, color:'#c2cbd4', lineHeight:1.55, margin:0, maxWidth:780}}>
              {TOOL.tagline}
            </p>
            <div style={{display:'flex', gap:8, marginTop:20, flexWrap:'wrap'}}>
              <a href={TOOL.links.website} style={ctaPrimary}>
                Visit {TOOL.url} <span style={{fontFamily:'"JetBrains Mono", monospace', opacity:0.6}}>↗</span>
              </a>
              <button style={ctaGhost}>Copy YAML</button>
              <button style={ctaGhost}>Suggest edit ↗</button>
            </div>
          </div>
        </div>
      </header>

      {/* Two-column body */}
      <div style={{
        maxWidth:1240, margin:'0 auto', padding:'40px 32px 60px',
        display:'grid', gridTemplateColumns:'minmax(0, 1fr) 320px', gap:48,
      }}>
        {/* LEFT */}
        <main>
          {/* Numbered sections */}
          {TOOL.sections.map(s => (
            <section key={s.n} style={{marginBottom:56}}>
              <div style={{marginBottom:18}}>
                <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#c96442', letterSpacing:1, marginBottom:6}}>{s.n}</div>
                <h2 style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, letterSpacing:-0.8, color:'#f0eee9', margin:0, lineHeight:1.1}}>
                  {s.k}
                </h2>
              </div>
              {s.p.map((p,i)=>(
                <p key={i} style={{fontSize:15, lineHeight:1.7, color:'#c2cbd4', margin:'0 0 14px', maxWidth:700}}>{p}</p>
              ))}
            </section>
          ))}

          {/* OWASP coverage map */}
          <section style={{marginBottom:56}}>
            <div style={{marginBottom:18}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#c96442', letterSpacing:1, marginBottom:6}}>04</div>
              <h2 style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, letterSpacing:-0.8, color:'#f0eee9', margin:0, lineHeight:1.1}}>OWASP coverage</h2>
            </div>
            <p style={{fontSize:14, color:'#9aa6b2', maxWidth:640, margin:'0 0 24px'}}>
              Risks addressed — mapped to both OWASP Top 10 standards. {TOOL.risks.LLM.length} in LLM, {TOOL.risks.ASI.length} in Agentic.
            </p>

            <div style={{marginBottom:24}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10}}>
                LLM Top 10 · 2025 · {TOOL.risks.LLM.length}/10 covered
              </div>
              <CoverageStrip covered={TOOL.risks.LLM.map(r=>r[0])} set={LLM_TOP10}/>
              <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
                {TOOL.risks.LLM.map(([id,name])=>(
                  <a key={id} href={`/directory?risk=${id}`} style={riskChip('kelp')}>
                    <span style={{opacity:0.7}}>{id}</span> · {name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10}}>
                Agentic Top 10 · 2026 · {TOOL.risks.ASI.length}/10 covered
              </div>
              <CoverageStrip covered={TOOL.risks.ASI.map(r=>r[0])} set={ASI_TOP10}/>
              <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
                {TOOL.risks.ASI.map(([id,name])=>(
                  <a key={id} href={`/directory?risk=${id}`} style={riskChip('coral')}>
                    <span style={{opacity:0.7}}>{id}</span> · {name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* YAML record */}
          <section style={{marginBottom:56}}>
            <div style={{marginBottom:18}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#c96442', letterSpacing:1, marginBottom:6}}>05</div>
              <h2 style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, letterSpacing:-0.8, color:'#f0eee9', margin:0, lineHeight:1.1}}>The raw record</h2>
            </div>
            <p style={{fontSize:14, color:'#9aa6b2', maxWidth:640, margin:'0 0 18px'}}>
              What Yuntona stores. Single source of truth — fork it on GitHub.
            </p>
            <YamlBlock/>
          </section>

          {/* Activity */}
          <section>
            <div style={{marginBottom:18}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#c96442', letterSpacing:1, marginBottom:6}}>06</div>
              <h2 style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, letterSpacing:-0.8, color:'#f0eee9', margin:0, lineHeight:1.1}}>Activity</h2>
            </div>
            <div style={{borderLeft:'1px solid rgba(255,255,255,0.08)', paddingLeft:24, marginLeft:4}}>
              {TOOL.activity.map((a,i)=>(
                <div key={i} style={{position:'relative', paddingBottom:22}}>
                  <span style={{position:'absolute', left:-29, top:6, width:9, height:9, borderRadius:5, background:a.type==='release'?'#7fb8aa':a.type==='announcement'?'#c96442':'#6b7a88', border:'2px solid #0a0e14'}}/>
                  <div style={{display:'flex', alignItems:'baseline', gap:10, marginBottom:4}}>
                    <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88'}}>{a.date}</span>
                    <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#c96442', letterSpacing:1, textTransform:'uppercase'}}>{a.type}</span>
                  </div>
                  <div style={{fontSize:14, color:'#f0eee9', marginBottom:2}}>{a.title}</div>
                  <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88'}}>via {a.source}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT sidebar */}
        <aside style={{position:'sticky', top:90, alignSelf:'start'}}>
          <div style={{
            background:'rgba(255,255,255,0.02)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:12, padding:22, marginBottom:14,
          }}>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#c96442', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14}}>
              At a glance
            </div>
            {[
              ['Complexity', TOOL.glance.complexity],
              ['Pricing', TOOL.glance.pricing],
              ['Audience', TOOL.glance.audience],
              ['Lifecycle', TOOL.glance.lifecycle.join(' · ')],
              ['Funding', TOOL.funder],
            ].map(([k,v])=>(
              <div key={k} style={{
                display:'grid', gridTemplateColumns:'1fr 1.3fr',
                padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)',
                fontSize:12,
              }}>
                <span style={{color:'#6b7a88', fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:1, textTransform:'uppercase'}}>{k}</span>
                <span style={{color:'#f0eee9'}}>{v}</span>
              </div>
            ))}
            <div style={{marginTop:16}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1, textTransform:'uppercase', marginBottom:8}}>Tags</div>
              <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                {TOOL.glance.tags.map(t=>(
                  <span key={t} style={{
                    fontSize:11, color:'#c2cbd4', background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.08)',
                    padding:'3px 8px', borderRadius:3,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background:'linear-gradient(180deg, rgba(201,100,66,0.08), rgba(201,100,66,0.02))',
            border:'1px solid rgba(201,100,66,0.2)',
            borderRadius:12, padding:18,
          }}>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#c96442', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10}}>Certifications</div>
            {TOOL.certs.map(c=>(
              <div key={c} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#f0eee9', marginBottom:4}}>
                <span style={{color:'#7fb8aa'}}>✓</span> {c}
              </div>
            ))}
          </div>

          <div style={{marginTop:22, fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', lineHeight:1.7, padding:'0 4px'}}>
            <div>added: {TOOL.added}</div>
            <div>updated: {TOOL.updated}</div>
            <div>slug: {TOOL.slug}</div>
            <div>yuntona: v1.7.0</div>
          </div>
        </aside>
      </div>

      {/* Related tools */}
      <section style={{padding:'60px 32px 96px', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:1240, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'baseline', gap:16, marginBottom:28}}>
            <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#c96442', letterSpacing:2, textTransform:'uppercase'}}>Related</span>
            <h2 style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, letterSpacing:-0.8, color:'#f0eee9', margin:0}}>Tools that overlap coverage.</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
            {TOOL.related.map(r=>(
              <a key={r.id} href={`/tools/${r.id}.html`} style={{
                display:'block', padding:20,
                background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:10, textDecoration:'none',
                transition:'border-color .12s',
              }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(201,100,66,0.35)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}>
                <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
                  <div style={{width:36, height:36, borderRadius:7, background:r.bg, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces, serif', fontSize:13, fontWeight:600, color:'#f0eee9'}}>{r.glyph}</div>
                  <div>
                    <div style={{fontSize:15, fontWeight:600, color:'#f0eee9'}}>{r.name}</div>
                    <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88'}}>{r.cat}</div>
                  </div>
                </div>
                <div style={{fontSize:13, color:'#9aa6b2', lineHeight:1.55}}>{r.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

// Mini heatmap strip — 10 cells per row, filled if covered
function CoverageStrip({covered, set}) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(10, minmax(0, 1fr))', gap:4, maxWidth:480}}>
      {set.map(([id])=>{
        const on = covered.includes(id);
        return (
          <div key={id} title={id} style={{
            height:28, borderRadius:3, minWidth:0,
            background: on ? 'linear-gradient(135deg, #1f6b5e, #7fb8aa)' : 'rgba(255,255,255,0.04)',
            border: on ? '1px solid rgba(127,184,170,0.4)' : '1px solid rgba(255,255,255,0.05)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'"JetBrains Mono", monospace', fontSize:9,
            color: on ? '#0a0e14' : '#6b7a88', fontWeight:600, letterSpacing:0.2,
          }}>{id.slice(3)}</div>
        );
      })}
    </div>
  );
}

function YamlBlock() {
  return (
    <pre style={{
      margin:0, padding:'18px 20px',
      background:'#10161f', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:10, overflow:'auto',
      fontFamily:'"JetBrains Mono", monospace', fontSize:12, lineHeight:1.65,
      color:'#c2cbd4',
    }}>
{`name: MintMCP
slug: mintmcp
type: Agentic
category: MCP Security
url: https://mintmcp.com

reviewed:   2026-04-17
added:      2025-11-03
updated:    2026-04-17

risks:
  llm:  [LLM06]
  asi:  [ASI01, ASI02, ASI04, ASI06, ASI08]

audience:      [ciso, platform-eng]
lifecycle:     [deploy, monitor]
complexity:    enterprise
pricing:       commercial
certifications: [SOC 2 Type II]

tags: [MCP Security, Governance, Agent Security, SaaS, Commercial]`}
    </pre>
  );
}

const riskChip = (variant) => ({
  display:'inline-flex', gap:6, alignItems:'center',
  fontSize:11, fontFamily:'"JetBrains Mono", monospace',
  padding:'5px 10px', borderRadius:4, textDecoration:'none',
  whiteSpace:'nowrap',
  ...(variant === 'kelp' ? {
    color:'#7fb8aa', background:'rgba(31,107,94,0.12)', border:'1px solid rgba(31,107,94,0.25)',
  } : {
    color:'#c96442', background:'rgba(201,100,66,0.1)', border:'1px solid rgba(201,100,66,0.25)',
  }),
});

const ctaPrimary = {
  background:'#f0eee9', color:'#0a0e14',
  padding:'10px 18px', borderRadius:7,
  fontSize:13, fontWeight:600, textDecoration:'none',
  display:'inline-flex', alignItems:'center', gap:8,
  fontFamily:'"Inter", sans-serif',
};
const ctaGhost = {
  background:'transparent', color:'#c2cbd4',
  padding:'10px 18px', borderRadius:7,
  fontSize:13, fontWeight:500,
  border:'1px solid rgba(255,255,255,0.12)',
  fontFamily:'"Inter", sans-serif', cursor:'pointer',
};

Object.assign(window, { ToolPage });
