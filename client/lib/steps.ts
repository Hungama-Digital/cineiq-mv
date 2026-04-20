import type { MVStep, MVStepId } from "./types"
import { MV_STEPS } from "./types"

/**
 * Canonical stepper order, labels, and descriptions.
 * Linear flow: 1 → 2 → 3 → 4 → 5 → 6 → 6b → 7 → 8
 * (Internally "style" is treated as its own tick; UI may show it as 6b.)
 */
export const MV_STEP_DEFS: Record<MVStepId, MVStep> = {
  song: {
    id: "song",
    order: 1,
    label: "Song Intelligence",
    shortLabel: "Song",
    description: "Audio analysis, lyrics & structure",
  },
  concept: {
    id: "concept",
    order: 2,
    label: "Concept Ideation",
    shortLabel: "Concept",
    description: "Three concept directions",
  },
  architecture: {
    id: "architecture",
    order: 3,
    label: "Story Architecture",
    shortLabel: "Arc",
    description: "Single vs. multi-thread",
  },
  story: {
    id: "story",
    order: 4,
    label: "Story Generator",
    shortLabel: "Story",
    description: "Director's treatment",
  },
  characters: {
    id: "characters",
    order: 5,
    label: "Character Forge",
    shortLabel: "Characters",
    description: "Cast & visual specs",
  },
  world: {
    id: "world",
    order: 6,
    label: "World Builder",
    shortLabel: "World",
    description: "Locations & atmosphere",
  },
  style: {
    id: "style",
    order: 7,
    label: "Visual Style Lock",
    shortLabel: "Style",
    description: "Aesthetic DNA",
  },
  beats: {
    id: "beats",
    order: 8,
    label: "Beat Sheet",
    shortLabel: "Beats",
    description: "Time-coded action map",
  },
  shots: {
    id: "shots",
    order: 9,
    label: "Shot List & Prompts",
    shortLabel: "Shots",
    description: "GenAI-ready prompts",
  },
}

export const MV_STEP_ORDER: MVStepId[] = [...MV_STEPS]

export function nextStep(current: MVStepId): MVStepId | null {
  const idx = MV_STEP_ORDER.indexOf(current)
  return idx >= 0 && idx < MV_STEP_ORDER.length - 1 ? MV_STEP_ORDER[idx + 1] : null
}

export function prevStep(current: MVStepId): MVStepId | null {
  const idx = MV_STEP_ORDER.indexOf(current)
  return idx > 0 ? MV_STEP_ORDER[idx - 1] : null
}

export function stepHref(projectId: string, step: MVStepId) {
  return `/project/${projectId}/${step}`
}
