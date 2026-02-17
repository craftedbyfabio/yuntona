---
name: "Promptfoo"
url: "https://www.promptfoo.dev/"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM01, LLM02, LLM06]
stages: [test, develop]
tags: 
  - Testing
  - CLI
  - Dev
  - Open Source
---

# Promptfoo

CLI tool for testing, red teaming, and evaluating LLM prompts. Extensible with custom plugins.

## What It Does

A CLI tool for testing, evaluating, and red teaming LLM prompts. Supports custom test suites in YAML, automated red teaming with plugin-based attack generation, and side-by-side model comparison. Extensible with custom plugins and assertions.

## Security Relevance

Promptfoo bridges the gap between development-time testing and security evaluation. Its red teaming mode generates adversarial inputs automatically, while its evaluation framework lets you define security-specific assertions (no PII leakage, no jailbreak success, output format compliance).

## When to Use It

Use as part of your CI/CD pipeline to catch prompt injection vulnerabilities and output safety issues before deployment. Excellent for teams that want to shift security testing left without building custom tooling. The YAML-based config makes it accessible to security engineers who aren't ML specialists.
