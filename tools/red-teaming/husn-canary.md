---
name: "Husn Canary"
url: "https://www.husncanary.com"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Blue Team"
risk: "Safe"
agentic: false
llm_risks: [LLM06]
stages: [monitor, operate]
tags: 
  - Canary
  - DLP
  - Detection
---

# Husn Canary

Canary tokens designed specifically for AI model data leakage detection.

## What It Does

Canary tokens designed specifically for detecting AI model data leakage. Creates unique, trackable tokens that can be embedded in training data, documents, or knowledge bases to detect when an AI system exposes them.

## Security Relevance

Addresses LLM06 (Sensitive Information Disclosure) through detection rather than prevention. If your canary token appears in an LLM's output, you have concrete evidence that the model has been trained on or has access to your data. This is particularly valuable for detecting unauthorised training data usage.

## When to Use It

Use as a detection layer alongside guardrails. Embed canary tokens in sensitive documents before they enter RAG pipelines or training datasets. Monitor for token exposure in LLM outputs. Lightweight to deploy but requires a monitoring strategy.
