"use client"

import { useState } from "react"
import { Settings, User, Bell, Palette, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { MV_LANGUAGES } from "@/lib/types"

export default function SettingsPage() {
  const [name, setName] = useState("Alok Kumar")
  const [email, setEmail] = useState("alok@hungama.com")
  const [defaultLang, setDefaultLang] = useState<string>("Hindi")
  const [aiCreativity, setAiCreativity] = useState(0.7)
  const [notifications, setNotifications] = useState({
    generationComplete: true,
    projectShared: true,
    weeklyDigest: false,
  })

  const saveAll = () => {
    toast.success("Settings saved", { description: "Preferences applied globally" })
  }

  return (
    <div className="max-w-3xl mx-auto px-8 pt-8 pb-16">
      <div className="mb-6 flex items-center gap-2">
        <Settings className="h-5 w-5 text-accent" />
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Settings</h1>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-card p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <User className="h-4 w-4 text-accent" />
            Profile
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Email (Microsoft Entra)
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
                readOnly
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Managed via Hungama SSO — contact IT to change.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Default Language for New Projects
              </label>
              <select
                value={defaultLang}
                onChange={(e) => setDefaultLang(e.target.value)}
                className="w-full max-w-md rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
              >
                {MV_LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Creativity Level (AI Temperature)
              </label>
              <div className="flex items-center gap-3 max-w-md">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={aiCreativity}
                  onChange={(e) => setAiCreativity(Number(e.target.value))}
                  className="flex-1 accent-accent"
                />
                <span className="text-xs tabular-nums font-semibold w-10 text-right">
                  {aiCreativity.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Higher = more experimental concepts. Lower = safer, on-brief ideas.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Bell className="h-4 w-4 text-accent" />
            Notifications
          </h2>
          <div className="space-y-3">
            {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => {
              const labels: Record<keyof typeof notifications, string> = {
                generationComplete: "Alert me when AI generation finishes",
                projectShared: "Alert me when a project is shared with me",
                weeklyDigest: "Weekly digest email",
              }
              return (
                <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) =>
                      setNotifications({ ...notifications, [key]: e.target.checked })
                    }
                    className="h-4 w-4 accent-accent"
                  />
                  <span>{labels[key]}</span>
                </label>
              )
            })}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-md">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Palette className="h-4 w-4 text-accent" />
            Appearance
          </h2>
          <p className="text-sm text-muted-foreground">
            Theme toggle (light / dark / system) coming in Phase 6. Currently fixed to light.
          </p>
        </section>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={saveAll}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
