"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Music,
  Plus,
  Search,
  Upload,
  Clock,
  ArrowRight,
  Library,
  Trash2,
  Download,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MV_STEP_DEFS } from "@/lib/steps"
import { MV_LANGUAGES } from "@/lib/types"
import { useProjectStore } from "@/lib/store"
import { exportProjectJson } from "@/lib/export"

const stepColors: Record<string, string> = {
  song: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  concept: "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  architecture: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
  story: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  characters: "bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400",
  world: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  style: "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
  beats: "bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400",
  shots: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
}

function fmtDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.round(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function fmtRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "just now"
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newArtist, setNewArtist] = useState("")
  const [newLang, setNewLang] = useState<string>("Hindi")

  // Auto-open the create dialog when sidebar sends us here with ?new=1
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setDialogOpen(true)
      // Clear the param so a refresh doesn't keep reopening it
      router.replace("/dashboard", { scroll: false })
    }
  }, [searchParams, router])

  const hydrated = useProjectStore((s) => s.hydrated)
  // Select raw record only — derive the summary list via useMemo to keep
  // reference stable across renders (avoids Zustand infinite-loop warning).
  const projectsMap = useProjectStore((s) => s.projects)
  const createProject = useProjectStore((s) => s.createProject)
  const deleteProject = useProjectStore((s) => s.deleteProject)
  const getProject = useProjectStore((s) => s.getProject)

  const projects = useMemo(
    () =>
      Object.values(projectsMap)
        .map((p) => ({
          id: p.projectId,
          title: p.title,
          artist: p.songMetadata?.artist ?? "—",
          language: p.songMetadata?.language ?? "—",
          durationSec: p.songMetadata?.durationSec ?? 0,
          currentStep: p.currentStep,
          status: p.status,
          coverColorHex: p.coverColorHex,
          updatedAt: p.updatedAt,
        }))
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
    [projectsMap]
  )

  const filtered = useMemo(() => {
    if (!search.trim()) return projects
    const q = search.toLowerCase()
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.artist.toLowerCase().includes(q)
    )
  }, [projects, search])

  const handleCreate = () => {
    if (!newTitle.trim() || !newArtist.trim()) return
    const id = createProject({
      title: newTitle.trim(),
      artist: newArtist.trim(),
      language: newLang,
    })
    setDialogOpen(false)
    setNewTitle("")
    setNewArtist("")
    toast.success("Project created", { description: newTitle.trim() })
    router.push(`/project/${id}/song`)
  }

  const handleDelete = (id: string, title: string) => {
    deleteProject(id)
    toast.success("Project deleted", { description: title })
  }

  const handleExport = (id: string) => {
    const p = getProject(id)
    if (p) exportProjectJson(p)
  }

  // Avoid SSR mismatch — show nothing until hydrated
  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-8 pt-8 pb-16">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Music className="h-5 w-5 text-accent animate-pulse" />
          Loading projects…
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-8 pt-8 pb-16">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Music className="h-5 w-5 text-accent" />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Music Video Studio
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {projects.length} projects · AI-powered 8-step creation pipeline
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 active:scale-[0.98]">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              New Music Video
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">Create Music Video Project</DialogTitle>
              <DialogDescription>
                Enter song metadata. We&apos;ll analyze the audio on the next screen.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Song Title
                </label>
                <Input
                  placeholder="e.g., Chaleya"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Artist
                </label>
                <Input
                  placeholder="e.g., Arijit Singh"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Language
                </label>
                <Select value={newLang} onValueChange={setNewLang}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MV_LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center">
                <Upload className="mx-auto h-5 w-5 text-muted-foreground/60 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">
                  Audio upload + analysis runs on next screen
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  ~4 sec analysis — BPM, key, lyrics, structure
                </p>
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={() => setDialogOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newTitle.trim() || !newArtist.trim()}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Song Intelligence
                <ArrowRight className="inline ml-1.5 h-3 w-3" />
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative flex-1 max-w-xs mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border">
          <Library className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            {search ? "No projects match your search." : "No projects yet. Create your first music video above."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => {
            const stepDef = MV_STEP_DEFS[p.currentStep]
            const stepIdx = stepDef.order
            const stepClass = stepColors[p.currentStep] ?? stepColors.song
            return (
              <div
                key={p.id}
                onClick={() => router.push(`/project/${p.id}/${p.currentStep}`)}
                className="group relative rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-accent/30 hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: p.coverColorHex }}
                  >
                    <Music className="h-5 w-5 text-white/80" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-[14px] font-semibold text-foreground truncate font-serif">
                        {p.title}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider",
                          stepClass
                        )}
                      >
                        {stepDef.shortLabel}
                      </span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-2.5">
                      {p.artist} &middot; {p.language} &middot;{" "}
                      {p.durationSec > 0 ? fmtDuration(p.durationSec) : "—"}
                    </p>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1.5 flex-1 rounded-full",
                            i < stepIdx - 1
                              ? "bg-accent"
                              : i === stepIdx - 1
                                ? "bg-accent/40"
                                : "bg-border"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {fmtRelative(p.updatedAt)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step {stepIdx} / 9
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleExport(p.id)
                        }}
                        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Export JSON"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm(`Delete "${p.title}"?`)) {
                            handleDelete(p.id, p.title)
                          }
                        }}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/project/${p.id}/${p.currentStep}`)
                        }}
                        className="flex items-center gap-1 ml-2 text-sm font-semibold text-accent"
                      >
                        Open
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
