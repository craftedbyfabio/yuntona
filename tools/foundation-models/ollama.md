---
name: "Ollama"
url: "https://ollama.com/"
category: "Foundation Models"
tier: "Guided Setup"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: []
stages: [deploy]
tags: 
  - Local
  - Open Source
  - Self-Hosted
---

# Ollama

Run LLMs locally. Essential for air-gapped deployments, sovereign AI, and red team labs.

## What It Does

A tool for running LLMs locally on your own hardware. Downloads, manages, and serves open-source models with a simple CLI. Supports a wide range of models from Llama to Mistral to custom fine-tunes.

## Security Relevance

Essential infrastructure for AI security work. Running models locally means no data leaves your environment — critical for red team labs, sensitive testing, and air-gapped deployments. Also enables testing against specific model versions without API variability.

## When to Use It

Use when you need local LLM inference for testing, red teaming, or sovereign deployment. Requires local installation, sufficient hardware (RAM/GPU depending on model size), and CLI familiarity. Guided setup — the tool is straightforward but choosing the right model and hardware configuration requires some knowledge.
