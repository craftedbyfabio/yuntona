---
name: "Hugging Face"
url: "https://huggingface.co/"
category: "Foundation Models"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM03, LLM05]
stages: [augment, develop]
tags: 
  - Models
  - Open Source
  - ML
---

# Hugging Face

The ML community hub. Key attack surface for model supply chain — poisoned models, malicious datasets.

## What It Does

The largest open-source ML community hub hosting models, datasets, and spaces. Provides model discovery, evaluation, and deployment tools. The primary distribution channel for open-source AI models.

## Security Relevance

Hugging Face is the biggest AI supply chain attack surface. Poisoned models, malicious datasets, and compromised model files are real threats (LLM03, LLM05). Anyone can upload models, and verification mechanisms are still maturing. Security teams need to understand the risks of pulling models from Hugging Face.

## When to Use It

Use for model discovery and evaluation, but implement supply chain verification before deploying any model from Hugging Face. Check model provenance, scan for malicious code in model files, and validate model behaviour before production use.
