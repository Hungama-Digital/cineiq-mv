/**
 * Curated Unsplash URLs for demo images.
 *
 * Unsplash direct image URLs — no API key needed, stable CDN.
 * All images are free-to-use per Unsplash license.
 *
 * Phase 4: replace with Ideogram-generated images stored in S3.
 */

export const DEMO_IMAGES = {
  // Concept thumbnails (indexed by concept ID)
  concepts: {
    // Set A
    "concept-a1": "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&h=450&fit=crop",
    "concept-a2": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop",
    "concept-a3": "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&h=450&fit=crop",
    // Set B
    "concept-b1": "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=800&h=450&fit=crop",
    "concept-b2": "https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?w=800&h=450&fit=crop",
    "concept-b3": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800&h=450&fit=crop",
    // Set C
    "concept-c1": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=450&fit=crop",
    "concept-c2": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop",
    "concept-c3": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
  } as Record<string, string>,

  // Character portraits (indexed by character ID)
  characters: {
    "char-a1": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    "char-a2": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "char-b1": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    "char-b2": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "char-b3": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    // Legacy mock IDs
    "char-1": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    "char-2": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "char-3": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
  } as Record<string, string>,

  // Location hero images (indexed by location ID)
  locations: {
    "loc-1": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=450&fit=crop",
    "loc-2": "https://images.unsplash.com/photo-1557682233-43e671455dfa?w=800&h=450&fit=crop",
    "loc-3": "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=450&fit=crop",
  } as Record<string, string>,

  // Style frame galleries (indexed by preset ID)
  styleFrames: {
    "cinematic-grit": [
      "https://images.unsplash.com/photo-1505506874110-6a7a69ab006e?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1533234427049-9e9bb093186d?w=640&h=360&fit=crop",
    ],
    "neon-noir": [
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1517036465894-7a4e79a41ca2?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1542203054-d4a5e7b93f3d?w=640&h=360&fit=crop",
    ],
    "warm-bollywood": [
      "https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=640&h=360&fit=crop",
    ],
    "ghibli-fantasy": [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?w=640&h=360&fit=crop",
    ],
    "vintage-70s": [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=640&h=360&fit=crop",
      "https://images.unsplash.com/photo-1516575055160-a5b0ea3b5f99?w=640&h=360&fit=crop",
    ],
  } as Record<string, string[]>,

  // Generic fallback for any project cover
  fallbackCover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop",
}

export function conceptImage(conceptId: string): string {
  return DEMO_IMAGES.concepts[conceptId] ?? DEMO_IMAGES.fallbackCover
}

export function characterImage(charId: string): string {
  return (
    DEMO_IMAGES.characters[charId] ??
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop"
  )
}

export function locationImage(locId: string): string {
  return DEMO_IMAGES.locations[locId] ?? DEMO_IMAGES.fallbackCover
}

export function styleFrames(presetId: string): string[] {
  return DEMO_IMAGES.styleFrames[presetId] ?? DEMO_IMAGES.styleFrames["neon-noir"]
}
