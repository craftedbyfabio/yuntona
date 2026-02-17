# Yuntona

**The curated AI security resource index** — 95+ tools, frameworks, and standards mapped to the OWASP LLM Top 10 and LLMSecOps lifecycle.

[![Tools](https://img.shields.io/badge/tools-95%2B-brightgreen)](https://yuntona.netlify.app)
[![Categories](https://img.shields.io/badge/categories-9-blue)](https://yuntona.netlify.app)
[![OWASP LLM](https://img.shields.io/badge/OWASP%20LLM-Top%2010-orange)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Security professionals tasked with AI security face a fragmented landscape of tools, frameworks, and standards. New resources emerge weekly, and there's no single source of truth for what's available, what's mature, and what maps to which risks.

Yuntona maps 95 resources across 9 categories — filtered by OWASP LLM Top 10 risk, implementation complexity, lifecycle stage, and team role — so you can find what you need without 40 hours of research.

> 🌐 **Live index coming soon**

---

## Who Is This For?

**For CISOs** handed the "AI security" brief and building a security posture from scratch.
**For GRC analysts** mapping tools to risk frameworks and vendor assessments.
**For security architects** evaluating guardrails, firewalls, and identity solutions for AI deployments.

This isn't a developer tool directory. It's a **decision-making resource** for the people who choose what gets deployed.

---

## What's Inside

| Category | Examples | Tools |
|----------|----------|:-----:|
| 🔴 AI Red Teaming | Garak, Promptfoo, HarmBench, Adversa AI | 19 |
| 🛡️ AI Guardrails & Firewalls | LLM Guard, NeMo Guardrails, LlamaFirewall, Pangea | 10 |
| 📜 AI Governance & Standards | OWASP AI Exchange, MITRE ATLAS, ISO 42001, EU AI Act | 15 |
| 🔧 AI Development Tools | LangChain, Langfuse, Arize Phoenix, LlamaIndex | 12 |
| 💻 AI Code Assistants | GitHub Copilot, Cursor, Continue, Tabnine | 8 |
| 🤖 Foundation Models | Ollama, Mistral, Llama, Hugging Face, DeepSeek | 7 |
| 🔐 Identity & AppSec | GitGuardian, Noma Security, Wiz, Aembit, SPIFFE | 9 |
| 📊 Third-Party Risk | RiskRecon, SecurityScorecard, Vanta, Whistic | 8 |
| ✅ Compliance Automation | Drata, Sprinto, Scrut, Delve | 7 |

---

## How Resources Are Classified

### Complexity Tiers

Every tool is assessed for implementation complexity so you know what you're getting into before you evaluate:

| Tier | What It Means |
|------|---------------|
| 🟢 **Plug & Play** | Open a browser, click go. Minimal setup. |
| 🔵 **Guided Setup** | Some configuration needed. Documentation required. |
| 🟠 **Expert Required** | Security expertise needed. Non-trivial deployment. |
| 🟣 **Enterprise Only** | Full governance stack. Procurement process. |

### OWASP LLM Top 10

Each resource is tagged with the LLM risks it addresses:

| ID | Risk | ID | Risk |
|----|------|----|------|
| LLM01 | Prompt Injection | LLM06 | Sensitive Information Disclosure |
| LLM02 | Insecure Output Handling | LLM07 | Insecure Plugin Design |
| LLM03 | Training Data Poisoning | LLM08 | Excessive Agency |
| LLM04 | Model Denial of Service | LLM09 | Overreliance |
| LLM05 | Supply Chain Vulnerabilities | LLM10 | Model Theft |

### LLMSecOps Lifecycle

Resources are mapped to the stages where they apply:

```
Scope → Augment → Develop → Test → Release → Deploy → Operate → Monitor → Govern
```

---

## Live Index

The web interface - **coming soon** - will offer:

- Full-text search across all resources
- AI-powered natural language queries
- Five filter dimensions: category, role, complexity, LLM risk, and lifecycle stage
- Active filter chips with one-click removal

---

## Roadmap

- [x] Curated index with 95 resources
- [x] Web interface with multi-dimensional filtering
- [x] OWASP LLM Top 10 + lifecycle mapping
- [x] Complexity tiering system
- [ ] Individual tool profiles as Markdown files (GitHub as source of truth)
- [ ] Community contribution workflow
- [ ] Tool-vs-tool comparison guides
- [ ] Quarterly AI Security Landscape briefing
- [ ] Interactive risk assessment — "Which tools do I need?"

---

## Contributing

Contributions are welcome. To suggest a tool or framework:

1. [Open an issue](https://github.com/craftedbyfabio/yuntona/issues) with the tool name, URL, and suggested category
2. Or fork the repo and submit a pull request

Detailed contribution guidelines are coming soon.

---

## About

Yuntona is curated by [Fabio](https://github.com/craftedbyfabio), a cybersecurity professional working at the intersection of third-party risk and AI security. Built from hands-on research into the OWASP GenAI ecosystem, CoSAI, the emerging agentic security landscape, and the conviction that AI security shouldn't require reinventing the wheel — the tools exist, they just need to be found.

---

## Acknowledgments

- [OWASP LLM Top 10](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP GenAI Security Solutions Reference Guide](https://genai.owasp.org/resource/owasp-genai-security-project-solutions-reference-guide-q2_q325/)
- [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [MITRE ATLAS](https://atlas.mitre.org/)
- [CoSAI (Coalition for Secure AI)](https://github.com/cosai-oasis)
- [AWS Generative AI Security Scoping Matrix](https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/)
- [AWS Agentic AI Security Scoping Matrix](https://aws.amazon.com/ai/security/agentic-ai-scoping-matrix/)
---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Crafted by Fabio</strong><br>
  <a href="https://yuntona.netlify.app">yuntona.netlify.app</a>
</p>
