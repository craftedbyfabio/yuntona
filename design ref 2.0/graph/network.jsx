// Force-directed-ish network view. Hand-laid with deterministic randomness so
// the layout looks organic but stable across reloads.

const { STAGES: NV_STAGES, LLM_RISKS: NV_RISKS, CATEGORIES: NV_CATS } = window.GraphData;

// Deterministic pseudo-random
function rand(seed) {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

// Pre-compute layout once
const NV_W = 1180, NV_H = 720;
const NV_CX = NV_W/2, NV_CY = NV_H/2;

// 8 stages on outer ring; 10 risks on inner ring
const stagePos = NV_STAGES.map((s,i) => {
  const ang = (i / NV_STAGES.length) * Math.PI * 2 - Math.PI/2;
  return { ...s, x: NV_CX + Math.cos(ang) * 320, y: NV_CY + Math.sin(ang) * 240 };
});
const riskPos = NV_RISKS.map((r,i) => {
  const ang = (i / NV_RISKS.length) * Math.PI * 2 + Math.PI/10;
  return { ...r, x: NV_CX + Math.cos(ang) * 150, y: NV_CY + Math.sin(ang) * 110 };
});

// 90 tool nodes scattered, each tied to one stage and one risk
const r1 = rand(42);
const NV_TOOLS = Array.from({length: 90}, (_, i) => {
  const stage = NV_STAGES[Math.floor(r1()*NV_STAGES.length)];
  const risk = NV_RISKS[Math.floor(r1()*NV_RISKS.length)];
  const cat = NV_CATS[Math.floor(r1()*NV_CATS.length)];
  // Position near a midpoint between stage and risk anchors, plus jitter
  const sP = stagePos.find(s=>s.id===stage.id);
  const rP = riskPos.find(r=>r.id===risk.id);
  const t = 0.35 + r1()*0.5;
  const jx = (r1()-0.5)*120;
  const jy = (r1()-0.5)*120;
  return {
    id:`t${i}`,
    stage:stage.id, risk:risk.id, cat:cat.id,
    x: sP.x + (rP.x - sP.x)*t + jx,
    y: sP.y + (rP.y - sP.y)*t + jy,
    r: 3 + r1()*3,
  };
});

function NetworkView({ activeCats, onCellClick }) {
  const [hover, setHover] = useState(null);

  return (
    <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
      <svg viewBox={`0 0 ${NV_W} ${NV_H}`} style={{ width:'100%', height:'100%', display:'block' }}>
        <defs>
          <radialGradient id="nv-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(127,184,159,0.18)"/>
            <stop offset="100%" stopColor="rgba(127,184,159,0)"/>
          </radialGradient>
        </defs>

        {/* Background subtle radial */}
        <ellipse cx={NV_CX} cy={NV_CY} rx="380" ry="280" fill="url(#nv-glow)"/>

        {/* Tool→risk and tool→stage edges (light) */}
        <g stroke="rgba(240,238,233,0.06)" strokeWidth="0.6">
          {NV_TOOLS.map(t => {
            const sP = stagePos.find(s=>s.id===t.stage);
            const rP = riskPos.find(r=>r.id===t.risk);
            const dim = activeCats.length>0 && !activeCats.includes(t.cat);
            const op = dim ? 0.2 : 1;
            return (
              <g key={t.id} opacity={op}>
                <line x1={t.x} y1={t.y} x2={sP.x} y2={sP.y}/>
                <line x1={t.x} y1={t.y} x2={rP.x} y2={rP.y}/>
              </g>
            );
          })}
        </g>

        {/* Stage nodes (kelp green) */}
        <g>
          {stagePos.map(s => (
            <g key={s.id} onClick={()=>onCellClick && onCellClick({ stage:s.id })} style={{ cursor:'pointer' }}>
              <circle cx={s.x} cy={s.y} r="26" fill="rgba(127,184,159,0.08)" stroke="#7fb89f" strokeWidth="1.5"/>
              <text x={s.x} y={s.y+4} textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#7fb89f">
                {s.label}
              </text>
            </g>
          ))}
        </g>

        {/* Risk nodes (coral) */}
        <g>
          {riskPos.map(r => (
            <g key={r.id} onClick={()=>onCellClick && onCellClick({ risk:r.id })} style={{ cursor:'pointer' }}>
              <circle cx={r.x} cy={r.y} r="22" fill="rgba(232,93,117,0.1)" stroke="#e85d75" strokeWidth="1.5"/>
              <text x={r.x} y={r.y+4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#e85d75">
                {r.id}
              </text>
            </g>
          ))}
        </g>

        {/* Tool nodes coloured by category */}
        <g>
          {NV_TOOLS.map(t => {
            const cat = NV_CATS.find(c=>c.id===t.cat);
            const dim = activeCats.length>0 && !activeCats.includes(t.cat);
            return (
              <circle
                key={t.id} cx={t.x} cy={t.y} r={t.r}
                fill={cat.color} opacity={dim?0.2:0.85}
                onMouseEnter={()=>setHover(t)}
                onMouseLeave={()=>setHover(null)}
                style={{ cursor:'pointer' }}
              />
            );
          })}
        </g>

        {/* Hover halo */}
        {hover && (
          <g pointerEvents="none">
            <circle cx={hover.x} cy={hover.y} r={hover.r+5} fill="none" stroke="#f0eee9" strokeWidth="1"/>
          </g>
        )}
      </svg>

      <ViewLegend
        title="Read this Network"
        items={[
          { dot:'#7fb89f', label:'Lifecycle stage anchors — eight phases of the AI dev lifecycle' },
          { dot:'#e85d75', label:'OWASP risk anchors — pulled toward stages where they manifest' },
          { dot:'#c96442', label:'Tool nodes coloured by category — size encodes coverage breadth' },
        ]}
        footnote="Click a tool to open its profile. Drag anchors to explore clusters."
      />
    </div>
  );
}

window.NetworkView = NetworkView;
