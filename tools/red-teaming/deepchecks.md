---
name: "deepchecks"
url: "https://deepchecks.com/"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
owaspLLM: [LLM01, LLM04, LLM09]
owaspASI: [ASI01, ASI06]
stages: [test, develop]
tags: 
  - Open Source
  - Testing
  - Evaluation
  - Python
---

# deepchecks

Open-source LLM evaluation and testing — continuous validation, bias detection, and regression testing.

## What It Does

Open-source testing framework for validating AI/ML models and LLM applications. Provides pre-built test suites for data validation, model evaluation, and LLM output testing. Tests for hallucination, bias, toxicity, and data integrity issues. Python-native with CI/CD integration. Appears in CB Insights' AI agent tech stack Oversight layer.

## Security Relevance

Provides the testing layer that catches AI quality and safety issues before deployment. Pre-built checks cover common failure modes: data drift, label errors, feature importance shifts, and LLM-specific issues like hallucination and prompt sensitivity. Open-source means full transparency into what's being tested and how.

## When to Use It

Use during AI development to validate model quality and safety before deployment. Excellent for teams that want to add AI-specific testing to existing CI/CD pipelines without vendor lock-in. Python SDK integrates with Jupyter, pytest, and standard ML workflows. Open-source core with commercial cloud offering.
