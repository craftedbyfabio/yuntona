---
name: "DeepSeek"
url: "https://www.deepseek.com/en"
category: "Foundation Models"
tier: "Expert Required"
audience: "Builder"
risk: "Critical (Red Flag)"
agentic: false
llm_risks: [LLM06]
stages: []
tags: 
  - LLM
  - Code
  - China
  - Privacy Risk
---

# DeepSeek

Chinese LLM. Strong at coding but presents significant data privacy and sovereignty risks.

## What It Does

A Chinese AI company producing high-performance LLMs, particularly strong at code generation. DeepSeek models have achieved competitive benchmarks at lower cost, making them attractive but controversial due to data sovereignty concerns.

## Security Relevance

DeepSeek presents significant data privacy and sovereignty risks. As a Chinese-headquartered company, data processed through DeepSeek's API may be subject to Chinese data access laws. The models themselves can be run locally via Ollama to mitigate API risks, but the governance decision requires careful analysis of your regulatory environment.

## When to Use It

Evaluate with extreme caution in regulated environments. If using DeepSeek models, run them locally rather than through the API. Requires a thorough governance review covering data sovereignty, regulatory compliance, and supply chain risk before any organisational adoption.
