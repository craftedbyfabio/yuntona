// ─── Yuntona Site Config: Dynamic stats ───
// Hydrates elements with data-stat="tools|categories|tags|risks" with live counts.
// Also updates nav dropdown descriptions with data-stat-desc="tools".
//
// Data source priority (Supabase migration ready):
//   1. Cached stats (5min TTL) — instant
//   2. /data/stats.json — pre-computed, regenerated nightly from Supabase
//   3. /data/tools.json — legacy fallback (computes stats client-side)
//   4. Hardcoded HTML values — final fallback if everything fails
//
// Post-Supabase migration:
//   - A Supabase Edge Function (or build hook) writes /data/stats.json
//     every time tools data changes. Schema: {tools, categories, tags, risks, updated_at}
//   - This script reads stats.json directly — no client-side computation needed
//   - tools.json may still exist as a separate read-mostly export

(function(){
  'use strict';

  var CACHE_KEY = 'yuntona_stats_v2';
  var CACHE_TTL = 300000; // 5 minutes

  function inject(stats){
    document.querySelectorAll('[data-stat]').forEach(function(el){
      var key = el.getAttribute('data-stat');
      if(stats[key] !== undefined && stats[key] !== null){
        el.textContent = stats[key];
      }
    });
    document.querySelectorAll('[data-stat-desc]').forEach(function(el){
      var key = el.getAttribute('data-stat-desc');
      if(key === 'tools' && stats.tools){
        el.textContent = stats.tools + ' tools · Search & filter';
      }
    });
  }

  function cacheStats(stats){
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        stats: stats,
        ts: Date.now()
      }));
    } catch(e){}
  }

  function loadFromCache(){
    try {
      var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if(cached && Date.now() - cached.ts < CACHE_TTL){
        return cached.stats;
      }
    } catch(e){}
    return null;
  }

  // Source 1: Cache
  var cached = loadFromCache();
  if(cached){
    inject(cached);
    return;
  }

  // Source 2: /data/stats.json (preferred — Supabase-generated)
  fetch('/data/stats.json', { cache: 'no-cache' })
    .then(function(r){
      if(!r.ok) throw new Error('stats.json unavailable: HTTP ' + r.status);
      return r.json();
    })
    .then(function(stats){
      if(!stats.risks) stats.risks = 20;
      inject(stats);
      cacheStats(stats);
    })
    .catch(function(){
      // Source 3: Legacy /data/tools.json (compute client-side)
      return fetch('/data/tools.json', { cache: 'no-cache' })
        .then(function(r){
          if(!r.ok) throw new Error('tools.json unavailable: HTTP ' + r.status);
          return r.json();
        })
        .then(function(tools){
          var stats = {
            tools: tools.length,
            categories: new Set(tools.map(function(t){ return t.category; })).size,
            tags: new Set(tools.flatMap(function(t){ return t.tags || []; })).size,
            risks: 20
          };
          inject(stats);
          cacheStats(stats);
        });
    })
    .catch(function(e){
      console.warn('Site config: dynamic stats unavailable, using HTML defaults', e);
    });
})();
