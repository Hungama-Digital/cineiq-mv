"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MV_STEP_DEFS, MV_STEP_ORDER, stepHref } from "@/lib/steps"
import { useProjectStore } from "@/lib/store"
import type { MVStepId } from "@/lib/types"

interface MVStepperProps {
  projectId: string
  currentStep: MVStepId
  /** Steps the user has completed — any step ≤ completed index is clickable back */
  completedThrough?: MVStepId
}

/**
 * Horizontal stepper for the 9-step music video pipeline.
 * - Completed steps: filled accent dot + check
 * - Current step: accent ring + bold label
 * - Locked (future) steps: muted, non-clickable
 */
export function MVStepper({ projectId, currentStep, completedThrough }: MVStepperProps) {
  const currentIdx = MV_STEP_ORDER.indexOf(currentStep)
  // Use the store's currentStep as the high-water mark so navigating backwards
  // never re-locks steps the user has already reached.
  const storeHighest = useProjectStore((s) => s.projects[projectId]?.currentStep)
  const highestIdx = storeHighest ? MV_STEP_ORDER.indexOf(storeHighest) : -1
  const propIdx = completedThrough ? MV_STEP_ORDER.indexOf(completedThrough) : currentIdx - 1
  const completedIdx = Math.max(highestIdx, propIdx)

  return (
    <div className="w-full border-b border-border bg-background/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <ol className="flex items-center gap-1 overflow-x-auto">
          {MV_STEP_ORDER.map((stepId, i) => {
            const def = MV_STEP_DEFS[stepId]
            const isCurrent = i === currentIdx
            const isCompleted = i <= completedIdx
            const isLocked = i > currentIdx && i > completedIdx + 1
            const clickable = !isLocked && !isCurrent

            const content = (
              <div
                className={cn(
                  "group flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap",
                  clickable && "hover:bg-muted cursor-pointer",
                  isLocked && "opacity-40 cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums",
                    isCompleted
                      ? "bg-accent text-accent-foreground"
                      : isCurrent
                        ? "ring-2 ring-accent bg-background text-accent"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "text-[13px]",
                    isCurrent
                      ? "font-semibold text-foreground"
                      : isCompleted
                        ? "font-medium text-foreground/85"
                        : "text-muted-foreground"
                  )}
                >
                  {def.shortLabel}
                </span>
              </div>
            )

            return (
              <li key={stepId} className="flex items-center">
                {clickable ? (
                  <Link href={stepHref(projectId, stepId)}>{content}</Link>
                ) : (
                  content
                )}
                {i < MV_STEP_ORDER.length - 1 && (
                  <span
                    className={cn(
                      "h-px w-4 shrink-0 mx-0.5",
                      i < completedIdx + 1 ? "bg-accent/50" : "bg-border"
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
