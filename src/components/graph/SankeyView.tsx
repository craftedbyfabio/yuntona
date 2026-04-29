import { useMemo, useState } from 'react';
import type { Category, Risk, SankeyFlow, Stage } from '../../lib/graph-data';
import styles from './Graph.module.css';
import ViewLegend from './ViewLegend';

type Props = {
  stages: Stage[];
  risks: Risk[];
  flows: SankeyFlow[];
  categories: Category[];
  activeCats: string[];
  onSelect: (sel: { stage: string; risk: string }) => void;
};

const W = 1180;
const H = 720;
const PAD_TOP = 40;
const PAD_BOTTOM = 40;
const COL = { stage: 140, cat: 560, risk: 980 };
const NODE_W = 14;

function ribbonPath(x1: number, y1a: number, y1b: number, x2: number, y2a: number, y2b: number) {
  const cx1 = x1 + (x2 - x1) * 0.5;
  return `M ${x1} ${y1a}
          C ${cx1} ${y1a}, ${cx1} ${y2a}, ${x2} ${y2a}
          L ${x2} ${y2b}
          C ${cx1} ${y2b}, ${cx1} ${y1b}, ${x1} ${y1b} Z`;
}

export default function SankeyView({ stages, risks, flows, categories, activeCats, onSelect }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const layout = useMemo(() => {
    const stageTotals = new Map<string, number>();
    const riskTotals = new Map<string, number>();
    for (const [s, r, w] of flows) {
      stageTotals.set(s, (stageTotals.get(s) ?? 0) + w);
      riskTotals.set(r, (riskTotals.get(r) ?? 0) + w);
    }
    const stageSum = [...stageTotals.values()].reduce((a, b) => a + b, 0) || 1;
    const riskSum = [...riskTotals.values()].reduce((a, b) => a + b, 0) || 1;
    const usableH = H - PAD_TOP - PAD_BOTTOM;
    const gap = 8;
    const stageGaps = (stages.length - 1) * gap;
    const riskGaps = (risks.length - 1) * gap;

    const stageNodes: Record<string, { y: number; h: number; total: number; label: string; id: string; count: number }> = {};
    let y = PAD_TOP;
    for (const s of stages) {
      const total = stageTotals.get(s.id) ?? 0;
      const h = Math.max(14, (total / stageSum) * (usableH - stageGaps));
      stageNodes[s.id] = { ...s, y, h, total };
      y += h + gap;
    }

    const riskNodes: Record<string, { y: number; h: number; total: number; label: string; id: string; count: number }> = {};
    y = PAD_TOP;
    for (const r of risks) {
      const total = riskTotals.get(r.id) ?? 0;
      const h = Math.max(14, (total / riskSum) * (usableH - riskGaps));
      riskNodes[r.id] = { ...r, y, h, total };
      y += h + gap;
    }

    const midGap = 10;
    const midColH = usableH - (categories.length - 1) * midGap;
    const catNodes: Record<string, { y: number; h: number; id: string; label: string; color: string; count: number }> = {};
    y = PAD_TOP;
    const eachH = midColH / Math.max(categories.length, 1);
    for (const c of categories) {
      catNodes[c.id] = { ...c, y, h: eachH };
      y += eachH + midGap;
    }

    const stageOffsets = new Map<string, number>();
    const riskOffsets = new Map<string, number>();
    const builtFlows = flows
      .map(([sid, rid, w], i) => {
        const sN = stageNodes[sid];
        const rN = riskNodes[rid];
        if (!sN || !rN) return null;
        const sH = (w / (stageTotals.get(sid) ?? 1)) * sN.h;
        const rH = (w / (riskTotals.get(rid) ?? 1)) * rN.h;
        const sY = sN.y + (stageOffsets.get(sid) ?? 0);
        const rY = rN.y + (riskOffsets.get(rid) ?? 0);
        stageOffsets.set(sid, (stageOffsets.get(sid) ?? 0) + sH);
        riskOffsets.set(rid, (riskOffsets.get(rid) ?? 0) + rH);

        // Pseudo-random category pick per ribbon for a varied palette.
        const idx =
          categories.length > 0
            ? (sid.charCodeAt(0) + (rid.charCodeAt(rid.length - 1) || 0)) % categories.length
            : 0;
        const cat = categories[idx];
        const dim = activeCats.length > 0 && cat && !activeCats.includes(cat.id);

        return {
          key: i,
          sid,
          rid,
          w,
          sY,
          sH,
          rY,
          rH,
          color: cat?.color ?? '#c96442',
          dim,
        };
      })
      .filter(Boolean) as Array<{
      key: number;
      sid: string;
      rid: string;
      w: number;
      sY: number;
      sH: number;
      rY: number;
      rH: number;
      color: string;
      dim: boolean;
    }>;

    return { stageNodes, riskNodes, catNodes, flows: builtFlows };
  }, [stages, risks, flows, categories, activeCats]);

  const hoveredFlow = hover !== null ? layout.flows.find((f) => f.key === hover) : null;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svgFull}>
        <g fontFamily="Inter" fontSize="9.5" letterSpacing="2" fill="rgba(240,238,233,0.42)">
          <text x={COL.stage - NODE_W / 2} y="22">LIFECYCLE STAGE</text>
          <text x={COL.cat - 70} y="22">TOOL CATEGORY</text>
          <text x={COL.risk - NODE_W / 2 - 95} y="22" textAnchor="start">OWASP RISK</text>
        </g>

        <g stroke="rgba(240,238,233,0.05)">
          <line x1={COL.stage} y1={PAD_TOP - 8} x2={COL.stage} y2={H - PAD_BOTTOM + 8} />
          <line x1={COL.cat} y1={PAD_TOP - 8} x2={COL.cat} y2={H - PAD_BOTTOM + 8} />
          <line x1={COL.risk} y1={PAD_TOP - 8} x2={COL.risk} y2={H - PAD_BOTTOM + 8} />
        </g>

        <g>
          {layout.flows.map((f) => {
            const isHover = hover === f.key;
            const otherHover = hover !== null && hover !== f.key;
            const op = f.dim ? 0.06 : isHover ? 0.85 : otherHover ? 0.12 : 0.32;
            return (
              <path
                key={f.key}
                d={ribbonPath(COL.stage + NODE_W / 2, f.sY, f.sY + f.sH, COL.risk - NODE_W / 2, f.rY, f.rY + f.rH)}
                fill={f.color}
                opacity={op}
                onMouseEnter={() => setHover(f.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect({ stage: f.sid, risk: f.rid })}
                style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              />
            );
          })}
        </g>

        <g>
          {Object.values(layout.stageNodes).map((n) => (
            <g key={n.id}>
              <rect x={COL.stage - NODE_W / 2} y={n.y} width={NODE_W} height={n.h} fill="#7fb89f" rx="2" />
              <text
                x={COL.stage - NODE_W / 2 - 10}
                y={n.y + n.h / 2 + 4}
                textAnchor="end"
                fontFamily="Inter"
                fontSize="9.5"
                fontWeight="500"
                fill="#f0eee9"
              >
                {n.label}
              </text>
              <text
                x={COL.stage - NODE_W / 2 - 10}
                y={n.y + n.h / 2 + 18}
                textAnchor="end"
                fontFamily="JetBrains Mono"
                fontSize="9"
                fill="rgba(240,238,233,0.5)"
              >
                {n.count} tools
              </text>
            </g>
          ))}
        </g>

        <g>
          {Object.values(layout.catNodes).map((c) => {
            const dim = activeCats.length > 0 && !activeCats.includes(c.id);
            return (
              <g key={c.id} opacity={dim ? 0.3 : 1}>
                <rect
                  x={COL.cat - 90}
                  y={c.y}
                  width={180}
                  height={c.h - 2}
                  rx="6"
                  fill={`${c.color}15`}
                  stroke={`${c.color}55`}
                />
                <circle cx={COL.cat - 78} cy={c.y + c.h / 2} r="4" fill={c.color} />
                <text
                  x={COL.cat - 68}
                  y={c.y + c.h / 2 + 4}
                  fontFamily="Inter"
                  fontSize="10"
                  fontWeight="500"
                  fill="#f0eee9"
                >
                  {c.label}
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {Object.values(layout.riskNodes).map((n) => (
            <g key={n.id}>
              <rect
                x={COL.risk - NODE_W / 2}
                y={n.y}
                width={NODE_W}
                height={n.h}
                fill="#e85d75"
                rx="2"
              />
              <text
                x={COL.risk + NODE_W / 2 + 10}
                y={n.y + n.h / 2 - 1}
                fontFamily="JetBrains Mono"
                fontSize="9.5"
                fontWeight="600"
                fill="#e85d75"
              >
                {n.id}
              </text>
              <text
                x={COL.risk + NODE_W / 2 + 10}
                y={n.y + n.h / 2 + 14}
                fontFamily="Inter"
                fontSize="10"
                fill="#f0eee9"
              >
                {n.label}
              </text>
            </g>
          ))}
        </g>

        {hoveredFlow && (() => {
          const sN = layout.stageNodes[hoveredFlow.sid];
          const rN = layout.riskNodes[hoveredFlow.rid];
          if (!sN || !rN) return null;
          const cy = (sN.y + sN.h / 2 + rN.y + rN.h / 2) / 2;
          return (
            <g transform={`translate(${COL.cat - 90} ${cy - 30})`} pointerEvents="none">
              <rect width="180" height="60" rx="6" fill="#0a0e14" stroke="rgba(240,238,233,0.18)" />
              <text x="14" y="22" fontFamily="Inter" fontSize="9.5" fill="rgba(240,238,233,0.55)" letterSpacing="1.5">FLOW</text>
              <text x="14" y="40" fontFamily="Inter" fontSize="9.5" fontWeight="600" fill="#f0eee9">
                {sN.label} → {hoveredFlow.rid}
              </text>
              <text x="14" y="54" fontFamily="JetBrains Mono" fontSize="9.5" fill="#c96442">
                {hoveredFlow.w} tools
              </text>
            </g>
          );
        })()}
      </svg>

      <ViewLegend
        title="Read this Sankey"
        items={[
          { dot: '#7fb89f', label: 'Lifecycle stage — block height = tools touching that stage' },
          { dot: '#e85d75', label: 'OWASP risk — block height = coverage by Yuntona’s catalog' },
          { label: 'Ribbon thickness = number of tools that map this stage to this risk' },
        ]}
        footnote="Click a ribbon to inspect the tools at that intersection. Hover to highlight."
      />
    </>
  );
}
