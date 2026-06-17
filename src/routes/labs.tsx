import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { notebooks } from "@/lib/mock-data";
import { Plus, Play, Cpu, FlaskConical, GitBranch } from "lucide-react";

export const Route = createFileRoute("/labs")({
  head: () => ({ meta: [{ title: "Labs · AIMastery" }] }),
  component: LabsPage,
});

function LabsPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Lab"
          title="Interactive Labs"
          description="Jupyter-style notebooks with GPU access. Run experiments, train models, ship projects."
          actions={
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-400 text-white text-xs font-medium">
              <Plus className="h-3.5 w-3.5" /> New Notebook
            </button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[
            { icon: FlaskConical, label: "Active Experiments", value: 4, color: "from-emerald-500 to-teal-500" },
            { icon: Cpu, label: "GPU Hours Left", value: "42h", color: "from-violet-500 to-fuchsia-500" },
            { icon: GitBranch, label: "Saved Runs", value: 87, color: "from-cyan-400 to-blue-500" },
          ].map(s => (
            <div key={s.label} className="rounded-xl glass p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${s.color} grid place-items-center`}>
                <s.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl glass overflow-hidden">
          <div className="px-5 py-3 border-b border-border/60 text-sm font-semibold">Your Notebooks</div>
          <div className="divide-y divide-border/30">
            {notebooks.map(n => (
              <div key={n.id} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 border border-emerald-400/30 grid place-items-center">
                  <FlaskConical className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.kernel} · {n.cells} cells · {n.updatedAt}</div>
                </div>
                <button className="h-8 w-8 grid place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 hover:opacity-90">
                  <Play className="h-3 w-3 text-white fill-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}
