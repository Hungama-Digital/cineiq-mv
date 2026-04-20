"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { MapPin, Plus, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
// eslint-disable-next-line @typescript-eslint/no-unused-vars — cn used inline in map
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { mvMockWorld } from "@/lib/mock-data"
import { locationImage } from "@/lib/demo-images"
import type { Location, WorldBible } from "@/lib/types"

const locationTypes = ["Rooftop", "Interior Warehouse", "Exterior Forest", "Beach", "Urban Street", "Desert", "Interior Cafe", "Stadium"]
const timeOfDayOptions = ["Morning", "Golden hour", "Midday", "Afternoon", "Dusk", "Night", "Pre-dawn"]
const weatherOptions = ["Clear", "Light rain", "Heavy rain", "Overcast", "Fog / mist", "Snow", "Windy"]
const physicsOptions = ["Normal", "Gravity optional", "Time flows backward", "Slow motion default", "Surreal"]

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

export default function WorldBuilderPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setWorld = useProjectStore((s) => s.setWorld)
  const updateLocation = useProjectStore((s) => s.updateLocation)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.world

  const [expanded, setExpanded] = useState<string | null>(null)
  const [newAtm, setNewAtm] = useState("")

  useEffect(() => {
    if (hydrated && project && !project.worldBible) {
      setWorld(projectId, mvMockWorld)
      setExpanded(mvMockWorld.locations[0].id)
    }
  }, [hydrated, project, projectId, setWorld])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const world: WorldBible = project.worldBible ?? mvMockWorld
  const locs = world.locations

  const addLocation = () => {
    const id = `loc-${Date.now()}`
    const newLoc: Location = {
      id, name: "New Location", type: "Rooftop", timeOfDay: "Night", weather: "Clear",
      culturalMarkers: "", description: "",
    }
    setWorld(projectId, { ...world, locations: [...locs, newLoc] })
    setExpanded(id)
  }

  const updateWorldField = <K extends keyof WorldBible>(key: K, value: WorldBible[K]) =>
    setWorld(projectId, { ...world, [key]: value })

  const addAtm = () => {
    const t = newAtm.trim()
    if (!t || world.atmosphere.includes(t)) return
    updateWorldField("atmosphere", [...world.atmosphere, t])
    setNewAtm("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="world" completedThrough="characters" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-4xl mx-auto w-full px-8 pb-16 flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" />
          <h2 className="text-lg font-semibold">
            Locations Detected{" "}
            <span className="text-muted-foreground font-normal">({locs.length})</span>
          </h2>
        </div>

        <div className="space-y-3">
          {locs.map((loc) => {
            const isExpanded = expanded === loc.id
            const img = locationImage(loc.id)
            return (
              <div key={loc.id} className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
                <button
                  onClick={() => setExpanded(isExpanded ? null : loc.id)}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-md overflow-hidden relative bg-muted">
                      <Image src={img} alt={loc.name} fill className="object-cover" sizes="44px" unoptimized />
                    </div>
                    <div className="text-left">
                      <div className="font-serif font-semibold text-[15px] text-foreground">{loc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {loc.type} · {loc.timeOfDay} · {loc.weather}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {isExpanded && (
                  <div className="border-t border-border">
                    <div className="aspect-video relative bg-muted">
                      <Image src={img} alt={loc.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" unoptimized />
                    </div>
                    <div className="px-5 pb-5 pt-4 space-y-3">
                      <Field label="Name">
                        <input value={loc.name} onChange={(e) => updateLocation(projectId, loc.id, { name: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
                      </Field>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Type">
                          <select value={loc.type} onChange={(e) => updateLocation(projectId, loc.id, { type: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                            {locationTypes.map((t) => <option key={t}>{t}</option>)}
                          </select>
                        </Field>
                        <Field label="Time of Day">
                          <select value={loc.timeOfDay} onChange={(e) => updateLocation(projectId, loc.id, { timeOfDay: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                            {timeOfDayOptions.map((t) => <option key={t}>{t}</option>)}
                          </select>
                        </Field>
                        <Field label="Weather">
                          <select value={loc.weather} onChange={(e) => updateLocation(projectId, loc.id, { weather: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                            {weatherOptions.map((t) => <option key={t}>{t}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Cultural Markers">
                        <input value={loc.culturalMarkers} onChange={(e) => updateLocation(projectId, loc.id, { culturalMarkers: e.target.value })} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
                      </Field>
                      <Field label="Description">
                        <textarea value={loc.description} onChange={(e) => updateLocation(projectId, loc.id, { description: e.target.value })} rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none font-serif" />
                      </Field>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={addLocation}
          className="w-full rounded-xl border-2 border-dashed border-border hover:border-accent/40 hover:bg-muted/30 transition-colors py-3 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Location
        </button>

        <section className="rounded-xl border border-border bg-card p-5 shadow-md space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Global World Rules</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Time Period">
              <input value={world.timePeriod} onChange={(e) => updateWorldField("timePeriod", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40" />
            </Field>
            <Field label="Physics Rules">
              <select value={world.physicsRules} onChange={(e) => updateWorldField("physicsRules", e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40">
                {physicsOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Atmosphere Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {world.atmosphere.map((a) => (
                <span key={a} className="group inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2.5 py-1 text-xs font-semibold">
                  {a}
                  <button onClick={() => updateWorldField("atmosphere", world.atmosphere.filter((x) => x !== a))} className="opacity-60 hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-1.5 max-w-xs">
              <input
                value={newAtm}
                onChange={(e) => setNewAtm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAtm()}
                placeholder="Add tag..."
                className="flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
              />
              <button onClick={addAtm} className="rounded-md bg-muted hover:bg-muted/70 px-2 transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Dominant Colors (from song analysis)
            </label>
            <div className="flex items-center gap-2">
              {world.dominantColors.map((hex) => (
                <div key={hex} className="flex items-center gap-1.5">
                  <div className={cn("h-6 w-6 rounded-md border border-border")} style={{ backgroundColor: hex }} />
                  <span className="text-[11px] tabular-nums font-medium text-muted-foreground">{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="world"
        nextLabel="Continue to Visual Style"
        onBeforeNext={() => setCurrentStep(projectId, "style")}
      />
    </div>
  )
}
