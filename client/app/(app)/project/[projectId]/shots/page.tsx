"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Copy, RefreshCw, Download, FileJson, FileText, Dice5 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { shotVariations } from "@/lib/mock-variations"
import { exportProjectJson, exportShotListCsv, exportPdfStub } from "@/lib/export"
import type { GenAITool, Shot } from "@/lib/types"

const toolMeta: Record<GenAITool, { label: string; accent: string }> = {
  seedance_2: { label: "Seedance 2", accent: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400" },
  veo_3_1: { label: "Veo 3.1", accent: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400" },
  kling_2_5: { label: "Kling 2.5", accent: "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" },
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function ShotListPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const router = useRouter()
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setShots = useProjectStore((s) => s.setShots)
  const updateShot = useProjectStore((s) => s.updateShot)
  const takeSnapshot = useProjectStore((s) => s.takeSnapshot)
  const getNextVariationIndex = useProjectStore((s) => s.getNextVariationIndex)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const setStatus = useProjectStore((s) => s.setStatus)
  const def = MV_STEP_DEFS.shots

  const [selectedId, setSelectedId] = useState<string>("")
  const [activeTool, setActiveTool] = useState<GenAITool>("seedance_2")
  const [globalNeg, setGlobalNeg] = useState("deformed hands, blurry faces, text artifacts, extra limbs, nudity")
  const [regenerating, setRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (hydrated && project && project.shotList.length === 0) {
      setShots(projectId, shotVariations[0])
      setSelectedId(shotVariations[0][0].shotId)
    }
  }, [hydrated, project, projectId, setShots])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const shots = project.shotList
  const selected = shots.find((s) => s.shotId === selectedId) ?? shots[0]
  const activePrompt = selected?.prompts[activeTool] ?? ""
  const wordCount = activePrompt.trim().split(/\s+/).filter(Boolean).length
  const wordOk = wordCount >= 150
  const chars = project.characterBible

  const regenerate = () => {
    if (regenerating) return
    setRegenerating(true)
    takeSnapshot(projectId, "shots")
    setTimeout(() => {
      const nextIdx = getNextVariationIndex(projectId, "shots", shotVariations.length)
      setShots(projectId, shotVariations[nextIdx])
      setSelectedId(shotVariations[nextIdx][0].shotId)
      setRegenerating(false)
      toast.success("Shot list regenerated")
    }, 2000)
  }

  const copyPrompt = async () => {
    if (!activePrompt) return
    try {
      await navigator.clipboard.writeText(activePrompt)
      setCopied(true)
      toast.success("Prompt copied to clipboard")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Copy failed")
    }
  }

  const randomSeed = () => {
    if (!selected) return
    updateShot(projectId, selected.shotId, { seed: Math.floor(Math.random() * 99999) })
  }

  const handleExportJson = () => exportProjectJson(project)
  const handleExportCsv = () => exportShotListCsv(shots, project.title)

  // Final close-out: snapshot current shots, download JSON, mark project
  // completed, and send the user back to the dashboard. Wired to both the
  // inline "Mark Complete" button and the sticky "Export & Finish" nav.
  const handleFinalize = () => {
    takeSnapshot(projectId, "shots")
    exportProjectJson(project)
    setStatus(projectId, "completed")
    toast.success("Project finalized", {
      description: `Exported ${project.title}.json — back to dashboard`,
    })
    setTimeout(() => router.push("/dashboard"), 800)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="shots" completedThrough="beats" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-6xl mx-auto w-full px-8 pb-16 flex-1 space-y-5">
        <section className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">
                Shot List
                <span className="ml-1 text-muted-foreground font-normal">({shots.length} shots)</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={regenerate}
                disabled={regenerating}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:bg-muted transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("h-3 w-3", regenerating && "animate-spin")} />
                Regenerate
              </button>
              <div className="flex items-center gap-1 rounded-md border border-border overflow-hidden text-xs">
                <button onClick={handleExportJson} className="flex items-center gap-1 px-2.5 py-1 hover:bg-muted transition-colors">
                  <FileJson className="h-3 w-3" />
                  JSON
                </button>
                <div className="h-4 w-px bg-border" />
                <button onClick={handleExportCsv} className="flex items-center gap-1 px-2.5 py-1 hover:bg-muted transition-colors">
                  <FileText className="h-3 w-3" />
                  CSV
                </button>
                <div className="h-4 w-px bg-border" />
                <button onClick={exportPdfStub} className="flex items-center gap-1 px-2.5 py-1 hover:bg-muted transition-colors">
                  <Download className="h-3 w-3" />
                  PDF
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 font-semibold">#</th>
                  <th className="text-left px-4 py-2 font-semibold">Time</th>
                  <th className="text-left px-4 py-2 font-semibold">Type</th>
                  <th className="text-left px-4 py-2 font-semibold">Movement</th>
                  <th className="text-left px-4 py-2 font-semibold">Description</th>
                  <th className="text-left px-4 py-2 font-semibold">Tool</th>
                </tr>
              </thead>
              <tbody>
                {shots.map((s, i) => (
                  <tr
                    key={s.shotId}
                    onClick={() => setSelectedId(s.shotId)}
                    className={cn(
                      "cursor-pointer border-b border-border/60 hover:bg-muted/40 transition-colors",
                      selectedId === s.shotId && "bg-accent/5"
                    )}
                  >
                    <td className="px-4 py-2 font-bold tabular-nums text-foreground/70">{i + 1}</td>
                    <td className="px-4 py-2 tabular-nums whitespace-nowrap text-muted-foreground">{s.startTime}–{s.endTime}</td>
                    <td className="px-4 py-2">{s.shotType}</td>
                    <td className="px-4 py-2 text-muted-foreground">{s.cameraMovement}</td>
                    <td className="px-4 py-2 max-w-sm">
                      <span className="line-clamp-1 text-foreground/90">{s.description}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={cn("px-2 py-0.5 rounded text-[11px] font-semibold", toolMeta[s.genaiTool].accent)}>
                        {toolMeta[s.genaiTool].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <section className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">Shot #{shots.indexOf(selected) + 1}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {selected.startTime}–{selected.endTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-5 pt-3">
              {(Object.keys(toolMeta) as GenAITool[]).map((t) => {
                const active = activeTool === t
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTool(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
                      active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {toolMeta[t].label}
                  </button>
                )
              })}
            </div>

            <div className="px-5 pb-5 pt-3 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Generation Prompt
                  </label>
                  <span className={cn("text-[11px] font-semibold tabular-nums", wordOk ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400")}>
                    {wordCount} words {wordOk ? "✓ min 150" : "(min 150)"}
                  </span>
                </div>
                <textarea
                  value={activePrompt}
                  onChange={(e) =>
                    selected && updateShot(projectId, selected.shotId, {
                      prompts: { ...selected.prompts, [activeTool]: e.target.value },
                    })
                  }
                  rows={10}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Negative Prompt">
                  <textarea
                    value={selected.negativePrompt}
                    onChange={(e) => updateShot(projectId, selected.shotId, { negativePrompt: e.target.value })}
                    rows={2}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
                  />
                </Field>
                <Field label="Motion Bucket (Kling)">
                  <input
                    type="number"
                    value={selected.motionBucket}
                    onChange={(e) => updateShot(projectId, selected.shotId, { motionBucket: Number(e.target.value) })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                  />
                </Field>
                <Field label="Seed">
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={selected.seed}
                      onChange={(e) => updateShot(projectId, selected.shotId, { seed: Number(e.target.value) })}
                      className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                    />
                    <button onClick={randomSeed} className="rounded-md border border-border hover:bg-muted transition-colors px-2">
                      <Dice5 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Field>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selected.consistencyApplied}
                    onChange={(e) => updateShot(projectId, selected.shotId, { consistencyApplied: e.target.checked })}
                    className="h-4 w-4 accent-accent"
                  />
                  <span className="font-semibold">
                    Apply character reference image
                    {selected.characterRefs.length > 0 && (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        ({selected.characterRefs
                          .map((id) => chars.find((c) => c.id === id)?.name)
                          .filter(Boolean)
                          .join(", ")})
                      </span>
                    )}
                  </span>
                </label>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1 rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-semibold hover:brightness-110 transition-all"
                >
                  <Copy className="h-3 w-3" />
                  {copied ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-xl border border-border bg-card p-5 shadow-md">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Global Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-accent" />
              <span className="font-semibold">Use IP Adapter for all primary characters</span>
              <span className="text-xs text-muted-foreground ml-1">(character consistency across every shot)</span>
            </label>
            <Field label="Global Negative Prompt">
              <textarea
                value={globalNeg}
                onChange={(e) => setGlobalNeg(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Ready to Ship</h3>
            <p className="text-xs text-muted-foreground">
              Export a package for your producer — JSON contains full project state, CSV is shot-by-shot for spreadsheets.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExportJson} className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted transition-colors">
              Export JSON
            </button>
            <button onClick={handleExportCsv} className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted transition-colors">
              Export CSV
            </button>
            <button onClick={handleFinalize} className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all">
              Mark Complete
            </button>
          </div>
        </section>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="shots"
        nextLabel="Export & Finish"
        onFinish={handleFinalize}
      />
    </div>
  )
}
