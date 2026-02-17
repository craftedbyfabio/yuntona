---
name: "Llama (Meta)"
url: "https://www.llama.com/"
category: "Foundation Models"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: []
stages: []
tags: 
  - Foundation Model
  - Open Source
  - Meta
---

# Llama (Meta)

Open-source foundation models. Red teams need to understand capabilities for adversarial testing.

## What It Does

Meta's family of open-source foundation models. Available in multiple sizes (from 1B to 405B parameters) for self-hosted deployment. The most widely used open-source model family for enterprise AI.

## Security Relevance

Self-hosted Llama models provide data sovereignty — no data leaves your environment. However, self-hosting means you're responsible for the full security stack: model integrity, serving infrastructure, access controls, and monitoring. Understanding Llama's capabilities and limitations is essential for red team planning.

## When to Use It

Deploy when you need sovereign, self-hosted foundation model capabilities. Requires GPU infrastructure, model serving setup (via Ollama, vLLM, or similar), and operational expertise. Expert-level deployment but the most mature option for enterprise self-hosted AI.
