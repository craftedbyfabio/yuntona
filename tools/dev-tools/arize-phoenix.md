---
name: "Arize Phoenix"
url: "https://arize.com/phoenix/"
category: "AI Development Tools"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM09]
stages: [monitor]
tags: 
  - Observability
  - Evals
  - Open Source
---

# Arize Phoenix

Open-source LLM tracing, evaluation, and hallucination detection platform.

## What It Does

An open-source LLM tracing, evaluation, and hallucination detection platform. Provides detailed traces of LLM interactions with built-in evaluation frameworks for measuring output quality, relevance, and factual accuracy.

## Security Relevance

Hallucination detection is a security concern — LLM09 (Overreliance) becomes dangerous when models generate confident but incorrect information that users trust. Arize Phoenix's evaluation framework helps quantify hallucination rates and identify patterns in unreliable outputs.

## When to Use It

Use when you need to measure and monitor LLM output quality, particularly hallucination rates. Python-based with straightforward integration. Guided setup — install, instrument your application, configure evaluations.
