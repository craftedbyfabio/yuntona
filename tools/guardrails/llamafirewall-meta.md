---
name: "LlamaFirewall (Meta)"
url: "https://ai.meta.com/research/publications/llamafirewall-an-open-source-guardrail-system-for-building-secure-ai-agents/"
category: "AI Guardrails & Firewalls"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: true
llm_risks: [LLM01, LLM07, LLM08]
stages: [operate, deploy]
tags: 
  - Firewall
  - Agents
  - Meta
  - Open Source
---

# LlamaFirewall (Meta)

Host-level firewall for LLM agents to prevent malicious tool use.

## What It Does

Meta's open-source host-level firewall designed specifically for LLM agents. Prevents malicious tool use by intercepting and validating agent actions before they execute, acting as a security enforcement layer between the LLM and its tools.

## Security Relevance

Directly addresses the Lethal Trifecta — LlamaFirewall intercepts tool calls from LLM agents and validates them against security policies before execution. This breaks the chain between prompt injection and harmful action by adding an independent validation layer that the LLM cannot bypass.

## When to Use It

Deploy when building AI agents that use tools with real-world effects (file access, API calls, database queries). Requires architectural integration — the firewall must sit between the agent and its tool layer. Expert-level deployment but essential for any agent with meaningful permissions.
