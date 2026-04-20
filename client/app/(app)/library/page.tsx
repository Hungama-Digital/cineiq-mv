"use client"

import { Library, Music, Clock } from "lucide-react"
import { useProjectStore } from "@/lib/store"

/**
 * Song Library — all songs uploaded across all projects.
 * For demo: flatten projects' songMetadata into a grid view.
 */
export default function LibraryPage() {
  const hydrated = useProjectStore((s) => s.hydrated)
  const projects = useProjectStore((s) => s.projects)

  if (!hydrated) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>

  const songs = Object.values(projects)
    .filter((p) => p.songMetadata)
    .map((p) => ({
      projectId: p.projectId,
      title: p.songMetadata!.title,
      artist: p.songMetadata!.artist,
      language: p.songMetadata!.language,
      durationSec: p.songMetadata!.durationSec,
      bpm: p.songMetadata!.bpm,
      key: p.songMetadata!.keyCamelot,
      coverColor: p.coverColorHex,
      addedAt: p.createdAt,
    }))

  return (
    <div className="max-w-5xl mx-auto px-8 pt-8 pb-16">
      <div className="mb-6 flex items-center gap-2">
        <Library className="h-5 w-5 text-accent" />
        <h1 className="text-xl font-semibold text-foreground tracking-tight">Song Library</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {songs.length} songs analyzed across all projects
      </p>

      {songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl border border-dashed border-border">
          <Music className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            No songs yet. Create a project to upload your first song.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((s) => {
            const min = Math.floor(s.durationSec / 60)
            const sec = Math.round(s.durationSec % 60)
            return (
              <div
                key={s.projectId}
                className="rounded-xl border border-border bg-card shadow-md overflow-hidden hover:border-accent/40 transition-all"
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{ backgroundColor: s.coverColor }}
                >
                  <Music className="h-12 w-12 text-white/60" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="font-serif font-bold text-base text-foreground truncate">
                    {s.title}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">{s.artist}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{s.language}</span>
                    <span className="tabular-nums">
                      {min}:{sec.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-border text-[11px]">
                    <span className="px-1.5 py-0.5 rounded bg-muted font-semibold text-foreground">
                      BPM {s.bpm.toFixed(0)}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-muted font-semibold text-foreground">
                      Key {s.key}
                    </span>
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
