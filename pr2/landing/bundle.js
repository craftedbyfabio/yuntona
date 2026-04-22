/* Yuntona landing — precompiled bundle. Source in landing/*.jsx. */
(function(){
"use strict";

/* ──────── data.jsx ──────── */
// Shared data: OWASP risks with tool counts, FAQs, featured tools.
// Pulled directly from the existing landing page so numbers stay honest.

const LLM_RISKS = [{
  id: 'LLM01',
  name: 'Prompt Injection',
  count: 53
}, {
  id: 'LLM02',
  name: 'Sensitive Info Disclosure',
  count: 46
}, {
  id: 'LLM03',
  name: 'Supply Chain Vulnerabilities',
  count: 19
}, {
  id: 'LLM04',
  name: 'Data & Model Poisoning',
  count: 13
}, {
  id: 'LLM05',
  name: 'Improper Output Handling',
  count: 18
}, {
  id: 'LLM06',
  name: 'Excessive Agency',
  count: 51
}, {
  id: 'LLM07',
  name: 'System Prompt Leakage',
  count: 41
}, {
  id: 'LLM08',
  name: 'Vector & Embedding Weaknesses',
  count: 37
}, {
  id: 'LLM09',
  name: 'Misinformation',
  count: 19
}, {
  id: 'LLM10',
  name: 'Unbounded Consumption',
  count: 8
}];
const ASI_RISKS = [{
  id: 'ASI01',
  name: 'Agent Goal Hijack',
  count: 53
}, {
  id: 'ASI02',
  name: 'Tool Misuse & Exploitation',
  count: 51
}, {
  id: 'ASI03',
  name: 'Identity & Privilege Abuse',
  count: 32
}, {
  id: 'ASI04',
  name: 'Agentic Supply Chain',
  count: 41
}, {
  id: 'ASI05',
  name: 'Unexpected Code Execution',
  count: 25
}, {
  id: 'ASI06',
  name: 'Memory & Context Poisoning',
  count: 20
}, {
  id: 'ASI07',
  name: 'Insecure Inter-Agent Comms',
  count: 26
}, {
  id: 'ASI08',
  name: 'Cascading Failures',
  count: 16
}, {
  id: 'ASI09',
  name: 'Human-Agent Trust Exploit',
  count: 16
}, {
  id: 'ASI10',
  name: 'Rogue Agents',
  count: 17
}];

// Representative tools for the hero search preview — made up from realistic
// vendors the site already name-drops (PromptArmor, HiddenLayer, Patronus AI)
// plus common AI-sec categories. Purely for visual fidelity.
const SAMPLE_TOOLS = [{
  name: 'PromptArmor',
  risks: ['LLM01', 'LLM07', 'ASI01'],
  category: 'Runtime guardrail',
  stage: 'Production'
}, {
  name: 'HiddenLayer',
  risks: ['LLM04', 'LLM03', 'ASI04'],
  category: 'Model threat defence',
  stage: 'Production'
}, {
  name: 'Patronus AI',
  risks: ['LLM02', 'LLM09', 'LLM05'],
  category: 'Evaluation',
  stage: 'Pre-prod'
}, {
  name: 'Lakera Guard',
  risks: ['LLM01', 'LLM07'],
  category: 'Runtime guardrail',
  stage: 'Production'
}, {
  name: 'Protect AI',
  risks: ['LLM03', 'LLM04'],
  category: 'Supply chain',
  stage: 'CI/CD'
}, {
  name: 'Robust Intelligence',
  risks: ['LLM04', 'LLM09', 'ASI06'],
  category: 'Evaluation',
  stage: 'Pre-prod'
}, {
  name: 'CalypsoAI',
  risks: ['LLM02', 'LLM01'],
  category: 'Runtime guardrail',
  stage: 'Production'
}, {
  name: 'NeMo Guardrails',
  risks: ['LLM01', 'LLM05', 'LLM06'],
  category: 'Runtime guardrail',
  stage: 'Production'
}];
const FAQS = [{
  q: 'What criteria gate a tool into the directory?',
  a: 'Three: (1) addresses a real risk in the generative or agentic AI stack, (2) operational or near-operational (no vaporware), (3) offers capability not already covered. Discovery from OWASP WGs, conferences, practitioner networks, primary research. Duplicates without differentiation are excluded.'
}, {
  q: 'Free? Source-available?',
  a: 'MIT licensed. No login, no paywall, no sign-up wall. Source on GitHub — fork it, audit it, open a PR.'
}, {
  q: 'How much of this is AI-generated?',
  a: 'Discovery is practitioner-led. OWASP risk mappings use LLMs as an analytical engine — the schema and methodology are human-designed, every output validated against published standards. Human-directed analysis at scale, not crowd-sourced or model-hallucinated classification.'
}, {
  q: 'Who stands behind the assessments?',
  a: 'Fabio Baumeler — CISSP, MSc Information Security (Royal Holloway, GCHQ-certified), Third-Party Cyber Risk Lead. Single-maintainer accountability — one expert\'s judgement, not vendor self-submission or crowd voting.'
}, {
  q: 'How fresh is the data?',
  a: 'Continuously updated as tools emerge and mature. Version tagged — currently v1.7.0, 161 tools. Every entry dated; re-reviewed on cadence.'
}, {
  q: 'Can I contribute?',
  a: 'Yes. Suggest a tool via GitHub issue template, report gaps, or open a PR against the YAML source. Vendor submissions welcome but held to the same evaluation bar.'
}];
Object.assign(window, {
  LLM_RISKS,
  ASI_RISKS,
  SAMPLE_TOOLS,
  FAQS
});

/* ──────── logo.jsx ──────── */
// Small Yuntona octopus+Y mark for the landing page header/footer.
// Monoline version — it holds up at small sizes better than the filled marks.

function YuntonaMark({
  size = 28,
  color = 'currentColor'
}) {
  const sw = 9;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 200 200",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "74",
    r: "38",
    fill: "none",
    stroke: color,
    strokeWidth: sw
  }), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 78 106 Q 76 134, 70 160"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 122 106 Q 124 134, 130 160"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 100 112 L 100 176"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 64 96 Q 50 108, 52 126"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 136 96 Q 150 108, 148 126"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "88",
    cy: "70",
    r: "4.5",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "112",
    cy: "70",
    r: "4.5",
    fill: color
  }));
}
Object.assign(window, {
  YuntonaMark
});

/* ──────── hero.jsx ──────── */
// Top nav + hero. Hero leans on a "command palette" motif — it's the
// interface a technical audience already lives in, and it instantly
// communicates "this is a searchable directory of 161 things".

function TopNav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(10, 14, 20, 0.92)',
      backdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none',
      color: '#f0eee9'
    }
  }, /*#__PURE__*/React.createElement(YuntonaMark, {
    size: 26,
    color: "#f0eee9"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: -0.4
    }
  }, "Yuntona"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      color: '#6b7a88',
      letterSpacing: 1,
      marginTop: 2
    }
  }, "v1.7.0")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      color: '#9aa6b2',
      fontFamily: '"Inter", sans-serif'
    }
  }, [['Directory', '/directory'], ['Graph', '/graph'], ['Methodology', '/methodology'], ['GitHub ↗', 'https://github.com/craftedbyfabio/yuntona']].map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    style: {
      color: '#c2cbd4',
      textDecoration: 'none',
      padding: '8px 14px',
      borderRadius: 6,
      transition: 'background .12s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, label))), /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 12,
      background: '#c96442',
      color: '#0a0e14',
      border: 'none',
      padding: '9px 16px',
      borderRadius: 7,
      cursor: 'pointer',
      fontWeight: 600,
      letterSpacing: 0.2,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "Search"), /*#__PURE__*/React.createElement("kbd", {
    style: {
      background: 'rgba(10,14,20,0.18)',
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: 10,
      fontFamily: 'inherit',
      color: '#0a0e14'
    }
  }, "\u2318K"))));
}

// Hero — left column is positioning + proof; right column is a live-looking
// command palette with auto-cycling queries → results.
function Hero() {
  const queries = [{
    q: 'tools for prompt injection in production',
    filter: 'risk:LLM01 stage:production',
    hits: 24
  }, {
    q: 'evaluate agentic tool misuse',
    filter: 'risk:ASI02 category:evaluation',
    hits: 11
  }, {
    q: 'supply chain scanners for model artefacts',
    filter: 'risk:LLM03 stage:ci',
    hits: 9
  }, {
    q: 'runtime guardrails with PII redaction',
    filter: 'risk:LLM02 category:runtime',
    hits: 18
  }];
  const [qi, setQi] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const current = queries[qi];

  // Typewriter loop.
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > current.q.length) {
        clearInterval(id);
        setTimeout(() => {
          setQi(v => (v + 1) % queries.length);
          setTyped('');
        }, 2800);
        return;
      }
      setTyped(current.q.slice(0, i));
    }, 38);
    return () => clearInterval(id);
  }, [qi]);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '80px 32px 72px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      maskImage: 'radial-gradient(ellipse 900px 500px at 50% 30%, black 40%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse 900px 500px at 50% 30%, black 40%, transparent 75%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1.05fr',
      gap: 72,
      alignItems: 'center',
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#7fb8aa',
      background: 'rgba(31,107,94,0.1)',
      border: '1px solid rgba(31,107,94,0.25)',
      padding: '6px 12px',
      borderRadius: 999,
      letterSpacing: 0.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: '#4ade80',
      boxShadow: '0 0 8px #4ade80'
    }
  }), /*#__PURE__*/React.createElement("span", null, "161 TOOLS \xB7 OWASP LLM + AGENTIC TOP 10 \xB7 MIT")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 68,
      lineHeight: 1.02,
      fontWeight: 500,
      letterSpacing: -2,
      color: '#f0eee9',
      margin: '26px 0 22px'
    }
  }, "Security controls", /*#__PURE__*/React.createElement("br", null), "for your ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: '#7fb8aa',
      fontFamily: '"Instrument Serif", serif',
      fontWeight: 400
    }
  }, "AI stack"), ",", /*#__PURE__*/React.createElement("br", null), "indexed by risk."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.55,
      color: '#9aa6b2',
      maxWidth: 520,
      margin: '0 0 36px'
    }
  }, "The OWASP LLM & Agentic Top 10 describe ", /*#__PURE__*/React.createElement("em", null, "what"), " can go wrong. Yuntona is the practitioner-curated map from each risk to the specific tools that address it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/directory",
    style: {
      background: '#f0eee9',
      color: '#0a0e14',
      padding: '14px 22px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: '"Inter", sans-serif'
    }
  }, "Browse directory", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      opacity: 0.6
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    href: "/graph",
    style: {
      background: 'transparent',
      color: '#c2cbd4',
      padding: '14px 22px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none',
      border: '1px solid rgba(255,255,255,0.12)',
      fontFamily: '"Inter", sans-serif'
    }
  }, "Explore knowledge graph")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 40,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#6b7a88',
      letterSpacing: 0.3
    }
  }, [['161', 'tools'], ['20', 'risks'], ['11', 'categories'], ['233', 'tags']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#f0eee9',
      fontSize: 22,
      fontFamily: 'Fraunces, serif',
      fontWeight: 500,
      letterSpacing: -0.5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      textTransform: 'uppercase'
    }
  }, l))))), /*#__PURE__*/React.createElement(HeroPalette, {
    current: current,
    typed: typed
  })));
}
function HeroPalette({
  current,
  typed
}) {
  // Hand-rolled "results" list that reacts to current query.
  const allResults = {
    'LLM01': [{
      name: 'PromptArmor',
      desc: 'Runtime prompt-injection firewall',
      tags: ['LLM01', 'LLM07'],
      stage: 'prod'
    }, {
      name: 'Lakera Guard',
      desc: 'Policy-based LLM input/output scanner',
      tags: ['LLM01', 'LLM05'],
      stage: 'prod'
    }, {
      name: 'NeMo Guardrails',
      desc: 'Programmable guardrails (Colang)',
      tags: ['LLM01', 'LLM06'],
      stage: 'prod'
    }, {
      name: 'Rebuff',
      desc: 'Self-hardening prompt injection detector',
      tags: ['LLM01'],
      stage: 'prod'
    }],
    'ASI02': [{
      name: 'Invariant Labs',
      desc: 'Agent behaviour trace analysis',
      tags: ['ASI02', 'ASI01'],
      stage: 'pre-prod'
    }, {
      name: 'Patronus AI',
      desc: 'Agentic eval harnesses',
      tags: ['ASI02', 'LLM09'],
      stage: 'pre-prod'
    }, {
      name: 'Giskard',
      desc: 'Test-suite generation for tool-using agents',
      tags: ['ASI02'],
      stage: 'pre-prod'
    }],
    'LLM03': [{
      name: 'Protect AI',
      desc: 'ModelScan + scanning for unsafe serialization',
      tags: ['LLM03', 'LLM04'],
      stage: 'ci'
    }, {
      name: 'HiddenLayer',
      desc: 'Model supply-chain threat intel',
      tags: ['LLM03'],
      stage: 'ci'
    }, {
      name: 'Snyk for AI',
      desc: 'Dependency + artefact scanning',
      tags: ['LLM03'],
      stage: 'ci'
    }],
    'LLM02': [{
      name: 'CalypsoAI',
      desc: 'PII + secret redaction at gateway',
      tags: ['LLM02', 'LLM01'],
      stage: 'prod'
    }, {
      name: 'Nightfall AI',
      desc: 'Inline DLP for LLM traffic',
      tags: ['LLM02'],
      stage: 'prod'
    }, {
      name: 'Private AI',
      desc: 'Pre-tokenisation PII removal',
      tags: ['LLM02'],
      stage: 'prod'
    }]
  };
  const risk = current.filter.match(/risk:(\w+)/)?.[1] || 'LLM01';
  const results = allResults[risk] || allResults['LLM01'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(180deg, #10161f 0%, #0c1118 100%)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 14,
      boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,100,66,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", monospace'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 14px',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 6,
      background: '#3b4252'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 6,
      background: '#3b4252'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 6,
      background: '#3b4252'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontSize: 11,
      color: '#6b7a88',
      letterSpacing: 0.5
    }
  }, "yuntona \xB7 search"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#6b7a88'
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7fb8aa'
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#f0eee9'
    }
  }, typed), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 8,
      height: 16,
      background: '#c96442',
      animation: 'ytc-blink 1s steps(2) infinite'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      gap: 6,
      fontSize: 11,
      flexWrap: 'wrap'
    }
  }, current.filter.split(' ').map(f => {
    const [k, v] = f.split(':');
    return /*#__PURE__*/React.createElement("span", {
      key: f,
      style: {
        display: 'inline-flex',
        gap: 4,
        alignItems: 'center',
        background: 'rgba(31,107,94,0.12)',
        color: '#7fb8aa',
        border: '1px solid rgba(31,107,94,0.25)',
        padding: '3px 8px',
        borderRadius: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.6
      }
    }, k), /*#__PURE__*/React.createElement("span", null, v));
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6b7a88',
      alignSelf: 'center',
      marginLeft: 'auto'
    }
  }, current.hits, " results"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 8px 12px',
      maxHeight: 360,
      overflow: 'hidden'
    }
  }, results.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr auto',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 7,
      background: i === 0 ? 'rgba(201,100,66,0.08)' : 'transparent',
      border: i === 0 ? '1px solid rgba(201,100,66,0.22)' : '1px solid transparent',
      alignItems: 'center',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6b7a88',
      fontSize: 11,
      fontVariantNumeric: 'tabular-nums'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#f0eee9',
      fontWeight: 600,
      fontSize: 13,
      fontFamily: '"Inter", sans-serif'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: '#6b7a88'
    }
  }, r.stage)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#9aa6b2',
      fontSize: 12,
      marginTop: 3,
      fontFamily: '"Inter", sans-serif'
    }
  }, r.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, r.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 10,
      color: '#c2cbd4',
      background: 'rgba(255,255,255,0.05)',
      padding: '3px 6px',
      borderRadius: 3
    }
  }, t)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 18px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      gap: 18,
      fontSize: 10,
      color: '#6b7a88'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSt
  }, "\u2191"), /*#__PURE__*/React.createElement("kbd", {
    style: kbdSt
  }, "\u2193"), " navigate"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSt
  }, "\u21B5"), " open"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSt
  }, "/"), " filter"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, "yuntona.ai")));
}
const kbdSt = {
  background: 'rgba(255,255,255,0.06)',
  padding: '1px 5px',
  borderRadius: 3,
  marginRight: 4,
  color: '#c2cbd4',
  fontFamily: 'inherit'
};
Object.assign(window, {
  TopNav,
  Hero
});

/* ──────── sections.jsx ──────── */
// Middle sections: OWASP coverage heatmap, how-it-works, positioning.

// ─────────────────────────────────────────────────────────────
// CoverageMatrix — the centerpiece. Treats the OWASP Top 10 as a
// visual heatmap. Density of the bar = number of tools. Clicking a
// cell would deep-link to the filtered directory.
// ─────────────────────────────────────────────────────────────
function CoverageMatrix() {
  const [tab, setTab] = React.useState('LLM');
  const risks = tab === 'LLM' ? LLM_RISKS : ASI_RISKS;
  const max = Math.max(...risks.map(r => r.count));
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 32px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    label: "Coverage"
  }), /*#__PURE__*/React.createElement(SectionTitle, null, "Every OWASP risk, mapped to the tools", /*#__PURE__*/React.createElement("br", null), "that ", /*#__PURE__*/React.createElement("em", {
    style: italicAccent
  }, "actually address it"), "."), /*#__PURE__*/React.createElement("p", {
    style: leadCopy
  }, "Twenty risk categories. 161 tools. Every cell below is a live filter \u2014 one click takes you to the tools that cover that specific risk."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 2,
      background: 'rgba(255,255,255,0.04)',
      padding: 4,
      borderRadius: 8,
      marginBottom: 36,
      border: '1px solid rgba(255,255,255,0.06)'
    }
  }, [['LLM', 'OWASP LLM Top 10 · 2025'], ['ASI', 'OWASP Agentic Top 10 · 2026']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      background: tab === k ? '#f0eee9' : 'transparent',
      color: tab === k ? '#0a0e14' : '#9aa6b2',
      border: 'none',
      padding: '9px 16px',
      borderRadius: 6,
      fontSize: 12,
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: tab === k ? 600 : 400,
      cursor: 'pointer',
      letterSpacing: 0.3
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.015)'
    }
  }, risks.map((r, i) => {
    const pct = r.count / max;
    return /*#__PURE__*/React.createElement("a", {
      key: r.id,
      href: `/directory?risk=${r.id}`,
      style: {
        display: 'grid',
        gridTemplateColumns: '110px 1fr 100px 80px',
        gap: 24,
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: i === risks.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
        textDecoration: 'none',
        transition: 'background .15s'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'rgba(201,100,66,0.05)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        color: '#c96442',
        letterSpacing: 1
      }
    }, r.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: '#f0eee9',
        fontFamily: '"Inter", sans-serif'
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 6,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 3,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        right: 'auto',
        width: `${pct * 100}%`,
        background: 'linear-gradient(90deg, #1f6b5e 0%, #7fb8aa 100%)',
        borderRadius: 3
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        color: '#f0eee9',
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, String(r.count).padStart(3, ' '), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#6b7a88',
        fontSize: 11
      }
    }, "tools")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#6b7a88',
      letterSpacing: 0.3,
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xB7 Counts updated 2026-04-22"), /*#__PURE__*/React.createElement("span", null, "\xB7 v1.7.0"), /*#__PURE__*/React.createElement("span", null, "\xB7 Tools may address multiple risks"))));
}

// ─────────────────────────────────────────────────────────────
// Three paths in
// ─────────────────────────────────────────────────────────────
function ThreeWaysIn() {
  const paths = [{
    n: '01',
    k: 'Filter by risk',
    d: 'Toggle between LLM Top 10 and Agentic Top 10. Pick a risk. Directory instantly filters — tools grouped by category with counts.',
    code: [['filter', 'risk:LLM01'], ['stage', 'production'], ['result', '24 tools']]
  }, {
    n: '02',
    k: 'Natural language',
    d: 'Plain English. "Tools for supply chain scanning in CI." Parser extracts filters, returns ranked results from the full directory.',
    code: [['query', '"scan models in CI"'], ['parsed', 'risk:LLM03 stage:ci'], ['result', '9 tools']]
  }, {
    n: '03',
    k: 'Explore the graph',
    d: 'Every tool, risk, and lifecycle stage as an interactive network. Click a node, see its connections. Coverage clusters and defence gaps at a glance.',
    code: [['nodes', '161 + 20 + 8'], ['edges', '642'], ['layout', 'force-directed']]
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 32px',
      background: 'linear-gradient(180deg, transparent, rgba(201,100,66,0.02))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    label: "How it works"
  }), /*#__PURE__*/React.createElement(SectionTitle, null, "Three paths from risk to tool."), /*#__PURE__*/React.createElement("p", {
    style: leadCopy
  }, "Start from whatever you already know \u2014 a specific OWASP risk, a plain-English question, or no starting point at all."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20,
      marginTop: 48
    }
  }, paths.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    style: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#c96442',
      letterSpacing: 1.5
    }
  }, p.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: -0.4,
      color: '#f0eee9',
      margin: 0,
      lineHeight: 1.15
    }
  }, p.k), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#9aa6b2',
      fontSize: 14,
      lineHeight: 1.55,
      margin: 0
    }
  }, p.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 14,
      background: '#0a0e14',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 8,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11
    }
  }, p.code.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '3px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6b7a88'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7fb8aa'
    }
  }, v)))))))));
}

// ─────────────────────────────────────────────────────────────
// Positioning — between awesome-lists & analyst reports
// ─────────────────────────────────────────────────────────────
function Positioning() {
  const cols = [{
    t: 'Awesome-lists',
    s: 'Crowd-sourced',
    rows: [['Cost', 'Free'], ['Structure', 'Flat links'], ['Risk mapping', 'None'], ['Search / filter', 'None'], ['Accountability', 'Community'], ['Freshness', 'Drift after fork']],
    dim: true
  }, {
    t: 'Yuntona',
    s: 'Practitioner-curated',
    rows: [['Cost', 'Free · MIT'], ['Structure', 'Evaluated entries'], ['Risk mapping', 'LLM + Agentic Top 10'], ['Search / filter', 'Plain English + filters'], ['Accountability', 'Named maintainer'], ['Freshness', 'Continuous']],
    dim: false
  }, {
    t: 'Analyst reports',
    s: 'Paywalled snapshots',
    rows: [['Cost', '£££'], ['Structure', 'PDF chapters'], ['Risk mapping', 'Often'], ['Search / filter', 'No'], ['Accountability', 'Institution'], ['Freshness', 'Months']],
    dim: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    label: "Where Yuntona sits"
  }), /*#__PURE__*/React.createElement(SectionTitle, null, "Between ", /*#__PURE__*/React.createElement("em", {
    style: italicAccent
  }, "awesome-lists"), " and ", /*#__PURE__*/React.createElement("em", {
    style: italicAccent
  }, "analyst reports"), "."), /*#__PURE__*/React.createElement("p", {
    style: leadCopy
  }, "Free and open like the first. Individually evaluated and structurally mapped like the second. Accountable to one named practitioner either way."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginTop: 48
    }
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      background: c.dim ? 'transparent' : 'linear-gradient(180deg, rgba(201,100,66,0.08) 0%, rgba(201,100,66,0.02) 100%)',
      border: c.dim ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(201,100,66,0.25)',
      borderRadius: 12,
      padding: '26px 24px',
      opacity: c.dim ? 0.62 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 22,
      fontWeight: 500,
      color: '#f0eee9',
      letterSpacing: -0.3
    }
  }, c.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: c.dim ? '#6b7a88' : '#c96442',
      marginTop: 4,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  }, c.s), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }
  }, c.rows.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.3fr',
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6b7a88',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      alignSelf: 'center'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.dim ? '#8593a0' : '#f0eee9'
    }
  }, v)))))))));
}

// ─────────────────────────────────────────────────────────────
// Section header primitives
// ─────────────────────────────────────────────────────────────
const italicAccent = {
  fontStyle: 'italic',
  fontFamily: '"Instrument Serif", serif',
  fontWeight: 400,
  color: '#7fb8aa'
};
const leadCopy = {
  fontSize: 17,
  lineHeight: 1.55,
  color: '#9aa6b2',
  maxWidth: 620,
  margin: '0 0 8px'
};
function SectionLabel({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#c96442',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 1,
      background: '#c96442'
    }
  }), /*#__PURE__*/React.createElement("span", null, label));
}
function SectionTitle({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 44,
      fontWeight: 500,
      letterSpacing: -1.2,
      lineHeight: 1.1,
      color: '#f0eee9',
      margin: '0 0 20px',
      maxWidth: 880
    }
  }, children);
}
Object.assign(window, {
  CoverageMatrix,
  ThreeWaysIn,
  Positioning,
  SectionLabel,
  SectionTitle
});

/* ──────── footer-faq.jsx ──────── */
// Curator, FAQ, final CTA, footer.

function Curator() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    label: "Curator"
  }), /*#__PURE__*/React.createElement(SectionTitle, null, "Single-maintainer accountability."), /*#__PURE__*/React.createElement("p", {
    style: leadCopy
  }, "Every assessment reflects one expert's informed judgement \u2014 not crowd-sourced voting, not vendor self-submission."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      padding: '36px 40px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      display: 'grid',
      gridTemplateColumns: '180px 1fr auto',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180,
      height: 180,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #1f6b5e 0%, #0d1f2d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 72,
      fontWeight: 500,
      color: '#f0eee9',
      letterSpacing: -2
    }
  }, "FB")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#c96442',
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Maintainer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 32,
      fontWeight: 500,
      color: '#f0eee9',
      letterSpacing: -0.5
    }
  }, "Fabio Baumeler"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#9aa6b2',
      fontSize: 15,
      marginTop: 6,
      marginBottom: 20
    }
  }, "Third-Party Cyber Risk Lead \xB7 UK Financial Conduct Authority"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, ['CISSP', 'MSc Info Security · Royal Holloway', 'GCHQ-certified', '10+ yrs SOC · infosec · regulation'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 11,
      fontFamily: '"JetBrains Mono", monospace',
      color: '#7fb8aa',
      background: 'rgba(31,107,94,0.1)',
      border: '1px solid rgba(31,107,94,0.25)',
      padding: '5px 10px',
      borderRadius: 4
    }
  }, t))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#c2cbd4',
      fontSize: 14,
      lineHeight: 1.6,
      margin: 0,
      maxWidth: 560
    }
  }, "Built Yuntona to close the gap between AI security frameworks and the tools that operationalise them. Every decision \u2014 inclusion, exclusion, risk mapping \u2014 traceable to one accountable reviewer.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignSelf: 'flex-start'
    }
  }, [['LinkedIn', 'https://www.linkedin.com/in/fbaumeler'], ['GitHub', 'https://github.com/craftedbyfabio'], ['Methodology', '/methodology']].map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    style: {
      fontSize: 12,
      fontFamily: '"JetBrains Mono", monospace',
      color: '#c2cbd4',
      textDecoration: 'none',
      padding: '8px 14px',
      borderRadius: 6,
      border: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
      minWidth: 120
    }
  }, l, " \u2197"))))));
}
function FAQ() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    label: "FAQ"
  }), /*#__PURE__*/React.createElement(SectionTitle, null, "Questions practitioners ask."), /*#__PURE__*/React.createElement("p", {
    style: leadCopy
  }, "Before you commit to trusting a curated list, you want to know who put it together and how."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }
  }, FAQS.map((f, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '48px 1fr 24px',
        gap: 20,
        alignItems: 'center',
        padding: '22px 4px',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#f0eee9'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        color: '#6b7a88',
        letterSpacing: 0.5
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 19,
        fontFamily: 'Fraunces, serif',
        fontWeight: 500,
        letterSpacing: -0.3
      }
    }, f.q), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#c96442',
        fontSize: 20,
        fontFamily: '"JetBrains Mono", monospace',
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform .18s'
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height .3s ease'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 4px 28px 72px',
        color: '#9aa6b2',
        fontSize: 15,
        lineHeight: 1.65,
        maxWidth: 760
      }
    }, f.a)));
  }))));
}
function FinalCTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px 32px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(201,100,66,0.08), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 32,
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(YuntonaMark, {
    size: 64,
    color: "#7fb8aa"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 56,
      fontWeight: 500,
      letterSpacing: -1.6,
      lineHeight: 1.05,
      color: '#f0eee9',
      margin: '0 0 24px'
    }
  }, "Close the blind spots", /*#__PURE__*/React.createElement("br", null), "in your ", /*#__PURE__*/React.createElement("em", {
    style: italicAccent
  }, "AI risk coverage"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: '#9aa6b2',
      lineHeight: 1.55,
      maxWidth: 560,
      margin: '0 auto 40px'
    }
  }, "161 dedicated AI security tools, frameworks and standards. 20 OWASP risks. One search."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/directory",
    style: {
      background: '#c96442',
      color: '#0a0e14',
      padding: '15px 26px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: '"Inter", sans-serif'
    }
  }, "Explore directory", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"JetBrains Mono", monospace'
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/craftedbyfabio/yuntona",
    style: {
      background: 'transparent',
      color: '#c2cbd4',
      padding: '15px 26px',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none',
      border: '1px solid rgba(255,255,255,0.15)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: '"Inter", sans-serif'
    }
  }, "\u2605 Star on GitHub")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: 'flex',
      gap: 24,
      justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: '#6b7a88',
      letterSpacing: 0.5,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "OWASP LLM Top 10 \xB7 2025"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "OWASP Agentic Top 10 \xB7 2026"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Open Source \xB7 MIT"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '48px 32px 36px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(YuntonaMark, {
    size: 24,
    color: "#f0eee9"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Fraunces, serif',
      fontSize: 18,
      color: '#f0eee9',
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, "Yuntona\u2122")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#6b7a88',
      fontSize: 13,
      lineHeight: 1.6,
      margin: 0,
      maxWidth: 320
    }
  }, "Practitioner-curated directory of AI security controls, mapped to the OWASP LLM & Agentic Top 10."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontSize: 11,
      fontFamily: '"JetBrains Mono", monospace',
      color: '#6b7a88',
      letterSpacing: 0.3
    }
  }, "Open Source \u2665 Made in the UK \uD83C\uDDEC\uD83C\uDDE7")), [{
    t: 'Platform',
    links: [['Directory', '/directory'], ['Knowledge Graph', '/graph']]
  }, {
    t: 'Resources',
    links: [['Methodology', '/methodology'], ['GitHub', 'https://github.com/craftedbyfabio/yuntona']]
  }, {
    t: 'Contribute',
    links: [['Suggest a tool', '#'], ['Report an issue', '#'], ['Star on GitHub', '#']]
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      color: '#6b7a88',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, col.t), col.links.map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    style: {
      display: 'block',
      color: '#c2cbd4',
      fontSize: 13,
      textDecoration: 'none',
      padding: '4px 0'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '36px auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      fontFamily: '"JetBrains Mono", monospace',
      color: '#6b7a88',
      letterSpacing: 0.3
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Yuntona Ltd \xB7 All rights reserved"), /*#__PURE__*/React.createElement("span", null, "v1.7.0 \xB7 161 tools \xB7 last updated 2026-04-22")));
}
Object.assign(window, {
  Curator,
  FAQ,
  FinalCTA,
  Footer
});

/* ──────── app.jsx ──────── */
// Bootstraps the landing page. Split out of index.html because the site CSP
// blocks inline <script> blocks.

const {
  TopNav,
  Hero,
  CoverageMatrix,
  ThreeWaysIn,
  Positioning,
  Curator,
  FAQ,
  FinalCTA,
  Footer
} = window;
function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopNav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(CoverageMatrix, null), /*#__PURE__*/React.createElement(ThreeWaysIn, null), /*#__PURE__*/React.createElement(Positioning, null), /*#__PURE__*/React.createElement(Curator, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));

})();
