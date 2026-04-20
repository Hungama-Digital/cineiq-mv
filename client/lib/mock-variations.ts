/**
 * Pre-baked regeneration variations. The store cycles through these in order
 * every time the user clicks "Regenerate" on a given step.
 *
 * Phase 2: swap these arrays for live CDA output from /generate/{step}.
 */

import type {
  Beat,
  CharacterBibleEntry,
  ConceptCard,
  Shot,
  StoryTreatment,
} from "./types"

/* ── Concepts (3 sets of 3) ───────────────────────────────────────────────── */

export const conceptVariations: ConceptCard[][] = [
  // Set A — cosmic / dreamy vibe
  [
    {
      id: "concept-a1",
      title: "Neon Reverie",
      logline:
        "A woman levitates through a futuristic city, her joy igniting every neon sign she drifts past.",
      visualHook: "Her fingertips leave trails of bioluminescent light on every surface.",
      legendaryAttributes: [1, 63, 80],
    },
    {
      id: "concept-a2",
      title: "Cosmic Waltz",
      logline:
        "Two lovers drift through space in a retro-futurist dance, their bodies becoming stardust at the chorus.",
      visualHook: "They spin in slow motion as entire galaxies swirl behind them.",
      legendaryAttributes: [30, 8, 48],
    },
    {
      id: "concept-a3",
      title: "Mirror Maze",
      logline:
        "A dancer trapped in infinite reflections finds freedom only through movement.",
      visualHook: "Every reflection shows a different emotion on her face.",
      legendaryAttributes: [13, 7, 66],
    },
  ],
  // Set B — gritty / street vibe
  [
    {
      id: "concept-b1",
      title: "Monsoon Cipher",
      logline:
        "Two rival dancers battle through rain-soaked Mumbai streets, the city itself keeping beat.",
      visualHook: "Puddles splash in perfect sync with every bass drop.",
      legendaryAttributes: [45, 58, 37],
    },
    {
      id: "concept-b2",
      title: "Train to Tomorrow",
      logline:
        "A young woman sprints alongside a moving train, leaping onto the last carriage as the chorus hits.",
      visualHook: "Every window reveals a different chapter of her past life.",
      legendaryAttributes: [18, 41, 75],
    },
    {
      id: "concept-b3",
      title: "Street Choir",
      logline:
        "Strangers across a city sing the song in fragments — together without ever meeting.",
      visualHook: "Match-cut transitions stitch their mouths into a single continuous line.",
      legendaryAttributes: [80, 17, 73],
    },
  ],
  // Set C — intimate / ritual vibe
  [
    {
      id: "concept-c1",
      title: "The Offering",
      logline:
        "A performer prepares a ritual for their beloved — lighting diyas that float up into a starless sky.",
      visualHook: "Each flame resolves into a memory of the couple.",
      legendaryAttributes: [49, 9, 46],
    },
    {
      id: "concept-c2",
      title: "Quiet Room",
      logline:
        "The entire song plays in a single bedroom — camera slowly rotating around a woman and her reflection.",
      visualHook: "The room rotates instead of the camera — she is the fixed point.",
      legendaryAttributes: [36, 74, 57],
    },
    {
      id: "concept-c3",
      title: "Return Flight",
      logline:
        "A migrant worker receives a letter; the song is the letter read back in his beloved's voice.",
      visualHook: "Handwritten verses scatter across his chest as he walks home.",
      legendaryAttributes: [71, 12, 82],
    },
  ],
]

/* ── Story treatments (3 tonal variations) ────────────────────────────────── */

export const treatmentVariations: StoryTreatment[] = [
  {
    version: 1,
    approved: false,
    content: `# Logline
{CONCEPT_TITLE} — anchored by our protagonist's emotional arc from stillness to surrender.

# Visual Approach
Anamorphic flare, teal-amber grading, subtle film grain. Steadicam float on close-ups; drone sweeps on wide establishing shots. Practical neon, no CGI skyline.

# Scene Breakdown
## Intro
Protagonist stands on a wet rooftop, back to camera, city lights blurring behind her. She turns, meets the lens. Glitter particles drift around her face.

## Verse 1
Cut to a mirrored warehouse. She walks forward; her reflection multiplies. A subtle dance move starts from the hips and spreads outward.

## Chorus
She rises off the floor. Neon signs around her pulse to the beat. Ensemble dancers mirror her movements on the rooftop.

## Bridge
Slow motion. Gravity loosens. The city's neon colours refract through a prism of water droplets.

## Outro
She lands gently. Camera pulls back into a drone shot. The city exhales.`,
  },
  {
    version: 1,
    approved: false,
    content: `# Logline
{CONCEPT_TITLE} — performance-first interpretation emphasizing dance and direct artist eye-contact.

# Visual Approach
High-contrast key light, hard shadows. Locked-off wide tableau for the choreography breaks; whip pans on transitions. Wardrobe: metallic textures that catch every beam.

# Scene Breakdown
## Intro
Single spotlight on the artist. Curtain drops. They hold the gaze for 8 bars before moving.

## Verse 1
Ensemble floods the stage, geometric formation. Artist carves through the middle.

## Chorus
Choreographic explosion — a signature move appears, repeated every chorus.

## Bridge
Ensemble freezes; artist alone continues in slow motion.

## Outro
Light collapses back to single spot; artist meets gaze again — cycle closes.`,
  },
  {
    version: 1,
    approved: false,
    content: `# Logline
{CONCEPT_TITLE} — abstract poetic interpretation, more sensory than narrative.

# Visual Approach
Extreme close-ups on textures — fabric folds, water drops, eyelashes, breath on glass. No single location; sensory mosaic. Heavy practical effects.

# Scene Breakdown
## Intro
A hand lighting a match. The flame holds for 12 seconds before moving.

## Verse 1
Fabric unfurling in slow-motion wind. Colour reveal at beat drop.

## Chorus
Montage of textures: honey pouring, petals falling, ink diffusing in water.

## Bridge
A single tear in extreme close-up, rolling in reverse.

## Outro
Fade to black leaving only the sound of breath.`,
  },
]

/* ── Characters (2 ensemble detections) ───────────────────────────────────── */

export const characterVariations: CharacterBibleEntry[][] = [
  // Set A — realist solo-protagonist
  [
    {
      id: "char-a1",
      name: "Aanya",
      age: 26,
      gender: "Female",
      archetype: "The Visionary",
      appearance: {
        faceShape: "Oval",
        hair: "Long wavy black, middle part, hip-length",
        skinTone: "Warm honey",
        build: "Slender, 5'6\"",
        clothing: "Flowing cream cotton dress, hand-embroidered borders",
        accessories: "Silver jhumka earrings, stacked bangles, bare feet",
      },
      voiceNotes: "Soft contralto, slight tremor on high notes",
      performanceStyle: "Contained Stillness",
      consistencyLocked: true,
    },
    {
      id: "char-a2",
      name: "Kabir",
      age: 30,
      gender: "Male",
      archetype: "The Lover",
      appearance: {
        faceShape: "Square",
        hair: "Short curly black, slight fade",
        skinTone: "Deep warm brown",
        build: "Athletic, 5'10\"",
        clothing: "Dark maroon kurta, rolled sleeves, linen pants",
        accessories: "Simple thread bracelet, stubble",
      },
      voiceNotes: "Warm baritone",
      performanceStyle: "Slow Burn",
      consistencyLocked: false,
    },
  ],
  // Set B — stylized ensemble
  [
    {
      id: "char-b1",
      name: "Mira",
      age: 24,
      gender: "Female",
      archetype: "The Rebel",
      appearance: {
        faceShape: "Heart",
        hair: "Platinum undercut, violet highlights, shoulder-length",
        skinTone: "Fair, cool undertone",
        build: "Lean athletic, 5'7\"",
        clothing: "Black leather crop jacket, ripped metallic silver pants, combat boots",
        accessories: "Multiple ear piercings, chunky chain, smokey kohl eyes",
      },
      voiceNotes: "Sharp alto, rap-forward",
      performanceStyle: "Kinetic Burst",
      consistencyLocked: true,
    },
    {
      id: "char-b2",
      name: "Arjun",
      age: 28,
      gender: "Male",
      archetype: "The Trickster",
      appearance: {
        faceShape: "Oval",
        hair: "Long straight black, slicked back",
        skinTone: "Medium warm",
        build: "Tall lean, 6'0\"",
        clothing: "Silk black Nehru collar shirt, slim trousers, patent loafers",
        accessories: "Gold signet ring, vintage watch, thin moustache",
      },
      voiceNotes: "Smooth tenor, theatrical",
      performanceStyle: "Playful Chaos",
      consistencyLocked: true,
    },
    {
      id: "char-b3",
      name: "Ensemble Dancers (x6)",
      age: 25,
      gender: "Mixed",
      archetype: "The Explorer",
      appearance: {
        faceShape: "Varies",
        hair: "Varies — sleek ponytails, natural textures",
        skinTone: "Diverse palette",
        build: "Trained dancer physiques",
        clothing: "Matching deep emerald silk tunics, black wide-leg pants",
        accessories: "Gold anklet bells",
      },
      voiceNotes: "Non-vocal",
      performanceStyle: "Fluid Grace",
      consistencyLocked: false,
    },
  ],
]

/* ── Beats (2 structural variations) ──────────────────────────────────────── */

export const beatVariations: Beat[][] = [
  // Set A — tight 9-beat structure (default)
  [
    {
      beatId: "beat-v1-1",
      startTime: "00:00",
      endTime: "00:08",
      songSection: "Intro",
      visualAction:
        "Protagonist stands on rooftop, back to camera, city lights blur behind her. She turns slowly, eyes meet camera.",
      emotion: "Contemplative",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-2",
      startTime: "00:08",
      endTime: "00:19",
      songSection: "Intro",
      visualAction:
        "Extreme close-up: her lips as she whispers the opening line. Glitter particles float around her face.",
      emotion: "Intimate",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-3",
      startTime: "00:19",
      endTime: "00:45",
      songSection: "Verse",
      visualAction:
        "Cut to mirrored warehouse. She walks forward, reflections multiplying. Subtle dance moves begin.",
      emotion: "Confident",
      characterIds: ["char-a1"],
      locationId: "loc-2",
    },
    {
      beatId: "beat-v1-4",
      startTime: "00:45",
      endTime: "01:15",
      songSection: "Chorus",
      visualAction:
        "She levitates off the floor. Neon signs around her pulse with the beat. Ensemble mirrors on rooftop.",
      emotion: "Euphoric",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-5",
      startTime: "01:15",
      endTime: "01:40",
      songSection: "Verse",
      visualAction:
        "Close-ups: fingertips leaving trails of light on glass, water pooling on the floor.",
      emotion: "Intimate",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-6",
      startTime: "01:40",
      endTime: "02:10",
      songSection: "Bridge",
      visualAction:
        "Slow motion. Gravity loosens. City neon refracts through water droplets suspended mid-air.",
      emotion: "Serene",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-7",
      startTime: "02:10",
      endTime: "02:30",
      songSection: "Chorus",
      visualAction:
        "All characters on rooftop together; final climactic dance move; camera orbits then pulls back into drone wide.",
      emotion: "Triumphant",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v1-8",
      startTime: "02:30",
      endTime: "03:23",
      songSection: "Outro",
      visualAction:
        "She lands softly. Drone pulls back to reveal entire city. The neon pulses fade to black.",
      emotion: "Melancholic",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
  ],
  // Set B — looser 6-beat, bridge-emphasized
  [
    {
      beatId: "beat-v2-1",
      startTime: "00:00",
      endTime: "00:22",
      songSection: "Intro",
      visualAction:
        "Protagonist enters a moonlit courtyard. Drone orbits 360° around her as she looks up.",
      emotion: "Yearning",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v2-2",
      startTime: "00:22",
      endTime: "00:55",
      songSection: "Verse",
      visualAction:
        "Flashback montage. Quick match-cuts between her hands, his hands, coffee being poured, fabric brushing.",
      emotion: "Intimate",
      characterIds: ["char-a1", "char-a2"],
      locationId: "loc-3",
    },
    {
      beatId: "beat-v2-3",
      startTime: "00:55",
      endTime: "01:45",
      songSection: "Chorus",
      visualAction:
        "Full ensemble sequence. Protagonist in center, dancers orbit in spiral formation.",
      emotion: "Ecstatic",
      characterIds: ["char-a1"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v2-4",
      startTime: "01:45",
      endTime: "02:30",
      songSection: "Bridge",
      visualAction:
        "Extended solo — she moves alone through falling petals. Time appears to slow and reverse.",
      emotion: "Tense",
      characterIds: ["char-a1"],
      locationId: "loc-3",
    },
    {
      beatId: "beat-v2-5",
      startTime: "02:30",
      endTime: "03:00",
      songSection: "Chorus",
      visualAction:
        "Reunion. Protagonist and partner find each other mid-crowd. Slow-motion embrace.",
      emotion: "Triumphant",
      characterIds: ["char-a1", "char-a2"],
      locationId: "loc-1",
    },
    {
      beatId: "beat-v2-6",
      startTime: "03:00",
      endTime: "03:23",
      songSection: "Outro",
      visualAction: "Final slow pull-back to wide sky shot. Silhouettes against dawn.",
      emotion: "Serene",
      characterIds: ["char-a1", "char-a2"],
      locationId: "loc-1",
    },
  ],
]

/* ── Shots (2 variations) ─────────────────────────────────────────────────── */

function samplePromptSeedance(beatDesc: string, charName: string, charAppearance: string) {
  return `[Same character: ${charName}] ${charAppearance} — performs a slow, fluid contemporary dance move, her arms floating upward as if levitating. Camera slowly dollies in, soft golden backlight creating a halo effect. ${beatDesc} Natural weight shift visible in her hips, subtle micro-expressions on her face, gentle breeze moving her hair. Shot on 35mm anamorphic lens, shallow depth of field, film grain overlay. Color palette: deep teal, muted blue, warm amber accents. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.`
}

function samplePromptVeo(beatDesc: string, charName: string, charAppearance: string) {
  return `[Same character: ${charName}] Photorealistic cinematography of ${charAppearance}. ${beatDesc} Natural lighting from practical neon signs; subtle key from above creates an anamorphic flare. She exhales gently, chest rising; her hair catches a crosswind. Camera glides on a steadicam at chest height, 35mm anamorphic lens, T2.8, shallow depth of field. Subtle film grain. Color grading: teal shadows, amber highlights. Behavioral ticks: natural blink every 3 seconds, subtle weight shift onto right foot, fingers curl slightly. Avoid: deformed hands, blurry faces, text, extra limbs.`
}

function samplePromptKling(beatDesc: string, charName: string, charAppearance: string) {
  return `[Same character: ${charName}] A dynamic cinematic shot of ${charAppearance} rising weightlessly as neon lights pulse in sync. ${beatDesc} Drone camera orbits, sweeping from medium to wide, crane ascending. Lighting: high contrast, rim light from neon signs behind, soft amber fill. Mood: euphoric, cosmic, epic scale. Slow motion 120fps. Anamorphic flare, 35mm lens equivalent. Color palette: teal, electric blue, amber. Avoid: deformed hands, blurry faces, text artifacts, extra limbs, nudity.`
}

const DEFAULT_APPEARANCE =
  "a woman with an oval face, long wavy black hair, warm honey skin tone, slim 5'6\" build, wearing a flowing cream cotton dress with embroidered borders, silver jhumka earrings, stacked bangles"

const DEFAULT_BEAT =
  "The scene is set on a wet rooftop overlooking a futuristic city at night, neon reflections shimmering on the ground, starry sky above."

export const shotVariations: Shot[][] = [
  [
    {
      shotId: "shot-v1-1",
      beatRef: "beat-v1-1",
      startTime: "00:00",
      endTime: "00:08",
      shotType: "Wide",
      cameraMovement: "Static",
      description: "Protagonist stands on rooftop, back to camera, city lights blur behind",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs, nudity",
      motionBucket: 127,
      seed: 12345,
      characterRefs: ["char-a1"],
      consistencyApplied: true,
    },
    {
      shotId: "shot-v1-2",
      beatRef: "beat-v1-2",
      startTime: "00:08",
      endTime: "00:12",
      shotType: "Extreme Close-Up",
      cameraMovement: "Slow Dolly In",
      description: "Her lips as she whispers opening line. Glitter particles around face.",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
      motionBucket: 90,
      seed: 23456,
      characterRefs: ["char-a1"],
      consistencyApplied: true,
    },
    {
      shotId: "shot-v1-3",
      beatRef: "beat-v1-3",
      startTime: "00:19",
      endTime: "00:45",
      shotType: "Medium",
      cameraMovement: "Steadicam Follow",
      description: "Walking forward in mirrored warehouse, reflections multiplying",
      genaiTool: "seedance_2",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
      motionBucket: 140,
      seed: 34567,
      characterRefs: ["char-a1"],
      consistencyApplied: true,
    },
  ],
  [
    {
      shotId: "shot-v2-1",
      beatRef: "beat-v2-1",
      startTime: "00:00",
      endTime: "00:22",
      shotType: "Wide",
      cameraMovement: "Drone",
      description: "Moonlit courtyard, drone 360° orbit around protagonist",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
      motionBucket: 150,
      seed: 45678,
      characterRefs: ["char-a1"],
      consistencyApplied: true,
    },
    {
      shotId: "shot-v2-2",
      beatRef: "beat-v2-2",
      startTime: "00:22",
      endTime: "00:55",
      shotType: "Close-Up",
      cameraMovement: "Handheld",
      description: "Match-cut montage between hands, objects, textures",
      genaiTool: "veo_3_1",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
      motionBucket: 70,
      seed: 56789,
      characterRefs: ["char-a1", "char-a2"],
      consistencyApplied: true,
    },
    {
      shotId: "shot-v2-3",
      beatRef: "beat-v2-3",
      startTime: "00:55",
      endTime: "01:45",
      shotType: "Wide",
      cameraMovement: "Crane Up",
      description: "Full ensemble spiral — crane ascends as formation expands",
      genaiTool: "kling_2_5",
      prompts: {
        seedance_2: samplePromptSeedance(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        veo_3_1: samplePromptVeo(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
        kling_2_5: samplePromptKling(DEFAULT_BEAT, "Aanya", DEFAULT_APPEARANCE),
      },
      negativePrompt: "deformed hands, blurry faces, text artifacts, extra limbs",
      motionBucket: 180,
      seed: 67890,
      characterRefs: ["char-a1"],
      consistencyApplied: true,
    },
  ],
]
