"use client"

import { use, useEffect, useState } from "react"
import { User, ChevronDown, ChevronUp, Plus, Check, X, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { characterVariations } from "@/lib/mock-variations"
import type { CharacterBibleEntry } from "@/lib/types"

const archetypes = [
  "The Visionary", "The Rebel", "The Lover", "The Mentor", "The Trickster",
  "The Everyman", "The Hero", "The Outlaw", "The Sage", "The Explorer",
] as const

const performanceStyles = [
  "Contained Stillness", "Kinetic Burst", "Slow Burn", "Playful Chaos",
  "Stoic Intensity", "Fluid Grace",
] as const

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

function CharacterCard({
  projectId, char, expanded, onToggle,
}: {
  projectId: string
  char: CharacterBibleEntry
  expanded: boolean
  onToggle: () => void
}) {
  const updateCharacter = useProjectStore((s) => s.updateCharacter)
  const removeCharacter = useProjectStore((s) => s.removeCharacter)

  const update = <K extends keyof CharacterBibleEntry>(key: K, value: CharacterBibleEntry[K]) =>
    updateCharacter(projectId, char.id, { [key]: value } as Partial<CharacterBibleEntry>)

  const updateAppearance = (key: keyof CharacterBibleEntry["appearance"], value: string) =>
    updateCharacter(projectId, char.id, {
      appearance: { ...char.appearance, [key]: value },
    })

  return (
    <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center shrink-0">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-left">
            <div className="font-serif font-semibold text-[15px] text-foreground">
              {char.name || "Unnamed Character"}
            </div>
            <div className="text-xs text-muted-foreground">
              {char.archetype} · {char.performanceStyle}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {char.consistencyLocked && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold">
              Locked
            </span>
          )}
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
            <div>
              <div className="aspect-square rounded-xl bg-muted mb-2 flex items-center justify-center">
                <User className="h-16 w-16 text-muted-foreground/40" />
              </div>
              <button
                onClick={() => update("consistencyLocked", !char.consistencyLocked)}
                className={cn(
                  "w-full flex items-center justify-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  char.consistencyLocked ? "border-accent bg-accent/10 text-accent" : "border-border hover:bg-muted"
                )}
              >
                <Check className="h-3 w-3" />
                {char.consistencyLocked ? "Consistency locked" : "Lock for consistency"}
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name">
                  <input value={char.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
                </Field>
                <Field label="Age">
                  <input type="number" value={char.age} onChange={(e) => update("age", Number(e.target.value))} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Archetype">
                  <select value={char.archetype} onChange={(e) => update("archetype", e.target.value as typeof archetypes[number])} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                    {archetypes.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Performance Style">
                  <select value={char.performanceStyle} onChange={(e) => update("performanceStyle", e.target.value as typeof performanceStyles[number])} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                    {performanceStyles.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Hair">
                <input value={char.appearance.hair} onChange={(e) => updateAppearance("hair", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
              </Field>
              <Field label="Clothing">
                <textarea value={char.appearance.clothing} onChange={(e) => updateAppearance("clothing", e.target.value)} rows={2} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none" />
              </Field>
              <Field label="Accessories">
                <textarea value={char.appearance.accessories} onChange={(e) => updateAppearance("accessories", e.target.value)} rows={2} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none" />
              </Field>
              <Field label="Voice Notes">
                <input value={char.voiceNotes} onChange={(e) => update("voiceNotes", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
              </Field>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                removeCharacter(projectId, char.id)
                toast.success(`Removed ${char.name}`)
              }}
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <X className="h-3 w-3" />
              Remove Character
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CharacterForgePage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setCharacters = useProjectStore((s) => s.setCharacters)
  const addCharacter = useProjectStore((s) => s.addCharacter)
  const takeSnapshot = useProjectStore((s) => s.takeSnapshot)
  const getNextVariationIndex = useProjectStore((s) => s.getNextVariationIndex)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.characters

  const [expanded, setExpanded] = useState<string | null>(null)
  const [regenerating, setRegenerating] = useState(false)

  useEffect(() => {
    if (hydrated && project && project.characterBible.length === 0) {
      setCharacters(projectId, characterVariations[0])
      setExpanded(characterVariations[0][0].id)
    }
  }, [hydrated, project, projectId, setCharacters])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const chars = project.characterBible

  const regenerate = () => {
    if (regenerating) return
    setRegenerating(true)
    takeSnapshot(projectId, "characters")
    setTimeout(() => {
      const nextIdx = getNextVariationIndex(projectId, "characters", characterVariations.length)
      setCharacters(projectId, characterVariations[nextIdx])
      setRegenerating(false)
      toast.success("Characters regenerated")
    }, 1800)
  }

  const handleAdd = () => {
    const id = `char-${Date.now()}`
    addCharacter(projectId, {
      id,
      name: "New Character",
      age: 28,
      gender: "",
      archetype: "The Everyman",
      appearance: { faceShape: "", hair: "", skinTone: "", build: "", clothing: "", accessories: "" },
      voiceNotes: "",
      performanceStyle: "Contained Stillness",
      consistencyLocked: false,
    })
    setExpanded(id)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="characters" completedThrough="story" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-4xl mx-auto w-full px-8 pb-16 flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-accent" />
            <h2 className="text-lg font-semibold">
              Characters Detected{" "}
              <span className="text-muted-foreground font-normal">({chars.length})</span>
            </h2>
          </div>
          <button
            onClick={regenerate}
            disabled={regenerating}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", regenerating && "animate-spin")} />
            Re-detect from Treatment
          </button>
        </div>

        <div className="space-y-3">
          {chars.map((char) => (
            <CharacterCard
              key={char.id}
              projectId={projectId}
              char={char}
              expanded={expanded === char.id}
              onToggle={() => setExpanded(expanded === char.id ? null : char.id)}
            />
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="w-full rounded-xl border-2 border-dashed border-border bg-transparent hover:border-accent/40 hover:bg-muted/30 transition-colors py-4 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Character
        </button>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="characters"
        nextLabel="Continue to World Builder"
        onBeforeNext={() => setCurrentStep(projectId, "world")}
      />
    </div>
  )
}
