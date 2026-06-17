import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ArrowLeft, Clock, BookOpen, Network,
  Zap, CheckCircle2, Database, TrendingUp, Terminal, Flame, Cpu, Award, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge-graph")({
  head: () => ({ meta: [{ title: "Interactive Knowledge Graph · AIMastery" }] }),
  component: KnowledgeGraphPage,
});

// ============================================================
// Core Datasets for Global Graph & Subgraphs
// ============================================================

const globalNodes = [
  { 
    id: "math", 
    label: "Mathematical Foundations", 
    x: 35, 
    y: 15, 
    size: 28, 
    color: "#a78bfa", // violet-400
    desc: "Linear Algebra, multivariate calculus, optimization algorithms, probability distributions, and causal inference. The numeric core of AI.",
    badge: "Phase 1 - 2",
    topics: ["Linear Algebra & SVD", "Matrix Calculus & Jacobians", "Probability & Information Theory", "Causal Inference & SCMs"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "python", 
    label: "CS & Python Foundations", 
    x: 15, 
    y: 32, 
    size: 24, 
    color: "#22d3ee", // cyan-400
    desc: "Advanced data structures, asyncio concurrency, performance profiling, testing patterns, Linux commands, and containerized Docker environments.",
    badge: "Phase 0",
    topics: ["Algorithms & DSA Core", "asyncio Concurrency", "Docker & Containers", "Linux Command Line"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "ml", 
    label: "Classical Machine Learning", 
    x: 45, 
    y: 40, 
    size: 28, 
    color: "#fb7185", // rose-400
    desc: "Empirical risk minimization, regression diagnostics, maximum margin classifiers (SVM), decision forests, and model validation bounds.",
    badge: "Phase 3",
    topics: ["GLMs & Regression Diagnostics", "Support Vector Machines", "Random Forests & XGBoost", "Bias-Variance Tradeoff"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "dl", 
    label: "Deep Learning & PyTorch", 
    x: 68, 
    y: 32, 
    size: 30, 
    color: "#3b82f6", // blue-500
    desc: "Reverse-mode autograd engines, dynamic computation graphs, custom tensor layers, CNN feature filters, sequence models, and custom optimizers.",
    badge: "Phase 3",
    topics: ["Autograd Differentiation Engine", "Backpropagation Calculus", "Custom PyTorch Tensor Layers", "Optimizers (AdamW & Schedulers)"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "nlp", 
    label: "Transformers & NLP Core", 
    x: 50, 
    y: 72, 
    size: 26, 
    color: "#f472b6", // pink-400
    desc: "Word embedding math, tokenization mechanics (BPE), scaled dot-product attention mapping, residual block stacking, and causal pretraining.",
    badge: "Phase 3",
    topics: ["Word2Vec & Subword BPE", "Multi-Head Self-Attention", "Residual Skip Connections", "Language Model Pretraining"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "llm", 
    label: "LLM Engineering & RAG", 
    x: 78, 
    y: 72, 
    size: 32, 
    color: "#a855f7", // purple-500
    desc: "Semantic vector retrieval, knowledge graphs (GraphRAG), supervised instruction tuning, parameter-efficient adapters, and Quantization.",
    badge: "Phase 4",
    topics: ["Vector Databases & Similarity", "Advanced Graph RAG", "Instruction Tuning", "LoRA / QLoRA PEFT"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "agents", 
    label: "Agentic AI Orchestration", 
    x: 88, 
    y: 48, 
    size: 28, 
    color: "#fbbf24", // amber-400
    desc: "LangGraph state machine architectures, function tool calling bindings, autonomous planning loops, and hierarchical multi-agent collaboration.",
    badge: "Phase 5",
    topics: ["Tool Calling APIs", "LangGraph Cyclic Flowcharts", "ToT & ReAct Loops", "Multi-Agent Supervisor Routing"],
    lessonsRoute: "/roadmap"
  },
  { 
    id: "mlops", 
    label: "Enterprise MLOps & Scaling", 
    x: 18, 
    y: 72, 
    size: 26, 
    color: "#fb923c", // orange-400
    desc: "High-performance GPU serving with NVIDIA Triton, Kubernetes cluster auto-scaling, distributed pipelines, and concept drift statistical tests.",
    badge: "Phase 6",
    topics: ["Triton Inference Server", "Kubernetes Scaling", "Continuous Drift Monitoring", "Model Lineage & Registries"],
    lessonsRoute: "/roadmap"
  },
];

const globalEdges = [
  { from: "python", to: "ml" },
  { from: "math", to: "ml" },
  { from: "ml", to: "dl" },
  { from: "dl", to: "nlp" },
  { from: "dl", to: "mlops" },
  { from: "nlp", to: "llm" },
  { from: "llm", to: "agents" },
  { from: "llm", to: "mlops" },
  { from: "python", to: "mlops" },
];

const subgraphs: Record<string, {
  nodes: { id: string; label: string; x: number; y: number; size: number; color: string; desc: string; topics: string[] }[];
  edges: [string, string][];
}> = {
  python: {
    nodes: [
      { id: "dsa", label: "Data Structures & Algos", x: 20, y: 30, size: 22, color: "#22d3ee", desc: "Core algorithms, hashes, sliding windows, heaps, trees, and graph traversals for system efficiency.", topics: ["Two Pointers & Sliding Window", "Graph BFS & DFS", "Tabulation DP Patterns"] },
      { id: "async", label: "asyncio Concurrency", x: 50, y: 30, size: 22, color: "#22d3ee", desc: "Asynchronous task loops, co-routines, and event loop bottlenecks under GIL restrictions.", topics: ["Event Loops & Coroutines", "aiohttp Task Gathering", "GIL Concurrency Limits"] },
      { id: "testing", label: "Testing & Profiling", x: 80, y: 50, size: 22, color: "#10b981", desc: "Writing unit/integration tests with pytest, mocking interfaces, and profiling cpu/memory bottlenecks.", topics: ["pytest Fixtures & Mocking", "cProfile Code Optimization", "Ruff Linting & pre-commit"] },
      { id: "git", label: "Version Control & Git", x: 50, y: 80, size: 20, color: "#818cf8", desc: "PR workflows, merge conflicts, interactive rebasing, git hooks, and monorepos.", topics: ["Rebasing & Cherry-pick", "Git Hooks & pre-commit", "Trunk-Based Development"] },
    ],
    edges: [
      ["dsa", "async"],
      ["async", "testing"],
      ["testing", "git"],
    ]
  },
  math: {
    nodes: [
      { id: "linalg", label: "Linear Algebra", x: 25, y: 30, size: 24, color: "#a78bfa", desc: "Vector spaces, basis matrices, linear systems, eigenvalues, SVD, and NumPy applications.", topics: ["Eigenvalues & Eigenvectors", "Singular Value Decomposition (SVD)", "Tensor Operations & Broadcasting"] },
      { id: "calculus", label: "Matrix Calculus", x: 75, y: 30, size: 24, color: "#a78bfa", desc: "Partial derivatives, gradient vectors, Jacobian, Hessian matrices, and chain rule computations.", topics: ["Jacobians & Hessians", "Chain Rule in Higher Dimensions", "Taylor Series Approximations"] },
      { id: "prob", label: "Probability & Bayes", x: 25, y: 70, size: 24, color: "#818cf8", desc: "Probability density distributions, conditional variance, and Bayesian parameter estimation.", topics: ["Bayesian Parameter Estimation", "Joint & Marginal Distributions", "KL & Jensen-Shannon Divergence"] },
      { id: "stats", label: "Inferential Statistics", x: 75, y: 70, size: 24, color: "#818cf8", desc: "Hypothesis testing, ANOVA significance, Jackknife resampling, and causal structural modeling.", topics: ["t-tests & ANOVA Analysis", "Bootstrap Confidence Intervals", "Structural Causal Models (SCMs)"] },
    ],
    edges: [
      ["linalg", "calculus"],
      ["calculus", "stats"],
      ["prob", "stats"],
    ]
  },
  ml: {
    nodes: [
      { id: "regression", label: "Regression Diagnostics", x: 20, y: 30, size: 22, color: "#fb7185", desc: "Linear, logistic, and polynomial models, evaluating collinearity and heteroscedasticity.", topics: ["Variance Inflation Factor (VIF)", "Breusch-Pagan Homoscedasticity Test", "Link Functions & GLMs"] },
      { id: "svm", label: "Support Vector Machines", x: 50, y: 30, size: 22, color: "#fb7185", desc: "Maximum margin classifiers, kernel tricks, and dual formulation under convex optimization constraints.", topics: ["Lagrangian Dual Optimization", "RBF & Polynomial Kernels", "Support Vectors Boundary"] },
      { id: "trees", label: "Ensemble Trees", x: 50, y: 80, size: 24, color: "#fb7185", desc: "Random Forests and Gradient Boosted Decision Trees (XGBoost, LightGBM) for tabular data.", topics: ["Bagging vs Boosting", "XGBoost Regularization Loss", "SHAP Feature Importance"] },
      { id: "eval_ml", label: "Model Validation", x: 80, y: 50, size: 22, color: "#10b981", desc: "Stratified cross-validation, ROC-AUC precision curves, and Rademacher generalization boundaries.", topics: ["K-Fold Stratified Validation", "Precision-Recall AUC Curves", "Rademacher Generalization Bounds"] },
    ],
    edges: [
      ["regression", "svm"],
      ["svm", "trees"],
      ["trees", "eval_ml"],
    ]
  },
  dl: {
    nodes: [
      { id: "autograd", label: "Autograd Engines", x: 20, y: 30, size: 22, color: "#60a5fa", desc: "Reverse-mode automatic differentiation backends and computation graph construction.", topics: ["Reverse-Mode Accumulation", "Dynamic Computation Graphs", "Jacobian Vector Products"] },
      { id: "backprop", label: "Backpropagation", x: 50, y: 30, size: 24, color: "#a78bfa", desc: "The foundational mathematical algorithm propagating errors using multivariable chain rule.", topics: ["Multivariable Chain Rule", "Gradient Flow & Vanishing Gradients", "Loss Surface Optimization"] },
      { id: "custom_layers", label: "Custom Tensor Layers", x: 80, y: 30, size: 20, color: "#f472b6", desc: "Building modular layers from scratch in PyTorch extending torch.autograd.Function.", topics: ["Forward & Backward passes", "State memory retention", "Custom CUDA backends"] },
      { id: "cnn", label: "CNN Architectures", x: 30, y: 75, size: 22, color: "#06b6d4", desc: "Convolutional filters, pooling, stride, padding, and image feature extraction.", topics: ["Convolutions & Pooling Layers", "Feature Map Visualizations", "ResNet Skip Connections"] },
      { id: "lstm", label: "Sequence Models (LSTM)", x: 70, y: 75, size: 22, color: "#10b981", desc: "Recurrent networks with gating mechanisms to prevent gradient explosion over time.", topics: ["Input, Forget & Output Gates", "Hidden State vs Cell State", "Vanishing Gradient Mitigation"] },
    ],
    edges: [
      ["autograd", "backprop"],
      ["backprop", "custom_layers"],
      ["backprop", "cnn"],
      ["backprop", "lstm"],
    ]
  },
  nlp: {
    nodes: [
      { id: "embeds", label: "Word Embeddings", x: 20, y: 30, size: 22, color: "#f472b6", desc: "Word2Vec, GloVe, sub-word tokenization, and vector spatial math.", topics: ["Word2Vec & Skip-gram", "Subword Tokenizers (BPE)", "Cosine Similarity Mapping"] },
      { id: "attention", label: "Self-Attention Mechanics", x: 50, y: 30, size: 24, color: "#a855f7", desc: "Scaled dot-product attention mapping Queries, Keys, and Values.", topics: ["Query, Key, Value Matrices", "Multi-Head Attention Layers", "Softmax Probability Weights"] },
      { id: "blocks", label: "Transformer Blocks", x: 80, y: 50, size: 24, color: "#3b82f6", desc: "Layer normalization, feed-forward networks, and residual connections.", topics: ["LayerNorm & RMSNorm", "Residual Skip Connections", "Rotary Embeddings (RoPE)"] },
      { id: "pretrain", label: "Pretraining Loops", x: 50, y: 80, size: 22, color: "#10b981", desc: "Autoregressive causal language modeling and masked language models.", topics: ["Causal Language Modeling (CLM)", "Masked Language Modeling (MLM)", "Cross-Entropy Loss Backprop"] },
    ],
    edges: [
      ["embeds", "attention"],
      ["attention", "blocks"],
      ["blocks", "pretrain"],
    ]
  },
  llm: {
    nodes: [
      { id: "prompt", label: "Prompt Engineering", x: 25, y: 30, size: 20, color: "#a855f7", desc: "Advanced prompt techniques: Chain of Thought, ReAct, and system role tuning.", topics: ["System Prompts", "Few-shot In-context Learning", "Chain-of-Thought (CoT)"] },
      { id: "vectordb", label: "Vector Databases", x: 25, y: 70, size: 22, color: "#22d3ee", desc: "Embedding databases, HNSW index algorithms, cosine similarity, and database scaling.", topics: ["HNSW & IVF Indexing", "Pinecone, Chroma & Milvus", "Similarity Search Metrics"] },
      { id: "sub_rag", label: "Graph & Advanced RAG", x: 50, y: 50, size: 26, color: "#34d399", desc: "Retrieval Augmented Generation combining vector search and knowledge graphs.", topics: ["Knowledge Graph Retrieval", "Hybrid Search & Reranking", "Self-RAG Correction Loops"] },
      { id: "finetuning", label: "Supervised Fine-Tuning", x: 75, y: 30, size: 24, color: "#f43f5e", desc: "Instruction tuning, full weight updates, and dataset formatting.", topics: ["Instruction Tuning Datasets", "Learning Rates & Decays", "Loss Function Computation"] },
      { id: "peft", label: "PEFT (LoRA / QLoRA)", x: 75, y: 70, size: 22, color: "#fb923c", desc: "Parameter Efficient Fine Tuning, updating low-rank adapter matrices to save memory.", topics: ["LoRA Rank (r) & Alpha Tuning", "Quantized QLoRA 4-bit loading", "Adapter Merging & Export"] },
    ],
    edges: [
      ["prompt", "sub_rag"],
      ["vectordb", "sub_rag"],
      ["sub_rag", "peft"],
      ["finetuning", "peft"],
    ]
  },
  agents: {
    nodes: [
      { id: "tool_use", label: "Tool Calling APIs", x: 20, y: 50, size: 22, color: "#fbbf24", desc: "Function schemas, API bindings, and JSON parsing loop constraints.", topics: ["Function Definitions", "System Validation Parsing", "Tool Output Feeding"] },
      { id: "planning", label: "Planning & Reason", x: 50, y: 20, size: 24, color: "#fb923c", desc: "Decomposing complex goals into steps (Tree of Thoughts, Self-Reflection).", topics: ["Tree of Thoughts (ToT)", "ReAct Loop Architecture", "Goal Decomposition"] },
      { id: "statemachines", label: "State Graph (LangGraph)", x: 50, y: 80, size: 26, color: "#a855f7", desc: "Cyclic state graphs maintaining execution context across multi-step flows.", topics: ["Cyclic Flow State Machines", "State Reducers & Contexts", "Human-in-the-Loop Interventions"] },
      { id: "agent_teams", label: "Multi-Agent Systems", x: 80, y: 50, size: 24, color: "#f43f5e", desc: "Collaborative systems dividing specialized roles among agent networks.", topics: ["Supervisor Router Patterns", "Hierarchical Agent Teams", "Inter-Agent Communication"] },
    ],
    edges: [
      ["tool_use", "planning"],
      ["planning", "statemachines"],
      ["statemachines", "agent_teams"],
      ["tool_use", "statemachines"],
    ]
  },
  mlops: {
    nodes: [
      { id: "docker", label: "Containerization", x: 20, y: 30, size: 22, color: "#fb923c", desc: "Creating light, reproducible, layer-cached Docker containers for AI applications.", topics: ["Dockerfile Optimization", "Multi-stage Builds", "Container Networking"] },
      { id: "triton", label: "Triton Serving", x: 50, y: 30, size: 24, color: "#f43f5e", desc: "NVIDIA Triton Inference Server deployment, managing GPU concurrent runtimes.", topics: ["Dynamic Batching", "Model Ensembles & Pipelines", "GPU Memory Management"] },
      { id: "kubernetes", label: "K8s Orchestration", x: 80, y: 50, size: 24, color: "#38bdf8", desc: "Scaling AI workloads across compute clusters using Kubernetes and KubeFlow.", topics: ["Pod Auto-scaling", "GPU Resource Allocation", "KubeFlow Pipelines"] },
      { id: "monitoring", label: "Drift Monitoring", x: 50, y: 80, size: 22, color: "#10b981", desc: "Tracking data drift and concept drift in production models over time.", topics: ["Kolmogorov-Smirnov Drift Test", "Model Performance Alerts", "Continuous Retraining Triggers"] },
    ],
    edges: [
      ["docker", "triton"],
      ["triton", "kubernetes"],
      ["kubernetes", "monitoring"],
    ]
  }
};

// ============================================================
// Main Page Component
// ============================================================

function KnowledgeGraphPage() {
  const [viewMode, setViewMode] = useState<"global" | "subgraph">("global");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("math");

  // Load correct nodes based on global or sub-graph view mode
  const currentNodes = useMemo(() => {
    if (viewMode === "global") return globalNodes;
    if (activeCategory && subgraphs[activeCategory]) {
      return subgraphs[activeCategory].nodes;
    }
    return [];
  }, [viewMode, activeCategory]);

  // Load correct edges based on global or sub-graph view mode
  const currentEdges = useMemo(() => {
    if (viewMode === "global") return globalEdges;
    if (activeCategory && subgraphs[activeCategory]) {
      return subgraphs[activeCategory].edges.map(([from, to]) => ({ from, to }));
    }
    return [];
  }, [viewMode, activeCategory]);

  // Active Selected Node Info
  const selectedNode = useMemo(() => {
    return currentNodes.find(n => n.id === selectedNodeId) || currentNodes[0];
  }, [currentNodes, selectedNodeId]);

  // Highlight connections (prerequisites, successors, edges)
  const highlightedDetails = useMemo(() => {
    if (!selectedNode) return { prereqs: new Set<string>(), successors: new Set<string>(), edges: new Set<string>() };
    const prereqs = new Set<string>();
    const successors = new Set<string>();
    const highlightedEdges = new Set<string>();

    currentEdges.forEach(edge => {
      if (edge.to === selectedNode.id) {
        prereqs.add(edge.from);
        highlightedEdges.add(`${edge.from}->${edge.to}`);
      }
      if (edge.from === selectedNode.id) {
        successors.add(edge.to);
        highlightedEdges.add(`${edge.from}->${edge.to}`);
      }
    });

    return { prereqs, successors, edges: highlightedEdges };
  }, [currentEdges, selectedNode]);

  // SVG Camera slide/center alignment matrices
  const cameraTransform = useMemo(() => {
    if (!selectedNode) return { scale: 1, x: 0, y: 0 };
    // Center selected node (x, y) relative to 100x100 viewport
    const scale = 1.15;
    const dx = (50 - selectedNode.x) * 0.15;
    const dy = (50 - selectedNode.y) * 0.15;
    return { scale, x: dx, y: dy };
  }, [selectedNode]);

  // Helper lookup function to locate node coords
  const findNode = (id: string) => currentNodes.find(n => n.id === id)!;

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleDrillDown = (categoryId: string) => {
    if (subgraphs[categoryId]) {
      setActiveCategory(categoryId);
      setViewMode("subgraph");
      setSelectedNodeId(subgraphs[categoryId].nodes[0].id);
    }
  };

  const handleBackToGlobal = () => {
    setViewMode("global");
    setActiveCategory(null);
    setSelectedNodeId(activeCategory || "math");
  };

  return (
    <AppShell>
      <PageShell>
        <div className="flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <PageHeader
              eyebrow="Interactive Map"
              title={viewMode === "global" ? "Knowledge Graph" : `Drill Down: ${globalNodes.find(n => n.id === activeCategory)?.label}`}
              description="Explore the connected concepts of artificial intelligence. Click on nodes to highlight pre-requisite steps, read lesson details, and navigate curriculum phases."
            />
            
            {viewMode === "subgraph" && (
              <button
                onClick={handleBackToGlobal}
                className="inline-flex h-9 px-4 items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all cursor-pointer self-start md:self-auto shrink-0 shadow-md"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Global Map
              </button>
            )}
          </div>

          {/* Interactive Split Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Interactive Graph Map */}
            <div className="lg:col-span-8 rounded-2xl border border-white/5 bg-slate-950/45 backdrop-blur-md p-6 min-h-[500px] lg:min-h-[580px] flex flex-col relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              {/* Radial Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.62_0.22_295/0.06),transparent_70%)] pointer-events-none" />
              
              {/* Map Context Bar */}
              <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 z-10 font-bold bg-slate-900/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/5">
                <Globe className="h-3.5 w-3.5 text-violet-400" />
                <span>{viewMode === "global" ? "Global AI Mastery Concept Map" : `Global Map > ${globalNodes.find(n => n.id === activeCategory)?.label}`}</span>
              </div>

              {/* Dynamic SVG Container */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[1.4/1] lg:aspect-auto lg:flex-1 min-h-[350px] sm:min-h-[400px]">
                <svg viewBox="-15 -12 130 124" preserveAspectRatio="xMidYMid meet" className="w-full h-full absolute inset-0">
                  
                  {/* Dynamic Camera Animation Group */}
                  <motion.g
                    animate={{
                      scale: cameraTransform.scale,
                      x: cameraTransform.x,
                      y: cameraTransform.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 14,
                    }}
                    style={{ transformOrigin: "50px 50px" }}
                  >
                    
                    {/* 1. Edge Connections */}
                    {currentEdges.map((edge, i) => {
                      const fromNode = findNode(edge.from);
                      const toNode = findNode(edge.to);
                      if (!fromNode || !toNode) return null;

                      const isHighlighted = highlightedDetails.edges.has(`${edge.from}->${edge.to}`);
                      const isPrereqEdge = isHighlighted && edge.to === selectedNode?.id;
                      const isSuccessorEdge = isHighlighted && edge.from === selectedNode?.id;

                      let strokeColor = "rgba(255, 255, 255, 0.06)";
                      let strokeWidth = "0.2";

                      if (isHighlighted) {
                        strokeColor = isPrereqEdge ? "#fb923c" : "#22d3ee"; // Orange (prereq) vs Cyan (successor)
                        strokeWidth = "0.45";
                      }

                      return (
                        <g key={`${edge.from}-${edge.to}-${i}`}>
                          {/* Connection Line */}
                          <motion.line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                          />

                          {/* Live Animated Flow Telemetry Pulses */}
                          <motion.circle
                            cx={fromNode.x}
                            cy={fromNode.y}
                            r={isHighlighted ? 0.7 : 0.4}
                            fill={isHighlighted ? (isPrereqEdge ? "#fb923c" : "#22d3ee") : "rgba(255, 255, 255, 0.15)"}
                            animate={{
                              cx: [fromNode.x, toNode.x],
                              cy: [fromNode.y, toNode.y]
                            }}
                            transition={{
                              duration: isHighlighted ? 2.4 : 3.8,
                              repeat: Infinity,
                              ease: "linear",
                              delay: (i * 0.45) % 2.5
                            }}
                          />
                        </g>
                      );
                    })}

                    {/* 2. Concept Nodes */}
                    {currentNodes.map((n, i) => {
                      const isSelected = n.id === selectedNode?.id;
                      const isPrereq = highlightedDetails.prereqs.has(n.id);
                      const isSuccessor = highlightedDetails.successors.has(n.id);
                      const isRelated = isSelected || isPrereq || isSuccessor;

                      // Sizing metric
                      const size = n.size / 10 + 0.8;

                      // Ring Styling based on connection telemetry
                      let ringStroke = "none";
                      let ringPulse = false;

                      if (isSelected) {
                        ringStroke = n.color;
                        ringPulse = true;
                      } else if (isPrereq) {
                        ringStroke = "#fb923c"; // Prerequisite alert ring (Orange)
                      } else if (isSuccessor) {
                        ringStroke = "#22d3ee"; // Successor flow ring (Cyan)
                      }

                      return (
                        <motion.g
                          key={n.id}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ 
                            opacity: isRelated || !selectedNodeId ? 1 : 0.25, 
                            scale: 1 
                          }}
                          transition={{ delay: i * 0.03, type: "spring", stiffness: 100 }}
                          onClick={() => handleNodeClick(n.id)}
                          onDoubleClick={() => handleDrillDown(n.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Pulsing selection halo */}
                          {ringPulse && (
                            <circle
                              cx={n.x}
                              cy={n.y}
                              r={size + 2.5}
                              fill="none"
                              stroke={n.color}
                              strokeWidth="0.4"
                              className="animate-ping"
                              style={{ opacity: 0.2, transformOrigin: `${n.x}px ${n.y}px` }}
                            />
                          )}

                          {/* Outer highlight ring */}
                          {ringStroke !== "none" && (
                            <circle
                              cx={n.x}
                              cy={n.y}
                              r={size + 1.2}
                              fill="none"
                              stroke={ringStroke}
                              strokeWidth={isSelected ? "0.6" : "0.35"}
                              strokeDasharray={isPrereq ? "2 1" : undefined}
                            />
                          )}

                          {/* Node central filling */}
                          <circle cx={n.x} cy={n.y} r={size} fill={n.color} />
                          <circle cx={n.x} cy={n.y} r={size} fill="#ffffff" opacity={isSelected ? 0.2 : 0} />
                          <circle cx={n.x} cy={n.y} r={size - 0.8} fill="#030014" opacity={0.65} />

                          {/* Label Text */}
                          <text
                            x={n.x}
                            y={n.y + size + 2.2}
                            textAnchor="middle"
                            fontSize="1.8"
                            fill={isSelected ? "#ffffff" : isRelated ? "#cbd5e1" : "#475569"}
                            fontWeight={isSelected ? "800" : "500"}
                            className="pointer-events-none drop-shadow-sm select-none"
                          >
                            {n.label}
                          </text>
                        </motion.g>
                      );
                    })}

                  </motion.g>
                </svg>
              </div>

              {/* Instructions Helper Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Active Concept</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Prerequisite</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Successor</span>
                </div>
                <span>Double-click node to Drill Down sub-concepts</span>
              </div>
            </div>

            {/* Right Column: Concept Inspector Side-Panel */}
            <div className="lg:col-span-4 rounded-2xl border border-white/5 bg-slate-950/45 backdrop-blur-md p-6 flex flex-col justify-between min-h-[500px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      {/* Category Badge & Status */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-wider">
                          {selectedNode.badge || "Syllabus Core"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Connected</span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold text-white leading-tight">
                          {selectedNode.label}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {selectedNode.desc}
                        </p>
                      </div>

                      {/* Key Syllabus Chapters */}
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Chapters & Key Topics</h4>
                        <div className="grid grid-cols-1 gap-1.5">
                          {selectedNode.topics.map((topic, index) => (
                            <div 
                              key={index}
                              className="flex items-start gap-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 p-2.5 text-xs text-slate-300 transition-colors"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-400/80 shrink-0 mt-0.5" />
                              <span className="leading-tight">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Linked Prerequisites & Successors */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Node Connections</h4>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {/* Prerequisites */}
                          <div>
                            <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Prerequisites</div>
                            {highlightedDetails.prereqs.size > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {Array.from(highlightedDetails.prereqs).map(pId => {
                                  const name = globalNodes.find(gn => gn.id === pId)?.label || subgraphs[activeCategory || ""]?.nodes.find(sn => sn.id === pId)?.label || pId;
                                  return (
                                    <button
                                      key={pId}
                                      onClick={() => handleNodeClick(pId)}
                                      className="px-2.5 py-1 rounded bg-orange-400/10 border border-orange-400/20 text-orange-300 text-[10px] font-medium hover:bg-orange-400/20 transition-all cursor-pointer"
                                    >
                                      {name}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">None (Entry Core bedrock)</span>
                            )}
                          </div>

                          {/* Successors */}
                          <div>
                            <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Unlocks Successors</div>
                            {highlightedDetails.successors.size > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {Array.from(highlightedDetails.successors).map(sId => {
                                  const name = globalNodes.find(gn => gn.id === sId)?.label || subgraphs[activeCategory || ""]?.nodes.find(sn => sn.id === sId)?.label || sId;
                                  return (
                                    <button
                                      key={sId}
                                      onClick={() => handleNodeClick(sId)}
                                      className="px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-medium hover:bg-cyan-400/20 transition-all cursor-pointer"
                                    >
                                      {name}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">None (Terminal curriculum milestone)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="pt-4 border-t border-white/5 space-y-2">
                      {viewMode === "global" && subgraphs[selectedNode.id] && (
                        <button
                          onClick={() => handleDrillDown(selectedNode.id)}
                          className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <Network className="h-4 w-4" /> Drill Down Sub-concepts
                        </button>
                      )}
                      
                      <Link
                        to="/roadmap"
                        className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold border border-white/5 hover:border-white/10 transition-all text-center"
                      >
                        <BookOpen className="h-4 w-4" /> Go to Syllabus Roadmap
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
                    Select a node to inspect concept telemetry.
                  </div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </PageShell>
    </AppShell>
  );
}
