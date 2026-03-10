# Yuntona™ — The Builder's Index for AI Security

![Version](https://img.shields.io/badge/version-1.4.0-C5F227?style=flat-square)
![Tools](https://img.shields.io/badge/tools-134-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Mozilla Observatory](https://img.shields.io/badge/Mozilla_Observatory-115%2F100-brightgreen?style=flat-square)

**Yuntona™** is a curated, risk-rated index of AI security tools, frameworks, and standards — mapped to both the **OWASP LLM Top 10** (2025) and the **OWASP Agentic Top 10** (2026).

> **134 resources** · **10 categories** · **174 tags** · **20 OWASP risk mappings** (LLM01–LLM10 + ASI01–ASI10)

🔗 **Live:** [yuntona.netlify.app](https://yuntona.netlify.app)

---

## Goal

Accelerate discovery in the fragmented AI security ecosystem by providing a centralised index with risk-based assessments, OWASP mappings, complexity tiers, and an interactive knowledge graph — positioned between high-level analyst reports and unstructured GitHub awesome-lists.

## Target Audience

- **Builders** — developers integrating guardrails, sandboxes, and security APIs into AI applications
- **Blue Team** — SOC analysts and defenders monitoring AI workloads, shadow AI, and non-human identities
- **Red Team** — offensive security professionals testing LLMs, agents, and MCP-based architectures
- **CISOs & GRC Analysts** — leaders building AI governance programmes, managing third-party AI vendor risk, and mapping controls to ISO 42001, EU AI Act, and NIST AI RMF
- **Security Architects** — designing zero-trust, least-privilege architectures for agentic AI systems

**2026 focus:** Agentic AI security — MCP governance, agent identity, autonomous tool-use controls, and multi-agent threat modelling.

---

## What's Inside

Every tool card includes:

| Field | Description |
|-------|-------------|
| **Risk Rating** | Safe · Caution · Red Flag — opinionated, hand-written assessments |
| **OWASP LLM Mapping** | Which of the LLM Top 10 (2025) risks the tool addresses |
| **OWASP Agentic Mapping** | Which of the Agentic Top 10 (2026) risks the tool addresses |
| **Lifecycle Stage** | Where it fits in the LLMSecOps lifecycle (Scope → Govern → Develop → Test → Deploy → Operate → Monitor) |
| **Complexity Tier** | Plug & Play · Guided Setup · Expert Required · Enterprise Only |
| **Agentic Flag** | Whether the tool addresses agentic AI security specifically |
| **Flip-Card Detail** | Hand-written "What / Security Relevance / When to Use" — not scraped, not generated |

## Categories

| Category | Count | Examples |
|----------|-------|---------|
| AI Red Teaming | 30 | Garak, Shannon, Promptfoo, Patronus AI, HiddenLayer, deepchecks |
| AI Guardrails & Firewalls | 19 | Guardrails AI, NeMo Guardrails, LlamaFirewall, TrojAI, Lasso Security |
| AI Governance & Standards | 11 | OWASP AI Exchange, MITRE ATLAS, ISO 42001, AIUC-1, Collibra AI Governance |
| Identity & AppSec | 15 | Wiz AI-SPM, Stacklok/ToolHive, PlainID, Cerbos, Cyata, Oasis Security |
| Third-Party Risk | 14 | BitSight, SecurityScorecard, Vanta, Conveyor, Zip |
| AI Development Tools | 6 | LangChain, LlamaIndex, Langfuse, Arize Phoenix |
| AI Code Assistants | 6 | GitHub Copilot, Cursor, Continue, Tabnine, Tabby |
| Foundation Models | 6 | Ollama, Hugging Face, RiskRubric, DeepSeek |
| Education & Research | 9 | CoSAI, Lethal Trifecta, Ken Huang, AI Incident Database |
| Compliance Automation | 3 | Sprinto, Delve, Scrut |

---

## Search & Discovery

Yuntona uses **Typesense Cloud** for intelligent search:

- **Typo-tolerant** — finds results even with misspellings
- **Fuzzy matching** — handles partial queries and abbreviations
- **URL search** — paste a tool's URL to find its card instantly
- **Field-weighted ranking** — prioritises tool names and tags over descriptions
- **11 synonym groups** — maps security jargon (e.g. "tprm" → "third-party risk", "nhi" → "non-human identity")
- **Search-as-you-type autocomplete** — dropdown results after 2+ characters with keyboard navigation
- **Faceted filtering** — filter by category, risk, audience, complexity, OWASP mapping, lifecycle stage, and agentic flag

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Site | Static HTML/CSS/JS on Netlify |
| Data | `tools.json` (single source of truth) |
| Search | Typesense Cloud (typo-tolerance, synonyms, field weighting) |
| Indexing | Node.js build-time script (`scripts/index-typesense.js`) |
| Fonts | Clash Display (brand), Outfit (body), JetBrains Mono (code) |
| Security | CSP-compliant, 115/100 Mozilla Observatory |

---

## Recent Changes (v1.3.1)

### New Tools (+7)
- **HiddenLayer** — Enterprise AI security platform with discovery, supply chain (AIBOM), runtime defense, and attack simulation. Gartner Cool Vendor.
- **TrojAI** — AI security platform with Detect (red teaming), Defend (runtime firewall), and Defend for MCP (agentic workflow security). Gartner AI TRiSM vendor.
- **Patronus AI** — AI evaluation and guardrails platform with Lynx hallucination detection and LLM-as-a-Judge scoring. OWASP/NIST compliant.
- **Lasso Security** — GenAI security platform for shadow AI discovery, real-time guardrails, and data leakage prevention.
- **Credo AI** — AI governance platform for responsible AI compliance, EU AI Act readiness, and policy enforcement.
- **Vijil** — LLM security testing with automated vulnerability scanning and continuous behavioral monitoring.
- **deepchecks** — Open-source LLM evaluation and testing framework for hallucination, bias, and data integrity validation.

### Dual OWASP Framework (Schema Change)
- **`llm` field renamed to `owaspLLM`** — maps to OWASP Top 10 for LLM Applications 2025 (LLM01–LLM10)
- **New `owaspASI` field added** — maps to OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10)
- 93 of 134 tools now have owaspASI mappings
- **New UI toggle:** LLM Top 10 ↔ Agentic Top 10 filter in the filter bar

### Enriched Flip Cards
- 14 existing tool cards enriched with CB Insights AI Agent Bible data and OWASP ASI references
- Updated: Witness.ai, Zenity, Langfuse, A2A Protocol, GitHub Copilot, Cursor, E2B, Agentic Radar, CycloneDX, MAESTRO Sentinel, MCP Secure Gateway, Noma Security, LangChain, Arize Phoenix

### v1.3.1 (Feb 2026)

### New Tools (+6)
- **Shannon (Keygraph)** — Autonomous AI pentester with proof-by-exploitation, 96% XBOW success rate
- **Guardrails AI** — Open-source Python framework with the largest community validator hub (50+ validators)
- **Stacklok / ToolHive** — Enterprise MCP platform with container isolation, Sigstore verification, Cedar policies
- **Koi (Palo Alto Networks)** — Agentic Endpoint Security for AI agents, MCP servers, extensions, packages
- **CoSAI (Coalition for Secure AI)** — OASIS Open Project producing AI security frameworks (Risk Map, Agentic Principles, IR Framework)
- **Collibra AI Governance** — Enterprise AI governance with model cataloguing, lineage, EU AI Act compliance

### Updated
- **Cisco AI Runtime → Cisco AI Defense** — renamed and expanded with Feb 2026 updates (AI BOM, MCP Catalog, agentic guardrails, NeMo integration)

### Search Improvements
- URL field now searchable — paste a tool URL to find its card
- URL included in search field weighting for autocomplete and full search

### Branding
- Yuntona™ wordmark now rendered in Clash Display font (via Fontshare CDN)
- Trademark symbol (™) added to brand name

---

## Development

```bash
# Clone
git clone https://github.com/craftedbyfabio/yuntona.git
cd yuntona

# Install dependencies (for Typesense indexing)
npm install

# Re-index Typesense (requires TYPESENSE_API_KEY env var)
node scripts/index-typesense.js

# Serve locally
npx serve .
```

### Data Architecture

All tool data lives in `data/tools.json`. The indexing script reads this file, computes complexity tiers, and pushes documents to Typesense Cloud. The browser client queries Typesense directly — no backend server required.

```
data/tools.json            → Single source of truth (134 tools, owaspLLM + owaspASI fields)
scripts/index-typesense.js → Build-time indexer (Node.js)
js/typesense-search.js     → Browser search client
app.js                     → UI logic, filters, framework toggle, cards, autocomplete
graph.js                   → Knowledge graph (D3.js, LLM + ASI risk nodes)
index.html                 → Static page with inline CSS
```

---

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- Suggest a tool via [GitHub Issues](https://github.com/craftedbyfabio/yuntona/issues/new?template=tool-suggestion.md)
- Report bugs or UX issues
- Improve tool descriptions or risk assessments
- Add OWASP mappings or lifecycle stage assignments

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Yuntona™</strong> — The builder's index for AI security.<br>
  Built by <a href="https://github.com/craftedbyfabio">@craftedbyfabio</a>
</p>
