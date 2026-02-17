---
name: "LLM Guard (Protect AI)"
url: "https://protectai.com/llm-guard"
category: "AI Guardrails & Firewalls"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM01, LLM02, LLM06]
stages: [operate, deploy]
tags: 
  - Guardrails
  - Scanner
  - Open Source
---

# LLM Guard (Protect AI)

Security scanner for LLM inputs and outputs — prevents injection and data leakage.

## What It Does

An open-source security toolkit from Protect AI that scans both LLM inputs and outputs in real-time. Provides modular scanners for prompt injection detection, PII redaction, toxicity filtering, and output validation.

## Security Relevance

LLM Guard sits in the request/response path and applies security scanning at both ends. Input scanners catch injection attempts and sensitive data before it reaches the model. Output scanners detect PII leakage, toxic content, and malformed responses before they reach the user. Modular design means you deploy only the scanners you need.

## When to Use It

Use when you need runtime input/output scanning for LLM applications. Python library that integrates into your application code — requires API integration and scanner configuration but well-documented. Good starting point for teams implementing guardrails for the first time.
