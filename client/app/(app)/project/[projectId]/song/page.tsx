"use client"

import { use, useState } from "react"
import { Play, Pause, ZoomIn, ZoomOut, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MVStepper } from "@/components/mv-stepper"
import { MVProjectHeader } from "@/components/mv-project-header"
import { MVStepNav } from "@/components/mv-step-nav"
import { UploadSimulator } from "@/components/upload-simulator"
import { resolveProjectSummary } from "@/lib/resolve-project"
import { MV_STEP_DEFS } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import { dispatchMockSongAnalysis } from "@/lib/mock-dispatcher"

const segmentColors: Record<string, string> = {
  Intro: "bg-slate-400/60 dark:bg-slate-600/60",
  Verse: "bg-blue-400/70 dark:bg-blue-600/60",
  "Pre-Chorus": "bg-violet-400/70 dark:bg-violet-600/60",
  Chorus: "bg-accent",
  Bridge: "bg-amber-400/70 dark:bg-amber-600/60",
  Instrumental: "bg-teal-400/70 dark:bg-teal-600/60",
  Outro: "bg-rose-400/60 dark:bg-rose-600/60",
}

function WaveformBars() {
  const bars = Array.from({ length: 180 }, (_, i) => {
    const seed = Math.sin(i * 0.37) * 0.5 + 0.5
    const secondary = Math.sin(i * 1.3 + 2) * 0.35 + 0.5
    return Math.max(0.08, Math.min(1, seed * 0.7 + secondary * 0.45))
  })
  return (
    <div className="flex items-center h-24 gap-px w-full">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-foreground/70" style={{ height: `${h * 100}%` }} />
      ))}
    </div>
  )
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-semibold tabular-nums text-foreground">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-foreground/70" style={{ width: `${Math.round(value * 100)}%` }} />
      </div>
    </div>
  )
}

export default function SongIntelligencePage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const hydrated = useProjectStore((s) => s.hydrated)
  const project = useProjectStore((s) => s.projects[projectId])
  const setSongMetadata = useProjectStore((s) => s.setSongMetadata)
  const updateSongMetadata = useProjectStore((s) => s.updateSongMetadata)
  const setCurrentStep = useProjectStore((s) => s.setCurrentStep)

  const [playing, setPlaying] = useState(false)
  const [newTag, setNewTag] = useState("")

  if (!hydrated) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>
  }

  // If project doesn't exist, fall back — user typed a bad URL
  const summary = resolveProjectSummary(projectId)

  // If no song metadata yet → show upload simulator
  if (!project?.songMetadata) {
    return (
      <div className="flex flex-col min-h-screen">
        <MVStepper projectId={projectId} currentStep="song" />
        <MVProjectHeader
          project={summary}
          stepLabel="Song Intelligence"
          stepDescription="Audio analysis, lyrics & structure"
        />
        <UploadSimulator
          title={summary.title}
          artist={summary.artist === "—" ? "Unknown" : summary.artist}
          onComplete={() => {
            const meta = dispatchMockSongAnalysis({
              title: summary.title,
              artist: summary.artist === "—" ? "Unknown" : summary.artist,
              language: summary.language === "—" ? "Hindi" : summary.language,
            })
            setSongMetadata(projectId, meta)
            setCurrentStep(projectId, "song")
          }}
        />
      </div>
    )
  }

  const song = project.songMetadata
  const def = MV_STEP_DEFS.song
  const totalDur = song.durationSec
  const moodTags = song.moodTags

  const removeTag = (t: string) =>
    updateSongMetadata(projectId, { moodTags: moodTags.filter((x) => x !== t) })
  const addTag = () => {
    const t = newTag.trim()
    if (!t || moodTags.includes(t)) return
    updateSongMetadata(projectId, { moodTags: [...moodTags, t] })
    setNewTag("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MVStepper projectId={projectId} currentStep="song" />
      <MVProjectHeader
        project={{
          ...summary,
          title: song.title,
          artist: song.artist,
          language: song.language,
          durationSec: song.durationSec,
        }}
        stepLabel={def.label}
        stepDescription={def.description}
      />

      <div className="max-w-6xl mx-auto w-full px-8 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="space-y-5">
            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Song Metadata
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">Title</label>
                  <input
                    value={song.title}
                    onChange={(e) => updateSongMetadata(projectId, { title: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground block mb-1">Artist</label>
                  <input
                    value={song.artist}
                    onChange={(e) => updateSongMetadata(projectId, { artist: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">Language</label>
                    <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                      {song.language}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">Duration</label>
                    <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm tabular-nums">
                      {fmtTime(totalDur)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">
                Analysis Summary
              </h3>
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-[11px] text-muted-foreground font-semibold">BPM</div>
                  <div className="text-3xl font-serif tabular-nums text-foreground">
                    {song.bpm.toFixed(1)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-muted-foreground font-semibold">Key</div>
                  <div className="text-2xl font-serif tabular-nums text-foreground">
                    {song.keyCamelot}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <MetricBar label="Energy" value={song.energy} />
                <MetricBar label="Valence" value={song.valence} />
                <MetricBar label="Danceability" value={song.danceability} />
                <MetricBar label="Instrumentalness" value={song.instrumentalness} />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Mood Tags
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {moodTags.map((t) => (
                  <span key={t} className="group inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2.5 py-1 text-xs font-semibold">
                    {t}
                    <button onClick={() => removeTag(t)} className="opacity-60 hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add mood tag..."
                  className="flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
                />
                <button onClick={addTag} className="rounded-md bg-muted hover:bg-muted/70 px-2 transition-colors">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Waveform</h3>
                <div className="flex gap-1">
                  <button className="rounded-md p-1.5 hover:bg-muted transition-colors"><ZoomIn className="h-3.5 w-3.5" /></button>
                  <button className="rounded-md p-1.5 hover:bg-muted transition-colors"><ZoomOut className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <WaveformBars />
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background hover:brightness-110 transition-all"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>
                <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: "0%" }} />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums font-medium">
                  0:00 / {fmtTime(totalDur)}
                </span>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Structural Segmentation
              </h3>
              <div className="flex w-full h-8 rounded-md overflow-hidden">
                {song.segments.map((s, i) => {
                  const width = ((s.end - s.start) / totalDur) * 100
                  const color = segmentColors[s.type] ?? "bg-muted-foreground/40"
                  return (
                    <div
                      key={i}
                      className={cn("h-full flex items-center justify-center text-[10px] font-semibold text-white overflow-hidden whitespace-nowrap", color)}
                      style={{ width: `${width}%` }}
                      title={`${s.type} · ${fmtTime(s.start)}–${fmtTime(s.end)}`}
                    >
                      {width > 6 ? s.type : ""}
                    </div>
                  )
                })}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground font-medium">
                {song.segments.map((s, i) => (
                  <span key={i} className="tabular-nums">
                    {fmtTime(s.start)} {s.type}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Lyrics (time-synced)
              </h3>
              <div className="max-h-72 overflow-y-auto space-y-1 rounded-md bg-muted/20 p-3">
                {song.lyrics.map((line, i) => (
                  <div key={i} className="flex gap-3 text-sm hover:bg-muted/60 rounded px-2 py-1 transition-colors cursor-text">
                    <span className="text-xs tabular-nums text-muted-foreground/80 font-medium w-12 shrink-0 pt-0.5">
                      {fmtTime(line.start)}
                    </span>
                    <span className="text-foreground">&ldquo;{line.text}&rdquo;</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-md">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                Core Metaphor
              </h3>
              <textarea
                value={song.coreMetaphor}
                onChange={(e) => updateSongMetadata(projectId, { coreMetaphor: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-serif italic focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 resize-none"
              />
            </section>
          </div>
        </div>
      </div>

      <MVStepNav
        projectId={projectId}
        currentStep="song"
        nextLabel="Save & Continue to Concept"
        onBeforeNext={() => {
          setCurrentStep(projectId, "concept")
        }}
      />
    </div>
  )
}
