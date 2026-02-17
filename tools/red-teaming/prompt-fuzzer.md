---
name: "Prompt Fuzzer"
url: "https://github.com/prompt-security/ps-fuzz"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: false
llm_risks: [LLM01, LLM02, LLM06]
stages: [test]
tags: 
  - Fuzzing
  - Open Source
  - CLI
---

# Prompt Fuzzer

Open-source interactive prompt resilience testing tool by Prompt Security.

## What It Does

An open-source interactive prompt resilience testing tool from Prompt Security. Generates and tests adversarial inputs against LLM system prompts to evaluate their robustness against injection and manipulation attacks.

## Security Relevance

Focused specifically on system prompt resilience — testing whether an LLM's instructions can be overridden, extracted, or bypassed. This is the core of LLM01 (Prompt Injection) and one of the most common real-world attack vectors.

## When to Use It

Use when hardening system prompts before deployment. Run against your production prompts to find injection vectors, then iterate on prompt design. Quick to set up via CLI, but requires understanding of prompt injection techniques to interpret results effectively.
