// ============================================================
// AIMastery — Complete AI Roadmap Data
// Zero to Chief AI Architect · 365 Days · 12 Phases
// ============================================================

export type LessonStatus = "completed" | "in-progress" | "available" | "locked" | "mastered";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface SubLesson {
  id: string;
  title: string;
  duration: number; // minutes
  type: "concept" | "code" | "paper" | "project" | "quiz";
}

export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  status: LessonStatus;
  xp: number;
  topics: string[];
  prerequisites?: string[];
  importance: number; // 1-10
  industryDemand: number;
  interviewFrequency: number;
  subLessons?: SubLesson[];
  paperRef?: string;
  projectRef?: string;
  day?: number; // target day in 365-day plan
}

export interface RoadmapChapter {
  id: string;
  title: string;
  description: string;
  lessons: RoadmapLesson[];
}

export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: string;
  chapters: RoadmapChapter[];
  estimatedHours: number;
  dayRange: [number, number];
  milestone: string;
  milestoneXp: number;
}

// ─── Helper ─────────────────────────────────────────────────
function lesson(
  id: string, title: string, desc: string, dur: number,
  diff: Difficulty, status: LessonStatus, xp: number, topics: string[],
  imp = 7, dem = 7, freq = 5,
  subLessons?: SubLesson[], day?: number,
): RoadmapLesson {
  return { id, title, description: desc, duration: dur, difficulty: diff, status, xp, topics, importance: imp, industryDemand: dem, interviewFrequency: freq, subLessons, day };
}

function sub(id: string, title: string, dur: number, type: SubLesson["type"]): SubLesson {
  return { id, title, duration: dur, type };
}

// ============================================================
// PHASE 0 — CS FOUNDATIONS (Days 1–30)
// ============================================================
const phase0: RoadmapPhase = {
  id: "p0", phase: 0,
  title: "CS & Python Foundations",
  subtitle: "The bedrock of everything",
  description: "Master Python deeply, data structures & algorithms, Linux, Git, networking, and databases. Everything else builds on this.",
  color: "#22D3EE", icon: "Cpu",
  estimatedHours: 120, dayRange: [1, 30],
  milestone: "Python & CS Fundamentals Complete",
  milestoneXp: 2000,
  chapters: [
    {
      id: "p0c1", title: "Python Deep Dive",
      description: "From syntax to production-quality Pythonic code",
      lessons: [
        lesson("p0-py1", "Python Fundamentals", "Variables, types, control flow, functions, modules, packages, virtual environments.", 90, "beginner", "available", 120, ["python", "syntax"], 10, 10, 8,
          [sub("p0-py1-1","Variables & Data Types",20,"concept"),sub("p0-py1-2","Control Flow: if/for/while",20,"code"),sub("p0-py1-3","Functions & Scope",25,"code"),sub("p0-py1-4","Modules & Packages",15,"code"),sub("p0-py1-5","Virtual Environments & pip",10,"code")], 1),
        lesson("p0-py2", "Python Data Structures", "Lists, tuples, dicts, sets, comprehensions, iterators, generators in depth.", 75, "beginner", "available", 140, ["python", "ds"], 10, 10, 9,
          [sub("p0-py2-1","Lists, Tuples & Slicing",20,"concept"),sub("p0-py2-2","Dicts & Sets",20,"concept"),sub("p0-py2-3","List & Dict Comprehensions",15,"code"),sub("p0-py2-4","Iterators & Generators",20,"code")], 2),
        lesson("p0-py3", "Pythonic Patterns", "Decorators, context managers, dataclasses, typing, pathlib, logging.", 90, "intermediate", "available", 160, ["python", "patterns"], 9, 9, 7,
          [sub("p0-py3-1","Decorators & Closures",25,"code"),sub("p0-py3-2","Context Managers (with)",20,"code"),sub("p0-py3-3","Dataclasses & Pydantic",25,"code"),sub("p0-py3-4","Type Hints & mypy",20,"code")], 3),
        lesson("p0-py4", "OOP in Python", "Classes, inheritance, MRO, abstract classes, protocols, dunder methods.", 90, "intermediate", "available", 160, ["python", "oop"], 9, 9, 8,
          [sub("p0-py4-1","Classes & Instances",20,"concept"),sub("p0-py4-2","Inheritance & MRO",25,"code"),sub("p0-py4-3","Magic/Dunder Methods",25,"code"),sub("p0-py4-4","Abstract Classes & Protocols",20,"code")], 4),
        lesson("p0-py5", "Concurrency & Performance", "Threading, multiprocessing, asyncio, profiling, cProfile, line_profiler.", 120, "advanced", "available", 200, ["python", "async"], 8, 9, 6,
          [sub("p0-py5-1","GIL & Threading",25,"concept"),sub("p0-py5-2","Multiprocessing",25,"code"),sub("p0-py5-3","asyncio & aiohttp",30,"code"),sub("p0-py5-4","Profiling & Optimization",20,"code")], 5),
        lesson("p0-py6", "Testing & Best Practices", "pytest, unittest, mocking, fixtures, coverage, pre-commit, black, ruff.", 75, "intermediate", "available", 140, ["python", "testing"], 9, 10, 6,
          [sub("p0-py6-1","pytest Basics",20,"code"),sub("p0-py6-2","Fixtures & Parametrize",20,"code"),sub("p0-py6-3","Mocking with unittest.mock",15,"code"),sub("p0-py6-4","Code Quality: black/ruff",10,"code"),sub("p0-py6-5","Coverage & CI",10,"code")], 6),
      ],
    },
    {
      id: "p0c2", title: "Data Structures & Algorithms",
      description: "Core DSA for interviews and efficient production code",
      lessons: [
        lesson("p0-ds1", "Arrays, Strings & Hashmaps", "Two pointers, sliding window, prefix sums, anagram/palindrome problems.", 90, "beginner", "available", 150, ["dsa", "arrays"], 10, 10, 10,
          [sub("p0-ds1-1","Array Patterns: Two Pointers",20,"code"),sub("p0-ds1-2","Sliding Window",20,"code"),sub("p0-ds1-3","Prefix Sums",15,"code"),sub("p0-ds1-4","HashMap Patterns",25,"code"),sub("p0-ds1-5","String Problems",20,"code")], 7),
        lesson("p0-ds2", "Linked Lists, Stacks & Queues", "Reversal, cycle detection, monotonic stack, BFS/DFS queue.", 75, "intermediate", "available", 140, ["dsa", "linked-list"], 9, 9, 9,
          [sub("p0-ds2-1","Linked List Reversal & Merge",20,"code"),sub("p0-ds2-2","Cycle Detection (Floyd)",15,"code"),sub("p0-ds2-3","Stacks & Monotonic Stack",20,"code"),sub("p0-ds2-4","Queues & Deques",20,"code")], 8),
        lesson("p0-ds3", "Trees & Binary Search", "BST, DFS/BFS, level-order, lowest common ancestor, binary search variants.", 90, "intermediate", "available", 160, ["dsa", "trees"], 9, 9, 10,
          [sub("p0-ds3-1","BST Operations",20,"code"),sub("p0-ds3-2","Tree DFS (in/pre/post order)",20,"code"),sub("p0-ds3-3","Tree BFS (level-order)",15,"code"),sub("p0-ds3-4","Binary Search Variants",25,"code")], 9),
        lesson("p0-ds4", "Graphs & Advanced DSA", "BFS, DFS, Dijkstra, Union-Find, topological sort, trie.", 120, "advanced", "available", 200, ["dsa", "graph"], 9, 8, 9,
          [sub("p0-ds4-1","Graph Representation",15,"concept"),sub("p0-ds4-2","BFS & DFS Traversal",25,"code"),sub("p0-ds4-3","Dijkstra & Bellman-Ford",25,"code"),sub("p0-ds4-4","Union-Find (DSU)",20,"code"),sub("p0-ds4-5","Topological Sort & Trie",25,"code")], 10),
        lesson("p0-ds5", "Dynamic Programming", "1D/2D DP, memoization, tabulation, classic DP patterns.", 120, "advanced", "available", 200, ["dsa", "dp"], 8, 8, 9,
          [sub("p0-ds5-1","Memoization vs Tabulation",20,"concept"),sub("p0-ds5-2","1D DP: Fibonacci to Knapsack",25,"code"),sub("p0-ds5-3","2D DP: LCS, Edit Distance",25,"code"),sub("p0-ds5-4","DP on Trees & Intervals",30,"code")], 11),
      ],
    },
    {
      id: "p0c3", title: "Systems & Tooling",
      description: "Linux, Git, Networking, Docker essentials",
      lessons: [
        lesson("p0-lx1", "Linux Command Line Mastery", "Shell scripting, processes, permissions, pipes, grep, awk, sed, cron.", 75, "beginner", "available", 120, ["linux"], 9, 9, 6,
          [sub("p0-lx1-1","Navigation & File Ops",15,"code"),sub("p0-lx1-2","Processes & Signals",20,"code"),sub("p0-lx1-3","Pipes, grep, awk, sed",20,"code"),sub("p0-lx1-4","Shell Scripting Basics",20,"code")], 12),
        lesson("p0-git1", "Git & Version Control", "Branching, rebasing, cherry-pick, stash, hooks, PR workflow, monorepo.", 60, "beginner", "available", 100, ["git"], 10, 10, 7,
          [sub("p0-git1-1","Core Commands & Workflow",15,"code"),sub("p0-git1-2","Branching & Merging",15,"code"),sub("p0-git1-3","Rebasing & Cherry-pick",15,"code"),sub("p0-git1-4","Git Hooks & CI Integration",15,"code")], 13),
        lesson("p0-net1", "Networking Essentials", "TCP/IP, HTTP/2, TLS, DNS, REST, WebSockets, gRPC — how the web actually works.", 90, "intermediate", "available", 140, ["networking"], 8, 8, 6,
          [sub("p0-net1-1","TCP/IP & DNS",20,"concept"),sub("p0-net1-2","HTTP/2, HTTPS & TLS",20,"concept"),sub("p0-net1-3","REST vs gRPC vs WebSockets",25,"concept"),sub("p0-net1-4","Curl, netcat, Wireshark",25,"code")], 14),
        lesson("p0-dc1", "Docker & Containers", "Images, Dockerfiles, layers, docker-compose, networking, volumes.", 90, "intermediate", "available", 160, ["docker"], 9, 10, 7,
          [sub("p0-dc1-1","Docker Concepts & CLI",20,"concept"),sub("p0-dc1-2","Writing Dockerfiles",25,"code"),sub("p0-dc1-3","Docker Compose",25,"code"),sub("p0-dc1-4","Networking & Volumes",20,"concept")], 15),
        lesson("p0-db1", "Databases & SQL", "Relational models, SQL DML/DDL, indexes, query plans, Postgres, Redis basics.", 90, "intermediate", "available", 150, ["sql", "databases"], 10, 10, 9,
          [sub("p0-db1-1","Relational Model & Normalization",20,"concept"),sub("p0-db1-2","SQL: SELECT, JOIN, GROUP BY",25,"code"),sub("p0-db1-3","Indexes & Query Plans",25,"code"),sub("p0-db1-4","Postgres & Redis Basics",20,"code")], 16),
      ],
    },
  ],
};

// ============================================================
// PHASE 1 — MATHEMATICAL FOUNDATIONS (Days 31–50)
// ============================================================
const phase1: RoadmapPhase = {
  id: "p1", phase: 1,
  title: "Mathematical Foundations",
  subtitle: "Linear Algebra & Calculus for AI",
  description: "Vectors, matrices, partial derivatives, and optimization algorithms like gradient descent. The numeric core of machine learning.",
  color: "#A78BFA", icon: "Sigma",
  estimatedHours: 80, dayRange: [31, 50],
  milestone: "Math Foundations Complete",
  milestoneXp: 1500,
  chapters: [
    {
      id: "p1c1", title: "Linear Algebra",
      description: "Vectors, matrices, tensor operations — the data structure of deep learning",
      lessons: [
        lesson("p1-la1", "Vectors & Vector Spaces", "Vector operations, basis, span, linear independence, change of basis.", 75, "beginner", "available", 140, ["linalg"], 10, 9, 7,
          [sub("p1-la1-1","Vectors & Operations",20,"concept"),sub("p1-la1-2","Dot Product & Norms",15,"code"),sub("p1-la1-3","Linear Combination & Span",15,"concept"),sub("p1-la1-4","Change of Basis",25,"code")], 31),
        lesson("p1-la2", "Matrices & Operations", "Multiplication, transpose, inverse, rank, linear systems, NumPy applications.", 90, "intermediate", "available", 160, ["linalg", "matrices"], 10, 9, 8,
          [sub("p1-la2-1","Matrix Multiplication",20,"code"),sub("p1-la2-2","Determinant & Inverse",20,"code"),sub("p1-la2-3","Solving Ax=b",20,"code"),sub("p1-la2-4","Rank & Null Space",20,"code"),sub("p1-la2-5","NumPy Linear Algebra",10,"code")], 33),
        lesson("p1-la3", "Eigenvalues, SVD & PCA", "Eigendecomposition, spectral theorem, SVD, PCA — the math behind dimensionality reduction.", 120, "advanced", "available", 220, ["linalg", "svd", "pca"], 9, 8, 8,
          [sub("p1-la3-1","Eigenvectors & Eigenvalues",25,"concept"),sub("p1-la3-2","Eigendecomposition",20,"code"),sub("p1-la3-3","Singular Value Decomposition",30,"code"),sub("p1-la3-4","PCA from Scratch",25,"code")], 35),
        lesson("p1-la4", "Tensors & Broadcasting", "Higher-order tensors, tensor operations, NumPy/PyTorch broadcasting rules.", 60, "intermediate", "available", 120, ["tensors", "numpy"], 10, 10, 7,
          [sub("p1-la4-1","Tensor Concepts",15,"concept"),sub("p1-la4-2","Tensor Operations in NumPy",20,"code"),sub("p1-la4-3","Broadcasting Rules",25,"code")], 37),
      ],
    },
    {
      id: "p1c2", title: "Calculus & Optimization",
      description: "Derivatives to gradient descent — the engine of learning",
      lessons: [
        lesson("p1-ca1", "Multivariable Calculus", "Partial derivatives, Jacobian, Hessian, chain rule in multiple dimensions.", 90, "intermediate", "available", 160, ["calculus"], 10, 9, 7,
          [sub("p1-ca1-1","Partial Derivatives",20,"concept"),sub("p1-ca1-2","Gradient Vectors",20,"concept"),sub("p1-ca1-3","Jacobian Matrix",20,"code"),sub("p1-ca1-4","Chain Rule & Backprop Preview",25,"code")], 39),
        lesson("p1-ca2", "Gradient Descent Family", "SGD, Momentum, RMSProp, Adam, AdamW, learning rate schedulers.", 90, "intermediate", "available", 180, ["optimization"], 10, 10, 9,
          [sub("p1-ca2-1","Gradient Descent Intuition",20,"concept"),sub("p1-ca2-2","SGD & Mini-batch",20,"code"),sub("p1-ca2-3","Momentum & Nesterov",15,"code"),sub("p1-ca2-4","Adam & AdamW",25,"code"),sub("p1-ca2-5","Learning Rate Schedules",20,"code")], 41),
        lesson("p1-ca3", "Convex Optimization", "Convexity, convex sets, KKT conditions, Lagrangian, duality, LP/QP.", 120, "advanced", "available", 220, ["optimization", "convex"], 7, 6, 5,
          [sub("p1-ca3-1","Convex Sets & Functions",25,"concept"),sub("p1-ca3-2","KKT Conditions",25,"concept"),sub("p1-ca3-3","Lagrangian Duality",25,"code"),sub("p1-ca3-4","Linear Programming with SciPy",25,"code")], 44),
      ],
    },
  ],
};

// ============================================================
// PHASE 2 — PROBABILITY & STATISTICS (Days 51–70)
// ============================================================
const phase2_stats: RoadmapPhase = {
  id: "p1_stats", phase: 2,
  title: "Probability & Statistics",
  subtitle: "Data Distribution, Hypothesis Testing & Causal Inference",
  description: "Descriptive statistics, univariate and multivariate probability, hypothesis testing, ANOVA, resampling, and causal modeling. Essential tools to reason under uncertainty.",
  color: "#818CF8", icon: "TrendingUp",
  estimatedHours: 80, dayRange: [51, 70],
  milestone: "Probability & Statistics Mastered",
  milestoneXp: 1500,
  chapters: [
    {
      id: "p1c3", title: "Probability & Information Theory",
      description: "Sample spaces, distributions, and entropy — the foundations of reasoning under uncertainty",
      lessons: [
        lesson("p1-pr1", "Probability Foundations", "Sample spaces, random variables, pmf/pdf, joint & conditional probability.", 75, "beginner", "available", 130, ["probability"], 10, 9, 8,
          [sub("p1-pr1-1","Sample Spaces & Events",15,"concept"),sub("p1-pr1-2","Random Variables & Distributions",25,"concept"),sub("p1-pr1-3","Joint & Conditional Probability",20,"code"),sub("p1-pr1-4","Bayes' Theorem Applications",15,"code")], 51),
        lesson("p1-pr2", "Univariate Distributions", "PMFs, PDFs, CDFs. Uniform, Bernoulli, Binomial, Multinomial, Poisson, Exponential, Normal/Gaussian, Student's t, Chi-squared, F-distribution, Beta, Dirichlet.", 90, "intermediate", "available", 160, ["distributions"], 9, 9, 7,
          [sub("p1-pr2-1","Discrete Distributions: Bernoulli, Binomial, Poisson, Multinomial",25,"concept"),sub("p1-pr2-2","Continuous Distributions: Uniform, Exponential, Normal",25,"concept"),sub("p1-pr2-3","Statistical Distributions: Student's t, Chi-squared, F-dist",20,"code"),sub("p1-pr2-4","Prior Distributions: Beta & Dirichlet Families",20,"concept")], 52),
        lesson("p1-pr3", "Multivariate Distributions & Covariance", "Joint, marginal, and conditional distributions. Covariance, correlation, covariance matrix, precision matrix, multivariate normal distribution.", 90, "intermediate", "available", 170, ["probability", "multivariate"], 9, 9, 8,
          [sub("p1-pr3-1","Joint & Marginal Distributions",20,"concept"),sub("p1-pr3-2","Covariance & Correlation Matrices",25,"code"),sub("p1-pr3-3","Precision Matrix & Conditional Independence",20,"concept"),sub("p1-pr3-4","Multivariate Normal Distribution Properties",25,"code")], 53),
        lesson("p1-pr4", "Information Theory & Divergences", "Entropy, joint entropy, conditional entropy, mutual information, KL divergence, cross-entropy, Jensen-Shannon divergence.", 90, "advanced", "available", 180, ["info-theory"], 9, 8, 7,
          [sub("p1-pr4-1","Shannon Entropy & Information Content",20,"concept"),sub("p1-pr4-2","Joint, Conditional Entropy & Mutual Info",25,"code"),sub("p1-pr4-3","Kullback-Leibler (KL) & Jensen-Shannon (JS) Divergences",25,"code"),sub("p1-pr4-4","Cross-Entropy Loss in ML/DL",20,"code")], 54),
      ],
    },
    {
      id: "p1c4", title: "Inferential Statistics & Hypothesis Testing",
      description: "Parameter estimation, significance testing, and simulation methods",
      lessons: [
        lesson("p1-st1", "Parameter Estimation (MLE & MAP)", "Point estimation, bias, variance, MSE of estimators. Maximum Likelihood Estimation (MLE), Maximum A Posteriori (MAP), Method of Moments.", 90, "intermediate", "available", 170, ["statistics", "estimation"], 10, 10, 9,
          [sub("p1-st1-1","Point Estimators & Properties (Bias, Consistency)",20,"concept"),sub("p1-st1-2","Maximum Likelihood Estimation (MLE)",25,"code"),sub("p1-st1-3","Maximum A Posteriori (MAP) Estimation",25,"code"),sub("p1-st1-4","Method of Moments & MSE",20,"code")], 56),
        lesson("p1-st2", "Sampling & Interval Estimation", "Central Limit Theorem (CLT) deep dive, law of large numbers, confidence intervals, margin of error, standard error of the mean.", 75, "intermediate", "available", 150, ["statistics", "sampling"], 9, 9, 8,
          [sub("p1-st2-1","Law of Large Numbers (Weak vs Strong)",20,"concept"),sub("p1-st2-2","CLT & Sampling Distributions",20,"code"),sub("p1-st2-3","Confidence Interval Derivation",20,"code"),sub("p1-st2-4","Standard Error & Margin of Error",15,"code")], 58),
        lesson("p1-st3", "Hypothesis Testing & ANOVA", "Null and alternative hypotheses, Type I & II errors, significance level, power, p-values. t-tests, z-test, ANOVA, ANCOVA.", 120, "intermediate", "available", 190, ["statistics", "hypothesis-testing"], 10, 9, 9,
          [sub("p1-st3-1","Null Hypotheses, Alpha, Beta & Power (1-Beta)",25,"concept"),sub("p1-st3-2","One-Sample, Two-Sample & Paired t-tests",30,"code"),sub("p1-st3-3","ANOVA (One-way & Two-way)",35,"code"),sub("p1-st3-4","ANCOVA (Analysis of Covariance)",30,"code")], 60),
        lesson("p1-st4", "Non-parametric & Goodness-of-Fit Tests", "Chi-square tests (goodness-of-fit, independence), Wilcoxon signed-rank, Mann-Whitney U, Kruskal-Wallis, Kolmogorov-Smirnov test, Shapiro-Wilk test.", 90, "advanced", "available", 160, ["statistics", "non-parametric"], 9, 8, 7,
          [sub("p1-st4-1","Chi-Square Tests (Independence & Fit)",25,"code"),sub("p1-st4-2","Mann-Whitney U & Wilcoxon Signed-Rank Tests",25,"code"),sub("p1-st4-3","Kruskal-Wallis Non-Parametric ANOVA",20,"code"),sub("p1-st4-4","KS Test for Normality & Shapiro-Wilk",20,"code")], 62),
        lesson("p1-st5", "Resampling & Simulation Methods", "Bootstrapping for confidence intervals, Jackknife estimation, permutation tests, Monte Carlo simulation.", 90, "advanced", "available", 160, ["statistics", "resampling"], 9, 8, 7,
          [sub("p1-st5-1","Bootstrapping & Percentile Bootstrap CI",25,"code"),sub("p1-st5-2","Jackknife Bias & Variance Estimation",20,"code"),sub("p1-st5-3","Permutation & Randomization Tests",25,"code"),sub("p1-st5-4","Monte Carlo Simulation of Random Variables",20,"code")], 64),
      ],
    },
    {
      id: "p1c5", title: "Statistical Learning & Causal Inference",
      description: "Generalization bounds, regression diagnostics, and causal reasoning",
      lessons: [
        lesson("p1-sl1", "Statistical Learning Theory", "Empirical Risk Minimization (ERM), generalization bounds, VC dimension, Rademacher complexity, bias-variance tradeoff (formal decomposition).", 90, "advanced", "available", 180, ["statistical-learning"], 9, 9, 7,
          [sub("p1-sl1-1","Empirical Risk Minimization (ERM)",25,"concept"),sub("p1-sl1-2","VC Dimension & Generalization Bounds",25,"concept"),sub("p1-sl1-3","Rademacher Complexity",20,"concept"),sub("p1-sl1-4","Bias-Variance Mathematical Decomposition",20,"concept")], 66),
        lesson("p1-sl2", "Regression Diagnostics & GLMs", "Multi-collinearity, variance inflation factor (VIF), heteroscedasticity (Breusch-Pagan test), autocorrelation (Durbin-Watson), Cook's distance, Generalized Linear Models (GLMs) - link functions.", 90, "advanced", "available", 170, ["statistics", "regression-diagnostics"], 9, 9, 8,
          [sub("p1-sl2-1","Multicollinearity & Variance Inflation Factor (VIF)",20,"code"),sub("p1-sl2-2","Heteroscedasticity & Autocorrelation Tests",25,"code"),sub("p1-sl2-3","Cook's Distance & Outlier Influence",20,"code"),sub("p1-sl2-4","Generalized Linear Models (GLMs) & Link Functions",25,"code")], 68),
        lesson("p1-sl3", "Causal Inference & SCMs", "Causal diagrams (DAGs), confounders, colliders, back-door criterion, d-separation, do-calculus, propensity score matching, instrumental variables.", 120, "advanced", "available", 200, ["statistics", "causal-inference"], 9, 9, 8,
          [sub("p1-sl3-1","DAGs, Confounders & Colliders",25,"concept"),sub("p1-sl3-2","Back-Door Criterion & d-separation",25,"concept"),sub("p1-sl3-3","do-calculus Rules & Intervention",25,"concept"),sub("p1-sl3-4","Propensity Score Matching & Instrumental Variables",25,"code"),sub("p1-sl3-5","Structural Causal Models (SCMs) & Counterfactuals",20,"concept")], 70),
      ],
    },
  ],
};

// ============================================================
// PHASE 2 — PYTHON AI ECOSYSTEM (Days 71–90)
// ============================================================
const phase2: RoadmapPhase = {
  id: "p2", phase: 3,
  title: "Python AI Ecosystem",
  subtitle: "NumPy · Pandas · Matplotlib · SciPy · Polars",
  description: "Master the numerical computing stack: vectorized operations, data manipulation, visualization, and scientific computing.",
  color: "#34D399", icon: "Boxes",
  estimatedHours: 80, dayRange: [71, 90],
  milestone: "Python Ecosystem Mastered",
  milestoneXp: 1500,
  chapters: [
    {
      id: "p2c1", title: "Numerical Computing",
      description: "NumPy, SciPy — fast numerical operations at scale",
      lessons: [
        lesson("p2-np1", "NumPy Mastery", "ndarray internals, broadcasting, vectorization, views vs copies, fancy indexing, memory layout.", 90, "intermediate", "available", 160, ["numpy"], 10, 10, 8,
          [sub("p2-np1-1","ndarray & dtypes",20,"code"),sub("p2-np1-2","Broadcasting Deep Dive",25,"code"),sub("p2-np1-3","Fancy Indexing & Masking",20,"code"),sub("p2-np1-4","Performance: views vs copies",25,"code")], 71),
        lesson("p2-np2", "SciPy for ML", "Integration, interpolation, optimization, signal processing, special functions.", 75, "intermediate", "available", 140, ["scipy"], 7, 7, 4,
          [sub("p2-np2-1","scipy.optimize",20,"code"),sub("p2-np2-2","scipy.stats",20,"code"),sub("p2-np2-3","scipy.signal Basics",15,"code"),sub("p2-np2-4","Sparse Matrices",20,"code")], 74),
      ],
    },
    {
      id: "p2c2", title: "Data Manipulation",
      description: "Pandas, Polars — production-grade data wrangling",
      lessons: [
        lesson("p2-pd1", "Pandas Deep Dive", "DataFrames, Series, indexing, merges, pivots, time series, groupby internals.", 90, "intermediate", "available", 160, ["pandas"], 10, 10, 8,
          [sub("p2-pd1-1","DataFrame Creation & Indexing",20,"code"),sub("p2-pd1-2","Merging & Joining",25,"code"),sub("p2-pd1-3","GroupBy & Aggregations",25,"code"),sub("p2-pd1-4","Time Series Operations",20,"code")], 76),
        lesson("p2-pd2", "Polars — Modern DataFrames", "Lazy evaluation, expressions API, Polars vs Pandas performance, streaming.", 75, "intermediate", "available", 140, ["polars"], 7, 8, 4,
          [sub("p2-pd2-1","Polars vs Pandas",15,"concept"),sub("p2-pd2-2","Lazy & Eager API",25,"code"),sub("p2-pd2-3","Expressions & Contexts",25,"code"),sub("p2-pd2-4","Streaming Large Data",10,"code")], 78),
        lesson("p2-pd3", "Data Cleaning & EDA", "Handling missing values and outliers. Univariate, bivariate, and multivariate exploratory data analysis using histograms, boxplots, violin plots, heatmaps, and pairplots. Skewness and kurtosis metrics.", 90, "intermediate", "available", 150, ["eda", "pandas"], 9, 9, 6,
          [sub("p2-pd3-1","Missing Values & Outliers",20,"code"),sub("p2-pd3-2","Univariate & Bivariate Analysis (Histograms, Boxplots, Violin Plots)",25,"code"),sub("p2-pd3-3","Multivariate Analysis (Heatmaps, Pairplots)",25,"code"),sub("p2-pd3-4","Statistical Shapes: Skewness & Kurtosis",20,"concept")], 80),
      ],
    },
    {
      id: "p2c3", title: "Visualization",
      description: "Matplotlib, Seaborn, Plotly — communicate with data",
      lessons: [
        lesson("p2-vz1", "Matplotlib & Seaborn", "Figure/Axes API, custom styles, statistical plots, pair plots, heatmaps.", 75, "beginner", "available", 120, ["matplotlib", "seaborn"], 8, 8, 4,
          [sub("p2-vz1-1","Figure/Axes Architecture",20,"code"),sub("p2-vz1-2","Statistical Plots with Seaborn",25,"code"),sub("p2-vz1-3","Custom Styles & Themes",15,"code"),sub("p2-vz1-4","Subplots & Layouts",15,"code")], 82),
        lesson("p2-vz2", "Plotly & Interactive Viz", "Plotly Express, Dash basics, interactive charts for ML reports.", 60, "beginner", "available", 100, ["plotly"], 7, 7, 3,
          [sub("p2-vz2-1","Plotly Express Quickstart",20,"code"),sub("p2-vz2-2","Interactive Charts",20,"code"),sub("p2-vz2-3","Dash App Basics",20,"code")], 84),
      ],
    },
  ],
};

// ============================================================
// PHASE 3 — CORE & CLASSICAL MACHINE LEARNING (Days 91–140)
// ============================================================
const phase3: RoadmapPhase = {
  id: "p3", phase: 4,
  title: "Core & Classical Machine Learning",
  subtitle: "Algorithms that power 80% of production ML",
  description: "Supervised learning (linear & logistic regression, tree ensembles, SVMs, classification, regression), semi-supervised learning, unsupervised learning (clustering, dimensionality reduction), reinforcement learning (MDPs, Q-learning, DQN, Policy Gradient), time series, and recommendation systems.",
  color: "#FB7185", icon: "Brain",
  estimatedHours: 195, dayRange: [91, 140],
  milestone: "ML Practitioner",
  milestoneXp: 4000,
  chapters: [
    {
      id: "p3c0_fd", title: "Machine Learning Foundations",
      description: "Core paradigms, terminologies, and lifecycle of machine learning systems",
      lessons: [
        lesson("p3-fd1", "Introduction to AI Ecosystem", "AI vs ML vs Deep Learning vs Generative AI, types of AI, and real-world applications across domains.", 90, "beginner", "available", 120, ["ai", "ecosystem", "ml-foundations"], 10, 10, 8,
          [sub("p3-fd1-1","AI vs ML vs Deep Learning vs Generative AI",20,"concept"),sub("p3-fd1-2","Types of Artificial Intelligence",20,"concept"),sub("p3-fd1-3","Real-World Applications & Industry Use Cases",25,"concept"),sub("p3-fd1-4","Machine Learning Lifecycle Overview",25,"concept")], 91),
        lesson("p3-fd2", "Core Machine Learning Concepts", "Supervised, unsupervised, semi-supervised, reinforcement learning, online/offline, batch/incremental learning, and parametric vs non-parametric models.", 90, "beginner", "available", 130, ["ml-foundations", "learning-paradigms"], 10, 10, 8,
          [sub("p3-fd2-1","Supervised vs Unsupervised vs Reinforcement Learning",20,"concept"),sub("p3-fd2-2","Semi-Supervised Learning Paradigm",20,"concept"),sub("p3-fd2-3","Online vs Offline / Batch vs Incremental Learning",25,"concept"),sub("p3-fd2-4","Parametric vs Non-Parametric Models",25,"concept")], 91),
        lesson("p3-fd3", "Fundamental ML Terminologies", "Features, labels, targets, data splits, training iterations, bias/variance, overfitting/underfitting, and the curse of dimensionality.", 90, "beginner", "available", 130, ["ml-foundations", "vocabulary"], 10, 10, 9,
          [sub("p3-fd3-1","Features, Labels & Target Variables",15,"concept"),sub("p3-fd3-2","Training, Validation & Test Sets",15,"concept"),sub("p3-fd3-3","Epochs, Batches & Iterations",15,"code"),sub("p3-fd3-4","Models, Algorithms, Parameters vs Hyperparameters",15,"concept"),sub("p3-fd3-5","Bias, Variance, Underfitting & Overfitting",15,"concept"),sub("p3-fd3-6","Curse of Dimensionality",15,"concept")], 91),
      ],
    },
    {
      id: "p3c1_fe", title: "Data Preprocessing & Feature Engineering",
      description: "Standardization, missing value imputation, categorical encoding, feature selection, and class imbalance handling",
      lessons: [
        lesson("p3-fe1", "Feature Preprocessing & Scaling", "MinMax scaling, Standard scaling, Robust scaling, PowerTransformer (Box-Cox, Yeo-Johnson), QuantileTransformer, KNNImputer, IterativeImputer.", 90, "intermediate", "available", 160, ["data-preprocessing", "scaling"], 10, 10, 8,
          [sub("p3-fe1-1","Standardization vs Normalization vs Robust Scaling",20,"concept"),sub("p3-fe1-2","Non-linear transformations: Box-Cox & Yeo-Johnson",25,"code"),sub("p3-fe1-3","QuantileTransformer for Normalizing Distributions",20,"code"),sub("p3-fe1-4","Multivariate Imputation: KNNImputer & IterativeImputer",25,"code")], 92),
        lesson("p3-fe2", "Categorical Encoding & High-Cardinality", "One-Hot, Ordinal, Label, Target/Mean encoding, Weight of Evidence (WoE) encoding, Hash encoding.", 90, "intermediate", "available", 160, ["feature-engineering", "encoding"], 10, 10, 8,
          [sub("p3-fe2-1","Nominal vs Ordinal Categorical Variables",15,"concept"),sub("p3-fe2-2","One-Hot Encoding & Dummy Variable Trap",20,"code"),sub("p3-fe2-3","Target/Mean Encoding & Overfitting Prevention",25,"code"),sub("p3-fe2-4","Weight of Evidence (WoE) & Feature Hashing",30,"code")], 92),
        lesson("p3-fe3", "Feature Construction & Interaction", "Polynomial features, mathematical transformations (log, exp, reciprocal), binning, outlier clipping/Winsorization, text/datetime feature extraction.", 90, "intermediate", "available", 150, ["feature-engineering", "construction"], 9, 9, 7,
          [sub("p3-fe3-1","Polynomial & Interaction Features",25,"code"),sub("p3-fe3-2","Mathematical Transformations (Log, Exp, Box-Cox)",20,"code"),sub("p3-fe3-3","Discretization: KBinsDiscretizer & Quantile Binning",20,"code"),sub("p3-fe3-4","Outlier Treatment: Clipping & Winsorization",25,"code")], 93),
        lesson("p3-fe4", "Feature Selection & Importance", "Filter methods, Wrapper methods (RFE), Embedded methods (L1/Lasso, tree importance), permutation importance.", 90, "intermediate", "available", 160, ["feature-selection"], 10, 10, 8,
          [sub("p3-fe4-1","Filter Methods: Variance, ANOVA, Chi-Square, Mutual Info",25,"code"),sub("p3-fe4-2","Wrapper Methods: Recursive Feature Elimination (RFE)",25,"code"),sub("p3-fe4-3","Embedded Methods: Lasso L1 & Tree-based Importance",20,"code"),sub("p3-fe4-4","Permutation Feature Importance vs SHAP",20,"code")], 93),
        lesson("p3-fe5", "Imbalanced Dataset Handling", "Handling skewed class distributions using class weights, random resampling, SMOTE, and ADASYN.", 90, "intermediate", "available", 160, ["imbalanced-data", "smote", "adasyn"], 10, 10, 8,
          [sub("p3-fe5-1","Class Weights & Cost-Sensitive Learning",20,"concept"),sub("p3-fe5-2","Random Over-sampling & Under-sampling",20,"code"),sub("p3-fe5-3","SMOTE (Synthetic Minority Over-sampling Technique)",25,"code"),sub("p3-fe5-4","ADASYN (Adaptive Synthetic Sampling)",25,"code")], 94),
      ],
    },
    {
      id: "p3c1", title: "Supervised Learning — Regression",
      description: "Predicting continuous outcomes — the core of supervised ML",
      lessons: [
        lesson("p3-r1", "Linear Regression Deep Dive", "OLS, ridge, lasso, elastic net, polynomial regression, assumptions & diagnostics.", 90, "beginner", "available", 160, ["regression", "ml"], 10, 10, 10,
          [sub("p3-r1-1","OLS Derivation & Normal Equation",25,"concept"),sub("p3-r1-2","Ridge & Lasso Regularization",25,"code"),sub("p3-r1-3","Elastic Net",15,"code"),sub("p3-r1-4","Polynomial Features",15,"code"),sub("p3-r1-5","Residual Diagnostics",10,"code")], 95),
        lesson("p3-r2", "Advanced Regression Techniques", "Bayesian regression, quantile regression, Huber loss, Tweedie, isotonic.", 90, "advanced", "available", 180, ["regression", "bayesian"], 8, 8, 6,
          [sub("p3-r2-1","Bayesian Linear Regression",25,"concept"),sub("p3-r2-2","Quantile Regression",25,"code"),sub("p3-r2-3","Robust Regression (Huber/RANSAC)",20,"code"),sub("p3-r2-4","Poisson & Tweedie Regression",20,"code")], 96),
        lesson("p3-r3", "Gaussian Processes & Kernel Ridge", "Gaussian Process Regression, kernel trick in regression, covariance functions/kernels (RBF, Matern, periodic), GPR hyperparameter tuning.", 90, "advanced", "available", 180, ["regression", "gaussian-process"], 9, 8, 6,
          [sub("p3-r3-1","Kernel Trick & Dual Representation",20,"concept"),sub("p3-r3-2","Kernel Ridge Regression Implementation",25,"code"),sub("p3-r3-3","Gaussian Process Regression & Covariance Functions",25,"code"),sub("p3-r3-4","Hyperparameter Optimization (Marginal Likelihood)",20,"code")], 97),
        lesson("p3-r4", "Support Vector Regression & Robust Methods", "SVR with epsilon-insensitive tube, Robust Regression (Huber, RANSAC, Theil-Sen), Isotonic regression, MARS.", 90, "advanced", "available", 180, ["regression", "robust"], 8, 8, 6,
          [sub("p3-r4-1","SVR Formulation & Dual Problem",25,"concept"),sub("p3-r4-2","Huber Loss & RANSAC Estimator",20,"code"),sub("p3-r4-3","Theil-Sen & Isotonic Regression",20,"code"),sub("p3-r4-4","Multivariate Adaptive Regression Splines (MARS)",25,"code")], 98),
      ],
    },
    {
      id: "p3c2", title: "Supervised Learning — Classification",
      description: "Decision boundaries, tree methods, boosting — the art of categorization",
      lessons: [
        lesson("p3-c1", "Logistic Regression & SVMs", "Logistic regression, softmax, multi-class, SVM with kernels, margin intuition.", 90, "intermediate", "available", 170, ["classification", "svm"], 10, 10, 10,
          [sub("p3-c1-1","Logistic Regression & Cross-Entropy",25,"code"),sub("p3-c1-2","Softmax & Multi-class",20,"code"),sub("p3-c1-3","SVM & Margin Intuition",25,"concept"),sub("p3-c1-4","Kernel Trick: RBF, Poly",20,"code")], 99),
        lesson("p3-c2", "Decision Trees & Random Forests", "CART algorithm, information gain, Gini, random forests, feature importance, OOB.", 90, "intermediate", "available", 180, ["trees", "random-forest"], 10, 10, 9,
          [sub("p3-c2-1","CART: ID3/C4.5 Algorithm",25,"concept"),sub("p3-c2-2","Gini & Information Gain",20,"code"),sub("p3-c2-3","Random Forests Deep Dive",25,"code"),sub("p3-c2-4","Feature Importance & OOB",20,"code")], 101),
        lesson("p3-c3", "Gradient Boosting & Model Explainability", "Gradient boosting algorithms (XGBoost, LightGBM, CatBoost) and explainability techniques (SHAP, LIME, PDP).", 120, "intermediate", "available", 220, ["xgboost", "explainability"], 10, 10, 9,
          [sub("p3-c3-1","Gradient Boosting Theory",20,"concept"),sub("p3-c3-2","XGBoost, LightGBM & CatBoost Tuning",25,"code"),sub("p3-c3-3","SHAP (SHapley Additive exPlanations) Values",25,"code"),sub("p3-c3-4","LIME (Local Interpretable Model-agnostic Explanations)",25,"code"),sub("p3-c3-5","Partial Dependence Plots (PDP) & Individual Conditional Expectation (ICE)",25,"code")], 102),
        lesson("p3-c4", "Naive Bayes & KNN", "Gaussian NB, Bernoulli NB, multinomial NB, Complement NB, KNN, distance metrics, curse of dimensionality.", 60, "beginner", "available", 120, ["naive-bayes", "knn"], 7, 7, 7,
          [sub("p3-c4-1","Naive Bayes Variants & Complement NB",20,"concept"),sub("p3-c4-2","KNN & Distance Metrics",20,"code"),sub("p3-c4-3","Curse of Dimensionality",20,"concept")], 103),
        lesson("p3-c5", "Discriminant Analysis & Centroids", "Linear Discriminant Analysis (LDA), Quadratic Discriminant Analysis (QDA), Nearest Centroid Classifier, Learning Vector Quantization (LVQ).", 75, "intermediate", "available", 140, ["classification", "lda"], 8, 8, 7,
          [sub("p3-c5-1","LDA vs QDA Decision Boundaries",20,"concept"),sub("p3-c5-2","LDA Dimensionality Reduction math",20,"concept"),sub("p3-c5-3","Nearest Centroid Classifier",15,"code"),sub("p3-c5-4","Learning Vector Quantization (LVQ)",20,"code")], 104),
        lesson("p3-c6", "Advanced Ensembles & Stacking", "AdaBoost, Bagging & Pasting, Extra Trees, Stacking (Stacked Generalization), Voting Classifier, Blending.", 90, "intermediate", "available", 170, ["ensembles", "boosting"], 9, 9, 8,
          [sub("p3-c6-1","AdaBoost (Adaptive Boosting) Algorithm",25,"concept"),sub("p3-c6-2","Extra Trees (Extremely Randomized Trees)",20,"code"),sub("p3-c6-3","Stacking & Blending Architectures",25,"code"),sub("p3-c6-4","Voting Classifiers (Hard vs Soft)",20,"code")], 105),
      ],
    },
    {
      id: "p3c3", title: "Model Evaluation & Selection",
      description: "The discipline of choosing and validating ML models properly",
      lessons: [
        lesson("p3-ev1", "Metrics & Evaluation", "Accuracy, precision/recall, F1, ROC-AUC, PR-AUC, MAE/MSE/RMSE/MAPE, R², Adjusted R², calibration.", 90, "intermediate", "available", 170, ["metrics", "evaluation"], 10, 10, 10,
          [sub("p3-ev1-1","Classification Metrics Deep Dive",20,"code"),sub("p3-ev1-2","ROC & PR Curves",20,"code"),sub("p3-ev1-3","Regression Metrics: MAE, MSE, RMSE, MAPE",25,"code"),sub("p3-ev1-4","R-Squared (R²) & Adjusted R-Squared",20,"concept"),sub("p3-ev1-5","Calibration & Brier Score",15,"code")], 106),
        lesson("p3-ev2", "Cross-Validation & Hyperparameter Tuning", "Cross-validation strategies, hyperparameter search (Optuna), and data leakage prevention.", 90, "intermediate", "available", 180, ["cv", "hyperparameters", "data-leakage"], 10, 10, 8,
          [sub("p3-ev2-1","Cross-Validation Strategies (K-Fold, Stratified, Time Series)",25,"code"),sub("p3-ev2-2","Data Leakage Prevention (Train-Test Leakage, Scaling Leak)",25,"concept"),sub("p3-ev2-3","Grid, Random & Bayesian Search with Optuna",25,"code"),sub("p3-ev2-4","Early Stopping & Validation Curves",15,"code")], 107),
        lesson("p3-ev3", "Bias-Variance & Regularization", "Bias-variance tradeoff, overfitting/underfitting, regularization techniques, learning curves.", 75, "intermediate", "available", 160, ["bias-variance"], 10, 9, 9,
          [sub("p3-ev3-1","Bias-Variance Decomposition",25,"concept"),sub("p3-ev3-2","Learning & Validation Curves",20,"code"),sub("p3-ev3-3","Regularization Techniques",30,"code")], 108),
      ],
    },
    {
      id: "p3c3_ss", title: "Semi-Supervised & Active Learning",
      description: "Learning with partially labeled datasets and human-in-the-loop querying",
      lessons: [
        lesson("p3-ss1", "Self-Training & Pseudo-Labeling", "Self-training logic, pseudo-label selection threshold, confidence filtering, self-training for classification.", 90, "intermediate", "available", 160, ["semi-supervised", "pseudo-labeling"], 9, 8, 7,
          [sub("p3-ss1-1","Self-Training Loop Intuition",20,"concept"),sub("p3-ss1-2","Confidence Threshold Filtering",25,"code"),sub("p3-ss1-3","Pseudo-Labeling Regression/Classification",25,"code"),sub("p3-ss1-4","Error Propagation & Mitigation",20,"concept")], 109),
        lesson("p3-ss2", "Label Propagation & Label Spreading", "Graph-based semi-supervised learning, transition probability matrix, label propagation algorithm, label spreading (clamping factor).", 90, "advanced", "available", 180, ["semi-supervised", "graph-learning"], 9, 8, 6,
          [sub("p3-ss2-1","Graph Construction & Edge Weights",25,"concept"),sub("p3-ss2-2","Transition Probability Matrix Formulation",20,"concept"),sub("p3-ss2-3","Label Propagation from Scratch",25,"code"),sub("p3-ss2-4","Label Spreading & Clamping Factor",20,"code")], 110),
        lesson("p3-ss3", "Generative Semi-Supervised & TSVMs", "Semi-supervised Gaussian Mixture Models (EM with labeled/unlabeled data), Transductive Support Vector Machines (TSVMs) maximizing margin on unlabeled data.", 90, "advanced", "available", 180, ["semi-supervised", "tsvm"], 8, 7, 5,
          [sub("p3-ss3-1","Semi-supervised Gaussian Mixture Models (GMM)",25,"concept"),sub("p3-ss3-2","Expectation-Maximization with Labeled & Unlabeled Data",30,"code"),sub("p3-ss3-3","TSVM Formulation & Integer Programming",20,"concept"),sub("p3-ss3-4","TSVM Local Search Optimization",15,"code")], 112),
        lesson("p3-ss4", "Co-Training, Active Learning & Weak Supervision", "Co-training, Active Learning, and Weak Supervision using labeling functions and Snorkel.", 120, "advanced", "available", 200, ["active-learning", "weak-supervision"], 9, 9, 6,
          [sub("p3-ss4-1","Co-Training & View Independence",20,"concept"),sub("p3-ss4-2","Active Learning: Uncertainty Sampling & QBC",25,"code"),sub("p3-ss4-3","Weak Supervision & Labeling Functions",25,"concept"),sub("p3-ss4-4","Snorkel Framework & Label Models",25,"code"),sub("p3-ss4-5","Expected Model Change & Pool-Based Active Learning",25,"code")], 113),
      ],
    },
    {
      id: "p3c4", title: "Unsupervised Learning",
      description: "Finding patterns without labels — clustering, dimensionality reduction, density estimation, and anomaly detection",
      lessons: [
        lesson("p3-u1", "Clustering Fundamentals", "K-Means, K-Means++, Mini-Batch K-Means, Agglomerative & Divisive hierarchical, BIRCH.", 90, "intermediate", "available", 170, ["clustering"], 9, 9, 8,
          [sub("p3-u1-1","K-Means & K-Means++",25,"code"),sub("p3-u1-2","Hierarchical Clustering",20,"code"),sub("p3-u1-3","BIRCH Clustering",20,"code"),sub("p3-u1-4","Mini-Batch K-Means",25,"code")], 115),
        lesson("p3-u2", "Linear Dimensionality Reduction", "PCA, Kernel PCA, Incremental PCA, Sparse PCA, ICA, NMF, LDA.", 90, "intermediate", "available", 180, ["dimensionality-reduction", "pca"], 9, 8, 7,
          [sub("p3-u2-1","PCA in Practice & Singular Values",20,"code"),sub("p3-u2-2","Incremental & Sparse PCA",20,"code"),sub("p3-u2-3","Independent Component Analysis (ICA)",25,"code"),sub("p3-u2-4","Non-Negative Matrix Factorization (NMF)",25,"code")], 116),
        lesson("p3-u6", "Manifold Learning & Non-linear Reduction", "t-SNE, UMAP, MDS, Isomap, LLE, Laplacian Eigenmaps.", 90, "advanced", "available", 180, ["dimensionality-reduction", "manifold-learning"], 9, 8, 7,
          [sub("p3-u6-1","t-SNE: Visualizing High-D Data",25,"code"),sub("p3-u6-2","UMAP: Uniform Manifold Approximation",25,"code"),sub("p3-u6-3","Multidimensional Scaling (MDS)",20,"code"),sub("p3-u6-4","Isomap & Locally Linear Embedding (LLE)",20,"code")], 118),
        lesson("p3-u3", "Anomaly & Novelty Detection", "Statistical anomaly detection (Z-score), Isolation Forest, One-Class SVM, LOF, and Autoencoders (conceptual).", 90, "advanced", "available", 180, ["anomaly-detection", "autoencoders"], 8, 8, 7,
          [sub("p3-u3-1","Statistical Anomaly Detection: Z-Score & IQR",20,"concept"),sub("p3-u3-2","Isolation Forest & One-Class SVM",20,"code"),sub("p3-u3-3","Local Outlier Factor (LOF) & ABOD",20,"code"),sub("p3-u3-4","Autoencoder-Based Anomaly Detection (Conceptual)",30,"concept")], 119),
        lesson("p3-u4", "Density & Graph-Based Clustering", "DBSCAN, HDBSCAN, OPTICS, Spectral Clustering, Affinity Propagation, Mean Shift, Fuzzy C-Means.", 90, "intermediate", "available", 170, ["clustering", "density-clustering"], 9, 9, 7,
          [sub("p3-u4-1","DBSCAN & HDBSCAN Density Clustering",25,"code"),sub("p3-u4-2","OPTICS Algorithm & Reachability plots",20,"code"),sub("p3-u4-3","Spectral Clustering & Affinity Propagation",25,"code"),sub("p3-u4-4","Mean Shift & Fuzzy C-Means",20,"code")], 120),
        lesson("p3-u5", "Association Rule Learning & Density Estimation", "Apriori Algorithm, FP-Growth, ECLAT, Kernel Density Estimation.", 90, "intermediate", "available", 150, ["association-rules", "kde"], 8, 8, 6,
          [sub("p3-u5-1","Apriori Algorithm & Market Basket Analysis",25,"code"),sub("p3-u5-2","FP-Growth & ECLAT Algorithms",25,"code"),sub("p3-u5-3","Kernel Density Estimation (KDE)",20,"code"),sub("p3-u5-4","KDE Bandwidth Selection",20,"code")], 122),
      ],
    },
    {
      id: "p3c3_rl", title: "Reinforcement Learning",
      description: "Learning from interaction — MDPs, Q-learning, DQN, and policy gradient methods",
      lessons: [
        lesson("p3-rl1", "Introduction to RL & MDPs", "Agent-environment loop, return & discount factor, Markov Decision Processes (MDPs), Bellman equations, value functions, policy.", 90, "intermediate", "available", 160, ["reinforcement-learning", "mdp"], 9, 8, 7,
          [sub("p3-rl1-1","Agent-Environment Loop & Return",20,"concept"),sub("p3-rl1-2","Markov Property & MDPs",20,"concept"),sub("p3-rl1-3","Bellman Expectation & Optimality Equations",25,"concept"),sub("p3-rl1-4","Value Functions & Policies",25,"concept")], 124),
        lesson("p3-rl2", "Value-Based RL Algorithms", "Model-based vs model-free, dynamic programming (policy/value iteration), Monte Carlo methods, Temporal Difference (TD) learning, Q-learning, SARSA.", 90, "advanced", "available", 180, ["reinforcement-learning", "q-learning"], 9, 9, 7,
          [sub("p3-rl2-1","Policy & Value Iteration",25,"code"),sub("p3-rl2-2","Monte Carlo Prediction & Control",20,"code"),sub("p3-rl2-3","Temporal Difference: TD(0) & TD(lambda)",20,"code"),sub("p3-rl2-4","Q-Learning vs SARSA",25,"code")], 126),
        lesson("p3-rl3", "Deep Q-Networks (DQN)", "Deep Q-learning, function approximation, experience replay, target networks, Double DQN, Dueling DQN, Prioritized Experience Replay (PER).", 90, "advanced", "available", 180, ["reinforcement-learning", "dqn"], 9, 9, 8,
          [sub("p3-rl3-1","Deep Q-Learning & Replay Buffer",25,"code"),sub("p3-rl3-2","Target Network & Double DQN",20,"code"),sub("p3-rl3-3","Dueling DQN Architecture",20,"code"),sub("p3-rl3-4","Prioritized Experience Replay",25,"code")], 128),
        lesson("p3-rl4", "Policy Gradient & Actor-Critic", "REINFORCE algorithm, policy gradient theorem, Actor-Critic architecture, Advantage Actor-Critic (A2C/A3C), PPO (Proximal Policy Optimization) basics.", 120, "expert", "available", 220, ["reinforcement-learning", "policy-gradient"], 10, 9, 8,
          [sub("p3-rl4-1","REINFORCE: Policy Gradient",25,"code"),sub("p3-rl4-2","Actor-Critic Architecture",25,"code"),sub("p3-rl4-3","A2C (Advantage Actor-Critic)",30,"code"),sub("p3-rl4-4","PPO: Clipped Objective & Training",40,"code")], 130),
      ],
    },
    {
      id: "p3c5", title: "Time Series & Special Topics",
      description: "Forecasting, recommendation systems, and scikit-learn pipelines",
      lessons: [
        lesson("p3-ts1", "Time Series Forecasting", "ARIMA, SARIMA, Prophet, exponential smoothing, feature engineering for time series.", 120, "advanced", "available", 200, ["time-series", "forecasting"], 9, 9, 7,
          [sub("p3-ts1-1","Time Series Decomposition",20,"concept"),sub("p3-ts1-2","ARIMA & SARIMA",30,"code"),sub("p3-ts1-3","Prophet Forecasting",25,"code"),sub("p3-ts1-4","Feature Engineering for TS",25,"code"),sub("p3-ts1-5","Cross-Validation for TS",20,"code")], 132),
        lesson("p3-rs1", "Recommendation Systems", "Collaborative filtering (ALS/SVD), content-based, hybrid, implicit feedback.", 90, "advanced", "available", 180, ["recsys"], 9, 9, 7,
          [sub("p3-rs1-1","User-Item Matrix & CF",25,"concept"),sub("p3-rs1-2","Matrix Factorization (SVD/ALS)",25,"code"),sub("p3-rs1-3","Content-Based Filtering",20,"code"),sub("p3-rs1-4","Implicit Feedback (BPR)",20,"code")], 135),
        lesson("p3-sk1", "Scikit-learn Pipelines & ColumnTransformer", "Reproducible ML workflows, custom transformers, feature unions, model persistence.", 75, "intermediate", "available", 150, ["sklearn", "pipelines"], 9, 10, 7,
          [sub("p3-sk1-1","Pipeline Architecture",20,"code"),sub("p3-sk1-2","ColumnTransformer",20,"code"),sub("p3-sk1-3","Custom Transformers",20,"code"),sub("p3-sk1-4","Model Persistence & joblib",15,"code")], 138),
      ],
    },
  ],
};

// ============================================================
// PHASE 4 — DATA ENGINEERING (Days 141–175)
// ============================================================
const phase4: RoadmapPhase = {
  id: "p4", phase: 5,
  title: "Data Engineering",
  subtitle: "Building the pipelines that feed AI",
  description: "Advanced SQL & warehousing, open table formats (Iceberg, Delta Lake), PySpark, Kafka, Flink real-time streaming, modern orchestrators (Airflow, Dagster, Prefect), data quality (Great Expectations), feature stores, and vector databases.",
  color: "#FBBF24", icon: "Database",
  estimatedHours: 140, dayRange: [141, 175],
  milestone: "Data Engineer Certified",
  milestoneXp: 3000,
  chapters: [
    {
      id: "p4c1", title: "Enterprise SQL & Warehousing",
      description: "Advanced query optimization, ClickHouse, DuckDB, Star schema, SCD, and dbt modeling",
      lessons: [
        lesson("p4-sq1", "Advanced SQL & Query Optimization", "Window functions, recursive CTEs, lateral joins, indexing (B-Tree, Hash, GIN), query plan analysis, partitioning.", 90, "intermediate", "available", 180, ["sql", "advanced"], 10, 10, 10,
          [sub("p4-sq1-1","Window Functions Deep Dive",30,"code"),sub("p4-sq1-2","CTEs & Recursive Queries",25,"code"),sub("p4-sq1-3","Lateral Joins & UNNEST",20,"code"),sub("p4-sq1-4","Query Plans & EXPLAIN ANALYZE",15,"code")], 141),
        lesson("p4-sq2", "Analytics Warehousing & DuckDB", "DuckDB for serverless analytics, Parquet/Arrow integration, ClickHouse for real-time OLAP, columnar storage mechanics, vectorization.", 90, "advanced", "available", 170, ["warehouse", "duckdb"], 8, 8, 6,
          [sub("p4-sq2-1","DuckDB for Local Analytics",25,"code"),sub("p4-sq2-2","Parquet vs CSV vs Columnar",20,"concept"),sub("p4-sq2-3","ClickHouse OLAP Architecture",25,"concept"),sub("p4-sq2-4","Vectorized Query Execution",20,"concept")], 142),
        lesson("p4-sq3", "Medallion Architecture & Warehouse Modeling", "Dimensional modeling (Star vs Snowflake), Slowly Changing Dimensions (SCD Type 1/2/3/4/6), Medallion architecture (Bronze, Silver, Gold), dbt (data build tool) modeling.", 90, "advanced", "available", 170, ["dbt", "modeling"], 9, 9, 7,
          [sub("p4-sq3-1","Star vs Snowflake Schema Design",25,"concept"),sub("p4-sq3-2","Slowly Changing Dimensions (SCD)",20,"concept"),sub("p4-sq3-3","Medallion Data Lakehouse Design",25,"concept"),sub("p4-sq3-4","dbt Models, Tests & Documentation",20,"code")], 143),
      ],
    },
    {
      id: "p4c1_lh", title: "Modern Table Formats & Storage (Lakehouses)",
      description: "ACID transactions on object stores, Apache Iceberg, Delta Lake, cloud storage security",
      lessons: [
        lesson("p4-lh1", "Open Table Formats (Iceberg, Delta Lake)", "Apache Iceberg, Delta Lake, Apache Hudi. ACID transactions on object storage, metadata management, time travel, schema evolution, partition pruning.", 90, "advanced", "available", 180, ["lakehouse", "iceberg"], 9, 10, 7,
          [sub("p4-lh1-1","ACID Transactions on Object Storage",25,"concept"),sub("p4-lh1-2","Apache Iceberg Spec & Catalog",25,"concept"),sub("p4-lh1-3","Delta Lake Time Travel & Log",20,"code"),sub("p4-lh1-4","Schema Evolution & Partition Evolution",20,"code")], 145),
        lesson("p4-lh2", "Object Storage & Data Lakes", "AWS S3, Google Cloud Storage, Azure Blob Storage. Storage classes, lifecycle policies, encryption (KMS), versioning, VPC endpoint security.", 75, "intermediate", "available", 150, ["storage", "data-lake"], 8, 8, 6,
          [sub("p4-lh2-1","Cloud Object Storage Internals",20,"concept"),sub("p4-lh2-2","Lifecycle Policies & Cost Optimization",20,"code"),sub("p4-lh2-3","KMS Encryption & Versioning",20,"code"),sub("p4-lh2-4","Security: Bucket Policies & VPC Endpoints",15,"code")], 146),
      ],
    },
    {
      id: "p4c2", title: "Large-Scale Processing & Streaming",
      description: "PySpark deep dive, tuning, Kafka event streaming, and Apache Flink stream processing",
      lessons: [
        lesson("p4-sp1", "Apache Spark & PySpark Deep Dive", "Spark architecture (Driver, Executors, JVM, Catalyst Optimizer), RDDs vs DataFrames, memory management, shuffle partitioning, broadcast joins, Spark SQL.", 120, "advanced", "available", 200, ["spark", "pyspark"], 8, 8, 5,
          [sub("p4-sp1-1","Spark Architecture & RDDs",25,"concept"),sub("p4-sp1-2","DataFrame & Spark SQL",30,"code"),sub("p4-sp1-3","Transformations vs Actions",20,"concept"),sub("p4-sp1-4","Partitioning & Broadcast Joins",25,"code"),sub("p4-sp1-5","Spark MLlib Intro",20,"code")], 148),
        lesson("p4-sp2", "Spark Tuning & Optimization", "Optimizing Spark jobs, caching vs persisting, handling data skew, Adaptive Query Execution (AQE), dynamic allocation, profiling with Spark UI.", 90, "advanced", "available", 180, ["spark", "optimization"], 8, 8, 6,
          [sub("p4-sp2-1","Caching & Persisting Strategies",20,"code"),sub("p4-sp2-2","Data Skew & Salting Techniques",25,"code"),sub("p4-sp2-3","Adaptive Query Execution (AQE)",25,"concept"),sub("p4-sp2-4","Spark UI Profiling & Debugging",20,"code")], 150),
        lesson("p4-kf1", "Message Queues & Event Streaming", "Apache Kafka architecture (brokers, topics, partitions, replication factor, consumer groups, offsets, KRaft), Schema Registry, Kafka Streams, Redpanda.", 90, "advanced", "available", 170, ["kafka", "streaming"], 8, 8, 5,
          [sub("p4-kf1-1","Kafka Architecture: KRaft & Zookeeper",20,"concept"),sub("p4-kf1-2","Producers, Consumers & Offsets",25,"code"),sub("p4-kf1-3","Consumer Groups & Partition Rebalancing",20,"code"),sub("p4-kf1-4","Schema Registry & Avro Serialization",25,"code")], 152),
        lesson("p4-fl1", "Real-Time Stream Processing (Flink)", "Apache Flink (event time vs processing time, state management, checkpoints, window operations), Spark Structured Streaming, real-time feature extraction.", 90, "advanced", "available", 180, ["flink", "streaming"], 9, 9, 6,
          [sub("p4-fl1-1","Event Time, Processing Time & Watermarks",25,"concept"),sub("p4-fl1-2","Flink State Backends & Checkpoints",20,"concept"),sub("p4-fl1-3","Flink Window Operations",25,"code"),sub("p4-fl1-4","Real-Time Feature Engineering with Flink",20,"code")], 154),
      ],
    },
    {
      id: "p4c3_orch", title: "Pipeline Orchestration & Ingestion",
      description: "Airflow, Dagster, Prefect, Debezium CDC, ELT tools",
      lessons: [
        lesson("p4-af1", "Batch Orchestration (Airflow, Dagster, Prefect)", "Apache Airflow (DAGs, Operators, TaskFlow API, XComs, dynamic task mapping), asset-oriented Dagster, code-first Prefect.", 90, "intermediate", "available", 170, ["airflow", "dagster"], 8, 9, 5,
          [sub("p4-af1-1","Airflow DAGs & Operators",25,"code"),sub("p4-af1-2","Sensors & XComs",20,"code"),sub("p4-af1-3","Dagster Asset-Oriented Orchestration",25,"code"),sub("p4-af1-4","Prefect Code-First Pipelines",20,"code")], 156),
        lesson("p4-ing1", "Data Ingestion & Connectors", "ELT/ETL ingestion pipelines, CDC (Change Data Capture) with Debezium, tools (Airbyte, Fivetran, Meltano), REST API ingestion, retry backoffs.", 75, "intermediate", "available", 150, ["ingestion", "cdc"], 9, 9, 6,
          [sub("p4-ing1-1","ETL vs ELT Ingestion Pipelines",15,"concept"),sub("p4-ing1-2","Change Data Capture (CDC) & Debezium",25,"concept"),sub("p4-ing1-3","Airbyte & Fivetran Setup",20,"code"),sub("p4-ing1-4","API Ingestion, Rate Limits & Retries",15,"code")], 158),
      ],
    },
    {
      id: "p4c3", title: "Data Quality, Governance & AI Serving",
      description: "Great Expectations, Feast feature store, Qdrant vector database, metadata catalogs",
      lessons: [
        lesson("p4-dq1", "Data Quality & Observability", "Schema validation, data testing (dbt tests, Soda), automated quality profiling (Great Expectations), data lineage, observability (Monte Carlo).", 90, "intermediate", "available", 160, ["data-quality", "observability"], 9, 9, 6,
          [sub("p4-dq1-1","Data Quality Dimensions & Schema Validation",20,"concept"),sub("p4-dq1-2","Soda & dbt Testing Frameworks",25,"code"),sub("p4-dq1-3","Great Expectations Setup & Profiling",25,"code"),sub("p4-dq1-4","Data Lineage & Observability",20,"concept")], 160),
        lesson("p4-fs1", "Feature Stores for AI Serving", "Online vs offline feature stores, point-in-time correct joins, Feast, Hopsworks, Tecton, feature serving latency optimization.", 90, "advanced", "available", 180, ["feature-store"], 9, 9, 5,
          [sub("p4-fs1-1","Feature Store Architecture",25,"concept"),sub("p4-fs1-2","Feast Online vs Offline Features",20,"code"),sub("p4-fs1-3","Point-in-Time Correct Joins (No Leakage)",25,"code"),sub("p4-fs1-4","Low Latency Feature Serving APIs",20,"code")], 162),
        lesson("p4-vd1", "Vector Databases & Retrieval", "ANN search, HNSW, IVF, Qdrant, Pinecone, Milvus, pgvector, FAISS, hybrid lexical/dense search.", 90, "advanced", "available", 190, ["vector-db", "ann"], 10, 10, 7,
          [sub("p4-vd1-1","ANN Algorithms: HNSW & IVF",25,"concept"),sub("p4-vd1-2","Qdrant: Setup & CRUD",25,"code"),sub("p4-vd1-3","FAISS: Local Vector Search",20,"code"),sub("p4-vd1-4","Hybrid Search: BM25 + Dense",20,"code")], 165),
        lesson("p4-gov1", "Governance, Cataloging & Security", "Metadata catalogs (DataHub, Amundsen, Apache Atlas), RBAC vs ABAC, column/row-level security, GDPR/CCPA data lineage compliance.", 75, "advanced", "available", 160, ["governance", "security"], 9, 8, 5,
          [sub("p4-gov1-1","Data Catalogs: DataHub & Amundsen",20,"code"),sub("p4-gov1-2","RBAC vs ABAC Access Control",20,"concept"),sub("p4-gov1-3","Column & Row-Level Security",20,"code"),sub("p4-gov1-4","GDPR Right-to-be-Forgotten & Audit Trails",15,"concept")], 168),
      ],
    },
  ],
};

// ============================================================
// PHASE 5 — DEEP LEARNING (Days 176–220)
// ============================================================
const phase5: RoadmapPhase = {
  id: "p5", phase: 6,
  title: "Deep Learning",
  subtitle: "Neural networks from scratch to mastery",
  description: "PyTorch, backpropagation from scratch, activations, modern normalizations (RMSNorm), GQA/MQA attention, positional encodings (RoPE), SwiGLU, FlashAttention, VQ-VAEs, and Flow Matching.",
  color: "#60A5FA", icon: "Layers",
  estimatedHours: 200, dayRange: [176, 220],
  milestone: "Deep Learning Specialist",
  milestoneXp: 5000,
  chapters: [
    {
      id: "p5c1", title: "PyTorch, TensorFlow & Distributed Foundations",
      description: "The essential deep learning frameworks for research and production scaling",
      lessons: [
        lesson("p5-pt1", "PyTorch Tensors & Autograd Mechanics", "Tensor memory layouts (stride, contiguity), autograd engine (backward graph, custom autograd functions), gradient accumulation, and hooks.", 90, "intermediate", "available", 180, ["pytorch"], 10, 10, 9,
          [sub("p5-pt1-1","Tensor Creation & Stride Memory Layout",20,"code"),sub("p5-pt1-2","Dynamic vs Static Computation Graphs",20,"concept"),sub("p5-pt1-3","Autograd Engine & Custom Backward Functions",30,"code"),sub("p5-pt1-4","Gradient Accumulation & Hooks",20,"code")], 176),
        lesson("p5-pt2", "Production PyTorch & Mixed Precision", "nn.Module, custom Dataset/DataLoader, CPU-GPU data transfers (num_workers, pin_memory), Automatic Mixed Precision (AMP: FP16 vs BF16), gradient scaling.", 90, "intermediate", "available", 180, ["pytorch", "training"], 10, 10, 8,
          [sub("p5-pt2-1","nn.Module & Sequential Custom Blocks",20,"code"),sub("p5-pt2-2","Custom Dataset & Fast DataLoader (pin_memory)",25,"code"),sub("p5-pt2-3","Automatic Mixed Precision (AMP) with torch.cuda.amp",25,"code"),sub("p5-pt2-4","Gradient Scaling & Checkpoint Serialization",20,"code")], 178),
        lesson("p5-pt3", "Distributed Training & Scaling (DDP)", "DistributedDataParallel (DDP) communication primitives (All-Reduce, Ring-Reduce), PyTorch Lightning modules, Hugging Face Accelerate, gradient checkpointing.", 75, "advanced", "available", 160, ["pytorch-lightning", "ddp"], 8, 9, 6,
          [sub("p5-pt3-1","DistributedDataParallel (DDP) vs DataParallel (DP)",20,"concept"),sub("p5-pt3-2","LightningModule & Trainer",20,"code"),sub("p5-pt3-3","Hugging Face Accelerate for Scaling",15,"code"),sub("p5-pt3-4","Gradient Checkpointing for Memory Savings",20,"code")], 180),
        lesson("p5-tf1", "TensorFlow & Keras Production Framework", "TensorFlow static graphs, Keras functional API, custom layers, tf.data pipelines, TF Lite for mobile/edge, and TPU training strategies.", 90, "intermediate", "available", 170, ["tensorflow", "keras", "tflite"], 8, 9, 7,
          [sub("p5-tf1-1","Keras Functional & Subclassing APIs",20,"code"),sub("p5-tf1-2","tf.data Input Pipelines & Prefetching",25,"code"),sub("p5-tf1-3","TensorFlow Lite (TFLite) Quantization & Edge Deployment",25,"code"),sub("p5-tf1-4","TPU Training & tf.distribute Strategies",20,"code")], 181),
      ],
    },
    {
      id: "p5c2", title: "Neural Network Architecture & Optimization",
      description: "Backprop math, custom weight initialization, modern normalization (RMSNorm)",
      lessons: [
        lesson("p5-nn1", "MLPs & Backpropagation from Scratch", "MLP architecture, forward pass, mathematical backpropagation derivation (Jacobian matrices, chain rule), vanishing/exploding gradients, gradient clipping.", 120, "intermediate", "available", 220, ["mlp", "backprop"], 10, 10, 10,
          [sub("p5-nn1-1","MLP Forward Pass",25,"code"),sub("p5-nn1-2","Backpropagation Calculus from Scratch",30,"concept"),sub("p5-nn1-3","Custom Backprop Implementation",30,"code"),sub("p5-nn1-4","Vanishing vs Exploding Gradients Math",15,"concept"),sub("p5-nn1-5","Norm & Value Gradient Clipping",20,"code")], 182),
        lesson("p5-nn2", "Activation Functions & Initializations", "Xavier/Glorot, Kaiming/He initialization. ReLU, LeakyReLU, GELU, SiLU/Swish (LLM standards), Mish activation mathematical properties.", 60, "intermediate", "available", 120, ["activations", "initialization"], 8, 8, 7,
          [sub("p5-nn2-1","Xavier vs Kaiming Initialization Math",15,"concept"),sub("p5-nn2-2","Sigmoid & Tanh Dead Gradient Problem",15,"concept"),sub("p5-nn2-3","GELU & SiLU/Swish Activations in Modern Networks",20,"concept"),sub("p5-nn2-4","Mish Activation Implementation",10,"code")], 185),
        lesson("p5-nn3", "Normalization, Optimizers & Regularization", "Batch Norm, Layer Norm, RMSNorm (modern LLM default), Group/Instance Norm, Dropout, MC Dropout, Weight Decay, warmups, cosine annealing, Adam, AdamW.", 90, "intermediate", "available", 170, ["regularization", "normalization", "optimizers"], 10, 9, 8,
          [sub("p5-nn3-1","Dropout & Monte Carlo Dropout",25,"code"),sub("p5-nn3-2","Batch Normalization vs Layer Normalization",25,"code"),sub("p5-nn3-3","RMSNorm & Group Normalization",20,"code"),sub("p5-nn3-4","AdamW Weight Decay vs L2 Regularization",20,"code"),sub("p5-nn3-5","Learning Rate Warmup & Cosine Annealing",20,"code")], 187),
      ],
    },
    {
      id: "p5c3", title: "Convolutional Neural Networks",
      description: "CNN operations, ResNet architectures, and modern ConvNeXt models",
      lessons: [
        lesson("p5-cn1", "CNN Fundamentals & Operations", "Convolutions (stride, padding, dilation), pooling, receptive field math, parameter sharing, LeNet, AlexNet.", 90, "intermediate", "available", 180, ["cnn"], 9, 9, 8,
          [sub("p5-cn1-1","Convolution, Strides & Dilation Mechanics",25,"code"),sub("p5-cn1-2","Pooling Types: Max, Average, Global Average",20,"code"),sub("p5-cn1-3","Receptive Field Calculation Formula",15,"concept"),sub("p5-cn1-4","LeNet-5 & AlexNet Implementations",30,"code")], 190),
        lesson("p5-cn2", "Modern CNN Architectures", "VGG, ResNet (residual skip connections, bottleneck blocks), Inception, EfficientNet (compound scaling), MobileNet (depthwise separable), ConvNeXt.", 120, "advanced", "available", 220, ["cnn", "resnet"], 9, 9, 8,
          [sub("p5-cn2-1","VGG & Residual Blocks",20,"code"),sub("p5-cn2-2","ResNet Bottleneck Blocks & Skip Connections",30,"code"),sub("p5-cn2-3","EfficientNet Compound Scaling Rules",25,"code"),sub("p5-cn2-4","Depthwise Separable Convolutions (MobileNet)",20,"code"),sub("p5-cn2-5","ConvNeXt: Modernizing CNNs with Transformer recipes",25,"code")], 193),
      ],
    },
    {
      id: "p5c4", title: "Sequence Models",
      description: "Recurrent networks, LSTMs, GRUs, and Sequence-to-Sequence models",
      lessons: [
        lesson("p5-rn1", "Recurrent Architectures (LSTMs & GRUs)", "Vanilla RNN, Backpropagation Through Time (BPTT), LSTM gate equations, GRU simplified gates, bidirectional recurrent loops, Seq2Seq with Bahdanau attention.", 120, "advanced", "available", 200, ["rnn", "lstm"], 8, 7, 7,
          [sub("p5-rn1-1","Vanilla RNN & BPTT Issues",25,"concept"),sub("p5-rn1-2","LSTM Gates Mathematics & Cell State Flow",30,"code"),sub("p5-rn1-3","GRU Gate Simplification",20,"code"),sub("p5-rn1-4","Bidirectional Sequence Layers",20,"code"),sub("p5-rn1-5","Seq2Seq Architecture & Bahdanau Attention",25,"code")], 197),
      ],
    },
    {
      id: "p5c5", title: "Transformers & LLM Architectures from Scratch",
      description: "Attention models, Rotary Position Embeddings (RoPE), SwiGLU, GQA, and KV Caches",
      lessons: [
        lesson("p5-tr1", "Attention Mechanisms (MHA, GQA, MQA)", "Scaled dot-product attention, query/key/value projection, Multi-Head Attention (MHA), Multi-Query Attention (MQA), Grouped-Query Attention (GQA).", 90, "advanced", "available", 220, ["attention", "transformer"], 10, 10, 10,
          [sub("p5-tr1-1","Self-Attention Mathematically Derived",30,"concept"),sub("p5-tr1-2","Multi-Head Attention Projection & Softmax",25,"code"),sub("p5-tr1-3","Multi-Query Attention (MQA) vs Grouped-Query Attention (GQA)",25,"concept"),sub("p5-tr1-4","Visualizing Attention Map Alignments",10,"code")], 200),
        lesson("p5-tr2", "Transformer Block & LLM Internals", "Positional encodings (Sinusoidal vs Rotary Embeddings/RoPE), ALiBi, Pre-LN vs Post-LN layouts, SwiGLU activation block, causal masking, KV Caching.", 150, "advanced", "available", 280, ["transformer", "rope"], 10, 10, 10,
          [sub("p5-tr2-1","Rotary Position Embeddings (RoPE) Math",25,"concept"),sub("p5-tr2-2","Pre-LN Transformer Block & SwiGLU Activation",30,"code"),sub("p5-tr2-3","Decoder causal masking & Cross-Attention",30,"code"),sub("p5-tr2-4","KV Cache Implementation for LLM Inference",35,"code"),sub("p5-tr2-5","Full Decoder-Only Transformer from Scratch",30,"code")], 203),
        lesson("p5-tr3", "Modern Transformer Optimizations", "FlashAttention (SRAM/HBM IO-awareness, memory management), FlashAttention-2, Sparse Attention, Linear Attention.", 90, "expert", "available", 220, ["efficient-transformers", "flashattention"], 9, 9, 7,
          [sub("p5-tr3-1","Quadratic Complexity Bottleneck of Attention",15,"concept"),sub("p5-tr3-2","FlashAttention IO-Aware Tiling & Recomputation",30,"concept"),sub("p5-tr3-3","FlashAttention-2 Thread-level Optimizations",25,"concept"),sub("p5-tr3-4","Sparse & Linear Attention Approximations",20,"concept")], 207),
      ],
    },
    {
      id: "p5c6", title: "Generative Models & Frontier DL",
      description: "StyleGAN, VQ-VAEs, Latent Diffusion, Flow Matching, and Graph Neural Networks",
      lessons: [
        lesson("p5-gn1", "Generative Adversarial Networks", "Min-max game theory, DCGAN, mode collapse, Wasserstein GAN (WGAN-GP), StyleGAN mapping network, conditional GANs.", 120, "advanced", "available", 220, ["gan"], 8, 8, 7,
          [sub("p5-gn1-1","GAN Framework & Min-Max Objective",25,"concept"),sub("p5-gn1-2","DCGAN Implementation in PyTorch",30,"code"),sub("p5-gn1-3","Wasserstein GAN (WGAN-GP) & Gradient Penalty",25,"code"),sub("p5-gn1-4","StyleGAN Generator & Mapping Network",20,"concept"),sub("p5-gn1-5","Conditional GANs (cGAN)",20,"code")], 210),
        lesson("p5-gn2", "Variational Autoencoders & VQ-VAEs", "VAE, ELBO derivation, reparameterization trick, Vector Quantized VAEs (VQ-VAE, VQ-VAE-2) discrete latent variables.", 90, "advanced", "available", 200, ["vae", "vq-vae"], 8, 8, 6,
          [sub("p5-gn2-1","ELBO & KL Divergence Math Derivation",25,"concept"),sub("p5-gn2-2","Reparameterization Trick & Latent Codecs",25,"code"),sub("p5-gn2-3","VQ-VAE Quantization Codebook & Commitment Loss",25,"code"),sub("p5-gn2-4","VQ-VAE Image Reconstruction",15,"code")], 213),
        lesson("p5-gn3", "Diffusion Models & Flow Matching", "DDPM math (forward/reverse processes), DDIM sampling, Classifier-Free Guidance (CFG), Latent Diffusion, Flow Matching & Rectified Flow.", 150, "expert", "available", 280, ["diffusion", "flow-matching"], 9, 9, 8,
          [sub("p5-gn3-1","DDPM Forward Noise Addition & Reverse Denoising Math",25,"concept"),sub("p5-gn3-2","DDPM UNet Denoiser Implementation",25,"code"),sub("p5-gn3-3","DDIM Deterministic Sampling & Classifier-Free Guidance (CFG)",25,"code"),sub("p5-gn3-4","Latent Diffusion & Stable Diffusion Architecture",25,"concept"),sub("p5-gn3-5","Flow Matching & Rectified Flow Math",25,"concept"),sub("p5-gn3-6","Building a Toy Flow Matching Model",25,"code")], 216),
        lesson("p5-gn4", "Graph Neural Networks (GNNs)", "Graph convolutions, GCN spectral methods, Graph Attention Networks (GAT), GraphSAGE inductive neighborhood aggregation, message passing.", 90, "expert", "available", 200, ["gnn"], 7, 7, 5,
          [sub("p5-gn4-1","Graph Representation (Adjacency Matrices, Node Features)",20,"concept"),sub("p5-gn4-2","Graph Convolutional Networks (GCN) Message Passing",25,"code"),sub("p5-gn4-3","Graph Attention Networks (GAT) Coefficients",25,"code"),sub("p5-gn4-4","GraphSAGE Aggregate Functions",20,"code")], 219),
      ],
    },
  ],
};

// ============================================================
// PHASE 6 — NLP & LANGUAGE MODELS (Days 221–250)
// ============================================================
const phase6: RoadmapPhase = {
  id: "p6", phase: 7,
  title: "NLP & Language Models",
  subtitle: "From tokenization to the frontier of language AI",
  description: "Linguistic foundations, NLTK/spaCy, tokenization, topic modeling, neural sequences (LSTMs), transformers, core tasks (NER, Summarization, QA, Speech), and Azure AI Language.",
  color: "#F472B6", icon: "MessageSquare",
  estimatedHours: 160, dayRange: [221, 250],
  milestone: "NLP & LM Specialist",
  milestoneXp: 4000,
  chapters: [
    {
      id: "p6c1", title: "Linguistic Foundations & Preprocessing",
      description: "Text processing environments, linguistics, stemming/lemmatization, and basic parsing",
      lessons: [
        lesson("p6-nl1", "NLP Foundations & Text Preprocessing", "Linguistic levels (morphology, syntax, semantics, pragmatics), rule-based vs statistical NLP, unicode normalization, regex clean pipelines.", 75, "beginner", "available", 130, ["nlp", "preprocessing"], 8, 8, 6,
          [sub("p6-nl1-1","Linguistic Ambiguity & NLP Lifecycle Overview",20,"concept"),sub("p6-nl1-2","Unicode Normalization & Encoding Handling",20,"code"),sub("p6-nl1-3","Regex Patterns for Advanced Text Cleaning",20,"code"),sub("p6-nl1-4","Whitespace & Punctuation Stripping Pipelines",15,"code")], 221),
        lesson("p6-nl2", "Linguistic Processing & Feature Extraction", "Part-of-Speech (POS) tagging, chunking, dependency vs constituency parsing, NER basics, coreference resolution. NLTK, spaCy, TextBlob, Gensim.", 90, "intermediate", "available", 180, ["nlp", "parsing"], 9, 9, 8,
          [sub("p6-nl2-1","NLTK, spaCy, and TextBlob Environments",20,"code"),sub("p6-nl2-2","POS Tagging & Rule-Based Chunking",25,"code"),sub("p6-nl2-3","Dependency Parsing vs Constituency Trees",25,"concept"),sub("p6-nl2-4","Coreference Resolution Foundations",20,"concept")], 222),
        lesson("p6-nl3", "Stemming, Lemmatization & Tokenization", "Porter vs Snowball stemmers, context-aware lemmatization. Subword tokenization (Byte-Pair Encoding, WordPiece, SentencePiece).", 75, "intermediate", "available", 160, ["tokenization"], 8, 8, 6,
          [sub("p6-nl3-1","Porter & Snowball Stemming Algorithms",20,"code"),sub("p6-nl3-2","Context-Aware spaCy Lemmatization",20,"code"),sub("p6-nl3-3","Subword Vocabularies: BPE, WordPiece, SentencePiece",20,"concept"),sub("p6-nl3-4","Token Budget Optimization & Prompt Compression",15,"code")], 223),
      ],
    },
    {
      id: "p6c2", title: "Classical Representations & Machine Learning",
      description: "Vectorization models, smoothing techniques, topic extraction, and traditional ML classification",
      lessons: [
        lesson("p6-nl4", "Classical Text Vectorization & Modeling", "One-hot encoding, Bag of Words, N-grams, TF-IDF, feature hashing. N-gram language models, Laplace vs Kneser-Ney smoothing, perplexity.", 90, "intermediate", "available", 180, ["vectorization", "n-grams"], 9, 9, 8,
          [sub("p6-nl4-1","One-Hot Encoding vs Bag of Words (BoW)",20,"concept"),sub("p6-nl4-2","TF-IDF Math & Feature Hashing Vectorizers",25,"code"),sub("p6-nl4-3","N-Gram Language Models & Markov Assumptions",20,"concept"),sub("p6-nl4-4","Laplace & Kneser-Ney Smoothing Perplexity",25,"code")], 225),
        lesson("p6-nl5", "Topic Modeling & Text Clustering", "Latent Semantic Analysis (LSA), Singular Value Decomposition (SVD), Latent Dirichlet Allocation (LDA), Non-Negative Matrix Factorization (NMF).", 90, "advanced", "available", 190, ["topic-modeling", "lda"], 9, 9, 7,
          [sub("p6-nl5-1","LSA & Singular Value Decomposition (SVD)",25,"concept"),sub("p6-nl5-2","Latent Dirichlet Allocation (LDA) Topic Distributions",25,"code"),sub("p6-nl5-3","Non-Negative Matrix Factorization (NMF) Matrices",20,"concept"),sub("p6-nl5-4","Evaluating Topic Coherence Scores",20,"code")], 226),
        lesson("p6-nl6", "Traditional Machine Learning for NLP", "Feature engineering for text, Naive Bayes spam classifiers, Logistic Regression, SVMs, Random Forests, metrics (Accuracy, Precision, Recall, F1, METEOR).", 90, "intermediate", "available", 180, ["nlp", "machine-learning"], 10, 10, 7,
          [sub("p6-nl6-1","Text Feature Extraction & Vocabulary Filtering",25,"code"),sub("p6-nl6-2","Naive Bayes & Logistic Regression Classifiers",25,"code"),sub("p6-nl6-3","Support Vector Machines & Random Forests on Sparse Vectors",20,"code"),sub("p6-nl6-4","Evaluation: BLEU, ROUGE, and METEOR Scores",20,"code")], 227),
      ],
    },
    {
      id: "p6c3", title: "Word Embeddings & Recurrent Neural Models",
      description: "Static and contextual dense vectors, RNNs, LSTMs, and sequence mapping",
      lessons: [
        lesson("p6-em1", "Static Word Embeddings (Word2Vec to fastText)", "Word2Vec Skip-gram vs CBOW, Negative Sampling, Hierarchical Softmax, GloVe global log-bilinear factorization, fastText subwords, Doc2Vec.", 90, "intermediate", "available", 180, ["embeddings", "word2vec"], 9, 9, 8,
          [sub("p6-em1-1","CBOW vs Skip-Gram Math & Gradients",25,"concept"),sub("p6-em1-2","Negative Sampling & Hierarchical Softmax Architectures",20,"concept"),sub("p6-em1-3","GloVe Matrix Factorization & Doc2Vec",20,"concept"),sub("p6-em1-4","fastText Subword Embeddings & OOV Handlers",25,"code")], 229),
        lesson("p6-em2", "Contextual Embeddings & Recurrent Networks", "ELMo bi-LSTMs, recurrent neural networks (RNNs), Backpropagation Through Time (BPTT), vanishing gradients, LSTMs, GRUs, bidirectional networks.", 90, "advanced", "available", 200, ["rnn", "lstm"], 9, 9, 8,
          [sub("p6-em2-1","ELMo Contextual Representations",20,"concept"),sub("p6-em2-2","Vanilla RNN & Backpropagation Through Time (BPTT)",25,"concept"),sub("p6-em2-3","Vanishing Gradients & LSTM cell gates math",25,"code"),sub("p6-em2-4","Gated Recurrent Units (GRU) & Bidirectional Networks",20,"code")], 230),
        lesson("p6-em3", "Sequence-to-Sequence (Seq2Seq) & TextCNN", "Seq2Seq encoder-decoder architecture, TextCNN for sentence classification, Bahdanau additive attention, multiplicative attention.", 90, "advanced", "available", 190, ["seq2seq", "cnn"], 9, 9, 7,
          [sub("p6-em3-1","Seq2Seq Encoder-Decoder LSTMs",25,"concept"),sub("p6-em3-2","Additive (Bahdanau) vs Multiplicative (Luong) Attention",25,"concept"),sub("p6-em3-3","TextCNN: Convolution for Sentence Classification",20,"code"),sub("p6-em3-4","Pooling and Classification Layers in TextCNN",20,"code")], 231),
      ],
    },
    {
      id: "p6c4", title: "Transformers & Language Models",
      description: "Attention stacks, encoders, decoders, and Seq2Seq transformers",
      lessons: [
        lesson("p6-tr1", "Transformer Architecture Deep Dive", "Self-attention, scaled dot-product attention, multi-head attention, cross-attention, positional encoding, residual connections, layer normalization.", 90, "advanced", "available", 200, ["transformer", "attention"], 10, 10, 10,
          [sub("p6-tr1-1","Multi-Head Self-Attention Block Math",25,"concept"),sub("p6-tr1-2","Cross-Attention Layer Mechanics",20,"concept"),sub("p6-tr1-3","Sinusoidal Positional Encoding & Residual Links",25,"concept"),sub("p6-tr1-4","Layer Normalization Forward Pass",20,"concept")], 233),
        lesson("p6-tr2", "Encoder Models (BERT & Variants)", "BERT pretraining (MLM, NSP), RoBERTa dynamic masking, DeBERTa relative positions, ALBERT parameter sharing, DistilBERT distillation, XLNet.", 90, "advanced", "available", 200, ["bert", "encoder"], 9, 9, 8,
          [sub("p6-tr2-1","BERT Encoder Stack & CLS/SEP Pretraining",25,"concept"),sub("p6-tr2-2","RoBERTa vs BERT: Recipes & Dynamic Masking",20,"code"),sub("p6-tr2-3","DeBERTa relative attention & ALBERT factorizations",25,"concept"),sub("p6-tr2-4","DistilBERT Student-Teacher Distillation math",20,"concept")], 234),
        lesson("p6-tr3", "Decoder Models & Autoregressive Generation", "GPT family, causal masking, autoregressive generation loop, decoding search strategies (greedy, top-k, top-p, beam search, speculative decoding).", 90, "advanced", "available", 200, ["gpt", "decoder"], 10, 10, 9,
          [sub("p6-tr3-1","GPT Decoder Architecture & Causal Masks",25,"concept"),sub("p6-tr3-2","Autoregressive Sequence Generation",20,"code"),sub("p6-tr3-3","Sampling: Greedy, Temperature, Top-K, Top-P (Nucleus)",25,"code"),sub("p6-tr3-4","Beam Search & Speculative Decoding Optimizations",20,"code")], 236),
        lesson("p6-tr4", "Seq2Seq Transformers (T5 & BART)", "T5 text-to-text span corruption, BART denoising autoencoder, cross-attention block, FLAN-T5, instruction-tuning foundations.", 75, "advanced", "available", 170, ["t5", "seq2seq"], 8, 8, 6,
          [sub("p6-tr4-1","T5 Unified Text-to-Text Format & Tasks",20,"concept"),sub("p6-tr4-2","BART Denoising Autoencoder & Text Reconstruction",20,"code"),sub("p6-tr4-3","FLAN-T5 Instruction-Tuning Recipes",15,"code"),sub("p6-tr4-4","Fine-tuning T5/BART for Downstream Tasks",20,"code")], 238),
      ],
    },
    {
      id: "p6c5", title: "Core NLP Tasks & Speech Processing",
      description: "Downstream applications: Sentiment, IE, Machine Translation, Conversational AI, and Speech NLP",
      lessons: [
        lesson("p6-ts1", "Classification, Sentiment & NER", "Topic/intent classification, sentiment analysis (rule-based VADER vs deep models, Aspect-Based Sentiment), Named Entity Recognition (ML vs Transformer NER).", 90, "intermediate", "available", 180, ["nlp-tasks"], 10, 10, 7,
          [sub("p6-ts1-1","Rule-Based Sentiment: VADER Lexicon",20,"code"),sub("p6-ts1-2","Aspect-Based Sentiment Analysis (ABSA)",25,"code"),sub("p6-ts1-3","NER: Transition-based spaCy vs Transformer CRF",25,"code"),sub("p6-ts1-4","Intent Classification Models for Chatbots",20,"code")], 240),
        lesson("p6-ts2", "Information Extraction & Translation", "Relation extraction, entity linking, knowledge graph construction, neural machine translation, summarization (extractive vs abstractive).", 90, "advanced", "available", 190, ["information-extraction"], 9, 9, 7,
          [sub("p6-ts2-1","Relation Extraction Patterns & Entity Linking",25,"code"),sub("p6-ts2-2","Constructing Knowledge Graphs from Text",25,"code"),sub("p6-ts2-3","Neural Machine Translation & BLEU Score",20,"code"),sub("p6-ts2-4","Summarization: Extractive vs Abstractive Architectures",20,"code")], 242),
        lesson("p6-ts3", "Speech Recognition & Conversational AI", "Automatic Speech Recognition (ASR), Text-to-Speech (TTS), speech embeddings (Whisper), chatbot intent+entity systems, retrieval vs generative bots.", 90, "expert", "available", 210, ["speech", "conversational-ai"], 10, 9, 8,
          [sub("p6-ts3-1","Speech Acoustics: Mel Spectrograms & Waveforms",25,"concept"),sub("p6-ts3-2","Automatic Speech Recognition (ASR) & Whisper",25,"code"),sub("p6-ts3-3","Text-to-Speech (TTS) Synthesis Systems",20,"code"),sub("p6-ts3-4","Conversational AI: Dialog State Tracking & Fallbacks",20,"code")], 244),
      ],
    },
    {
      id: "p6c6", title: "Azure NLP & Enterprise Deployment",
      description: "Azure AI Language services, Conversational Language Understanding (CLU), optimization, and drift monitoring",
      lessons: [
        lesson("p6-az1", "Azure AI Language & CLU", "Azure AI Language services, custom text classification, Named Entity Recognition, Conversational Language Understanding (CLU).", 90, "advanced", "available", 190, ["azure", "clu"], 9, 9, 6,
          [sub("p6-az1-1","Azure AI Language SDK & Text Analytics",25,"code"),sub("p6-az1-2","Azure Custom Text Classification Workflows",25,"code"),sub("p6-az1-3","Conversational Language Understanding (CLU) schemas",20,"code"),sub("p6-az1-4","Deploying CLU Apps & Intent Router Integration",20,"code")], 246),
        lesson("p6-az2", "Enterprise Deployment & Optimization", "Deploying NLP via FastAPI/Gradio/Streamlit, Dockerizing models, quantization (ONNX, TensorRT, distillation), drift monitoring, Azure Container Apps, AKS.", 90, "expert", "available", 200, ["azure", "deployment"], 10, 9, 6,
          [sub("p6-az2-1","FastAPI & Gradio NLP Model Interfaces",20,"code"),sub("p6-az2-2","Model Optimization: Quantization, ONNX, and TensorRT",25,"code"),sub("p6-az2-3","Deploying to Azure Container Apps & AKS",25,"code"),sub("p6-az2-4","MLOps: Embedding Distribution & Drift Monitoring",20,"code")], 248),
      ],
    },
  ],
};

// ============================================================
// PHASE 7 — COMPUTER VISION (Days 251–270)
// ============================================================
const phase7: RoadmapPhase = {
  id: "p7", phase: 8,
  title: "Computer Vision",
  subtitle: "Teaching machines to see",
  description: "Image classification, object detection, segmentation, ViT, SAM, DINO, image generation, video understanding.",
  color: "#10B981", icon: "Eye",
  estimatedHours: 100, dayRange: [251, 270],
  milestone: "Computer Vision Practitioner",
  milestoneXp: 2500,
  chapters: [
    {
      id: "p7c1", title: "Vision Fundamentals",
      description: "Image processing, classification, data augmentation",
      lessons: [
        lesson("p7-cv1", "Image Processing & Augmentation", "OpenCV, PIL, torchvision transforms, albumentations, MixUp, CutMix, test-time augmentation.", 75, "beginner", "available", 130, ["cv", "augmentation"], 8, 8, 6,
          [sub("p7-cv1-1","OpenCV Fundamentals",20,"code"),sub("p7-cv1-2","torchvision Transforms",20,"code"),sub("p7-cv1-3","Albumentations Library",15,"code"),sub("p7-cv1-4","MixUp, CutMix, Mosaic",20,"code")], 251),
        lesson("p7-cv2", "Transfer Learning & Fine-tuning", "ImageNet pretraining, feature extraction, fine-tuning strategies, torchvision models.", 75, "intermediate", "available", 160, ["transfer-learning"], 10, 10, 8,
          [sub("p7-cv2-1","Feature Extraction",20,"code"),sub("p7-cv2-2","Fine-tuning Strategies",25,"code"),sub("p7-cv2-3","Learning Rate for Fine-tuning",15,"code"),sub("p7-cv2-4","timm Library",15,"code")], 254),
      ],
    },
    {
      id: "p7c2", title: "Object Detection & Segmentation",
      description: "YOLO, Faster R-CNN, SAM — detecting and segmenting objects",
      lessons: [
        lesson("p7-od1", "Object Detection", "R-CNN family, YOLO (v5/v8/v11), DETR, anchor-free detection, NMS, mAP metric.", 120, "advanced", "available", 220, ["object-detection", "yolo"], 9, 9, 7,
          [sub("p7-od1-1","Two-Stage: Faster R-CNN",25,"concept"),sub("p7-od1-2","One-Stage: YOLO Architecture",25,"concept"),sub("p7-od1-3","YOLO Training & Inference",30,"code"),sub("p7-od1-4","DETR: Detection Transformer",20,"concept"),sub("p7-od1-5","mAP & IoU Metrics",20,"code")], 257),
        lesson("p7-od2", "Image Segmentation", "Semantic, instance, panoptic segmentation, FCN, UNet, Mask R-CNN, SAM (Segment Anything).", 120, "advanced", "available", 220, ["segmentation", "sam"], 8, 8, 6,
          [sub("p7-od2-1","Semantic vs Instance vs Panoptic",15,"concept"),sub("p7-od2-2","UNet Architecture",25,"code"),sub("p7-od2-3","Mask R-CNN",25,"concept"),sub("p7-od2-4","SAM: Segment Anything Model",30,"code"),sub("p7-od2-5","Grounded-SAM",25,"code")], 261),
      ],
    },
    {
      id: "p7c3", title: "Vision Transformers & Self-Supervised",
      description: "ViT, DINO, MAE — transformers for vision",
      lessons: [
        lesson("p7-vt1", "Vision Transformers (ViT)", "Patch embeddings, ViT architecture, DeiT, Swin Transformer, comparisons with CNNs.", 90, "advanced", "available", 200, ["vit", "transformer"], 9, 9, 7,
          [sub("p7-vt1-1","Patch Embeddings",20,"concept"),sub("p7-vt1-2","ViT Architecture",25,"concept"),sub("p7-vt1-3","Swin Transformer: Hierarchical ViT",25,"concept"),sub("p7-vt1-4","ViT Fine-tuning",20,"code")], 264),
        lesson("p7-vt2", "Self-Supervised Vision (DINO, MAE)", "Contrastive learning, DINO, DINOv2, Masked Autoencoders, CLIP training.", 90, "expert", "available", 200, ["dino", "self-supervised"], 8, 8, 6,
          [sub("p7-vt2-1","Contrastive Learning: SimCLR",25,"concept"),sub("p7-vt2-2","DINO & DINOv2",25,"concept"),sub("p7-vt2-3","Masked Autoencoders (MAE)",20,"concept"),sub("p7-vt2-4","Using DINOv2 Features",20,"code")], 267),
      ],
    },
  ],
};

// ============================================================
// PHASE 8 — LLM ENGINEERING (Days 271–310)
// ============================================================
const phase8: RoadmapPhase = {
  id: "p8", phase: 9,
  title: "LLM Engineering",
  subtitle: "RAG · Agents · Fine-tuning · Evaluation",
  description: "Prompt engineering, RAG architectures, AI agents, MCP, RLHF, DPO, PEFT, evaluation, safety, and Azure/Enterprise copilot architecture.",
  color: "#7C3AED", icon: "Sparkles",
  estimatedHours: 200, dayRange: [271, 310],
  milestone: "LLM Engineer",
  milestoneXp: 6000,
  chapters: [
    {
      id: "p8c1", title: "Prompt Engineering & Reasoning",
      description: "Prompt anatomy to structured output control and reasoning logic",
      lessons: [
        lesson("p8-pe1", "Prompt Engineering Fundamentals", "Prompt anatomy, System vs User vs Assistant prompts, role prompting, formatting delimiters, and prompt templates.", 90, "intermediate", "available", 180, ["prompting"], 10, 10, 9,
          [sub("p8-pe1-1","Prompt Anatomy & Instruction Styling",20,"code"),sub("p8-pe1-2","System/User/Assistant Context Separation",20,"code"),sub("p8-pe1-3","Role Prompting & Delimiter Formats",20,"code"),sub("p8-pe1-4","Dynamic Prompt Templates (Jinja/Mustache)",15,"code")], 271),
        lesson("p8-pe2", "Advanced Prompting, Reasoning & DSPy", "In-context learning strategies (Few-Shot, CoT, ReAct), and programmatic prompt optimization using DSPy signatures and teleprompters.", 90, "advanced", "available", 200, ["prompting", "reasoning", "dspy"], 10, 10, 9,
          [sub("p8-pe2-1","Zero-Shot & Few-Shot In-Context Learning",15,"code"),sub("p8-pe2-2","Chain-of-Thought (CoT) & Self-Consistency Voting",20,"code"),sub("p8-pe2-3","ReAct (Reason + Act) & Reflexion Loops",20,"code"),sub("p8-pe2-4","DSPy Programmatic Prompt Compilation",20,"code"),sub("p8-pe2-5","DSPy Signature & Teleprompter Optimizers",15,"concept")], 273),
        lesson("p8-pe3", "Structured Outputs & Tool Use", "JSON mode, Pydantic validation, function calling concepts, tool invocation patterns, prompt caching, token budget optimization, and prompt compression.", 75, "intermediate", "available", 160, ["structured-outputs"], 10, 10, 8,
          [sub("p8-pe3-1","JSON Mode & Pydantic Schema Validation",20,"code"),sub("p8-pe3-2","Function Calling & Tool Invocation Patterns",25,"code"),sub("p8-pe3-3","Prompt Caching & LLM Token Budget Optimization",20,"code"),sub("p8-pe3-4","Prompt Compression & Information-Theoretic Truncation",10,"concept")], 275),
      ],
    },
    {
      id: "p8c2", title: "Retrieval-Augmented Generation (RAG)",
      description: "Building production RAG systems from naive pipelines to advanced hybrid architectures",
      lessons: [
        lesson("p8-ra1", "RAG Foundations & Chunking", "RAG pipelines, fine-tuning vs RAG trade-offs, chunking strategies (fixed-size, semantic, recursive, parent-child, hierarchical, adaptive).", 90, "intermediate", "available", 180, ["rag"], 10, 10, 9,
          [sub("p8-ra1-1","Naive RAG Architecture Overview",20,"concept"),sub("p8-ra1-2","Fine-Tuning vs RAG Cost & Context Limits",20,"concept"),sub("p8-ra1-3","Fixed-Size & Recursive Character Chunking",20,"code"),sub("p8-ra1-4","Semantic & Parent-Child Hierarchical Chunking",30,"code")], 277),
        lesson("p8-ra2", "Retrieval, Vector Databases & pgvector", "Sparse/dense retrieval, hybrid search, cross-encoder re-ranking, vector DB internals (HNSW, IVF, PQ), and relational vector search with pgvector.", 90, "advanced", "available", 190, ["rag", "vector-db", "pgvector"], 9, 10, 8,
          [sub("p8-ra2-1","Sparse BM25 vs Dense Passage Retrieval (DPR)",20,"concept"),sub("p8-ra2-2","Hybrid Search Fusion & Cross-Encoder Re-Ranking",20,"code"),sub("p8-ra2-3","Vector DB Internals: HNSW Graphs, IVF, and Product Quantization",25,"concept"),sub("p8-ra2-4","Local vs Cloud Vector DBs (FAISS, Chroma, Pinecone, Qdrant)",15,"code"),sub("p8-ra2-5","pgvector: SQL Relational Vector Search",10,"code")], 279),
        lesson("p8-ra3", "Embeddings & RAG Evaluation", "Open-source (BGE/E5) vs closed embeddings. RAG evaluation metrics (relevancy, faithfulness, groundedness) and frameworks (Ragas, ARES, TruLens, DeepEval).", 90, "advanced", "available", 180, ["rag", "evaluation"], 9, 10, 7,
          [sub("p8-ra3-1","Embedding Models Evaluation & Domain-Specific Fine-tuning",25,"code"),sub("p8-ra3-2","Context Relevance & Answer Relevancy Metrics",20,"code"),sub("p8-ra3-3","Faithfulness & Groundedness (LLM-as-a-Judge)",25,"code"),sub("p8-ra3-4","Automated Evaluations with Ragas & DeepEval Platforms",20,"code")], 281),
        lesson("p8-ra4", "Advanced RAG, LlamaIndex Workflows & Multimodal RAG", "Multi-hop RAG, GraphRAG, Agentic RAG (Self-RAG, CRAG), LlamaIndex Workflows, LlamaParse layout extraction, and multimodal pipelines.", 120, "advanced", "available", 240, ["rag", "advanced", "llamaindex"], 10, 10, 9,
          [sub("p8-ra4-1","Multi-hop RAG & GraphRAG Architectures",20,"concept"),sub("p8-ra4-2","LlamaIndex Workflows for Custom Orchestration",25,"code"),sub("p8-ra4-3","Self-RAG & Corrective RAG (CRAG) Adaptive Triggers",20,"concept"),sub("p8-ra4-4","LlamaParse Layout-Aware PDF Ingestion",25,"code"),sub("p8-ra4-5","Multimodal RAG Pipelines (Image, Audio, Video)",30,"code")], 283),
      ],
    },
    {
      id: "p8c3", title: "AI Agents & Agentic Systems",
      description: "Stateful agent frameworks, multi-agent collaboration, and integration protocols",
      lessons: [
        lesson("p8-ag1", "Agent Fundamentals & Architectures", "Tool calling, planning, episodic & semantic memory, reflection loops (ReAct/Reflexion), and local developer serving (Ollama, LM Studio).", 90, "advanced", "available", 200, ["agents"], 10, 10, 8,
          [sub("p8-ag1-1","Agent Loop: Planning, Memory, Action",20,"concept"),sub("p8-ag1-2","Episodic vs Semantic Memory Management",20,"code"),sub("p8-ag1-3","Local Inference Serving with Ollama & LM Studio",25,"code"),sub("p8-ag1-4","Tool Calling Protocols & Execution Loops",25,"code")], 285),
        lesson("p8-ag2", "Stateful Agents with LangGraph", "LangChain chains, LangGraph stateful graphs, agents, state machines, supervisor pattern.", 90, "advanced", "available", 190, ["langchain", "langgraph"], 9, 9, 7,
          [sub("p8-ag2-1","LangChain: Chains & LCEL",25,"code"),sub("p8-ag2-2","LangGraph: State Graphs & Nodes",25,"code"),sub("p8-ag2-3","Stateful Agents with Memory",20,"code"),sub("p8-ag2-4","Supervisor Agent Coordination Pattern",20,"code")], 287),
        lesson("p8-ag3", "Multi-Agent Frameworks", "CrewAI roles/tasks, AutoGen conversational agents, Swarm agents, debate frameworks, hierarchical agent systems.", 90, "expert", "available", 220, ["multi-agent", "crewai"], 9, 9, 7,
          [sub("p8-ag3-1","CrewAI: Task Assignments & Role Definitions",25,"code"),sub("p8-ag3-2","AutoGen: Conversational Agents & Channel Routing",25,"code"),sub("p8-ag3-3","Hierarchical Multi-Agent Systems & Debates",20,"code"),sub("p8-ag3-4","Swarm-based Autonomous Agent Networks",20,"concept")], 289),
        lesson("p8-ag4", "Modern Agent Protocols & Frameworks", "Model Context Protocol (MCP) servers, Agent-to-Agent (A2A) protocol, Semantic Kernel, and PydanticAI schemas.", 75, "expert", "available", 200, ["mcp", "a2a"], 10, 10, 7,
          [sub("p8-ag4-1","MCP Server Architectures & Connectors",25,"concept"),sub("p8-ag4-2","Building Custom MCP Servers",25,"code"),sub("p8-ag4-3","Agent-to-Agent (A2A) Interoperability Protocols",20,"concept"),sub("p8-ag4-4","Semantic Kernel & PydanticAI Agent Definitions",20,"code")], 291),
      ],
    },
    {
      id: "p8c4", title: "Fine-Tuning & Alignment",
      description: "Customizing model behaviors with supervised fine-tuning, parameter efficiency, and alignment",
      lessons: [
        lesson("p8-ft1", "Supervised Fine-Tuning (SFT) & Domain Adaptation", "SFT data curation, task-specific fine-tuning, full parameter fine-tuning, catastrophic forgetting, training recipes.", 120, "advanced", "available", 240, ["sft", "fine-tuning"], 9, 9, 8,
          [sub("p8-ft1-1","SFT Dataset Formatting & Quality Curation",25,"code"),sub("p8-ft1-2","Full Parameter Fine-Tuning vs Task-Specific Adapters",25,"concept"),sub("p8-ft1-3","Domain Adaptation Techniques & Evaluation",20,"code"),sub("p8-ft1-4","Mitigating Catastrophic Forgetting Risks",20,"concept")], 293),
        lesson("p8-ft2", "Parameter-Efficient Fine-Tuning (PEFT) & Unsloth", "LoRA math, QLoRA 4-bit NF4 double quantization, AdaLoRA, and acceleration utilizing Unsloth, Axolotl configuration, and TorchTune comparison.", 120, "advanced", "available", 240, ["peft", "lora", "unsloth"], 9, 9, 8,
          [sub("p8-ft2-1","LoRA: Low-Rank Matrix Update Mathematics",20,"concept"),sub("p8-ft2-2","QLoRA & Unsloth 4-bit Quantization Acceleration",25,"code"),sub("p8-ft2-3","Axolotl Multi-GPU Fine-Tuning Configurations",25,"code"),sub("p8-ft2-4","AdaLoRA & Prefix/Prompt/P-Tuning Comparison",25,"concept"),sub("p8-ft2-5","TorchTune & Adapter Integration in PEFT",25,"code")], 295),
        lesson("p8-ft3", "Preference Alignment & Optimization", "RLHF (PPO with reward model), DPO (Direct Preference Optimization), IPO, KTO, RLAIF (AI feedback), Constitutional AI, safety alignment.", 120, "expert", "available", 240, ["alignment", "dpo"], 8, 8, 7,
          [sub("p8-ft3-1","RLHF Pipeline: PPO & Reward Model Training",25,"concept"),sub("p8-ft3-2","DPO: Direct Preference Optimization Math & Implementation",30,"code"),sub("p8-ft3-3","IPO, KTO & RLAIF Preference Variants",20,"concept"),sub("p8-ft3-4","Constitutional AI (Anthropic) Safety Protocols",25,"concept")], 297),
        lesson("p8-ft4", "Inference & Optimization Engines", "vLLM (Paged Attention, continuous batching), speculative decoding, SGLang, TensorRT-LLM, KV Cache/Prompt caching.", 90, "expert", "available", 200, ["inference", "vllm"], 10, 10, 7,
          [sub("p8-ft4-1","Paged Attention & vLLM Memory Layout",25,"code"),sub("p8-ft4-2","Continuous Batching & Speculative Decoding",25,"code"),sub("p8-ft4-3","TensorRT-LLM for Enterprise Serving",20,"concept"),sub("p8-ft4-4","SGLang & Prompt/KV Caching optimization",20,"code")], 299),
      ],
    },
    {
      id: "p8c5", title: "LLM Evaluation & Safety",
      description: "Measuring accuracy, toxicity, safety, and guardrailed interactions",
      lessons: [
        lesson("p8-sf1", "LLM Evaluation, Benchmarks & G-Eval", "Intrinsic/extrinsic metrics, evaluation harnesses (promptfoo, DeepEval, TruLens), G-Eval (LLM-as-a-judge metric design), MMLU, Chatbot Arena, and SWE-bench for coding agents.", 90, "advanced", "available", 180, ["evaluation", "benchmarks", "g-eval"], 10, 10, 7,
          [sub("p8-sf1-1","Perplexity, BLEU, ROUGE & BERTScore Metrics",20,"code"),sub("p8-sf1-2","G-Eval: Custom Metric Formulation with LLM-as-a-Judge",25,"code"),sub("p8-sf1-3","Evaluation Harnesses: Promptfoo, DeepEval, and TruLens",25,"code"),sub("p8-sf1-4","Benchmarks: MMLU, MT-Bench, Chatbot Arena, and SWE-bench",20,"concept")], 301),
        lesson("p8-sf2", "Safety Engineering, Guardrails & Lakera Guard", "Prompt injection, jailbreaks, Lakera Guard, Llama Guard, NeMo Guardrails, Guardrails AI, red-teaming, and PII protections.", 90, "advanced", "available", 180, ["safety", "guardrails", "lakera"], 10, 10, 7,
          [sub("p8-sf2-1","Threat Model: Prompt Injection & Jailbreak Attacks",20,"concept"),sub("p8-sf2-2","Lakera Guard: Real-time Injection Protection",25,"code"),sub("p8-sf2-3","Llama Guard, NeMo Guardrails & Guardrails AI Setup",25,"code"),sub("p8-sf2-4","Red Teaming, Model Auditing & PII Protections",20,"concept")], 303),
      ],
    },
    {
      id: "p8c6", title: "Azure & Enterprise LLM Engineering",
      description: "Azure OpenAI, AI Foundry, Prompt Flow, Azure AI Search, and Enterprise Copilot architectures",
      lessons: [
        lesson("p8-az1", "Azure OpenAI & Azure AI Foundry", "Enterprise deployments, system prompts, content filters, safety systems, Prompt Flow orchestration.", 90, "advanced", "available", 190, ["azure", "azure-openai"], 9, 9, 6,
          [sub("p8-az1-1","Azure OpenAI Service & Private Model Deployments",25,"code"),sub("p8-az1-2","Azure AI Content Filters & Safety Controls",25,"code"),sub("p8-az1-3","Azure AI Foundry Workspaces & Projects",20,"concept"),sub("p8-az1-4","Prompt Flow: Designing & Authoring LLM DAGs",20,"code")], 305),
        lesson("p8-az2", "Azure AI Search for RAG", "Vector search, hybrid search, semantic ranking, and building secure enterprise RAG pipelines with Azure AI Search.", 90, "advanced", "available", 190, ["azure", "rag"], 9, 10, 7,
          [sub("p8-az2-1","Azure AI Search Vector Index Configuration",25,"code"),sub("p8-az2-2","Hybrid Search & Semantic Ranker tuning",25,"code"),sub("p8-az2-3","Document Crackers & Data Source Syncs",20,"code"),sub("p8-az2-4","Secure Enterprise RAG Pipeline Architecture",20,"code")], 307),
        lesson("p8-az3", "Enterprise Architectures, APIM & Gateways", "Copilot routing, data isolation, AKS deployment, Azure APIM gateway, LiteLLM proxy, Portkey control plane, Azure Monitor, and token budget cost controls.", 90, "expert", "available", 200, ["azure", "architecture", "gateways"], 10, 9, 6,
          [sub("p8-az3-1","Copilot Routing & Orchestration Patterns",20,"concept"),sub("p8-az3-2","Data Isolation & Compliance",15,"concept"),sub("p8-az3-3","LiteLLM Proxy & Portkey Control Planes",25,"code"),sub("p8-az3-4","APIM Gateways & Deployment Patterns (AKS, ACA)",20,"code"),sub("p8-az3-5","APM, Azure Monitor & Token Cost Budgets",15,"code")], 309),
      ],
    },
  ],
};

// ============================================================
// PHASE 9 — MLOPS & PRODUCTION (Days 311–335)
// ============================================================
const phase9: RoadmapPhase = {
  id: "p9", phase: 10,
  title: "MLOps & Production AI",
  subtitle: "Shipping AI that stays alive",
  description: "Experiment tracking, CI/CD for ML, model serving, monitoring, data drift, A/B testing, cost optimization, Kubernetes for AI.",
  color: "#F97316", icon: "Workflow",
  estimatedHours: 140, dayRange: [311, 335],
  milestone: "MLOps Engineer",
  milestoneXp: 4000,
  chapters: [
    {
      id: "p9c1", title: "Experiment Tracking & Versioning",
      description: "MLflow, W&B, DVC — reproducible ML experiments",
      lessons: [
        lesson("p9-ml1", "MLflow & Weights & Biases", "Experiment tracking, model registry, artifact logging, hyperparameter sweeps.", 90, "intermediate", "available", 180, ["mlflow", "wandb"], 9, 10, 6,
          [sub("p9-ml1-1","MLflow Tracking Server",25,"code"),sub("p9-ml1-2","Model Registry & Staging",20,"code"),sub("p9-ml1-3","W&B Sweeps & Hyperopt",25,"code"),sub("p9-ml1-4","Comparing Experiment Runs",20,"code")], 311),
        lesson("p9-ml2", "Data Versioning, DVC & Feature Stores", "DVC data pipelines, lineage tracking, and enterprise Feature Stores using Feast and Hopsworks.", 90, "intermediate", "available", 170, ["dvc", "data-versioning", "feature-store"], 8, 8, 5,
          [sub("p9-ml2-1","DVC Setup & Remote Storage Integration",20,"code"),sub("p9-ml2-2","DVC Pipelines & Data Lineage Tracking",20,"code"),sub("p9-ml2-3","Feast Feature Store for Real-time Serving",25,"code"),sub("p9-ml2-4","Hopsworks Feature Store & Model Registry Schema",25,"code")], 314),
      ],
    },
    {
      id: "p9c2", title: "Model Serving & APIs",
      description: "FastAPI, BentoML, Triton — serving models at scale",
      lessons: [
        lesson("p9-sv1", "Model Serving with FastAPI", "REST API design, Pydantic, async serving, batching, OpenAPI docs, load testing.", 90, "intermediate", "available", 180, ["fastapi", "serving"], 10, 10, 7,
          [sub("p9-sv1-1","FastAPI + Pydantic Model Server",25,"code"),sub("p9-sv1-2","Async Request Batching",25,"code"),sub("p9-sv1-3","Docker + FastAPI Deployment",20,"code"),sub("p9-sv1-4","Load Testing with Locust",20,"code")], 316),
        lesson("p9-sv2", "BentoML & Triton Inference Server", "BentoML packaging, Triton ensemble models, ONNX, TorchScript for production.", 90, "advanced", "available", 180, ["bentoml", "triton"], 8, 9, 5,
          [sub("p9-sv2-1","BentoML Service Definition",25,"code"),sub("p9-sv2-2","ONNX Export & Optimization",20,"code"),sub("p9-sv2-3","Triton Model Repository",25,"code"),sub("p9-sv2-4","Ensemble Pipelines in Triton",20,"code")], 319),
        lesson("p9-sv3", "Production Serving, Retraining & Gateways", "Canary, shadow, and blue/green deployments, automated model retraining, and model gateway routing (LiteLLM, Portkey).", 90, "advanced", "available", 180, ["serving", "deployment-strategies", "gateways"], 10, 10, 8,
          [sub("p9-sv3-1","Canary Deployments & Traffic Splitting",20,"concept"),sub("p9-sv3-2","Blue/Green Deployments & Rollback Mechanisms",20,"concept"),sub("p9-sv3-3","Shadow Deployments & Dark Launching",20,"code"),sub("p9-sv3-4","LiteLLM Proxy & Portkey AI Control Plane Routing",25,"code"),sub("p9-sv3-5","Automated Model Retraining Pipelines",15,"code")], 320),
      ],
    },
    {
      id: "p9c3", title: "Monitoring & Observability",
      description: "Data drift, model decay, LLM observability — keeping models healthy in production",
      lessons: [
        lesson("p9-mo1", "Data & Model Drift Detection", "Statistical drift tests, Kolmogorov-Smirnov, PSI, Evidently AI, WhyLabs, Arize.", 90, "advanced", "available", 180, ["monitoring", "drift"], 10, 10, 6,
          [sub("p9-mo1-1","Data Drift Concepts",20,"concept"),sub("p9-mo1-2","Statistical Tests (KS, PSI)",25,"code"),sub("p9-mo1-3","Evidently AI Dashboard",25,"code"),sub("p9-mo1-4","Alerting & Retraining Triggers",20,"concept")], 322),
        lesson("p9-mo2", "LLM Observability, Langtrace & Phoenix", "LLM application tracing, cost tracking, and observability using LangSmith, Langfuse, Langtrace, and Arize Phoenix.", 90, "advanced", "available", 180, ["llm-observability", "langsmith", "phoenix"], 10, 10, 7,
          [sub("p9-mo2-1","LangSmith & Langfuse Trace Collection",20,"code"),sub("p9-mo2-2","Langtrace Open-Telemetry Integration",20,"code"),sub("p9-mo2-3","Arize Phoenix & Evals Dashboard",25,"code"),sub("p9-mo2-4","Token Cost, Rate Limits & Latency Optimization",25,"concept")], 325),
      ],
    },
    {
      id: "p9c4", title: "Infrastructure & Kubernetes",
      description: "Kubernetes, Helm, cloud AI platforms — production-grade deployment",
      lessons: [
        lesson("p9-k8s1", "Kubernetes for ML", "Pods, deployments, services, ingress, HPA, resource requests, GPU scheduling, Helm charts.", 120, "advanced", "available", 220, ["kubernetes", "k8s"], 9, 9, 6,
          [sub("p9-k8s1-1","K8s Concepts: Pods & Deployments",25,"concept"),sub("p9-k8s1-2","Services & Ingress",20,"code"),sub("p9-k8s1-3","GPU Scheduling in K8s",25,"code"),sub("p9-k8s1-4","HPA & Autoscaling",25,"code"),sub("p9-k8s1-5","Helm Charts for ML",25,"code")], 328),
        lesson("p9-cl1", "Cloud AI Platforms", "AWS SageMaker, GCP Vertex AI, Azure ML — managed ML pipelines, endpoints, pipelines.", 90, "intermediate", "available", 170, ["cloud", "sagemaker", "vertex-ai"], 8, 9, 5,
          [sub("p9-cl1-1","SageMaker Training & Endpoints",25,"code"),sub("p9-cl1-2","Vertex AI Pipelines",25,"code"),sub("p9-cl1-3","Azure ML Workspaces",20,"code"),sub("p9-cl1-4","Cost Optimization Strategies",20,"concept")], 332),
        lesson("p9-cl2", "Azure Machine Learning Platform in Depth", "Enterprise MLOps on Azure: Workspaces, Compute Clusters, Datastores, SDK v2, Managed Endpoints, and Azure Monitor.", 90, "advanced", "available", 180, ["azure", "azure-ml", "mlops"], 10, 10, 9,
          [sub("p9-cl2-1","Azure ML Workspaces & Datastores",20,"concept"),sub("p9-cl2-2","Compute Clusters & Environment Setup (SDK v2)",25,"code"),sub("p9-cl2-3","AutoML & HyperDrive (Hyperparameter Tuning)",20,"code"),sub("p9-cl2-4","Managed Online & Batch Endpoints",25,"code"),sub("p9-cl2-5","AKS/ACA Integration & Azure Monitor",15,"code")], 335),
      ],
    },
  ],
};

// ============================================================
// PHASE 10 — AI ARCHITECTURE & SYSTEM DESIGN (Days 336–355)
// ============================================================
const phase10: RoadmapPhase = {
  id: "p10", phase: 11,
  title: "AI Architecture & System Design",
  subtitle: "Designing production AI systems at scale",
  description: "Distributed training, inference at scale, AI gateways, responsible AI, governance, security, scalability patterns, and enterprise AI architecture.",
  color: "#EC4899", icon: "Network",
  estimatedHours: 120, dayRange: [336, 355],
  milestone: "AI Architect",
  milestoneXp: 5000,
  chapters: [
    {
      id: "p10c1", title: "Distributed Training & Compute Clusters",
      description: "Training large models across many GPUs, nodes, and heterogeneous hardware",
      lessons: [
        lesson("p10-dt1", "Distributed Training Strategies & Low-Precision Recipes", "Data parallelism, model parallelism, tensor/pipeline parallelism, FSDP, Megatron-LM, DeepSpeed, and FP4/MXFP4 training recipes.", 120, "expert", "available", 240, ["distributed-training", "deepspeed"], 9, 9, 6,
          [sub("p10-dt1-1","Data vs Model vs Pipeline Parallelism",20,"concept"),sub("p10-dt1-2","FSDP & DeepSpeed ZeRO memory optimization",25,"code"),sub("p10-dt1-3","Megatron-LM & Tensor Parallelism",25,"concept"),sub("p10-dt1-4","FP4 (MXFP4) Low-Precision Training Recipes",25,"code"),sub("p10-dt1-5","Distributed Reinforcement Learning (RL) rollouts",25,"code")], 336),
        lesson("p10-dt2", "GPU Infrastructure & Communication Optimization", "NVIDIA GPU memory hierarchy, NVLink, InfiniBand, GPU scheduling, gradient bucketing, communication overlapping, and learned dynamic task scheduling.", 90, "expert", "available", 200, ["gpu", "cuda"], 8, 8, 5,
          [sub("p10-dt2-1","GPU Memory Hierarchy & FlashAttention",20,"concept"),sub("p10-dt2-2","NVLink, InfiniBand & NCCL communication primitives",20,"concept"),sub("p10-dt2-3","CUDA Profiling & Kernel Optimization with nsight",25,"code"),sub("p10-dt2-4","Gradient Bucketing & Overlapping Communication",20,"code"),sub("p10-dt2-5","Dynamic task scheduling on heterogeneous clusters",15,"code")], 340),
      ],
    },
    {
      id: "p10c2", title: "Inference Architecture & Scaling Budgets",
      description: "High-throughput, low-latency inference systems and reasoning-time compute budgets",
      lessons: [
        lesson("p10-ia1", "AI Gateway Patterns & Semantic Caching", "Routing, load balancing, fallbacks, caching, rate limiting, multi-model orchestration, and semantic caching using vector DBs.", 90, "advanced", "available", 200, ["ai-gateway", "architecture"], 10, 10, 8,
          [sub("p10-ia1-1","AI Gateway Design & Reverse Proxies",20,"concept"),sub("p10-ia1-2","Semantic Caching (Redis + Embeddings)",25,"code"),sub("p10-ia1-3","Fallback & Route Optimization",20,"code"),sub("p10-ia1-4","Rate Limiting & Cost Allocation",20,"code")], 343),
        lesson("p10-ia2", "Large-Scale Inference Systems & Scaling Budgets", "Designing systems for 1M QPS, mixed model routing, autoscaling, spot instances, and Inference-Time Compute Scaling.", 90, "expert", "available", 220, ["inference-systems", "scaling-laws"], 9, 9, 7,
          [sub("p10-ia2-1","Capacity Planning & GPU/VRAM Sizing",20,"concept"),sub("p10-ia2-2","Inference-Time Compute Scaling & Reasoning Budgets",25,"concept"),sub("p10-ia2-3","Autoscaling Inference Clusters & Spot Instances",25,"code"),sub("p10-ia2-4","Global Federated Routing & Multi-Region Deployment",20,"code")], 346),
      ],
    },
    {
      id: "p10c3", title: "Responsible AI, Security & Governance",
      description: "Ethics, fairness, privacy, security, and automated auditing",
      lessons: [
        lesson("p10-ra1", "AI Ethics & Fairness Metrics", "Bias types, fairness metrics, disparate impact, equalized odds, mitigation techniques.", 90, "intermediate", "available", 180, ["ethics", "fairness"], 9, 9, 6,
          [sub("p10-ra1-1","Bias Taxonomy",20,"concept"),sub("p10-ra1-2","Fairness Metrics",25,"code"),sub("p10-ra1-3","Disparate Impact Analysis",20,"code"),sub("p10-ra1-4","Bias Mitigation: Pre/In/Post-processing",25,"code")], 349),
        lesson("p10-ra2", "AI Security & Iterative Red-Teaming", "Adversarial attacks, data poisoning, model inversion, membership inference, and automated iterative red-teaming.", 90, "advanced", "available", 200, ["security", "red-teaming"], 10, 10, 7,
          [sub("p10-ra2-1","Adversarial Attacks (FGSM/PGD)",25,"concept"),sub("p10-ra2-2","Data Poisoning & Extraction Defenses",20,"concept"),sub("p10-ra2-3","Model Inversion & Membership Inference",20,"concept"),sub("p10-ra2-4","Automated Iterative Red-Teaming & Vulnerability Scans",25,"code")], 351),
        lesson("p10-ra3", "AI Governance Frameworks & Org Blueprints", "EU AI Act, NIST AI RMF, internal governance, model cards, datasheets, and AI-native organization design blueprints.", 75, "advanced", "available", 170, ["governance", "compliance"], 9, 8, 5,
          [sub("p10-ra3-1","EU AI Act & Compliance Guidelines",20,"concept"),sub("p10-ra3-2","NIST AI Risk Management Framework",20,"concept"),sub("p10-ra3-3","Model Cards & Datasheets",20,"code"),sub("p10-ra3-4","AI-Native Organization Blueprints & Audits",15,"concept")], 353),
      ],
    },
  ],
};

// ============================================================
// PHASE 11 — RESEARCH & CHIEF AI ARCHITECT (Days 356–365)
// ============================================================
const phase11: RoadmapPhase = {
  id: "p11", phase: 12,
  title: "Research & Chief AI Architect",
  subtitle: "The final frontier — leading AI at the highest level",
  description: "Reading and reproducing research papers, frontier topics (reasoning models, MoE, FMOS), and the strategic leadership skills of a Chief AI Architect.",
  color: "#F59E0B", icon: "Crown",
  estimatedHours: 80, dayRange: [356, 365],
  milestone: "Chief AI Architect 🏆",
  milestoneXp: 10000,
  chapters: [
    {
      id: "p11c1", title: "Research Skills",
      description: "How to read, implement, and contribute to AI research",
      lessons: [
        lesson("p11-rp1", "How to Read Research Papers", "3-pass method, understanding architecture diagrams, reproducing results, ArXiv workflow.", 60, "intermediate", "available", 140, ["research"], 9, 8, 5,
          [sub("p11-rp1-1","3-Pass Reading Method",20,"concept"),sub("p11-rp1-2","Understanding Architecture Diagrams",15,"concept"),sub("p11-rp1-3","ArXiv & Paper Discovery",15,"code"),sub("p11-rp1-4","Paper Summary Template",10,"concept")], 356),
        lesson("p11-rp2", "Reproducing SOTA Results", "Replicating Attention is All You Need, LoRA, DDPM — research replication discipline.", 180, "expert", "available", 320, ["research", "reproduction"], 8, 7, 5,
          [sub("p11-rp2-1","Reproduce: Attention is All You Need",45,"code"),sub("p11-rp2-2","Reproduce: LoRA Adapter",30,"code"),sub("p11-rp2-3","Reproduce: DDPM Diffusion",45,"code"),sub("p11-rp2-4","Ablation Studies",30,"code"),sub("p11-rp2-5","Writing Up Results",30,"concept")], 358),
      ],
    },
    {
      id: "p11c2", title: "Frontier AI Topics",
      description: "Reasoning models, trillion-parameter MoEs, and decentralized training paradigms",
      lessons: [
        lesson("p11-fr1", "Reasoning & Chain-of-Thought Models", "OpenAI o1/o3, DeepSeek-R1, Qwen-QwQ — inference-time compute scaling, process reward models.", 90, "expert", "available", 220, ["reasoning", "o1"], 10, 10, 8,
          [sub("p11-fr1-1","Inference-Time Compute Scaling",25,"concept"),sub("p11-fr1-2","Process Reward Models (PRM)",25,"concept"),sub("p11-fr1-3","GRPO & Group Relative Policy Opt.",20,"concept"),sub("p11-fr1-4","DeepSeek-R1 Analysis",20,"concept")], 360),
        lesson("p11-fr2", "Mixture of Experts & Decentralized Training", "Sparse MoE, token routing, load balancing, trillion-parameter scaling, and globally decentralized training (Prime Intellect).", 75, "expert", "available", 200, ["moe", "sparse", "decentralized-training"], 9, 9, 7,
          [sub("p11-fr2-1","MoE Architecture & Token Routing",25,"concept"),sub("p11-fr2-2","Mixtral & DeepSeek-V3 Analysis",25,"concept"),sub("p11-fr2-3","Globally Decentralized Training Paradigms",25,"concept")], 362),
        lesson("p11-fr3", "Agentic AI & Foundation Model OS", "Multi-agent swarms, FMOS concept, world models, embodied AI, long-horizon planning.", 75, "expert", "available", 200, ["agentic", "fmos"], 9, 8, 6,
          [sub("p11-fr3-1","Foundation Model OS (FMOS)",20,"concept"),sub("p11-fr3-2","World Models for Planning",20,"concept"),sub("p11-fr3-3","Embodied AI & Robotics",20,"concept"),sub("p11-fr3-4","Long-Horizon Agent Planning",15,"concept")], 363),
      ],
    },
    {
      id: "p11c3", title: "Chief AI Architect Leadership",
      description: "Strategy, communication, team leadership, business alignment, and ROI blueprinting",
      lessons: [
        lesson("p11-ld1", "AI Strategy & ROI Blueprinting", "Enterprise AI strategy, build vs buy, ROI blueprinting, federated model operations, and portfolio alignment.", 90, "expert", "available", 200, ["strategy", "leadership", "roi"], 10, 9, 5,
          [sub("p11-ld1-1","AI Maturity Assessment",20,"concept"),sub("p11-ld1-2","Build vs Buy vs Fine-tune Decisions",25,"concept"),sub("p11-ld1-3","AI ROI Blueprinting & Financial Value Proofs",25,"concept"),sub("p11-ld1-4","Strategic Blueprinting for Federated Model Operations",20,"concept")], 364),
        lesson("p11-ld2", "AI-Native Organizations & Talent Orchestration", "AI-native organization design, engineering OKRs, communicating with C-suite, and AI talent supply orchestration.", 75, "expert", "available", 180, ["leadership", "management", "talent"], 9, 8, 4,
          [sub("p11-ld2-1","Setting AI Team OKRs",20,"concept"),sub("p11-ld2-2","C-suite AI Presentations",20,"concept"),sub("p11-ld2-3","AI-Native Organization Design & Blueprints",20,"concept"),sub("p11-ld2-4","AI Talent Supply Orchestration & Sourcing Strategies",15,"concept")], 365),
      ],
    },
  ],
};

// ============================================================
// EXPORT
// ============================================================
export const roadmapPhases: RoadmapPhase[] = [
  phase0, phase1, phase2_stats, phase2, phase3, phase4,
  phase5, phase6, phase7, phase8, phase9,
  phase10, phase11,
];

export const allRoadmapLessons = roadmapPhases.flatMap(p =>
  p.chapters.flatMap(c => c.lessons.map(l => ({
    ...l,
    phaseId: p.id,
    phaseTitle: p.title,
    chapterId: c.id,
    chapterTitle: c.title,
    phase: p.phase,
    phaseColor: p.color,
  })))
);

export const TOTAL_LESSONS = allRoadmapLessons.length;
export const TOTAL_HOURS = roadmapPhases.reduce((s, p) => s + p.estimatedHours, 0);
export const TOTAL_PHASES = roadmapPhases.length;

// ─── Milestones (one per phase) ──────────────────────────────
export interface Milestone {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  xp: number;
  badge: string;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const milestones: Milestone[] = roadmapPhases.map(p => ({
  id: `ms-${p.id}`,
  phaseId: p.id,
  title: p.milestone,
  description: `Completed all lessons in ${p.title}`,
  xp: p.milestoneXp,
  badge: getMilestoneBadge(p.phase),
  color: p.color,
  rarity: p.phase >= 11 ? "legendary" : p.phase >= 8 ? "epic" : p.phase >= 4 ? "rare" : "common",
}));

function getMilestoneBadge(phase: number): string {
  const badges = ["🌱", "📐", "📊", "🐍", "🤖", "🗄️", "🧠", "💬", "👁️", "✨", "🚀", "🏗️", "👑"];
  return badges[phase] ?? "⭐";
}
