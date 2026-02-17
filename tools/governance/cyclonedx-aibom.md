---
name: "CycloneDX (AIBOM)"
url: "https://cyclonedx.org/"
category: "AI Governance & Standards"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM03, LLM05]
stages: [release, govern]
tags: 
  - SBOM
  - Standard
  - Open Source
---

# CycloneDX (AIBOM)

SBOM standard extended for AI/ML Bill of Materials. Critical for AI supply chain governance.

## What It Does

The CycloneDX standard extended for AI/ML Bill of Materials. Provides a structured format for documenting all components of an AI system — models, training data, hyperparameters, dependencies, and deployment configurations.

## Security Relevance

AI supply chain attacks (LLM03, LLM05) are growing as organisations consume pre-trained models, fine-tuning datasets, and ML libraries from external sources. An AIBOM provides the inventory needed to track what's in your AI stack, detect compromised components, and respond to supply chain incidents.

## When to Use It

Implement when you need formal supply chain governance for AI systems. Requires integration with CI/CD pipelines, ML training infrastructure, and model registries. Expert-level work that builds on existing SBOM practices.
