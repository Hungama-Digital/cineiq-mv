"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { MV_STEP_DEFS, nextStep, prevStep, stepHref } from "@/lib/steps"
import type { MVStepId } from "@/lib/types"

interface Props {
  projectId: string
  currentStep: MVStepId
  /** Custom label for the forward button; defaults to "Continue to {next}" */
  nextLabel?: string
  /** Allow proceeding? Default true */
  canAdvance?: boolean
  /** Called before navigation — return false to cancel */
  onBeforeNext?: () => boolean | void
  /** Optional handler for the final step (when there is no next step) */
  onFinish?: () => void
}

/**
 * Sticky Back / Continue bar at the bottom of every step page.
 * On the last step, if `onFinish` is provided the primary button becomes
 * an active "Finish" action (enabled + green) instead of being disabled.
 */
export function MVStepNav({
  projectId,
  currentStep,
  nextLabel,
  canAdvance = true,
  onBeforeNext,
  onFinish,
}: Props) {
  const router = useRouter()
  const prev = prevStep(currentStep)
  const next = nextStep(currentStep)
  const isFinishStep = !next && !!onFinish

  const handleNext = () => {
    if (onBeforeNext && onBeforeNext() === false) return
    if (next) {
      router.push(stepHref(projectId, next))
    } else if (onFinish) {
      onFinish()
    }
  }

  const handleBack = () => {
    if (prev) router.push(stepHref(projectId, prev))
    else router.push("/dashboard")
  }

  const nextDef = next ? MV_STEP_DEFS[next] : null
  const defaultNextLabel = nextDef ? `Continue to ${nextDef.label}` : "Finish"

  const primaryDisabled = !canAdvance || (!next && !onFinish)
  const primaryActive = canAdvance && (next || isFinishStep)

  return (
    <div className="sticky bottom-0 border-t border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={primaryDisabled}
          className={cn(
            "flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all",
            primaryActive
              ? "hover:brightness-110 active:scale-[0.98]"
              : "opacity-40 cursor-not-allowed"
          )}
        >
          {nextLabel ?? defaultNextLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
