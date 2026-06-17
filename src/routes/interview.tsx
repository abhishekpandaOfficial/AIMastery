import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { interviewQuestions } from "@/lib/mock-data";
import { Bookmark, Building2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Interview Prep · AIMastery" }] }),
  component: InterviewPage,
});

const cats = ["All", "system-design", "ml-design", "llm-design", "coding", "behavioral"] as const;

function InterviewPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const filtered = cat === "All" ? interviewQuestions : interviewQuestions.filter(q => q.category === cat);
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Interview Prep"
          description="Curated ML, LLM, system design, coding, and behavioral questions from top AI companies."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Questions", value: interviewQuestions.length, icon: Target },
            { label: "Companies", value: 18, icon: Building2 },
            { label: "Bookmarked", value: interviewQuestions.filter(q => q.bookmarked).length, icon: Bookmark },
            { label: "Readiness", value: "72%", icon: Target },
          ].map(s => (
            <div key={s.label} className="rounded-xl glass p-4">
              <s.icon className="h-4 w-4 text-cyan-400 mb-2" />
              <div className="text-xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg glass mb-4 w-fit overflow-x-auto">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-colors",
                cat === c ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {c === "All" ? "All" : c.replace("-", " ")}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map(q => (
            <div key={q.id} className="rounded-xl glass p-4 flex items-start gap-3 hover:bg-muted/20 transition-colors">
              <Bookmark className={cn("h-4 w-4 shrink-0 mt-0.5", q.bookmarked ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
              <div className="flex-1">
                <div className="text-sm font-medium">{q.question}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300">{q.category}</span>
                  <span className={cn("px-1.5 py-0.5 rounded font-medium",
                    q.difficulty === "intermediate" && "bg-cyan-500/10 text-cyan-300",
                    q.difficulty === "advanced" && "bg-violet-500/10 text-violet-300",
                    q.difficulty === "expert" && "bg-rose-500/10 text-rose-300")}>
                    {q.difficulty}
                  </span>
                  <span className="text-muted-foreground">Asked at: {q.companies.join(", ")}</span>
                </div>
              </div>
              <button className="text-xs text-cyan-300 hover:text-cyan-200">Practice →</button>
            </div>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
