// Sankey view — Stages → Tools (categorised) → Risks.
// Hand-laid out so the mockup looks polished without a real layout engine.

const { STAGES, LLM_RISKS, CATEGORIES, SANKEY_FLOWS } = window.GraphData;

function SankeyView({ activeCats, onCellClick }) {
  const W = 1180, H = 720;
  const PAD_TOP = 40, PAD_BOTTOM = 40;
  const COL = { stage:140, cat:560, risk:980 };
  const NODE_W = 14;

  // Compute node heights from totals.
  const stageTotals = {};
  const riskTotals = {};
  SANKEY_FLOWS.forEach(([s,r,w]) => {
    stageTotals[s] = (stageTotals[s]||0)+w;
    riskTotals[r] = (riskTotals[r]||0)+w;
  });
  const stageSum = Object.values(stageTotals).reduce((a,b)=>a+b,0);
  const riskSum  = Object.values(riskTotals).reduce((a,b)=>a+b,0);
  const usableH = H - PAD_TOP - PAD_BOTTOM;
  const gapPx = 8;
  const stageGaps = (STAGES.length-1)*gapPx;
  const riskGaps  = (LLM_RISKS.length-1)*gapPx;

  // Compute y positions for stages
  const stageNodes = {};
  let y = PAD_TOP;
  STAGES.forEach(s => {
    const h = Math.max(14, ((stageTotals[s.id]||0)/stageSum) * (usableH-stageGaps));
    stageNodes[s.id] = { ...s, y, h, total: stageTotals[s.id]||0 };
    y += h + gapPx;
  });

  // Risks
  const riskNodes = {};
  y = PAD_TOP;
  LLM_RISKS.forEach(r => {
    const h = Math.max(14, ((riskTotals[r.id]||0)/riskSum) * (usableH-riskGaps));
    riskNodes[r.id] = { ...r, y, h, total: riskTotals[r.id]||0 };
    y += h + gapPx;
  });

  // Middle category column (informational, not flowed through)
  const midColH = usableH - (CATEGORIES.length-1)*10;
  const catNodes = {};
  y = PAD_TOP;
  CATEGORIES.forEach(c => {
    const h = midColH / CATEGORIES.length;
    catNodes[c.id] = { ...c, y, h };
    y += h + 10;
  });

  // Track stack offsets within each node so multiple flows don't overlap.
  const stageOffsets = {}, riskOffsets = {};

  // Build flow paths
  const flows = SANKEY_FLOWS.map(([sid, rid, w], i) => {
    const sN = stageNodes[sid];
    const rN = riskNodes[rid];
    if (!sN || !rN) return null;
    const sH = (w/stageTotals[sid]) * sN.h;
    const rH = (w/riskTotals[rid]) * rN.h;
    const sY = sN.y + (stageOffsets[sid]||0);
    const rY = rN.y + (riskOffsets[rid]||0);
    stageOffsets[sid] = (stageOffsets[sid]||0) + sH;
    riskOffsets[rid] = (riskOffsets[rid]||0) + rH;

    // Pick a category color for the ribbon — pseudo-random by hash so it looks varied
    const cat = CATEGORIES[(sid.charCodeAt(0)+rid.charCodeAt(4)) % CATEGORIES.length];
    const dim = activeCats.length>0 && !activeCats.includes(cat.id);

    return { sid, rid, w, sY, sH, rY, rH, color: cat.color, key:i, dim };
  }).filter(Boolean);

  function ribbonPath(x1, y1a, y1b, x2, y2a, y2b) {
    const cx1 = x1 + (x2-x1)*0.5;
    return `M ${x1} ${y1a}
            C ${cx1} ${y1a}, ${cx1} ${y2a}, ${x2} ${y2a}
            L ${x2} ${y2b}
            C ${cx1} ${y2b}, ${cx1} ${y1b}, ${x1} ${y1b} Z`;
  }

  const [hover, setHover] = useState(null);

  return (
    <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:'100%', display:'block' }}>
        {/* Column headers */}
        <g fontFamily="Inter" fontSize="11" letterSpacing="2" fill="rgba(240,238,233,0.42)">
          <text x={COL.stage - NODE_W/2} y="22">LIFECYCLE STAGE</text>
          <text x={COL.cat - 70} y="22">TOOL CATEGORY</text>
          <text x={COL.risk - NODE_W/2 - 95} y="22" textAnchor="start">OWASP LLM RISK</text>
        </g>

        {/* Subtle vertical guide lines */}
        <g stroke="rgba(240,238,233,0.05)">
          <line x1={COL.stage} y1={PAD_TOP-8} x2={COL.stage} y2={H-PAD_BOTTOM+8}/>
          <line x1={COL.cat}   y1={PAD_TOP-8} x2={COL.cat}   y2={H-PAD_BOTTOM+8}/>
          <line x1={COL.risk}  y1={PAD_TOP-8} x2={COL.risk}  y2={H-PAD_BOTTOM+8}/>
        </g>

        {/* Flows */}
        <g>
          {flows.map(f => {
            const isHover = hover && hover.key===f.key;
            const isOtherHover = hover && hover.key!==f.key;
            const op = f.dim ? 0.06 : (isHover ? 0.85 : isOtherHover ? 0.12 : 0.32);
            return (
              <path
                key={f.key}
                d={ribbonPath(COL.stage+NODE_W/2, f.sY, f.sY+f.sH, COL.risk-NODE_W/2, f.rY, f.rY+f.rH)}
                fill={f.color}
                opacity={op}
                onMouseEnter={()=>setHover(f)}
                onMouseLeave={()=>setHover(null)}
                onClick={()=>onCellClick && onCellClick({ stage:f.sid, risk:f.rid })}
                style={{ cursor:'pointer', transition:'opacity 0.15s' }}
              />
            );
          })}
        </g>

        {/* Stage nodes (left) */}
        <g>
          {Object.values(stageNodes).map(n => (
            <g key={n.id}>
              <rect x={COL.stage-NODE_W/2} y={n.y} width={NODE_W} height={n.h} fill="#7fb89f" rx="2"/>
              <text
                x={COL.stage-NODE_W/2-10} y={n.y + n.h/2 + 4}
                textAnchor="end" fontFamily="Inter" fontSize="13" fontWeight="500" fill="#f0eee9"
              >{n.label}</text>
              <text
                x={COL.stage-NODE_W/2-10} y={n.y + n.h/2 + 18}
                textAnchor="end" fontFamily="JetBrains Mono" fontSize="10.5" fill="rgba(240,238,233,0.5)"
              >{n.n} tools</text>
            </g>
          ))}
        </g>

        {/* Category nodes (middle) */}
        <g>
          {Object.values(catNodes).map(c => {
            const dim = activeCats.length>0 && !activeCats.includes(c.id);
            return (
              <g key={c.id} opacity={dim?0.3:1}>
                <rect x={COL.cat-90} y={c.y} width={180} height={c.h-2} rx="6"
                  fill={`${c.color}15`} stroke={`${c.color}55`}/>
                <circle cx={COL.cat-78} cy={c.y + c.h/2} r="4" fill={c.color}/>
                <text x={COL.cat-68} y={c.y + c.h/2 + 4}
                  fontFamily="Inter" fontSize="12" fontWeight="500" fill="#f0eee9">{c.label}</text>
              </g>
            );
          })}
        </g>

        {/* Risk nodes (right) */}
        <g>
          {Object.values(riskNodes).map(n => (
            <g key={n.id}>
              <rect x={COL.risk-NODE_W/2} y={n.y} width={NODE_W} height={n.h}
                fill="#e85d75" rx="2"/>
              <text
                x={COL.risk+NODE_W/2+10} y={n.y + n.h/2 - 1}
                fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" fill="#e85d75"
              >{n.id}</text>
              <text
                x={COL.risk+NODE_W/2+10} y={n.y + n.h/2 + 14}
                fontFamily="Inter" fontSize="12" fill="#f0eee9"
              >{n.label}</text>
            </g>
          ))}
        </g>

        {/* Hover tooltip */}
        {hover && (() => {
          const sN = stageNodes[hover.sid];
          const rN = riskNodes[hover.rid];
          const cy = (sN.y + sN.h/2 + rN.y + rN.h/2)/2;
          return (
            <g transform={`translate(${COL.cat-90} ${cy-30})`}>
              <rect width="180" height="60" rx="6" fill="#0a0e14" stroke="rgba(240,238,233,0.18)"/>
              <text x="14" y="22" fontFamily="Inter" fontSize="11" fill="rgba(240,238,233,0.55)" letterSpacing="1.5">FLOW</text>
              <text x="14" y="40" fontFamily="Inter" fontSize="13" fontWeight="600" fill="#f0eee9">
                {sN.label} → {hover.rid}
              </text>
              <text x="14" y="54" fontFamily="JetBrains Mono" fontSize="11" fill="#c96442">
                {hover.w} tools
              </text>
            </g>
          );
        })()}
      </svg>

      <ViewLegend
        title="Read this Sankey"
        items={[
          { dot:'#7fb89f', label:'Lifecycle stage — block height = tools touching that stage' },
          { dot:'#e85d75', label:'OWASP LLM risk — block height = coverage by Yuntona\u2019s catalog' },
          { dot:null,      label:'Ribbon thickness = number of tools that map this stage to this risk' },
        ]}
        footnote="Click a ribbon to inspect the tools at that intersection. Hover to highlight."
      />
    </div>
  );
}

function ViewLegend({ title, items, footnote }) {
  return (
    <div style={{
      position:'absolute', left:24, bottom:24, width:340,
      background:'rgba(10,14,20,0.92)', backdropFilter:'blur(8px)',
      border:'1px solid rgba(240,238,233,0.1)', borderRadius:10,
      padding:'16px 18px', fontFamily:'Inter', color:'#f0eee9',
    }}>
      <div style={{ fontSize:11, letterSpacing:'2px', color:'rgba(240,238,233,0.5)', marginBottom:10 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9, fontSize:12.5, lineHeight:1.45 }}>
            {it.dot
              ? <span style={{ width:10, height:10, marginTop:4, borderRadius:99, background:it.dot, flexShrink:0 }}/>
              : <span style={{ width:10, height:2, marginTop:8, background:'rgba(240,238,233,0.4)', flexShrink:0 }}/>}
            <span style={{ color:'rgba(240,238,233,0.82)' }}>{it.label}</span>
          </div>
        ))}
      </div>
      {footnote && (
        <div style={{
          marginTop:12, paddingTop:10, borderTop:'1px solid rgba(240,238,233,0.08)',
          fontSize:11.5, fontStyle:'italic', color:'rgba(240,238,233,0.5)', fontFamily:'Fraunces',
        }}>{footnote}</div>
      )}
    </div>
  );
}

window.SankeyView = SankeyView;
window.ViewLegend = ViewLegend;
