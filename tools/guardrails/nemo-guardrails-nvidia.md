---
name: "NeMo Guardrails (NVIDIA)"
url: "https://developer.nvidia.com/nemo-guardrails"
category: "AI Guardrails & Firewalls"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM01, LLM02]
stages: [operate, deploy]
tags: 
  - Guardrails
  - NVIDIA
  - Open Source
---

# NeMo Guardrails (NVIDIA)

Toolkit for adding programmable guardrails to LLM-based systems.

## What It Does

NVIDIA's open-source toolkit for adding programmable guardrails to LLM-based systems. Uses Colang — a custom modelling language — to define conversational rails that control what the LLM can and cannot do.

## Security Relevance

NeMo Guardrails provides deep, programmable control over LLM behaviour. Unlike pattern-matching filters, Colang rails can implement complex conversational policies: topic restrictions, fact-checking flows, and multi-turn safety checks. This granularity is essential for high-stakes applications.

## When to Use It

Use when you need fine-grained control over LLM behaviour beyond simple input/output filtering. Requires learning Colang, designing rail policies, and integrating with your LLM pipeline. Expert-level work but provides the most customisable guardrail system available.
