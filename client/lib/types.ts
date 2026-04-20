/**
 * cineiqmv — Domain Types
 *
 * Mirrors the Project State schema from PRD §6 (see docs/prd.md).
 * Phase 1: used with mock data (lib/mock-data.ts).
 * Phase 2+: same shapes populated from the /api/v1 backend.
 */

/* ── Step stepper ─────────────────────────────────────────────────────────── */

export const MV_STEPS = [
  "song",
  "concept",
  "architecture",
  "story",
  "characters",
  "world",
  "style",
  "beats",
  "shots",
] as const

export type MVStepId = (typeof MV_STEPS)[number]

export interface MVStep {
  id: MVStepId
  order: number
  label: string
  shortLabel: string
  description: string
}

/* ── Core project ─────────────────────────────────────────────────────────── */

export type MVProjectStatus = "draft" | "in-progress" | "review" | "completed" | "archived"

export interface MVProjectSummary {
  id: string
  title: string
  artist: string
  language: string
  durationSec: number
  currentStep: MVStepId
  status: MVProjectStatus
  coverColorHex: string
  updatedAt: string
}

/* ── Screen 1: Song Intelligence ─────────────────────────────────────────── */

export type SongSegmentType =
  | "Intro"
  | "Verse"
  | "Pre-Chorus"
  | "Chorus"
  | "Bridge"
  | "Instrumental"
  | "Outro"

export interface SongSegment {
  type: SongSegmentType
  start: number
  end: number
}

export interface LyricLine {
  start: number
  end: number
  text: string
}

export interface SongMetadata {
  title: string
  artist: string
  language: string
  durationSec: number
  bpm: number
  keyCamelot: string
  energy: number
  valence: number
  danceability: number
  instrumentalness: number
  moodTags: string[]
  coreMetaphor: string
  lyrics: LyricLine[]
  segments: SongSegment[]
}

/* ── Screen 2: Concept ────────────────────────────────────────────────────── */

export interface ConceptCard {
  id: string
  title: string
  logline: string
  visualHook: string
  legendaryAttributes: number[]
  thumbnailUrl?: string
  isCustom?: boolean
}

/* ── Screen 3: Story Architecture ─────────────────────────────────────────── */

export interface StoryArchitecture {
  mode: "single" | "multi"
  threadCount: 1 | 2 | 3 | 4
  threadDescriptions: string[]
}

/* ── Screen 4: Story Generator ────────────────────────────────────────────── */

export interface StoryTreatment {
  version: number
  content: string
  approved: boolean
}

/* ── Screen 5: Character Forge ────────────────────────────────────────────── */

export interface CharacterAppearance {
  faceShape: string
  hair: string
  skinTone: string
  build: string
  clothing: string
  accessories: string
}

export type CharacterArchetype =
  | "The Visionary"
  | "The Rebel"
  | "The Lover"
  | "The Mentor"
  | "The Trickster"
  | "The Everyman"
  | "The Hero"
  | "The Outlaw"
  | "The Sage"
  | "The Explorer"

export type PerformanceStyle =
  | "Contained Stillness"
  | "Kinetic Burst"
  | "Slow Burn"
  | "Playful Chaos"
  | "Stoic Intensity"
  | "Fluid Grace"

export interface CharacterBibleEntry {
  id: string
  name: string
  age: number
  gender: string
  archetype: CharacterArchetype
  appearance: CharacterAppearance
  voiceNotes: string
  performanceStyle: PerformanceStyle
  referenceImageUrl?: string
  consistencyLocked: boolean
}

/* ── Screen 6: World Builder ──────────────────────────────────────────────── */

export interface Location {
  id: string
  name: string
  type: string
  timeOfDay: string
  weather: string
  culturalMarkers: string
  description: string
}

export interface WorldBible {
  locations: Location[]
  timePeriod: string
  physicsRules: string
  atmosphere: string[]
  dominantColors: string[]
}

/* ── Screen 6b: Visual Style ──────────────────────────────────────────────── */

export interface VisualStyleGuide {
  colorPalette: string[]
  lighting: string
  cameraLanguage: string
  lensCharacteristics: string
  filmGrain: { enabled: boolean; intensity: number }
  colorGradingStyle: string
  referenceMood: string
  keyFrameUrl?: string
}

/* ── Screen 7: Beat Sheet ─────────────────────────────────────────────────── */

export type BeatEmotion =
  | "Contemplative"
  | "Intimate"
  | "Confident"
  | "Euphoric"
  | "Yearning"
  | "Triumphant"
  | "Melancholic"
  | "Ecstatic"
  | "Tense"
  | "Serene"

export interface Beat {
  beatId: string
  startTime: string
  endTime: string
  songSection: SongSegmentType
  visualAction: string
  emotion: BeatEmotion
  characterIds: string[]
  locationId: string
}

/* ── Screen 8: Shot List ──────────────────────────────────────────────────── */

export type GenAITool = "seedance_2" | "veo_3_1" | "kling_2_5"

export type ShotType =
  | "Extreme Wide"
  | "Wide"
  | "Medium Wide"
  | "Medium"
  | "Medium Close-Up"
  | "Close-Up"
  | "Extreme Close-Up"

export type CameraMovement =
  | "Static"
  | "Slow Dolly In"
  | "Slow Dolly Out"
  | "Steadicam Follow"
  | "Crane Up"
  | "Crane Down"
  | "Handheld"
  | "Whip Pan"
  | "Drone"

export interface Shot {
  shotId: string
  beatRef: string
  startTime: string
  endTime: string
  shotType: ShotType
  cameraMovement: CameraMovement
  description: string
  genaiTool: GenAITool
  prompts: {
    seedance_2: string
    veo_3_1: string
    kling_2_5: string
  }
  negativePrompt: string
  motionBucket: number
  seed: number
  characterRefs: string[]
  consistencyApplied: boolean
}

/* ── Full project state (PRD §6) ──────────────────────────────────────────── */

export interface MVProjectState {
  projectId: string
  createdAt: string
  updatedAt: string
  currentStep: MVStepId
  title: string
  status: MVProjectStatus
  coverColorHex: string
  songMetadata: SongMetadata | null
  selectedConcept: ConceptCard | null
  storyArchitecture: StoryArchitecture | null
  storyTreatment: StoryTreatment | null
  characterBible: CharacterBibleEntry[]
  worldBible: WorldBible | null
  visualStyleGuide: VisualStyleGuide | null
  beatSheet: Beat[]
  shotList: Shot[]
  globalNegativePrompt: string
  publishingMetadata: {
    titleTemplate: string
    description: string
    tags: string[]
    bestPostTime: string
  } | null
}

/* ── 22 supported languages (PRD §2.1) ────────────────────────────────────── */

export const MV_LANGUAGES = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Odia",
  "Punjabi",
  "Assamese",
  "Urdu",
  "Sanskrit",
  "Kashmiri",
  "Sindhi",
  "Konkani",
  "Manipuri",
  "Nepali",
  "Bodo",
  "Dogri",
  "Maithili",
] as const

export type MVLanguage = (typeof MV_LANGUAGES)[number]
