---
name: "Continue"
url: "https://www.continue.dev/"
category: "AI Code Assistants"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM06]
stages: [develop]
tags: 
  - Code
  - Open Source
  - IDE
---

# Continue

Open-source AI code assistant for VS Code and JetBrains. Self-hostable for data control.

## What It Does

An open-source AI code assistant for VS Code and JetBrains. Connects to any LLM provider (including self-hosted models) and provides code completion, chat, and editing capabilities with full control over where your code is sent.

## Security Relevance

Continue's key security advantage is model provider flexibility — you can point it at self-hosted models (via Ollama or similar) to keep all code on-premises. This makes it the strongest option for organisations with strict data sovereignty requirements where no code can leave the network.

## When to Use It

Use when data sovereignty requires self-hosted models for code assistance. Requires IDE extension setup, model provider configuration, and potentially self-hosted model infrastructure. The guided setup varies significantly depending on whether you use cloud or self-hosted models.
