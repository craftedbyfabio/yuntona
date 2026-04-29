// Side panel — slides in when an intersection is clicked.

const { STAGES: SP_STAGES, LLM_RISKS: SP_RISKS, CATEGORIES: SP_CATS, SAMPLE_TOOLS } = window.GraphData;

function SidePanel({ selection, onClose }) {
  if (!selection) return null;
  const stage = selection.stage && SP_STAGES.find(s=>s.id===selection.stage);
  const risk  = selection.risk  && SP_RISKS.find(r=>r.id===selection.risk);

  // Pull sample tools for the intersection if we have any; otherwise generate placeholders.
  const key = `${selection.stage}-${selection.risk}`;
  const tools = SAMPLE_TOOLS[key] || [
    { name:'Lakera Guard',    cat:'guardrails', desc:'Runtime detection of prompt injection at the LLM gateway.' },
    { name:'Garak',           cat:'red-team',   desc:'Open-source LLM vulnerability scanner.' },
    { name:'Protect AI Recon',cat:'red-team',   desc:'Continuous adversarial probing of production prompts.' },
    { name:'CalypsoAI',       cat:'guardrails', desc:'Inline LLM firewall + content moderation.' },
    { name:'Credal',          cat:'governance', desc:'Policy-as-code for LLM access and data egress.' },
  ];

  return (
    <div style={{
      position:'absolute', top:0, right:0, bottom:0, width:420,
      background:'#0d1219', borderLeft:'1px solid rgba(240,238,233,0.1)',
      display:'flex', flexDirection:'column', zIndex:5,
      animation:'sp-in 0.22s ease-out',
    }}>
      <style>{`@keyframes sp-in { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>

      {/* Header */}
      <div style={{ padding:'22px 24px 18px', borderBottom:'1px solid rgba(240,238,233,0.08)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{ fontSize:11, letterSpacing:'2px', color:'rgba(240,238,233,0.5)' }}>INTERSECTION</div>
          <button onClick={onClose} style={{
            background:'transparent', border:'none', color:'rgba(240,238,233,0.5)',
            cursor:'pointer', fontSize:18, padding:0, lineHeight:1,
          }}>×</button>
        </div>
        <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          {stage && (
            <span style={{
              padding:'5px 12px', borderRadius:999, fontSize:13, fontWeight:500,
              background:'rgba(127,184,159,0.12)', color:'#7fb89f', border:'1px solid rgba(127,184,159,0.4)',
            }}>{stage.label}</span>
          )}
          {stage && risk && <span style={{ color:'rgba(240,238,233,0.4)' }}>×</span>}
          {risk && (
            <span style={{
              padding:'5px 12px', borderRadius:999, fontSize:13, fontWeight:500,
              background:'rgba(232,93,117,0.12)', color:'#e85d75', border:'1px solid rgba(232,93,117,0.4)',
              fontFamily:'JetBrains Mono',
            }}>{risk.id} · {risk.label}</span>
          )}
        </div>
        <div style={{
          marginTop:14, fontFamily:'Fraunces', fontSize:22, fontStyle:'italic', color:'#f0eee9',
          fontWeight:500, letterSpacing:'-0.01em',
        }}>
          {tools.length} tools at this intersection
        </div>
      </div>

      {/* Curator note */}
      <div style={{
        margin:'14px 24px', padding:'14px 16px', borderRadius:8,
        background:'rgba(201,100,66,0.08)', border:'1px solid rgba(201,100,66,0.25)',
      }}>
        <div style={{ fontSize:10.5, letterSpacing:'1.8px', color:'#c96442', marginBottom:6 }}>CURATOR NOTE</div>
        <div style={{ fontFamily:'Fraunces', fontSize:14, fontStyle:'italic', color:'rgba(240,238,233,0.85)', lineHeight:1.5 }}>
          Runtime guardrails dominate this intersection. If you already run a WAF, focus selection on detection fidelity, not coverage breadth.
        </div>
      </div>

      {/* Tool list */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 24px 24px' }}>
        {tools.map((t,i) => {
          const cat = SP_CATS.find(c=>c.id===t.cat);
          return (
            <div key={i} style={{
              padding:'14px 0', borderBottom: i<tools.length-1 ? '1px solid rgba(240,238,233,0.06)' : 'none',
              display:'flex', flexDirection:'column', gap:6, cursor:'pointer',
            }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ fontFamily:'Inter', fontSize:14.5, fontWeight:600, color:'#f0eee9' }}>{t.name}</div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,233,0.4)" strokeWidth="2">
                  <path d="M7 17 17 7M9 7h8v8"/>
                </svg>
              </div>
              <div style={{ fontFamily:'Inter', fontSize:12.5, color:'rgba(240,238,233,0.6)', lineHeight:1.45 }}>{t.desc}</div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:99, background:cat.color }}/>
                <span style={{ fontSize:11, color:'rgba(240,238,233,0.5)', letterSpacing:'0.5px' }}>{cat.label.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action */}
      <div style={{
        padding:'14px 24px', borderTop:'1px solid rgba(240,238,233,0.08)',
        display:'flex', gap:10,
      }}>
        <button style={{
          flex:1, padding:'10px 14px', borderRadius:6,
          background:'#c96442', color:'#fff', border:'none',
          fontFamily:'Inter', fontSize:13, fontWeight:600, cursor:'pointer',
        }}>Open in catalog →</button>
        <button style={{
          padding:'10px 14px', borderRadius:6,
          background:'transparent', color:'rgba(240,238,233,0.7)',
          border:'1px solid rgba(240,238,233,0.15)',
          fontFamily:'Inter', fontSize:13, cursor:'pointer',
        }}>Compare</button>
      </div>
    </div>
  );
}

window.SidePanel = SidePanel;
