---
name: "TrojAI"
url: "https://troj.ai/"
category: "AI Guardrails & Firewalls"
tier: "Enterprise Only"
audience: "Blue Team"
risk: "Safe"
agentic: true
owaspLLM: [LLM01, LLM02, LLM03, LLM06]
owaspASI: [ASI01, ASI02, ASI04, ASI07, ASI10]
stages: [test, deploy, monitor]
tags: 
  - Platform
  - MCP
  - Runtime
  - Red Team
---

# TrojAI

AI security platform — red teaming (Detect), runtime firewall (Defend), and MCP defense.

## What It Does

Three-product AI security platform. TrojAI Detect: automated red teaming with agentic and multi-turn attack simulation, including a free Red Team Report Card. TrojAI Defend: GenAI application and agent firewall for runtime threat protection. TrojAI Defend for MCP: purpose-built for securing Model Context Protocol workflows — MCP server registry, traffic monitoring, tool change detection, and policy enforcement. Gartner AI TRiSM representative vendor. CB Insights tracks 100+ Mosaic score growth.

## Security Relevance

Addresses the critical blind spot where traditional firewalls and DLP lack visibility into MCP runtime behavior. Defend for MCP discovers shadow MCP servers, registers approved instances, monitors all MCP traffic including prompts/responses, blocks connections to rogue servers, and continuously tracks tool definition changes to prevent tampering, drift, or poisoning. Also covers prompt injection, data exfiltration, and privilege escalation within agentic workflows.

## When to Use It

Deploy when securing agentic AI systems that use MCP. The Defend for MCP product is one of the first purpose-built MCP security solutions on the market. Start with the free Red Team Report Card to assess your current AI model risk posture, then evaluate Detect for build-time testing and Defend for runtime protection. Enterprise platform requiring integration planning.
