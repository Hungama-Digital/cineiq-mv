"use client"

import { use, useEffect, useState } from "react"
import { Bold, Italic, Heading1, Heading2, Quote, List, Sparkles, RefreshCw, Check, History, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { treatmentVariations } from "@/lib/mock-variations"

const aiToolButtons = ["Rewrite Selection", "Expand", "Shorten", "Change Tone"] as const

function renderTreatmentWithConcept(template: string, conceptTitle: string | null) {
  return template.replace(/\{CONCEPT_TITLE\}/g, conceptTitle ?? "Your selected concept")
}

export default function StoryGeneratorPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const updateTreatment = useProjectStore((s) => s.updateTreatment)
  const takeSnapshot = useProjectStore((s) => s.takeSnapshot)
  const listVersions = useProjectStore((s) => s.listVersions)
  const restoreSnapshot = useProjectStore((s) => s.restoreSnapshot)
  const getNextVariationIndex = useProjectStore((s) => s.getNextVariationIndex)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.story

  const [regenerating, setRegenerating] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  // Seed treatment from variation A on first visit
  useEffect(() => {
    if (hydrated && project && !project.storyTreatment) {
      const rendered = renderTreatmentWithConcept(
        treatmentVariations[0].content,
        project.selectedConcept?.title ?? null
      )
      updateTreatment(projectId, {
        version: 1,
        approved: false,
        content: rendered,
      })
    }
  }, [hydrated, project, projectId, updateTreatment])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const treatment = project.storyTreatment ?? { version: 1, content: "", approved: false }
  const song = project.songMetadata
  const versions = listVersions(projectId, "story")

  const regenerate = () => {
    if (regenerating) return
    setRegenerating(true)
    takeSnapshot(projectId, "story")
    setTimeout(() => {
      const nextIdx = getNextVariationIndex(projectId, "story", treatmentVariations.length)
      const rendered = renderTreatmentWithConcept(
        treatmentVariations[nextIdx].content,
        project.selectedConcept?.title ?? null
      )
      updateTreatment(projectId, {
        version: treatment.version + 1,
        content: rendered,
        approved: false,
      })
      setRegenerating(false)
      toast.success(`Treatment regenerated`, { description: `Version ${treatment.version + 1}` })
    }, 1800)
  }

  const handleRestore = (snapshotId: string) => {
    const ok = restoreSnapshot(snapshotId)
    if (ok) {
      toast.success("Version restored")
      setHistoryOpen(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="story" completedThrough="architecture" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-6xl mx-auto w-full px-8 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="rounded-xl border border-border bg-card shadow-md flex flex-col">
            <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><Bold className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><Italic className="h-3.5 w-3.5" /></button>
              <div className="h-4 w-px bg-border mx-1" />
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><Heading1 className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><Heading2 className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><Quote className="h-3.5 w-3.5" /></button>
              <button className="p-1.5 rounded hover:bg-muted transition-colors"><List className="h-3.5 w-3.5" /></button>
              <div className="ml-auto flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-muted text-muted-foreground tabular-nums">
                  v{treatment.version}
                </span>
                <button
                  onClick={regenerate}
                  disabled={regenerating}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={cn("h-3 w-3", regenerating && "animate-spin")} />
                  Regenerate
                </button>
              </div>
            </div>

            <textarea
              value={treatment.content}
              onChange={(e) => updateTreatment(projectId, { content: e.target.value })}
              className="flex-1 min-h-[500px] px-6 py-5 bg-transparent text-[14px] leading-relaxed font-serif resize-none focus:outline-none whitespace-pre-wrap"
            />

            <div className="px-5 py-3 border-t border-border flex items-center gap-2">
              <button
                onClick={() => updateTreatment(projectId, { approved: !treatment.approved })}
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
                  treatment.approved ? "bg-accent border-accent text-accent-foreground" : "border-muted-foreground/50 hover:border-foreground"
                )}
              >
                {treatment.approved && <Check className="h-3 w-3" strokeWidth={3} />}
              </button>
              <span className="text-sm text-foreground">
                I approve this treatment for character and world generation.
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {song && (
              <section className="rounded-xl border border-border bg-card p-4 shadow-md">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2.5">
                  Song Structure
                </h3>
                <div className="space-y-1.5">
                  {song.segments.map((s, i) => {
                    const m0 = Math.floor(s.start / 60)
                    const s0 = Math.floor(s.start % 60)
                    const m1 = Math.floor(s.end / 60)
                    const s1 = Math.floor(s.end % 60)
                    return (
                      <div key={i} className="flex items-center gap-2 text-[13px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span className="font-semibold text-foreground flex-1">{s.type}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {m0}:{s0.toString().padStart(2, "0")}–{m1}:{s1.toString().padStart(2, "0")}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            <section className="rounded-xl border border-border bg-card p-4 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-accent" />
                Inline AI Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {aiToolButtons.map((b) => (
                  <button
                    key={b}
                    onClick={() => toast.info(`${b} — coming in Phase 4`)}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-[12px] font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-4 shadow-md">
              <button
                onClick={() => setHistoryOpen((o) => !o)}
                className="w-full flex items-center justify-between mb-2.5"
              >
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1">
                  <History className="h-3 w-3" />
                  Version History
                  <span className="ml-1 text-foreground normal-case tracking-normal font-normal">
                    ({versions.length})
                  </span>
                </h3>
              </button>
              {versions.length === 0 ? (
                <p className="text-[11px] text-muted-foreground italic">
                  No versions yet. Regenerate to create snapshots.
                </p>
              ) : (
                <div className="space-y-1">
                  {[...versions].reverse().map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between gap-2 rounded px-2 py-1.5 hover:bg-muted transition-colors text-[13px]"
                    >
                      <span className="font-semibold tabular-nums">v{v.versionNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(v.takenAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() => handleRestore(v.id)}
                        className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="story"
        nextLabel="Continue to Character Forge"
        canAdvance={treatment.approved}
        onBeforeNext={() => setCurrentStep(projectId, "characters")}
      />
    </div>
  )
}
