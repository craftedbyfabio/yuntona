import { useMemo, useState } from 'react';
import type { GraphData } from '../../lib/graph-data';
import styles from './Graph.module.css';
import TopBar, { type Scope, type View } from './TopBar';
import SankeyView from './SankeyView';
import NetworkView from './NetworkView';
import HeatmapView from './HeatmapView';
import SidePanel, { type Selection } from './SidePanel';

type Props = {
  data: GraphData;
};

export default function GraphApp({ data }: Props) {
  const [view, setView] = useState<View>('sankey');
  const [scope, setScope] = useState<Scope>('all');
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [selection, setSelection] = useState<Selection>(null);

  // For Sankey + Heatmap: pick risk standard from scope.
  // 'all' / 'llm' → LLM. 'asi' → ASI. 'lifecycle' → falls back to LLM (no risk swap; lifecycle is a future view filter).
  const useASI = scope === 'asi';
  const activeRisks = useASI ? data.asiRisks : data.llmRisks;
  const activeMatrix = useASI ? data.heatmapASI : data.heatmapLLM;
  const activeFlows = useASI ? data.sankeyASI : data.sankeyLLM;

  const stat = useMemo(() => {
    const flowCount = activeFlows.length;
    const intersections = activeMatrix.flat().filter((v) => v > 0).length;
    const gaps = activeMatrix.flat().filter((v) => v === 0).length;
    const stageCount = data.stages.length;
    const riskCount = activeRisks.length;
    if (view === 'sankey') {
      return `${data.toolNodes.length} tools · ${flowCount} mapped flows · click ribbons to explore`;
    }
    if (view === 'network') {
      return `${data.toolNodes.length} tools · ${stageCount} stages · ${riskCount} risks · click anchors to filter`;
    }
    return `${intersections} intersections · ${gaps} coverage gaps · darkest = densest`;
  }, [view, activeFlows, activeMatrix, activeRisks, data]);

  return (
    <div className={styles.stage}>
      <TopBar
        view={view}
        setView={setView}
        scope={scope}
        setScope={setScope}
        activeCats={activeCats}
        setActiveCats={setActiveCats}
        categories={data.categories}
        toolCount={data.toolNodes.length}
        stageCount={data.stages.length}
      />

      <div className={styles.viz}>
        {view === 'sankey' && (
          <SankeyView
            stages={data.stages}
            risks={activeRisks}
            flows={activeFlows}
            categories={data.categories}
            activeCats={activeCats}
            onSelect={(sel) => setSelection(sel)}
          />
        )}
        {view === 'network' && (
          <NetworkView
            stages={data.stages}
            llmRisks={data.llmRisks}
            asiRisks={data.asiRisks}
            categories={data.categories}
            toolNodes={data.toolNodes}
            activeCats={activeCats}
            onSelect={(sel) => setSelection(sel)}
          />
        )}
        {view === 'heatmap' && (
          <HeatmapView
            stages={data.stages}
            risks={activeRisks}
            matrix={activeMatrix}
            onSelect={(sel) => setSelection(sel)}
          />
        )}

        <div className={styles.statbar}>
          <span className={styles.statbarDot} />
          {stat}
        </div>

        <SidePanel
          selection={selection}
          toolNodes={data.toolNodes}
          categories={data.categories}
          stages={data.stages}
          llmRisks={data.llmRisks}
          asiRisks={data.asiRisks}
          onClose={() => setSelection(null)}
        />
      </div>
    </div>
  );
}
