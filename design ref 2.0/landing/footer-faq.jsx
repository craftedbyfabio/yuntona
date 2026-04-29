// Curator, FAQ, final CTA, footer.

function Curator() {
  return (
    <section style={{padding:'96px 32px', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
      <div style={{maxWidth:1240, margin:'0 auto'}}>
        <SectionLabel label="Curator"/>
        <SectionTitle>Single-maintainer accountability.</SectionTitle>
        <p style={leadCopy}>Every assessment reflects one expert's informed judgement — not crowd-sourced voting, not vendor self-submission.</p>

        <div style={{
          marginTop:48, padding:'36px 40px',
          background:'rgba(255,255,255,0.02)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:14,
          display:'grid', gridTemplateColumns:'180px 1fr auto', gap:40, alignItems:'center',
        }}>
          <div style={{
            width:180, height:180, borderRadius:10,
            background:'linear-gradient(135deg, #1f6b5e 0%, #0d1f2d 100%)',
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
            }}/>
            <span style={{
              fontFamily:'Fraunces, serif', fontSize:72, fontWeight:500,
              color:'#f0eee9', letterSpacing:-2,
            }}>FB</span>
          </div>

          <div>
            <div style={{fontSize:13, color:'#c96442', fontFamily:'"JetBrains Mono", monospace', letterSpacing:1, textTransform:'uppercase', marginBottom:8}}>
              Maintainer
            </div>
            <div style={{fontFamily:'Fraunces, serif', fontSize:32, fontWeight:500, color:'#f0eee9', letterSpacing:-0.5}}>
              Fabio Baumeler
            </div>
            <div style={{color:'#9aa6b2', fontSize:15, marginTop:6, marginBottom:20}}>
              Third-Party Cyber Risk Lead · UK Financial Conduct Authority
            </div>

            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:18}}>
              {['CISSP','MSc Info Security · Royal Holloway','GCHQ-certified','10+ yrs SOC · infosec · regulation'].map(t=>(
                <span key={t} style={{
                  fontSize:11, fontFamily:'"JetBrains Mono", monospace',
                  color:'#7fb8aa', background:'rgba(31,107,94,0.1)',
                  border:'1px solid rgba(31,107,94,0.25)',
                  padding:'5px 10px', borderRadius:4,
                }}>{t}</span>
              ))}
            </div>

            <p style={{color:'#c2cbd4', fontSize:14, lineHeight:1.6, margin:0, maxWidth:560}}>
              Built Yuntona to close the gap between AI security frameworks and the tools that operationalise them. Every decision — inclusion, exclusion, risk mapping — traceable to one accountable reviewer.
            </p>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8, alignSelf:'flex-start'}}>
            {[['LinkedIn','https://www.linkedin.com/in/fbaumeler'],['GitHub','https://github.com/craftedbyfabio'],['Methodology','/methodology']].map(([l,h])=>(
              <a key={l} href={h} style={{
                fontSize:12, fontFamily:'"JetBrains Mono", monospace',
                color:'#c2cbd4', textDecoration:'none',
                padding:'8px 14px', borderRadius:6,
                border:'1px solid rgba(255,255,255,0.1)',
                textAlign:'center', minWidth:120,
              }}>{l} ↗</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{padding:'96px 32px'}}>
      <div style={{maxWidth:1040, margin:'0 auto'}}>
        <SectionLabel label="FAQ"/>
        <SectionTitle>Questions practitioners ask.</SectionTitle>
        <p style={leadCopy}>Before you commit to trusting a curated list, you want to know who put it together and how.</p>

        <div style={{marginTop:44, borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <button onClick={()=>setOpen(isOpen ? -1 : i)} style={{
                  width:'100%', display:'grid', gridTemplateColumns:'48px 1fr 24px', gap:20, alignItems:'center',
                  padding:'22px 4px', textAlign:'left',
                  background:'transparent', border:'none', cursor:'pointer', color:'#f0eee9',
                }}>
                  <span style={{
                    fontFamily:'"JetBrains Mono", monospace', fontSize:11,
                    color:'#6b7a88', letterSpacing:0.5,
                  }}>{String(i+1).padStart(2,'0')}</span>
                  <span style={{fontSize:19, fontFamily:'Fraunces, serif', fontWeight:500, letterSpacing:-0.3}}>{f.q}</span>
                  <span style={{
                    color:'#c96442', fontSize:20, fontFamily:'"JetBrains Mono", monospace',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition:'transform .18s',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 400 : 0, overflow:'hidden',
                  transition:'max-height .3s ease',
                }}>
                  <div style={{padding:'0 4px 28px 72px', color:'#9aa6b2', fontSize:15, lineHeight:1.65, maxWidth:760}}>
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{padding:'120px 32px', position:'relative', overflow:'hidden'}}>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(201,100,66,0.08), transparent 70%)',
      }}/>
      <div style={{maxWidth:900, margin:'0 auto', textAlign:'center', position:'relative'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:32, opacity:0.85}}>
          <YuntonaMark size={64} color="#7fb8aa"/>
        </div>
        <h2 style={{
          fontFamily:'Fraunces, serif', fontSize:56, fontWeight:500, letterSpacing:-1.6,
          lineHeight:1.05, color:'#f0eee9', margin:'0 0 24px',
        }}>
          Close the blind spots<br/>
          in your <em style={italicAccent}>AI risk coverage</em>.
        </h2>
        <p style={{fontSize:18, color:'#9aa6b2', lineHeight:1.55, maxWidth:560, margin:'0 auto 40px'}}>
          161 dedicated AI security tools, frameworks and standards. 20 OWASP risks. One search.
        </p>
        <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
          <a href="/directory" style={{
            background:'#c96442', color:'#0a0e14',
            padding:'15px 26px', borderRadius:8,
            fontSize:14, fontWeight:600, textDecoration:'none',
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:'"Inter", sans-serif',
          }}>
            Explore directory
            <span style={{fontFamily:'"JetBrains Mono", monospace'}}>→</span>
          </a>
          <a href="https://github.com/craftedbyfabio/yuntona" style={{
            background:'transparent', color:'#c2cbd4',
            padding:'15px 26px', borderRadius:8,
            fontSize:14, fontWeight:500, textDecoration:'none',
            border:'1px solid rgba(255,255,255,0.15)',
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:'"Inter", sans-serif',
          }}>
            ★ Star on GitHub
          </a>
        </div>

        <div style={{
          marginTop:56, display:'flex', gap:24, justifyContent:'center',
          fontFamily:'"JetBrains Mono", monospace', fontSize:11,
          color:'#6b7a88', letterSpacing:0.5, flexWrap:'wrap',
        }}>
          <span>OWASP LLM Top 10 · 2025</span>
          <span>·</span>
          <span>OWASP Agentic Top 10 · 2026</span>
          <span>·</span>
          <span>Open Source · MIT</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding:'48px 32px 36px', borderTop:'1px solid rgba(255,255,255,0.06)',
      background:'rgba(0,0,0,0.2)',
    }}>
      <div style={{maxWidth:1240, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
            <YuntonaMark size={24} color="#f0eee9"/>
            <span style={{fontFamily:'Fraunces, serif', fontSize:18, color:'#f0eee9', fontWeight:600, letterSpacing:-0.3}}>Yuntona™</span>
          </div>
          <p style={{color:'#6b7a88', fontSize:13, lineHeight:1.6, margin:0, maxWidth:320}}>
            Practitioner-curated directory of AI security controls, mapped to the OWASP LLM &amp; Agentic Top 10.
          </p>
          <div style={{marginTop:18, fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'#6b7a88', letterSpacing:0.3}}>
            Open Source ♥ Made in the UK 🇬🇧
          </div>
        </div>
        {[
          {t:'Platform', links:[['Directory','/directory'],['Knowledge Graph','/graph']]},
          {t:'Resources', links:[['Methodology','/methodology'],['GitHub','https://github.com/craftedbyfabio/yuntona']]},
          {t:'Contribute', links:[['Suggest a tool','#'],['Report an issue','#'],['Star on GitHub','#']]},
        ].map(col=>(
          <div key={col.t}>
            <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#6b7a88', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14}}>{col.t}</div>
            {col.links.map(([l,h])=>(
              <a key={l} href={h} style={{display:'block', color:'#c2cbd4', fontSize:13, textDecoration:'none', padding:'4px 0'}}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        maxWidth:1240, margin:'36px auto 0', paddingTop:24,
        borderTop:'1px solid rgba(255,255,255,0.05)',
        display:'flex', justifyContent:'space-between',
        fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'#6b7a88', letterSpacing:0.3,
      }}>
        <span>© 2026 Yuntona Ltd · All rights reserved</span>
        <span>v1.7.0 · 161 tools · last updated 2026-04-22</span>
      </div>
    </footer>
  );
}
