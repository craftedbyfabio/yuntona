// Methodology page — long-form spec style with TOC rail.

const SECTIONS = [
  { id:'philosophy',  n:'01', k:'Philosophy' },
  { id:'principles',  n:'02', k:'Curation principles' },
  { id:'sources',     n:'03', k:'Intelligence sources' },
  { id:'mapping',     n:'04', k:'OWASP risk mapping' },
  { id:'inclusion',   n:'05', k:'What gets listed' },
  { id:'transparency',n:'06', k:'Transparency' },
];

const PRINCIPLES = [
  { t:'Multi-source intelligence', d:'Discovery draws from practitioner discourse on LinkedIn and specialist forums, conference proceedings, standards body publications, OWASP working groups, industry intelligence newsletters, and direct engagement with AI-security thought leaders.' },
  { t:'Expert signal filtering',   d:'Not everything discovered gets listed. Each candidate is assessed against the current threat landscape, mapped to OWASP categories, and evaluated for genuine operational utility. Duplicates without meaningful differentiation are excluded.' },
  { t:'Community-embedded discovery', d:'The best tools surface in comment threads, conference hallway conversations, and working-group Slacks — not product launch pages. Following the people who build and break AI systems is how tools reach us before mainstream awareness.' },
  { t:'Continuous, not periodic',  d:'The directory updates on a rolling basis. This is not a quarterly report. It is a living artefact maintained through daily engagement with the AI-security ecosystem.' },
];

const SOURCES = [
  { t:'Standards bodies',      e:['OWASP','NIST','CSA','MITRE','ISO/IEC'],                        d:'Publications + working group output' },
  { t:'Industry intelligence', e:['CB Insights','analyst reports','market research'],             d:'Vendor-neutral coverage of emerging tech' },
  { t:'Conferences & events',  e:['NHIcon','CSA summits','AI security workshops'],                d:'Vendor-neutral industry events' },
  { t:'Practitioner networks', e:['OWASP AIUC','LinkedIn groups','specialist forums'],            d:'Thought-leader commentary' },
  { t:'Primary research',      e:['academic papers','arXiv','vendor docs','GitHub'],              d:'First-hand documentation' },
];

function MethodologyPage() {
  const [active, setActive] = React.useState('philosophy');
  React.useEffect(() => {
    const h = () => {
      const y = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= y) { setActive(SECTIONS[i].id); return; }
      }
    };
    window.addEventListener('scroll', h); h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div>
      <TopNav/>

      {/* Breadcrumb + header */}
      <div style={{maxWidth:1240, margin:'0 auto', padding:'20px 32px 0'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88'}}>
          <a href="/" style={{color:'#9aa6b2', textDecoration:'none'}}>~</a>
          <span>/</span>
          <span style={{color:'#c96442'}}>methodology</span>
        </div>
      </div>

      <header style={{maxWidth:1240, margin:'0 auto', padding:'28px 32px 36px', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#c96442', letterSpacing:2, textTransform:'uppercase', marginBottom:14}}>
          Methodology · v1.7.0
        </div>
        <h1 style={{fontFamily:'Fraunces, serif', fontSize:64, fontWeight:500, letterSpacing:-1.8, color:'#f0eee9', margin:'0 0 20px', lineHeight:1.02}}>
          How we <em style={{fontStyle:'italic', fontFamily:'"Instrument Serif", serif', fontWeight:400, color:'#7fb8aa'}}>curate</em>.
        </h1>
        <p style={{fontSize:18, lineHeight:1.6, color:'#c2cbd4', maxWidth:720, margin:0}}>
          Yuntona is built on practitioner-led continuous intelligence gathering with expert curation — not automated scraping or vendor self-submission.
        </p>
        <div style={{display:'flex', gap:24, marginTop:28, fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#6b7a88', letterSpacing:0.3, flexWrap:'wrap'}}>
          <span>last reviewed · 2026-03-18</span>
          <span>·</span>
          <span>single maintainer · accountable</span>
          <span>·</span>
          <span>MIT · open source</span>
        </div>
      </header>

      {/* Two-column layout */}
      <div style={{maxWidth:1240, margin:'0 auto', padding:'48px 32px 72px', display:'grid', gridTemplateColumns:'220px minmax(0, 1fr)', gap:56}}>
        {/* TOC rail */}
        <aside style={{position:'sticky', top:90, alignSelf:'start'}}>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14}}>
            On this page
          </div>
          <nav>
            {SECTIONS.map(s => {
              const isA = active === s.id;
              return (
                <a key={s.id} href={`#${s.id}`} style={{
                  display:'grid', gridTemplateColumns:'28px 1fr', gap:8, alignItems:'center',
                  padding:'7px 8px', borderRadius:5, textDecoration:'none',
                  background: isA ? 'rgba(201,100,66,0.1)' : 'transparent',
                  borderLeft: isA ? '2px solid #c96442' : '2px solid transparent',
                  marginBottom:2,
                }}>
                  <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color: isA ? '#c96442' : '#6b7a88'}}>{s.n}</span>
                  <span style={{fontSize:12.5, color: isA ? '#f0eee9' : '#9aa6b2'}}>{s.k}</span>
                </a>
              );
            })}
          </nav>
          <div style={{marginTop:28, paddingTop:18, borderTop:'1px solid rgba(255,255,255,0.06)', fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', lineHeight:1.8}}>
            <div>161 tools indexed</div>
            <div>20 OWASP risks</div>
            <div>11 categories</div>
            <div>v1.7.0 · 2026-03-18</div>
          </div>
        </aside>

        <main style={{maxWidth:760}}>
          {/* 01 Philosophy */}
          <Section id="philosophy" n="01" k="Philosophy">
            <p style={P}>The AI security tooling landscape moves faster than any automated system can meaningfully evaluate. New tools, frameworks, and attack surfaces emerge weekly. Keeping pace requires continuous immersion in the practitioner community — not periodic desk research.</p>
            <p style={P}>Every entry has been individually evaluated by a security professional with <strong style={{color:'#f0eee9'}}>over a decade</strong> of experience spanning SOC/NOC operations, third-party risk, financial services regulation, and hands-on AI-security research. The directory reflects professional judgement informed by real-world operational context — not algorithmic scoring.</p>
            <PullQuote>Curation quality depends on accountability, not volume.</PullQuote>
          </Section>

          {/* 02 Principles */}
          <Section id="principles" n="02" k="Curation principles">
            <p style={P}>Four commitments that shape every decision, from discovery to inclusion to retirement.</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:28}}>
              {PRINCIPLES.map((p, i) => (
                <div key={p.t} style={{
                  padding:20, borderRadius:10,
                  background:'rgba(255,255,255,0.02)',
                  border:'1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#c96442', letterSpacing:1.5, marginBottom:10}}>P.{String(i+1).padStart(2,'0')}</div>
                  <div style={{fontFamily:'Fraunces, serif', fontSize:20, fontWeight:500, letterSpacing:-0.4, color:'#f0eee9', marginBottom:8}}>{p.t}</div>
                  <div style={{fontSize:13, color:'#9aa6b2', lineHeight:1.6}}>{p.d}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 03 Sources */}
          <Section id="sources" n="03" k="Intelligence sources">
            <p style={P}>Where the signal comes from. Five channels feeding one pipeline.</p>
            <div style={{marginTop:28, border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, overflow:'hidden', background:'rgba(255,255,255,0.015)'}}>
              {SOURCES.map((s, i) => (
                <div key={s.t} style={{
                  display:'grid', gridTemplateColumns:'140px minmax(0, 1fr) minmax(0, 1fr)', gap:20, alignItems:'center',
                  padding:'16px 20px',
                  borderBottom: i === SOURCES.length-1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{fontFamily:'Fraunces, serif', fontSize:16, fontWeight:500, color:'#f0eee9', letterSpacing:-0.3}}>{s.t}</span>
                  <div style={{display:'flex', gap:4, flexWrap:'wrap'}}>
                    {s.e.map(x=>(
                      <span key={x} style={{fontSize:11, color:'#7fb8aa', background:'rgba(31,107,94,0.1)', border:'1px solid rgba(31,107,94,0.2)', padding:'3px 8px', borderRadius:3, fontFamily:'"JetBrains Mono", monospace'}}>{x}</span>
                    ))}
                  </div>
                  <span style={{fontSize:13, color:'#9aa6b2'}}>{s.d}</span>
                </div>
              ))}
            </div>

            {/* Pipeline diagram */}
            <div style={{marginTop:28, padding:22, background:'#10161f', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10}}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16}}>Pipeline</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:8, fontFamily:'"JetBrains Mono", monospace', fontSize:11}}>
                {[
                  ['sources','5 channels'],
                  ['discovery','raw signal'],
                  ['evaluation','3 criteria'],
                  ['mapping','OWASP fit'],
                  ['published','directory'],
                ].map(([k,v], i)=>(
                  <React.Fragment key={k}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative'}}>
                      <div style={{background:'rgba(201,100,66,0.08)', border:'1px solid rgba(201,100,66,0.25)', padding:'10px 8px', borderRadius:6, color:'#f0eee9', width:'100%', marginBottom:6}}>
                        <div style={{color:'#c96442', fontSize:10, letterSpacing:1, textTransform:'uppercase'}}>{k}</div>
                        <div style={{color:'#c2cbd4', fontSize:10, marginTop:4}}>{v}</div>
                      </div>
                      {i < 4 && <div style={{position:'absolute', right:-6, top:24, color:'#6b7a88'}}>›</div>}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Section>

          {/* 04 OWASP mapping */}
          <Section id="mapping" n="04" k="OWASP risk mapping">
            <p style={P}>Every tool is mapped against the <strong style={{color:'#f0eee9'}}>OWASP LLM Top 10 (2025)</strong> and the <strong style={{color:'#f0eee9'}}>OWASP Agentic Top 10 (2026)</strong>. Mappings are derived from each tool's documented capabilities, target threat model, and operational scope — assessed against the published risk descriptions.</p>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:24}}>
              {[
                { label:'LLM Top 10 · 2025', cov:'10 / 10', note:'Full coverage' },
                { label:'Agentic Top 10 · 2026', cov:'10 / 10', note:'Full coverage' },
              ].map(x=>(
                <div key={x.label} style={{padding:18, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10}}>
                  <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1, textTransform:'uppercase', marginBottom:6}}>{x.label}</div>
                  <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                    <span style={{fontFamily:'Fraunces, serif', fontSize:40, fontWeight:500, color:'#f0eee9', letterSpacing:-1}}>{x.cov}</span>
                    <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#7fb8aa'}}>{x.note}</span>
                  </div>
                  <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(10, minmax(0, 1fr))', gap:3}}>
                    {Array.from({length:10}).map((_,i)=>(
                      <div key={i} style={{height:6, borderRadius:2, background:'linear-gradient(90deg, #1f6b5e, #7fb8aa)'}}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Callout label="AI-assisted, human-designed">
              OWASP risk mappings across 161 tools and 20 categories were produced using AI as an analytical engine. The methodology, evaluation schema, and framework inputs were designed by the curator. Every output was reviewed and validated against the published OWASP standards. This is <em style={{color:'#f0eee9', fontStyle:'italic'}}>human-directed analysis at scale</em> — not automated classification.
            </Callout>
          </Section>

          {/* 05 Inclusion */}
          <Section id="inclusion" n="05" k="What gets listed">
            <p style={P}>A tool is added when it meets three criteria. All three. No two-out-of-three.</p>

            <div style={{marginTop:28, border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, overflow:'hidden'}}>
              {[
                ['C.1', 'Addresses a genuine security risk', 'in the generative or agentic AI stack, mapped to at least one OWASP category'],
                ['C.2', 'Operational or near-operational',   'not vaporware, not a concept paper, not a GitHub readme without code'],
                ['C.3', 'Offers meaningful capability',       'not already covered by existing entries; differentiated in scope, approach, or depth'],
              ].map(([n,t,d], i)=>(
                <div key={n} style={{padding:'18px 22px', display:'grid', gridTemplateColumns:'52px minmax(0, 1fr)', gap:18, borderBottom: i<2 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems:'flex-start'}}>
                  <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#c96442', letterSpacing:1}}>{n}</span>
                  <div>
                    <div style={{fontSize:15, color:'#f0eee9', fontWeight:500, marginBottom:4}}>{t}</div>
                    <div style={{fontSize:13, color:'#9aa6b2', lineHeight:1.55}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{...P, marginTop:22}}>
              Open-source tools, commercial platforms, and frameworks are all eligible. <strong style={{color:'#f0eee9'}}>Vendor sponsorship does not influence inclusion or risk ratings.</strong>
            </p>
          </Section>

          {/* 06 Transparency */}
          <Section id="transparency" n="06" k="Transparency">
            <p style={P}>Yuntona is maintained by a single practitioner. The directory reflects one expert's informed judgement — not committee consensus, not crowd-sourced voting. This is a deliberate choice.</p>

            <div style={{
              marginTop:24, padding:'22px 24px',
              background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:10,
            }}>
              <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12}}>Affiliation disclosure</div>
              <p style={{fontSize:14, color:'#c2cbd4', lineHeight:1.65, margin:'0 0 12px'}}>
                Yuntona™ is an independent, open-source project. It is <strong style={{color:'#f0eee9'}}>not affiliated with or endorsed by</strong> OWASP, NIST, MITRE, or any vendor listed in the directory.
              </p>
              <p style={{fontSize:14, color:'#c2cbd4', lineHeight:1.65, margin:0}}>
                OWASP risk categories are used under the Creative Commons licence.
              </p>
            </div>

            <div style={{marginTop:28, display:'flex', gap:10, flexWrap:'wrap'}}>
              <a href="/submit" style={ctaP}>Submit a tool for review →</a>
              <a href="https://github.com/craftedbyfabio/yuntona" style={ctaG}>View source ↗</a>
            </div>
          </Section>
        </main>
      </div>

      <Footer/>
    </div>
  );
}

const P = { fontSize:15.5, lineHeight:1.75, color:'#c2cbd4', margin:'0 0 18px' };

function Section({id, n, k, children}) {
  return (
    <section id={id} style={{marginBottom:64, scrollMarginTop:100}}>
      <div style={{marginBottom:22}}>
        <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#c96442', letterSpacing:1, marginBottom:6}}>{n}</div>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:36, fontWeight:500, letterSpacing:-1, color:'#f0eee9', margin:0, lineHeight:1.05}}>{k}</h2>
      </div>
      {children}
    </section>
  );
}

function PullQuote({children}) {
  return (
    <blockquote style={{
      margin:'28px 0', padding:'18px 24px',
      borderLeft:'3px solid #c96442',
      fontFamily:'"Instrument Serif", serif', fontStyle:'italic',
      fontSize:22, lineHeight:1.35, color:'#f0eee9',
      background:'rgba(201,100,66,0.04)',
    }}>{children}</blockquote>
  );
}

function Callout({label, children}) {
  return (
    <div style={{
      marginTop:28, padding:'22px 24px',
      background:'linear-gradient(180deg, rgba(127,184,170,0.08), rgba(127,184,170,0.02))',
      border:'1px solid rgba(127,184,170,0.3)',
      borderRadius:10,
    }}>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#7fb8aa', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10, display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:6, height:6, borderRadius:3, background:'#7fb8aa'}}/>
        {label}
      </div>
      <div style={{fontSize:14, color:'#c2cbd4', lineHeight:1.65}}>{children}</div>
    </div>
  );
}

const ctaP = {
  background:'#c96442', color:'#0a0e14',
  padding:'12px 20px', borderRadius:7,
  fontSize:13, fontWeight:600, textDecoration:'none',
  fontFamily:'"Inter", sans-serif',
};
const ctaG = {
  background:'transparent', color:'#c2cbd4',
  padding:'12px 20px', borderRadius:7,
  fontSize:13, fontWeight:500, textDecoration:'none',
  border:'1px solid rgba(255,255,255,0.15)',
  fontFamily:'"Inter", sans-serif',
};

Object.assign(window, { MethodologyPage });
