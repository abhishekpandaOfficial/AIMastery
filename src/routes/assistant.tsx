import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { Send, Sparkles, BookOpen, Code2, FileQuestion, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Tutor · AIMastery" }] }),
  component: AssistantPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  { id: "1", role: "assistant", content: "Hey Alex 👋 I'm your AI tutor. Ask me to explain a concept, generate a quiz, summarize a paper, or suggest your next lesson." },
];

const quickActions = [
  { icon: Lightbulb, label: "Explain a concept", prompt: "Explain attention mechanism intuitively" },
  { icon: FileQuestion, label: "Generate quiz", prompt: "Quiz me on backpropagation" },
  { icon: BookOpen, label: "Summarize paper", prompt: "Summarize the Attention Is All You Need paper" },
  { icon: Code2, label: "Coding exercise", prompt: "Give me a PyTorch exercise on transformers" },
];

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const u: Msg = { id: Date.now().toString(), role: "user", content: text };
    setMessages(m => [...m, u]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const a: Msg = {
        id: (Date.now() + 1).toString(), role: "assistant",
        content: `Great question. Here's a structured answer:\n\n1. **Core idea** — ${text.slice(0, 60)}... is fundamentally about pattern recognition.\n2. **Why it matters** — it powers most of modern AI from search to generation.\n3. **Next step** — I recommend the lesson "Attention & Transformers" in Level 5.\n\nWant me to generate a quiz on this?`,
      };
      setMessages(m => [...m, a]);
      setThinking(false);
    }, 900);
  };

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Hub"
          title="AI Tutor"
          description="Your always-on AI mentor. Connected to every lesson, paper, and note in your library."
        />
        <div className="rounded-2xl glass-strong overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-violet-500 to-cyan-500 text-white"
                    : "bg-muted/60 text-foreground"
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            <AnimatePresence>
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted/60 rounded-2xl px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickActions.map(a => (
                <button key={a.label} onClick={() => send(a.prompt)}
                  className="flex items-center gap-2 rounded-lg glass p-3 text-xs hover:bg-muted/40 transition-colors text-left">
                  <a.icon className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="p-4 border-t border-border/60">
            <div className="flex items-center gap-2 rounded-xl glass px-3 py-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything about AI…"
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
              />
              <button type="submit"
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center hover:opacity-90">
                <Send className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </form>
        </div>
      </PageShell>
    </AppShell>
  );
}
