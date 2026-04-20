"use client"

import { use, useEffect } from "react"
import { GitBranch, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import type { StoryArchitecture } from "@/lib/types"

const DEFAULT_ARCH: StoryArchitecture = {
  mode: "single",
  threadCount: 1,
  threadDescriptions: [""],
}

export default function StoryArchitecturePage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setArchitecture = useProjectStore((s) => s.setArchitecture)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.architecture

  const arch = project?.storyArchitecture ?? DEFAULT_ARCH

  // Seed architecture on first visit
  useEffect(() => {
    if (hydrated && project && !project.storyArchitecture) {
      setArchitecture(projectId, DEFAULT_ARCH)
    }
  }, [hydrated, project, projectId, setArchitecture])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const concept = project.selectedConcept

  const setMode = (mode: "single" | "multi") =>
    setArchitecture(projectId, {
      ...arch,
      mode,
      threadCount: (mode === "single" ? 1 : Math.max(2, arch.threadCount)) as 1 | 2 | 3 | 4,
    })

  const updateThreadCount = (n: number) => {
    if (n < 1 || n > 4) return
    const next = [...arch.threadDescriptions]
    while (next.length < n) next.push("")
    setArchitecture(projectId, {
      ...arch,
      threadCount: n as 1 | 2 | 3 | 4,
      threadDescriptions: next.slice(0, n),
    })
  }

  const updateThread = (i: number, value: string) => {
    const next = [...arch.threadDescriptions]
    next[i] = value
    setArchitecture(projectId, { ...arch, threadDescriptions: next })
  }

  const preview = concept
    ? arch.mode === "single"
      ? `The story will follow a single protagonist through "${concept.title}" — a continuous linear narrative intercut with song structure.`
      : `The story will intercut ${arch.threadCount} parallel narratives — ${arch.threadDescriptions
          .slice(0, arch.threadCount)
          .map((t, i) => `Thread ${i + 1}${t ? `: ${t.split(" ").slice(0, 6).join(" ")}` : ""}`)
          .join("; ")}.`
    : "Select a concept first to preview the story architecture."

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="architecture" completedThrough="concept" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-3xl mx-auto w-full px-8 pb-16 flex-1 space-y-6">
        {concept && (
          <div className="rounded-xl border border-accent/40 bg-accent/5 px-4 py-2.5 text-sm flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Selected concept
            </span>
            <span className="font-serif font-semibold text-foreground">{concept.title}</span>
            <span className="text-muted-foreground italic truncate">
              — {concept.logline}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-accent" />
          <h2 className="text-lg font-semibold">Storyline Mode</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setMode("single")}
            className={cn(
              "rounded-xl border p-5 text-left transition-all shadow-md",
              arch.mode === "single" ? "border-accent ring-2 ring-accent/30 bg-accent/5" : "border-border bg-card hover:border-accent/30"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("h-4 w-4 rounded-full border-2", arch.mode === "single" ? "border-accent bg-accent" : "border-muted-foreground/40")} />
              <span className="font-serif font-semibold text-base">Single Storyline</span>
            </div>
            <p className="text-[13px] text-muted-foreground">
              One protagonist, one continuous narrative. Best for character-driven, intimate music videos.
            </p>
          </button>

          <button
            onClick={() => setMode("multi")}
            className={cn(
              "rounded-xl border p-5 text-left transition-all shadow-md",
              arch.mode === "multi" ? "border-accent ring-2 ring-accent/30 bg-accent/5" : "border-border bg-card hover:border-accent/30"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("h-4 w-4 rounded-full border-2", arch.mode === "multi" ? "border-accent bg-accent" : "border-muted-foreground/40")} />
              <span className="font-serif font-semibold text-base">Multi-Thread</span>
            </div>
            <p className="text-[13px] text-muted-foreground">
              Parallel narratives that intercut. Best for ensemble, rhythm-driven videos with multiple locations.
            </p>
          </button>
        </div>

        {arch.mode === "multi" && (
          <div className="rounded-xl border border-border bg-card p-5 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">Number of Threads</span>
              <div className="flex items-center gap-1 rounded-md border border-border overflow-hidden">
                <button
                  onClick={() => updateThreadCount(arch.threadCount - 1)}
                  className="p-1.5 hover:bg-muted transition-colors disabled:opacity-40"
                  disabled={arch.threadCount <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-3 py-1 text-sm font-semibold tabular-nums min-w-[2rem] text-center">
                  {arch.threadCount}
                </span>
                <button
                  onClick={() => updateThreadCount(arch.threadCount + 1)}
                  className="p-1.5 hover:bg-muted transition-colors disabled:opacity-40"
                  disabled={arch.threadCount >= 4}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">(1–4)</span>
            </div>

            <div className="space-y-3">
              {Array.from({ length: arch.threadCount }).map((_, i) => (
                <div key={i}>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Thread {i + 1}
                    {i === 0 && (
                      <span className="ml-1.5 text-accent normal-case tracking-normal font-normal">(primary)</span>
                    )}
                  </label>
                  <input
                    value={arch.threadDescriptions[i] ?? ""}
                    onChange={(e) => updateThread(i, e.target.value)}
                    placeholder="e.g., Protagonist levitates across futuristic rooftops"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Preview</h3>
          <p className="text-sm font-serif italic leading-relaxed text-foreground/90">{preview}</p>
        </section>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="architecture"
        nextLabel="Generate Story"
        onBeforeNext={() => setCurrentStep(projectId, "story")}
      />
    </div>
  )
}
