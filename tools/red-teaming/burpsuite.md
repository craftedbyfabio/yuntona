---
name: "BurpSuite"
url: "https://portswigger.net/burp"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: false
llm_risks: [LLM02]
stages: [test, develop]
tags: 
  - Web Sec
  - Scanner
  - AppSec
---

# BurpSuite

Web vulnerability scanner — the standard for testing the web layer of AI applications.

## What It Does

PortSwigger's industry-standard web application security testing platform. Provides intercepting proxy, vulnerability scanner, and extensible testing framework for web applications.

## Security Relevance

AI applications are web applications. Every LLM-powered product has an HTTP layer that can be tested with traditional AppSec tools. BurpSuite is essential for testing the web surface of AI applications — API endpoints, authentication, session management, and the interaction layer between users and LLM backends.

## When to Use It

Use alongside AI-specific tools to test the full attack surface of LLM-powered applications. The AI-specific red teaming tools test the model layer; BurpSuite tests everything around it. Most AI security assessments should include both.
