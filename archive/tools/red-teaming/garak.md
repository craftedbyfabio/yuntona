---
name: "Garak"
url: "https://garak.ai/"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: false
llm_risks: 
  - LLM01
  - LLM02
  - LLM06
  - LLM09
stages: [test]
tags: 
  - Vuln Scanner
  - Open Source
  - CLI
---

# Garak

Leading open-source LLM vulnerability scanner. Probes for prompt injection, data leakage, hallucination. 1.2k GitHub stars.

## What It Does

The leading open-source LLM vulnerability scanner. Systematically probes language models for prompt injection, data leakage, hallucination, and other vulnerabilities using a library of configurable attack probes and detectors.

## Security Relevance

Garak is the closest thing to an automated vulnerability scanner for LLMs. It maps directly to the OWASP LLM Top 10, testing for prompt injection (LLM01), insecure output handling (LLM02), information disclosure (LLM06), and overreliance (LLM09). Results are structured and reportable.

## When to Use It

Use as a baseline security scan for any LLM deployment. Run it during development to catch obvious vulnerabilities, and periodically in production as models are updated. Requires Python and API access to target models, but the scan configuration is straightforward.
