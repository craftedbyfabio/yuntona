# Yuntona™ — The Security Index for Generative & Agentic AI

![Version](https://img.shields.io/badge/version-1.7.0-22d3ee?style=flat-square)
![Tools](https://img.shields.io/badge/tools-161-22d3ee?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Mozilla Observatory](https://img.shields.io/badge/Mozilla_Observatory-115%2F100-brightgreen?style=flat-square)

**Yuntona™** is a curated, risk-rated index of AI security tools, frameworks, and standards — mapped to both the **OWASP LLM Top 10** (2025) and the **OWASP Agentic Top 10** (2026).

> **161 tools** · **11 categories** · **233 tags** · **20 OWASP risk mappings** (LLM01–LLM10 + ASI01–ASI10)

🔗 **Live:** [yuntona.netlify.app](https://yuntona.netlify.app)
📂 **Directory:** [yuntona.netlify.app/directory](https://yuntona.netlify.app/directory)
🔗 **Knowledge Graph:** [yuntona.netlify.app/graph](https://yuntona.netlify.app/graph)
📖 **Methodology:** [yuntona.netlify.app/methodology](https://yuntona.netlify.app/methodology)

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
| AI Red Teaming | 31 | Garak, Shannon, Promptfoo, Patronus AI, HiddenLayer |
| AI Governance & Standards | 24 | OWASP AI Exchange, MITRE ATLAS, ISO 42001, IEEE CertifAIEd, Geordie AI |
| AI Guardrails & Firewalls | 24 | Guardrails AI, NeMo Guardrails, LlamaFirewall, TrojAI, Operant AI |
| Identity & AppSec | 22 | Wiz AI-SPM, Stacklok/ToolHive, Oso, Reva AI, Formal |
| Third-Party Risk | 20 | BitSight, SecurityScorecard, PromptArmor, Lema AI, Vanta |
| Education & Research | 13 | CoSAI, Lethal Trifecta, Ken Huang, AI Incident Database |
| AI Development Tools | 8 | LangChain, LlamaIndex, Langfuse, Arize Phoenix, agentregistry |
| Foundation Models | 7 | Ollama, Hugging Face, DeepSeek, Mistral AI, Llama |
| AI Code Assistants | 5 | GitHub Copilot, Cursor, Continue, Tabnine, Tabby |
| Compliance Automation | 4 | Sprinto, Delve, COMPL-AI, Scrut |
| MCP Security | 3 | Enkrypt AI MCP Security, MintMCP, Runlayer |

---

## Search & Discovery

Yuntona uses **Typesense Cloud** for intelligent search:

- **Typo-tolerant** — finds results even with misspellings
- **Fuzzy matching** — handles partial queries and abbreviations
- **URL search** — paste a tool's URL to find its card instantly
- **Field-weighted ranking** — prioritises tags (7×), tool names (6×), and editorial content (3×) over URLs
- **11 synonym groups** — maps security jargon (e.g. "tprm" → "third-party risk", "nhi" → "non-human identity")
- **Search-as-you-type autocomplete** — dropdown results after 2+ characters with keyboard navigation
- **Faceted filtering** — filter by category, risk, audience, complexity, OWASP mapping, lifecycle stage, and agentic flag
- **Deep linking** — every tool has a unique URL via hash routing (e.g. `/directory#compl-ai`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Site | Static HTML/CSS/JS on Netlify |
| Data | `tools.json` (single source of truth) |
| Search | Typesense Cloud (typo-tolerance, synonyms, field weighting) |
| Indexing | Node.js build-time script (`scripts/index-typesense.js`) |
| Fonts | Clash Display (brand), General Sans (body), JetBrains Mono (code) |
| Security | Full CSP (no unsafe-inline), CORP, SRI, external CSS/JS only |

---

## URL Structure

| URL | Content |
|-----|---------|
| `/` | Landing page |
| `/directory` | Tool directory (search, filter, browse) |
| `/graph` | Interactive knowledge graph (D3.js) |
| `/methodology` | Curation methodology |

---

## Recent Changes (v1.7.0)

### New Tools (+27 since v1.4.0)
- **PromptArmor** — AI-native TPRM platform, 26 risk vectors, Fortune 50 clients
- **HiddenLayer** — Enterprise AI security, Gartner Cool Vendor
- **TrojAI** — AI security with Detect, Defend, and Defend for MCP
- **Patronus AI** — AI evaluation with Lynx hallucination detection
- **Lasso Security** — Shadow AI discovery and real-time guardrails
- **Credo AI** — Responsible AI compliance and EU AI Act readiness
- **Vijil** — LLM security testing and continuous behavioral monitoring
- **deepchecks** — Open-source LLM evaluation for hallucination and bias
- **AARM Specification** — Open spec for runtime agent action security (arXiv)
- **MintMCP** — MCP governance platform, official Cursor partner, SOC 2 Type II
- **Raptor** — Claude Code as offensive/defensive security agent (Gadi Evron)
- **Reva AI** — Continuous adaptive authorisation for humans and AI agents
- **Operant AI** — Runtime AI security, featured in all 4 Gartner 2025 AI security guides
- **Formal** — Wire-protocol data security proxy, used by Notion/Cursor/Ramp
- **Geordie AI** — RSAC 2026 Innovation Sandbox winner, agent behavioural observability
- **Oso** — Agent security and authorisation, used by Verizon/Duolingo/Wayfair
- **Runlayer** — Enterprise MCP security, $11M seed, MCP creator as advisor
- **Lema AI** — Agentic TPRM with forensic artifact analysis and blast radius monitoring
- **MetricsLM** — AI agent trust certification, IEEE CertifAIEd aligned
- **Clawkeeper** — Runtime security for OpenClaw and Claude Code agents
- **IEEE CertifAIEd** — IEEE AI ethics certification (product mark + professional)
- **agentregistry** — Open-source registry for AI agents, MCP servers, and skills

### Visual Retheme
- Accent: lime `#c5f227` → cyan `#22d3ee`
- Background: midnight `#0b1121` → near-black `#07070a`
- Display font: Outfit → General Sans (Fontshare)
- Brand font: Clash Display (unchanged)

### Architecture Changes
- Landing page at `/`, directory moved to `/directory`
- Shared nav bar with Platform dropdown across all pages
- All CSS extracted to external files (CSP compliant — no `unsafe-inline`)
- All JS extracted to external files
- CORP header + SRI on external scripts
- Dynamic stats via `site-config.js` (auto-updates from tools.json)
- Deep linking: every tool has a unique URL (`/directory#tool-slug`)

---

## Development

```bash
# Clone
git clone https://github.com/craftedbyfabio/yuntona.git
cd yuntona

# Install dependencies (for Typesense indexing)
npm install

# Re-index Typesense (requires TYPESENSE_HOST and TYPESENSE_ADMIN_KEY env vars)
TYPESENSE_HOST=your-host TYPESENSE_ADMIN_KEY=your-key node scripts/index-typesense.js

# Serve locally
npx serve .
```

### Data Architecture

All tool data lives in `data/tools.json`. The indexing script reads this file, computes complexity tiers, and pushes documents to Typesense Cloud. The browser client queries Typesense directly — no backend server required.

```
data/tools.json              → Single source of truth (161 tools)
scripts/index-typesense.js   → Build-time indexer (Node.js)
js/typesense-search.js       → Browser search client
js/app.js                    → Directory UI logic, filters, cards, autocomplete
js/graph.js                  → Knowledge graph (D3.js)
js/site-nav.js               → Shared nav: dropdown + hamburger
js/site-config.js            → Dynamic stats injection
js/landing.js                → Landing page: tabs, toggles, FAQ, animations
css/site.css                 → Shared: variables, nav, utilities
css/landing.css              → Landing page styles
css/directory.css            → Directory page styles
css/graph.css                → Knowledge graph styles
css/methodology.css          → Methodology page styles
index.html                   → Landing page (/)
directory/index.html         → Tool directory (/directory)
graph.html                   → Knowledge graph (/graph)
methodology.html             → Methodology (/methodology)
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
  <strong>Yuntona™</strong> — The security index for generative & agentic AI.<br>
  Built by <a href="https://github.com/craftedbyfabio">@craftedbyfabio</a>
</p>
