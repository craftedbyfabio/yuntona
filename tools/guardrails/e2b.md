---
name: "E2B"
url: "https://e2b.dev/"
category: "AI Guardrails & Firewalls"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: true
llm_risks: [LLM02, LLM07]
stages: [operate]
tags: 
  - Sandbox
  - Agents
  - Security
---

# E2B

Sandboxed code execution for AI agents. Prevents LLM-generated code from causing damage.

## What It Does

A cloud-based sandboxed execution environment for AI-generated code. Provides isolated containers where LLM-generated code can run safely without access to the host system, network, or sensitive data.

## Security Relevance

Code generation is one of the most powerful — and dangerous — capabilities of LLM agents. E2B ensures that when an agent generates and runs code, it executes in a fully isolated environment. This prevents malicious or buggy generated code from accessing sensitive data or compromising infrastructure.

## When to Use It

Use when your AI agents generate and execute code. The SDK integrates with popular agent frameworks. Guided setup — requires API integration and environment configuration, but the sandboxing is managed for you.
