// Top nav + hero. Hero leans on a "command palette" motif — it's the
// interface a technical audience already lives in, and it instantly
// communicates "this is a searchable directory of 161 things".

function TopNav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(10, 14, 20, 0.92)',
      backdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <a href="#" style={{display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'#f0eee9'}}>
          <YuntonaMark size={26} color="#f0eee9"/>
          <span style={{fontFamily:'Fraunces, serif', fontSize:20, fontWeight:600, letterSpacing:-0.4}}>Yuntona</span>
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1, marginTop:2}}>v1.7.0</span>
        </a>

        <div style={{flex:1}}/>

        <div style={{display:'flex', alignItems:'center', gap:4, fontSize:13, color:'#9aa6b2', fontFamily:'"Inter", sans-serif'}}>
          {[
            ['Directory', '/directory'],
            ['Graph', '/graph'],
            ['Methodology', '/methodology'],
            ['GitHub ↗', 'https://github.com/craftedbyfabio/yuntona'],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{
              color:'#c2cbd4', textDecoration:'none',
              padding:'8px 14px', borderRadius:6,
              transition:'background .12s',
            }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              {label}
            </a>
          ))}
        </div>

        <button style={{
          fontFamily:'"JetBrains Mono", monospace', fontSize:12,
          background:'#c96442', color:'#0a0e14',
          border:'none', padding:'9px 16px', borderRadius:7,
          cursor:'pointer', fontWeight:600, letterSpacing:0.2,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span>Search</span>
          <kbd style={{
            background:'rgba(10,14,20,0.18)', padding:'2px 6px', borderRadius:4,
            fontSize:10, fontFamily:'inherit', color:'#0a0e14',
          }}>⌘K</kbd>
        </button>
      </div>
    </nav>
  );
}

// Hero — left column is positioning + proof; right column is a live-looking
// command palette with auto-cycling queries → results.
function Hero() {
  const queries = [
    { q: 'tools for prompt injection in production', filter: 'risk:LLM01 stage:production', hits: 24 },
    { q: 'evaluate agentic tool misuse',             filter: 'risk:ASI02 category:evaluation', hits: 11 },
    { q: 'supply chain scanners for model artefacts',filter: 'risk:LLM03 stage:ci', hits: 9 },
    { q: 'runtime guardrails with PII redaction',    filter: 'risk:LLM02 category:runtime', hits: 18 },
  ];
  const [qi, setQi] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const current = queries[qi];

  // Typewriter loop.
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > current.q.length) {
        clearInterval(id);
        setTimeout(() => { setQi(v => (v + 1) % queries.length); setTyped(''); }, 2800);
        return;
      }
      setTyped(current.q.slice(0, i));
    }, 38);
    return () => clearInterval(id);
  }, [qi]);

  return (
    <section style={{
      position:'relative',
      padding: '80px 32px 72px',
      overflow: 'hidden',
    }}>
      {/* faint grid backdrop */}
      <div style={{
        position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 900px 500px at 50% 30%, black 40%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 900px 500px at 50% 30%, black 40%, transparent 75%)',
      }}/>

      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 72,
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Left: copy */}
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:'"JetBrains Mono", monospace', fontSize:11,
            color:'#7fb8aa', background:'rgba(31,107,94,0.1)',
            border:'1px solid rgba(31,107,94,0.25)',
            padding:'6px 12px', borderRadius:999,
            letterSpacing:0.5,
          }}>
            <span style={{width:6, height:6, borderRadius:3, background:'#4ade80', boxShadow:'0 0 8px #4ade80'}}/>
            <span>161 TOOLS · OWASP LLM + AGENTIC TOP 10 · MIT</span>
          </div>

          <h1 style={{
            fontFamily:'Fraunces, serif',
            fontSize: 68, lineHeight: 1.02, fontWeight: 500,
            letterSpacing: -2,
            color: '#f0eee9',
            margin: '26px 0 22px',
          }}>
            Security controls<br/>
            for your <em style={{fontStyle:'italic', color:'#7fb8aa', fontFamily:'"Instrument Serif", serif', fontWeight:400}}>AI stack</em>,<br/>
            indexed by risk.
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.55, color:'#9aa6b2',
            maxWidth: 520, margin: '0 0 36px',
          }}>
            The OWASP LLM &amp; Agentic Top 10 describe <em>what</em> can go wrong. Yuntona is the practitioner-curated map from each risk to the specific tools that address it.
          </p>

          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <a href="/directory" style={{
              background:'#f0eee9', color:'#0a0e14',
              padding:'14px 22px', borderRadius:8,
              fontSize:14, fontWeight:600, textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:10,
              fontFamily:'"Inter", sans-serif',
            }}>
              Browse directory
              <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, opacity:0.6}}>→</span>
            </a>
            <a href="/graph" style={{
              background:'transparent', color:'#c2cbd4',
              padding:'14px 22px', borderRadius:8,
              fontSize:14, fontWeight:500, textDecoration:'none',
              border:'1px solid rgba(255,255,255,0.12)',
              fontFamily:'"Inter", sans-serif',
            }}>
              Explore knowledge graph
            </a>
          </div>

          {/* Tiny meta row */}
          <div style={{
            display:'flex', gap:28, marginTop:40,
            fontFamily:'"JetBrains Mono", monospace', fontSize:11,
            color:'#6b7a88', letterSpacing:0.3,
          }}>
            {[['161','tools'],['20','risks'],['11','categories'],['233','tags']].map(([n,l])=>(
              <div key={l}>
                <div style={{color:'#f0eee9', fontSize:22, fontFamily:'Fraunces, serif', fontWeight:500, letterSpacing:-0.5}}>{n}</div>
                <div style={{marginTop:2, textTransform:'uppercase'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: command palette mock */}
        <HeroPalette current={current} typed={typed}/>
      </div>
    </section>
  );
}

function HeroPalette({ current, typed }) {
  // Hand-rolled "results" list that reacts to current query.
  const allResults = {
    'LLM01': [
      { name:'PromptArmor',  desc:'Runtime prompt-injection firewall', tags:['LLM01','LLM07'], stage:'prod' },
      { name:'Lakera Guard', desc:'Policy-based LLM input/output scanner', tags:['LLM01','LLM05'], stage:'prod' },
      { name:'NeMo Guardrails', desc:'Programmable guardrails (Colang)', tags:['LLM01','LLM06'], stage:'prod' },
      { name:'Rebuff',       desc:'Self-hardening prompt injection detector', tags:['LLM01'], stage:'prod' },
    ],
    'ASI02': [
      { name:'Invariant Labs', desc:'Agent behaviour trace analysis', tags:['ASI02','ASI01'], stage:'pre-prod' },
      { name:'Patronus AI',    desc:'Agentic eval harnesses', tags:['ASI02','LLM09'], stage:'pre-prod' },
      { name:'Giskard',        desc:'Test-suite generation for tool-using agents', tags:['ASI02'], stage:'pre-prod' },
    ],
    'LLM03': [
      { name:'Protect AI',    desc:'ModelScan + scanning for unsafe serialization', tags:['LLM03','LLM04'], stage:'ci' },
      { name:'HiddenLayer',   desc:'Model supply-chain threat intel', tags:['LLM03'], stage:'ci' },
      { name:'Snyk for AI',   desc:'Dependency + artefact scanning', tags:['LLM03'], stage:'ci' },
    ],
    'LLM02': [
      { name:'CalypsoAI',   desc:'PII + secret redaction at gateway', tags:['LLM02','LLM01'], stage:'prod' },
      { name:'Nightfall AI',desc:'Inline DLP for LLM traffic', tags:['LLM02'], stage:'prod' },
      { name:'Private AI',  desc:'Pre-tokenisation PII removal', tags:['LLM02'], stage:'prod' },
    ],
  };
  const risk = current.filter.match(/risk:(\w+)/)?.[1] || 'LLM01';
  const results = allResults[risk] || allResults['LLM01'];

  return (
    <div style={{
      background: 'linear-gradient(180deg, #10161f 0%, #0c1118 100%)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 14,
      boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,100,66,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
      overflow:'hidden',
      fontFamily:'"JetBrains Mono", monospace',
    }}>
      {/* Window chrome */}
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'11px 14px',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{display:'flex', gap:6}}>
          <span style={{width:11, height:11, borderRadius:6, background:'#3b4252'}}/>
          <span style={{width:11, height:11, borderRadius:6, background:'#3b4252'}}/>
          <span style={{width:11, height:11, borderRadius:6, background:'#3b4252'}}/>
        </div>
        <div style={{flex:1, textAlign:'center', fontSize:11, color:'#6b7a88', letterSpacing:0.5}}>
          yuntona · search
        </div>
        <div style={{fontSize:10, color:'#6b7a88'}}>⌘K</div>
      </div>

      {/* Search bar */}
      <div style={{padding:'18px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{display:'flex', alignItems:'center', gap:12, fontSize:14}}>
          <span style={{color:'#7fb8aa'}}>›</span>
          <span style={{color:'#f0eee9'}}>{typed}</span>
          <span style={{
            display:'inline-block', width:8, height:16, background:'#c96442',
            animation: 'ytc-blink 1s steps(2) infinite',
          }}/>
        </div>
        <div style={{
          marginTop:12, display:'flex', gap:6, fontSize:11, flexWrap:'wrap',
        }}>
          {current.filter.split(' ').map(f => {
            const [k, v] = f.split(':');
            return (
              <span key={f} style={{
                display:'inline-flex', gap:4, alignItems:'center',
                background:'rgba(31,107,94,0.12)', color:'#7fb8aa',
                border:'1px solid rgba(31,107,94,0.25)',
                padding:'3px 8px', borderRadius:4,
              }}>
                <span style={{opacity:0.6}}>{k}</span>
                <span>{v}</span>
              </span>
            );
          })}
          <span style={{color:'#6b7a88', alignSelf:'center', marginLeft:'auto'}}>{current.hits} results</span>
        </div>
      </div>

      {/* Results */}
      <div style={{padding:'8px 8px 12px', maxHeight: 360, overflow:'hidden'}}>
        {results.map((r, i) => (
          <div key={r.name} style={{
            display:'grid', gridTemplateColumns:'24px 1fr auto', gap:12,
            padding:'12px 14px', borderRadius:7,
            background: i === 0 ? 'rgba(201,100,66,0.08)' : 'transparent',
            border: i === 0 ? '1px solid rgba(201,100,66,0.22)' : '1px solid transparent',
            alignItems:'center', marginBottom:2,
          }}>
            <span style={{color:'#6b7a88', fontSize:11, fontVariantNumeric:'tabular-nums'}}>{String(i+1).padStart(2,'0')}</span>
            <div>
              <div style={{display:'flex', gap:8, alignItems:'baseline'}}>
                <span style={{color:'#f0eee9', fontWeight:600, fontSize:13, fontFamily:'"Inter", sans-serif'}}>{r.name}</span>
                <span style={{fontSize:10, color:'#6b7a88'}}>{r.stage}</span>
              </div>
              <div style={{color:'#9aa6b2', fontSize:12, marginTop:3, fontFamily:'"Inter", sans-serif'}}>{r.desc}</div>
            </div>
            <div style={{display:'flex', gap:4}}>
              {r.tags.map(t => (
                <span key={t} style={{
                  fontSize:10, color:'#c2cbd4',
                  background:'rgba(255,255,255,0.05)',
                  padding:'3px 6px', borderRadius:3,
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer hints */}
      <div style={{
        padding:'10px 18px',
        borderTop:'1px solid rgba(255,255,255,0.05)',
        display:'flex', gap:18, fontSize:10, color:'#6b7a88',
      }}>
        <span><kbd style={kbdSt}>↑</kbd><kbd style={kbdSt}>↓</kbd> navigate</span>
        <span><kbd style={kbdSt}>↵</kbd> open</span>
        <span><kbd style={kbdSt}>/</kbd> filter</span>
        <span style={{marginLeft:'auto'}}>yuntona.ai</span>
      </div>
    </div>
  );
}
const kbdSt = {
  background:'rgba(255,255,255,0.06)', padding:'1px 5px', borderRadius:3,
  marginRight:4, color:'#c2cbd4', fontFamily:'inherit',
};