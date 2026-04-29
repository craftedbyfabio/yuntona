// ─── Yuntona Site Config: Dynamic stats from tools.json ───
// Include on every page. Elements with data-stat="tools|categories|tags|risks"
// will be automatically populated with live counts from tools.json.
// Nav dropdown descriptions with data-stat-desc="tools" will also update.

(function(){
  var CACHE_KEY='yuntona_stats';
  var CACHE_TTL=300000; // 5 minutes

  function computeStats(tools){
    return {
      tools: tools.length,
      categories: new Set(tools.map(function(t){return t.category})).size,
      tags: new Set(tools.flatMap(function(t){return t.tags||[]})).size,
      risks: 20 // OWASP LLM Top 10 + Agentic Top 10 — fixed
    };
  }

  function inject(stats){
    // Update any element with data-stat attribute
    document.querySelectorAll('[data-stat]').forEach(function(el){
      var key=el.getAttribute('data-stat');
      if(stats[key]!==undefined) el.textContent=stats[key];
    });
    // Update nav dropdown descriptions like "147 tools · Search & filter"
    document.querySelectorAll('[data-stat-desc]').forEach(function(el){
      var key=el.getAttribute('data-stat-desc');
      if(key==='tools') el.textContent=stats.tools+' tools · Search & filter';
    });
  }

  // Try cache first
  try{
    var cached=JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if(cached&&Date.now()-cached.ts<CACHE_TTL){
      inject(cached.stats);
      return;
    }
  }catch(e){}

  // Fetch tools.json and compute
  fetch('/data/tools.json')
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()})
    .then(function(tools){
      var stats=computeStats(tools);
      inject(stats);
      try{sessionStorage.setItem(CACHE_KEY,JSON.stringify({stats:stats,ts:Date.now()}))}catch(e){}
    })
    .catch(function(e){
      console.warn('Site config: could not load stats',e);
    });
})();
