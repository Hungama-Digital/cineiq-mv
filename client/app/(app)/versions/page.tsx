"use client"

import { History, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { useProjectStore } from "@/lib/store"
import { MV_STEP_DEFS } from "@/lib/steps"

export default function VersionsPage() {
  const hydrated = useProjectStore((s) => s.hydrated)
  const versions = useProjectStore((s) => s.versions)
  const projects = useProjectStore((s) => s.projects)
  const restoreSnapshot = useProjectStore((s) => s.restoreSnapshot)

  if (!hydrated) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>

  // Flatten all versions across projects, sort by takenAt desc
  const all = Object.values(versions)
    .flat()
    .sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime())

  // Group by date
  const grouped = all.reduce((acc: Record<string, typeof all>, v) => {
    const date = new Date(v.takenAt).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(v)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto px-8 pt-8 pb-16">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <History className="h-5 w-5 text-accent" />
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Version History
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {all.length} snapshots across {Object.keys(versions).length} projects
        </p>
      </div>

      {all.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border">
          <History className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            No versions yet. Every time you regenerate a step, a snapshot is saved here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, list]) => (
            <div key={date}>
              <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 pb-1 border-b border-border">
                {date}
              </div>
              <div className="space-y-2">
                {list.map((v) => {
                  const project = projects[v.projectId]
                  const stepDef = MV_STEP_DEFS[v.step]
                  return (
                    <div
                      key={v.id}
                      className="rounded-lg border border-border bg-card shadow-sm px-4 py-3 flex items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-serif font-semibold text-foreground truncate">
                            {project?.title ?? "Deleted project"}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                            {stepDef.shortLabel}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            v{v.versionNumber}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {new Date(v.takenAt).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const ok = restoreSnapshot(v.id)
                          if (ok) toast.success("Version restored")
                        }}
                        className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-muted transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Restore
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
