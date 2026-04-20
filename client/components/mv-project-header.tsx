"use client"

import { Music } from "lucide-react"
import { AutosaveIndicator } from "@/components/autosave-indicator"
import type { MVProjectSummary } from "@/lib/types"

interface Props {
  project: MVProjectSummary
  stepLabel: string
  stepDescription: string
}

/**
 * Compact header shown on every step page:
 * - Cover swatch + song title + artist (left)
 * - Current step title + description (center)
 * - Autosave indicator (right)
 */
export function MVProjectHeader({ project, stepLabel, stepDescription }: Props) {
  const minutes = Math.floor(project.durationSec / 60)
  const seconds = Math.round(project.durationSec % 60)

  return (
    <div className="max-w-6xl mx-auto px-8 pt-6 pb-4 flex items-start justify-between gap-6">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="h-11 w-11 shrink-0 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: project.coverColorHex }}
        >
          <Music className="h-5 w-5 text-white/80" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
            <span className="uppercase tracking-wider font-semibold">Music Video</span>
            <span>·</span>
            <span>{project.language}</span>
            <span>·</span>
            <span className="tabular-nums">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <h2 className="text-base font-semibold text-foreground truncate">
            <span className="font-serif">{project.title}</span>
            <span className="text-muted-foreground font-sans font-normal">
              {" "}
              — {project.artist}
            </span>
          </h2>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
          {stepLabel}
        </div>
        <div className="text-[13px] text-foreground/80 font-medium">{stepDescription}</div>
      </div>

      <div className="shrink-0">
        <AutosaveIndicator status="saved" />
      </div>
    </div>
  )
}
