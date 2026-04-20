"use client"

import { use, useEffect, useState } from "react"
import { List, Plus, Trash2, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { beatVariations } from "@/lib/mock-variations"
import type { Beat, BeatEmotion, CharacterBibleEntry } from "@/lib/types"

const emotions: BeatEmotion[] = [
  "Contemplative", "Intimate", "Confident", "Euphoric", "Yearning",
  "Triumphant", "Melancholic", "Ecstatic", "Tense", "Serene",
]

const segmentColors: Record<string, string> = {
  Intro: "bg-slate-400/60",
  Verse: "bg-blue-400/70",
  "Pre-Chorus": "bg-violet-400/70",
  Chorus: "bg-accent",
  Bridge: "bg-amber-400/70",
  Instrumental: "bg-teal-400/70",
  Outro: "bg-rose-400/60",
}

function toSeconds(mmss: string) {
  const [m, s] = mmss.split(":").map(Number)
  return m * 60 + s
}

const CHARACTER_PALETTE = [
  "bg-rose-500", "bg-sky-500", "bg-amber-500",
  "bg-emerald-500", "bg-violet-500", "bg-orange-500",
] as const
function characterColor(index: number) {
  return CHARACTER_PALETTE[index % CHARACTER_PALETTE.length]
}

function autoAssignCharacters(beats: Beat[], chars: CharacterBibleEntry[]): Beat[] {
  if (chars.length === 0) return beats
  const all = chars.map((c) => c.id)
  const protagonist = [chars[0].id]
  const duet = chars.length >= 2 ? [chars[0].id, chars[1].id] : protagonist
  const secondary = chars.length >= 2 ? [chars[1].id] : protagonist
  return beats.map((b) => {
    let characterIds: string[]
    switch (b.songSection) {
      case "Chorus": characterIds = all; break
      case "Bridge": characterIds = duet; break
      case "Instrumental": characterIds = secondary; break
      default: characterIds = protagonist
    }
    return { ...b, characterIds }
  })
}

function WaveformBars() {
  const bars = Array.from({ length: 120 }, (_, i) => {
    const seed = Math.sin(i * 0.5) * 0.5 + 0.5
    const s2 = Math.sin(i * 1.1 + 1) * 0.35 + 0.5
    return Math.max(0.1, Math.min(1, seed * 0.7 + s2 * 0.45))
  })
  return (
    <div className="flex items-center h-12 gap-px w-full">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-foreground/60" style={{ height: `${h * 100}%` }} />
      ))}
    </div>
  )
}

export default function BeatSheetPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setBeats = useProjectStore((s) => s.setBeats)
  const updateBeat = useProjectStore((s) => s.updateBeat)
  const takeSnapshot = useProjectStore((s) => s.takeSnapshot)
  const getNextVariationIndex = useProjectStore((s) => s.getNextVariationIndex)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)
  const def = MV_STEP_DEFS.beats

  const [selectedId, setSelectedId] = useState<string>("")
  const [regenerating, setRegenerating] = useState(false)

  useEffect(() => {
    if (hydrated && project && project.beatSheet.length === 0) {
      setBeats(projectId, beatVariations[0])
      setSelectedId(beatVariations[0][0].beatId)
    }
  }, [hydrated, project, projectId, setBeats])

  if (!hydrated || !project) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  const summary = resolveProjectSummary(projectId)
  const beats = project.beatSheet
  const song = project.songMetadata
  const totalDur = song?.durationSec ?? 203
  const selected = beats.find((b) => b.beatId === selectedId) ?? beats[0]
  const chars = project.characterBible
  const locs = project.worldBible?.locations ?? []

  const regenerate = () => {
    if (regenerating) return
    setRegenerating(true)
    takeSnapshot(projectId, "beats")
    setTimeout(() => {
      const nextIdx = getNextVariationIndex(projectId, "beats", beatVariations.length)
      const assigned = autoAssignCharacters(beatVariations[nextIdx], chars)
      setBeats(projectId, assigned)
      setSelectedId(assigned[0].beatId)
      setRegenerating(false)
      toast.success("Beat sheet regenerated")
    }, 1800)
  }

  const addBeat = () => {
    const last = beats[beats.length - 1]
    const newBeat: Beat = {
      beatId: `beat-${Date.now()}`,
      startTime: last?.endTime ?? "00:00",
      endTime: last?.endTime ?? "00:10",
      songSection: "Verse",
      visualAction: "New beat — describe visual action.",
      emotion: "Contemplative",
      characterIds: [],
      locationId: locs[0]?.id ?? "",
    }
    setBeats(projectId, [...beats, newBeat])
    setSelectedId(newBeat.beatId)
  }

  const delBeat = (id: string) => {
    const next = beats.filter((b) => b.beatId !== id)
    setBeats(projectId, next)
    if (selectedId === id && next.length > 0) setSelectedId(next[0].beatId)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="beats" completedThrough="style" />
      <MVProjectHeader project={summary} stepLabel={def.label} stepDescription={def.description} />

      <div className="max-w-6xl mx-auto w-full px-8 pb-16 flex-1 space-y-5">
        <section className="rounded-xl border border-border bg-card p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1">
              <List className="h-3 w-3" />
              Timeline View
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                {beats.length} beats · {Math.floor(totalDur / 60)}:{Math.floor(totalDur % 60).toString().padStart(2, "0")}
              </span>
              <button
                onClick={regenerate}
                disabled={regenerating}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:bg-muted transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("h-3 w-3", regenerating && "animate-spin")} />
                Regenerate
              </button>
            </div>
          </div>
          <WaveformBars />
          {song && (
            <div className="flex w-full h-6 rounded-md overflow-hidden">
              {song.segments.map((s, i) => {
                const width = ((s.end - s.start) / totalDur) * 100
                return (
                  <div
                    key={i}
                    className={cn("h-full flex items-center justify-center text-[10px] font-semibold text-white overflow-hidden whitespace-nowrap", segmentColors[s.type] ?? "bg-muted-foreground/40")}
                    style={{ width: `${width}%` }}
                  >
                    {width > 6 ? s.type : ""}
                  </div>
                )
              })}
            </div>
          )}
          <div className="relative h-8 rounded-md bg-muted/30">
            {beats.map((b) => {
              const start = (toSeconds(b.startTime) / totalDur) * 100
              const width = ((toSeconds(b.endTime) - toSeconds(b.startTime)) / totalDur) * 100
              return (
                <button
                  key={b.beatId}
                  onClick={() => setSelectedId(b.beatId)}
                  className={cn(
                    "absolute top-1 bottom-1 rounded border-2 text-[10px] font-semibold text-white transition-all flex items-center justify-center overflow-hidden whitespace-nowrap",
                    selectedId === b.beatId ? "border-accent bg-accent/80 z-10" : "border-foreground/30 bg-foreground/60 hover:bg-foreground/80"
                  )}
                  style={{ left: `${start}%`, width: `${Math.max(width, 1)}%` }}
                  title={`${b.startTime} — ${b.visualAction.slice(0, 60)}`}
                >
                  {width > 3 ? `#${beats.indexOf(b) + 1}` : ""}
                </button>
              )
            })}
          </div>
          {chars.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-border/50">
              {chars.map((c, ci) => {
                const presence = beats.filter((b) => b.characterIds.includes(c.id))
                return (
                  <div key={c.id} className="flex items-center gap-2">
                    <div className="w-24 shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground truncate">
                      <span className={cn("h-2 w-2 rounded-full shrink-0", characterColor(ci))} />
                      {c.name}
                    </div>
                    <div className="relative flex-1 h-3.5 rounded bg-muted/30">
                      {presence.map((b) => {
                        const start = (toSeconds(b.startTime) / totalDur) * 100
                        const width = ((toSeconds(b.endTime) - toSeconds(b.startTime)) / totalDur) * 100
                        return (
                          <div
                            key={b.beatId}
                            className={cn("absolute top-0 bottom-0 rounded-sm opacity-75", characterColor(ci))}
                            style={{ left: `${start}%`, width: `${Math.max(width, 0.5)}%` }}
                            title={`${c.name} — ${b.startTime}–${b.endTime}: ${b.visualAction.slice(0, 50)}`}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between border-b border-border">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Beat Table</h3>
            <div className="flex items-center gap-2">
              <button onClick={addBeat} className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:bg-muted transition-colors">
                <Plus className="h-3 w-3" />
                Add Beat
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 font-semibold">#</th>
                  <th className="text-left px-4 py-2 font-semibold">Time</th>
                  <th className="text-left px-4 py-2 font-semibold">Section</th>
                  <th className="text-left px-4 py-2 font-semibold">Visual Action</th>
                  <th className="text-left px-4 py-2 font-semibold">Emotion</th>
                  <th className="text-left px-4 py-2 font-semibold">Characters</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {beats.map((b, i) => (
                  <tr
                    key={b.beatId}
                    onClick={() => setSelectedId(b.beatId)}
                    className={cn(
                      "cursor-pointer border-b border-border/60 hover:bg-muted/40 transition-colors",
                      selectedId === b.beatId && "bg-accent/5"
                    )}
                  >
                    <td className="px-4 py-2 font-bold tabular-nums text-foreground/70">{i + 1}</td>
                    <td className="px-4 py-2 tabular-nums text-muted-foreground whitespace-nowrap">{b.startTime}–{b.endTime}</td>
                    <td className="px-4 py-2">
                      <span className={cn("px-1.5 py-0.5 rounded text-[11px] font-semibold text-white", segmentColors[b.songSection] ?? "bg-muted-foreground/40")}>
                        {b.songSection}
                      </span>
                    </td>
                    <td className="px-4 py-2 max-w-sm">
                      <span className="line-clamp-2 text-foreground/90">{b.visualAction}</span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{b.emotion}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {b.characterIds.length === 0 ? (
                          <span className="text-[11px] text-muted-foreground/50 italic">—</span>
                        ) : (
                          b.characterIds.map((id) => {
                            const idx = chars.findIndex((c) => c.id === id)
                            const char = chars[idx]
                            if (!char) return null
                            return (
                              <span
                                key={id}
                                className={cn(
                                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold text-white",
                                  characterColor(idx)
                                )}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                                {char.name}
                              </span>
                            )
                          })
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); delBeat(b.beatId) }}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <section className="rounded-xl border border-border bg-card p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Beat Detail
                <span className="ml-2 text-foreground normal-case tracking-normal">#{beats.indexOf(selected) + 1}</span>
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">
                {selected.startTime}–{selected.endTime}
              </span>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Visual Action
              </label>
              <textarea
                value={selected.visualAction}
                onChange={(e) => updateBeat(projectId, selected.beatId, { visualAction: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Emotion</label>
                <select
                  value={selected.emotion}
                  onChange={(e) => updateBeat(projectId, selected.beatId, { emotion: e.target.value as BeatEmotion })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                >
                  {emotions.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Location</label>
                <select
                  value={selected.locationId}
                  onChange={(e) => updateBeat(projectId, selected.beatId, { locationId: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                >
                  {locs.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Characters</label>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {chars.map((c) => {
                    const active = selected.characterIds.includes(c.id)
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          const ids = active
                            ? selected.characterIds.filter((x) => x !== c.id)
                            : [...selected.characterIds, c.id]
                          updateBeat(projectId, selected.beatId, { characterIds: ids })
                        }}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-semibold border transition-colors",
                          active ? "bg-accent/10 border-accent text-accent" : "bg-background border-border text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {c.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="beats"
        nextLabel="Generate Shot List"
        onBeforeNext={() => setCurrentStep(projectId, "shots")}
      />
    </div>
  )
}
