import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { motion } from "framer-motion";

export const Route = createFileRoute("/knowledge-graph")({
  head: () => ({ meta: [{ title: "Knowledge Graph · AIMastery" }] }),
  component: KnowledgeGraphPage,
});

const nodes = [
  { id: "math", label: "Math", x: 50, y: 50, size: 26, color: "#A78BFA" },
  { id: "python", label: "Python", x: 20, y: 25, size: 22, color: "#34D399" },
  { id: "ml", label: "ML", x: 70, y: 30, size: 28, color: "#FB7185" },
  { id: "dl", label: "Deep Learning", x: 80, y: 60, size: 30, color: "#60A5FA" },
  { id: "nlp", label: "NLP", x: 30, y: 75, size: 24, color: "#F472B6" },
  { id: "llm", label: "LLM", x: 60, y: 80, size: 32, color: "#7C3AED" },
  { id: "rag", label: "RAG", x: 85, y: 85, size: 18, color: "#22D3EE" },
  { id: "agents", label: "Agents", x: 40, y: 90, size: 20, color: "#FBBF24" },
  { id: "data", label: "Data Eng", x: 15, y: 60, size: 20, color: "#FB923C" },
];

const edges: [string, string][] = [
  ["math", "ml"], ["math", "dl"], ["python", "ml"], ["python", "data"],
  ["ml", "dl"], ["dl", "nlp"], ["nlp", "llm"], ["llm", "rag"], ["llm", "agents"],
  ["data", "ml"], ["dl", "llm"],
];

function KnowledgeGraphPage() {
  const find = (id: string) => nodes.find(n => n.id === id)!;
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Hub"
          title="Knowledge Graph"
          description="Every concept in the AI universe, connected. Click a node to explore prerequisites and successors."
        />
        <div className="rounded-2xl glass-strong p-6 h-[600px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.62_0.22_295/0.08),transparent_70%)]" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full relative">
            {edges.map(([a, b], i) => {
              const A = find(a), B = find(b);
              return (
                <motion.line
                  key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke="oklch(1 0 0 / 0.12)" strokeWidth="0.15"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.08 }}
                />
              );
            })}
            {nodes.map((n, i) => (
              <motion.g key={n.id}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                style={{ cursor: "pointer" }}
              >
                <circle cx={n.x} cy={n.y} r={n.size / 10 + 1.5} fill={n.color} opacity="0.2" />
                <circle cx={n.x} cy={n.y} r={n.size / 10} fill={n.color} />
                <text x={n.x} y={n.y + n.size / 6 + 2.5} textAnchor="middle"
                  fontSize="2" fill="oklch(0.98 0 0)" fontWeight="500">{n.label}</text>
              </motion.g>
            ))}
          </svg>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {nodes.map(n => (
            <div key={n.id} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
              <div className="h-2 w-2 rounded-full" style={{ background: n.color }} />
              {n.label}
            </div>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
