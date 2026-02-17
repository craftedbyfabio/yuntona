---
name: "Agentic Radar"
url: "https://github.com/splxai/agentic-radar"
category: "AI Red Teaming"
tier: "Guided Setup"
audience: "Red Team"
risk: "Safe"
agentic: true
llm_risks: [LLM01, LLM07]
stages: [test, develop]
tags: 
  - Agentic
  - Open Source
  - Scanner
---

# Agentic Radar

First open-source agentic security scanner. Agent scanning, red teaming, multi-agent simulation.

## What It Does

The first open-source security scanner purpose-built for agentic AI systems. Analyses agent configurations, scans for insecure tool bindings, and simulates multi-agent attack scenarios. From Splx AI.

## Security Relevance

Addresses a critical gap — most AI security tools focus on single-model interactions, but agentic systems introduce new attack surfaces: insecure tool use (LLM07), excessive agency (LLM08), and inter-agent manipulation. Agentic Radar scans for these agent-specific vulnerabilities.

## When to Use It

Use when deploying AI agents that use tools, access APIs, or interact with other agents. Essential for any MCP-based architecture or multi-agent system. Open-source and actively maintained, but requires Python setup and familiarity with agent architectures.
