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
    id: "mv-lev-1",
    title: "Levitating",
    artist: "Dua Lipa",
    language: "English",
    durationSec: 203,
    currentStep: "shots",
    status: "in-progress",
    coverColorHex: "#1a0a2e",
    updatedAt: "2026-04-20T14:00:00Z",
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
  /* ── beat-1  00:00–00:08  Intro ──────────────────────────────────────────── */
  {
    shotId: "shot-1",
    beatRef: "beat-1",
    startTime: "00:00",
    endTime: "00:08",
    shotType: "Wide",
    cameraMovement: "Slow Push In",
    description: "Cold open. Dua stands on rooftop back-to-camera; city glows below. She turns — eyes find the lens. Lyric theme: invitation to escape to the stars together.",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] A woman with an oval face, blonde shoulder-length wavy hair, fair skin, slim 5'8" build, wearing a black sleeveless top and high-waisted metallic silver pants, gold hoop earrings — stands on a futuristic rain-slicked rooftop at night, back to camera, arms slightly raised, the vast neon cityscape spread below her. She turns slowly until her eyes meet the lens — a look of quiet invitation, as if offering someone a journey to the cosmos. Camera begins as a wide static then pushes in on a 35mm anamorphic, teal-amber grade, soft film grain. Mood: contemplative wonder, threshold of adventure. Avoid: deformed hands, blurry face, text artifacts, extra limbs, nudity.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic wide shot, woman — oval face, blonde shoulder-length wavy hair, fair skin, slim 5'8", black sleeveless top, metallic silver high-waist pants, gold hoops — standing back-to-camera on a high rooftop. Below: a futuristic metropolis at night, neon signs reflected in rain puddles. She places one hand on the glass railing and turns her head. The camera slowly pushes in, 35mm anamorphic, teal-shadow amber-highlight grade. Practical neon backlight creates a rimlight halo. Natural breathing, hair catches a gentle crosswind. Mood: anticipation, cosmic scale. Avoid: blurry face, text, deformed hands, extra limbs.`,
      kling_2_5: `[Same character: Dua Lipa] Cinematic wide establishing shot — woman, oval face, blonde shoulder-length wavy hair, fair skin, slim 5'8", black sleeveless top, metallic silver pants, gold hoop earrings — back to camera on a soaring rain-wet rooftop. The sprawling neon city stretches to the horizon. She turns slowly and faces camera with a luminous, knowing smile. Camera: slow push-in, crane height, 35mm anamorphic flare, 24fps, film grain. Color: deep teal sky, amber neon accents. Mood: epic, inviting, the start of something galactic. Avoid: deformed hands, blurry face, text artifacts, extra limbs, nudity.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 127,
    seed: 11111,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },

  /* ── beat-2  00:08–00:19  Intro ──────────────────────────────────────────── */
  {
    shotId: "shot-2",
    beatRef: "beat-2",
    startTime: "00:08",
    endTime: "00:19",
    shotType: "Extreme Close-Up",
    cameraMovement: "Slow Dolly In",
    description: "Glitter fills the air around her face. She speaks the opening verse — about a galaxy waiting, a premonition, a rhythm that never stops. Intimate and hypnotic.",
    genaiTool: "veo_3_1",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Extreme close-up of a woman's face — oval, fair skin, warm undertone, blonde wavy shoulder-length hair. She sings with an intimate, soft expression. Golden glitter particles drift slowly around her face catching practical backlight. Faint star-like bokeh in background. Lips: natural movement, micro-expressions of wonder and longing. Camera dollies in almost imperceptibly. 35mm macro anamorphic, very shallow depth of field, warm amber key light, teal fill from side. Film grain subtle. Mood: intimate, dreamy, galactic. Avoid: blurry face, text, deformed features.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic extreme close-up — woman, oval face, fair warm skin, blonde wavy shoulder-length hair, red-manicured fingertips grazing her jaw. Golden glitter and tiny light particles float around her face in slow motion. She sings — lips parting gently, eyes wide with starry wonder. Camera: static with barely perceptible dolly-in. Lens: 35mm anamorphic macro, T1.8, bokeh of neon lights and star-points behind. Grade: warm amber highlights, cool teal mid-tones. Natural blink every 4 seconds. Mood: hypnotic intimacy. Avoid: blurry face, text artifacts, extra limbs, nudity.`,
      kling_2_5: `[Same character: Dua Lipa] Ultra close-up cinematic shot — woman, oval face, fair warm-undertone skin, blonde shoulder-length wavy hair. Cascading golden glitter particles orbit her face; a constellation of floating light. She sings with quiet intensity, eyes luminous. Slow-motion 60fps. Camera: imperceptible push-in, anamorphic lens flare softly kissing the left edge of frame. Backlight: warm gold halo. Side fill: cool teal. Color grade: Blade Runner 2049-inspired. Mood: cosmic intimacy, wonder. Avoid: deformed features, text, extra limbs, nudity.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 85,
    seed: 22222,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },

  /* ── beat-3  00:19–00:30  Verse ──────────────────────────────────────────── */
  {
    shotId: "shot-3",
    beatRef: "beat-3",
    startTime: "00:19",
    endTime: "00:30",
    shotType: "Medium",
    cameraMovement: "Steadicam Follow",
    description: "Mirrored warehouse. She walks forward, reflections multiplying. Verse theme: glitter in the sky, shining her way. Confident, sensory, world-building.",
    genaiTool: "seedance_2",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Medium shot following a woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver high-waist pants, gold hoop earrings, stacked rings, red nails — walking forward through a vast mirrored corridor-warehouse at night. Her reflections multiply to infinity on either side. She moves with total ease, a subtle rhythmic sway in her hips. Glitter shimmers in the air. Practical neon lights pulse softly. Steadicam chest-height follow. 35mm anamorphic, teal-amber grade, shallow depth of field, film grain. Mood: confident, sensory, luminous. Avoid: deformed hands, blurry face, text, extra limbs.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic medium steadicam follow — woman, oval face, blonde wavy shoulder-length hair, fair skin, slim 5'8", black sleeveless top, metallic silver pants, gold hoops. She walks purposefully through an immense mirrored warehouse, each wall a perfect reflection multiplied. Glitter particles catch the light like stars. Floor reflects neon. Camera follows at medium distance, 35mm anamorphic, T2 aperture, teal shadows, warm amber on skin. Natural hair movement, confident micro-gestures. Mood: self-assured, pop editorial. Avoid: blurry face, text, deformed hands, extra limbs.`,
      kling_2_5: `[Same character: Dua Lipa] Dynamic steadicam medium follow shot — woman, oval face, blonde shoulder-length wavy hair, fair skin, black sleeveless top, metallic silver high-waist pants — strides confidently through a hall of infinite mirrors at night. Every surface reflects her, multiplying into a kaleidoscope of light and movement. Air sparkling with glitter dust. Camera: Steadicam, slightly low angle, emphasising her assured stride. Lens: 35mm anamorphic. Grade: teal-orange. Mood: power walk, pop star energy, sensory richness. 24fps. Avoid: deformed hands, blurry face, text artifacts, extra limbs.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 140,
    seed: 33333,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },

  /* ── beat-4  00:30–00:45  Pre-Chorus ─────────────────────────────────────── */
  {
    shotId: "shot-4",
    beatRef: "beat-4",
    startTime: "00:30",
    endTime: "00:45",
    shotType: "Wide",
    cameraMovement: "Crane Up",
    description: "Ensemble dancers in silver unitards flood the frame. Pre-chorus builds: 'you want me, I want you.' Mirrors fracture the shot into a kaleidoscope as the camera cranes up.",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Wide shot inside a vast mirrored dance studio at night. The lead woman — oval face, blonde wavy hair, black top, metallic silver pants — stands at centre. Around her, eight ensemble dancers in matching silver metallic unitards flow into frame, synchronising their movements with hers. Mirrors on all walls refract the group into a shifting kaleidoscope of bodies. Camera cranes up slowly from medium to wide overhead. Neon practical lights pulse in time. Grade: teal shadows, amber highlights. Mood: building euphoria, synchronised energy, pre-climax. 35mm anamorphic, film grain. Avoid: deformed hands, blurry faces, text artifacts.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic wide ensemble shot — lead woman, oval face, blonde wavy hair, slim 5'8", metallic silver pants and black top, at the centre of a circular mirrored space. Eight dancers in silver unitards enter and match her energy in precise choreography. All surfaces are mirrors, fragmenting the scene into infinite repetitions. Camera cranes upward, 35mm anamorphic, teal-amber grade, practical neon. Mood: yearning, anticipatory, building. Energy escalating with the music. Avoid: blurry faces, text, deformed hands, extra limbs.`,
      kling_2_5: `[Same character: Dua Lipa] Epic wide shot — lead woman, oval face, blonde shoulder-length wavy hair, black sleeveless top, metallic silver pants, gold hoops — at the centre of a spectacular hall of mirrors. Ensemble dancers in silver metallic suits flood the frame and form a choreographed formation around her. Mirrors shatter the composition into a kaleidoscope. Camera: slow crane-up from floor level to bird's-eye, 35mm anamorphic flare. Grade: high contrast, teal shadow, warm amber key. Mood: yearning electricity, pre-climax. Slow-motion moments at 60fps. Avoid: deformed hands, blurry faces, text, extra limbs.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 150,
    seed: 44444,
    characterRefs: ["char-1", "char-2", "char-3"],
    consistencyApplied: true,
  },

  /* ── beat-5  00:45–01:15  Chorus ─────────────────────────────────────────── */
  {
    shotId: "shot-5",
    beatRef: "beat-5",
    startTime: "00:45",
    endTime: "01:15",
    shotType: "Wide",
    cameraMovement: "Orbit + Crane",
    description: "First chorus. She levitates. Neon signs pulse. Ensemble on rooftop. Lyric: 'moonlight, starlight, dance with me, I'm levitating.' Peak euphoria — the centrepiece shot.",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Wide performance shot. The lead woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver high-waist pants, gold hoop earrings — rises slowly off the wet rooftop floor, levitating 1.5 metres in the air. Her arms arc outward with total abandon. Neon signs behind her pulse with the beat — electric blue, magenta, gold. Eight ensemble dancers below perform choreography mirroring orbital mechanics. Camera orbits her at medium distance, 35mm anamorphic, teal-amber grade, high contrast, film grain. Mood: euphoric, cosmic, weightless. Avoid: deformed hands, blurry faces, text, extra limbs.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic wide shot. A woman — oval face, blonde shoulder-length wavy hair, fair warm skin, slim 5'8" — hovers a metre above a rain-wet rooftop, body arched slightly back, arms open wide. She wears a black sleeveless top and metallic silver high-waist pants, gold hoops. Behind her a skyline of neon signs pulses rhythmically in blue, magenta, gold. Below: ensemble dancers in silver outfits. Camera circles slowly at mid-range, steadicam dolly, 35mm anamorphic. Grade: Blade Runner teal and amber. Mood: transcendent euphoria. 24fps, subtle motion blur. Avoid: blurry face, text, extra limbs, deformed hands.`,
      kling_2_5: `[Same character: Dua Lipa] Signature hero shot. Woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver high-waist pants, gold hoop earrings, red nails — levitates two metres above a futuristic rain-slicked rooftop. Arms wide open, face radiant with euphoria. Neon skyline pulses in electric blue, magenta, gold behind her. Ensemble dancers circle below in silver metallic suits. Drone camera orbits her 360° then cranes up to reveal the full city. 35mm anamorphic flare, high-contrast teal-amber grade, 120fps slow-motion inserts. Mood: peak euphoria, cosmic scale, the iconic pop-star hero moment. Avoid: deformed hands, blurry face, text artifacts, extra limbs, nudity.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 180,
    seed: 55555,
    characterRefs: ["char-1", "char-2", "char-3"],
    consistencyApplied: true,
  },

  /* ── beat-6  01:15–01:40  Verse 2 ────────────────────────────────────────── */
  {
    shotId: "shot-6",
    beatRef: "beat-6",
    startTime: "01:15",
    endTime: "01:40",
    shotType: "Close-Up",
    cameraMovement: "Static + Slow Dolly",
    description: "Intimate close-up series: fingertips trailing light on glass, water pooling, hair in slow breeze. Verse 2 theme: belief, being pulled in, an endless ocean of feeling.",
    genaiTool: "veo_3_1",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Intimate close-up montage. Shot A: fingertips — red manicure, stacked rings — drag slowly along a rain-wet glass surface, leaving a glowing trail of light. Shot B: a palm-up hand held out as water droplets fall in slow motion onto the skin. Shot C: tight on her face in profile, eyes closed, hair drifting in a slow warm breeze, neon reflections on her cheek. All shots static or barely moving. 35mm anamorphic macro, very shallow depth of field. Grade: teal mid-tones, warm amber skin tones. Mood: quiet intimacy, sensory richness, vulnerability. 60fps. Avoid: deformed hands, blurry face, text.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic intimate close-up series. A: extreme close-up of a woman's fingertips (red nails, gold rings) gently pressing on a rain-wet glass panel — a bioluminescent glow traces each contact point. B: water pooling on the rooftop floor, a bare foot stepping in slow motion, concentric ripples in neon-tinted puddle. C: close-up profile of her face — oval, fair warm skin, blonde wavy hair — eyes half-closed, barely perceptible breeze lifting strands. 35mm anamorphic, T1.4, very shallow DOF, teal-amber grade, film grain. Mood: intimate, tender, longing. Avoid: blurry face, deformed hands, text, extra limbs.`,
      kling_2_5: `[Same character: Dua Lipa] Sensory close-up sequence — three micro-shots linked by a teal-amber grade. 1) Fingertips (red nails, gold stacked rings) dragging along a neon-lit glass wall, each touch leaving a trail of golden light. 2) Hair floating in ultra-slow-motion, individual strands catching a warm backlight against a dark sky. 3) Her face, half-lit by a magenta neon sign, eyes soft and distant. 35mm anamorphic macro. 120fps slow motion. Grade: teal shadows, amber highlights, subtle film grain. Mood: intimate yearning, sensory depth. Avoid: deformed hands, blurry face, text artifacts.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 95,
    seed: 66666,
    characterRefs: ["char-1"],
    consistencyApplied: true,
  },

  /* ── beat-7  01:40–02:10  Bridge ─────────────────────────────────────────── */
  {
    shotId: "shot-7",
    beatRef: "beat-7",
    startTime: "01:40",
    endTime: "02:10",
    shotType: "Medium Wide",
    cameraMovement: "Slow Motion Float",
    description: "Bridge. Gravity loosens. Water droplets suspend mid-air. City neon refracts through them. Lyric theme: 'kiss me out of this world.' Serene, otherworldly, dreamlike.",
    genaiTool: "seedance_2",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Dreamy slow-motion medium wide shot. A woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver pants — stands on the rooftop as gravity loosens. Water droplets rise from the wet floor and suspend mid-air around her in a halo. City neon refracts through each droplet, turning them into tiny kaleidoscopes of blue, gold and magenta. Her hair and clothes drift as if underwater. She moves her hands gently through the suspended droplets. Camera: slight crane-up, anamorphic lens, tilt-shift focus racking through droplet layers. Grade: cool blue-teal dominant, warm gold accents. Mood: serene, weightless, otherworldly. 120fps. Avoid: deformed hands, blurry face, text.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic bridge scene — medium wide, slow motion 120fps. Woman, oval face, blonde shoulder-length wavy hair, slim 5'8", black top, silver pants. She drifts slowly backward as if carried by an invisible current. Hundreds of water droplets levitate in mid-air; neon city lights refract inside each one. Her hair floats freely. The practical neon signs behind her blur into abstract streaks of magenta, blue, and gold. Camera: smooth floating crane move, 35mm anamorphic. Grade: desaturated, blue-teal with warm amber pinpoints inside droplets. Mood: transcendent serenity, suspended time. Avoid: blurry face, text, deformed hands, extra limbs.`,
      kling_2_5: `[Same character: Dua Lipa] Poetic bridge hero shot. Woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver pants — suspended in the moment where gravity stops. Hundreds of water droplets float around her at chest height, each one a tiny lens refracting the city neon into prismatic colours. She tilts her head back, eyes closing, in total surrender to the weightlessness. Drone camera glides slowly forward and upward. 35mm anamorphic, 120fps, teal-blue grade, amber drop-highlights. Mood: serene, cosmic, the emotional peak of the song. Avoid: deformed hands, blurry face, text artifacts, extra limbs.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 110,
    seed: 77777,
    characterRefs: ["char-1", "char-2"],
    consistencyApplied: true,
  },

  /* ── beat-8  02:10–02:30  Chorus 2 ───────────────────────────────────────── */
  {
    shotId: "shot-8",
    beatRef: "beat-8",
    startTime: "02:10",
    endTime: "02:30",
    shotType: "Wide",
    cameraMovement: "Drone Orbit + Pull Back",
    description: "All characters on rooftop for final climactic group shot. Camera orbits then pulls back to drone wide. Lyric: 'moonlight, starlight, dance with me.' Triumphant resolution.",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Triumphant wide performance shot. The lead woman — oval face, blonde wavy shoulder-length hair, fair skin, black top, metallic silver pants, gold hoops — stands at the front of a rooftop stage. Behind her, two backing performers — a 28-year-old male dancer in a silver metallic jacket, and an abstract VFX entity made of swirling gold neon light — form a trio. All three execute a final, powerful choreographic pose simultaneously. Neon skyline blazing behind. Camera: steadicam crane from medium to wide, then dissolves to drone pull-back. 35mm anamorphic. Grade: high contrast, teal-amber. Mood: triumphant, collective, euphoric. Avoid: deformed hands, blurry faces, text artifacts.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic wide triumphant shot. Three figures on a rain-wet rooftop at night. Lead: woman, oval face, blonde wavy hair, slim 5'8", black top, silver pants. Left: 28-year-old man in silver metallic jacket performing a powerful dance move. Right: a swirling column of neon gold light forming a humanoid shape. All three in perfect synchrony, mid-climax pose. Neon city skyline explodes with light behind them. Camera: crane from medium to wide to drone pull-back. 35mm anamorphic, teal-amber grade, high contrast. Mood: triumphant collective euphoria. Avoid: blurry faces, text, deformed hands.`,
      kling_2_5: `[Same character: Dua Lipa] Epic finale group shot — rooftop at night, all three main characters: lead woman (oval face, blonde wavy shoulder-length hair, black sleeveless top, metallic silver pants, gold hoops), male dancer (28, silver metallic jacket, athletic), abstract neon entity (swirling gold humanoid light form). They execute the climactic choreographic move together in perfect unison. The full city skyline behind them lights up in neon synchrony. Drone camera orbits 180° at crane height then pulls back wide to reveal the entire rooftop and city below. 35mm anamorphic, high-contrast teal-amber grade. Mood: triumphant, peak energy. 24fps with 60fps inserts. Avoid: deformed hands, blurry faces, text, extra limbs.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 200,
    seed: 88888,
    characterRefs: ["char-1", "char-2", "char-3"],
    consistencyApplied: true,
  },

  /* ── beat-9  02:30–03:23  Outro ──────────────────────────────────────────── */
  {
    shotId: "shot-9",
    beatRef: "beat-9",
    startTime: "02:30",
    endTime: "03:23",
    shotType: "Wide → Extreme Wide",
    cameraMovement: "Drone Ascent",
    description: "She lands softly. Drone pulls back to reveal the whole city. Neon pulses fade to black. Lyric: 'I'm levitating… levitating…' Melancholic, vast, beautiful close.",
    genaiTool: "kling_2_5",
    prompts: {
      seedance_2: `[Same character: Dua Lipa] Closing wide shot. The lead woman — oval face, blonde wavy shoulder-length hair, fair skin, black top, metallic silver pants — descends slowly, feet touching the rooftop with feather-light grace. She stands still, alone. Camera holds on her small figure in the centre of the vast rooftop as the drone begins a slow pull-back and ascent. The neon city glows all around, then gradually — sign by sign — the lights dim. Her figure grows smaller. Finally: black. Only a faint gold point of light remains at frame centre before cutting to black. 35mm anamorphic. Grade: de-saturated teal, melancholic. Mood: bittersweet resolution, cosmic scale, awe. Avoid: deformed hands, blurry face, text.`,
      veo_3_1: `[Same character: Dua Lipa] Photorealistic outro — wide to extreme wide. A woman, oval face, blonde wavy shoulder-length hair, slim 5'8", black sleeveless top, metallic silver pants — descends from levitation and lands softly on a rain-wet rooftop. She stands centre-frame. The drone camera ascends slowly, making her increasingly small against the vast glowing metropolis. The city neon signs begin to fade one by one. Final frame: a drone extreme-wide aerial of the dark city with one tiny gold light at roof level. 35mm anamorphic. Grade: cool teal, desaturated, melancholic warmth. Mood: beautiful, bittersweet, cinematic closure. Avoid: blurry face, text, deformed hands.`,
      kling_2_5: `[Same character: Dua Lipa] Cinematic outro sequence. Woman — oval face, blonde wavy shoulder-length hair, fair skin, black sleeveless top, metallic silver pants — sinks gently to the rooftop, the final beat resolved. She wraps her arms around herself, gazing at the city. Drone: ultra-slow ascent from rooftop level to 200m altitude, revealing the full expanse of the futuristic neon city at night. The neon signs pulse and fade in sequence as she grows smaller and smaller. Extreme wide: city in darkness, one warm gold point of light marking her position. Cut to black. 35mm anamorphic. Grade: deep teal, melancholic muted amber. 24fps. Mood: awe, longing, beautiful end. Avoid: deformed hands, blurry face, text artifacts, extra limbs.`,
    },
    negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
    motionBucket: 100,
    seed: 99999,
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

/* ── Full project state — Levitating (mv-lev-1) ──────────────────────────── */

export const mvMockFullProjectLev: MVProjectState = {
  projectId: "mv-lev-1",
  createdAt: "2026-04-18T09:00:00Z",
  updatedAt: "2026-04-20T14:00:00Z",
  currentStep: "shots",
  title: "Levitating",
  status: "in-progress",
  coverColorHex: "#1a0a2e",

  /* ── Step 1: Song Intelligence ─────────────────────────────────────────── */
  songMetadata: {
    title: "Levitating",
    artist: "Dua Lipa",
    language: "English",
    durationSec: 203.0,
    bpm: 103.0,
    keyCamelot: "2A",
    energy: 0.82,
    valence: 0.93,
    danceability: 0.87,
    instrumentalness: 0.01,
    moodTags: ["Euphoric", "Romantic", "Cosmic", "Playful", "Dreamy"],
    coreMetaphor: "Romantic love as orbital gravity — two bodies pulled into each other's orbit, weightless and inevitable.",
    segments: [
      { type: "Intro", start: 0, end: 14.5 },
      { type: "Verse", start: 14.5, end: 42.0 },
      { type: "Pre-Chorus", start: 42.0, end: 57.0 },
      { type: "Chorus", start: 57.0, end: 87.0 },
      { type: "Verse", start: 87.0, end: 114.5 },
      { type: "Pre-Chorus", start: 114.5, end: 129.5 },
      { type: "Chorus", start: 129.5, end: 159.5 },
      { type: "Bridge", start: 159.5, end: 175.5 },
      { type: "Chorus", start: 175.5, end: 195.0 },
      { type: "Outro", start: 195.0, end: 203.0 },
    ],
    lyrics: [
      { start: 0.0, end: 4.5, text: "If you wanna run away with me" },
      { start: 4.5, end: 9.5, text: "I know a galaxy and I can take you for a ride" },
      { start: 9.5, end: 14.0, text: "I had a premonition that we fell into a rhythm" },
      { start: 14.0, end: 18.5, text: "Where the music don't stop for life" },
      { start: 18.5, end: 23.0, text: "Glitter in the sky, glitter in my eyes" },
      { start: 23.0, end: 27.5, text: "Shining just the way I like" },
      { start: 27.5, end: 32.0, text: "If you're feeling like you need a little bit of company" },
      { start: 32.0, end: 36.5, text: "You met me at the perfect time" },
      { start: 36.5, end: 42.0, text: "You want me, I want you, baby" },
      { start: 42.0, end: 47.0, text: "My sugarboo, I'm levitating" },
      { start: 47.0, end: 52.0, text: "The Milky Way, we're renegading" },
      { start: 52.0, end: 57.0, text: "Yeah, yeah, yeah, yeah, yeah" },
      { start: 57.0, end: 62.0, text: "I got you, moonlight, you're my starlight" },
      { start: 62.0, end: 67.0, text: "I need you all night, come on, dance with me" },
      { start: 67.0, end: 72.0, text: "I'm levitating" },
      { start: 72.0, end: 77.0, text: "You, sunshine, you're my starlight" },
      { start: 77.0, end: 82.0, text: "I need you all night, come on, dance with me" },
      { start: 82.0, end: 87.0, text: "I'm levitating" },
      { start: 87.0, end: 92.0, text: "I believe that you're for me, I believe" },
      { start: 92.0, end: 97.0, text: "You lock me down, you lock me down" },
      { start: 97.0, end: 102.0, text: "Watching every motion in this foolish lovers' game" },
      { start: 102.0, end: 107.0, text: "On this endless ocean, finally lovers know no shame" },
      { start: 107.0, end: 114.5, text: "Turning and returning to some secret place inside" },
      { start: 114.5, end: 119.5, text: "You want me, I want you, baby" },
      { start: 119.5, end: 124.5, text: "My sugarboo, I'm levitating" },
      { start: 124.5, end: 129.5, text: "The Milky Way, we're renegading" },
      { start: 129.5, end: 134.5, text: "I got you, moonlight, you're my starlight" },
      { start: 134.5, end: 139.5, text: "I need you all night, come on, dance with me" },
      { start: 139.5, end: 144.5, text: "I'm levitating" },
      { start: 144.5, end: 149.5, text: "You, sunshine, you're my starlight" },
      { start: 149.5, end: 154.5, text: "I need you all night, come on, dance with me" },
      { start: 154.5, end: 159.5, text: "I'm levitating" },
      { start: 159.5, end: 164.0, text: "Kiss me out of this world, honey" },
      { start: 164.0, end: 168.5, text: "Kiss me out of the world, honey" },
      { start: 168.5, end: 172.0, text: "Kiss me out of this world, honey" },
      { start: 172.0, end: 175.5, text: "Kiss me out of the world" },
      { start: 175.5, end: 180.5, text: "I got you, moonlight, you're my starlight" },
      { start: 180.5, end: 185.5, text: "I need you all night, come on, dance with me" },
      { start: 185.5, end: 190.5, text: "I'm levitating" },
      { start: 190.5, end: 195.0, text: "I'm levitating, levitating" },
      { start: 195.0, end: 199.0, text: "I'm levitating" },
      { start: 199.0, end: 203.0, text: "Levitating..." },
    ],
  },

  /* ── Step 2: Concept ───────────────────────────────────────────────────── */
  selectedConcept: {
    id: "lev-concept-a",
    title: "Cosmic Disco Dreamscape",
    logline:
      "A cosmic diva floats through a retro-futurist space station, her disco ball heart pulling an astronaut stranger into permanent orbit.",
    visualHook:
      "Every time she sings 'levitating', her body literally rises and starlight erupts from her fingertips as if the universe itself is responding to her desire.",
    legendaryAttributes: [8, 30, 48],
  },

  _conceptList: [
    {
      id: "lev-concept-a",
      title: "Cosmic Disco Dreamscape",
      logline:
        "A cosmic diva floats through a retro-futurist space station, her disco ball heart pulling an astronaut stranger into permanent orbit.",
      visualHook:
        "Every time she sings 'levitating', her body literally rises and starlight erupts from her fingertips as if the universe itself is responding to her desire.",
      legendaryAttributes: [8, 30, 48],
    },
    {
      id: "lev-concept-b",
      title: "Neon Zero-Gravity Rave",
      logline:
        "Deep in space, an underground rave is the only place where gravity doesn't apply — and love hits harder than any bass drop.",
      visualHook:
        "The entire dance floor is a transparent platform suspended in the void; beneath the dancers' feet, the galaxy spins slowly like a mirror ball.",
      legendaryAttributes: [1, 63, 30],
    },
    {
      id: "lev-concept-c",
      title: "Starship Serenade",
      logline:
        "A lone astronaut drifting through deep space discovers that the anomalous signal he's been chasing is a woman singing — and following her voice home changes everything.",
      visualHook:
        "He removes his helmet and her voice becomes visible — golden sound waves that swirl around both of them and slowly lift them off the floor.",
      legendaryAttributes: [48, 13, 8],
    },
  ] as ConceptCard[],

  /* ── Step 3: Story Architecture ────────────────────────────────────────── */
  storyArchitecture: {
    mode: "multi",
    threadCount: 2,
    threadDescriptions: [
      "Primary — Performance Thread: The Cosmic Diva (Dua) performs across three otherworldly spaces — the space station observation deck, the lunar surface, and a zero-gravity neon dance club — embodying the euphoria and abandon of falling in love. Her movement vocabulary escalates from contained shimmy to full levitation.",
      "Secondary — Narrative Thread: An Astronaut discovers a mysterious signal leading him across the cosmos. Each time he follows it, the signal turns out to be Dua's voice. By the bridge, he finds her — and instead of a rescue, it becomes a dance. The two threads collide at the final chorus.",
    ],
  },

  /* ── Step 4: Story Treatment ────────────────────────────────────────────── */
  storyTreatment: {
    version: 2,
    approved: true,
    content: `# Levitating — Story Treatment
## Logline
A cosmic diva and a lone astronaut discover each other across the stars — their gravity irresistible, their love literally lifting them off the ground.

## Visual Approach
Retro-futurist disco aesthetic: 1970s NASA mission-control panels fused with Studio 54 mirror balls and modern synth-pop neon. The color language shifts between the warmth of gold and magenta (Dua's world) and the cool blues and silvers of deep space (Astronaut's world), merging into blinding white light at the bridge kiss. Camera vocabulary: slow-motion Steadicam for intimacy, crane sweeps for euphoria, and a single unbroken drone spiral at the final chorus.

## Scene Breakdown

### Intro (00:00 – 00:14)
Cold open on infinite black space. A single point of gold light. Pull back to reveal: the observation dome of a retro-futurist orbiting space station, all curved glass and brushed aluminium. DUA stands at the apex, back to camera, hair and dress floating gently in near-zero gravity. The stars beyond are impossibly dense. She places one hand on the glass. We see her face reflected — she is smiling.

### Verse 1 (00:14 – 00:42)
Cut to the interior of the space station — a dazzling corridor of mirrored surfaces and softly pulsing control panels. Dua walks with easy, weightless grace, each step a little longer than physics should allow. We cut interleave with: the Astronaut in his module, receiving an anomalous signal on his instruments. He adjusts his headset. Through the static he hears — her voice.

### Pre-Chorus (00:42 – 00:57)
Dua reaches the central hub — a cavernous circular room with a revolving disco ball the size of a small moon hanging at its center. The disco ball begins to spin. Light fractures across every surface. She raises her arms. The camera cranes up.

### Chorus 1 (00:57 – 01:27)
She levitates. Full body. Slowly at first, then with total abandon. The disco ball orbits her like a satellite. Neon rings — magenta, electric blue, gold — ripple outward from her body like gravitational waves. Ensemble dancers in silver cosmonaut suits rise around her, performing a choreographed routine that mirrors orbital mechanics. The Astronaut, on his side, watches the signal resolve into a visual — her silhouette, dancing, suspended among the stars. He is transfixed.

### Verse 2 (01:27 – 01:54)
Dua descends to the surface of the Moon. The earth hangs enormous in the sky behind her. She dances alone — fluid, unhurried — leaving glowing footprints on the lunar dust. Close-ups: her eyes reflecting the Milky Way. Her hand trailing through floating moondust particles. Her smile, private and certain. Meanwhile the Astronaut fires his thrusters and changes course.

### Pre-Chorus 2 (01:54 – 02:09)
Dua steps into the zero-gravity neon dance club — a floating platform in space, open-sided, packed with silver-suited dancers, mirror balls and holographic neon signs. The energy builds. She takes the floor. Bodies around her mirror her every move.

### Chorus 2 (02:09 – 02:39)
Peak euphoria. Dua and her ensemble execute the full signature choreography. The camera executes its unbroken crane spiral. At the midpoint of this chorus, the Astronaut's pod docks at the station. He drifts through the airlock. Their eyes meet across the club floor. He is still in his suit. She extends one hand. He takes it.

### Bridge (02:39 – 02:55)
Slow motion. They float together at the center of the dance floor, forehead to forehead. The music strips to near silence. All other dancers freeze. The mirror ball above them fragments their faces into thousands of tiny lights. She whispers "Kiss me out of this world." He obliges. When they kiss, the frozen club explodes back into motion — light, movement, and color.

### Final Chorus (02:55 – 03:15)
Both of them levitate together. The ensemble erupts. The space station, the moon, the neon club — all visible simultaneously through the observation dome. The camera pulls back in one impossible drone shot that starts on their intertwined hands and ends outside the station, looking in on a tiny pocket of joy in an infinite universe.

### Outro (03:15 – 03:23)
Black. A single gold point of light. The sound of her laughter, fading into the cosmos.
`,
  },

  /* ── Step 5: Character Bible ────────────────────────────────────────────── */
  characterBible: [
    {
      id: "lev-char-1",
      name: "Dua — The Cosmic Diva",
      age: 27,
      gender: "Female",
      archetype: "The Explorer",
      appearance: {
        faceShape: "Oval",
        hair: "Dark brown, long, worn loose with a slight wave — floats in zero-g during performance sections",
        skinTone: "Medium olive, warm undertone",
        build: "Slim, 5'8\", dancer's posture",
        clothing: "Verse: iridescent gold bodysuit with flared sleeves and thigh-high gold boots. Chorus: full-length magenta disco dress with hundreds of mirror-sequin panels. Bridge: stripped-back white satin slip, barefoot.",
        accessories: "Oversized gold hoop earrings, single diamond choker, rings on every finger",
      },
      voiceNotes: "Warm, breathy alto with sudden soaring bursts. Delivery is playful but magnetic — she is never trying too hard.",
      performanceStyle: "Fluid Grace",
      consistencyLocked: true,
    },
    {
      id: "lev-char-2",
      name: "The Astronaut — Lone Signal",
      age: 30,
      gender: "Male",
      archetype: "The Lover",
      appearance: {
        faceShape: "Strong jaw, angular",
        hair: "Dark, cropped close, slightly dishevelled from the helmet",
        skinTone: "Deep warm brown",
        build: "Athletic, broad-shouldered, 6'0\"",
        clothing: "Vintage-style white space suit with gold visor and retro NASA patch aesthetic. Removes helmet by Verse 2 to reveal his face.",
        accessories: "Gold mission badge, worn leather glove removed in the bridge scene",
      },
      voiceNotes: "Non-vocal. Communicates entirely through stillness, gaze, and gradual physical thaw as the song progresses.",
      performanceStyle: "Slow Burn",
      consistencyLocked: true,
    },
  ],

  /* ── Step 6: World Bible ────────────────────────────────────────────────── */
  worldBible: {
    timePeriod: "Retro-Futurist — 1970s aesthetic projected 200 years forward",
    physicsRules: "Gravity is optional and responds to emotional intensity. The more euphoric the moment, the more bodies rise. During the bridge, even sound becomes visible — vibrating as golden sine waves in the air.",
    atmosphere: ["Cosmic Wonder", "Disco Euphoria", "Zero-Gravity Intimacy", "Retro-Futurist Glamour"],
    dominantColors: ["#1a0a2e", "#f5c518", "#d946b0", "#3b82f6", "#e2e8f0"],
    locations: [
      {
        id: "lev-loc-1",
        name: "Orbiting Space Station — Observation Dome",
        type: "Space Station Interior / Exterior",
        timeOfDay: "Eternal Night / Starfield",
        weather: "Vacuum — no weather; interior is climate-controlled and warmly lit",
        culturalMarkers: "Retro NASA brutalist architecture fused with 1970s lounge design — teak panels, amber instrument lighting, analogue dials, curved Kubrick corridors",
        description: "A vast circular observation dome of curved glass and brushed aluminium perched at the apex of a rotating space station. The stars beyond are impossibly dense — the Milky Way fills the entire field of view. Inside: warm amber instrument lighting, a rotating central disco ball three metres across, control panels repurposed as DJ decks. The floor is polished black glass reflecting the starfield below. Gravity here is a suggestion — objects drift if left unattended. Dua's domain.",
      },
      {
        id: "lev-loc-2",
        name: "Lunar Surface — Sea of Tranquility",
        type: "Exterior Planetary",
        timeOfDay: "Lunar Day — Earth visible on horizon",
        weather: "Airless, dust-still, eternally sun-bright on surface with harsh shadows",
        culturalMarkers: "Original Apollo landing site aesthetic — bootprints, planted gold flag, abandoned equipment — but reimagined as a personal dance floor",
        description: "An endless flat plain of fine grey moondust under a black sky. The Earth hangs enormous and blue at the horizon, providing the only colour contrast. Dua's footsteps leave permanent glowing prints — gold, slowly fading. Moondust particles she kicks up drift upward and never come down, forming a halo around her as she dances. The silence here is absolute; the music exists only in her body.",
      },
      {
        id: "lev-loc-3",
        name: "Zero-Gravity Neon Dance Club",
        type: "Space Platform — Exterior Open-Air Club",
        timeOfDay: "Deep Space Night",
        weather: "Open to space, force-field contained — dancers experience weightlessness without suits",
        culturalMarkers: "Studio 54 meets ISS — mirror balls, strobes, neon tubing in magenta and electric blue, but all floating in deep space with the Milky Way as the back wall",
        description: "A hexagonal platform the size of a football pitch, suspended in the void. Transparent floors and walls give full 360-degree views of the cosmos. Mirror balls orbit the space like miniature moons, throwing light in every direction. Neon tubes in magenta and electric blue trace the edges of the platform and spiral inward to the dance floor. Ensemble dancers in silver cosmonaut suits perform choreography here. It is simultaneously the most glamorous and most isolated place in the universe.",
      },
    ],
  },

  /* ── Step 7 (6b): Visual Style Guide ────────────────────────────────────── */
  visualStyleGuide: {
    colorPalette: ["#1a0a2e", "#f5c518", "#d946b0", "#3b82f6", "#e2e8f0", "#7c3aed"],
    lighting: "Practical Motivated",
    cameraLanguage: "Steadicam Float",
    lensCharacteristics: "Anamorphic flare, 40mm spherical equivalent, slight vignette",
    filmGrain: { enabled: true, intensity: 0.3 },
    colorGradingStyle: "Magenta / Gold with deep indigo shadows",
    referenceMood: "Saturday Night Fever meets Interstellar — disco glamour with the scale and awe of deep space",
  },

  /* ── Step 8: Beat Sheet ─────────────────────────────────────────────────── */
  beatSheet: [
    {
      beatId: "lev-beat-1",
      startTime: "00:00",
      endTime: "00:14",
      songSection: "Intro",
      visualAction:
        "Cold open on black. A single gold pinprick of light expands into the observation dome. Dua stands at the apex, back to camera, hand on glass, hair floating. She turns — wide eyes, secret smile. The stars blaze behind her.",
      emotion: "Contemplative",
      characterIds: ["lev-char-1"],
      locationId: "lev-loc-1",
    },
    {
      beatId: "lev-beat-2",
      startTime: "00:14",
      endTime: "00:42",
      songSection: "Verse",
      visualAction:
        "Dua moves through the mirrored corridors of the station — each step a little too long, defying gravity. Intercut with the Astronaut in his pod hearing her voice through static. His instruments spike as he picks up the signal. He leans forward, transfixed.",
      emotion: "Yearning",
      characterIds: ["lev-char-1", "lev-char-2"],
      locationId: "lev-loc-1",
    },
    {
      beatId: "lev-beat-3",
      startTime: "00:42",
      endTime: "00:57",
      songSection: "Pre-Chorus",
      visualAction:
        "Dua enters the central hub. The giant disco ball begins to rotate. Light fractures into thousands of fragments across every surface. She raises both arms, head tilted back. Camera cranes up slowly. The energy builds — electric.",
      emotion: "Confident",
      characterIds: ["lev-char-1"],
      locationId: "lev-loc-1",
    },
    {
      beatId: "lev-beat-4",
      startTime: "00:57",
      endTime: "01:27",
      songSection: "Chorus",
      visualAction:
        "She levitates — slowly at first, then with full abandon. The disco ball orbits her. Neon gravitational rings ripple outward. Ensemble dancers in silver cosmonaut suits rise around her in choreographed orbital patterns. The Astronaut's instruments resolve her silhouette — he fires his thrusters and changes course toward her.",
      emotion: "Euphoric",
      characterIds: ["lev-char-1", "lev-char-2"],
      locationId: "lev-loc-1",
    },
    {
      beatId: "lev-beat-5",
      startTime: "01:27",
      endTime: "01:54",
      songSection: "Verse",
      visualAction:
        "Dua alone on the lunar surface. She dances in the silence of the moon, leaving glowing gold footprints. Earth hangs vast on the horizon. Close-ups: her eyes reflecting the Milky Way, moondust drifting upward around her hands, her expression blissful and self-contained. The Astronaut's pod is a distant streak of light crossing the sky.",
      emotion: "Intimate",
      characterIds: ["lev-char-1"],
      locationId: "lev-loc-2",
    },
    {
      beatId: "lev-beat-6",
      startTime: "01:54",
      endTime: "02:39",
      songSection: "Chorus",
      visualAction:
        "The zero-gravity neon dance club. Full ensemble. Dua executes the signature choreography. The unbroken crane spiral. At midpoint: the Astronaut docks, drifts through the airlock, still in his suit. Their eyes meet across the floor. She extends one hand. He takes it. They levitate together for the first time — tentative, then certain.",
      emotion: "Ecstatic",
      characterIds: ["lev-char-1", "lev-char-2"],
      locationId: "lev-loc-3",
    },
    {
      beatId: "lev-beat-7",
      startTime: "02:39",
      endTime: "02:55",
      songSection: "Bridge",
      visualAction:
        "Slow motion. All dancers freeze. Dua and the Astronaut float forehead-to-forehead. The mirror ball fragments their faces into a thousand gold lights. She whispers. He removes his glove. She takes his bare hand. They kiss — and the frozen world explodes back into light and motion.",
      emotion: "Serene",
      characterIds: ["lev-char-1", "lev-char-2"],
      locationId: "lev-loc-3",
    },
    {
      beatId: "lev-beat-8",
      startTime: "02:55",
      endTime: "03:23",
      songSection: "Chorus",
      visualAction:
        "Final eruption — both levitate, ensemble at full force. Impossible drone shot pulls back from their intertwined hands, out through the dome, past the station hull, into deep space — a tiny pocket of gold light and joy in the infinite dark. Slow fade to a single gold point of light. Black.",
      emotion: "Triumphant",
      characterIds: ["lev-char-1", "lev-char-2"],
      locationId: "lev-loc-3",
    },
  ],

  /* ── Step 9: Shot List ──────────────────────────────────────────────────── */
  shotList: [
    {
      shotId: "lev-shot-1",
      beatRef: "lev-beat-1",
      startTime: "00:00",
      endTime: "00:07",
      shotType: "Wide",
      cameraMovement: "Slow Dolly In",
      description:
        "Dua at observation dome apex, back to camera, hand on glass, hair floating in zero-g. City of stars beyond. Camera dollies slowly toward her.",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] A woman with an oval face, long dark wavy hair floating in zero gravity, medium olive warm skin, slim 5'8\" build, wearing an iridescent gold bodysuit with flared sleeves and thigh-high gold boots — stands at the apex of a curved glass observation dome on a retro-futurist space station. Her back is to camera, one hand pressed flat against the glass. Beyond the glass: an impossibly dense starfield, the full Milky Way. Interior lighting: warm amber instrument glow from analogue control panels. Camera slowly dollies forward. Hair and a few loose strands drift upward in near-zero gravity. Shot on 40mm anamorphic lens, shallow depth of field, subtle film grain. Color palette: deep indigo blacks, warm gold highlights. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic cinematography. A woman — oval face, long dark wavy hair, medium olive warm skin, slim 5'8\" build — wearing an iridescent gold bodysuit, flared sleeves, thigh-high gold boots stands with her back to camera at the apex of a vast curved-glass observation dome. Her palm rests on the cold glass. Beyond: dense starfield, Milky Way arc. Warm amber instrument lighting reflects in the glass. Hair floats imperceptibly in near-zero gravity. Camera on a slow Steadicam dolly toward her — chest height, 40mm anamorphic T2.0, shallow DOF. Subtle film grain. Color grade: deep indigo shadows, warm gold specular. Behavioral detail: slight involuntary inhale, fingertips spread slowly on the glass. Avoid: deformed hands, text, extra limbs.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] Cinematic wide shot. Woman with oval face, long dark wavy floating hair, olive skin, gold iridescent bodysuit with flared sleeves and thigh-high gold boots — stands back-to-camera at curved glass observation dome apex aboard retro space station. Infinite starfield beyond. Warm amber interior. Camera slow dolly in. Zero-gravity hair drift. 40mm anamorphic flare. Deep indigo / gold palette. Film grain. Mood: cosmic wonder, intimate solitude. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, modern clothing, CGI plastic look",
      motionBucket: 80,
      seed: 77001,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-2",
      beatRef: "lev-beat-1",
      startTime: "00:07",
      endTime: "00:14",
      shotType: "Medium Close-Up",
      cameraMovement: "Static",
      description:
        "Dua turns to face camera. Her face reflected in the observation glass, the starfield doubling behind her. Wide eyes, slow private smile.",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] The woman turns to face camera — oval face, long dark wavy hair floating gently, medium olive warm skin, expressive dark eyes, gold iridescent bodysuit. She is standing at the curved glass dome, the starfield visible both behind her and in reflection, doubling the stars. Her expression: wide eyes slowly resolving into a private, certain smile. Static camera, medium close-up, eye level. Warm amber light sculpts her face from below-right; starlight halos her hair. Anamorphic lens flare catches the edge of her cheekbone. 40mm, shallow DOF, film grain. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic. Woman turns slowly — oval face, floating dark waves, warm olive skin, gold iridescent bodysuit. Reflected in the curved observation glass: both her face and the infinite starfield behind her. Expression: gaze opens wide, then corners of the mouth lift into a slow, private smile. Eye-level static medium close-up. Warm amber from instrument panels; cool blue starlight rim. 40mm anamorphic, T2.0, shallow DOF. Natural blink at 3s. Film grain. Behavioral: a single slow exhale, hair drifts slightly. Color: deep indigo / warm gold. Avoid: deformed hands, text, extra limbs.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] MCU. Woman turns to camera — oval face, dark floating waves, olive skin, gold bodysuit. Observation glass reflects her face and the starfield simultaneously. Wide-to-smile expression arc. Static camera, eye level. Amber instrument light key, starlight rim. Anamorphic flare. 40mm. Film grain. Deep indigo / gold palette. Mood: intimate revelation. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, over-saturated skin",
      motionBucket: 60,
      seed: 77002,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-3",
      beatRef: "lev-beat-3",
      startTime: "00:42",
      endTime: "00:57",
      shotType: "Medium Wide",
      cameraMovement: "Crane Up",
      description:
        "Dua enters the central hub. Giant disco ball descends and begins rotating. Light explodes across every surface. She raises both arms. Camera cranes up from floor level to overhead.",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] The woman walks into a vast circular hub aboard a retro-futurist space station. A disco ball three metres across descends from the ceiling and begins to rotate — light fragments into thousands of moving points across the curved walls, floor, and her iridescent gold bodysuit. She raises both arms wide, head tilted back, eyes closed. Camera is at floor level and cranes upward to a bird's-eye view over the span of the shot. Warm amber instrument lighting base, overlaid with thousands of reflected disco fragments in gold and magenta. 40mm anamorphic, film grain, shallow DOF. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic. Woman in gold iridescent bodysuit enters circular station hub — the giant disco ball descends into frame, rotating. Thousands of light points scatter across curved walls and her body. She opens her arms wide, looks up. Camera cranes from ankle level to aerial — smooth, continuous. Warm amber base light; disco fragments in gold, magenta, electric blue overlay. 40mm anamorphic, T2.8, film grain. Behavioral: slight laugh escapes her at the moment light hits her face. Avoid: deformed hands, text, extra limbs.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] Medium wide. Circular retro space station hub. Giant disco ball rotating — light fragments everywhere in gold and magenta. Woman in gold iridescent bodysuit raises arms wide, head back. Camera cranes up from floor to overhead. Warm amber + disco fragment lighting. 40mm anamorphic flare. Film grain. Deep indigo / gold palette. Mood: euphoric anticipation. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, modern LED strip lights",
      motionBucket: 120,
      seed: 77003,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-4",
      beatRef: "lev-beat-4",
      startTime: "00:57",
      endTime: "01:10",
      shotType: "Wide",
      cameraMovement: "Drone",
      description:
        "First levitation. Dua rises off the floor, slow at first — gold bodysuit catching all the disco fragments. Ensemble dancers in silver cosmonaut suits rise around her. Drone circles the entire formation from above.",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] A woman in a gold iridescent bodysuit with flared sleeves rises weightlessly off the floor inside a circular space station hub. Her arms are extended, head tilted back, expression pure euphoria. Around her, six ensemble dancers in silver vintage-style cosmonaut suits also rise, forming an orbital ring. A giant disco ball rotates above all of them. Neon rings — magenta, electric blue, gold — pulse outward from Dua's body. Drone camera orbits the entire formation from above, descending slowly. Thousands of reflected light points in motion. 40mm anamorphic, film grain. Color: deep indigo shadows, gold and magenta light. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic wide. Woman in gold bodysuit levitates — body in full extension, euphoric — in a retro space station hub. Six silver cosmonaut-suited dancers orbit her, also airborne. Giant disco ball above. Neon gravitational rings ripple outward in magenta, blue, gold. Drone orbits from above, descending. All bodies in continuous slow drift. Practical light sources: disco ball reflections, neon tubes. 40mm anamorphic, T2.8, film grain. Color: deep indigo / gold / magenta. Avoid: deformed hands, text, extra limbs, plastic look.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] Wide drone shot. Woman in gold iridescent bodysuit levitates at center of circular space station hub — arms extended, euphoric. Six silver cosmonaut dancers orbit her airborne. Giant disco ball rotating above. Neon rings rippling outward in magenta, blue, gold. Drone circles from overhead, descending. Deep indigo / gold / magenta palette. Film grain. Mood: orbital euphoria. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, wires visible, CGI plastic",
      motionBucket: 150,
      seed: 77004,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-5",
      beatRef: "lev-beat-5",
      startTime: "01:27",
      endTime: "01:40",
      shotType: "Medium",
      cameraMovement: "Steadicam Follow",
      description:
        "Dua dances alone on the lunar surface. Steadicam follows at medium distance. Her glowing gold footprints trail behind her. Earth vast on the horizon.",
      genaiTool: "seedance_2",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] A woman in a full-length magenta disco dress with hundreds of mirror-sequin panels dances alone on the surface of the Moon. The ground is fine grey lunar dust; her footsteps leave glowing gold prints that slowly fade. The Earth hangs enormous and blue on the horizon behind her — half in shadow. The sky above is absolute black. She moves with fluid, unhurried grace — a private dance for no audience. Steadicam follows at medium distance, tracking her from slightly behind-left. Moondust she kicks up drifts upward and never falls. Shot on 40mm anamorphic, shallow DOF, film grain. Color palette: grey lunar ground, gold footprints, deep blue Earth, absolute black sky, magenta dress. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic medium. Woman in magenta mirror-sequin disco dress dances on lunar surface — grey moondust, total airless silence. Glowing gold footprints trail behind her. Earth blue-and-white on horizon. Black sky. Steadicam follows at medium distance. Moondust drifts upward, doesn't fall. Her expression: private bliss. 40mm anamorphic, T2.8, film grain. Behavioral: hair lifted off shoulders despite no wind — zero-g effect. Color: grey/gold/blue/magenta. Avoid: deformed hands, text, extra limbs.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] Medium Steadicam. Woman in magenta mirror-sequin dress dances on the Moon — grey dust surface, glowing gold footprints, black sky, enormous blue Earth on horizon. Fluid private dance. Moondust drifts up. 40mm anamorphic flare. Film grain. Grey / gold / blue / magenta palette. Mood: intimate solitude in the cosmos. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, blue sky, atmosphere, clouds on horizon",
      motionBucket: 110,
      seed: 77005,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-6",
      beatRef: "lev-beat-6",
      startTime: "01:54",
      endTime: "02:15",
      shotType: "Wide",
      cameraMovement: "Crane Up",
      description:
        "The zero-gravity neon dance club at full ensemble. Crane rises from floor level to reveal the full floating platform against the cosmos. All dancers in silver cosmonaut suits. Mirror balls orbiting. Neon magenta and electric blue edges.",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] A hexagonal platform floating in deep space — transparent floors and walls offering full 360-degree views of the cosmos and Milky Way. On it: Dua in her magenta mirror-sequin disco dress and twelve ensemble dancers in silver vintage cosmonaut suits performing synchronized choreography. Multiple mirror balls orbit the platform like moons, throwing light in every direction. Neon tubes in magenta and electric blue trace the platform edges. All dancers semi-weightless — bodies bouncing slightly above the floor. Camera cranes up from floor level to reveal the full platform against the infinite starfield. 40mm anamorphic, film grain, deep indigo shadows, magenta/blue neon light. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] Photorealistic wide. Floating hexagonal dance platform in deep space — transparent surfaces, Milky Way visible in every direction. Dua in magenta sequin dress leads twelve silver cosmonaut-suited dancers. Mirror balls orbit the platform. Neon edges: magenta and electric blue. Bodies slightly elevated — zero-g bounce. Camera cranes up from near-floor to aerial. Practical neon and mirror ball light sources. 40mm anamorphic, T2.8, film grain. Color: deep indigo void, magenta/blue neon, silver. Avoid: deformed hands, text, extra limbs, plastic look.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] Wide crane up. Floating space dance club — hexagonal transparent platform in deep space. Dua in magenta sequin dress, twelve silver cosmonaut dancers. Mirror balls orbiting platform. Neon magenta / electric blue edges. Zero-g semi-weightlessness. Camera cranes from floor to overhead. Milky Way visible in all directions through transparent floor and walls. Film grain. Deep indigo / magenta / blue palette. Mood: disco euphoria at cosmic scale. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, modern fashion, CGI plastic, lens flare overexposure",
      motionBucket: 130,
      seed: 77006,
      characterRefs: ["lev-char-1"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-7",
      beatRef: "lev-beat-7",
      startTime: "02:39",
      endTime: "02:55",
      shotType: "Close-Up",
      cameraMovement: "Slow Dolly In",
      description:
        "Slow motion. Dua and the Astronaut float forehead-to-forehead. The mirror ball fragments their faces into gold light. He removes his glove. She takes his bare hand. The kiss.",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Slow motion close-up. Two faces floating forehead-to-forehead in zero gravity — a woman (oval face, dark wavy hair, olive skin, white satin slip, diamond choker) and a man (angular jaw, dark cropped hair, deep warm brown skin, vintage white space suit). All other motion around them frozen. A giant mirror ball above fragments their faces into thousands of moving gold light points. He slowly removes his leather glove — she takes his bare hand in both of hers. Camera slow dollies in. They close their eyes. Their lips meet — and at the kiss instant, light explodes outward in a radial burst. 120fps slow motion. 40mm anamorphic, film grain, shallow DOF. Color: white, gold, deep indigo. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Photorealistic slow-motion close-up. Two faces, forehead-to-forehead, floating in zero gravity. Woman: oval face, dark wavy hair, olive skin, white satin slip, diamond choker. Man: angular jaw, dark close-cropped hair, deep warm brown skin, vintage NASA-style suit. Mirror ball above shatters their features into golden light fragments. His glove removed — her hands take his. Slow dolly in. Eyes close. Kiss — radial light burst. 120fps. 40mm anamorphic, T2.0, shallow DOF. Behavioral: single tear on her cheek catches a gold light fragment. Film grain. Color: white / gold / deep indigo. Avoid: deformed hands, text, extra limbs.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Close-up slow motion. Two faces forehead-to-forehead in zero gravity. Woman: dark waves, olive skin, white satin, diamond choker. Man: angular jaw, warm brown skin, white vintage space suit. Mirror ball light fragments gold across both faces. Glove removed. Hands joined. Kiss — light burst. Slow dolly in. 120fps. 40mm anamorphic flare. Film grain. White / gold / deep indigo palette. Mood: the universe pauses. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, motion blur on faces",
      motionBucket: 50,
      seed: 77007,
      characterRefs: ["lev-char-1", "lev-char-2"],
      consistencyApplied: true,
    },
    {
      shotId: "lev-shot-8",
      beatRef: "lev-beat-8",
      startTime: "02:55",
      endTime: "03:23",
      shotType: "Extreme Wide",
      cameraMovement: "Drone",
      description:
        "The impossible pull-back. From intertwined hands, out through the dome, past the station hull, into deep space. A tiny gold light in the infinite dark. Fade to black.",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Begin on a close-up of two intertwined hands — one in a gold disco-ring-covered hand, one bare warm-brown-skinned — both floating in zero gravity. Pull back continuously: reveal the couple levitating together on the dance platform, then pull back further through the transparent dome wall, past the exterior of the retro space station hull, further into deep space until the entire station is a tiny glowing speck against the Milky Way. The couple visible as a single gold point of warmth. Drone camera. Single continuous pull-back shot. The pace slows to near-stop. Fade to black over the final five seconds. 40mm anamorphic, film grain. Color: deep indigo cosmos, gold warmth at center, silver station. Avoid: deformed hands, blurry faces, text artifacts, extra limbs.",
        veo_3_1:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Photorealistic drone extreme wide pull-back. Opens on intertwined hands — gold rings, bare brown skin. Continuous pull-back: floating couple on dance platform → through transparent dome → exterior station hull → deep space until station is a pinprick of gold against infinite Milky Way. Pace decelerates to near-stillness. Black fade last 5 seconds. 40mm anamorphic, film grain, deep indigo / gold. Behavioral: the gold light flickers once, warmly, before the fade. Avoid: deformed hands, text, extra limbs, CGI plastic.",
        kling_2_5:
          "[Same character: Dua — The Cosmic Diva] and [Same character: The Astronaut — Lone Signal] Extreme wide drone pull-back. Open: intertwined hands in zero gravity. Pull back through dome, past station hull, into deep space — station shrinks to gold speck against Milky Way. Continuous single shot. Pace slows. Fade to black. 40mm anamorphic flare. Film grain. Deep indigo / gold palette. Mood: cosmic insignificance as profound intimacy. Avoid: deformed hands, blurry faces, text artifacts, nudity.",
      },
      negativePrompt:
        "deformed hands, blurry faces, text artifacts, extra limbs, nudity, sudden cuts, jarring motion",
      motionBucket: 70,
      seed: 77008,
      characterRefs: ["lev-char-1", "lev-char-2"],
      consistencyApplied: true,
    },
  ],

  /* ── Global settings ────────────────────────────────────────────────────── */
  globalNegativePrompt:
    "deformed hands, blurry faces, text artifacts, extra limbs, nudity, modern streetwear, lens flare overburn, plastic CGI sheen, culturally insensitive imagery",
  publishingMetadata: {
    titleTemplate: "Levitating — Dua Lipa (Cosmic Disco Cut) | CineIQ MV Studio",
    description:
      "A retro-futurist disco love story set among the stars. Directed for Hungama using the CineIQ MV pipeline.",
    tags: ["levitating", "dua lipa", "music video", "disco", "space", "retro futurist", "hungama"],
    bestPostTime: "Friday 8pm IST",
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
