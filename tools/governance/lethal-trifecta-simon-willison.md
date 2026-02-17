---
name: "Lethal Trifecta (Simon Willison)"
url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
category: "AI Governance & Standards"
tier: "Plug & Play"
audience: "All"
risk: "Safe"
agentic: true
llm_risks: [LLM01, LLM07, LLM08]
stages: [scope]
tags: 
  - Education
  - Article
  - Risk
---

# Lethal Trifecta (Simon Willison)

Essential article on Prompt Injection + Tool Use + Permissions — the core AI threat model.

## What It Does

An essential article by Simon Willison (creator of Datasette) that describes the fundamental security threat model for AI agents: the combination of Prompt Injection + Tool Use + Permissions that creates the core vulnerability pattern in agentic AI systems.

## Security Relevance

This is the conceptual framework every AI security professional should internalise. The 'Lethal Trifecta' explains why agentic AI is fundamentally dangerous: LLMs that can be manipulated (prompt injection) given the ability to act (tool use) with real permissions creates an exploitable attack surface that no single control fully mitigates.

## When to Use It

Read this as foundational education before designing security controls for any AI agent system. Share with engineering teams building agentic applications. Reference in threat models and architecture reviews. It takes 10 minutes to read and will reshape how you think about AI agent security.
