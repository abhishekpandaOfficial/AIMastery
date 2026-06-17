// Mock data for AIMastery — papers, projects, notes, interview questions, etc.
// New roadmap data is in roadmap-data.ts
// Roadmap re-exports for backward compat
export { roadmapPhases as curriculum } from "./roadmap-data";
export { allRoadmapLessons as allLessons } from "./roadmap-data";

// Legacy types (used by other pages)
export type LessonStatus = "completed" | "in-progress" | "locked" | "mastered" | "available";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface ResearchPaper {
  id: string; title: string; authors: string; year: number; venue: string;
  citations: number; tags: string[]; summary: string; impact: number;
}

export const papers: ResearchPaper[] = [
  { id: "p1", title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, venue: "NeurIPS", citations: 125000, tags: ["transformer"], summary: "Introduced the Transformer architecture replacing recurrence with self-attention.", impact: 10 },
  { id: "p2", title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2018, venue: "NAACL", citations: 95000, tags: ["bert", "nlp"], summary: "Bidirectional pretraining for language understanding.", impact: 10 },
  { id: "p3", title: "Language Models are Few-Shot Learners (GPT-3)", authors: "Brown et al.", year: 2020, venue: "NeurIPS", citations: 35000, tags: ["gpt", "scaling"], summary: "175B parameter LM, in-context learning emerges at scale.", impact: 10 },
  { id: "p4", title: "Denoising Diffusion Probabilistic Models", authors: "Ho, Jain, Abbeel", year: 2020, venue: "NeurIPS", citations: 18000, tags: ["diffusion"], summary: "DDPM formulation for generative image modeling.", impact: 9 },
  { id: "p5", title: "LoRA: Low-Rank Adaptation of LLMs", authors: "Hu et al.", year: 2021, venue: "ICLR", citations: 9000, tags: ["lora", "peft"], summary: "Parameter-efficient fine-tuning via low-rank updates.", impact: 9 },
  { id: "p6", title: "Chain-of-Thought Prompting Elicits Reasoning in LLMs", authors: "Wei et al.", year: 2022, venue: "NeurIPS", citations: 8500, tags: ["cot", "prompting"], summary: "Intermediate reasoning steps unlock LLM reasoning.", impact: 9 },
  { id: "p7", title: "Llama 2: Open Foundation and Fine-tuned Chat Models", authors: "Touvron et al.", year: 2023, venue: "Meta", citations: 6000, tags: ["llama"], summary: "Open foundation models, chat-aligned.", impact: 8 },
  { id: "p8", title: "Mixtral of Experts", authors: "Jiang et al.", year: 2024, venue: "Mistral", citations: 1500, tags: ["moe"], summary: "Sparse MoE LLM with high throughput.", impact: 8 },
  { id: "p9", title: "Direct Preference Optimization (DPO)", authors: "Rafailov et al.", year: 2023, venue: "NeurIPS", citations: 2800, tags: ["dpo", "alignment"], summary: "RLHF without a reward model.", impact: 9 },
  { id: "p10", title: "Retrieval-Augmented Generation for NLP Tasks", authors: "Lewis et al.", year: 2020, venue: "NeurIPS", citations: 7000, tags: ["rag"], summary: "Original RAG paper combining retrieval and generation.", impact: 9 },
  { id: "p11", title: "Deep Residual Learning for Image Recognition (ResNet)", authors: "He et al.", year: 2015, venue: "CVPR", citations: 200000, tags: ["cnn", "vision"], summary: "Residual connections enable training of very deep networks.", impact: 10 },
  { id: "p12", title: "ImageNet Classification with Deep CNNs (AlexNet)", authors: "Krizhevsky, Sutskever, Hinton", year: 2012, venue: "NeurIPS", citations: 130000, tags: ["cnn", "vision"], summary: "Sparked the deep learning revolution on ImageNet.", impact: 10 },
  { id: "p13", title: "Generative Adversarial Networks", authors: "Goodfellow et al.", year: 2014, venue: "NeurIPS", citations: 60000, tags: ["gan"], summary: "Adversarial training of generator vs discriminator.", impact: 10 },
  { id: "p14", title: "Adam: A Method for Stochastic Optimization", authors: "Kingma, Ba", year: 2014, venue: "ICLR", citations: 170000, tags: ["optimization"], summary: "Adaptive moment estimation optimizer, ubiquitous in DL.", impact: 10 },
  { id: "p15", title: "Word2Vec: Efficient Estimation of Word Representations", authors: "Mikolov et al.", year: 2013, venue: "ICLR", citations: 45000, tags: ["embeddings", "nlp"], summary: "Skip-gram and CBOW word embeddings.", impact: 9 },
  { id: "p16", title: "Sequence to Sequence Learning with Neural Networks", authors: "Sutskever, Vinyals, Le", year: 2014, venue: "NeurIPS", citations: 28000, tags: ["seq2seq"], summary: "Encoder-decoder LSTMs for translation.", impact: 9 },
  { id: "p17", title: "High-Resolution Image Synthesis with Latent Diffusion (Stable Diffusion)", authors: "Rombach et al.", year: 2022, venue: "CVPR", citations: 6500, tags: ["diffusion"], summary: "Compress to latent space, diffuse there — Stable Diffusion.", impact: 10 },
  { id: "p18", title: "CLIP: Learning Transferable Visual Models From Natural Language", authors: "Radford et al.", year: 2021, venue: "ICML", citations: 15000, tags: ["clip", "multimodal"], summary: "Contrastive image-text pretraining at scale.", impact: 10 },
  { id: "p19", title: "Training Language Models to Follow Instructions (InstructGPT)", authors: "Ouyang et al.", year: 2022, venue: "NeurIPS", citations: 6000, tags: ["rlhf", "alignment"], summary: "RLHF recipe behind ChatGPT.", impact: 10 },
  { id: "p20", title: "The Llama 3 Herd of Models", authors: "Meta AI", year: 2024, venue: "Meta", citations: 1200, tags: ["llama"], summary: "405B dense model, multilingual, long context.", impact: 9 },
  { id: "p21", title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", authors: "Gu, Dao", year: 2023, venue: "arXiv", citations: 2200, tags: ["ssm"], summary: "SSM alternative to Transformers, linear-time inference.", impact: 8 },
  { id: "p22", title: "FlashAttention: Fast and Memory-Efficient Exact Attention", authors: "Dao et al.", year: 2022, venue: "NeurIPS", citations: 4000, tags: ["attention", "systems"], summary: "IO-aware exact attention with 2-4× speedup.", impact: 9 },
  { id: "p23", title: "QLoRA: Efficient Finetuning of Quantized LLMs", authors: "Dettmers et al.", year: 2023, venue: "NeurIPS", citations: 3500, tags: ["lora", "quantization"], summary: "4-bit quantization + LoRA — fine-tune 65B on one GPU.", impact: 9 },
  { id: "p24", title: "ReAct: Synergizing Reasoning and Acting in Language Models", authors: "Yao et al.", year: 2022, venue: "ICLR", citations: 3200, tags: ["agents"], summary: "Interleave reasoning traces with tool actions.", impact: 9 },
  { id: "p25", title: "Toolformer: LMs Can Teach Themselves to Use Tools", authors: "Schick et al.", year: 2023, venue: "NeurIPS", citations: 2000, tags: ["agents", "tools"], summary: "Self-supervised tool-use training.", impact: 8 },
  { id: "p26", title: "Scaling Laws for Neural Language Models", authors: "Kaplan et al.", year: 2020, venue: "OpenAI", citations: 5500, tags: ["scaling"], summary: "Power-law scaling of loss with compute, data, params.", impact: 10 },
  { id: "p27", title: "Training Compute-Optimal LLMs (Chinchilla)", authors: "Hoffmann et al.", year: 2022, venue: "DeepMind", citations: 4500, tags: ["scaling"], summary: "Data and params should scale equally.", impact: 10 },
  { id: "p28", title: "Constitutional AI: Harmlessness from AI Feedback", authors: "Bai et al.", year: 2022, venue: "Anthropic", citations: 1800, tags: ["alignment"], summary: "Train assistants using AI feedback against a written constitution.", impact: 9 },
  { id: "p29", title: "Gemini: A Family of Highly Capable Multimodal Models", authors: "Google DeepMind", year: 2023, venue: "Google", citations: 1500, tags: ["multimodal"], summary: "Natively multimodal, long context, Ultra/Pro/Nano tiers.", impact: 9 },
  { id: "p30", title: "DeepSeek-R1: Reasoning via Reinforcement Learning", authors: "DeepSeek-AI", year: 2025, venue: "DeepSeek", citations: 800, tags: ["reasoning", "rl"], summary: "Pure RL on a base model elicits long reasoning chains.", impact: 9 },
];

export interface Project {
  id: string; title: string; description: string; difficulty: Difficulty;
  hours: number; tags: string[]; tier: "mini" | "medium" | "enterprise" | "capstone";
  status: "todo" | "in-progress" | "done";
  stars: number;
}

export const projects: Project[] = [
  { id: "pr1", title: "Spam Classifier from Scratch", description: "Naive Bayes spam filter on the SMS Spam Collection dataset.", difficulty: "beginner", hours: 4, tags: ["ml", "nlp"], tier: "mini", status: "done", stars: 124 },
  { id: "pr2", title: "Titanic Survival Predictor", description: "End-to-end sklearn pipeline with feature engineering and CV.", difficulty: "beginner", hours: 5, tags: ["ml", "tabular"], tier: "mini", status: "done", stars: 88 },
  { id: "pr3", title: "MNIST Digit Recognizer (PyTorch)", description: "CNN from scratch, ≥99% test accuracy.", difficulty: "beginner", hours: 6, tags: ["pytorch", "cnn"], tier: "mini", status: "done", stars: 156 },
  { id: "pr17", title: "Prompt Engineering Playground", description: "Interactive playground to test system/user prompts, dynamic templates, and delimiters.", difficulty: "beginner", hours: 6, tags: ["prompting", "llm"], tier: "mini", status: "todo", stars: 112 },
  { id: "pr18", title: "Text Summarization Web App", description: "Build a lightweight local UI using Hugging Face pipelines for document summaries.", difficulty: "beginner", hours: 8, tags: ["nlp", "transformers"], tier: "mini", status: "todo", stars: 95 },
  { id: "pr4", title: "Sentiment Analysis with BERT", description: "Fine-tune BERT on IMDB reviews using Hugging Face Trainer.", difficulty: "intermediate", hours: 12, tags: ["nlp", "bert"], tier: "medium", status: "in-progress", stars: 340 },
  { id: "pr5", title: "House Price Regression with XGBoost", description: "Kaggle Ames housing — leakage-free pipeline + SHAP explainability.", difficulty: "intermediate", hours: 10, tags: ["xgboost", "tabular"], tier: "medium", status: "done", stars: 210 },
  { id: "pr19", title: "Azure OpenAI Custom Chatbot", description: "Chatbot integrated with Azure OpenAI, content safety filters, and system prompt formatting.", difficulty: "intermediate", hours: 15, tags: ["azure", "llm"], tier: "medium", status: "todo", stars: 230 },
  { id: "pr20", title: "Semantic Search Engine", description: "Build dense search indexing over custom documents with FAISS and cross-encoder re-ranking.", difficulty: "intermediate", hours: 18, tags: ["embeddings", "search"], tier: "medium", status: "todo", stars: 405 },
  { id: "pr24", title: "Enterprise NER System", description: "Build and deploy a custom spaCy NER model for clinical or legal entity extraction.", difficulty: "intermediate", hours: 15, tags: ["nlp", "ner", "spacy"], tier: "medium", status: "todo", stars: 185 },
  { id: "pr6", title: "Image Captioning (ViT + GPT-2)", description: "Encoder-decoder captioning on COCO.", difficulty: "advanced", hours: 30, tags: ["vision", "nlp"], tier: "medium", status: "todo", stars: 410 },
  { id: "pr7", title: "RAG over Company Docs", description: "Production RAG: hybrid BM25+dense retrieval, reranker, eval suite.", difficulty: "advanced", hours: 25, tags: ["rag", "llm"], tier: "medium", status: "in-progress", stars: 890 },
  { id: "pr21", title: "Agentic RAG Assistant", description: "Design a stateful search agent using LangGraph, incorporating corrective retrieval (CRAG) and self-eval loops.", difficulty: "advanced", hours: 35, tags: ["rag", "agents", "langgraph"], tier: "medium", status: "todo", stars: 550 },
  { id: "pr8", title: "Diffusion Model: MNIST → Faces", description: "Implement DDPM and DDIM samplers end-to-end.", difficulty: "advanced", hours: 40, tags: ["diffusion"], tier: "medium", status: "todo", stars: 220 },
  { id: "pr9", title: "Fine-tune Llama-3 with QLoRA", description: "Domain-specific 8B model on a single 24GB GPU.", difficulty: "advanced", hours: 30, tags: ["lora", "llm"], tier: "medium", status: "todo", stars: 670 },
  { id: "pr10", title: "Voice Assistant (Whisper + TTS)", description: "Realtime speech-in / speech-out pipeline with VAD.", difficulty: "advanced", hours: 25, tags: ["speech"], tier: "medium", status: "todo", stars: 530 },
  { id: "pr25", title: "Transformer Machine Translation", description: "Train a sequence-to-sequence Transformer model for English-to-Spanish translation on the Europarl corpus.", difficulty: "advanced", hours: 30, tags: ["nlp", "translation", "pytorch"], tier: "medium", status: "todo", stars: 290 },
  { id: "pr26", title: "Extractive Question Answering", description: "Fine-tune DeBERTa on the SQuAD v2 dataset with negative question handling.", difficulty: "advanced", hours: 25, tags: ["nlp", "qa", "deberta"], tier: "medium", status: "todo", stars: 310 },
  { id: "pr11", title: "Multi-Agent Research Assistant", description: "Planner + worker agents with MCP tools and citation tracking.", difficulty: "expert", hours: 60, tags: ["agents", "mcp"], tier: "enterprise", status: "todo", stars: 1450 },
  { id: "pr22", title: "Multimodal RAG Application", description: "Ingest PDFs containing diagrams/tables, index layout representations in a vector store, and search with a VLM.", difficulty: "expert", hours: 55, tags: ["rag", "multimodal", "vlm"], tier: "enterprise", status: "todo", stars: 820 },
  { id: "pr12", title: "Feature Store from Scratch", description: "Offline + online store with Redis and Postgres, point-in-time joins.", difficulty: "expert", hours: 50, tags: ["mlops", "data"], tier: "enterprise", status: "todo", stars: 720 },
  { id: "pr13", title: "vLLM-Powered Inference Service", description: "Multi-model gateway with prefix caching and autoscaling on K8s.", difficulty: "expert", hours: 45, tags: ["inference", "mlops"], tier: "enterprise", status: "todo", stars: 980 },
  { id: "pr14", title: "Recommendation System (Two-Tower)", description: "Candidate generation + ranker, served via TF Serving.", difficulty: "expert", hours: 50, tags: ["recsys"], tier: "enterprise", status: "todo", stars: 640 },
  { id: "pr23", title: "Azure End-to-End LLMOps Pipeline", description: "Enterprise deployment with APIM gateway, Prompt Flow DAGs, Container Apps hosting, and Azure Monitor logging.", difficulty: "expert", hours: 70, tags: ["azure", "mlops", "architecture"], tier: "enterprise", status: "todo", stars: 950 },
  { id: "pr27", title: "Enterprise Chatbot Platform", description: "Deploy a customer support chatbot utilizing Azure AI Language CLU, routing, and fallbacks.", difficulty: "expert", hours: 50, tags: ["azure", "chatbot", "clu"], tier: "enterprise", status: "todo", stars: 620 },
  { id: "pr28", title: "Azure NLP API Deployment", description: "Pack and deploy a containerized NLP model using Azure ML Managed Online Endpoints and Azure Container Apps.", difficulty: "expert", hours: 40, tags: ["azure", "mlops", "deployment"], tier: "enterprise", status: "todo", stars: 480 },
  { id: "pr29", title: "End-to-End NLP MLOps Pipeline", description: "Automated retraining, drift monitoring on embedding distributions, and deployment pipelines.", difficulty: "expert", hours: 60, tags: ["mlops", "nlp"], tier: "enterprise", status: "todo", stars: 710 },
  { id: "pr15", title: "Capstone: AI Code Reviewer", description: "Production-grade agent reviewing PRs with repo-wide context.", difficulty: "expert", hours: 120, tags: ["agents", "capstone"], tier: "capstone", status: "todo", stars: 2100 },
  { id: "pr16", title: "Capstone: End-to-End AI SaaS", description: "Auth, billing, vector DB, evals, observability — ship a real product.", difficulty: "expert", hours: 150, tags: ["capstone", "saas"], tier: "capstone", status: "todo", stars: 1780 },
];

export interface InterviewQ {
  id: string; question: string; category: "system-design" | "ml-design" | "coding" | "behavioral" | "llm-design";
  difficulty: Difficulty; companies: string[]; bookmarked: boolean;
}

export const interviewQuestions: InterviewQ[] = [
  { id: "i1", question: "Design a recommendation system for a streaming service like Netflix.", category: "ml-design", difficulty: "advanced", companies: ["Netflix", "Spotify", "YouTube"], bookmarked: true },
  { id: "i2", question: "How would you build a RAG system for legal documents with citation requirements?", category: "llm-design", difficulty: "advanced", companies: ["Harvey", "Anthropic", "Casetext"], bookmarked: false },
  { id: "i3", question: "Explain backpropagation step-by-step and derive the gradients for a 2-layer MLP.", category: "ml-design", difficulty: "intermediate", companies: ["Google", "Meta", "Apple"], bookmarked: true },
  { id: "i4", question: "Design a global feature store with point-in-time correctness.", category: "system-design", difficulty: "expert", companies: ["Uber", "Airbnb", "DoorDash"], bookmarked: false },
  { id: "i5", question: "Implement scaled dot-product attention from scratch in PyTorch.", category: "coding", difficulty: "advanced", companies: ["OpenAI", "DeepMind", "Meta"], bookmarked: true },
  { id: "i6", question: "Walk me through a project where you owned an ML model in production end-to-end.", category: "behavioral", difficulty: "intermediate", companies: ["Stripe", "Datadog", "Shopify"], bookmarked: false },
  { id: "i7", question: "Design an LLM inference platform serving 1M QPS with mixed model sizes.", category: "system-design", difficulty: "expert", companies: ["OpenAI", "Anthropic", "Together AI"], bookmarked: false },
  { id: "i8", question: "How do you evaluate a RAG pipeline beyond hit-rate@k?", category: "llm-design", difficulty: "advanced", companies: ["Anthropic", "Cohere"], bookmarked: true },
  { id: "i9", question: "Explain the bias-variance tradeoff with a concrete example.", category: "ml-design", difficulty: "beginner", companies: ["Amazon", "Microsoft"], bookmarked: false },
  { id: "i10", question: "Implement K-means from scratch and discuss its failure modes.", category: "coding", difficulty: "intermediate", companies: ["Two Sigma", "Citadel"], bookmarked: false },
  { id: "i11", question: "Design a content moderation system using LLMs at scale.", category: "system-design", difficulty: "advanced", companies: ["Meta", "TikTok", "Discord"], bookmarked: false },
  { id: "i12", question: "Compare LoRA, QLoRA, full fine-tuning, and prompt tuning — when to use each?", category: "llm-design", difficulty: "advanced", companies: ["Hugging Face", "Mistral"], bookmarked: true },
  { id: "i13", question: "Tell me about a time you disagreed with a teammate on a model design decision.", category: "behavioral", difficulty: "intermediate", companies: ["Google", "Stripe"], bookmarked: false },
  { id: "i14", question: "Implement an LRU cache.", category: "coding", difficulty: "intermediate", companies: ["Meta", "Google", "Amazon"], bookmarked: false },
  { id: "i15", question: "How would you detect data drift in production?", category: "ml-design", difficulty: "intermediate", companies: ["Arize", "WhyLabs", "Datadog"], bookmarked: false },
  { id: "i16", question: "Design YouTube's video recommendation funnel: candidate generation → ranking → re-ranking.", category: "ml-design", difficulty: "expert", companies: ["YouTube", "TikTok"], bookmarked: true },
  { id: "i17", question: "How do you prevent prompt injection in an agent that has tool access?", category: "llm-design", difficulty: "advanced", companies: ["Anthropic", "OpenAI"], bookmarked: false },
  { id: "i18", question: "Find the longest substring without repeating characters.", category: "coding", difficulty: "intermediate", companies: ["Meta", "Microsoft"], bookmarked: false },
  { id: "i19", question: "Design an A/B testing platform for ML models with guardrail metrics.", category: "system-design", difficulty: "advanced", companies: ["Airbnb", "Booking.com"], bookmarked: false },
  { id: "i20", question: "Tell me about a model failure in production and what you learned.", category: "behavioral", difficulty: "intermediate", companies: ["Uber", "Lyft"], bookmarked: false },
];

export interface Achievement {
  id: string; title: string; description: string; icon: string; unlocked: boolean; xp: number; rarity: "common" | "rare" | "epic" | "legendary";
}

export const achievements: Achievement[] = [
  { id: "a1", title: "First Steps", description: "Completed your first lesson", icon: "Footprints", unlocked: true, xp: 50, rarity: "common" },
  { id: "a2", title: "Week Warrior", description: "7-day learning streak", icon: "Flame", unlocked: true, xp: 200, rarity: "rare" },
  { id: "a3", title: "Math Mage", description: "Mastered linear algebra", icon: "Sigma", unlocked: true, xp: 500, rarity: "epic" },
  { id: "a4", title: "Python Pro", description: "Completed every Python module", icon: "Code2", unlocked: true, xp: 400, rarity: "rare" },
  { id: "a5", title: "Notebook Native", description: "Ran 25 lab notebooks", icon: "BookOpen", unlocked: true, xp: 300, rarity: "rare" },
  { id: "a6", title: "Transformer Tamer", description: "Built attention from scratch", icon: "Sparkles", unlocked: false, xp: 1000, rarity: "epic" },
  { id: "a7", title: "RAG Master", description: "Shipped a production RAG system", icon: "Database", unlocked: false, xp: 1500, rarity: "legendary" },
  { id: "a8", title: "Agent Architect", description: "Designed a multi-agent system", icon: "Workflow", unlocked: false, xp: 2000, rarity: "legendary" },
  { id: "a9", title: "Paper Scholar", description: "Read 50 research papers", icon: "FileText", unlocked: false, xp: 800, rarity: "epic" },
  { id: "a10", title: "Fine-tune Wizard", description: "Successfully fine-tuned a 7B+ model", icon: "Wand2", unlocked: false, xp: 1200, rarity: "epic" },
  { id: "a11", title: "Interview Ready", description: "Solved 100 interview questions", icon: "Briefcase", unlocked: false, xp: 700, rarity: "rare" },
  { id: "a12", title: "Chief Architect", description: "Completed the entire roadmap", icon: "Crown", unlocked: false, xp: 10000, rarity: "legendary" },
];

export interface Certification {
  id: string; title: string; provider: string; status: "earned" | "in-progress" | "available";
  progress: number; icon: string; color: string;
}

export const certifications: Certification[] = [
  { id: "c1", title: "AI Foundations", provider: "AIMastery", status: "earned", progress: 100, icon: "Award", color: "#34D399" },
  { id: "c2", title: "Python for Data Science", provider: "AIMastery", status: "earned", progress: 100, icon: "Award", color: "#22D3EE" },
  { id: "c3", title: "ML Practitioner", provider: "AIMastery", status: "in-progress", progress: 64, icon: "Award", color: "#A78BFA" },
  { id: "c4", title: "Deep Learning Specialist", provider: "AIMastery", status: "in-progress", progress: 38, icon: "Award", color: "#60A5FA" },
  { id: "c5", title: "LLM Engineer", provider: "AIMastery", status: "in-progress", progress: 22, icon: "Award", color: "#7C3AED" },
  { id: "c6", title: "MLOps Engineer", provider: "AIMastery", status: "available", progress: 0, icon: "Award", color: "#FB7185" },
  { id: "c7", title: "AI Architect", provider: "AIMastery", status: "available", progress: 0, icon: "Award", color: "#FBBF24" },
  { id: "c8", title: "Chief AI Architect", provider: "AIMastery", status: "available", progress: 0, icon: "Crown", color: "#F472B6" },
];

export interface Note {
  id: string; title: string; preview: string; tags: string[]; updatedAt: string; pinned: boolean;
}

export const notes: Note[] = [
  { id: "n1", title: "Attention Mechanism — Full Derivation", preview: "Self-attention: Attention(Q,K,V) = softmax(QKᵀ/√dk)V. The √dk scaling prevents softmax saturation as dimensions grow.", tags: ["transformer", "deep-learning"], updatedAt: "2h ago", pinned: true },
  { id: "n2", title: "RAG Chunking Strategies", preview: "Semantic chunking outperforms fixed-size for narrative docs. Use 256–512 token chunks with 10–20% overlap.", tags: ["rag", "llm"], updatedAt: "1d ago", pinned: true },
  { id: "n3", title: "LoRA Math", preview: "W = W₀ + BA where B ∈ R^(d×r), A ∈ R^(r×k). Initialize B=0 so the delta starts at zero.", tags: ["fine-tuning"], updatedAt: "3d ago", pinned: false },
  { id: "n4", title: "Gradient Descent Variants", preview: "SGD: noisy. Momentum: smooths. RMSProp: scales by EMA of g². Adam: combines + bias correction. AdamW: decouples weight decay.", tags: ["optimization"], updatedAt: "1w ago", pinned: false },
  { id: "n5", title: "Vector DB Benchmarks", preview: "Qdrant beats Pinecone on filtered queries. Milvus shines past 1B vectors. pgvector is fine ≤10M with HNSW.", tags: ["vector-db"], updatedAt: "1w ago", pinned: false },
  { id: "n6", title: "Transformer Position Encodings", preview: "Sinusoidal: generalizes to longer seqs. RoPE: rotates Q,K — used by Llama, Qwen. ALiBi: adds linear bias.", tags: ["transformer"], updatedAt: "2w ago", pinned: false },
  { id: "n7", title: "MLE vs MAP vs Bayesian", preview: "MLE: argmax P(D|θ). MAP: adds prior. Bayesian: keeps full posterior. MAP with Gaussian prior == L2 reg.", tags: ["statistics", "bayes"], updatedAt: "3w ago", pinned: false },
  { id: "n8", title: "CNN Receptive Field Cheatsheet", preview: "Stacking 3×3 convs grows RF linearly. Dilated convs grow exponentially. Always check effective RF.", tags: ["cnn", "vision"], updatedAt: "1mo ago", pinned: false },
];

export interface PDFItem {
  id: string; title: string; pages: number; uploadedAt: string; size: string; tags: string[]; thumb: string;
  filename?: string; parentId?: string; chapter?: number;
}

export const pdfs: PDFItem[] = [
  { id: "pdf-ml-hero", title: "Machine Learning — Zero to Hero", pages: 95, uploadedAt: "Just now", size: "3.2 MB", tags: ["textbook", "machine-learning"], thumb: "📘", filename: "Machine Learning -Zero -Hero.pdf" },
  { id: "pdf-ml-ch1", title: "Chapter 1: Introduction to AI Ecosystem", pages: 42, uploadedAt: "Just now", size: "9.4 MB", tags: ["chapter", "machine-learning"], thumb: "📄", filename: "Chapter1-Introduction to Artificial Intelligence Ecosystem.pdf", parentId: "pdf-ml-hero", chapter: 1 },
  { id: "pdf-ml-ch2", title: "Chapter 2: Core Machine Learning Concepts", pages: 55, uploadedAt: "Just now", size: "15.8 MB", tags: ["chapter", "machine-learning"], thumb: "📄", filename: "Chapter 2 - Core ML Concepts.pdf", parentId: "pdf-ml-hero", chapter: 2 },
  { id: "pdf-ml-ch3", title: "Chapter 3: Machine Learning Terminologies", pages: 28, uploadedAt: "Just now", size: "8.0 MB", tags: ["chapter", "machine-learning"], thumb: "📄", filename: "Chapter 3 - ML terminologies.pdf", parentId: "pdf-ml-hero", chapter: 3 },
  { id: "pdf-dl-hero", title: "Deep Learning — Zero to Hero", pages: 85, uploadedAt: "Just now", size: "3.0 MB", tags: ["textbook", "deep-learning"], thumb: "🧠", filename: "Deep-Learning- Zero -Hero.pdf" },
  { id: "pdf-nlp-hero", title: "Natural Language Processing — Zero to Hero", pages: 78, uploadedAt: "Just now", size: "3.0 MB", tags: ["textbook", "nlp"], thumb: "💬", filename: "NLP-Zero-Hero.pdf" },
  { id: "pdf-llm-hero", title: "LLM & RAG — Zero to Hero", pages: 92, uploadedAt: "Just now", size: "3.2 MB", tags: ["textbook", "llm", "rag"], thumb: "✨", filename: "LLM & RAG-Zero-Hero.pdf" },
];

export interface Notebook {
  id: string; title: string; kernel: string; updatedAt: string; cells: number; tags: string[];
}

export const notebooks: Notebook[] = [
  { id: "nb1", title: "Linear Regression from Scratch (NumPy)", kernel: "Python 3.11", updatedAt: "1h ago", cells: 24, tags: ["ml"] },
  { id: "nb2", title: "Logistic Regression & Cross-Entropy", kernel: "Python 3.11", updatedAt: "5h ago", cells: 19, tags: ["ml"] },
  { id: "nb3", title: "Decision Trees & Random Forest", kernel: "Python 3.11", updatedAt: "Yesterday", cells: 22, tags: ["ml", "sklearn"] },
  { id: "nb4", title: "XGBoost on Tabular Data", kernel: "Python 3.11", updatedAt: "Yesterday", cells: 28, tags: ["xgboost"] },
  { id: "nb5", title: "MNIST CNN (PyTorch)", kernel: "PyTorch / CUDA", updatedAt: "2d ago", cells: 26, tags: ["pytorch", "cnn"] },
  { id: "nb6", title: "Fine-tune BERT on IMDB", kernel: "PyTorch / CUDA", updatedAt: "2d ago", cells: 18, tags: ["nlp", "bert"] },
  { id: "nb7", title: "Transformer from Scratch", kernel: "PyTorch / CUDA", updatedAt: "3d ago", cells: 38, tags: ["transformer"] },
  { id: "nb8", title: "RAG Eval Suite (Ragas)", kernel: "Python 3.11", updatedAt: "3d ago", cells: 32, tags: ["rag", "eval"] },
  { id: "nb9", title: "LoRA Fine-tune Mistral-7B", kernel: "PyTorch / CUDA", updatedAt: "5d ago", cells: 29, tags: ["lora", "llm"] },
  { id: "nb10", title: "Diffusion Sandbox (DDPM)", kernel: "PyTorch / CUDA", updatedAt: "1w ago", cells: 41, tags: ["diffusion"] },
  { id: "nb11", title: "Multi-Agent Planner with Tools", kernel: "Python 3.11", updatedAt: "1w ago", cells: 35, tags: ["agents"] },
  { id: "nb12", title: "Vector Search Benchmarks", kernel: "Python 3.11", updatedAt: "2w ago", cells: 16, tags: ["vector-db"] },
];

export const weeklyActivity = [
  { day: "Mon", hours: 2.4, lessons: 3 },
  { day: "Tue", hours: 3.1, lessons: 5 },
  { day: "Wed", hours: 1.8, lessons: 2 },
  { day: "Thu", hours: 4.2, lessons: 6 },
  { day: "Fri", hours: 2.9, lessons: 4 },
  { day: "Sat", hours: 5.6, lessons: 8 },
  { day: "Sun", hours: 3.7, lessons: 5 },
];

export const skillRadar = [
  { skill: "Math", score: 78 },
  { skill: "Python", score: 92 },
  { skill: "Classic ML", score: 68 },
  { skill: "Deep Learning", score: 54 },
  { skill: "NLP", score: 62 },
  { skill: "LLM Eng", score: 71 },
  { skill: "MLOps", score: 45 },
  { skill: "Systems", score: 80 },
];

export const learnerProfile = {
  name: "Alex Morgan",
  role: "Aspiring Chief AI Architect",
  avatar: "AM",
  level: 24,
  xp: 18420,
  xpToNext: 22000,
  streak: 47,
  totalHours: 312,
  lessonsCompleted: 187,
  rank: "Senior ML Engineer",
  weeklyGoal: 15,
  weeklyProgress: 11.4,
};
