import type {
  Beat,
  CharacterBibleEntry,
  ConceptCard,
  Location,
  MVProjectState,
  MVProjectSummary,
  Shot,
  SongMetadata,
  StoryArchitecture,
  StoryTreatment,
  VisualStyleGuide,
  WorldBible,
} from "./types"

/* ── Project list for Dashboard ───────────────────────────────────────────── */

export const mvMockProjects: MVProjectSummary[] = [
  {
    id: "mv-1",
    title: "Levitating",
    artist: "Dua Lipa",
    language: "English",
    durationSec: 203,
    currentStep: "shots",
    status: "review",
    coverColorHex: "#313c48",
    updatedAt: "2026-04-14T10:32:00Z",
  },
  {
    id: "mv-2",
    title: "Chaleya",
    artist: "Arijit Singh",
    language: "Hindi",
    durationSec: 215,
    currentStep: "beats",
    status: "in-progress",
    coverColorHex: "#6b3a2e",
    updatedAt: "2026-04-14T08:12:00Z",
  },
  {
    id: "mv-3",
    title: "Ranjhana Reborn",
    artist: "Jasleen Royal",
    language: "Punjabi",
    durationSec: 244,
    currentStep: "characters",
    status: "in-progress",
    coverColorHex: "#2e4a3a",
    updatedAt: "2026-04-13T17:40:00Z",
  },
  {
    id: "mv-4",
    title: "Kaadhal Kadigai",
    artist: "Anirudh",
    language: "Tamil",
    durationSec: 189,
    currentStep: "concept",
    status: "draft",
    coverColorHex: "#3e2a4a",
    updatedAt: "2026-04-12T14:00:00Z",
  },
  {
    id: "mv-5",
    title: "Samjhawan Reimagined",
    artist: "Shilpa Rao",
    language: "Hindi",
    durationSec: 267,
    currentStep: "song",
    status: "draft",
    coverColorHex: "#4a3a2e",
    updatedAt: "2026-04-12T09:15:00Z",
  },
  {
    id: "mv-6",
    title: "Ocean Floor",
    artist: "Prateek Kuhad",
    language: "English",
    durationSec: 231,
    currentStep: "style",
    status: "in-progress",
    coverColorHex: "#2e3f4a",
    updatedAt: "2026-04-11T22:05:00Z",
  },
]

/* ── Example full project state (for screens 1–8) ─────────────────────────── */

export const mvMockSongMetadata: SongMetadata = {
  title: "Levitating",
  artist: "Dua Lipa",
  language: "English",
  durationSec: 203.1,
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
    { type: "Outro", start: 195, end: 203.1 },
  ],
  lyrics: [
    { start: 0, end: 5, text: "If you wanna run away with me" },
    { start: 5, end: 10, text: "I know a galaxy and I can take you for a ride" },
    { start: 10, end: 15, text: "I had a premonition that we fell into a rhythm" },
    { start: 15, end: 19.2, text: "Where the music don't stop for life" },
    { start: 19.2, end: 25, text: "Glitter in the sky, glitter in my eyes" },
    { start: 25, end: 30, text: "Shining just the way I like" },
    { start: 30, end: 35, text: "If you're feeling like you need a little bit of company" },
    { start: 35, end: 45, text: "You met me at the perfect time" },
  ],
}

export const mvMockConcepts: ConceptCard[] = [
  {
    id: "concept-a",
    title: "Neon Reverie",
    logline:
      "A woman levitates through a futuristic city, her joy igniting every neon sign she drifts past.",
    visualHook: "Her fingertips leave trails of bioluminescent light on every surface.",
    legendaryAttributes: [1, 63, 80],
  },
  {
    id: "concept-b",
    title: "Cosmic Waltz",
    logline:
      "Two lovers drift through space in a retro-futurist dance, their bodies becoming stardust at the chorus.",
    visualHook: "They spin in slow motion as entire galaxies swirl behind them.",
    legendaryAttributes: [30, 8, 48],
  },
  {
    id: "concept-c",
    title: "Mirror Maze",
    logline:
      "A dancer trapped in infinite reflections finds freedom only through movement.",
    visualHook: "Every reflection shows a different emotion on her face.",
    legendaryAttributes: [13, 7, 63],
  },
]

export const mvMockArchitecture: StoryArchitecture = {
  mode: "multi",
  threadCount: 2,
  threadDescriptions: [
    "Primary: Protagonist levitates across futuristic rooftops.",
    "Secondary: Ensemble dancers in a mirrored warehouse perform in sync to the beat.",
  ],
}

export const mvMockTreatment: StoryTreatment = {
  version: 3,
  approved: true,
  content: `# Logline
A woman levitates through a futuristic city, her joy igniting every neon sign she drifts past.

# Visual Approach
Anamorphic flare, teal-amber grading, subtle film grain. Steadicam float on close-ups; drone sweeps on wide establishing shots. Practical neon, no CGI skyline.

# Scene Breakdown
## Intro (00:00 – 00:19)
Protagonist stands on a wet rooftop, back to camera, city lights blurring behind her. She turns, meets the lens. Glitter particles drift around her face.

## Verse 1 (00:19 – 00:45)
Cut to a mirrored warehouse. She walks forward; her reflection multiplies. A subtle dance move starts from the hips and spreads outward.

## Chorus (00:45 – 01:15)
She rises off the floor. Neon signs around her pulse to the beat. Ensemble dancers mirror her movements on the rooftop.

## Verse 2 (01:15 – 01:40)
Close-ups: fingertips leaving trails of light on glass, water pooling on the floor.

## Bridge (01:40 – 02:10)
Slow motion. Gravity loosens. The city's neon colours refract through a prism of water droplets.

## Outro (02:10 – 02:30)
She lands gently. Camera pulls back into a drone shot. The city exhales.
`,
}

export const mvMockCharacters: CharacterBibleEntry[] = [
  {
    id: "char-1",
    name: "Dua Lipa",
    age: 28,
    gender: "Female",
    archetype: "The Visionary",
    appearance: {
      faceShape: "Oval",
      hair: "Blonde, shoulder-length, wavy, middle part",
      skinTone: "Fair, warm undertone",
      build: "Slim, 5'8\"",
      clothing: "Black sleeveless top, high-waisted metallic silver pants",
      accessories: "Gold hoop earrings, stacked rings, red manicure",
    },
    voiceNotes: "Soft, breathy, confident",
    performanceStyle: "Contained Stillness",
    consistencyLocked: true,
  },
  {
    id: "char-2",
    name: "DaBaby",
    age: 32,
    gender: "Male",
    archetype: "The Trickster",
    appearance: {
      faceShape: "Square",
      hair: "Short cropped, black, fade",
      skinTone: "Deep warm brown",
      build: "Athletic, 5'8\"",
      clothing: "Red leather jacket, black tee, dark jeans, white sneakers",
      accessories: "Silver chain, diamond studs, chunky watch",
    },
    voiceNotes: "Energetic, punchy, North Carolina drawl",
    performanceStyle: "Kinetic Burst",
    consistencyLocked: true,
  },
  {
    id: "char-3",
    name: "Ensemble Dancer",
    age: 25,
    gender: "Mixed",
    archetype: "The Explorer",
    appearance: {
      faceShape: "Varies",
      hair: "Varies — sleek ponytails, natural textures",
      skinTone: "Diverse palette",
      build: "Trained dancer physique, 5'5\"–5'10\"",
      clothing: "Matching metallic silver unitards",
      accessories: "Mirror-finish chokers, ankle cuffs",
    },
    voiceNotes: "Non-vocal",
    performanceStyle: "Fluid Grace",
    consistencyLocked: false,
  },
]

export const mvMockLocations: Location[] = [
  {
    id: "loc-1",
    name: "Neon Rooftop",
    type: "Rooftop",
    timeOfDay: "Night",
    weather: "Clear, starry sky after light rain",
    culturalMarkers: "Futuristic skyline, neon signs in English & Japanese",
    description:
      "A sprawling rooftop with a panoramic view of a glittering metropolis. Floor wet from recent rain, reflecting the kaleidoscope of neon — pinks, blues, electric greens. Gentle breeze carries distant traffic hum. Ozone and damp concrete in the air.",
  },
  {
    id: "loc-2",
    name: "Mirrored Warehouse",
    type: "Interior Warehouse",
    timeOfDay: "Night",
    weather: "Indoor",
    culturalMarkers: "Industrial conversion; practical neon strips",
    description:
      "A cavernous warehouse fully lined with mirrored panels. A single amber spotlight carves through fog. Reflections multiply the protagonist into infinity.",
  },
  {
    id: "loc-3",
    name: "Ethereal Forest",
    type: "Exterior Forest",
    timeOfDay: "Golden hour",
    weather: "Soft mist",
    culturalMarkers: "Ancient banyan trees with fairy lights woven into branches",
    description:
      "A dreamlike forest where trees glow faintly. Fireflies drift. The canopy filters golden light into moving patterns on the floor.",
  },
]

export const mvMockWorld: WorldBible = {
  locations: mvMockLocations,
  timePeriod: "Contemporary / Retro-Futurist",
  physicsRules: "Gravity optional during chorus sections",
  atmosphere: ["Dreamlike", "Energetic", "Nostalgic"],
  dominantColors: ["#313c48", "#8da2af", "#4f687a", "#ae6b41", "#ced8db"],
}

export const mvMockStyle: VisualStyleGuide = {
  colorPalette: ["#313c48", "#8da2af", "#4f687a", "#ae6b41", "#ced8db", "#18151c"],
  lighting: "Practical Motivated",
  cameraLanguage: "Steadicam Float",
  lensCharacteristics: "Anamorphic flare, 35mm",
  filmGrain: { enabled: true, intensity: 0.4 },
  colorGradingStyle: "Teal / Orange",
  referenceMood: "Blade Runner 2049 meets retro disco",
}

export const mvMockBeats: Beat[] = [
  {
    beatId: "beat-1",
    startTime: "00:00",
    endTime: "00:08",
    songSection: "Intro",
    visualAction:
      "Dua Lipa stands on rooftop, back to camera, city lights blur behind her. She turns slowly, eyes meet camera.",
    emotion: "Contemplative",
    characterIds: ["char-1"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-2",
    startTime: "00:08",
    endTime: "00:19",
    songSection: "Intro",
    visualAction:
      "Extreme close-up: her lips as she speaks the opening line. Glitter particles float around her face.",
    emotion: "Intimate",
    characterIds: ["char-1"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-3",
    startTime: "00:19",
    endTime: "00:30",
    songSection: "Verse",
    visualAction:
      "Cut to mirrored warehouse. Dua Lipa walks forward, reflections multiplying. She begins subtle dance moves.",
    emotion: "Confident",
    characterIds: ["char-1"],
    locationId: "loc-2",
  },
  {
    beatId: "beat-4",
    startTime: "00:30",
    endTime: "00:45",
    songSection: "Pre-Chorus",
    visualAction:
      "Ensemble dancers enter frame in silver unitards; they synchronize with her moves. Mirrors fracture the shot into a kaleidoscope.",
    emotion: "Yearning",
    characterIds: ["char-1"],
    locationId: "loc-2",
  },
  {
    beatId: "beat-5",
    startTime: "00:45",
    endTime: "01:15",
    songSection: "Chorus",
    visualAction:
      "She levitates off the floor. Neon signs around her pulse with the beat. Ensemble dancers mirror her on the rooftop.",
    emotion: "Euphoric",
    characterIds: ["char-1", "char-2", "char-3"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-6",
    startTime: "01:15",
    endTime: "01:40",
    songSection: "Verse",
    visualAction:
      "Close-ups: fingertips leaving trails of light on glass, water pooling on the floor, hair moving in slow breeze.",
    emotion: "Intimate",
    characterIds: ["char-1"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-7",
    startTime: "01:40",
    endTime: "02:10",
    songSection: "Bridge",
    visualAction:
      "Slow motion. Gravity loosens. City neon refracts through water droplets suspended mid-air.",
    emotion: "Serene",
    characterIds: ["char-1", "char-2"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-8",
    startTime: "02:10",
    endTime: "02:30",
    songSection: "Chorus",
    visualAction:
      "All characters on rooftop together; final climactic dance move; camera orbits then pulls back into drone wide.",
    emotion: "Triumphant",
    characterIds: ["char-1", "char-2", "char-3"],
    locationId: "loc-1",
  },
  {
    beatId: "beat-9",
    startTime: "02:30",
    endTime: "03:23",
    songSection: "Outro",
    visualAction:
      "She lands softly. Drone pulls back to reveal entire city. The neon pulses fade to black.",
    emotion: "Melancholic",
    characterIds: ["char-1"],
    locationId: "loc-1",
  },
]

const SAMPLE_PROMPT_SEEDANCE = `[Same character: Dua Lipa] A woman with an oval face, blonde shoulder-length wavy hair parted in the middle, fair skin with warm undertone, slim build, 5'8", wearing a black sleeveless top and high-waisted metallic silver pants, gold hoop earrings, stacked rings, red manicured nails — performs a slow, fluid contemporary dance move, her arms floating upward as if levitating. Camera slowly dollies in, soft golden backlight creating a halo effect. The scene is set on a wet rooftop overlooking a futuristic city at night, neon reflections shimmering on the ground, starry sky above. Natural weight shift visible in her hips, subtle micro-expressions on her face, gentle breeze moving her hair. Shot on 35mm anamorphic lens, shallow depth of field, film grain overlay. Color palette: deep teal, muted blue, warm amber accents. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.`

const SAMPLE_PROMPT_VEO = `[Same character: Dua Lipa] Photorealistic cinematography of a woman, oval face, blonde shoulder-length wavy hair middle-parted, fair skin warm undertone, slim 5'8" build, wearing black sleeveless top, high-waisted metallic silver pants, gold hoop earrings, stacked rings, red manicure. She stands on a rain-slicked rooftop overlooking a futuristic neon metropolis at night. Natural lighting from practical neon signs; subtle key from above creates an anamorphic flare. She exhales gently, chest rising; her hair catches a crosswind. Camera glides on a steadicam at chest height, 35mm anamorphic lens, T2.8, shallow depth of field. Subtle film grain. Color grading: teal shadows, amber highlights. Behavioral ticks: natural blink every 3 seconds, subtle weight shift onto right foot, fingers curl slightly. Avoid: deformed hands, blurry faces, text, extra limbs.`

const SAMPLE_PROMPT_KLING = `[Same character: Dua Lipa] A dynamic cinematic shot of a woman — oval face, blonde shoulder-length wavy hair parted in the middle, fair skin with warm undertone, slim 5'8" build, wearing a black sleeveless top and metallic silver high-waisted pants, gold hoop earrings, stacked rings, red manicure — rising weightlessly above a wet rooftop as neon lights in the skyline pulse in sync. Drone camera orbits around her, sweeping from medium to wide, crane ascending. Lighting: high contrast, rim light from neon signs behind, soft amber fill. Mood: euphoric, cosmic, epic scale. Slow motion 120fps. Anamorphic flare, 35mm lens equivalent. Color palette: teal, electric blue, amber. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.`

export const mvMockShots: Shot[] = [
  {
    shotId: "shot-1",
    beatRef: "beat-1",
    startTime: "00:00",
    endTime: "00:08",
    shotType: "Wide",
    cameraMovement: "Static",
    description: "Dua Lipa stands on rooftop, back to camera, city lights blur behind",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: SAMPLE_PROMPT_SEEDANCE,
      veo_3_1: SAMPLE_PROMPT_VEO,
      kling_2_5: SAMPLE_PROMPT_KLING,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 127,
    seed: 12345,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },
  {
    shotId: "shot-2",
    beatRef: "beat-2",
    startTime: "00:08",
    endTime: "00:12",
    shotType: "Extreme Close-Up",
    cameraMovement: "Slow Dolly In",
    description: "Her lips as she speaks opening line. Glitter particles around face.",
    genaiTool: "veo_3_1",
    prompts: {
      seedance_2: SAMPLE_PROMPT_SEEDANCE,
      veo_3_1: SAMPLE_PROMPT_VEO,
      kling_2_5: SAMPLE_PROMPT_KLING,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
    motionBucket: 90,
    seed: 23456,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },
  {
    shotId: "shot-3",
    beatRef: "beat-3",
    startTime: "00:12",
    endTime: "00:19",
    shotType: "Medium",
    cameraMovement: "Steadicam Follow",
    description: "Walking forward in mirrored warehouse, reflections multiplying",
    genaiTool: "seedance_2",
    prompts: {
      seedance_2: SAMPLE_PROMPT_SEEDANCE,
      veo_3_1: SAMPLE_PROMPT_VEO,
      kling_2_5: SAMPLE_PROMPT_KLING,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
    motionBucket: 140,
    seed: 34567,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },
]

export const mvMockFullProject: MVProjectState = {
  projectId: "mv-1",
  createdAt: "2026-04-10T08:00:00Z",
  updatedAt: "2026-04-14T10:32:00Z",
  currentStep: "shots",
  title: "Levitating",
  status: "review",
  coverColorHex: "#313c48",
  songMetadata: mvMockSongMetadata,
  selectedConcept: mvMockConcepts[0],
  storyArchitecture: mvMockArchitecture,
  storyTreatment: mvMockTreatment,
  characterBible: mvMockCharacters,
  worldBible: mvMockWorld,
  visualStyleGuide: mvMockStyle,
  beatSheet: mvMockBeats,
  shotList: mvMockShots,
  globalNegativePrompt:
    "deformed hands, blurry faces, text artifacts, extra limbs, nudity, culturally insensitive imagery",
  publishingMetadata: {
    titleTemplate: "Levitating — Dua Lipa (Official Music Video)",
    description: "A cosmic dance through neon-lit skies. Directed for Hungama.",
    tags: ["levitating", "dua lipa", "music video", "synth pop"],
    bestPostTime: "Friday 7pm IST",
  },
}

/* ── 82 Legendary Attributes catalog (PRD §3) ─────────────────────────────── */

export const LEGENDARY_ATTRIBUTES: { id: number; name: string }[] = [
  { id: 1, name: "Opening Reveal Shot" },
  { id: 2, name: "Single-Take Sequence" },
  { id: 3, name: "Practical Location" },
  { id: 4, name: "Custom-Built Set" },
  { id: 5, name: "Wardrobe Iconicity" },
  { id: 6, name: "Signature Choreography" },
  { id: 7, name: "Mirror / Reflection Motif" },
  { id: 8, name: "Levitation / Anti-Gravity" },
  { id: 9, name: "Water as Emotion" },
  { id: 10, name: "Fire as Conflict" },
  { id: 11, name: "Neon Signage" },
  { id: 12, name: "Cultural Subtext" },
  { id: 13, name: "Identity Fragmentation" },
  { id: 14, name: "Dream Sequence" },
  { id: 15, name: "Narrative Twist" },
  { id: 16, name: "Performance Intercut" },
  { id: 17, name: "Split Screen" },
  { id: 18, name: "Match Cut Storytelling" },
  { id: 19, name: "Speed Ramping" },
  { id: 20, name: "Kinetic Typography" },
  { id: 21, name: "Color Blocking" },
  { id: 22, name: "Monochrome Palette" },
  { id: 23, name: "Practical Effects" },
  { id: 24, name: "Prosthetic Transformation" },
  { id: 25, name: "Dance Narrative" },
  { id: 26, name: "Surreal Staging" },
  { id: 27, name: "Period Evocation" },
  { id: 28, name: "Genre Homage" },
  { id: 29, name: "Celebrity Cameo" },
  { id: 30, name: "Space / Cosmos Visual" },
  { id: 31, name: "Vertical Framing" },
  { id: 32, name: "Anamorphic Flare" },
  { id: 33, name: "Film Grain Texture" },
  { id: 34, name: "Silent-Film Language" },
  { id: 35, name: "Iconic Hand Gesture" },
  { id: 36, name: "Close-Up Intimacy" },
  { id: 37, name: "Crowd Choreography" },
  { id: 38, name: "Tableau Staging" },
  { id: 39, name: "Location Character" },
  { id: 40, name: "Weather as Character" },
  { id: 41, name: "Slow-Motion Key Moment" },
  { id: 42, name: "Reverse Motion" },
  { id: 43, name: "One-Shot Musical Number" },
  { id: 44, name: "Underwater Sequence" },
  { id: 45, name: "Rain Choreography" },
  { id: 46, name: "Iconic Prop" },
  { id: 47, name: "Lens Distortion" },
  { id: 48, name: "Cosmic / Celestial Motif" },
  { id: 49, name: "Religious Iconography" },
  { id: 50, name: "Protest / Political Flashpoint" },
  { id: 51, name: "Love-Triangle Visual Grammar" },
  { id: 52, name: "Double / Doppelgänger" },
  { id: 53, name: "Animal Symbolism" },
  { id: 54, name: "Child as Narrator" },
  { id: 55, name: "Artist as Deity" },
  { id: 56, name: "Stadium Scale" },
  { id: 57, name: "Domestic Intimacy" },
  { id: 58, name: "Street Realism" },
  { id: 59, name: "Abstract Visual Poem" },
  { id: 60, name: "Cultural Fusion Styling" },
  { id: 61, name: "Dance-Off Format" },
  { id: 62, name: "Backstage POV" },
  { id: 63, name: "Bioluminescent Light" },
  { id: 64, name: "Fabric in Motion" },
  { id: 65, name: "Hair Choreography" },
  { id: 66, name: "Micro-Expression Focus" },
  { id: 67, name: "Parade / Procession" },
  { id: 68, name: "Miniature / Forced Perspective" },
  { id: 69, name: "Rotoscope / Animation Hybrid" },
  { id: 70, name: "VFX Morph" },
  { id: 71, name: "Text Overlays as Character" },
  { id: 72, name: "Vintage Film Stock" },
  { id: 73, name: "Candid Documentary Feel" },
  { id: 74, name: "Static Wide Tableau" },
  { id: 75, name: "Point-of-View Shot" },
  { id: 76, name: "Hand-Held Verité" },
  { id: 77, name: "Aerial Drone Sweep" },
  { id: 78, name: "Crane Reveal" },
  { id: 79, name: "Architectural Symmetry" },
  { id: 80, name: "Crowd as Environment" },
  { id: 81, name: "Character Eye Contact" },
  { id: 82, name: "Mythic Final Frame" },
]
