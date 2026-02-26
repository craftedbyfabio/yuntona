# Yuntona™ — The Builder's Index for AI Security

![Version](https://img.shields.io/badge/version-1.3.1-C5F227?style=flat-square)
![Tools](https://img.shields.io/badge/tools-127-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Mozilla Observatory](https://img.shields.io/badge/Mozilla_Observatory-115%2F100-brightgreen?style=flat-square)

**Yuntona™** is a curated, risk-rated index of AI security tools, frameworks, and standards — mapped to the **OWASP LLM Top 10** and **LLMSecOps lifecycle**.

> **127 resources** · **10 categories** · **168 tags** · **10 LLM risk mappings**

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
| **OWASP LLM Mapping** | Which of the LLM Top 10 risks the tool addresses |
| **Lifecycle Stage** | Where it fits in the LLMSecOps lifecycle (Scope → Govern → Develop → Test → Deploy → Operate → Monitor) |
| **Complexity Tier** | Plug & Play · Guided Setup · Expert Required · Enterprise Only |
| **Agentic Flag** | Whether the tool addresses agentic AI security specifically |
| **Flip-Card Detail** | Hand-written "What / Security Relevance / When to Use" — not scraped, not generated |

## Categories

| Category | Count | Examples |
|----------|-------|---------|
| AI Red Teaming | 22 | Garak, Shannon, Promptfoo, MAESTRO Sentinel, Agentic Radar |
| AI Guardrails & Firewalls | 16 | Guardrails AI, NeMo Guardrails, LlamaFirewall, Koi, Ackuity |
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
data/tools.json            → Single source of truth (127 tools)
scripts/index-typesense.js → Build-time indexer (Node.js)
js/typesense-search.js     → Browser search client
app.js                     → UI logic, filters, cards, autocomplete
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
