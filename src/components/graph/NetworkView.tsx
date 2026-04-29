import { useMemo, useState } from 'react';
import type { Category, Risk, Stage, ToolNode } from '../../lib/graph-data';
import styles from './Graph.module.css';
import ViewLegend from './ViewLegend';

type Props = {
  stages: Stage[];
  llmRisks: Risk[];
  asiRisks: Risk[];
  categories: Category[];
  toolNodes: ToolNode[];
  activeCats: string[];
  onSelect: (sel: { stage?: string; risk?: string }) => void;
};

const W = 1180;
const H = 720;
const CX = W / 2;
const CY = H / 2;
const STAGE_RX = 380;
const STAGE_RY = 280;
const RISK_RX = 200;
const RISK_RY = 130;

function rand(seed: number) {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

export default function NetworkView({
  stages,
  llmRisks,
  asiRisks,
  categories,
  toolNodes,
  activeCats,
  onSelect,
}: Props) {
  const [hover, setHover] = useState<string | null>(null);

  const layout = useMemo(() => {
    const stagePos = stages.map((s, i) => {
      const ang = (i / Math.max(stages.length, 1)) * Math.PI * 2 - Math.PI / 2;
      return { ...s, x: CX + Math.cos(ang) * STAGE_RX, y: CY + Math.sin(ang) * STAGE_RY };
    });

    const allRisks = [...llmRisks, ...asiRisks];
    const riskPos = allRisks.map((r, i) => {
      const ang = (i / Math.max(allRisks.length, 1)) * Math.PI * 2 + Math.PI / 12;
      return { ...r, x: CX + Math.cos(ang) * RISK_RX, y: CY + Math.sin(ang) * RISK_RY };
    });

    const stagePosById = new Map(stagePos.map((s) => [s.id, s]));
    const riskPosById = new Map(riskPos.map((r) => [r.id, r]));

    const r = rand(42);
    const tools = toolNodes.map((t, i) => {
      const sId = t.stages[0];
      const rId = t.risks[0];
      const sP = sId ? stagePosById.get(sId) : undefined;
      const rP = rId ? riskPosById.get(rId) : undefined;
      const lerp = 0.35 + r() * 0.5;
      const jx = (r() - 0.5) * 140;
      const jy = (r() - 0.5) * 140;
      const baseX = sP && rP ? sP.x + (rP.x - sP.x) * lerp : sP?.x ?? rP?.x ?? CX;
      const baseY = sP && rP ? sP.y + (rP.y - sP.y) * lerp : sP?.y ?? rP?.y ?? CY;
      return {
        id: t.id,
        name: t.name,
        cat: t.cat,
        stage: sId,
        risk: rId,
        x: baseX + jx,
        y: baseY + jy,
        rad: 3 + r() * 3,
      };
    });

    return { stagePos, riskPos, tools };
  }, [stages, llmRisks, asiRisks, toolNodes]);

  const hovered = hover ? layout.tools.find((t) => t.id === hover) : null;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svgFull}>
        <defs>
          <radialGradient id="nv-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(127,184,159,0.18)" />
            <stop offset="100%" stopColor="rgba(127,184,159,0)" />
          </radialGradient>
        </defs>

        <ellipse cx={CX} cy={CY} rx={STAGE_RX + 30} ry={STAGE_RY + 30} fill="url(#nv-glow)" />

        <g stroke="rgba(240,238,233,0.05)" strokeWidth="0.6">
          {layout.tools.map((t) => {
            const sP = layout.stagePos.find((s) => s.id === t.stage);
            const rP = layout.riskPos.find((r) => r.id === t.risk);
            const dim = activeCats.length > 0 && !activeCats.includes(t.cat);
            const op = dim ? 0.2 : 1;
            return (
              <g key={t.id} opacity={op}>
                {sP && <line x1={t.x} y1={t.y} x2={sP.x} y2={sP.y} />}
                {rP && <line x1={t.x} y1={t.y} x2={rP.x} y2={rP.y} />}
              </g>
            );
          })}
        </g>

        <g>
          {layout.stagePos.map((s) => (
            <g
              key={s.id}
              onClick={() => onSelect({ stage: s.id })}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r="26"
                fill="rgba(127,184,159,0.08)"
                stroke="#7fb89f"
                strokeWidth="1.5"
              />
              <text
                x={s.x}
                y={s.y + 4}
                textAnchor="middle"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="600"
                fill="#7fb89f"
              >
                {s.label}
              </text>
            </g>
          ))}
        </g>

        <g>
          {layout.riskPos.map((r) => (
            <g
              key={r.id}
              onClick={() => onSelect({ risk: r.id })}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={r.x}
                cy={r.y}
                r="20"
                fill="rgba(232,93,117,0.1)"
                stroke="#e85d75"
                strokeWidth="1.5"
              />
              <text
                x={r.x}
                y={r.y + 4}
                textAnchor="middle"
                fontFamily="JetBrains Mono"
                fontSize="9.5"
                fontWeight="600"
                fill="#e85d75"
              >
                {r.id}
              </text>
            </g>
          ))}
        </g>

        <g>
          {layout.tools.map((t) => {
            const cat = categories.find((c) => c.id === t.cat);
            const dim = activeCats.length > 0 && !activeCats.includes(t.cat);
            return (
              <circle
                key={t.id}
                cx={t.x}
                cy={t.y}
                r={t.rad}
                fill={cat?.color ?? '#c96442'}
                opacity={dim ? 0.2 : 0.85}
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  if (t.id) window.location.href = `/tool/${t.id}`;
                }}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </g>

        {hovered && (
          <g pointerEvents="none">
            <circle
              cx={hovered.x}
              cy={hovered.y}
              r={hovered.rad + 5}
              fill="none"
              stroke="#f0eee9"
              strokeWidth="1"
            />
            <g transform={`translate(${hovered.x + hovered.rad + 8} ${hovered.y - 10})`}>
              <rect
                width={Math.max(120, hovered.name.length * 6 + 20)}
                height="22"
                rx="4"
                fill="#0a0e14"
                stroke="rgba(240,238,233,0.18)"
              />
              <text
                x="10"
                y="15"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="500"
                fill="#f0eee9"
              >
                {hovered.name}
              </text>
            </g>
          </g>
        )}
      </svg>

      <ViewLegend
        title="Read this Network"
        items={[
          { dot: '#7fb89f', label: 'Lifecycle stage anchors — eleven phases of the AI dev lifecycle' },
          { dot: '#e85d75', label: 'OWASP risk anchors — twenty risks across LLM + Agentic standards' },
          { dot: '#c96442', label: 'Tool nodes coloured by category — click to open tool profile' },
        ]}
        footnote="Hover a tool for its name. Click an anchor to see tools at that stage or risk."
      />
    </>
  );
}
