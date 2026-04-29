// Heatmap matrix — Stage (rows) × LLM Risk (cols). Reveals coverage gaps.

const { STAGES: HM_STAGES, LLM_RISKS: HM_RISKS, HEATMAP_LLM } = window.GraphData;

function HeatmapView({ onCellClick }) {
  const [hover, setHover] = useState(null);
  const W = 1180, H = 720;
  const LEFT = 130, TOP = 90, RIGHT = 60, BOTTOM = 90;
  const cols = HM_RISKS.length;
  const rows = HM_STAGES.length;
  const cw = (W - LEFT - RIGHT) / cols;
  const ch = (H - TOP - BOTTOM) / rows;

  // Find max for scaling
  let max = 0;
  HM_STAGES.forEach(s => HEATMAP_LLM[s.id].forEach(v => { if (v>max) max=v; }));

  function colorFor(v) {
    if (v === 0) return 'rgba(240,238,233,0.04)';
    const t = v / max;
    // Blend kelp → amber → coral
    if (t < 0.33) {
      const k = t / 0.33;
      return `rgba(127,184,159,${0.18 + k*0.4})`;
    } else if (t < 0.66) {
      const k = (t-0.33)/0.33;
      return `rgba(${Math.round(127 + k*105)}, ${Math.round(184 - k*40)}, ${Math.round(159 - k*70)}, ${0.55 + k*0.2})`;
    } else {
      const k = (t-0.66)/0.34;
      return `rgba(${232}, ${Math.round(144 - k*51)}, ${Math.round(89 - k*8)}, ${0.78 + k*0.18})`;
    }
  }

  // Column + row totals for marginals
  const colTotals = HM_RISKS.map((_, ci) =>
    HM_STAGES.reduce((sum, s) => sum + HEATMAP_LLM[s.id][ci], 0)
  );
  const rowTotals = HM_STAGES.map(s => HEATMAP_LLM[s.id].reduce((a,b)=>a+b,0));
  const maxColT = Math.max(...colTotals);
  const maxRowT = Math.max(...rowTotals);

  return (
    <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:'100%', display:'block' }}>
        {/* Column headers */}
        <g>
          {HM_RISKS.map((r, ci) => {
            const x = LEFT + ci*cw + cw/2;
            return (
              <g key={r.id}>
                <text x={x} y={TOP-58} fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" fill="#e85d75" textAnchor="middle">{r.id}</text>
                <text x={x} y={TOP-42} fontFamily="Inter" fontSize="10" fill="rgba(240,238,233,0.65)" textAnchor="middle">
                  {r.label.length > 16 ? r.label.slice(0,15)+'…' : r.label}
                </text>
                {/* mini bar */}
                <rect x={x - cw*0.3} y={TOP-30} width={cw*0.6 * (colTotals[ci]/maxColT)} height={4} fill="rgba(232,93,117,0.5)" rx="1"/>
                <text x={x} y={TOP-15} fontFamily="JetBrains Mono" fontSize="9.5" fill="rgba(240,238,233,0.45)" textAnchor="middle">
                  {colTotals[ci]}
                </text>
              </g>
            );
          })}
        </g>

        {/* Row headers */}
        <g>
          {HM_STAGES.map((s, ri) => {
            const y = TOP + ri*ch + ch/2;
            return (
              <g key={s.id}>
                <text x={LEFT-14} y={y-2} textAnchor="end" fontFamily="Inter" fontSize="13" fontWeight="500" fill="#7fb89f">{s.label}</text>
                <text x={LEFT-14} y={y+12} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(240,238,233,0.45)">{rowTotals[ri]} tools</text>
              </g>
            );
          })}
        </g>

        {/* Cells */}
        <g>
          {HM_STAGES.map((s, ri) => HEATMAP_LLM[s.id].map((v, ci) => {
            const x = LEFT + ci*cw, y = TOP + ri*ch;
            const isHover = hover && hover.r===ri && hover.c===ci;
            return (
              <g key={`${ri}-${ci}`}>
                <rect
                  x={x+2} y={y+2} width={cw-4} height={ch-4}
                  fill={colorFor(v)}
                  stroke={isHover ? '#f0eee9' : 'rgba(240,238,233,0.06)'}
                  strokeWidth={isHover ? 1.5 : 1}
                  rx="3"
                  onMouseEnter={()=>setHover({r:ri,c:ci,v})}
                  onMouseLeave={()=>setHover(null)}
                  onClick={()=>onCellClick && onCellClick({ stage:s.id, risk:HM_RISKS[ci].id })}
                  style={{ cursor:'pointer', transition:'all 0.12s' }}
                />
                <text
                  x={x+cw/2} y={y+ch/2+4} textAnchor="middle"
                  fontFamily="JetBrains Mono" fontSize="12" fontWeight="600"
                  fill={v===0 ? 'rgba(240,238,233,0.2)' : (v/max>0.55 ? '#0a0e14' : '#f0eee9')}
                  pointerEvents="none"
                >{v}</text>
              </g>
            );
          }))}
        </g>

        {/* Bottom legend gradient */}
        <g transform={`translate(${LEFT} ${H-BOTTOM+30})`}>
          <text x="0" y="-4" fontFamily="Inter" fontSize="11" letterSpacing="1.5" fill="rgba(240,238,233,0.5)">COVERAGE DENSITY</text>
          {Array.from({length:30}).map((_,i) => (
            <rect key={i} x={i*7} y="6" width="6.5" height="10" fill={colorFor((i/29)*max)} rx="1"/>
          ))}
          <text x="0" y="32" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(240,238,233,0.5)">0 tools</text>
          <text x="210" y="32" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(240,238,233,0.5)">{max}+ tools</text>
        </g>

        {/* Highlight: Operate × LLM01 callout */}
        {(() => {
          const ri = HM_STAGES.findIndex(s=>s.id==='operate');
          const ci = HM_RISKS.findIndex(r=>r.id==='LLM01');
          const x = LEFT + ci*cw + cw, y = TOP + ri*ch + ch/2;
          return (
            <g pointerEvents="none">
              <line x1={x+6} y1={y} x2={x+90} y2={y-30} stroke="rgba(240,238,233,0.4)" strokeDasharray="2,3"/>
              <g transform={`translate(${x+95} ${y-58})`}>
                <rect width="200" height="56" rx="6" fill="rgba(10,14,20,0.9)" stroke="rgba(232,93,117,0.4)"/>
                <text x="12" y="18" fontFamily="Inter" fontSize="10" letterSpacing="1.5" fill="rgba(232,93,117,0.85)">DENSEST INTERSECTION</text>
                <text x="12" y="36" fontFamily="Fraunces" fontSize="13" fontStyle="italic" fill="#f0eee9">Operate × Prompt Injection</text>
                <text x="12" y="50" fontFamily="JetBrains Mono" fontSize="10.5" fill="rgba(240,238,233,0.6)">14 tools — runtime guards</text>
              </g>
            </g>
          );
        })()}
      </svg>

      <ViewLegend
        title="Read this Heatmap"
        items={[
          { dot:'#7fb89f', label:'Rows are AI/ML lifecycle stages — Plan through Augment' },
          { dot:'#e85d75', label:'Columns are the OWASP LLM Top 10 risk categories' },
          { dot:null,      label:'Cell colour = number of tools covering that intersection' },
        ]}
        footnote="Cold cells are coverage gaps — Plan × LLM05 has zero tools today."
      />
    </div>
  );
}

window.HeatmapView = HeatmapView;
