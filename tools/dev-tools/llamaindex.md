---
name: "LlamaIndex"
url: "https://www.llamaindex.ai/"
category: "AI Development Tools"
tier: "Expert Required"
audience: "Builder"
risk: "Safe"
agentic: false
llm_risks: [LLM06]
stages: [develop]
tags: 
  - RAG
  - Data
  - Framework
---

# LlamaIndex

Data framework connecting LLMs to external sources. RAG pipeline backbone — key vector for data exfiltration and injection.

## What It Does

A data framework for connecting LLMs to external data sources, primarily through Retrieval Augmented Generation (RAG) pipelines. Handles document ingestion, indexing, vector storage, and retrieval — the backbone of knowledge-grounded AI applications.

## Security Relevance

RAG pipelines are a primary vector for data exfiltration (LLM06) and injection attacks. LlamaIndex manages the pipeline that retrieves context and feeds it to the LLM — meaning it controls what data the model sees. Poisoning the index, manipulating retrieval, or extracting sensitive chunks are all real attack vectors.

## When to Use It

Study when assessing RAG-based AI applications. Using LlamaIndex to build requires data pipeline design, vector store selection, index configuration, and ongoing maintenance. Expert-level framework that underpins most enterprise RAG deployments.
