import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { Terminal, Code2, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/coding")({
  head: () => ({ meta: [{ title: "Coding Practice · AIMastery" }] }),
  component: CodingPage,
});

const challenges = [
  { title: "Implement Self-Attention", diff: "advanced", lang: "PyTorch", solved: true, time: "45m" },
  { title: "K-Nearest Neighbors from Scratch", diff: "intermediate", lang: "NumPy", solved: true, time: "30m" },
  { title: "Build a Tokenizer (BPE)", diff: "advanced", lang: "Python", solved: false, time: "60m" },
  { title: "Gradient Descent Visualizer", diff: "intermediate", lang: "Python", solved: false, time: "40m" },
  { title: "RAG Pipeline End-to-End", diff: "expert", lang: "Python", solved: false, time: "120m" },
  { title: "Top-K Sampling Implementation", diff: "intermediate", lang: "PyTorch", solved: true, time: "25m" },
];

function CodingPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Lab"
          title="Coding Practice"
          description="Hands-on AI coding challenges, from numpy fundamentals to building entire RAG pipelines."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Mini icon={Code2} label="Challenges" value="320" />
          <Mini icon={Trophy} label="Solved" value="87" />
          <Mini icon={Zap} label="Streak" value="12d" />
          <Mini icon={Terminal} label="Languages" value="6" />
        </div>

        <div className="rounded-xl glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Challenge</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium">Stack</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map(c => (
                <tr key={c.title} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    {c.solved
                      ? <span className="text-emerald-400 text-xs">● Solved</span>
                      : <span className="text-muted-foreground text-xs">○ Open</span>}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-xs"><span className={`px-1.5 py-0.5 rounded ${
                    c.diff === "intermediate" ? "bg-cyan-500/10 text-cyan-300" :
                    c.diff === "advanced" ? "bg-violet-500/10 text-violet-300" :
                    "bg-rose-500/10 text-rose-300"
                  }`}>{c.diff}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{c.lang}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageShell>
    </AppShell>
  );
}

function Mini({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl glass p-4">
      <Icon className="h-4 w-4 text-emerald-400 mb-2" />
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
