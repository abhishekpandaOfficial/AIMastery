import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { learnerProfile } from "@/lib/mock-data";
import { User, Bell, Palette, Keyboard, Shield, CreditCard } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · AIMastery" }] }),
  component: SettingsPage,
});

const sections = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Palette, label: "Appearance" },
  { icon: Keyboard, label: "Shortcuts" },
  { icon: Shield, label: "Privacy" },
  { icon: CreditCard, label: "Billing" },
];

function SettingsPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader eyebrow="Account" title="Settings" description="Manage your profile, preferences, and platform." />
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <nav className="space-y-0.5">
              {sections.map((s, i) => (
                <button key={s.label}
                  className={`w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                    i === 0 ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                  }`}>
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>
          <main className="col-span-12 lg:col-span-9 space-y-6">
            <div className="rounded-xl glass p-6">
              <div className="text-sm font-semibold mb-4">Profile</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center text-lg font-semibold">
                  {learnerProfile.avatar}
                </div>
                <button className="text-xs text-cyan-300 hover:text-cyan-200">Change avatar</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" value={learnerProfile.name} />
                <Field label="Role" value={learnerProfile.role} />
                <Field label="Email" value="alex@example.com" />
                <Field label="Level" value={`Level ${learnerProfile.level} · ${learnerProfile.rank}`} />
              </div>
            </div>
            <div className="rounded-xl glass p-6">
              <div className="text-sm font-semibold mb-4">Learning Goals</div>
              <Field label="Weekly hours target" value={`${learnerProfile.weeklyGoal}h`} />
              <div className="mt-4">
                <Field label="Target role" value="Chief AI Architect" />
              </div>
            </div>
          </main>
        </div>
      </PageShell>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <input defaultValue={value} className="w-full h-9 px-3 rounded-lg bg-muted/40 border border-border/60 text-sm focus:outline-none focus:border-primary/50" />
    </div>
  );
}
