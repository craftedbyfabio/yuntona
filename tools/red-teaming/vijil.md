---
name: "Vijil"
url: "https://www.vijil.ai/"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: false
owaspLLM: [LLM01, LLM02, LLM06]
owaspASI: [ASI01, ASI06]
stages: [test, monitor]
tags: 
  - Testing
  - Scanner
  - Vulnerability
  - API
---

# Vijil

LLM security testing — automated vulnerability scanning and continuous monitoring for AI applications.

## What It Does

LLM security testing platform that automates vulnerability scanning for AI applications. Tests for prompt injection, data leakage, jailbreaking, and output safety issues. Provides continuous monitoring to detect when AI behavior drifts from established baselines. Appears in CB Insights' AI agent tech stack Oversight layer under Observability, Evaluation, & Governance.

## Security Relevance

Fills the gap between one-time security assessments and continuous AI security monitoring. Automated scanning catches vulnerabilities that manual red teaming might miss, while continuous monitoring detects behavioral drift in production. Tests against OWASP LLM Top 10 attack vectors.

## When to Use It

Use when you need automated, repeatable security testing for LLM applications. Good complement to manual red teaming tools like Promptfoo or Garak. Integrates into CI/CD for continuous validation.
