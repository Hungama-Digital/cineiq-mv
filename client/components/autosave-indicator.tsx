"use client"

import { Check, Cloud, CloudOff, Loader2 } from "lucide-react"

type AutosaveStatus = "saved" | "saving" | "offline"

export function AutosaveIndicator({ status = "saved" }: { status?: AutosaveStatus }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {status === "saving" && (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Saving...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="h-3 w-3 text-success" />
          <span>Saved just now</span>
        </>
      )}
      {status === "offline" && (
        <>
          <CloudOff className="h-3 w-3 text-warning" />
          <span>Offline changes pending</span>
        </>
      )}
    </div>
  )
}
