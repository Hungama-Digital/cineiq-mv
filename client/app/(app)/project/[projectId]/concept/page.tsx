"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { Sparkles, RefreshCw, Check, Library, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { useProjectStore } from "@/lib/store"
import { conceptVariations } from "@/lib/mock-variations"
import { LEGENDARY_ATTRIBUTES } from "@/lib/mock-data"
import { conceptImage } from "@/lib/demo-images"
import { MV_STEP_DEFS } from "@/lib/steps"
import type { ConceptCard } from "@/lib/types"

function attrName(id: number) {
  return LEGENDARY_ATTRIBUTES.find((a) => a.id === id)?.name ?? `#${id}`
}

export default function ConceptIdeationPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const selectedConcept = project?.selectedConcept ?? null
  // @ts-expect-error — demo-only field on project state
  const storedList: ConceptCard[] | undefined = project?._conceptList

  const setConceptList = useProjectStore((s) => s.setConceptList)
  const updateConceptInList = useProjectStore((s) => s.updateConceptInList)
  const setSelectedConcept = useProjectStore((s) => s.setSelectedConcept)
  const getNextVariationIndex = useProjectStore((s) => s.getNextVariationIndex)
  const takeSnapshot = useProjectStore((s) => s.takeSnapshot)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)

  const [refsOpen, setRefsOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [custom, setCustom] = useState<Partial<ConceptCard>>({ title: "", logline: "", visualHook: "" })
  const [version, setVersion] = useState(1)
  const [regenerating, setRegenerating] = useState(false)

  // On first mount, if no list stored, seed from variation A
  useEffect(() => {
    if (hydrated && project && (!storedList || storedList.length === 0)) {
      setConceptList(projectId, conceptVariations[0])
    }
  }, [hydrated, project, storedList, projectId, setConceptList])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const concepts = storedList ?? conceptVariations[0]
  const summary = resolveProjectSummary(projectId)
  const song = project.songMetadata
  const def = MV_STEP_DEFS.concept

  const regenerateAll = () => {
    if (regenerating) return
    setRegenerating(true)
    takeSnapshot(projectId, "concept")
    setTimeout(() => {
      const nextIdx = getNextVariationIndex(projectId, "concept", conceptVariations.length)
      setConceptList(projectId, conceptVariations[nextIdx])
      setVersion((v) => v + 1)
      setRegenerating(false)
      toast.success("New concepts generated", { description: `Version ${version + 1}` })
    }, 1800)
  }

  const handleSelect = (c: ConceptCard) => {
    setSelectedConcept(projectId, c)
    toast.success(`Selected: ${c.title}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="concept" completedThrough="song" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-6xl mx-auto w-full px-8 pb-16 flex-1 space-y-5">
        {song && (
          <section className="rounded-xl border border-border bg-muted/20 px-5 py-3 text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
            <span className="font-serif font-semibold text-foreground">{song.title}</span>
            <span>·</span>
            <span>
              <span className="font-semibold text-foreground">BPM</span> {song.bpm.toFixed(0)}
            </span>
            <span>·</span>
            <span>
              <span className="font-semibold text-foreground">Key</span> {song.keyCamelot}
            </span>
            <span>·</span>
            <span>
              <span className="font-semibold text-foreground">Mood</span>{" "}
              {song.moodTags.join(", ")}
            </span>
            <span>·</span>
            <span className="italic">{song.coreMetaphor}</span>
          </section>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Concept Directions
            </h2>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-muted text-muted-foreground tabular-nums">
              v{version}
            </span>
          </div>
          <button
            onClick={regenerateAll}
            disabled={regenerating}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", regenerating && "animate-spin")} />
            Regenerate All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {concepts.map((c, idx) => {
            const isSelected = selectedConcept?.id === c.id
            return (
              <div
                key={c.id}
                className={cn(
                  "relative flex flex-col rounded-xl border bg-card shadow-md transition-all",
                  isSelected ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent/30"
                )}
              >
                {/* Thumbnail */}
                <div className="h-36 rounded-t-xl overflow-hidden relative bg-muted">
                  {regenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/60 animate-pulse text-xs uppercase tracking-wider text-muted-foreground">
                      Regenerating…
                    </div>
                  ) : (
                    <>
                      <Image
                        src={conceptImage(c.id)}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 rounded bg-background/80 backdrop-blur px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold">
                        Concept {String.fromCharCode(65 + idx)}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Title</p>
                    <input
                      value={c.title}
                      onChange={(e) => updateConceptInList(projectId, c.id, { title: e.target.value })}
                      className="w-full bg-transparent text-base font-serif font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-accent/40 rounded px-1 -mx-1"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Logline</p>
                    <textarea
                      value={c.logline}
                      onChange={(e) => updateConceptInList(projectId, c.id, { logline: e.target.value })}
                      rows={3}
                      className="w-full bg-transparent text-[13px] text-foreground/90 resize-none focus:outline-none focus:ring-1 focus:ring-accent/40 rounded px-1 -mx-1"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Visual Hook</p>
                    <textarea
                      value={c.visualHook}
                      onChange={(e) => updateConceptInList(projectId, c.id, { visualHook: e.target.value })}
                      rows={2}
                      className="w-full bg-transparent text-[13px] italic text-foreground/85 resize-none focus:outline-none focus:ring-1 focus:ring-accent/40 rounded px-1 -mx-1"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                      Legendary Attributes
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {c.legendaryAttributes.map((a) => (
                        <span
                          key={a}
                          className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-semibold text-foreground"
                          title={attrName(a)}
                        >
                          #{a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <button
                      onClick={() => handleSelect(c)}
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold ml-auto transition-colors",
                        isSelected ? "bg-accent text-accent-foreground" : "bg-foreground text-background hover:brightness-110"
                      )}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-3 w-3" strokeWidth={3} />
                          Selected
                        </>
                      ) : (
                        "Select This"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <section className="rounded-xl border border-border bg-card shadow-md">
          <button
            onClick={() => setCustomOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Custom Concept
            </span>
            {customOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {customOpen && (
            <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Title</label>
                <input
                  value={custom.title ?? ""}
                  onChange={(e) => setCustom({ ...custom, title: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Logline</label>
                <textarea
                  value={custom.logline ?? ""}
                  onChange={(e) => setCustom({ ...custom, logline: e.target.value })}
                  rows={2}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Visual Hook</label>
                <textarea
                  value={custom.visualHook ?? ""}
                  onChange={(e) => setCustom({ ...custom, visualHook: e.target.value })}
                  rows={2}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
                />
              </div>
              <button
                onClick={() => {
                  const id = `custom-${Date.now()}`
                  const newCard: ConceptCard = {
                    id,
                    title: custom.title || "Custom Concept",
                    logline: custom.logline || "",
                    visualHook: custom.visualHook || "",
                    legendaryAttributes: [],
                    isCustom: true,
                  }
                  setConceptList(projectId, [...concepts, newCard])
                  handleSelect(newCard)
                  setCustomOpen(false)
                  setCustom({})
                }}
                className="rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-semibold hover:brightness-110 transition-all"
              >
                Use My Custom Concept
              </button>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card shadow-md">
          <button
            onClick={() => setRefsOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Library className="h-3.5 w-3.5 text-accent" />
              RAG References
              <span className="text-xs text-muted-foreground font-normal">
                (5 legendary videos inspired these concepts)
              </span>
            </span>
            {refsOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {refsOpen && (
            <div className="px-5 pb-5 pt-3 border-t border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: "California Love", artist: "2Pac", similarity: 0.91 },
                { title: "Kill Bill Vol.1", artist: "RZA ost", similarity: 0.88 },
                { title: "Bad Guy", artist: "Billie Eilish", similarity: 0.84 },
                { title: "Rolling in the Deep", artist: "Adele", similarity: 0.79 },
                { title: "Paper Planes", artist: "M.I.A.", similarity: 0.77 },
              ].map((r) => (
                <div key={r.title} className="rounded-lg border border-border p-3 text-xs space-y-1">
                  <div className="font-serif font-semibold text-foreground">{r.title}</div>
                  <div className="text-muted-foreground">{r.artist}</div>
                  <div className="text-accent font-semibold tabular-nums">
                    Similarity {r.similarity.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="concept"
        canAdvance={!!selectedConcept}
        nextLabel="Continue to Story Architecture"
        onBeforeNext={() => setCurrentStep(projectId, "architecture")}
      />
    </div>
  )
}
