const catColors = {
  'AI Red Teaming':'#ef4444','AI Governance & Standards':'#eab308',
  'AI Guardrails & Firewalls':'#22c55e','AI Development Tools':'#06b6d4',
  'AI Code Assistants':'#ec4899','Foundation Models':'#a855f7',
  'Identity & AppSec':'#3b82f6','Third-Party Risk':'#f97316',
  'Compliance Automation':'#14b8a6','Education & Research':'#a78bfa'
};

const riskLabels = {
  LLM01:'Prompt Injection',LLM02:'Insecure Output',LLM03:'Training Data Poisoning',
  LLM04:'Model DoS',LLM05:'Supply Chain Vulns',LLM06:'Sensitive Info Disclosure',
  LLM07:'Insecure Plugin Design',LLM08:'Excessive Agency',LLM09:'Overreliance',LLM10:'Model Theft'
};

const stageLabels = {
  scope:'Scope & Plan',augment:'Augment',develop:'Develop',test:'Test',
  release:'Release',deploy:'Deploy',operate:'Operate',monitor:'Monitor',govern:'Govern'
};

function buildGraph(tools) {
  const nodes = [], links = [], nodeMap = new Map();

  Object.keys(riskLabels).forEach(id => {
    const n = { id, label: id, fullLabel: riskLabels[id], type:'risk', color:'#ef4444' };
    nodes.push(n); nodeMap.set(id, n);
  });

  Object.keys(stageLabels).forEach(id => {
    const sid = 'stage-'+id;
    const n = { id:sid, label: stageLabels[id], type:'stage', color:'#06b6d4' };
    nodes.push(n); nodeMap.set(sid, n);
  });

  tools.forEach((t, i) => {
    const id = 'tool-'+i;
    const n = {
      id, label:t.name, type:'tool', color: catColors[t.category]||'#c5f227',
      category:t.category, desc:t.desc, tags:t.tags||[], url:t.url,
      risks:t.llm||[], stages:t.stages||[], agentic:t.agentic
    };
    nodes.push(n); nodeMap.set(id, n);

    (t.llm||[]).forEach(r => { if(nodeMap.has(r)) links.push({source:id,target:r,type:'risk'}); });
    (t.stages||[]).forEach(s => { const sid='stage-'+s; if(nodeMap.has(sid)) links.push({source:id,target:sid,type:'stage'}); });
  });

  return { nodes, links };
}

function render(tools) {
  const { nodes, links } = buildGraph(tools);
  const toolNodes = nodes.filter(n => n.type==='tool');

  document.getElementById('nodeCount').textContent = nodes.length;
  document.getElementById('edgeCount').textContent = links.length;
  document.getElementById('toolCount').textContent = toolNodes.length;

  // Category filter buttons
  const cats = [...new Set(toolNodes.map(n => n.category))].sort();
  const catEl = document.getElementById('catFilters');
  catEl.innerHTML = '<button class="ctrl-btn active" data-cat="all">All</button>' +
    cats.map(c => `<button class="ctrl-btn" data-cat="${c}">${c.replace('AI ','').replace('& ','')}</button>`).join('');

  const W = window.innerWidth, H = window.innerHeight;
  const svg = d3.select('#graph').attr('width',W).attr('height',H);
  svg.selectAll('*').remove();

  // Glow filters
  const defs = svg.append('defs');
  ['glow','strongGlow'].forEach((name,i) => {
    const f = defs.append('filter').attr('id',name);
    f.append('feGaussianBlur').attr('stdDeviation', i===0?3:6).attr('result','blur');
    const merge = f.append('feMerge');
    merge.append('feMergeNode').attr('in','blur');
    merge.append('feMergeNode').attr('in','SourceGraphic');
  });

  const container = svg.append('g');
  const zoomBehavior = d3.zoom().scaleExtent([0.15,5]).on('zoom', e => container.attr('transform',e.transform));
  svg.call(zoomBehavior);

  // Simulation
  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d=>d.id).distance(d => d.type==='risk'?130:110).strength(0.25))
    .force('charge', d3.forceManyBody().strength(d => d.type==='risk'?-500:d.type==='stage'?-400:-120))
    .force('center', d3.forceCenter(W/2,H/2))
    .force('collision', d3.forceCollide().radius(d => d.type==='risk'?32:d.type==='stage'?28:12))
    .force('x', d3.forceX(W/2).strength(0.025))
    .force('y', d3.forceY(H/2).strength(0.025));

  // Links
  const link = container.append('g').selectAll('line').data(links).enter().append('line')
    .attr('stroke', d => d.type==='risk'?'rgba(239,68,68,.1)':'rgba(6,182,212,.1)')
    .attr('stroke-width', 0.6);

  // Nodes
  const node = container.append('g').selectAll('g').data(nodes).enter().append('g')
    .attr('cursor','pointer')
    .call(d3.drag().on('start',(e,d)=>{if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y})
      .on('drag',(e,d)=>{d.fx=e.x;d.fy=e.y})
      .on('end',(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null}));

  // Risk nodes
  node.filter(d=>d.type==='risk').append('circle').attr('r',24)
    .attr('fill','rgba(239,68,68,.06)').attr('stroke','#ef4444').attr('stroke-width',2).attr('filter','url(#glow)');
  node.filter(d=>d.type==='risk').append('text').text(d=>d.label)
    .attr('text-anchor','middle').attr('dy','.35em')
    .attr('font-size','8px').attr('font-weight','700').attr('font-family','JetBrains Mono,monospace').attr('fill','#ef4444');

  // Stage nodes
  node.filter(d=>d.type==='stage').append('circle').attr('r',22)
    .attr('fill','rgba(6,182,212,.06)').attr('stroke','#06b6d4').attr('stroke-width',2).attr('filter','url(#glow)');
  node.filter(d=>d.type==='stage').append('text').text(d=>d.label)
    .attr('text-anchor','middle').attr('dy','.35em')
    .attr('font-size','6px').attr('font-weight','600').attr('font-family','Outfit,system-ui').attr('fill','#06b6d4');

  // Tool nodes
  node.filter(d=>d.type==='tool').append('circle')
    .attr('r', d=>d.agentic?7:5)
    .attr('fill',d=>d.color).attr('fill-opacity',.65)
    .attr('stroke',d=>d.color).attr('stroke-width',d=>d.agentic?1.5:.5).attr('stroke-opacity',.35);

  // Tool labels (hidden by default)
  node.filter(d=>d.type==='tool').append('text')
    .text(d=>d.label.length>22?d.label.slice(0,20)+'…':d.label)
    .attr('x',10).attr('dy','.35em').attr('font-size','6px')
    .attr('font-family','Outfit,system-ui').attr('fill',d=>d.color)
    .attr('fill-opacity',0).attr('class','tool-label');

  // Tooltip
  const tt = document.getElementById('tooltip');

  node.on('mouseover',(event,d) => {
    if(d.type==='tool'){
      tt.innerHTML=`<div class="tt-name">${d.label}</div><div class="tt-cat">${d.category}</div>
        <div class="tt-desc">${d.desc}</div><div style="font-size:.6rem;color:#4e6283;margin-top:4px">Double-click to visit ↗</div><div class="tt-badges">
        ${d.risks.map(r=>`<span class="tt-risk">${r}</span>`).join('')}
        ${d.stages.map(s=>`<span class="tt-stage">${stageLabels[s]||s}</span>`).join('')}
        ${d.tags.slice(0,4).map(t=>`<span class="tt-tag">${t}</span>`).join('')}</div>`;
    } else if(d.type==='risk'){
      const ct=links.filter(l=>(l.target.id||l.target)===d.id||(l.source.id||l.source)===d.id).length;
      tt.innerHTML=`<div class="tt-name">${d.label} — ${d.fullLabel}</div><div class="tt-desc">OWASP LLM Top 10 risk. Connected to ${ct} tools.</div>`;
    } else {
      const ct=links.filter(l=>(l.target.id||l.target)===d.id||(l.source.id||l.source)===d.id).length;
      tt.innerHTML=`<div class="tt-name">${d.label}</div><div class="tt-desc">LLMSecOps lifecycle stage. Connected to ${ct} tools.</div>`;
    }
    tt.classList.add('visible');

    // Show label on hover for tools
    if(d.type==='tool') d3.select(event.currentTarget).select('.tool-label').transition().duration(150).attr('fill-opacity',.9);
  })
  .on('mousemove',(event)=>{
    let x=event.clientX+15,y=event.clientY-10;
    if(x+320>window.innerWidth) x=event.clientX-330;
    if(y+200>window.innerHeight) y=event.clientY-200;
    tt.style.left=x+'px'; tt.style.top=y+'px';
  })
  .on('mouseout',(event,d)=>{
    tt.classList.remove('visible');
    if(d.type==='tool' && !selectedNode) d3.select(event.currentTarget).select('.tool-label').transition().duration(150).attr('fill-opacity',0);
  });

  // Click highlight
  let selectedNode = null;

  node.on('click',(event,d)=>{
    event.stopPropagation();
    if(selectedNode===d.id){ resetHL(); return; }
    selectedNode=d.id;

    const conn=new Set([d.id]);
    links.forEach(l=>{
      const s=l.source.id||l.source, t=l.target.id||l.target;
      if(s===d.id)conn.add(t); if(t===d.id)conn.add(s);
    });

    node.select('circle').transition().duration(300)
      .attr('fill-opacity',n=>conn.has(n.id)?(n.type==='tool'?.9:undefined):.04)
      .attr('stroke-opacity',n=>conn.has(n.id)?1:.04);

    node.selectAll('.tool-label').transition().duration(300)
      .attr('fill-opacity',n=>conn.has(n.id)?.85:0);

    node.filter(n=>n.type!=='tool').select('text').transition().duration(300)
      .attr('fill-opacity',n=>conn.has(n.id)?1:.08);

    link.transition().duration(300)
      .attr('stroke',l=>{
        const s=l.source.id,t=l.target.id;
        if(conn.has(s)&&conn.has(t)) return l.type==='risk'?'rgba(239,68,68,.55)':'rgba(6,182,212,.55)';
        return 'rgba(255,255,255,.015)';
      })
      .attr('stroke-width',l=>{
        const s=l.source.id,t=l.target.id;
        return(conn.has(s)&&conn.has(t))?2:.3;
      });

    d3.select(event.currentTarget).select('circle').transition().duration(300)
      .attr('filter','url(#strongGlow)').attr('stroke-width',3);
  });

  // Double-click tool node to open URL
  node.on('dblclick',(event,d)=>{
    event.stopPropagation();
    if(d.type==='tool'&&d.url){window.open(d.url,'_blank','noopener')}
  });

  svg.on('click', resetHL);

  function resetHL(){
    selectedNode=null;
    node.select('circle').transition().duration(300)
      .attr('fill-opacity',d=>d.type==='tool'?.65:undefined)
      .attr('stroke-opacity',d=>d.type==='tool'?.35:undefined)
      .attr('filter',d=>(d.type==='risk'||d.type==='stage')?'url(#glow)':null)
      .attr('stroke-width',d=>d.type==='risk'||d.type==='stage'?2:d.agentic?1.5:.5);
    node.selectAll('.tool-label').transition().duration(300).attr('fill-opacity',0);
    node.filter(d=>d.type!=='tool').select('text').transition().duration(300).attr('fill-opacity',1);
    link.transition().duration(300)
      .attr('stroke',d=>d.type==='risk'?'rgba(239,68,68,.1)':'rgba(6,182,212,.1)')
      .attr('stroke-width',.6);
  }

  // Tick
  sim.on('tick',()=>{
    link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    node.attr('transform',d=>`translate(${d.x},${d.y})`);
  });

  // View filters
  document.querySelectorAll('[data-view]').forEach(btn=>{
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      const v=this.dataset.view;
      resetHL();
      if(v==='all'){
        node.transition().duration(400).attr('opacity',1);
        link.transition().duration(400).attr('opacity',1);
      } else if(v==='risks'){
        node.transition().duration(400).attr('opacity',d=>{
          if(d.type==='risk')return 1; if(d.type==='stage')return .04;
          return d.risks&&d.risks.length>0?.75:.04;
        });
        link.transition().duration(400).attr('opacity',d=>d.type==='risk'?1:.02);
      } else {
        node.transition().duration(400).attr('opacity',d=>{
          if(d.type==='stage')return 1; if(d.type==='risk')return .04;
          return d.stages&&d.stages.length>0?.75:.04;
        });
        link.transition().duration(400).attr('opacity',d=>d.type==='stage'?1:.02);
      }
    });
  });

  // Category filter
  catEl.addEventListener('click',e=>{
    const btn=e.target.closest('[data-cat]'); if(!btn)return;
    catEl.querySelectorAll('.ctrl-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat=btn.dataset.cat;
    resetHL();
    if(cat==='all'){
      node.transition().duration(400).attr('opacity',1);
      link.transition().duration(400).attr('opacity',1);
    } else {
      const toolIds=new Set(), conn=new Set();
      nodes.forEach(n=>{ if(n.type==='tool'&&n.category===cat){ toolIds.add(n.id); conn.add(n.id); }});
      links.forEach(l=>{
        const s=l.source.id||l.source,t=l.target.id||l.target;
        if(toolIds.has(s))conn.add(t); if(toolIds.has(t))conn.add(s);
      });
      node.transition().duration(400).attr('opacity',d=>conn.has(d.id)?1:.03);
      link.transition().duration(400).attr('opacity',l=>{
        const s=l.source.id||l.source,t=l.target.id||l.target;
        return(toolIds.has(s)||toolIds.has(t))?.7:.015;
      });
    }
  });

  // Reset
  document.getElementById('resetBtn').addEventListener('click',()=>{
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));
    document.querySelector('[data-view="all"]').classList.add('active');
    catEl.querySelectorAll('.ctrl-btn').forEach(b=>b.classList.remove('active'));
    catEl.querySelector('[data-cat="all"]').classList.add('active');
    resetHL();
    node.transition().duration(400).attr('opacity',1);
    link.transition().duration(400).attr('opacity',1);
    svg.transition().duration(600).call(zoomBehavior.transform,
      d3.zoomIdentity.translate(W/2,H/2).scale(.7).translate(-W/2,-H/2));
  });

  // Initial fit
  setTimeout(()=>{
    svg.transition().duration(1000).call(zoomBehavior.transform,
      d3.zoomIdentity.translate(W/2,H/2).scale(.7).translate(-W/2,-H/2));
  },600);

  // Resize
  window.addEventListener('resize',()=>{
    const w=window.innerWidth,h=window.innerHeight;
    svg.attr('width',w).attr('height',h);
    sim.force('center',d3.forceCenter(w/2,h/2)).alpha(.1).restart();
  });
}

// Load data from app.js
fetch('data/tools.json')
  .then(function(r){
    if(!r.ok)throw new Error('HTTP '+r.status+' fetching data/tools.json');
    return r.json();
  })
  .then(function(tools){
    render(tools);
  })
  .catch(function(err){
    console.error(err);
    document.body.innerHTML='<div style="padding:40px;color:#ef4444;font-family:monospace">'+err.message+'</div>';
  });

// View switcher (three dots nav)
(function(){
  var btn=document.getElementById('viewSwitchBtn'),menu=document.getElementById('viewSwitchMenu');
  if(!btn||!menu)return;
  btn.addEventListener('click',function(e){e.stopPropagation();var open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',open)});
  menu.addEventListener('click',function(e){e.stopPropagation()});
  document.addEventListener('click',function(e){if(!e.target.closest('.view-switch')){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
})();
