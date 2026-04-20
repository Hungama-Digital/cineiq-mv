/**
 * Client-side export helpers. Zero external deps — uses browser Blob + anchor
 * download pattern.
 *
 * Phase 5 will add real PDF storyboard generation. For now PDF button stubs.
 */

import { toast } from "sonner"
import type { MVProjectState, Shot } from "./types"

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function safeSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 40)
}

/* ── JSON export ──────────────────────────────────────────────────────────── */

export function exportProjectJson(project: MVProjectState) {
  const payload = {
    ...project,
    _exportedAt: new Date().toISOString(),
    _exportedFrom: "cineiqmv",
    _schemaVersion: "1.0",
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  })
  const filename = `cineiqmv-${safeSlug(project.title)}-${new Date()
    .toISOString()
    .slice(0, 10)}.json`
  downloadBlob(blob, filename)
  toast.success("Downloaded project JSON", { description: filename })
}

/* ── CSV export ───────────────────────────────────────────────────────────── */

function csvEscape(val: unknown): string {
  if (val === null || val === undefined) return ""
  const s = String(val)
  if (s.includes('"') || s.includes(",") || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export function exportShotListCsv(shots: Shot[], projectTitle: string) {
  const headers = [
    "shot_id",
    "beat_ref",
    "start_time",
    "end_time",
    "shot_type",
    "camera_movement",
    "description",
    "tool",
    "seedance_2_prompt",
    "veo_3_1_prompt",
    "kling_2_5_prompt",
    "negative_prompt",
    "motion_bucket",
    "seed",
    "consistency_applied",
  ]
  const rows = shots.map((s) => [
    s.shotId,
    s.beatRef,
    s.startTime,
    s.endTime,
    s.shotType,
    s.cameraMovement,
    s.description,
    s.genaiTool,
    s.prompts.seedance_2,
    s.prompts.veo_3_1,
    s.prompts.kling_2_5,
    s.negativePrompt,
    s.motionBucket,
    s.seed,
    s.consistencyApplied,
  ])
  const csv = [headers, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const filename = `cineiqmv-shots-${safeSlug(projectTitle)}-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`
  downloadBlob(blob, filename)
  toast.success("Downloaded shot list CSV", { description: filename })
}

/* ── PDF stub ─────────────────────────────────────────────────────────────── */

export function exportPdfStub() {
  toast.info("PDF storyboard coming in Phase 2", {
    description: "Use Export JSON for now — full state downloads.",
  })
}
