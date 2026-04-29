import { useMemo, useState } from 'react';
import type { Risk, Stage } from '../../lib/graph-data';
import styles from './Graph.module.css';
import ViewLegend from './ViewLegend';

type Props = {
  stages: Stage[];
  risks: Risk[];
  matrix: number[][];
  onSelect: (sel: { stage: string; risk: string }) => void;
};

const W = 1180;
const H = 720;
const LEFT = 130;
const TOP = 90;
const RIGHT = 60;
const BOTTOM = 90;

function colorFor(v: number, max: number): string {
  if (v === 0 || max === 0) return 'rgba(240,238,233,0.04)';
  const t = v / max;
  if (t < 0.33) {
    const k = t / 0.33;
    return `rgba(127,184,159,${0.18 + k * 0.4})`;
  } else if (t < 0.66) {
    const k = (t - 0.33) / 0.33;
    return `rgba(${Math.round(127 + k * 105)}, ${Math.round(184 - k * 40)}, ${Math.round(159 - k * 70)}, ${0.55 + k * 0.2})`;
  } else {
    const k = (t - 0.66) / 0.34;
    return `rgba(232, ${Math.round(144 - k * 51)}, ${Math.round(89 - k * 8)}, ${0.78 + k * 0.18})`;
  }
}

export default function HeatmapView({ stages, risks, matrix, onSelect }: Props) {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const layout = useMemo(() => {
    const cols = risks.length;
    const rows = stages.length;
    const cw = (W - LEFT - RIGHT) / Math.max(cols, 1);
    const ch = (H - TOP - BOTTOM) / Math.max(rows, 1);

    let max = 0;
    for (const row of matrix) for (const v of row) if (v > max) max = v;

    const colTotals = risks.map((_, ci) =>
      stages.reduce((sum, _s, ri) => sum + (matrix[ri]?.[ci] ?? 0), 0),
    );
    const rowTotals = stages.map((_, ri) => (matrix[ri] ?? []).reduce((a, b) => a + b, 0));
    const maxColT = Math.max(1, ...colTotals);
    const maxRowT = Math.max(1, ...rowTotals);

    let densest = { r: -1, c: -1, v: 0 };
    for (let ri = 0; ri < rows; ri++) {
      for (let ci = 0; ci < cols; ci++) {
        const v = matrix[ri]?.[ci] ?? 0;
        if (v > densest.v) densest = { r: ri, c: ci, v };
      }
    }

    return { cols, rows, cw, ch, max, colTotals, rowTotals, maxColT, maxRowT, densest };
  }, [stages, risks, matrix]);

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svgFull}>
        <g>
          {risks.map((r, ci) => {
            const x = LEFT + ci * layout.cw + layout.cw / 2;
            return (
              <g key={r.id}>
                <text
                  x={x}
                  y={TOP - 58}
                  fontFamily="JetBrains Mono"
                  fontSize="11"
                  fontWeight="600"
                  fill="#e85d75"
                  textAnchor="middle"
                >
                  {r.id}
                </text>
                <text
                  x={x}
                  y={TOP - 42}
                  fontFamily="Inter"
                  fontSize="10"
                  fill="rgba(240,238,233,0.65)"
                  textAnchor="middle"
                >
                  {r.label.length > 18 ? r.label.slice(0, 17) + '…' : r.label}
                </text>
                <rect
                  x={x - layout.cw * 0.3}
                  y={TOP - 30}
                  width={layout.cw * 0.6 * (layout.colTotals[ci] / layout.maxColT)}
                  height={4}
                  fill="rgba(232,93,117,0.5)"
                  rx="1"
                />
                <text
                  x={x}
                  y={TOP - 15}
                  fontFamily="JetBrains Mono"
                  fontSize="9.5"
                  fill="rgba(240,238,233,0.45)"
                  textAnchor="middle"
                >
                  {layout.colTotals[ci]}
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {stages.map((s, ri) => {
            const y = TOP + ri * layout.ch + layout.ch / 2;
            return (
              <g key={s.id}>
                <text
                  x={LEFT - 14}
                  y={y - 2}
                  textAnchor="end"
                  fontFamily="Inter"
                  fontSize="13"
                  fontWeight="500"
                  fill="#7fb89f"
                >
                  {s.label}
                </text>
                <text
                  x={LEFT - 14}
                  y={y + 12}
                  textAnchor="end"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  fill="rgba(240,238,233,0.45)"
                >
                  {layout.rowTotals[ri]} tools
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {stages.map((s, ri) =>
            risks.map((r, ci) => {
              const v = matrix[ri]?.[ci] ?? 0;
              const x = LEFT + ci * layout.cw;
              const y = TOP + ri * layout.ch;
              const isHover = hover && hover.r === ri && hover.c === ci;
              return (
                <g key={`${ri}-${ci}`}>
                  <rect
                    x={x + 2}
                    y={y + 2}
                    width={layout.cw - 4}
                    height={layout.ch - 4}
                    fill={colorFor(v, layout.max)}
                    stroke={isHover ? '#f0eee9' : 'rgba(240,238,233,0.06)'}
                    strokeWidth={isHover ? 1.5 : 1}
                    rx="3"
                    onMouseEnter={() => setHover({ r: ri, c: ci })}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => onSelect({ stage: s.id, risk: r.id })}
                    style={{ cursor: 'pointer', transition: 'all 0.12s' }}
                  />
                  <text
                    x={x + layout.cw / 2}
                    y={y + layout.ch / 2 + 4}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono"
                    fontSize="12"
                    fontWeight="600"
                    fill={
                      v === 0
                        ? 'rgba(240,238,233,0.2)'
                        : v / layout.max > 0.55
                          ? '#0a0e14'
                          : '#f0eee9'
                    }
                    pointerEvents="none"
                  >
                    {v}
                  </text>
                </g>
              );
            }),
          )}
        </g>

        <g transform={`translate(${LEFT} ${H - BOTTOM + 30})`}>
          <text
            x="0"
            y="-4"
            fontFamily="Inter"
            fontSize="11"
            letterSpacing="1.5"
            fill="rgba(240,238,233,0.5)"
          >
            COVERAGE DENSITY
          </text>
          {Array.from({ length: 30 }).map((_, i) => (
            <rect
              key={i}
              x={i * 7}
              y="6"
              width="6.5"
              height="10"
              fill={colorFor((i / 29) * layout.max, layout.max)}
              rx="1"
            />
          ))}
          <text x="0" y="32" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(240,238,233,0.5)">
            0 tools
          </text>
          <text
            x="210"
            y="32"
            fontFamily="JetBrains Mono"
            fontSize="10"
            fill="rgba(240,238,233,0.5)"
          >
            {layout.max}+ tools
          </text>
        </g>

        {layout.densest.v > 0 && (() => {
          const { r: ri, c: ci, v } = layout.densest;
          const x = LEFT + ci * layout.cw + layout.cw;
          const y = TOP + ri * layout.ch + layout.ch / 2;
          const stage = stages[ri];
          const risk = risks[ci];
          // Move callout left if too close to right edge
          const calloutX = x + 95 + 200 > W ? x - 215 : x + 95;
          const lineX = x + 95 + 200 > W ? x - 6 : x + 6;
          const lineX2 = x + 95 + 200 > W ? x - 90 : x + 90;
          return (
            <g pointerEvents="none">
              <line
                x1={lineX}
                y1={y}
                x2={lineX2}
                y2={y - 30}
                stroke="rgba(240,238,233,0.4)"
                strokeDasharray="2,3"
              />
              <g transform={`translate(${calloutX} ${y - 58})`}>
                <rect
                  width="200"
                  height="56"
                  rx="6"
                  fill="rgba(10,14,20,0.9)"
                  stroke="rgba(232,93,117,0.4)"
                />
                <text
                  x="12"
                  y="18"
                  fontFamily="Inter"
                  fontSize="10"
                  letterSpacing="1.5"
                  fill="rgba(232,93,117,0.85)"
                >
                  DENSEST INTERSECTION
                </text>
                <text
                  x="12"
                  y="36"
                  fontFamily="Fraunces"
                  fontSize="13"
                  fontStyle="italic"
                  fill="#f0eee9"
                >
                  {stage?.label} × {risk?.id}
                </text>
                <text
                  x="12"
                  y="50"
                  fontFamily="JetBrains Mono"
                  fontSize="10.5"
                  fill="rgba(240,238,233,0.6)"
                >
                  {v} tools
                </text>
              </g>
            </g>
          );
        })()}
      </svg>

      <ViewLegend
        title="Read this Heatmap"
        items={[
          { dot: '#7fb89f', label: 'Rows are AI/ML lifecycle stages — Plan through Augment' },
          { dot: '#e85d75', label: 'Columns are OWASP risk categories (LLM or Agentic Top 10)' },
          { label: 'Cell colour = number of tools covering that intersection' },
        ]}
        footnote="Cold cells are coverage gaps. Click any cell to see the tools."
      />
    </>
  );
}
