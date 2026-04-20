"use client"

import { useEffect, useState } from "react"
import { Upload, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface UploadSimulatorProps {
  onComplete: () => void
  title: string
  artist: string
}

const STAGES = [
  { label: "Uploading audio...", durationMs: 1500 },
  { label: "Detecting BPM and key...", durationMs: 900 },
  { label: "Transcribing lyrics...", durationMs: 1100 },
  { label: "Detecting structure...", durationMs: 800 },
] as const

/**
 * Shown on Song Intelligence screen when project has no songMetadata yet.
 * Fakes an audio upload + 3-stage analysis for CTO demo purposes.
 * Calls onComplete() after ~4.5 sec total which triggers the store to
 * populate song metadata from the dispatcher.
 */
export function UploadSimulator({ onComplete, title, artist }: UploadSimulatorProps) {
  const [stageIdx, setStageIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    let totalElapsed = 0
    const totalDuration = STAGES.reduce((s, st) => s + st.durationMs, 0)

    function runStage(idx: number) {
      if (cancelled || idx >= STAGES.length) {
        if (!cancelled) {
          toast.success("Audio analysis complete", {
            description: `${title} · ${artist}`,
          })
          onComplete()
        }
        return
      }
      setStageIdx(idx)
      const stage = STAGES[idx]
      const start = Date.now()

      const tick = () => {
        if (cancelled) return
        const dt = Date.now() - start
        const pct = Math.min(1, dt / stage.durationMs)
        const overallPct = ((totalElapsed + dt) / totalDuration) * 100
        setProgress(Math.min(100, overallPct))
        if (pct < 1) {
          requestAnimationFrame(tick)
        } else {
          totalElapsed += stage.durationMs
          runStage(idx + 1)
        }
      }
      tick()
    }
    runStage(0)
    return () => {
      cancelled = true
    }
  }, [onComplete, title, artist])

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Drop target (cosmetic) */}
        <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 px-8 py-10 text-center">
          <div className="h-14 w-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
            <Upload className="h-6 w-6 text-accent" />
          </div>
          <div className="text-base font-serif font-semibold text-foreground mb-1">
            {title}
          </div>
          <div className="text-sm text-muted-foreground">by {artist}</div>
        </div>

        {/* Overall progress bar */}
        <div>
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">
              Analyzing
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stage list */}
        <div className="space-y-2">
          {STAGES.map((s, i) => {
            const done = i < stageIdx
            const active = i === stageIdx
            return (
              <div
                key={s.label}
                className={cn(
                  "flex items-center gap-3 text-sm rounded-md px-3 py-2 transition-colors",
                  active && "bg-accent/5"
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                    done && "bg-accent text-accent-foreground",
                    active && "bg-accent/20",
                    !done && !active && "bg-muted"
                  )}
                >
                  {done && <Check className="h-3 w-3" strokeWidth={3} />}
                  {active && <Loader2 className="h-3 w-3 animate-spin text-accent" />}
                </div>
                <span
                  className={cn(
                    "flex-1",
                    done && "text-muted-foreground line-through",
                    active && "text-foreground font-medium",
                    !done && !active && "text-muted-foreground/60"
                  )}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
