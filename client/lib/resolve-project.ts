/**
 * Project summary resolver — reads from the Zustand store (Phase 1.5+).
 *
 * Falls back to a synthesized draft if the project ID isn't known yet
 * (e.g. user refreshes on a URL with an ID that hasn't been persisted).
 */

import type { MVProjectSummary } from "./types"
import { useProjectStore } from "./store"

export function resolveProjectSummary(projectId: string): MVProjectSummary {
  const state = useProjectStore.getState()
  const p = state.projects[projectId]
  if (p) {
    return {
      id: p.projectId,
      title: p.title,
      artist: p.songMetadata?.artist ?? "—",
      language: p.songMetadata?.language ?? "—",
      durationSec: p.songMetadata?.durationSec ?? 0,
      currentStep: p.currentStep,
      status: p.status,
      coverColorHex: p.coverColorHex,
      updatedAt: p.updatedAt,
    }
  }

  return {
    id: projectId,
    title: "Untitled",
    artist: "—",
    language: "Hindi",
    durationSec: 0,
    currentStep: "song",
    status: "draft",
    coverColorHex: "#3a3a3a",
    updatedAt: new Date().toISOString(),
  }
}
