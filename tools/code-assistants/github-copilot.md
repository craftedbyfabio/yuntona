---
name: "GitHub Copilot"
url: "https://github.com/features/copilot"
category: "AI Code Assistants"
tier: "Guided Setup"
audience: "Builder"
risk: "Medium Risk"
agentic: false
llm_risks: [LLM06]
stages: [develop]
tags: 
  - Code
  - Dev
  - Microsoft
---

# GitHub Copilot

AI coding assistant. Requires governance policy for proprietary code exposure.

## What It Does

GitHub's AI coding assistant powered by OpenAI models. Provides code completion, chat-based development, and increasingly autonomous coding capabilities within VS Code, JetBrains, and other IDEs.

## Security Relevance

The primary security concern is LLM06 (Sensitive Information Disclosure) — proprietary code, internal API patterns, and security-sensitive logic being sent to external AI models. Additionally, Copilot-generated code may contain vulnerabilities that developers accept without review. Governance policies are essential.

## When to Use It

If your organisation uses Copilot, ensure governance policies cover data classification (what code can be sent to the model), code review requirements for AI-generated code, and enterprise configuration to limit data exposure. Requires org-level admin setup beyond individual installation.
