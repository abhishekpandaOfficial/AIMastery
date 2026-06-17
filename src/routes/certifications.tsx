import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { certifications } from "@/lib/mock-data";
import { Award, Crown, Lock } from "lucide-react";

export const Route = createFileRoute("/certifications")({
  head: () => ({ meta: [{ title: "Certifications · AIMastery" }] }),
  component: CertsPage,
});

function CertsPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Certifications"
          description="Earn industry-recognized credentials as you progress through the roadmap."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map(c => {
            const Icon = c.icon === "Crown" ? Crown : Award;
            return (
              <div key={c.id} className="relative rounded-xl glass p-6 gradient-border overflow-hidden">
                {c.status === "available" && (
                  <div className="absolute top-3 right-3">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
                <div
                  className="h-16 w-16 rounded-2xl grid place-items-center mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.provider}</div>
                <div className="text-base font-semibold">{c.title}</div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{c.status === "earned" ? "Earned" : "Progress"}</span>
                    <span className="font-medium">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full" style={{ width: `${c.progress}%`, background: c.color }} />
                  </div>
                </div>
                {c.status === "earned" && (
                  <div className="mt-3 text-[10px] uppercase tracking-widest text-emerald-400">✓ Verified</div>
                )}
              </div>
            );
          })}
        </div>
      </PageShell>
    </AppShell>
  );
}
