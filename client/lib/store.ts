/**
 * cineiqmv — Global Zustand store
 *
 * Single source of truth for all project state. Replaces per-page useState.
 * Persists to localStorage via zustand/persist middleware so reload preserves flow.
 *
 * Phase 1.5: mock-variation-driven. Phase 2: action bodies swap to fetch() calls.
 */

"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type {
  Beat,
  CharacterBibleEntry,
  ConceptCard,
  Location,
  MVProjectState,
  MVProjectStatus,
  MVProjectSummary,
  MVStepId,
  Shot,
  SongMetadata,
  StoryArchitecture,
  StoryTreatment,
  VisualStyleGuide,
  WorldBible,
} from "./types"
import {
  mvMockProjects,
  mvMockFullProject,
  mvMockFullProjectLev,
  mvMockSongMetadata,
  mvMockConcepts,
  mvMockArchitecture,
  mvMockTreatment,
  mvMockCharacters,
  mvMockWorld,
  mvMockStyle,
  mvMockBeats,
  mvMockShots,
} from "./mock-data"

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface VersionSnapshot {
  id: string
  projectId: string
  step: MVStepId
  versionNumber: number
  takenAt: string // ISO
  snapshot: unknown // step-specific payload
}

interface ProjectStore {
  projects: Record<string, MVProjectState>
  versions: Record<string, VersionSnapshot[]> // projectId → snapshots
  variationIdx: Record<string, Record<MVStepId, number>> // projectId → step → current variation index
  hydrated: boolean // becomes true after localStorage rehydrate
  setHydrated: (v: boolean) => void

  /* ── Lifecycle ───────────────────────────────────────────────────────── */
  createProject(meta: { title: string; artist: string; language: string }): string
  deleteProject(id: string): void
  getProject(id: string): MVProjectState | null
  listProjects(): MVProjectSummary[]
  seedDefaults(): void

  /* ── Step mutations ──────────────────────────────────────────────────── */
  setSongMetadata(id: string, meta: SongMetadata): void
  updateSongMetadata(id: string, patch: Partial<SongMetadata>): void
  setSelectedConcept(id: string, concept: ConceptCard | null): void
  updateConceptInList(id: string, conceptId: string, patch: Partial<ConceptCard>): void
  setConceptList(id: string, list: ConceptCard[]): void
  setArchitecture(id: string, arch: StoryArchitecture): void
  updateTreatment(id: string, patch: Partial<StoryTreatment>): void
  setCharacters(id: string, chars: CharacterBibleEntry[]): void
  updateCharacter(id: string, charId: string, patch: Partial<CharacterBibleEntry>): void
  addCharacter(id: string, char: CharacterBibleEntry): void
  removeCharacter(id: string, charId: string): void
  setWorld(id: string, world: WorldBible): void
  updateLocation(id: string, locId: string, patch: Partial<Location>): void
  setStyleGuide(id: string, style: VisualStyleGuide): void
  updateStyleGuide(id: string, patch: Partial<VisualStyleGuide>): void
  setBeats(id: string, beats: Beat[]): void
  updateBeat(id: string, beatId: string, patch: Partial<Beat>): void
  setShots(id: string, shots: Shot[]): void
  updateShot(id: string, shotId: string, patch: Partial<Shot>): void

  setCurrentStep(id: string, step: MVStepId): void
  setStatus(id: string, status: MVProjectStatus): void

  /* ── Variation rotation (Phase 1.5 regenerate magic) ─────────────────── */
  getNextVariationIndex(id: string, step: MVStepId, totalVariations: number): number

  /* ── Version history ─────────────────────────────────────────────────── */
  takeSnapshot(projectId: string, step: MVStepId, label?: string): VersionSnapshot
  listVersions(projectId: string, step?: MVStepId): VersionSnapshot[]
  restoreSnapshot(snapshotId: string): boolean
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function randomId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function nowIso() {
  return new Date().toISOString()
}

function buildEmptyProject(
  id: string,
  meta: { title: string; artist: string; language: string }
): MVProjectState {
  return {
    projectId: id,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    currentStep: "song",
    title: meta.title,
    status: "draft",
    coverColorHex: pickCoverColor(meta.language),
    songMetadata: null,
    selectedConcept: null,
    storyArchitecture: null,
    storyTreatment: null,
    characterBible: [],
    worldBible: null,
    visualStyleGuide: null,
    beatSheet: [],
    shotList: [],
    globalNegativePrompt:
      "deformed hands, blurry faces, text artifacts, extra limbs, nudity, culturally insensitive imagery",
    publishingMetadata: null,
  }
}

function pickCoverColor(language: string) {
  const palette: Record<string, string> = {
    English: "#313c48",
    Hindi: "#6b3a2e",
    Punjabi: "#2e4a3a",
    Tamil: "#3e2a4a",
    Telugu: "#2e3f4a",
    Marathi: "#4a3a2e",
  }
  return palette[language] ?? "#3a3a3a"
}

/** Build the seed "Levitating" project state (fully populated, mirrors Phase 1 demo) */
function buildSeedLevitatingProject(): MVProjectState {
  return {
    ...mvMockFullProject,
    createdAt: mvMockFullProject.createdAt,
    updatedAt: mvMockFullProject.updatedAt,
  }
}

/* ── Store ────────────────────────────────────────────────────────────────── */

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: {},
      versions: {},
      variationIdx: {},
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),

      /* ── Lifecycle ─────────────────────────────────────────────────── */

      seedDefaults: () => {
        const state = get()
        if (Object.keys(state.projects).length > 0) return // already seeded

        const seeded: Record<string, MVProjectState> = {}
        // Give "Levitating" (mv-1) the full demo state
        seeded["mv-1"] = buildSeedLevitatingProject()
        // Give "Levitating" Dua Lipa (mv-lev-1) the full rich state
        seeded["mv-lev-1"] = { ...mvMockFullProjectLev }
        // Other mock projects → empty-ish states matching their summary's currentStep
        mvMockProjects.forEach((p) => {
          if (p.id === "mv-1") return
          seeded[p.id] = {
            projectId: p.id,
            createdAt: p.updatedAt,
            updatedAt: p.updatedAt,
            currentStep: p.currentStep,
            title: p.title,
            status: p.status,
            coverColorHex: p.coverColorHex,
            // These songs haven't been analyzed yet — leave blank
            songMetadata:
              p.id === "mv-2" || p.id === "mv-3" || p.id === "mv-6"
                ? { ...mvMockSongMetadata, title: p.title, artist: p.artist, language: p.language }
                : null,
            selectedConcept: null,
            storyArchitecture: null,
            storyTreatment: null,
            characterBible: [],
            worldBible: null,
            visualStyleGuide: null,
            beatSheet: [],
            shotList: [],
            globalNegativePrompt: "",
            publishingMetadata: null,
          }
        })
        set({ projects: seeded })
      },

      createProject: (meta) => {
        const id = randomId("mv")
        const state = get()
        const next: MVProjectState = buildEmptyProject(id, meta)
        set({
          projects: { ...state.projects, [id]: next },
        })
        return id
      },

      deleteProject: (id) => {
        const state = get()
        const { [id]: _, ...rest } = state.projects
        const { [id]: __, ...restVersions } = state.versions
        const { [id]: ___, ...restVariations } = state.variationIdx
        set({ projects: rest, versions: restVersions, variationIdx: restVariations })
      },

      getProject: (id) => get().projects[id] ?? null,

      listProjects: () => {
        const { projects } = get()
        return Object.values(projects)
          .map<MVProjectSummary>((p) => ({
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
          )
      },

      /* ── Mutation helpers ───────────────────────────────────────────── */

      setSongMetadata: (id, meta) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, songMetadata: meta, updatedAt: nowIso() },
            },
          }
        }),

      updateSongMetadata: (id, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p || !p.songMetadata) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                songMetadata: { ...p.songMetadata, ...patch },
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setSelectedConcept: (id, concept) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, selectedConcept: concept, updatedAt: nowIso() },
            },
          }
        }),

      setConceptList: (id, list) =>
        // Not part of MVProjectState directly — cached on project for demo purposes.
        // We store on selectedConcept.concepts? No — use a side table.
        // For simplicity, we'll attach list to project via `any` extension.
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                // Demo-only side field (not in MVProjectState type — loose excess-prop checking)
                _conceptList: list,
                updatedAt: nowIso(),
              },
            },
          }
        }),

      updateConceptInList: (id, conceptId, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          // @ts-expect-error — demo field (read)
          const list = (p._conceptList as ConceptCard[] | undefined) ?? []
          const next = list.map((c) => (c.id === conceptId ? { ...c, ...patch } : c))
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                _conceptList: next,
                selectedConcept:
                  p.selectedConcept?.id === conceptId
                    ? { ...p.selectedConcept, ...patch }
                    : p.selectedConcept,
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setArchitecture: (id, arch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, storyArchitecture: arch, updatedAt: nowIso() },
            },
          }
        }),

      updateTreatment: (id, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          const base: StoryTreatment = p.storyTreatment ?? { version: 1, content: "", approved: false }
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, storyTreatment: { ...base, ...patch }, updatedAt: nowIso() },
            },
          }
        }),

      setCharacters: (id, chars) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, characterBible: chars, updatedAt: nowIso() },
            },
          }
        }),

      updateCharacter: (id, charId, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                characterBible: p.characterBible.map((c) =>
                  c.id === charId ? { ...c, ...patch } : c
                ),
                updatedAt: nowIso(),
              },
            },
          }
        }),

      addCharacter: (id, char) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, characterBible: [...p.characterBible, char], updatedAt: nowIso() },
            },
          }
        }),

      removeCharacter: (id, charId) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                characterBible: p.characterBible.filter((c) => c.id !== charId),
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setWorld: (id, world) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, worldBible: world, updatedAt: nowIso() },
            },
          }
        }),

      updateLocation: (id, locId, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p || !p.worldBible) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                worldBible: {
                  ...p.worldBible,
                  locations: p.worldBible.locations.map((l) =>
                    l.id === locId ? { ...l, ...patch } : l
                  ),
                },
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setStyleGuide: (id, style) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, visualStyleGuide: style, updatedAt: nowIso() },
            },
          }
        }),

      updateStyleGuide: (id, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          const base = p.visualStyleGuide ?? mvMockStyle
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, visualStyleGuide: { ...base, ...patch }, updatedAt: nowIso() },
            },
          }
        }),

      setBeats: (id, beats) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, beatSheet: beats, updatedAt: nowIso() },
            },
          }
        }),

      updateBeat: (id, beatId, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                beatSheet: p.beatSheet.map((b) => (b.beatId === beatId ? { ...b, ...patch } : b)),
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setShots: (id, shots) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, shotList: shots, updatedAt: nowIso() },
            },
          }
        }),

      updateShot: (id, shotId, patch) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: {
                ...p,
                shotList: p.shotList.map((s2) => (s2.shotId === shotId ? { ...s2, ...patch } : s2)),
                updatedAt: nowIso(),
              },
            },
          }
        }),

      setCurrentStep: (id, step) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, currentStep: step, updatedAt: nowIso() },
            },
          }
        }),

      setStatus: (id, status) =>
        set((s) => {
          const p = s.projects[id]
          if (!p) return s
          return {
            projects: {
              ...s.projects,
              [id]: { ...p, status, updatedAt: nowIso() },
            },
          }
        }),

      /* ── Variation rotation ─────────────────────────────────────────── */

      getNextVariationIndex: (id, step, totalVariations) => {
        const current = get().variationIdx[id]?.[step] ?? 0
        const next = (current + 1) % Math.max(totalVariations, 1)
        set((s) => ({
          variationIdx: {
            ...s.variationIdx,
            [id]: { ...(s.variationIdx[id] ?? {}), [step]: next },
          } as ProjectStore["variationIdx"],
        }))
        return next
      },

      /* ── Version history ────────────────────────────────────────────── */

      takeSnapshot: (projectId, step) => {
        const p = get().projects[projectId]
        const snapId = randomId("ver")
        const stepPayload = extractStepPayload(p, step)
        const snap: VersionSnapshot = {
          id: snapId,
          projectId,
          step,
          versionNumber: (get().versions[projectId]?.filter((v) => v.step === step).length ?? 0) + 1,
          takenAt: nowIso(),
          snapshot: stepPayload,
        }
        set((s) => {
          const list = s.versions[projectId] ?? []
          // Cap at 10 per step FIFO
          const filtered = list.filter((v) => v.step !== step).concat(list.filter((v) => v.step === step).slice(-9))
          return {
            versions: { ...s.versions, [projectId]: [...filtered, snap] },
          }
        })
        return snap
      },

      listVersions: (projectId, step) => {
        const all = get().versions[projectId] ?? []
        return step ? all.filter((v) => v.step === step) : all
      },

      restoreSnapshot: (snapshotId) => {
        const allVersions = get().versions
        let found: VersionSnapshot | null = null
        for (const list of Object.values(allVersions)) {
          const match = list.find((v) => v.id === snapshotId)
          if (match) {
            found = match
            break
          }
        }
        if (!found) return false
        applyStepPayload(found.projectId, found.step, found.snapshot)
        return true
      },
    }),
    {
      name: "cineiqmv-v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.warn("[cineiqmv] persist rehydrate failed:", error)
        state?.setHydrated(true)
      },
    }
  )
)

/* ── Snapshot helpers ─────────────────────────────────────────────────────── */

function extractStepPayload(p: MVProjectState | undefined, step: MVStepId): unknown {
  if (!p) return null
  switch (step) {
    case "song":
      return p.songMetadata
    case "concept":
      // @ts-expect-error — demo field
      return { list: p._conceptList ?? [], selected: p.selectedConcept }
    case "architecture":
      return p.storyArchitecture
    case "story":
      return p.storyTreatment
    case "characters":
      return p.characterBible
    case "world":
      return p.worldBible
    case "style":
      return p.visualStyleGuide
    case "beats":
      return p.beatSheet
    case "shots":
      return p.shotList
  }
}

function applyStepPayload(projectId: string, step: MVStepId, payload: unknown) {
  const st = useProjectStore.getState()
  switch (step) {
    case "song":
      if (payload) st.setSongMetadata(projectId, payload as SongMetadata)
      break
    case "concept": {
      const typed = payload as { list: ConceptCard[]; selected: ConceptCard | null }
      if (typed.list) st.setConceptList(projectId, typed.list)
      st.setSelectedConcept(projectId, typed.selected ?? null)
      break
    }
    case "architecture":
      if (payload) st.setArchitecture(projectId, payload as StoryArchitecture)
      break
    case "story":
      if (payload) st.updateTreatment(projectId, payload as StoryTreatment)
      break
    case "characters":
      st.setCharacters(projectId, (payload as CharacterBibleEntry[]) ?? [])
      break
    case "world":
      if (payload) st.setWorld(projectId, payload as WorldBible)
      break
    case "style":
      if (payload) st.setStyleGuide(projectId, payload as VisualStyleGuide)
      break
    case "beats":
      st.setBeats(projectId, (payload as Beat[]) ?? [])
      break
    case "shots":
      st.setShots(projectId, (payload as Shot[]) ?? [])
      break
  }
}

/* ── Seed hook for first-load ─────────────────────────────────────────────── */

/**
 * Call from any client component top-level useEffect — safe to call repeatedly.
 * Runs once, when hydration finishes, if projects table is empty.
 */
export function useSeedOnFirstLoad() {
  const hydrated = useProjectStore((s) => s.hydrated)
  const count = useProjectStore((s) => Object.keys(s.projects).length)
  const seed = useProjectStore((s) => s.seedDefaults)
  if (typeof window !== "undefined" && hydrated && count === 0) {
    seed()
  }
}
