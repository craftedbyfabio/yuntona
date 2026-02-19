# Contributing to Yuntona

Thanks for your interest in contributing to the AI security index. Yuntona is a solo-curated project, but contributions from the community make it better for everyone.

## How to Suggest a Tool

The easiest way to contribute is by opening a [GitHub Issue](https://github.com/craftedbyfabio/yuntona/issues) with the label `tool-suggestion`. Include:

- **Tool name** and URL
- **Category** (pick one): AI Red Teaming, AI Governance & Standards, AI Guardrails & Firewalls, AI Development Tools, AI Code Assistants, Foundation Models, Identity & AppSec, Third-Party Risk, Compliance Automation
- **Why it belongs** — one sentence on its security relevance
- **OWASP LLM risks** it addresses (if any): LLM01–LLM10

That's enough. I'll handle the rest.

## How to Add a Tool via Pull Request

Each tool lives as a Markdown file in `tools/<category>/`. Here's the schema:

```yaml
---
name: "Tool Name"
url: "https://example.com"
category: "AI Red Teaming"
tier: "Guided Setup"            # Plug & Play | Guided Setup | Expert Required | Enterprise Only
audience: "Red Team"            # Red Team | Blue Team | Builder | All
risk: "Safe"                    # Safe | Medium | Caution | Critical
agentic: false                  # true if the tool is relevant to AI agent security
llm_risks: [LLM01, LLM02]      # Which OWASP LLM Top 10 risks it addresses
stages: [test, develop]         # LLMSecOps stages: scope, augment, develop, test, release, deploy, operate, monitor, govern
tags: [Open Source, CLI, Tool]  # 2-4 descriptive tags
---

# Tool Name

One-line description matching the card on the website.

## What It Does

One paragraph. What is this tool and how does it work?

## Security Relevance

One paragraph. Why should a security professional care about this?

## When to Use It

One paragraph. What scenario triggers reaching for this tool? What's the setup effort?
```

### Tier Definitions

| Tier | Meaning |
|------|---------|
| 🟢 Plug & Play | Get value same day. No engineering needed. Browser-based or reference material. |
| 🔵 Guided Setup | Integration work — API keys, config, CLI tools. Days to set up. |
| 🟠 Expert Required | Infrastructure, tuning, or domain expertise. Weeks of work. |
| 🟣 Enterprise Only | Procurement, legal review, org-wide commitment. |

### Steps

1. Fork the repo
2. Create your `.md` file in the right `tools/<category>/` directory
3. Use the slug format: `tool-name.md` (lowercase, hyphens)
4. Open a PR with a brief description of why this tool belongs

## Reporting Issues

- **Broken link or outdated info** → Open an issue with label `bug`
- **Feature request** → Open an issue with label `enhancement`
- **Recategorisation or tier change** → Open an issue with label `recategorise`

## Issue Labels

| Label | Use for |
|-------|---------|
| `tool-suggestion` | Suggesting a new tool to add |
| `bug` | Broken links, incorrect data, site issues |
| `enhancement` | Feature requests, UX improvements |
| `recategorise` | Tool needs a different category, tier, or risk rating |

## What Gets Accepted

Yuntona is curated, not exhaustive. Tools are included based on:

- **Relevance** to AI/LLM security (not general cybersecurity)
- **Maturity** — the tool should be usable today, not vapourware
- **Distinct value** — it should do something the existing 94+ tools don't already cover

Commercial tools are welcome alongside open-source ones. Yuntona is vendor-neutral.

## Code of Conduct

Be respectful, be constructive, assume good intent. This is a community resource for people trying to secure AI systems.
