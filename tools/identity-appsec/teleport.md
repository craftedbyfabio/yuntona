---
name: "Teleport"
url: "https://goteleport.com/"
category: "Identity & AppSec"
tier: "Expert Required"
audience: "Blue Team"
risk: "Safe"
agentic: false
llm_risks: [LLM08]
stages: [deploy, monitor, govern]
tags: 
  - Zero-Trust
  - Infrastructure
  - Open Source
---

# Teleport

Infrastructure access platform extending to AI/LLM workloads. Zero-trust for AI infrastructure.

## What It Does

An infrastructure access platform providing zero-trust access to servers, Kubernetes clusters, databases, and AI/ML workloads. Uses short-lived certificates instead of static keys, with session recording and audit logging.

## Security Relevance

Provides zero-trust access to the infrastructure that AI systems run on — GPU clusters, model serving platforms, training environments, and data stores. Session recording creates audit trails for all administrative access to AI infrastructure, essential for compliance and incident investigation.

## When to Use It

Deploy when you need zero-trust infrastructure access for AI workloads. Requires deployment, certificate management, and integration with your infrastructure. Expert-level work but provides strong access governance for AI infrastructure.
