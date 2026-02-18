const TL=['Plug & Play','Guided Setup','Expert Required','Enterprise Only'],TK=['plug-and-play','guided-setup','expert-required','enterprise-only'];

// --- YOUR DATA ---
const R=[
{name:"Gandalf (Lakera)",url:"https://gandalf.lakera.ai/agent-breaker",category:"AI Red Teaming",desc:"The world's most popular AI red teaming game. Learn prompt injection by doing it.",riskRaw:"Safe",audience:"Red Team",tags:["Training","Game","Injection"],llm:[],stages:["test"],agentic:false,backWhat:"An interactive browser game created by Lakera that teaches prompt injection through hands-on challenges.",backSecurity:"Builds intuition for how LLMs can be manipulated.",backWhen:"Use as a training exercise for security teams new to AI threats."},
{name:"HexStrike",url:"https://www.hexstrike.com/",category:"AI Red Teaming",desc:"Advanced AI red teaming platform for LLM vulnerabilities.",riskRaw:"Medium",audience:"Red Team",tags:["Pentesting","SaaS","Platform"],llm:["LLM01","LLM02","LLM06"],stages:["test"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Medusa",url:"https://github.com/Pantheon-Security/medusa",category:"AI Red Teaming",desc:"Open-source framework for offensive AI testing and jailbreaking.",riskRaw:"Medium",audience:"Red Team",tags:["Jailbreak","Open Source","GitHub"],llm:["LLM01","LLM02"],stages:["test"],agentic:false,complexityOverride:"Expert Required"},
{name:"BlackIce (Databricks)",url:"https://www.databricks.com/blog/announcing-blackice-containerized-red-teaming-toolkit-ai-security-testing",category:"AI Red Teaming",desc:"Containerized red teaming toolkit for AI security testing.",riskRaw:"Medium",audience:"Red Team",tags:["Container","Pentesting","Tool"],llm:["LLM01","LLM02","LLM06"],stages:["test"],agentic:false,complexityOverride:"Expert Required"},
{name:"Purple Llama (Meta)",url:"https://ai.meta.com/blog/purple-llama-open-trust-safety-generative-ai/",category:"AI Red Teaming",desc:"Open trust and safety tools for evaluating generative AI.",riskRaw:"Safe",audience:"Red Team",tags:["Safety","Eval","Meta","Open Source"],llm:["LLM01","LLM02","LLM07","LLM09"],stages:["test","develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Promptfoo",url:"https://www.promptfoo.dev/",category:"AI Red Teaming",desc:"CLI tool for testing, red teaming, and evaluating LLM prompts.",riskRaw:"Safe",audience:"Builder",tags:["Testing","CLI","Dev","Open Source"],llm:["LLM01","LLM02","LLM06"],stages:["test","develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"AIVSS",url:"https://aivss.parthsohaney.online/",category:"AI Red Teaming",desc:"AI Vulnerability Scoring System for standardised AI risk rating.",riskRaw:"Safe",audience:"Red Team",tags:["Framework","Scoring","Risk"],llm:[],stages:["scope"],agentic:false},
{name:"Arcanum Security Context",url:"https://arcanum-sec.github.io/sec-context/",category:"AI Red Teaming",desc:"Security context and research repository for AI vulnerabilities.",riskRaw:"Safe",audience:"Red Team",tags:["Research","Docs","Reference"],llm:[],stages:["scope"],agentic:false},
{name:"XM Cyber",url:"https://www.xmcyber.com/",category:"AI Red Teaming",desc:"Breach and Attack Simulation — maps attack paths across hybrid infrastructure.",riskRaw:"Safe",audience:"Red Team",tags:["BAS","Simulation","Cloud"],llm:[],stages:["test","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"GoPhish",url:"https://getgophish.com/",category:"AI Red Teaming",desc:"Open-source phishing toolkit. Relevant for testing AI-generated phishing campaigns.",riskRaw:"Caution (Offensive)",audience:"Red Team",tags:["Phishing","Social Engineering","Testing"],llm:[],stages:["test"],agentic:false,complexityOverride:"Expert Required"},
{name:"BurpSuite",url:"https://portswigger.net/burp",category:"AI Red Teaming",desc:"Web vulnerability scanner — the standard for testing the web layer of AI applications.",riskRaw:"Safe",audience:"Red Team",tags:["Web Sec","Scanner","AppSec"],llm:["LLM02"],stages:["test","develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Husn Canary",url:"https://www.husncanary.com",category:"AI Red Teaming",desc:"Canary tokens designed specifically for AI model data leakage detection.",riskRaw:"Safe",audience:"Blue Team",tags:["Canary","DLP","Detection"],llm:["LLM06"],stages:["monitor","operate"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Garak",url:"https://garak.ai/",category:"AI Red Teaming",desc:"Leading open-source LLM vulnerability scanner.",riskRaw:"Safe",audience:"Red Team",tags:["Vuln Scanner","Open Source","CLI"],llm:["LLM01","LLM02","LLM06","LLM09"],stages:["test"],agentic:false,complexityOverride:"Guided Setup"},
{name:"HarmBench",url:"https://www.harmbench.org/",category:"AI Red Teaming",desc:"Automated red teaming and robust refusal evaluation framework.",riskRaw:"Safe",audience:"Red Team",tags:["Benchmark","Open Source","Eval"],llm:["LLM01","LLM02","LLM03","LLM06","LLM09"],stages:["test"],agentic:false,complexityOverride:"Expert Required"},
{name:"Giskard",url:"https://www.giskard.ai/",category:"AI Red Teaming",desc:"Open-source LLM testing for vulnerabilities, bias, and hallucination.",riskRaw:"Safe",audience:"Builder",tags:["Testing","Bias","Open Source"],llm:["LLM01","LLM02","LLM05"],stages:["test"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Mindgard",url:"https://mindgard.ai/",category:"AI Red Teaming",desc:"Continuous AI DAST — finds runtime-only AI vulnerabilities.",riskRaw:"Safe",audience:"Red Team",tags:["DAST","Pentesting","Platform"],llm:["LLM01","LLM02","LLM04","LLM06","LLM09"],stages:["test"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Adversa AI",url:"https://adversa.ai/",category:"AI Red Teaming",desc:"Red teaming platform for LLMs with automated benchmarking.",riskRaw:"Safe",audience:"Red Team",tags:["Platform","Benchmark","SaaS"],llm:["LLM01","LLM02","LLM06"],stages:["test"],agentic:true,complexityOverride:"Guided Setup"},
{name:"Agentic Radar",url:"https://github.com/splxai/agentic-radar",category:"AI Red Teaming",desc:"First open-source agentic security scanner.",riskRaw:"Safe",audience:"Red Team",tags:["Agentic","Open Source","Scanner"],llm:["LLM01","LLM07"],stages:["test","develop"],agentic:true,complexityOverride:"Guided Setup"},
{name:"Prompt Fuzzer",url:"https://github.com/prompt-security/ps-fuzz",category:"AI Red Teaming",desc:"Open-source interactive prompt resilience testing tool.",riskRaw:"Safe",audience:"Red Team",tags:["Fuzzing","Open Source","CLI"],llm:["LLM01","LLM02","LLM06"],stages:["test"],agentic:false,complexityOverride:"Guided Setup"},
{name:"OWASP AI Exchange",url:"https://owaspai.org/",category:"AI Governance & Standards",desc:"The comprehensive open-source guide to AI security.",riskRaw:"Safe",audience:"All",tags:["Standard","OWASP","Reference"],llm:["LLM01","LLM02","LLM03","LLM04","LLM05","LLM06","LLM07","LLM08","LLM09","LLM10"],stages:["scope","govern"],agentic:false},
{name:"OWASP GenAI Solutions",url:"https://genai.owasp.org/ai-security-solutions-landscape/",category:"AI Governance & Standards",desc:"OWASP Solutions Landscape directory for AI security vendors.",riskRaw:"Safe",audience:"All",tags:["Directory","OWASP","Vendor"],llm:[],stages:["scope"],agentic:false},
{name:"ISO/IEC 42001",url:"https://www.iso.org/standard/56641.html",category:"AI Governance & Standards",desc:"The global standard for AI Management Systems.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","Standard","ISO"],llm:[],stages:["govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"ETSI AI Security Standard",url:"https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai",category:"AI Governance & Standards",desc:"World-leading standard (TS 104 223) for securing AI systems.",riskRaw:"Safe",audience:"Blue Team",tags:["Standard","ETSI","Compliance"],llm:[],stages:["govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"EU AI Act Practical Guide",url:"https://www.cuatrecasas.com/en/global/intellectual-property/art/eu-ai-act-practical-guide",category:"AI Governance & Standards",desc:"Legal framework guide for navigating European AI regulations.",riskRaw:"Safe",audience:"All",tags:["Legal","EU","Regulation"],llm:[],stages:["govern"],agentic:false},
{name:"NIST AI RMF Maturity Model",url:"https://arxiv.org/abs/2401.15229",category:"AI Governance & Standards",desc:"Framework for assessing AI risk maturity based on NIST standards.",riskRaw:"Safe",audience:"Blue Team",tags:["Framework","NIST","Risk"],llm:[],stages:["scope","govern"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Witness.ai",url:"https://witness.ai/",category:"AI Governance & Standards",desc:"Enterprise AI safety platform providing visibility and policy enforcement.",riskRaw:"Safe",audience:"Blue Team",tags:["Shadow AI","Policy","Enterprise"],llm:["LLM06"],stages:["govern","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Harmonic Security",url:"https://www.harmonic.security/",category:"AI Governance & Standards",desc:"Data protection platform that detects and governs Shadow AI usage.",riskRaw:"Safe",audience:"Blue Team",tags:["DLP","Shadow AI","Enterprise"],llm:["LLM06"],stages:["govern","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Zenity",url:"https://zenity.io/",category:"AI Governance & Standards",desc:"Governance and security for Low-Code/No-Code AI agents and copilots.",riskRaw:"Safe",audience:"Blue Team",tags:["Low-Code","Governance","Copilot"],llm:["LLM01","LLM07"],stages:["govern","operate"],agentic:true,complexityOverride:"Enterprise Only"},
{name:"Lethal Trifecta (Simon Willison)",url:"https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",category:"AI Governance & Standards",desc:"Essential article on Prompt Injection + Tool Use + Permissions.",riskRaw:"Safe",audience:"All",tags:["Education","Article","Risk"],llm:["LLM01","LLM07","LLM08"],stages:["scope"],agentic:true},
{name:"Identity Defined Security Alliance",url:"https://www.idsalliance.org/",category:"AI Governance & Standards",desc:"Non-profit framework for identity-centric security strategies.",riskRaw:"Safe",audience:"Blue Team",tags:["Identity","Framework","Standard"],llm:[],stages:["scope","govern"],agentic:false},
{name:"Itzik Alvas",url:"https://www.linkedin.com/in/itzik-alvas/",category:"AI Governance & Standards",desc:"Thought leader in AI Security.",riskRaw:"Safe",audience:"All",tags:["Influencer","Thought Leader","LinkedIn"],llm:[],stages:[],agentic:false},
{name:"MITRE ATLAS",url:"https://atlas.mitre.org/",category:"AI Governance & Standards",desc:"Adversarial Threat Landscape for AI Systems.",riskRaw:"Safe",audience:"All",tags:["Threat Model","MITRE","Reference"],llm:["LLM01","LLM02","LLM03","LLM04","LLM05","LLM06","LLM07","LLM08","LLM09","LLM10"],stages:["scope"],agentic:false},
{name:"CycloneDX (AIBOM)",url:"https://cyclonedx.org/",category:"AI Governance & Standards",desc:"SBOM standard extended for AI/ML Bill of Materials.",riskRaw:"Safe",audience:"Builder",tags:["SBOM","Standard","Open Source"],llm:["LLM03","LLM05"],stages:["release","govern"],agentic:false,complexityOverride:"Expert Required"},
{name:"StrideGPT",url:"https://stridegpt.ai/",category:"AI Governance & Standards",desc:"AI-powered threat modeling tool.",riskRaw:"Safe",audience:"Blue Team",tags:["Threat Model","Open Source","Tool"],llm:["LLM01","LLM02","LLM07"],stages:["scope"],agentic:false},
{name:"LLM Guard (Protect AI)",url:"https://protectai.com/llm-guard",category:"AI Guardrails & Firewalls",desc:"Security scanner for LLM inputs and outputs.",riskRaw:"Safe",audience:"Builder",tags:["Guardrails","Scanner","Open Source"],llm:["LLM01","LLM02","LLM06"],stages:["operate","deploy"],agentic:false,complexityOverride:"Guided Setup"},
{name:"NeMo Guardrails (NVIDIA)",url:"https://developer.nvidia.com/nemo-guardrails",category:"AI Guardrails & Firewalls",desc:"Toolkit for adding programmable guardrails to LLM-based systems.",riskRaw:"Safe",audience:"Builder",tags:["Guardrails","NVIDIA","Open Source"],llm:["LLM01","LLM02"],stages:["operate","deploy"],agentic:false,complexityOverride:"Expert Required"},
{name:"LlamaFirewall (Meta)",url:"https://ai.meta.com/research/publications/llamafirewall-an-open-source-guardrail-system-for-building-secure-ai-agents/",category:"AI Guardrails & Firewalls",desc:"Host-level firewall for LLM agents to prevent malicious tool use.",riskRaw:"Safe",audience:"Builder",tags:["Firewall","Agents","Meta","Open Source"],llm:["LLM01","LLM07","LLM08"],stages:["operate","deploy"],agentic:true,complexityOverride:"Expert Required"},
{name:"E2B",url:"https://e2b.dev/",category:"AI Guardrails & Firewalls",desc:"Sandboxed code execution for AI agents.",riskRaw:"Safe",audience:"Builder",tags:["Sandbox","Agents","Security"],llm:["LLM02","LLM07"],stages:["operate"],agentic:true,complexityOverride:"Guided Setup"},
{name:"A2A Protocol",url:"https://a2a-protocol.org/latest/",category:"AI Guardrails & Firewalls",desc:"Agent-to-Agent protocol standards.",riskRaw:"Safe",audience:"Builder",tags:["Protocol","Agents","Standard"],llm:["LLM07","LLM08"],stages:["scope","deploy"],agentic:true,complexityOverride:"Expert Required"},
{name:"Pangea",url:"https://pangea.cloud/",category:"AI Guardrails & Firewalls",desc:"Developer-first AI security APIs: Sanitize, Redact, Auth.",riskRaw:"Safe",audience:"Builder",tags:["APIs","Developer","SaaS"],llm:["LLM01","LLM02","LLM06"],stages:["develop","deploy"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Cisco AI Runtime",url:"https://www.cisco.com/site/us/en/solutions/ai/ai-defense/index.html",category:"AI Guardrails & Firewalls",desc:"Enterprise LLM firewall + guardrails.",riskRaw:"Safe",audience:"Blue Team",tags:["Firewall","Enterprise","Cisco"],llm:["LLM01","LLM02","LLM06","LLM07"],stages:["deploy","operate"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"F5 AI Gateway",url:"https://www.f5.com/products/ai-gateway",category:"AI Guardrails & Firewalls",desc:"Network-layer AI security gateway.",riskRaw:"Safe",audience:"Blue Team",tags:["Gateway","Network","F5"],llm:["LLM01","LLM02","LLM10"],stages:["operate"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"MCP Secure Gateway",url:"https://github.com/nicobailon/mcp-secure-gateway",category:"AI Guardrails & Firewalls",desc:"Runtime guardrails for MCP connections.",riskRaw:"Safe",audience:"Builder",tags:["MCP","Open Source","Agents"],llm:["LLM01","LLM07","LLM08"],stages:["deploy","operate"],agentic:true,complexityOverride:"Expert Required"},
{name:"ZenGuard AI",url:"https://www.zenguard.ai/",category:"AI Guardrails & Firewalls",desc:"Dev-first API platform for lowest-latency GenAI guardrails.",riskRaw:"Safe",audience:"Builder",tags:["APIs","Guardrails","Platform"],llm:["LLM01","LLM02","LLM06"],stages:["test","operate"],agentic:false,complexityOverride:"Guided Setup"},
{name:"LangChain",url:"https://www.langchain.com/",category:"AI Development Tools",desc:"LLM orchestration framework for building AI agents and chains.",riskRaw:"Safe",audience:"Builder",tags:["Framework","Agents","Orchestration"],llm:[],stages:["develop"],agentic:true,complexityOverride:"Expert Required"},
{name:"LlamaIndex",url:"https://www.llamaindex.ai/",category:"AI Development Tools",desc:"Data framework connecting LLMs to external sources.",riskRaw:"Safe",audience:"Builder",tags:["RAG","Data","Framework"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Expert Required"},
{name:"Langfuse",url:"https://langfuse.com/",category:"AI Development Tools",desc:"Open-source LLM observability — traces, evals, prompt management.",riskRaw:"Safe",audience:"Builder",tags:["Observability","Tracing","Open Source"],llm:[],stages:["monitor","operate"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Arize Phoenix",url:"https://arize.com/phoenix/",category:"AI Development Tools",desc:"Open-source LLM tracing, evaluation, and hallucination detection.",riskRaw:"Safe",audience:"Builder",tags:["Observability","Evals","Open Source"],llm:["LLM09"],stages:["monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"OpenLIT",url:"https://openlit.io/",category:"AI Development Tools",desc:"OpenTelemetry-native LLM observability.",riskRaw:"Safe",audience:"Builder",tags:["Observability","OTEL","Open Source"],llm:[],stages:["monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Scale AI",url:"https://scale.com/",category:"AI Development Tools",desc:"Data labeling and model evaluation services.",riskRaw:"Safe",audience:"Builder",tags:["Data","Evaluation","ML"],llm:[],stages:["test","augment"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"OTEL OpenLit Demo",url:"https://github.com/t00mas/otel-openlit-llm-metrics-demo",category:"AI Development Tools",desc:"OpenTelemetry demo for LLM metrics observability.",riskRaw:"Safe",audience:"Builder",tags:["Observability","Open Source","Metrics"],llm:[],stages:["monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"GitHub Copilot",url:"https://github.com/features/copilot",category:"AI Code Assistants",desc:"AI coding assistant. Requires governance policy.",riskRaw:"Medium Risk",audience:"Builder",tags:["Code","Dev","Microsoft"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Cursor",url:"https://www.cursor.com/en",category:"AI Code Assistants",desc:"AI-native code editor.",riskRaw:"Medium Risk",audience:"Builder",tags:["Code","Dev","Editor"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Continue",url:"https://www.continue.dev/",category:"AI Code Assistants",desc:"Open-source AI code assistant for VS Code and JetBrains.",riskRaw:"Safe",audience:"Builder",tags:["Code","Open Source","IDE"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Tabnine",url:"https://www.tabnine.com/",category:"AI Code Assistants",desc:"AI code assistant with enterprise focus — private models.",riskRaw:"Safe",audience:"Builder",tags:["Code","Enterprise","Private"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Tabby",url:"https://www.tabbyml.com/",category:"AI Code Assistants",desc:"Self-hosted AI coding assistant.",riskRaw:"Safe",audience:"Builder",tags:["Code","Self-Hosted","Open Source"],llm:["LLM06"],stages:["develop"],agentic:false,complexityOverride:"Expert Required"},
{name:"SoftwareAnalyst.io",url:"https://softwareanalyst.io/",category:"AI Code Assistants",desc:"Automated software analysis tool.",riskRaw:"Medium",audience:"Builder",tags:["Code Analysis","Dev","Automation"],llm:[],stages:["develop"],agentic:false},
{name:"Ollama",url:"https://ollama.com/",category:"Foundation Models",desc:"Run LLMs locally.",riskRaw:"Safe",audience:"Builder",tags:["Local","Open Source","Self-Hosted"],llm:[],stages:["deploy"],agentic:false,complexityOverride:"Guided Setup"},
{name:"DeepSeek",url:"https://www.deepseek.com/en",category:"Foundation Models",desc:"Chinese LLM. Strong at coding but presents privacy risks.",riskRaw:"Critical (Red Flag)",audience:"Builder",tags:["LLM","Code","China","Privacy Risk"],llm:["LLM06"],stages:[],agentic:false,complexityOverride:"Expert Required"},
{name:"Mistral AI",url:"https://mistral.ai/",category:"Foundation Models",desc:"European foundation models and agents.",riskRaw:"Safe",audience:"Builder",tags:["Foundation Model","EU","Open Source"],llm:[],stages:[],agentic:false,complexityOverride:"Guided Setup"},
{name:"Hugging Face",url:"https://huggingface.co/",category:"Foundation Models",desc:"The ML community hub. Key attack surface.",riskRaw:"Safe",audience:"Builder",tags:["Models","Open Source","ML"],llm:["LLM03","LLM05"],stages:["augment","develop"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Llama (Meta)",url:"https://www.llama.com/",category:"Foundation Models",desc:"Open-source foundation models.",riskRaw:"Safe",audience:"Builder",tags:["Foundation Model","Open Source","Meta"],llm:[],stages:[],agentic:false,complexityOverride:"Expert Required"},
{name:"Perplexity",url:"https://www.perplexity.ai",category:"Foundation Models",desc:"Conversational web search using multiple LLMs.",riskRaw:"Medium Risk",audience:"All",tags:["LLM","Search","Shadow AI"],llm:["LLM06"],stages:[],agentic:false},
{name:"GitGuardian",url:"https://www.gitguardian.com/",category:"Identity & AppSec",desc:"Real-time secrets detection.",riskRaw:"Safe",audience:"Blue Team",tags:["Secrets","DLP","DevSecOps"],llm:["LLM06"],stages:["develop","monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Noma Security",url:"https://noma.security/",category:"Identity & AppSec",desc:"End-to-end AI application security platform.",riskRaw:"Safe",audience:"Blue Team",tags:["AppSec","Lifecycle","AI-SPM"],llm:["LLM01","LLM02","LLM03","LLM04","LLM05","LLM06","LLM07","LLM08","LLM09","LLM10"],stages:["scope","develop","test","deploy","operate","monitor","govern"],agentic:true,complexityOverride:"Enterprise Only"},
{name:"Aembit",url:"https://aembit.io/",category:"Identity & AppSec",desc:"Workload Identity and Access Management.",riskRaw:"Safe",audience:"Blue Team",tags:["Identity","IAM","Workload"],llm:["LLM08"],stages:["deploy"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Entro Security",url:"https://entro.security/",category:"Identity & AppSec",desc:"Non-Human Identity Management.",riskRaw:"Safe",audience:"Blue Team",tags:["Identity","NHI","Secrets"],llm:["LLM08"],stages:["monitor","operate"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"SPIFFE",url:"https://spiffe.io/",category:"Identity & AppSec",desc:"Secure Production Identity Framework.",riskRaw:"Safe",audience:"Builder",tags:["Identity","Standard","Open Source"],llm:["LLM08"],stages:["deploy"],agentic:false,complexityOverride:"Expert Required"},
{name:"Silverfort",url:"https://www.silverfort.com/",category:"Identity & AppSec",desc:"Unified Identity Protection platform with MFA.",riskRaw:"Safe",audience:"Blue Team",tags:["Identity","MFA","IAM"],llm:["LLM08"],stages:["deploy","operate"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Wiz",url:"https://www.wiz.io/",category:"Identity & AppSec",desc:"Cloud security platform with AI-SPM.",riskRaw:"Safe",audience:"Blue Team",tags:["Cloud","CNAPP","AI-SPM"],llm:["LLM04","LLM08"],stages:["scope","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"AppOmni",url:"https://appomni.com/",category:"Identity & AppSec",desc:"SaaS Security Posture Management.",riskRaw:"Safe",audience:"Blue Team",tags:["SSPM","SaaS","Security"],llm:["LLM06"],stages:["monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"SpiceDB",url:"https://authzed.com/spicedb",category:"Identity & AppSec",desc:"Fine-grained authorization database.",riskRaw:"Safe",audience:"Builder",tags:["AuthZ","Open Source","Permissions"],llm:["LLM01","LLM07","LLM08"],stages:["scope","develop"],agentic:true,complexityOverride:"Expert Required"},
{name:"Teleport",url:"https://goteleport.com/",category:"Identity & AppSec",desc:"Infrastructure access platform.",riskRaw:"Safe",audience:"Blue Team",tags:["Zero-Trust","Infrastructure","Open Source"],llm:["LLM08"],stages:["deploy","monitor","govern"],agentic:false,complexityOverride:"Expert Required"},
{name:"BitSight",url:"https://www.bitsight.com/",category:"Third-Party Risk",desc:"AI-powered cyber risk intelligence.",riskRaw:"Safe",audience:"Blue Team",tags:["Ratings","Platform","TPRM"],llm:[],stages:["scope","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Conveyor",url:"https://www.conveyor.com/",category:"Third-Party Risk",desc:"AI Agents for Trust Center automation.",riskRaw:"Safe",audience:"Blue Team",tags:["Trust Center","Automation","AI Agent"],llm:[],stages:["scope"],agentic:true,complexityOverride:"Guided Setup"},
{name:"Drata",url:"https://drata.com/",category:"Third-Party Risk",desc:"Trust centre with Compliance as Code.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","Automation","SaaS"],llm:[],stages:["govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Loopio",url:"https://loopio.com/",category:"Third-Party Risk",desc:"AI-powered RFP software.",riskRaw:"Safe",audience:"Blue Team",tags:["RFP","Procurement","Automation"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Mitratech Prevalent",url:"https://mitratech.com/products/prevalent/",category:"Third-Party Risk",desc:"End-to-end TPRM for vendor lifecycle.",riskRaw:"Safe",audience:"Blue Team",tags:["TPRM","Lifecycle","Platform"],llm:[],stages:["scope","monitor","govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Panorays",url:"https://panorays.com/",category:"Third-Party Risk",desc:"Security questionnaires with task automations.",riskRaw:"Safe",audience:"Blue Team",tags:["Questionnaire","Automation","Platform"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Guided Setup"},
{name:"ProcessUnity",url:"https://www.processunity.com/",category:"Third-Party Risk",desc:"Global Risk Exchange with NLP.",riskRaw:"Safe",audience:"Blue Team",tags:["TPRM","NLP","AI Agent"],llm:[],stages:["scope","monitor"],agentic:true,complexityOverride:"Enterprise Only"},
{name:"Responsive",url:"https://www.responsive.io/",category:"Third-Party Risk",desc:"RFP software leader with AI-driven response.",riskRaw:"Safe",audience:"Blue Team",tags:["RFP","Procurement","AI"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Guided Setup"},
{name:"RiskRecon",url:"https://www.riskrecon.com/",category:"Third-Party Risk",desc:"Cybersecurity ratings integrating with Whistic.",riskRaw:"Safe",audience:"Blue Team",tags:["Ratings","TPRM","Platform"],llm:[],stages:["scope","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"SAFE",url:"https://safe.security/",category:"Third-Party Risk",desc:"AI-driven cyber risk quantification.",riskRaw:"Safe",audience:"Blue Team",tags:["Risk Quantification","TPRM","Platform"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"SafeBase",url:"https://safebase.io/",category:"Third-Party Risk",desc:"Trust Center + AI Questionnaire Assistance.",riskRaw:"Safe",audience:"Blue Team",tags:["Trust Center","Questionnaire","SaaS"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Guided Setup"},
{name:"SecurityPal",url:"https://www.securitypalhq.com/",category:"Third-Party Risk",desc:"100x faster security reviews powered by AI Agents.",riskRaw:"Safe",audience:"Blue Team",tags:["Reviews","AI Agent","Automation"],llm:[],stages:["scope"],agentic:true,complexityOverride:"Guided Setup"},
{name:"SecurityScorecard",url:"https://securityscorecard.com/",category:"Third-Party Risk",desc:"Supply Chain Detection and Response.",riskRaw:"Safe",audience:"Blue Team",tags:["SCDR","Ratings","Platform"],llm:[],stages:["scope","monitor"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"TrustCloud",url:"https://www.trustcloud.ai/",category:"Third-Party Risk",desc:"Automate Security, Privacy, and AI Risk Assessments.",riskRaw:"Safe",audience:"Blue Team",tags:["Automation","Privacy","Risk"],llm:[],stages:["scope"],agentic:false,complexityOverride:"Guided Setup"},
{name:"UpGuard",url:"https://www.upguard.com/",category:"Third-Party Risk",desc:"Security questionnaire automation & attack surface management.",riskRaw:"Safe",audience:"Blue Team",tags:["ASM","Questionnaire","Platform"],llm:[],stages:["scope","monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Vanta",url:"https://www.vanta.com/",category:"Third-Party Risk",desc:"Security compliance automation for SOC2, ISO 27001.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","Automation","SaaS"],llm:[],stages:["govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Whistic",url:"https://www.whistic.com/",category:"Third-Party Risk",desc:"Modernize TPRM with automated assessments.",riskRaw:"Safe",audience:"Blue Team",tags:["TPRM","Vendor Risk","Platform"],llm:[],stages:["scope","monitor"],agentic:false,complexityOverride:"Guided Setup"},
{name:"Zip",url:"https://ziphq.com/",category:"Third-Party Risk",desc:"Agentic procurement orchestration platform.",riskRaw:"Safe",audience:"Blue Team",tags:["Procurement","AI Agent","Enterprise"],llm:[],stages:["scope"],agentic:true,complexityOverride:"Enterprise Only"},
{name:"Sprinto",url:"https://sprinto.com",category:"Compliance Automation",desc:"Compliance automation platform.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","Automation","SaaS"],llm:[],stages:["govern"],agentic:false,complexityOverride:"Enterprise Only"},
{name:"Delve",url:"https://delve.co",category:"Compliance Automation",desc:"Compliance automation via AI agent.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","AI Agent","Automation"],llm:[],stages:["govern"],agentic:true,complexityOverride:"Guided Setup"},
{name:"Scrut",url:"https://www.scrut.io/",category:"Compliance Automation",desc:"70+ integrations for continuous security compliance monitoring.",riskRaw:"Safe",audience:"Blue Team",tags:["Compliance","Integrations","Automation"],llm:[],stages:["govern","monitor"],agentic:false,complexityOverride:"Enterprise Only"}
];

const catMap={'AI Red Teaming':'cat-redteam','AI Governance & Standards':'cat-governance','AI Guardrails & Firewalls':'cat-guardrails','AI Development Tools':'cat-devtools','AI Code Assistants':'cat-codeassist','Foundation Models':'cat-models','Identity & AppSec':'cat-identity','Third-Party Risk':'cat-tprm','Compliance Automation':'cat-compliance'};
const initials=n=>{const w=n.replace(/[()]/g,'').split(/[\s-]+/);return w.length===1?w[0].substring(0,2).toUpperCase():(w[0][0]+w[1][0]).toUpperCase()};

function assess(r){
  let s=0,d=0,g=0,p=0;const cat=r.category||'',risk=(r.riskRaw||'').toLowerCase(),tags=(r.tags||[]).map(t=>t.toLowerCase()),desc=(r.desc||'').toLowerCase(),aud=(r.audience||'').toLowerCase();
  if(cat==='AI Red Teaming')s=Math.max(s,2);
  if(risk.includes('caution')||risk.includes('offensive'))s=3;
  if(tags.some(t=>['exploit','pentesting','injection','phishing','cracking'].includes(t)))s=Math.max(s,2);
  if(tags.some(t=>['cli','dev','devsecops','sdk'].includes(t)))s=Math.max(s,1);
  if(tags.some(t=>['framework','standard','protocol'].includes(t)))s=Math.max(s,1);
  if(tags.some(t=>['game','training'].includes(t)))s=0;
  if(aud==='builder')s=Math.max(s,1);
  if(tags.some(t=>['saas','platform'].includes(t))||desc.includes('platform'))d=Math.max(d,1);
  if(tags.includes('open source')&&(desc.includes('self-host')||desc.includes('deploy')))d=Math.max(d,2);
  if(tags.includes('enterprise'))d=Math.max(d,2);
  if(desc.includes('docker')||desc.includes('kubernetes'))d=Math.max(d,2);
  if(cat==='AI Governance & Standards'&&!tags.some(t=>['game','training','article','influencer'].includes(t)))g=Math.max(g,1);
  if(risk.includes('caution')||risk.includes('offensive'))g=Math.max(g,2);
  if(tags.some(t=>['enterprise','procurement'].includes(t)))g=Math.max(g,3);
  if(desc.includes('governance'))g=Math.max(g,1);
  if(risk.includes('critical')||risk.includes('red flag'))p=3;
  if(risk.includes('high')||risk.includes('privacy'))p=Math.max(p,2);
  if(risk.includes('medium'))p=Math.max(p,1);
  if(tags.some(t=>['shadow ai','privacy risk','dlp'].includes(t)))p=Math.max(p,2);
  if(tags.includes('china'))p=3;
  if(desc.includes('proprietary code')||desc.includes('data privacy'))p=Math.max(p,1);
  const total=s+d+g+p;let ti;if(total<=3)ti=0;else if(total<=6)ti=1;else if(total<=9)ti=2;else ti=3;
  return{tier:TL[ti],tierKey:TK[ti],scores:{skill:s,deployment:d,governance:g,privacy:p},total};
}

function parseTier(v){if(!v)return null;const l=v.trim().toLowerCase();for(let i=0;i<TL.length;i++){if(l===TL[i].toLowerCase()||l===TK[i])return i}return null}

function enrich(raw){return raw.map(r=>{const oi=parseTier(r.complexityOverride);let cx;if(oi!==null){cx={tier:TL[oi],tierKey:TK[oi],scores:{skill:0,deployment:0,governance:0,privacy:0},total:-1,overridden:true}}else{cx=assess(r)}return{...r,complexity:cx}})}

let RES=[],aCat='All',aAud='All',aTier='all',aRisk='All',aStage='All',sQ='';

// UI Builders
function buildFilters(){
  const bar=document.getElementById('filterBar');bar.innerHTML='';
  const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>';
  function mkDrop(id,label,options,getter,setter){
    const wrap=document.createElement('div');wrap.className='filter-dropdown';wrap.id='dd-'+id;
    const cur=options.find(o=>o.key===getter())||options[0];
    const isAll=cur.key==='All'||cur.key==='all';
    wrap.innerHTML=`<div class="filter-trigger${isAll?'':' has-value'}" data-dd="${id}"><span class="filter-label">${label}</span><span class="filter-value">${isAll?'All':cur.label}</span>${chevron}</div><div class="filter-menu"></div>`;
    const menu=wrap.querySelector('.filter-menu');
    options.forEach(o=>{
      const opt=document.createElement('div');opt.className='filter-option'+(o.key===getter()?' active':'');
      opt.innerHTML=(o.code?`<span><span class="opt-code">${o.code}</span>${o.label}</span>`:`<span>${o.label}</span>`)+(o.count!=null?`<span class="opt-count">${o.count}</span>`:'');
      opt.onclick=(e)=>{e.stopPropagation();setter(o.key);closeAll();buildFilters();render();updateChips()};
      menu.appendChild(opt);
    });
    bar.appendChild(wrap);
  }
  const cats=[{key:'All',label:'All Categories',count:RES.length},...[...new Set(RES.map(r=>r.category))].sort().map(c=>({key:c,label:c,count:RES.filter(r=>r.category===c).length}))];
  mkDrop('cat','Category',cats,()=>aCat,v=>{aCat=v});
  mkDrop('role','Role',[{key:'All',label:'All Roles',count:RES.length},{key:'Blue Team',label:'Blue Team',count:RES.filter(r=>r.audience==='Blue Team').length},{key:'Red Team',label:'Red Team',count:RES.filter(r=>r.audience==='Red Team').length},{key:'Builder',label:'Builder',count:RES.filter(r=>r.audience==='Builder').length}],()=>aAud,v=>{aAud=v});
  mkDrop('tier','Expertise',[{key:'all',label:'All Levels',count:RES.length},{key:'plug-and-play',label:'Plug & Play',count:RES.filter(r=>r.complexity.tierKey==='plug-and-play').length},{key:'guided-setup',label:'Guided Setup',count:RES.filter(r=>r.complexity.tierKey==='guided-setup').length},{key:'expert-required',label:'Expert Required',count:RES.filter(r=>r.complexity.tierKey==='expert-required').length},{key:'enterprise-only',label:'Enterprise Only',count:RES.filter(r=>r.complexity.tierKey==='enterprise-only').length}],()=>aTier,v=>{aTier=v});
  mkDrop('risk','LLM Risk',[{key:'All',label:'All Risks',count:RES.length},...['LLM01','LLM02','LLM03','LLM04','LLM05','LLM06','LLM07','LLM08','LLM09','LLM10'].map(r=>{const n={'LLM01':'Prompt Injection','LLM02':'Insecure Output','LLM03':'Supply Chain','LLM04':'Data Poisoning','LLM05':'Improper Output','LLM06':'Info Disclosure','LLM07':'Insecure Plugin','LLM08':'Excessive Agency','LLM09':'Overreliance','LLM10':'Model Theft'};return{key:r,label:n[r],code:r,count:RES.filter(x=>(x.llm||[]).includes(r)).length}})],()=>aRisk,v=>{aRisk=v});
  const sl={scope:'Scope & Plan',augment:'Augment Data',develop:'Develop',test:'Test & Eval',release:'Release',deploy:'Deploy',operate:'Operate',monitor:'Monitor',govern:'Govern'};
  mkDrop('stage','Stage',[{key:'All',label:'All Stages',count:RES.length},...Object.entries(sl).map(([k,v])=>({key:k,label:v,count:RES.filter(x=>(x.stages||[]).includes(k)).length}))],()=>aStage,v=>{aStage=v});
  updateChips();
}

function closeAll(){document.querySelectorAll('.filter-dropdown.open').forEach(d=>d.classList.remove('open'))}
document.addEventListener('click',e=>{const trg=e.target.closest('.filter-trigger');if(trg){e.stopPropagation();const dd=trg.parentElement;const wasOpen=dd.classList.contains('open');closeAll();if(!wasOpen)dd.classList.add('open')}else{closeAll()}});

function updateChips(){
  const af=document.getElementById('activeFilters');af.innerHTML='';
  const x='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  if(aCat!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aCat+x;c.onclick=()=>{aCat='All';buildFilters();render()};af.appendChild(c)}
  if(aAud!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aAud+x;c.onclick=()=>{aAud='All';buildFilters();render()};af.appendChild(c)}
  if(aTier!=='all'){const lbl={'plug-and-play':'Plug & Play','guided-setup':'Guided Setup','expert-required':'Expert Required','enterprise-only':'Enterprise Only'};const c=document.createElement('span');c.className='active-chip';c.innerHTML=(lbl[aTier]||aTier)+x;c.onclick=()=>{aTier='all';buildFilters();render()};af.appendChild(c)}
  if(aRisk!=='All'){const c=document.createElement('span');c.className='active-chip';c.innerHTML=aRisk+x;c.onclick=()=>{aRisk='All';buildFilters();render()};af.appendChild(c)}
  if(aStage!=='All'){const sl={scope:'Scope & Plan',augment:'Augment Data',develop:'Develop',test:'Test & Eval',release:'Release',deploy:'Deploy',operate:'Operate',monitor:'Monitor',govern:'Govern'};const c=document.createElement('span');c.className='active-chip';c.innerHTML=(sl[aStage]||aStage)+x;c.onclick=()=>{aStage='All';buildFilters();render()};af.appendChild(c)}
}

function getF(){return RES.filter(r=>{if(aCat!=='All'&&r.category!==aCat)return false;if(aAud!=='All'&&r.audience!==aAud&&r.audience!=='All')return false;if(aTier!=='all'&&r.complexity.tierKey!==aTier)return false;if(aRisk!=='All'&&!(r.llm||[]).includes(aRisk))return false;if(aStage!=='All'&&!(r.stages||[]).includes(aStage))return false;if(sQ){const q=sQ.toLowerCase();return(r.name+' '+r.category+' '+r.desc+' '+r.tags.join(' ')+' '+r.audience+' '+r.complexity.tier+' '+(r.llm||[]).join(' ')).toLowerCase().includes(q)}return true})}

function mkCard(r){
  const cx=r.complexity,c=document.createElement('div');c.className=`card ${catMap[r.category]||''} tier-${cx.tierKey}`;c.style.cursor='pointer';
  c.addEventListener('click',function(e){e.preventDefault();showCardDetail(r)});
  const ag=r.agentic?'<span class="tag agentic">⚡ Agentic</span>':'';
  const rt=(r.llm||[]).length>0?r.llm.slice(0,3).map(l=>`<span class="tag llm-risk">${l}</span>`).join('')+(r.llm.length>3?`<span class="tag llm-risk">+${r.llm.length-3}</span>`:''):'';
  c.innerHTML=`<div class="card-top"><div class="card-identity"><div class="card-icon">${initials(r.name)}</div><div><div class="card-name">${r.name}</div><div class="card-category">${r.category}</div></div></div><span class="complexity-badge tier-${cx.tierKey}"><span class="badge-dot"></span>${cx.tier}</span></div><div class="card-desc">${r.desc}</div><div class="card-footer">${ag}${r.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}${rt}</div>`;
  return c;
}

function render(){const g=document.getElementById('cardGrid'),f=getF();g.innerHTML='';f.forEach(r=>g.appendChild(mkCard(r)));document.getElementById('resultCount').textContent=`${f.length} of ${RES.length} resources`;document.getElementById('noResults').style.display=f.length?'none':'block'}
function stats(){document.getElementById('totalCount').textContent=RES.length;document.getElementById('catCount').textContent=new Set(RES.map(r=>r.category)).size;document.getElementById('tagCount').textContent=new Set(RES.flatMap(r=>r.tags)).size}
function isQ(q){const l=q.toLowerCase().trim();return l.includes('?')||/^(what|which|how|why|where|who|can|do|does|is|are|show|find|list|recommend|suggest|help|tell|give|compare)/.test(l)}

function aiSearch(query){
  const ov=document.getElementById('aiOverlay'),body=document.getElementById('aiBody');ov.classList.add('active');
  body.innerHTML=`<div class="ai-loading"><div class="dots"><span></span><span></span><span></span></div>Searching ${RES.length} resources...</div>`;
  setTimeout(()=>{
    const q=query.toLowerCase(),kw=q.replace(/[?.,!]/g,'').split(/\s+/).filter(w=>w.length>2&&!['what','which','how','the','that','this','for','are','can','with','from','does','about','help','show','find','list','some','best','good','tools','tool','any','easy','simple'].includes(w));
    const scored=RES.map(r=>{let sc=0;const h=(r.name+' '+r.desc+' '+r.tags.join(' ')+' '+r.category+' '+r.audience+' '+r.complexity.tier+' '+(r.llm||[]).join(' ')).toLowerCase();kw.forEach(k=>{if(h.includes(k))sc+=h.split(k).length});r.tags.forEach(t=>{if(q.includes(t.toLowerCase()))sc+=3});
    if(q.includes('tprm')||q.includes('third-party')||q.includes('vendor risk'))if(r.category==='Third-Party Risk')sc+=5;
    if(q.includes('questionnaire')&&r.desc.toLowerCase().includes('questionnaire'))sc+=5;
    if(q.includes('compliance')&&(r.category==='Compliance Automation'||r.tags.some(t=>t.toLowerCase().includes('compliance'))))sc+=4;
    if(q.includes('red team')&&r.category==='AI Red Teaming')sc+=4;
    if((q.includes('guard')||q.includes('injection')||q.includes('firewall'))&&(r.category==='AI Guardrails & Firewalls'||r.tags.some(t=>t.toLowerCase().includes('guard')||t.toLowerCase().includes('firewall'))))sc+=5;
    if(q.includes('identity')&&r.category==='Identity & AppSec')sc+=4;
    if((q.includes('code')||q.includes('copilot'))&&r.category==='AI Code Assistants')sc+=4;
    if(q.includes('observ')||q.includes('trac')||q.includes('monitor'))if(r.tags.some(t=>t==='Observability'||t==='Tracing'))sc+=5;
    if((q.includes('beginner')||q.includes('easy'))&&r.complexity.tierKey==='plug-and-play')sc+=4;
    if(q.includes('governance')||q.includes('standard'))if(r.category==='AI Governance & Standards')sc+=4;
    if(q.includes('agent')||q.includes('agentic'))if(r.agentic)sc+=5;
    if(q.match(/llm0[1-9]|llm10/)){const m=q.match(/llm0[1-9]|llm10/g);m.forEach(lm=>{if((r.llm||[]).includes(lm.toUpperCase()))sc+=6})}
    return{...r,score:sc}}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,6);
    if(!scored.length){body.innerHTML=`<div class="ai-response">No resources found matching "<strong>${query}</strong>". Try different keywords or use the LLM Top 10 filters.</div>`;return}
    const tc=[...new Set(scored.map(r=>r.category))].slice(0,2).join(' and ');
    body.innerHTML=`<div class="ai-response">Found <strong>${scored.length}</strong> resources for "<strong>${query}</strong>", primarily in ${tc}.</div><div class="ai-results">${scored.map(r=>`<a class="ai-result-card" href="${r.url}" target="_blank" rel="noopener"><div class="ai-result-icon ${catMap[r.category]||''}"><div class="card-icon" style="width:36px;height:36px;font-size:.7rem">${initials(r.name)}</div></div><div class="ai-result-info"><h4>${r.name}<span class="complexity-badge tier-${r.complexity.tierKey}" style="font-size:.55rem;padding:2px 6px;margin-left:4px"><span class="badge-dot"></span>${r.complexity.tier}</span>${r.agentic?'<span class="tag agentic" style="font-size:.55rem;padding:1px 6px">⚡</span>':''}</h4><p>${r.desc}</p></div></a>`).join('')}</div>`;
  },400);
}

// Initialisation - Simplified (No Config Check)
function init(){
  const ls=document.getElementById('loadingScreen');
  RES=enrich(R);
  // Source banner logic removed or simplified
  if(document.getElementById('sourceBanner')) document.getElementById('sourceBanner').style.display = 'none';
  buildFilters();stats();render();ls.classList.add('hidden');
}

const si=document.getElementById('searchInput'),ah=document.getElementById('aiHint');let db;
si.addEventListener('input',e=>{clearTimeout(db);const v=e.target.value.trim();ah.classList.toggle('visible',v.length>3&&isQ(v));db=setTimeout(()=>{sQ=v;if(!isQ(v))render()},200)});
si.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=si.value.trim();if(v&&isQ(v))aiSearch(v);else{sQ=v;render()}}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();si.focus()}if(e.key==='Escape'){document.getElementById('aiOverlay').classList.remove('active');si.blur()}});
document.getElementById('aiClose').onclick=()=>document.getElementById('aiOverlay').classList.remove('active');
document.getElementById('aiOverlay').onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.classList.remove('active')};
document.querySelectorAll('.view-btn').forEach(b=>{b.onclick=()=>{document.querySelectorAll('.view-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('cardGrid').classList.toggle('list-view',b.dataset.view==='list')}});

function showCardDetail(tool){
  const overlay=document.getElementById('cardOverlay'),detail=document.getElementById('cardDetail');
  const catColors={'AI Red Teaming':'var(--red)','AI Governance & Standards':'var(--yellow)','AI Guardrails & Firewalls':'var(--green)','AI Development Tools':'var(--cyan)','AI Code Assistants':'var(--pink)','Foundation Models':'var(--purple)','Identity & AppSec':'#3b82f6','Third-Party Risk':'var(--orange)','Compliance Automation':'#14b8a6'};
  const color=catColors[tool.category]||'var(--accent)';
  const ini=initials(tool.name);
  let metaTags='';
  if(tool.complexity)metaTags+=`<span class="meta-tag">${tool.complexity.tier}</span>`;
  if(tool.audience&&tool.audience!=='All')metaTags+=`<span class="meta-tag">${tool.audience}</span>`;
  if(tool.agentic)metaTags+=`<span class="meta-tag">Agentic</span>`;
  (tool.llm||[]).forEach(r=>{metaTags+=`<span class="meta-tag">${r}</span>`});
  (tool.stages||[]).forEach(s=>{metaTags+=`<span class="meta-tag">${s}</span>`});
  detail.innerHTML=`<button class="back-close" onclick="closeCardDetail()" title="Close">&times;</button>
    <div class="back-header"><div class="back-avatar" style="background:${color}20;color:${color}">${ini}</div><div><div class="back-title">${tool.name}</div><div class="back-cat">${tool.category}</div></div></div>
    ${tool.backWhat?`<div class="back-section"><div class="back-section-title">What It Does</div><p>${tool.backWhat}</p></div>`:''}
    ${tool.backSecurity?`<div class="back-section"><div class="back-section-title">Security Relevance</div><p>${tool.backSecurity}</p></div>`:''}
    ${tool.backWhen?`<div class="back-section"><div class="back-section-title">When to Use It</div><p>${tool.backWhen}</p></div>`:''}
    <div class="back-meta">${metaTags}</div>
    <a href="${tool.url}" target="_blank" rel="noopener" class="back-link">Visit ${tool.name} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></a>`;
  overlay.classList.add('active');
  document.body.style.overflow='hidden';
}
function closeCardDetail(){
  document.getElementById('cardOverlay').classList.remove('active');
  document.body.style.overflow='';
}
document.getElementById('cardOverlay').addEventListener('click',function(e){if(e.target===this)closeCardDetail()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCardDetail()});

init();