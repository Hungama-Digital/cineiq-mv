/**
 * Language-aware mock song data dispatcher.
 *
 * When user creates a new project, we don't have a real audio analyzer (that's
 * Phase 2). Instead we return pre-baked "analysis" output based on the language
 * they picked — so a Hindi project feels like a different song than an English
 * one. Same artist input is embedded into the title/artist fields.
 *
 * Phase 2: swap this function for `fetch('/api/v1/song-analysis/{id}')`.
 */

import type { SongMetadata } from "./types"

interface NewProjectInput {
  title: string
  artist: string
  language: string
}

const CHALEYA: SongMetadata = {
  title: "Chaleya",
  artist: "Arijit Singh",
  language: "Hindi",
  durationSec: 215,
  bpm: 102.8,
  keyCamelot: "9A",
  energy: 0.64,
  valence: 0.72,
  danceability: 0.58,
  instrumentalness: 0.08,
  moodTags: ["Romantic", "Dreamy", "Hopeful"],
  coreMetaphor: "Falling in love as a gentle surrender to the current of destiny.",
  segments: [
    { type: "Intro", start: 0, end: 18 },
    { type: "Verse", start: 18, end: 48 },
    { type: "Pre-Chorus", start: 48, end: 62 },
    { type: "Chorus", start: 62, end: 96 },
    { type: "Verse", start: 96, end: 126 },
    { type: "Chorus", start: 126, end: 160 },
    { type: "Bridge", start: 160, end: 188 },
    { type: "Chorus", start: 188, end: 210 },
    { type: "Outro", start: 210, end: 215 },
  ],
  lyrics: [
    { start: 0, end: 6, text: "Chal diye tumse milne ko" },
    { start: 6, end: 12, text: "Haan main chaleya chaleya chaleya" },
    { start: 12, end: 18, text: "Dil ne diya hai ye sawaal" },
    { start: 18, end: 24, text: "Tere bina kaise rahun" },
    { start: 24, end: 30, text: "Tu hi hai meri har khushi" },
    { start: 30, end: 38, text: "Tere ishq mein hain khoye hum" },
    { start: 38, end: 48, text: "Na rahe hosh o jawaan" },
  ],
}

const HEERIYE: SongMetadata = {
  title: "Heeriye",
  artist: "Jasleen Royal",
  language: "Punjabi",
  durationSec: 244,
  bpm: 96.3,
  keyCamelot: "6A",
  energy: 0.58,
  valence: 0.82,
  danceability: 0.65,
  instrumentalness: 0.05,
  moodTags: ["Euphoric", "Celebratory", "Intimate"],
  coreMetaphor: "A wedding promise folded inside a love letter — joy wrapped in vows.",
  segments: [
    { type: "Intro", start: 0, end: 22 },
    { type: "Verse", start: 22, end: 55 },
    { type: "Pre-Chorus", start: 55, end: 72 },
    { type: "Chorus", start: 72, end: 108 },
    { type: "Verse", start: 108, end: 140 },
    { type: "Chorus", start: 140, end: 176 },
    { type: "Bridge", start: 176, end: 206 },
    { type: "Chorus", start: 206, end: 238 },
    { type: "Outro", start: 238, end: 244 },
  ],
  lyrics: [
    { start: 0, end: 7, text: "Heeriye heeriye, aaja heeriye" },
    { start: 7, end: 14, text: "Tere bin nahi lagna mere ji" },
    { start: 14, end: 22, text: "Saari raatein hun tere naal" },
  ],
}

const KAADHAL: SongMetadata = {
  title: "Kaadhal Kadigai",
  artist: "Anirudh",
  language: "Tamil",
  durationSec: 189,
  bpm: 110.0,
  keyCamelot: "4B",
  energy: 0.73,
  valence: 0.55,
  danceability: 0.69,
  instrumentalness: 0.12,
  moodTags: ["Longing", "Poetic", "Dreamy"],
  coreMetaphor: "Love as a clock whose hands refuse to stop, even when the world does.",
  segments: [
    { type: "Intro", start: 0, end: 16 },
    { type: "Verse", start: 16, end: 48 },
    { type: "Chorus", start: 48, end: 80 },
    { type: "Verse", start: 80, end: 110 },
    { type: "Chorus", start: 110, end: 142 },
    { type: "Bridge", start: 142, end: 168 },
    { type: "Chorus", start: 168, end: 183 },
    { type: "Outro", start: 183, end: 189 },
  ],
  lyrics: [
    { start: 0, end: 6, text: "Kaadhal kadigai, nee enge" },
    { start: 6, end: 12, text: "Nee illaiya naan illai" },
    { start: 12, end: 16, text: "Thedinen unnai thedinen" },
  ],
}

const LEVITATING_LIKE: SongMetadata = {
  title: "Untitled",
  artist: "Unknown",
  language: "English",
  durationSec: 203,
  bpm: 103.4,
  keyCamelot: "2A",
  energy: 0.78,
  valence: 0.45,
  danceability: 0.72,
  instrumentalness: 0.15,
  moodTags: ["Euphoric", "Romantic", "Dreamy"],
  coreMetaphor: "Love as a cosmic journey — two souls orbiting each other.",
  segments: [
    { type: "Intro", start: 0, end: 19.2 },
    { type: "Verse", start: 19.2, end: 45 },
    { type: "Pre-Chorus", start: 45, end: 60 },
    { type: "Chorus", start: 60, end: 90 },
    { type: "Verse", start: 90, end: 115 },
    { type: "Chorus", start: 115, end: 145 },
    { type: "Bridge", start: 145, end: 170 },
    { type: "Chorus", start: 170, end: 195 },
    { type: "Outro", start: 195, end: 203 },
  ],
  lyrics: [
    { start: 0, end: 5, text: "If you wanna run away with me" },
    { start: 5, end: 10, text: "I know a galaxy and I can take you for a ride" },
    { start: 10, end: 15, text: "I had a premonition that we fell into a rhythm" },
    { start: 15, end: 19.2, text: "Where the music don't stop for life" },
  ],
}

/**
 * Return pre-baked song analysis matched by language (and optionally title).
 * All return values have the user-supplied title/artist overlaid so the UI
 * shows their input back to them.
 */
export function dispatchMockSongAnalysis(input: NewProjectInput): SongMetadata {
  const titleLower = input.title.toLowerCase()

  // Title keyword wins if it matches a seeded song
  if (titleLower.includes("chaleya")) return overlay(CHALEYA, input)
  if (titleLower.includes("heer")) return overlay(HEERIYE, input)
  if (titleLower.includes("kaadhal") || titleLower.includes("kadhal"))
    return overlay(KAADHAL, input)

  // Fall back to language
  switch (input.language) {
    case "Hindi":
    case "Urdu":
      return overlay(CHALEYA, input)
    case "Punjabi":
      return overlay(HEERIYE, input)
    case "Tamil":
    case "Telugu":
    case "Malayalam":
    case "Kannada":
      return overlay(KAADHAL, input)
    default:
      return overlay(LEVITATING_LIKE, input)
  }
}

function overlay(base: SongMetadata, input: NewProjectInput): SongMetadata {
  return {
    ...base,
    title: input.title,
    artist: input.artist,
    language: input.language,
  }
}
