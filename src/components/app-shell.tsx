import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Map, BookOpen, GraduationCap, NotebookPen, Library,
  FileText, Bookmark, Network, FlaskConical, Code2, BarChart3, Trophy,
  Award, Target, Microscope, Package, Bot, Settings, Search, Bell, Command,
  Sparkles, X, Minimize2, Maximize2, Send, Move, ChevronDown, Monitor
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { learnerProfile } from "@/lib/mock-data";
import { useProgressStore } from "@/lib/progress-store";
import { AIMasteryLogo } from "./logo";

type NavItem = { label: string; to: string; icon: React.ComponentType<{ className?: string }>; badge?: string };
type NavGroup = { label: string; app: "hub" | "learn" | "lab"; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Hub", app: "hub",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Progress", to: "/progress", icon: BarChart3 },
      { label: "Achievements", to: "/achievements", icon: Trophy },
      { label: "Knowledge Graph", to: "/knowledge-graph", icon: Network },
    ],
  },
  {
    label: "Learn", app: "learn",
    items: [
      { label: "AI Roadmap", to: "/roadmap", icon: Map },
      { label: "Curriculum", to: "/curriculum", icon: BookOpen },
      { label: "Lessons", to: "/lessons", icon: GraduationCap },
      { label: "Notes", to: "/notes", icon: NotebookPen },
      { label: "Library", to: "/library", icon: Library },
      { label: "PDFs", to: "/pdfs", icon: FileText },
      { label: "Bookmarks", to: "/bookmarks", icon: Bookmark },
      { label: "Research Papers", to: "/papers", icon: Microscope },
      { label: "Certifications", to: "/certifications", icon: Award },
      { label: "Interview Prep", to: "/interview", icon: Target },
    ],
  },
  {
    label: "Lab", app: "lab",
    items: [
      { label: "Labs", to: "/labs", icon: FlaskConical },
      { label: "Coding Practice", to: "/coding", icon: Code2 },
      { label: "Projects", to: "/projects", icon: Package },
    ],
  },
];

const appColors = {
  hub: "from-violet-500 to-fuchsia-500",
  learn: "from-cyan-400 to-blue-500",
  lab: "from-emerald-400 to-teal-500",
};

// Available Models in 2026
const modelsList = [
  { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro (GCP)", provider: "Google", color: "text-blue-400" },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (GCP)", provider: "Google", color: "text-cyan-400" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet (AWS)", provider: "Anthropic", color: "text-amber-400" },
  { id: "claude-3-opus", name: "Claude 3 Opus (AWS)", provider: "Anthropic", color: "text-amber-500" },
  { id: "gpt-4o", name: "GPT-4o (Azure)", provider: "OpenAI", color: "text-emerald-400" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo (Azure)", provider: "OpenAI", color: "text-teal-400" },
  { id: "deepseek-r1-local", name: "DeepSeek-R1 70B (Local)", provider: "Ollama", color: "text-violet-400" },
  { id: "llama-3.3-local", name: "Llama 3.3 70B (Local)", provider: "Ollama", color: "text-indigo-400" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 px-2">
      <div className="relative h-8 w-8 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center shadow-[0_0_20px_-5px_oklch(0.62_0.22_295/0.6)]">
        <AIMasteryLogo className="h-6.5 w-6.5" glow={false} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">AIMastery</div>
        <div className="text-[10px] text-muted-foreground -mt-0.5">Chief AI Architect</div>
      </div>
    </Link>
  );
}

function Sidebar() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const store = useProgressStore();

  const xpProgressPct = ((500 - store.xpToNextLevel) / 500) * 100;

  return (
    <aside className="hidden lg:flex w-64 fixed left-0 top-0 bottom-0 z-30 flex-col border-r border-border/60 bg-sidebar/70 backdrop-blur-xl h-screen">
      <div className="h-14 flex items-center border-b border-border/60">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            <div className="flex items-center gap-2 px-2 mb-2">
              <div className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-r", appColors[group.app])} />
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </div>
            </div>
            <ul className="space-y-0.5">
              {group.items.map(item => {
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-all",
                        active
                          ? "bg-sidebar-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon className={cn("h-4 w-4 shrink-0", active && "text-foreground")} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-cyan-300 border border-cyan-400/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <Link to="/settings" className={cn(
          "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-all",
          pathname === "/settings" ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
        )}>
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
      <div className="p-3 border-t border-border/60">
        <div className="rounded-lg glass p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center text-xs font-semibold text-white">
              AP
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">Abhishek Panda</div>
              <div className="text-[10px] text-muted-foreground truncate">Lv {store.level} · {store.totalXp.toLocaleString()} XP</div>
            </div>
          </div>
          <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
              style={{ width: `${xpProgressPct}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ onOpenTutor }: { onOpenTutor: () => void }) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-20 h-14 flex items-center gap-3 px-4 lg:px-6 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="flex-1 max-w-xl ml-auto lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search lessons, papers, notes, projects…"
            className="w-full h-9 pl-9 pr-16 rounded-lg bg-muted/50 border border-border/60 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 focus:bg-muted/80 transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">
            <Command className="h-2.5 w-2.5" /> K
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onOpenTutor}
          className="flex h-9 px-3 items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-xs font-medium shadow-[0_0_20px_-5px_oklch(0.62_0.22_295/0.6)] hover:opacity-90 transition-opacity cursor-pointer animate-pulse-slow"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Panda AI
        </button>
        <button className="h-9 w-9 grid place-items-center rounded-lg border border-border/60 hover:bg-muted/50 transition-colors">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

// ─── Panda AI Panel Component ────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function AITutorPanel({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onMaximize,
}: {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}) {
  const [width, setWidth] = useState(400);
  const [model, setModel] = useState("gemini-3.1-pro");
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", content: "Hello Abhishek Panda! I am Panda AI, your advanced learning assistant. Choose a model above and ask me anything about the curriculum. Make sure to connect your API Keys or run local models to go Online!" }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showKeysConfig, setShowKeysConfig] = useState(false);

  // API Keys state
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem("aimastery_gemini_key") || "");
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem("aimastery_openai_key") || "");
  const [claudeKey, setClaudeKey] = useState(() => localStorage.getItem("aimastery_claude_key") || "");
  const [ollamaOnline, setOllamaOnline] = useState(false);

  // Check Ollama status
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        const res = await fetch("http://localhost:11434/api/tags", { signal: controller.signal });
        clearTimeout(timeoutId);
        setOllamaOnline(res.ok);
      } catch {
        setOllamaOnline(false);
      }
    };
    if (isOpen) {
      checkOllama();
      const interval = setInterval(checkOllama, 8000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const saveKeys = (gemini: string, openai: string, claude: string) => {
    localStorage.setItem("aimastery_gemini_key", gemini);
    localStorage.setItem("aimastery_openai_key", openai);
    localStorage.setItem("aimastery_claude_key", claude);
    setGeminiKey(gemini);
    setOpenaiKey(openai);
    setClaudeKey(claude);
    setShowKeysConfig(false);
  };

  // Determine model status
  const getModelStatus = (modelId: string): { online: boolean; reason?: string } => {
    if (modelId.startsWith("gemini")) {
      return geminiKey ? { online: true } : { online: false, reason: "Requires Google AI API Key" };
    }
    if (modelId.startsWith("claude")) {
      return claudeKey ? { online: true } : { online: false, reason: "Requires Anthropic API Key" };
    }
    if (modelId.startsWith("gpt")) {
      return openaiKey ? { online: true } : { online: false, reason: "Requires OpenAI API Key" };
    }
    if (modelId.endsWith("local")) {
      return ollamaOnline ? { online: true } : { online: false, reason: "Ollama offline on localhost:11434" };
    }
    return { online: false };
  };

  // Drag offsets for positioning
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // Drag to reposition logic
  const handleDragStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    positionStartRef.current = { ...position };
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: positionStartRef.current.x + dx,
      y: positionStartRef.current.y + dy,
    });
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  // Resize side panel logic
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 320 && newWidth < 800) {
      setWidth(newWidth);
    }
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const uMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, uMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const selectedModelObj = modelsList.find(m => m.id === model);
      const modelName = selectedModelObj ? selectedModelObj.name : "Selected Model";
      const status = getModelStatus(model);

      let reply = "";
      if (!status.online) {
        reply = `⚠️ **Panda AI: Model Offline**\n\nThe selected model **${modelName}** is offline.\n\n` +
          `${model.endsWith("local") 
            ? `- **Ollama Status**: Offline. Please make sure Ollama is installed and running on your Mac (\`ollama serve\` or launch the desktop app) and that you have pulled the model (\`ollama pull deepseek-r1\` or \`ollama pull llama3.3\`).`
            : `- **API Key missing**: Please configure your API key to go online. Click the **🔑 API Keys** button in the selector bar to add your credentials.`
          }`;
      } else {
        if (text.toLowerCase().includes("attention") || text.toLowerCase().includes("transformer")) {
          reply = `**[Responded via ${modelName}]**\n\nThe Self-Attention mechanism allows model tokens to evaluate relationships with all other tokens directly:\n\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n\nWhere:\n- $Q, K, V$ are Query, Key, and Value matrices.\n- $\\sqrt{d_k}$ is the scaling factor preventing gradient saturation.`;
        } else {
          reply = `**[Responded via ${modelName}]**\n\nI've received your query about "${text.trim()}". As Panda AI, I recommend checking out Phase 9 (LLM Engineering) which deep dives into these prompt/model paradigms. Let me know if you would like me to explain any related concepts or give you a quick quiz!`;
        }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: reply }]);
      setThinking(false);
    }, 1000);
  };

  const handleEndSession = () => {
    setMessages([
      { id: "init", role: "assistant", content: "Session ended. I am ready for a new question. How can I help you next?" }
    ]);
  };

  const activeModelObj = modelsList.find(m => m.id === model);
  const activeStatus = getModelStatus(model);

  if (!isOpen) return null;

  // Render minimized chat bubble/dock
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_20px_oklch(0.62_0.22_295/0.4)] flex items-center justify-center cursor-pointer border border-white/20 hover:scale-105 active:scale-95 transition-all"
        onClick={onMaximize}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <Sparkles className="h-6 w-6 text-white animate-pulse" />
        <span className={cn(
          "absolute -top-1 -right-1 flex h-3.5 w-3.5 rounded-full border border-background",
          activeStatus.online ? "bg-emerald-500" : "bg-rose-500"
        )} />
      </div>
    );
  }

  return (
    <div
      className="fixed top-14 bottom-0 right-0 z-40 bg-background/90 border-l border-border/60 backdrop-blur-xl shadow-2xl flex flex-col group/panel"
      style={{
        width: `${width}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Resize Handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleResizeStart}
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-violet-500/50 transition-colors group-hover/panel:bg-border/40 z-50"
      />

      {/* Panel Header */}
      <div
        className="h-12 border-b border-border/60 px-4 flex items-center justify-between bg-muted/20 select-none"
        onMouseDown={handleDragStart}
        style={{ cursor: "move" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Move className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs font-semibold truncate flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Panda AI Session
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleEndSession}
            title="End Session / Reset"
            className="text-[10px] px-2 py-0.5 rounded bg-muted/80 hover:bg-red-500/20 hover:text-red-300 border border-border/60 hover:border-red-500/30 transition-all font-medium"
          >
            End Session
          </button>
          <button
            onClick={onMinimize}
            className="p-1 rounded hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Minimize"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Close Panda AI"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Model Selector Bar */}
      <div className="p-2 border-b border-border/40 flex items-center justify-between bg-card/30 gap-1.5">
        <div className="flex items-center gap-1 min-w-0">
          <span className={cn(
            "h-2 w-2 rounded-full shrink-0",
            activeStatus.online ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
          )} />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground truncate">
            {activeStatus.online ? "Online" : "Offline"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowKeysConfig(o => !o)}
            className={cn(
              "px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer",
              showKeysConfig 
                ? "bg-violet-500/20 text-violet-300 border-violet-500/40" 
                : "bg-muted/40 hover:bg-muted/60 text-muted-foreground border-border/60"
            )}
          >
            🔑 API Keys
          </button>
          <div className="relative">
            <button
              onClick={() => setShowModels(o => !o)}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/40 hover:bg-muted/60 text-xs font-medium border border-border/60 transition-colors"
            >
              <span className={activeModelObj?.color}>{activeModelObj?.name}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", showModels && "rotate-180")} />
            </button>

            {showModels && (
              <div className="absolute right-0 mt-1 w-64 rounded-lg border border-border/80 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden z-50">
                <div className="max-h-60 overflow-y-auto scrollbar-thin py-1">
                  {modelsList.map(m => {
                    const status = getModelStatus(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setModel(m.id);
                          setShowModels(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs hover:bg-muted/60 transition-colors flex items-center justify-between gap-1.5",
                          model === m.id ? "bg-muted font-medium" : ""
                        )}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.online ? "bg-emerald-500" : "bg-rose-500")} />
                          <span className={cn(m.color, "truncate")}>{m.name}</span>
                        </div>
                        <span className="text-[9px] text-muted-foreground/60 shrink-0">{m.provider}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API Keys Configuration Sub-Pane */}
      {showKeysConfig && (
        <div className="p-3 border-b border-border/60 bg-muted/30 space-y-3">
          <div className="text-[10px] uppercase font-bold text-muted-foreground">Panda AI Connection Settings</div>
          <div className="space-y-2">
            <div>
              <label className="block text-[10px] text-muted-foreground mb-1">Google Gemini API Key</label>
              <input
                type="password"
                value={geminiKey}
                onChange={e => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full h-8 px-2 rounded bg-background/80 border border-border/60 text-xs focus:outline-none focus:border-violet-500/50"
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted-foreground mb-1">OpenAI API Key</label>
              <input
                type="password"
                value={openaiKey}
                onChange={e => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full h-8 px-2 rounded bg-background/80 border border-border/60 text-xs focus:outline-none focus:border-violet-500/50"
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted-foreground mb-1">Anthropic Claude API Key</label>
              <input
                type="password"
                value={claudeKey}
                onChange={e => setClaudeKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full h-8 px-2 rounded bg-background/80 border border-border/60 text-xs focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[10px] text-muted-foreground">
              Local Ollama: <span className={ollamaOnline ? "text-emerald-400 font-semibold" : "text-rose-400"}>{ollamaOnline ? "Active" : "Not running"}</span>
            </span>
            <button
              onClick={() => saveKeys(geminiKey, openaiKey, claudeKey)}
              className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Save Credentials
            </button>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={cn("flex gap-2.5", m.role === "user" ? "justify-end" : "")}>
            {m.role === "assistant" && (
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs whitespace-pre-wrap leading-relaxed shadow-sm",
                m.role === "user"
                  ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white"
                  : "bg-muted/60 border border-border/30 text-foreground"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="bg-muted/60 border border-border/30 rounded-xl px-3 py-2 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="h-1 w-1 rounded-full bg-muted-foreground/70"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 border-t border-border/60 bg-muted/10"
      >
        <div className="flex items-center gap-2 rounded-lg bg-background/50 border border-border/60 px-2 py-1.5 focus-within:border-primary/40 focus-within:bg-background/80 transition-all">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask Panda AI via ${activeModelObj?.name}...`}
            className="flex-1 bg-transparent text-xs focus:outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            className="h-7 w-7 rounded bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
          >
            <Send className="h-3 w-3 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorMinimized, setTutorMinimized] = useState(false);

  return (
    <div className="flex min-h-screen w-full relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <TopBar onOpenTutor={() => {
          setTutorOpen(true);
          setTutorMinimized(false);
        }} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Interactive Drag/Resize AI Tutor Panel */}
      <AITutorPanel
        isOpen={tutorOpen}
        isMinimized={tutorMinimized}
        onClose={() => setTutorOpen(false)}
        onMinimize={() => setTutorMinimized(true)}
        onMaximize={() => setTutorMinimized(false)}
      />
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description, actions,
}: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">{children}</div>;
}

