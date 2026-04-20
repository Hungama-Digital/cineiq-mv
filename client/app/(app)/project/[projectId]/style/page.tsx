"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { Palette, Sparkles, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { mvMockStyle } from "@/lib/mock-data"
import { styleFrames } from "@/lib/demo-images"
import type { VisualStyleGuide } from "@/lib/types"

const presets = [
  { id: "cinematic-grit", label: "Cinematic Grit", colors: ["#1a1a1a", "#3e3830", "#b08968", "#d4a373", "#faedcd"] },
  { id: "neon-noir", label: "Neon Noir", colors: ["#0a0e27", "#2e1845", "#6a0dad", "#e91e63", "#00f5ff"] },
  { id: "warm-bollywood", label: "Warm Bollywood", colors: ["#5e0f0f", "#b91c1c", "#fbbf24", "#fde68a", "#fef3c7"] },
  { id: "ghibli-fantasy", label: "Ghibli Fantasy", colors: ["#b8e0d4", "#95c8d8", "#f0e6c0", "#f4c4a8", "#a5a58d"] },
  { id: "vintage-70s", label: "Vintage 70s", colors: ["#8b4513", "#d2691e", "#daa520", "#cd853f", "#bdb76b"] },
] as const

const lightingOptions = ["Practical Motivated", "High-Key", "Low-Key", "Chiaroscuro", "Natural", "Neon-lit"]
const cameraLanguages = ["Steadicam Float", "Handheld Verité", "Locked-Off", "Dolly Tracking", "Crane Ops", "Drone Sweeps"]
const lensOptions = ["Anamorphic flare", "Vintage soft", "Modern sharp", "Wide fisheye", "Telephoto compression"]
const gradingStyles = ["Teal/Orange", "Bleach Bypass", "Monochrome", "Pastel", "Saturated", "Moody Blue"]

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

export default function VisualStylePage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setStyleGuide = useProjectStore((s) => s.setStyleGuide)
  const updateStyleGuide = useProjectStore((s) => s.updateStyleGuide)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.style

  const [selectedPreset, setSelectedPreset] = useState<string>("neon-noir")
  const [selectedFrame, setSelectedFrame] = useState<number>(1)

  useEffect(() => {
    if (hydrated && project && !project.visualStyleGuide) {
      setStyleGuide(projectId, mvMockStyle)
    }
  }, [hydrated, project, projectId, setStyleGuide])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const style: VisualStyleGuide = project.visualStyleGuide ?? mvMockStyle

  const applyPreset = (p: (typeof presets)[number]) => {
    setSelectedPreset(p.id)
    updateStyleGuide(projectId, { colorPalette: [...p.colors] })
    toast.success(`Applied ${p.label} preset`)
  }

  const frames = styleFrames(selectedPreset)

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="style" completedThrough="world" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-4xl mx-auto w-full px-8 pb-16 flex-1 space-y-5">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-accent" />
            <h2 className="text-lg font-semibold">Style Presets</h2>
            <span className="text-xs text-muted-foreground">(one-click fill)</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={cn(
                  "rounded-lg border bg-card transition-all overflow-hidden group shadow-sm",
                  selectedPreset === p.id ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent/40"
                )}
              >
                <div className="flex h-8">
                  {p.colors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="px-2 py-1.5 text-[12px] font-semibold text-foreground group-hover:text-accent transition-colors">
                  {p.label}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-md space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Color Palette</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {style.colorPalette.map((hex, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-10 w-10 rounded-md border border-border" style={{ backgroundColor: hex }} />
                <input
                  value={hex}
                  onChange={(e) => {
                    const next = [...style.colorPalette]
                    next[i] = e.target.value
                    updateStyleGuide(projectId, { colorPalette: next })
                  }}
                  className="w-20 rounded-md border border-border bg-background px-2 py-1 text-xs tabular-nums font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-md">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">Style Attributes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Lighting Philosophy">
              <select value={style.lighting} onChange={(e) => updateStyleGuide(projectId, { lighting: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                {lightingOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Camera Language">
              <select value={style.cameraLanguage} onChange={(e) => updateStyleGuide(projectId, { cameraLanguage: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                {cameraLanguages.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Lens Characteristics">
              <select value={style.lensCharacteristics} onChange={(e) => updateStyleGuide(projectId, { lensCharacteristics: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                {lensOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Color Grading">
              <select value={style.colorGradingStyle} onChange={(e) => updateStyleGuide(projectId, { colorGradingStyle: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                {gradingStyles.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={style.filmGrain.enabled}
                onChange={(e) => updateStyleGuide(projectId, { filmGrain: { ...style.filmGrain, enabled: e.target.checked } })}
                className="h-4 w-4 accent-accent"
              />
              <span className="font-semibold">Film Grain</span>
            </label>
            <div className="flex-1 flex items-center gap-3">
              <input
                type="range" min={0} max={1} step={0.05}
                value={style.filmGrain.intensity}
                onChange={(e) => updateStyleGuide(projectId, { filmGrain: { ...style.filmGrain, intensity: Number(e.target.value) } })}
                disabled={!style.filmGrain.enabled}
                className="flex-1 accent-accent disabled:opacity-40"
              />
              <span className="text-xs tabular-nums font-semibold w-10 text-right">
                {style.filmGrain.intensity.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Field label="Reference Mood">
              <input
                value={style.referenceMood}
                onChange={(e) => updateStyleGuide(projectId, { referenceMood: e.target.value })}
                placeholder="e.g., Blade Runner 2049 meets retro disco"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm italic focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Style Frame Gallery
            </h3>
            <button
              onClick={() => toast.success(`Style frames generated from ${presets.find((p) => p.id === selectedPreset)?.label}`)}
              className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:bg-muted transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Generate Style Frames
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frames.map((url, i) => (
              <button
                key={i}
                onClick={() => setSelectedFrame(i)}
                className={cn(
                  "aspect-video rounded-lg border-2 overflow-hidden relative group transition-all",
                  selectedFrame === i ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent/40"
                )}
              >
                <Image src={url} alt={`Frame ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <Sparkles className="h-5 w-5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-1 left-1 text-[10px] font-semibold text-white/80 uppercase tracking-wider bg-black/40 px-1 rounded">
                  Frame {i + 1}
                </div>
                {selectedFrame === i && (
                  <div className="absolute top-1 right-1 rounded bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                    Key
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground italic">
            Selected frame will be used as visual reference for all shot prompts.
          </p>
        </section>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="style"
        nextLabel="Generate Beat Sheet"
        onBeforeNext={() => setCurrentStep(projectId, "beats")}
      />
    </div>
  )
}
