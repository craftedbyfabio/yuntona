# Yuntona

**The builder's index for AI security** — curated tools, frameworks, and standards mapped to the OWASP LLM Top 10 and LLMSecOps lifecycle.

[![Tools](https://img.shields.io/badge/tools-95%2B-brightgreen)](https://yuntona.netlify.app)
[![Categories](https://img.shields.io/badge/categories-9-blue)](https://yuntona.netlify.app)
[![OWASP LLM](https://img.shields.io/badge/OWASP%20LLM-Top%2010-orange)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why Yuntona?

AI security is evolving fast. New tools, frameworks, and standards emerge weekly. Security teams struggle to keep up, and there's no single source of truth for what's available.

**Yuntona solves this.**

We curate and categorize AI security resources so you can find the right tool for your use case — whether you're red teaming an LLM, implementing guardrails, or building a governance framework.

---

## What's Inside

### 🔴 AI Red Teaming
Tools for adversarial testing, prompt injection, jailbreaking, and vulnerability scanning.
> Garak, Promptfoo, HarmBench, Gandalf, Adversa AI, and more.

### 🛡️ AI Guardrails & Firewalls
Runtime protection, input/output validation, and agent sandboxing.
> LLM Guard, NeMo Guardrails, LlamaFirewall, Pangea, Cisco AI Defense.

### 📜 AI Governance & Standards
Frameworks, compliance standards, and threat models.
> OWASP AI Exchange, MITRE ATLAS, ISO 42001, EU AI Act, NIST AI RMF.

### 🔧 AI Development Tools
Observability, tracing, evaluation, and orchestration.
> LangChain, Langfuse, Arize Phoenix, LlamaIndex.

### 💻 AI Code Assistants
Coding tools with security and governance implications.
> GitHub Copilot, Cursor, Continue, Tabnine, Tabby.

### 🤖 Foundation Models
LLM providers and self-hosted options.
> Ollama, Mistral, Llama, Hugging Face, DeepSeek (with risk flags).

### 🔐 Identity & AppSec
Secrets management, workload identity, and AI-native AppSec.
> GitGuardian, Noma Security, Wiz, Aembit, SPIFFE.

### 📊 Third-Party Risk
TPRM platforms with AI capabilities.
> RiskRecon, Whistic, SecurityScorecard, Vanta, Zip.

### ✅ Compliance Automation
Automated evidence collection and compliance monitoring.
> Drata, Sprinto, Scrut, Delve.

---

## Complexity Tiers

Every tool is assessed for implementation complexity:

| Tier | Description |
|------|-------------|
| 🟢 **Plug & Play** | Open a browser, click go. Minimal setup. |
| 🔵 **Guided Setup** | Some configuration needed. Documentation required. |
| 🟠 **Expert Required** | Security expertise needed. Non-trivial deployment. |
| 🟣 **Enterprise Only** | Full governance stack. Procurement process. |

---

## OWASP LLM Top 10 Mapping

Each tool is tagged with the LLM risks it addresses:

| ID | Risk |
|----|------|
| LLM01 | Prompt Injection |
| LLM02 | Insecure Output Handling |
| LLM03 | Training Data Poisoning |
| LLM04 | Model Denial of Service |
| LLM05 | Supply Chain Vulnerabilities |
| LLM06 | Sensitive Information Disclosure |
| LLM07 | Insecure Plugin Design |
| LLM08 | Excessive Agency |
| LLM09 | Overreliance |
| LLM10 | Model Theft |

---

## LLMSecOps Lifecycle

Tools are mapped to the AI security lifecycle stages:

```
Scope → Augment → Develop → Test → Release → Deploy → Operate → Monitor → Govern
```

---

## Live Index

🌐 **[yuntona.netlify.app](https://yuntona.netlify.app)**

The web interface offers:
- Full-text search
- AI-powered natural language queries
- Filtering by category, role, complexity, LLM risk, and lifecycle stage
- Airtable integration for live updates

---

## Repository Structure

```
yuntona/
├── README.md
├── CONTRIBUTING.md
├── tools/
│   ├── red-teaming/
│   │   ├── garak.md
│   │   ├── promptfoo.md
│   │   └── ...
│   ├── guardrails/
│   ├── governance/
│   ├── dev-tools/
│   ├── code-assistants/
│   ├── foundation-models/
│   ├── identity-appsec/
│   ├── tprm/
│   └── compliance/
└── scripts/
    └── sync-to-airtable.py
```

---

## Contributing

We welcome contributions! To add a tool:

1. Fork the repository
2. Create a new `.md` file in the appropriate `tools/` subdirectory
3. Use the [tool template](CONTRIBUTING.md#tool-template)
4. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Tool Entry Format

Each tool is documented in Markdown:

```markdown
# Tool Name

- **URL:** https://example.com
- **Category:** AI Red Teaming
- **Complexity:** Guided Setup
- **Audience:** Red Team | Blue Team | Builder
- **Agentic:** Yes | No

## Description

Brief description of what the tool does.

## OWASP LLM Risks

- LLM01: Prompt Injection
- LLM02: Insecure Output Handling

## Lifecycle Stages

- Test
- Monitor

## Tags

- Open Source
- CLI
- SaaS
```

---

## Roadmap

- [x] Launch curated index (95+ tools)
- [x] Web interface with filtering
- [x] OWASP LLM Top 10 mapping
- [x] Complexity tiering system
- [ ] GitHub as source of truth
- [ ] Automated sync to Airtable
- [ ] Community contributions
- [ ] Tool comparison guides
- [ ] Integration with CI/CD pipelines

---

## About

Yuntona is curated by [Fabio](https://github.com/craftedbyfabio), a cybersecurity professional specializing in Third-Party Risk Management.

Built with the conviction that AI security shouldn't require reinventing the wheel — the tools exist, they just need to be found.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [OWASP LLM Top 10](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [OWASP LLM SecOps Lifecycle](https://genai.owasp.org/resource/owasp-genai-security-project-solutions-reference-guide-q2_q325/)
- [OWASP Agentic Applications Top 10] (https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [MITRE ATLAS](https://atlas.mitre.org/)
- 

---

<p align="center">
  <strong>Crafted by Fabio</strong><br>
  <a href="https://yuntona.netlify.app">yuntona.netlify.app</a>
</p>
