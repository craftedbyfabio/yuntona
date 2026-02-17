---
name: "Medusa"
url: "https://github.com/Pantheon-Security/medusa"
category: "AI Red Teaming"
tier: "Expert Required"
audience: "Red Team"
risk: "Medium"
agentic: false
llm_risks: [LLM01, LLM02]
stages: [test]
tags: 
  - Jailbreak
  - Open Source
  - GitHub
---

# Medusa

Open-source framework for offensive AI testing and jailbreaking.

## What It Does

An open-source offensive AI testing framework from Pantheon Security. Provides a library of jailbreaking techniques, prompt injection payloads, and adversarial attack patterns against LLMs.

## Security Relevance

Medusa aggregates known attack techniques into a reusable framework, making it easier to systematically test LLM defences. Covers jailbreak methods, role-playing attacks, and encoding-based bypasses that map directly to LLM01 and LLM02.

## When to Use It

Use when you need granular control over offensive testing and want to extend or customise attack patterns. Requires Python expertise and familiarity with adversarial ML concepts. Not a point-and-click tool — this is for hands-on red teamers.
