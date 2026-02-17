---
name: "SpiceDB"
url: "https://authzed.com/spicedb"
category: "Identity & AppSec"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: true
llm_risks: [LLM01, LLM07, LLM08]
stages: [scope, develop]
tags: 
  - AuthZ
  - Open Source
  - Permissions
---

# SpiceDB

Google Zanzibar-inspired fine-grained authorization database. 5.3k GitHub stars. Essential for AI app permissions.

## What It Does

A Google Zanzibar-inspired fine-grained authorisation database. Provides relationship-based access control (ReBAC) that scales to billions of relationships, with schema versioning and consistency guarantees. 5.3k+ GitHub stars.

## Security Relevance

AI applications need authorisation that traditional RBAC can't provide — per-document access in RAG pipelines, per-tool permissions for agents, and context-dependent access decisions. SpiceDB's relationship-based model maps naturally to these AI-specific authorisation patterns.

## When to Use It

Implement when you need fine-grained authorisation for AI applications, particularly RAG systems with document-level access control or agent systems with tool-level permissions. Expert-level work requiring schema design, deployment, and application integration.
