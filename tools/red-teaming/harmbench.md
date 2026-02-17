---
name: "HarmBench"
url: "https://www.harmbench.org/"
category: "AI Red Teaming"
tier: "Expert Required"
audience: "Red Team"
risk: "Safe"
agentic: false
llm_risks: 
  - LLM01
  - LLM02
  - LLM03
  - LLM06
  - LLM09
stages: [test]
tags: 
  - Benchmark
  - Open Source
  - Eval
---

# HarmBench

Automated red teaming and robust refusal evaluation framework. Academic benchmark for adversarial robustness.

## What It Does

An academic benchmark framework for evaluating adversarial robustness of language models. Provides standardised evaluation of both attack methods and defence mechanisms, with automated red teaming capabilities across multiple attack vectors.

## Security Relevance

HarmBench offers the most rigorous academic evaluation of LLM safety. It tests models against a curated set of harmful behaviours and measures both the success rate of attacks and the robustness of refusals. Useful for comparing model safety properties before procurement decisions.

## When to Use It

Use when you need academic-grade evaluation of model robustness, particularly for model selection decisions. Requires GPU infrastructure, model loading expertise, and familiarity with evaluation pipelines. Not a quick scan — this is deep evaluation work.
