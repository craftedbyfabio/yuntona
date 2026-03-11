'use strict';

/**
 * typesense-search.js
 * Lightweight Typesense client for browser-side search.
 * No external dependencies — uses fetch API only.
 *
 * Config is injected via data attributes on the script tag:
 *   <script src="js/typesense-search.js"
 *     data-host="xyz123.a1.typesense.net"
 *     data-key="YOUR_SEARCH_ONLY_KEY"
 *     data-collection="tools"></script>
 *
 * Exposes: window.typesenseSearch(query, options) → Promise<{hits, found}>
 *          window.typesenseReady → boolean
 */

(function () {
  var scriptTag = document.querySelector('script[data-host][data-key]');
  if (!scriptTag) {
    window.typesenseReady = false;
    console.warn('Typesense: no config found on script tag. Search will use fallback.');
    return;
  }

  var HOST = scriptTag.getAttribute('data-host');
  var KEY = scriptTag.getAttribute('data-key');
  var COLLECTION = scriptTag.getAttribute('data-collection') || 'tools';
  var PROTOCOL = scriptTag.getAttribute('data-protocol') || 'https';
  var PORT = scriptTag.getAttribute('data-port') || '443';

  var BASE = PROTOCOL + '://' + HOST + ':' + PORT;

  window.typesenseReady = true;

  /**
   * Search Typesense
   * @param {string} query - search query
   * @param {Object} options
   * @param {string} options.queryBy - fields to search (default: name,desc,tags,backWhat,backSecurity,backWhen,category)
   * @param {number} options.perPage - results per page (default: 12)
   * @param {string} options.filterBy - Typesense filter expression (optional)
   * @param {string} options.sortBy - sort expression (optional)
   * @returns {Promise<{hits: Array, found: number, facets: Array}>}
   */
  window.typesenseSearch = function (query, options) {
    options = options || {};
    var queryBy = options.queryBy || 'name,desc,tags,url,backWhat,backSecurity,backWhen,category';
    var perPage = options.perPage || 12;
    var filterBy = options.filterBy || '';
    var sortBy = options.sortBy || '';

    var params = [
      'q=' + encodeURIComponent(query),
      'query_by=' + encodeURIComponent(queryBy),
      'per_page=' + perPage,
      'prefix=true',
      'highlight_full_fields=name,desc',
      'highlight_start_tag=' + encodeURIComponent('<mark>'),
      'highlight_end_tag=' + encodeURIComponent('</mark>'),
      'num_typos=2',
      'typo_tokens_threshold=1',
      'drop_tokens_threshold=1',
      'split_join_tokens=fallback'
    ];

    if (options.queryByWeights) params.push('query_by_weights=' + encodeURIComponent(options.queryByWeights));

    if (filterBy) params.push('filter_by=' + encodeURIComponent(filterBy));
    if (sortBy) params.push('sort_by=' + encodeURIComponent(sortBy));

    // Request facets for category, complexity, agentic
    params.push('facet_by=category,complexity,agentic,owaspLLM,owaspASI,stages');
    params.push('max_facet_values=20');

    var url = BASE + '/collections/' + COLLECTION + '/documents/search?' + params.join('&');

    return fetch(url, {
      method: 'GET',
      headers: {
        'X-TYPESENSE-API-KEY': KEY
      }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Typesense search failed: HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        return {
          hits: (data.hits || []).map(function (h) {
            return {
              document: h.document,
              highlights: h.highlights || [],
              score: h.text_match || 0
            };
          }),
          found: data.found || 0,
          facets: data.facet_counts || []
        };
      });
  };

  /**
   * Multi-search — run multiple queries in one request
   * Useful for autocomplete + results simultaneously
   */
  window.typesenseMultiSearch = function (searches) {
    var url = BASE + '/multi_search?';

    var body = {
      searches: searches.map(function (s) {
        return {
          collection: COLLECTION,
          q: s.query || '*',
          query_by: s.queryBy || 'name,desc,tags,url',
          per_page: s.perPage || 6,
          filter_by: s.filterBy || '',
          num_typos: 2
        };
      })
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TYPESENSE-API-KEY': KEY
      },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Typesense multi_search failed: HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        return (data.results || []).map(function (r) {
          return {
            hits: (r.hits || []).map(function (h) {
              return { document: h.document, score: h.text_match || 0 };
            }),
            found: r.found || 0
          };
        });
      });
  };

  /**
   * Natural Language Search — uses Typesense's built-in NL query feature
   * Sends free-form questions to an LLM which converts them to structured
   * Typesense search parameters (filters, sorts, query terms).
   *
   * @param {string} query - natural language query
   * @param {Object} options
   * @param {string} options.nlModelId - NL model ID (default: 'yuntona-gemini')
   * @param {string} options.queryBy - fields to search
   * @param {number} options.perPage - results per page
   * @param {string} options.filterBy - additional explicit filters to combine with LLM-generated ones
   * @param {boolean} options.debug - if true, returns raw LLM response in parsed_nl_query
   * @returns {Promise<{hits, found, facets, nlParsed}>}
   */
  window.typesenseNLSearch = function (query, options) {
    options = options || {};
    var nlModelId = options.nlModelId || 'yuntona-gemini';
    var queryBy = options.queryBy || 'name,desc,tags,url,backWhat,backSecurity,backWhen,category,audience';
    var perPage = options.perPage || 12;
    var filterBy = options.filterBy || '';

    var params = [
      'q=' + encodeURIComponent(query),
      'nl_query=true',
      'nl_model_id=' + encodeURIComponent(nlModelId),
      'query_by=' + encodeURIComponent(queryBy),
      'per_page=' + perPage,
      'highlight_full_fields=name,desc',
      'highlight_start_tag=' + encodeURIComponent('<mark>'),
      'highlight_end_tag=' + encodeURIComponent('</mark>'),
      'facet_by=category,complexity,agentic,owaspLLM,owaspASI,stages',
      'max_facet_values=20'
    ];

    if (filterBy) params.push('filter_by=' + encodeURIComponent(filterBy));
    if (options.debug) params.push('nl_query_debug=true');

    var url = BASE + '/collections/' + COLLECTION + '/documents/search?' + params.join('&');

    return fetch(url, {
      method: 'GET',
      headers: {
        'X-TYPESENSE-API-KEY': KEY
      }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Typesense NL search failed: HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        return {
          hits: (data.hits || []).map(function (h) {
            return {
              document: h.document,
              highlights: h.highlights || [],
              score: h.text_match || 0
            };
          }),
          found: data.found || 0,
          facets: data.facet_counts || [],
          nlParsed: data.parsed_nl_query || null
        };
      });
  };

  /**
   * Check if NL search is available (model registered)
   * @returns {Promise<boolean>}
   */
  window.typesenseNLReady = false;

  // Probe for NL model availability on load
  (function checkNL() {
    // Do a lightweight test query to see if NL search model exists
    var testUrl = BASE + '/collections/' + COLLECTION + '/documents/search?' + [
      'q=' + encodeURIComponent('test'),
      'nl_query=true',
      'nl_model_id=yuntona-gemini',
      'query_by=name',
      'per_page=1'
    ].join('&');

    fetch(testUrl, {
      method: 'GET',
      headers: { 'X-TYPESENSE-API-KEY': KEY }
    }).then(function (res) {
      if (res.ok) {
        window.typesenseNLReady = true;
        console.log('✓ Typesense NL Search available (model: yuntona-gemini)');
      } else {
        window.typesenseNLReady = false;
        console.log('Typesense NL Search not available (model not registered)');
      }
    }).catch(function () {
      window.typesenseNLReady = false;
    });
  })();
})();
