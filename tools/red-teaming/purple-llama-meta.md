---
name: "Purple Llama (Meta)"
url: "https://ai.meta.com/blog/purple-llama-open-trust-safety-generative-ai/"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: false
llm_risks: 
  - LLM01
  - LLM02
  - LLM07
  - LLM09
stages: [test, develop]
tags: 
  - Safety
  - Eval
  - Meta
  - Open Source
---

# Purple Llama (Meta)

Open trust and safety tools for evaluating generative AI. Includes CyberSecEval benchmarks.

## What It Does

Meta's open-source trust and safety toolkit for evaluating generative AI systems. Includes CyberSecEval benchmarks for measuring LLM security, Llama Guard for content classification, and Code Shield for detecting insecure code generation.

## Security Relevance

CyberSecEval is one of the few standardised benchmarks for measuring LLM security posture. It tests for prompt injection susceptibility, insecure code generation, and cybersecurity knowledge. Llama Guard provides a practical content safety classifier that can be deployed as a guardrail layer.

## When to Use It

Use during model evaluation to benchmark security properties before deployment. CyberSecEval gives you comparable metrics across different models. Llama Guard is useful as a building block for content safety pipelines.
