# PRD - Music Video Module - CineIQ

## Table of Contents
1. Executive Summary
1. System Architecture Overview
1. Knowledge Base: Reference Video Analysis Schema
1. Music Video Creation Pipeline – Screen Specifications
  - Screen 0: Project Dashboard & Creation
  - Screen 1: Song Intelligence
  - Screen 2: Concept Ideation
  - Screen 3: Story Architecture
  - Screen 4: Story Generator
  - Screen 5: Character Forge
  - Screen 6: World Builder
  - Screen 6b: Visual Style Lock
  - Screen 7: Beat Sheet
  - Screen 8: Shot List & Prompts
1. Creative Director Agent (CDA) System Prompt – Full Specification
1. State Management JSON Schema (Full Project State)
1. API Endpoint Specifications
1. User Flows & Navigation
1. Developer Implementation Notes
---
## 1. Executive Summary
CineIQ Music Video Studio is an AI-powered creative workspace that transforms an uploaded audio file into a fully production-ready music video package. The platform leverages a RAG-powered Knowledge Base of analyzed legendary music videos (structured per the schema defined in Section 3) and a specialized Creative Director Agent (CDA) to generate outputs at each stage.
This document provides the complete blueprint for development, covering every screen, user interaction, data field, API contract, and business rule. It is designed to be implementation-ready with no ambiguity.
---
## 2. System Architecture Overview
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CineIQ Music Video Studio                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐ │
│  │   Frontend  │──▶│   Backend   │──▶│    LLM      │   │  Knowledge Base │ │
│  │   (React)   │◀──│   (FastAPI) │◀──│  (Claude)   │◀──│  (Vector DB)    │ │
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────────┘ │
│         │                 │                 │                    │          │
│         ▼                 ▼                 ▼                    ▼          │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐ │
│  │ 8-Step UI   │   │ State Cache │   │   CDA       │   │ 82-Legendary    │ │
│  │   Stepper   │   │  (Redis)    │   │  Prompts    │   │ Attributes DB   │ │
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────────┘ │
│                                                                             │
│  External Integrations:                                                      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │
│  │   WAVE    │  │ Ideogram  │  │ Seedance2 │  │  Veo 3.1  │  │ Kling 2.5 │ │
│  │  (Audio)  │  │  (Ref Img)│  │ (Prompts) │  │ (Prompts) │  │ (Prompts) │ │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```
### 2.1 Core Principles
- Linear Workflow with Auto-Save: Users progress through 8 sequential steps. All data is saved to a centralized project state after every user action (debounced 2 seconds).
- RAG-First Generation: Every AI generation call retrieves relevant reference video analyses from the Knowledge Base to inform output.
- Format-Specific Pipeline: The music video pipeline is distinct from other formats (YouTube Pilot, Long-form, Feature Film) and enforces its own grammar.
- Native Language Support: All text generation occurs in the song's primary language (from 22 supported languages).
---
## 3. Knowledge Base: Reference Video Analysis Schema
The Knowledge Base contains pre-analyzed music videos in the following JSON structure. This schema is used for:
- Retrieving similar videos based on song features (RAG).
- Providing context to the LLM at each generation step.
- Surfacing legendary attributes and visual patterns.
### 3.1 Schema Definition (Complete)
```
{
  "$schema": "<https://schema.ai.musicvideo.kb/v1.0/reference-analysis>",
  "$id": "uuid",
  "source_metadata": {
    "video_title": "string",
    "artist": "string",
    "director": "string | null",
    "release_year": "number",
    "duration_seconds": "number",
    "youtube_url": "string | null",
    "legendary_status": "boolean",
    "awards_won": ["string"]
  },
  "song_alignment": {
    "track_title": "string",
    "genre": "string",
    "bpm": "number",
    "key": "string | null",
    "emotional_tone": ["string"],
    "lyrical_themes": ["string"],
    "core_metaphor_of_song": "string"
  },
  "visual_identity": {
    "primary_color_palette": ["#hex"],
    "color_grading_style": "string",
    "aspect_ratio": "string",
    "film_grain_present": "boolean",
    "lens_characteristics": "string",
    "lighting_philosophy": "string"
  },
  "narrative_architecture": {
    "story_structure": "Linear | Non-Linear | Abstract | Performance Intercut",
    "number_of_parallel_threads": "number",
    "threads": [
      {
        "thread_id": "string",
        "description": "string",
        "associated_song_sections": ["string"],
        "protagonist": "string"
      }
    ],
    "act_breakdown": [
      {
        "act": "number",
        "time_range": "string",
        "summary": "string",
        "key_visual_moment": "string"
      }
    ],
    "twist_ending": "boolean",
    "twist_description": "string | null"
  },
  "character_catalog": [
    {
      "character_id": "string",
      "name": "string | null",
      "archetype": "string",
      "visual_description": "string",
      "wardrobe_signature": "string",
      "performance_style": "string",
      "arc_summary": "string",
      "iconic_moment": "string"
    }
  ],
  "world_building": {
    "location_types": ["string"],
    "time_period": "string",
    "physics_rules": "string",
    "weather_conditions": "string",
    "atmosphere": "string"
  },
  "shot_grammar": {
    "average_shot_duration_seconds": "number",
    "dominant_shot_types": ["string"],
    "camera_movements_used": ["string"],
    "transition_signature": "string",
    "edit_sync_strategy": "On-Beat | Off-Beat | Syncopated"
  },
  "performance_capture": {
    "artist_eye_contact": "Frequent | Occasional | None",
    "lip_sync_accuracy": "Flawless | Good | Stylized",
    "choreography_style": "string",
    "signature_move": "string",
    "use_of_slow_motion": "boolean",
    "use_of_reverse_motion": "boolean"
  },
  "symbolism_and_motif": {
    "recurring_objects": ["string"],
    "color_symbolism": { "color": "meaning" },
    "animal_symbolism": ["string"]
  },
  "post_production_artifacts": {
    "vfx_complexity": "Low | Medium | High | Photoreal CGI | Practical Effects",
    "typography_style": "string",
    "kinetic_typography_used": "boolean",
    "glitch_effects": "boolean",
    "film_grain_overlay": "boolean"
  },
  "cultural_impact_metrics": {
    "meme_generated": "boolean",
    "meme_description": "string | null",
    "parodied": "boolean",
    "controversy_level": "Low | Medium | High",
    "nostalgia_factor": "number 0-1",
    "artist_perspective": "string",
    "consumer_perspective": "string"
  },
  "semantic_embedding": {
    "dense_caption_for_rag": "string",
    "visual_keywords": ["string"],
    "mood_keywords": ["string"],
    "genre_keywords": ["string"]
  },
  "legendary_attributes_inventory": {
    "description": "string",
    "attributes": [
      {
        "attribute_id": "number 1-82",
        "name": "string",
        "present": "boolean",
        "execution": "string | null",
        "timestamp": "string | null"
      }
    ]
  },
  "_processing_metadata": {
    "analyzer_version": "string",
    "processed_at": "ISO-8601",
    "models_used": { "vision": "string", "analysis": "string", "speech": "string" },
    "detected_language": "string",
    "scenes_detected": "number",
    "frames_analyzed": "number",
    "lyrics_lines": "number",
    "bpm_source": "string",
    "color_palette_source": "string"
  }
}
```
### 3.2 How This Knowledge Base Informs Generation
---
## 4. Music Video Creation Pipeline – Screen Specifications
### Screen 0: Project Dashboard & Creation
Purpose: Entry point. Create new project or continue existing.
### UI Components
### User Flow
1. User lands on Dashboard.
1. Clicks "New Project" → uploads file or selects from WAVE.
1. System creates project record, returns project_id.
1. Redirect to Screen 1.
### API Calls
- POST /projects → { project_id, status }
---
### Screen 1: Song Intelligence
Step: Audio Input & Analysis
Purpose: Analyze audio, transcribe lyrics, extract features.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ● Song ● Concept ○ Story ○ Characters ○ World ○ Style ○ Beat ○ Shots] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Left Panel (30%)                    │ Right Panel (70%)                      │
│ ┌─────────────────────────────┐     │ ┌─────────────────────────────────────┐ │
│ │ Song Metadata               │     │ │ Waveform Visualizer                  │ │
│ │ ┌─────────────────────────┐ │     │ │ ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                    │ │
│ │ │ Title: _______________  │ │     │ │ [Play] [Pause] [Zoom In/Out]         │ │
│ │ │ Artist: ______________  │ │     │ └─────────────────────────────────────┘ │
│ │ │ Language: [Dropdown]    │ │     │                                         │
│ │ │ Duration: MM:SS         │ │     │ Structural Segmentation                 │
│ │ └─────────────────────────┘ │     │ ┌─────────────────────────────────────┐ │
│ │                             │     │ │ [Intro][Verse1][Pre][Chorus][Verse2] │ │
│ │ Analysis Summary            │     │ │ 00:00  00:19   00:30 00:45   01:00  │ │
│ │ ┌─────────────────────────┐ │     │ │ (Editable boundaries via drag)       │ │
│ │ │ BPM: 103.4              │ │     │ └─────────────────────────────────────┘ │
│ │ │ Key: 2A (Eb minor)      │ │     │                                         │
│ │ │ Energy: ████████░░ 0.78 │ │     │ Lyrics Panel                            │
│ │ │ Valence: █████░░░░░ 0.45│ │     │ ┌─────────────────────────────────────┐ │
│ │ │ Danceability: ███████░ 0.72│   │ │ [Time-synced lyrics text area]        │ │
│ │ │ Instrumentalness: 0.15  │ │     │ │ 00:00 "If you wanna run away with me" │ │
│ │ └─────────────────────────┘ │     │ │ 00:05 "I know a galaxy..."            │ │
│ │                             │     │ │ (Editable, with timestamps)           │ │
│ │ Mood Tags                   │     │ └─────────────────────────────────────┘ │
│ │ [Euphoric] [Romantic] [Dreamy] [×]│                                         │
│ │ + Add Tag                   │     │                                         │
│ │                             │     │ Core Metaphor                           │
│ │                             │     │ ┌─────────────────────────────────────┐ │
│ │                             │     │ │ "Love as a cosmic journey..."        │ │
│ │                             │     │ │ (AI-generated, editable)             │ │
│ │                             │     │ └─────────────────────────────────────┘ │
│ └─────────────────────────────┘     └─────────────────────────────────────────┘
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Save & Continue to Concept]       │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Detailed Fields
### API Calls
- GET /song-analysis/{project_id} → returns cached analysis or triggers new.
- POST /song-analysis/{project_id}/transcribe → ASR.
- POST /song-analysis/{project_id}/segments → structure detection.
### RAG Retrieval
Query vector DB with:
- bpm, key, emotional_tone, genre (from audio classification)
- Returns top 5 reference videos for context in subsequent steps.
### State Update
```
{
  "song_metadata": {
    "title": "string",
    "artist": "string",
    "language": "string",
    "duration_sec": 230.1,
    "bpm": 103.4,
    "key_camelot": "2A",
    "energy": 0.78,
    "valence": 0.45,
    "danceability": 0.72,
    "instrumentalness": 0.15,
    "mood_tags": ["euphoric", "romantic", "dreamy"],
    "core_metaphor": "string",
    "lyrics": [
      { "start": 0.0, "end": 5.0, "text": "string" }
    ],
    "segments": [
      { "type": "Intro", "start": 0.0, "end": 19.2 },
      { "type": "Verse", "start": 19.2, "end": 45.0 }
    ]
  }
}
```
---
### Screen 2: Concept Ideation
Step: Concept Selection / Finalization
Purpose: Generate 3 high-level visual concepts.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ Song ● Concept ○ Story ○ Characters ○ World ○ Style ○ Beat ○ Shots] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Context Sidebar (Collapsible)                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Song: "Levitating" - Dua Lipa                                            │ │
│ │ BPM: 103 | Key: 2A | Mood: Euphoric, Romantic                            │ │
│ │ Core Metaphor: Love as a cosmic journey                                  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Concept Directions (3 Cards)                                                │
│ ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐     │
│ │ Concept A           │ │ Concept B           │ │ Concept C           │     │
│ │ ┌─────────────────┐ │ │ ┌─────────────────┐ │ │ ┌─────────────────┐ │     │
│ │ │ [AI Generated    │ │ │ │ [AI Generated    │ │ │ │ [AI Generated    │ │     │
│ │ │  Thumbnail]      │ │ │ │  Thumbnail]      │ │ │ │  Thumbnail]      │ │     │
│ │ └─────────────────┘ │ │ └─────────────────┘ │ │ └─────────────────┘ │     │
│ │ Title: Neon Reverie │ │ Title: Cosmic Waltz │ │ Title: Mirror Maze  │     │
│ │ Logline: A woman    │ │ Logline: Two lovers │ │ Logline: A dancer   │     │
│ │ levitates through   │ │ drift through space │ │ trapped in infinite │     │
│ │ a futuristic city,  │ │ in a retro-futurist │ │ reflections finds   │     │
│ │ her joy igniting    │ │ dance, their bodies │ │ freedom in movement │     │
│ │ neon lights.        │ │ becoming stardust.  │ │                    │     │
│ │ Visual Hook: Her    │ │ Visual Hook: They   │ │ Visual Hook: Every  │     │
│ │ fingertips leave    │ │ spin in slow motion │ │ reflection shows a  │     │
│ │ trails of light.    │ │ as galaxies swirl.  │ │ different emotion.  │     │
│ │ Legendary Attr: #1, │ │ Legendary Attr: #30,│ │ Legendary Attr: #13,│     │
│ │ #63, #80            │ │ #8, #48             │ │ #7, #63             │     │
│ │ [🔄 Regenerate]     │ │ [🔄 Regenerate]     │ │ [🔄 Regenerate]     │     │
│ │ [✓ Select This]     │ │ [✓ Select This]     │ │ [✓ Select This]     │     │
│ └─────────────────────┘ └─────────────────────┘ └─────────────────────┘     │
│                                                                             │
│ ── OR ──                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Custom Concept                                                [Expand]  │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Title: ________________________                                     │ │ │
│ │ │ Logline: __________________________________________________________ │ │ │
│ │ │ Visual Hook: ______________________________________________________ │ │ │
│ │ │ Legendary Attributes: [Multi-select]                                │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ │ [Use My Custom Concept]                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ RAG Reference Drawer (Collapsed by default)                                 │
│ [Show References] → Displays KB videos that inspired these concepts.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Continue to Story Architecture]  │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Generation Logic
The /generate-concepts endpoint:
1. Retrieves top 5 reference videos from KB (based on song features).
1. Extracts their narrative_architecture, legendary_attributes_inventory, and semantic_embedding.dense_caption_for_rag.
1. Constructs a prompt for the LLM:
```
You are a music video creative director. Song: {title}, BPM: {bpm}, Mood: {mood_tags}, Core Metaphor: {core_metaphor}.
Here are analyses of 5 legendary music videos that share similar DNA:
[Reference 1: {dense_caption}]
...
Generate 3 unique concept directions. Each must include: Title, Logline, Visual Hook, and 3 relevant Legendary Attributes from the 82-item catalog.
```
1. LLM returns 3 concepts.
1. Optionally, call Ideogram to generate thumbnail for each concept using the logline + visual style.
### State Update
```
{
  "selected_concept": {
    "id": "uuid",
    "title": "string",
    "logline": "string",
    "visual_hook": "string",
    "legendary_attributes": [1, 8, 30],
    "is_custom": false,
    "thumbnail_url": "string"
  }
}
```
---
### Screen 3: Story Architecture
Step: Multi vs. Single Storyline
Purpose: Define narrative complexity.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ Song ● Architecture ○ Story ○ Characters ○ World ○ Style ○ Beat ○ Shots] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Storyline Mode                                                              │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ○ Single Storyline (One protagonist, one continuous narrative)          │ │
│ │ ● Multi-Thread (Parallel narratives that intercut)                       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ When Multi-Thread selected:                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Number of Threads: [2] [3] [4] (Slider or segmented control)            │ │
│ │                                                                         │ │
│ │ Thread 1 Description (Primary): _______________________________________ │ │
│ │ Thread 2 Description: _________________________________________________ │ │
│ │ Thread 3 Description: _________________________________________________ │ │
│ │                                                                         │ │
│ │ Note: Each thread can follow a different character/location. The Beat   │ │
│ │ Sheet will intercut between threads based on song structure.            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Preview: Based on selected concept "{title}" and {single/multi} mode,       │
│ the story will follow [brief description].                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Generate Story]                  │
└─────────────────────────────────────────────────────────────────────────────┘
```
### State Update
```
{
  "story_architecture": {
    "mode": "single" | "multi",
    "thread_count": 1 | 2 | 3 | 4,
    "thread_descriptions": ["string"]
  }
}
```
---
### Screen 4: Story Generator
Step: Director's Treatment
Purpose: Generate prose narrative of the full video.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ Architecture ● Story ○ Characters ○ World ○ Style ○ Beat ○ Shots] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Director's Treatment                                                        │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Rich Text Editor Toolbar: Bold, Italic, H1, H2, Quote, Bullet List]    │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ # Logline                                                               │ │
│ │ {Selected concept logline}                                              │ │
│ │                                                                         │ │
│ │ # Visual Approach                                                       │ │
│ │ [AI-generated paragraph about overall visual language]                  │ │
│ │                                                                         │ │
│ │ # Scene Breakdown                                                       │ │
│ │ ## Intro (00:00 - 00:19)                                                │ │
│ │ [Description of opening visuals tied to song section]                   │ │
│ │                                                                         │ │
│ │ ## Verse 1 (00:19 - 00:45)                                              │ │
│ │ [Description...]                                                        │ │
│ │                                                                         │ │
│ │ ## Chorus (00:45 - 01:15)                                               │ │
│ │ [Description...]                                                        │ │
│ │                                                                         │ │
│ │ ... (continues for all sections)                                        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Sidebar (Right)                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Song Structure                                                          │ │
│ │ ● Intro (0:00-0:19)                                                     │ │
│ │ ● Verse 1 (0:19-0:45)                                                   │ │
│ │ ● Chorus (0:45-1:15)                                                    │ │
│ │ ● Verse 2 (1:15-1:40)                                                   │ │
│ │ ● Bridge (1:40-2:10)                                                    │ │
│ │ ● Outro (2:10-2:30)                                                     │ │
│ │                                                                         │ │
│ │ Inline AI Tools                                                         │ │
│ │ [Rewrite Selection] [Expand] [Shorten] [Change Tone ▼]                  │ │
│ │                                                                         │ │
│ │ Version History                                                         │ │
│ │ • v3 - 14 Apr 10:32                                                     │ │
│ │ • v2 - 14 Apr 09:15                                                     │ │
│ │ • v1 - 14 Apr 08:00                                                     │ │
│ │ [Restore]                                                               │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [ ] I approve this treatment for character and world generation             │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Continue to Character Forge]     │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Generation Logic
POST /generate-story:
- Input: song_metadata, selected_concept, story_architecture, and KB references.
- Prompt includes: "Generate a full director's treatment for a music video with the following song structure. Use the selected concept as the foundation. Write in prose, tying each section to the song's emotional arc. Include specific visual details, camera movements, and character actions."
### State Update
```
{
  "story_treatment": {
    "version": 1,
    "content": "string (markdown)",
    "approved": true
  }
}
```
---
### Screen 5: Character Forge
Step: Auto-detect and Finalize Characters
Purpose: Define all characters with visual consistency specs.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ ○ Story ● Characters ○ World ○ Style ○ Beat ○ Shots]       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Characters Detected: 3                                                      │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Character 1: Dua Lipa (Protagonist)                      [−] [Expand]   │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Left Column                      │ Right Column                      │ │
│ │ │ Name: [Dua Lipa_____________]    │ Archetype: [The Visionary ▼]      │ │
│ │ │ Age: [28___]                     │ Gender: [Female ▼]                │ │
│ │ │                                  │ Performance Style: [Contained Stillness ▼]│
│ │ │ Appearance:                      │                                   │ │
│ │ │ Face Shape: [Oval ▼]             │ Voice Notes (if any):             │ │
│ │ │ Hair: [Blonde, shoulder-length, wavy, middle part]                   │ │
│ │ │ Skin Tone: [Fair, warm undertone]│ [________________________________] │ │
│ │ │ Build: [Slim, 5'8"]              │                                   │ │
│ │ │ Clothing: [Black sleeveless top, high-waisted metallic silver pants] │ │
│ │ │ Accessories: [Gold hoop earrings, stacked rings, red manicure]       │ │
│ │ │                                  │                                   │ │
│ │ │ [Generate Reference Image]       │                                   │ │
│ │ │ ┌─────────────────────────────┐  │                                   │ │
│ │ │ │ [Reference Image Thumbnail] │  │                                   │ │
│ │ │ │ (Generated via Ideogram)    │  │                                   │ │
│ │ │ └─────────────────────────────┘  │                                   │ │
│ │ │ [✓] Use as Consistency Key       │                                   │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Character 2: DaBaby (Supporting)                         [−] [Expand]   │ │
│ │ [Collapsed view shows name, archetype, thumbnail]                       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Character 3: Ensemble Dancer (Background)                [−] [Expand]   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [+ Add Character]                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Continue to World Builder]       │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Auto-Detection Logic
POST /detect-characters:
- Input: story_treatment.content
- LLM prompt: "Extract all characters from this treatment. For each, provide: name (if mentioned), archetype, visual clues from text, and inferred performance style."
- System maps to KB character_catalog archetypes for consistency.
### Reference Image Generation
When user clicks "Generate Reference Image":
- System calls Ideogram API with a prompt constructed from the character's appearance fields.
- Prompt template: "High-quality portrait photograph of {name}, {age} years old, {face_shape} face, {hair}, {skin_tone}, {build}, wearing {clothing}, {accessories}. Neutral expression, facing camera, chest-up, studio lighting, clean white background, photorealistic, 8K."
- Returned image URL stored in character_bible[].reference_image_url.
### State Update
```
{
  "character_bible": [
    {
      "id": "uuid",
      "name": "string",
      "age": 28,
      "gender": "Female",
      "archetype": "The Visionary",
      "appearance": {
        "face_shape": "Oval",
        "hair": "Blonde, shoulder-length, wavy, middle part",
        "skin_tone": "Fair, warm undertone",
        "build": "Slim, 5'8\\"",
        "clothing": "Black sleeveless top, metallic silver pants",
        "accessories": "Gold hoops, stacked rings, red manicure"
      },
      "voice_notes": "string",
      "performance_style": "Contained Stillness",
      "reference_image_url": "string",
      "consistency_locked": true
    }
  ]
}
```
---
### Screen 6: World Builder
Step: Auto-detect and Define World
Purpose: Establish setting, atmosphere, physical rules.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ ○ ○ Characters ● World ○ Style ○ Beat ○ Shots]             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Locations Detected: 3                                                       │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Location 1: Neon Rooftop                                  [−] [Expand]  │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ Name: [Rooftop Overlooking City_________________________]               │ │
│ │ Type: [Rooftop ▼]                                                       │ │
│ │ Time of Day: [Night ▼]                                                  │ │
│ │ Weather: [Clear, starry sky ▼]                                          │ │
│ │ Cultural Markers: [Futuristic skyline, neon signs in English/Japanese]  │ │
│ │ Description:                                                            │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Rich text: A sprawling rooftop with a panoramic view of a           │ │ │
│ │ │  glittering metropolis. The floor is wet from recent rain,           │ │ │
│ │ │  reflecting the kaleidoscope of neon signs—pinks, blues, and         │ │ │
│ │ │  electric greens. A gentle breeze carries the distant hum of         │ │ │
│ │ │  traffic. The air smells of ozone and damp concrete.]                │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Location 2: Abandoned Warehouse                           [−] [Expand]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Location 3: Ethereal Forest                               [−] [Expand]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [+ Add Location]                                                            │
│                                                                             │
│ Global World Rules                                                          │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Time Period: [Contemporary / Futuristic ▼]                              │ │
│ │ Physics Rules: [Normal ▼] (Options: Normal, Gravity optional, Time flows│ │
│ │                backward, etc.)                                          │ │
│ │ Atmosphere Tags: [Dreamlike] [Energetic] [Nostalgic] [+ Add]            │ │
│ │ Dominant Colors: [#313c48] [#8da2af] [#4f687a] (from analysis)          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Continue to Visual Style]        │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Auto-Detection Logic
POST /detect-locations:
- Input: story_treatment.content
- LLM extracts locations and suggests attributes based on KB world_building.
### State Update
```
{
  "world_bible": {
    "locations": [
      {
        "id": "uuid",
        "name": "Rooftop Overlooking City",
        "type": "Rooftop",
        "time_of_day": "Night",
        "weather": "Clear, starry sky",
        "cultural_markers": "Futuristic skyline, neon signs",
        "description": "string"
      }
    ],
    "time_period": "Contemporary",
    "physics_rules": "Normal",
    "atmosphere": ["Dreamlike", "Energetic"],
    "dominant_colors": ["#313c48", "#8da2af", "#4f687a"]
  }
}
```
---
### Screen 6b: Visual Style Lock
Step: Lock Aesthetic DNA
Purpose: Define color grading, camera style, film texture.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ ○ ○ ○ World ● Style ○ Beat ○ Shots]                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Style Presets                                                               │
│ [Cinematic Grit] [Neon Noir] [Warm Bollywood] [Ghibli Fantasy] [Vintage 70s]│
│ Selecting a preset auto-fills the fields below.                             │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Color Palette                                                            │ │
│ │ Primary:   [■] [#313c48]  Secondary: [■] [#8da2af]  Accent: [■] [#ae6b41]│ │
│ │ Additional: [■] [#ced8db]  [■] [#18151c]                                 │ │
│ │ [Extract from Reference] (Uses KB visual_identity.primary_color_palette) │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Lighting Philosophy: [Practical Motivated ▼]                             │ │
│ │ Camera Language: [Steadicam Float ▼]                                     │ │
│ │ Lens Characteristics: [Anamorphic flare ▼]                               │ │
│ │ Film Grain: [✓] Enabled  Intensity: [████░░░░░░] 0.4                     │ │
│ │ Color Grading Style: [Teal/Orange ▼]                                     │ │
│ │ Reference Mood: [Blade Runner 2049 meets retro disco]                    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Style Frame Gallery                                                         │
│ [Generate Style Frames]                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│ │[Image 1] │ │[Image 2] │ │[Image 3] │ │[Image 4] │                        │
│ │[Select]  │ │[Select]  │ │[Select]  │ │[Select]  │                        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                        │
│ Selected Key Frame: [Image 2] (Will be used as visual reference for shots)  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Generate Beat Sheet]             │
└─────────────────────────────────────────────────────────────────────────────┘
```
### State Update
```
{
  "visual_style_guide": {
    "color_palette": ["#313c48", "#8da2af", "#4f687a", "#ae6b41", "#ced8db"],
    "lighting": "Practical Motivated",
    "camera_language": "Steadicam Float",
    "lens_characteristics": "Anamorphic flare",
    "film_grain": { "enabled": true, "intensity": 0.4 },
    "color_grading_style": "Teal/Orange",
    "reference_mood": "Blade Runner 2049 meets retro disco",
    "key_frame_url": "string"
  }
}
```
---
### Screen 7: Beat Sheet
Step: Time-Coded Action Map
Purpose: Define visual action for every song section.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ ○ ○ ○ ○ Style ● Beat ○ Shots]                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Timeline View                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁ (Waveform)                                             │ │
│ │ ├─Intro─┼──Verse 1──┼─Pre─┼───Chorus───┼──Verse 2──┼─Bridge─┼─Outro─┤   │ │
│ │ 00:00   00:19       00:30 00:45        01:15       01:40    02:10  02:30│ │
│ │ [Beat1][Beat2]  [Beat3] [Beat4] [Beat5] [Beat6]  [Beat7][Beat8][Beat9]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Beat Table                                                                  │
│ ┌────┬──────────┬─────────────┬──────────────────────────────────────────┬──────────┬────────────┬───────────┐ │
│ │ #  │ Timecode │ Section     │ Visual Action                            │ Emotion  │ Characters │ Location  │ │
│ ├────┼──────────┼─────────────┼──────────────────────────────────────────┼──────────┼────────────┼───────────┤ │
│ │ 1  │ 00:00    │ Intro       │ Dua Lipa stands on rooftop, back to      │ Contemp- │ Dua Lipa   │ Rooftop   │ │
│ │    │ -00:08   │             │ camera, city lights blur behind her.     │ lative   │            │           │ │
│ │    │          │             │ She turns slowly, eyes meet camera.      │          │            │           │ │
│ ├────┼──────────┼─────────────┼──────────────────────────────────────────┼──────────┼────────────┼───────────┤ │
│ │ 2  │ 00:08    │ Intro       │ Extreme close-up: her lips as she        │ Intimate │ Dua Lipa   │ Rooftop   │ │
│ │    │ -00:19   │ (continued) │ speaks opening line. Glitter particles   │          │            │           │ │
│ │    │          │             │ float around her face.                   │          │            │           │ │
│ ├────┼──────────┼─────────────┼──────────────────────────────────────────┼──────────┼────────────┼───────────┤ │
│ │ 3  │ 00:19    │ Verse 1     │ Cut to mirrored room. Dua Lipa walks     │ Confident│ Dua Lipa   │ Mirrored  │ │
│ │    │ -00:30   │             │ forward, reflections multiplying.        │          │            │ Room      │ │
│ │    │          │             │ She begins subtle dance moves.           │          │            │           │ │
│ ├────┼──────────┼─────────────┼──────────────────────────────────────────┼──────────┼────────────┼───────────┤ │
│ │ ...│ ...      │ ...         │ ...                                      │ ...      │ ...        │ ...       │ │
│ └────┴──────────┴─────────────┴──────────────────────────────────────────┴──────────┴────────────┴───────────┘ │
│                                                                             │
│ [Add Beat] [Delete Selected] [Auto-Arrange]                                 │
│                                                                             │
│ Beat Detail Editor (when row selected)                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Visual Action: [Rich text editor for the selected beat]                 │ │
│ │ Emotion: [Contemplative ▼]                                              │ │
│ │ Characters: [Dua Lipa] [DaBaby] [+ Add]                                 │ │
│ │ Location: [Rooftop Overlooking City ▼]                                  │ │
│ │ Shot Type Hint: [Wide] [Medium] [Close-Up] (optional)                   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Generate Shot List]              │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Generation Logic
POST /generate-beat-sheet:
- Input: story_treatment, song_metadata.segments, character_bible, world_bible.
- LLM expands treatment into time-coded beats, aligning actions to song sections.
### State Update
```
{
  "beat_sheet": [
    {
      "beat_id": "uuid",
      "start_time": "00:00",
      "end_time": "00:08",
      "song_section": "Intro",
      "visual_action": "string",
      "emotion": "Contemplative",
      "characters": ["char_uuid_1"],
      "location": "loc_uuid_1"
    }
  ]
}
```
---
### Screen 8: Shot List & Prompts
Step: Final Technical Breakdown + GenAI Prompts
Purpose: Generate shot-by-shot list with tool-specific prompts.
### UI Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Stepper: ○ ○ ○ ○ ○ ○ ○ ○ Beat ● Shots]                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Shot List Table                                                             │
│ ┌──┬────────┬──────────┬───────────┬────────────┬──────────┬──────────────┐ │
│ │# │ Time   │ Shot Type│ Camera Mvmt│ Description│ Tool     │ Prompt       │ │
│ ├──┼────────┼──────────┼───────────┼────────────┼──────────┼──────────────┤ │
│ │1 │00:00-  │ Wide     │ Static    │ Dua Lipa   │ Kling2.5 │ [View/Edit]  │ │
│ │  │00:08   │          │           │ on rooftop │          │              │ │
│ ├──┼────────┼──────────┼───────────┼────────────┼──────────┼──────────────┤ │
│ │2 │00:08-  │ Extreme  │ Slow Dolly│ Lips,      │ Veo 3.1  │ [View/Edit]  │ │
│ │  │00:12   │ Close-Up │ In        │ glitter    │          │              │ │
│ ├──┼────────┼──────────┼───────────┼────────────┼──────────┼──────────────┤ │
│ │3 │00:12-  │ Medium   │ Steadicam │ Walking in │ Seedance2│ [View/Edit]  │ │
│ │  │00:19   │          │ Follow    │ mirrored   │          │              │ │
│ │  │        │          │           │ room       │          │              │ │
│ └──┴────────┴──────────┴───────────┴────────────┴──────────┴──────────────┘ │
│                                                                             │
│ Batch Actions: [Assign Tool to All ▼] [Auto-Detect Tool] [Export CSV]       │
│                                                                             │
│ Prompt Panel (Expanded for selected shot)                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Tool Tabs: [Seedance 2] [Veo 3.1] [Kling 2.5]                           │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ Seedance 2 Prompt:                                                      │ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ A woman with an oval face, blonde shoulder-length wavy hair parted  │ │ │
│ │ │ in the middle, fair skin with warm undertone, slim build, 5'8",     │ │ │
│ │ │ wearing a black sleeveless top and high-waisted metallic silver     │ │ │
│ │ │ pants, gold hoop earrings, stacked rings, red manicured nails—      │ │ │
│ │ │ performs a slow, fluid contemporary dance move, her arms floating   │ │ │
│ │ │ upward as if levitating, camera slowly dollies in, soft golden      │ │ │
│ │ │ backlight creating a halo effect. The scene is set on a wet rooftop │ │ │
│ │ │ overlooking a futuristic city at night, neon reflections shimmering │ │ │
│ │ │ on the ground, starry sky above. Natural weight shift visible in    │ │ │
│ │ │ her hips, subtle micro-expressions on her face, gentle breeze       │ │ │
│ │ │ moving her hair. Shot on 35mm anamorphic lens, shallow depth of     │ │ │
│ │ │ field, film grain overlay. Color palette: deep teal, muted blue,    │ │ │
│ │ │ warm amber accents. Avoid: deformed hands, blurry faces, text       │ │ │
│ │ │ artifacts, extra limbs, nudity.                                     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │
│ │ Word Count: 187                                                         │ │
│ │ Negative Prompt: [deformed hands, blurry faces, text artifacts...]      │ │
│ │ Motion Bucket ID: [127] (Kling only)                                    │ │
│ │ Seed: [Randomize] [Lock]                                                │ │
│ │ [✓] Apply Character Reference Image (Dua Lipa)                          │ │
│ │ [Copy Prompt] [Regenerate]                                              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Global Settings                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Consistency Mode: [✓] Use IP Adapter for all primary characters         │ │
│ │ Global Negative Prompt: [_____________________________________________] │ │
│ │ Export Format: [JSON (Prompts Only)] [CSV] [PDF Storyboard]             │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Back]                                    [Export & Finish]                 │
└─────────────────────────────────────────────────────────────────────────────┘
```
### Tool-Specific Prompt Generation
The system uses the adapted CDA prompt (Section 5) to generate three separate prompts per shot, optimized for:
- Seedance 2: Emphasizes dance, fluid motion, human gesture.
- Veo 3.1: Emphasizes cinematic realism, environmental detail, natural physics.
- Kling 2.5: Emphasizes dynamic camera movement, high-concept visuals, scale.
### State Update
```
{
  "shot_list": [
    {
      "shot_id": "uuid",
      "beat_ref": "uuid",
      "start_time": "00:00",
      "end_time": "00:08",
      "shot_type": "Wide",
      "camera_movement": "Static",
      "description": "Dua Lipa on rooftop, back to camera",
      "genai_tool": "kling_2.5",
      "prompts": {
        "seedance_2": "string (150+ words)",
        "veo_3_1": "string (150+ words)",
        "kling_2_5": "string (150+ words)"
      },
      "negative_prompt": "string",
      "motion_bucket": 127,
      "seed": 12345,
      "character_refs": ["char_uuid_1"],
      "consistency_applied": true
    }
  ]
}
```
---
## 5. Creative Director Agent (CDA) System Prompt – Full Specification
This is the complete, production-ready prompt used for all generation calls (with format-specific instructions injected per endpoint).
```
You are the Creative Director Agent (CDA) for Hungama AI Studio.
Your role is to receive creative briefs and produce detailed,
production-ready creative plans. You operate within Hungama's brand
universe and have deep knowledge of Indian entertainment audiences
across Hindi, Tamil, Telugu, Bengali and regional markets.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RULES – YOU MUST FOLLOW THESE EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Every output MUST contain character_bible, object_bible, and
  environment_details arrays. These are REQUIRED, not optional.
  If the brief lacks details, invent plausible defaults.
- In character_bible, the "appearance" field MUST include ALL of:
  face shape, hair (length, colour, style), skin tone, build, height,
  clothing details, and accessories. Use comma-separated details.
  NEVER write vague descriptions like "Indian woman" or "young man".
  Always be specific: "round face, wavy chin-length black hair parted
  in the middle, warm brown skin, petite build, 5'2\\", wearing a
  mustard yellow cotton kurti with mirror-work embroidery, oxidized
  silver jhumka earrings, thin gold bangles on left wrist".
- Each generation_prompt MUST be at least 150 words long. Count the
  words. If a prompt is shorter than 150 words, expand it with more
  visual details, camera specifics, lighting nuances, and character
  appearance details until it reaches 150 words.
- Every generation_prompt MUST embed the character's FULL appearance
  inline (copy from character_bible into the prompt text). Never say
  "as described above" or "as per character bible" or reference any
  external section. The prompt must be entirely self-contained.
- object_bible MUST contain at least one key prop. Describe its exact
  visual details.
- environment_details MUST contain at least one location with full
  sensory description (sights, sounds, atmosphere, cultural markers).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CONTENT TYPE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Analyse the brief and classify it into one of these content types:
- music_video: 2-5 min, beat-synced scenes, include "music_metadata"
  and "beat_sync" per scene.
(Other types: micro_drama, long_form_micro_drama, tv_series_episode,
 youtube_segment, generic_video, promo - not applicable for this task)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. DOMAIN MODE SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Select the best domain mode and set it as "domain_mode":
- Cinema: dramatic, storytelling
- Portrait: people, characters
- Editorial: fashion, lifestyle
- Landscape: backgrounds, wallpapers
- Abstract: generative art

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. UNIVERSAL ELEMENTS (always include)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every plan MUST include these top-level keys:

visual_style_guide: {
  "color_palette": ["#E8002D", ...additional colors],
  "lighting": "description of primary lighting approach",
  "camera_language": "description of camera style / lens choices",
  "reference_mood": "cinematic reference or mood board description"
}

continuity_notes: A string describing visual and narrative continuity
rules across scenes — consistent wardrobe, props, lighting, color
grading, and character appearance.

negative_prompt: A string listing what the AI generators must AVOID
(e.g., "deformed hands, blurry faces, text artifacts, watermarks,
extra limbs, culturally insensitive imagery, nudity").

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. MANDATORY DETAIL SECTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
These sections are REQUIRED in every plan (not optional):

character_bible: REQUIRED — at least one character.
[
  {
    "name": "character name",
    "age": "specific age",
    "appearance": "MANDATORY FIELDS — face shape, hair, skin tone, build, height, clothing, accessories.",
    "voice_notes": "accent, tone, speaking style"
  }
]

object_bible: REQUIRED — at least one prop.
[
  {
    "object": "name of the prop/product",
    "description": "shape, colour, material, size, texture, condition",
    "significance": "role in the scene"
  }
]

environment_details: REQUIRED — at least one location.
[
  {
    "location": "specific name",
    "time_of_day": "morning / golden hour / night",
    "weather": "clear / rainy / overcast",
    "cultural_markers": "specific Indian cultural elements",
    "description": "detailed visual + atmospheric description"
  }
]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. REALISM & NATURAL BEHAVIOR CONSTRAINTS (CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every generation_prompt MUST ensure:
- **Physics Integrity**: Objects obey gravity unless world rules
  specify otherwise. Water flows down, smoke rises, fabric moves with
  wind or body motion. No floating items without explicit world-rule
  justification.
- **Behavioral Ticks**: Characters exhibit natural micro-behaviors:
  blinking (every 2-4 seconds), subtle weight shifts, eye saccades
  (not dead stares), breathing visible in chest/shoulders, natural
  hand gestures (not robotic). Include phrases like "subtle
  micro-expressions", "natural blink", "unconscious weight shift".
- **Environmental Interaction**: Characters interact with the
  environment: feet contact ground with shadows, hands touch surfaces
  with occlusion, clothing wrinkles with movement, hair moves with
  head turns.
- **Continuity of Motion**: Action flows logically; no jump cuts that
  break physical continuity unless stylistically intended (e.g., match
  cuts).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. TOOL-SPECIFIC PROMPT FORMATTING (MUSIC VIDEO ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For each shot, generate THREE separate prompts optimized for:

A) **Seedance 2** – Emphasizes choreography, dance, and human motion.
   - Prompt structure: [Subject in motion] + [Dance style or gesture]
     + [Camera tracking] + [Lighting] + [Style].
   - Include: "fluid motion", "graceful movement", "kinetic energy".
   - Example: "A woman performs a slow, expressive contemporary dance
     move, arms floating upward as if underwater, camera slowly
     dollies in, soft golden backlight..."

B) **Veo 3.1** – Emphasizes cinematic realism and environmental detail.
   - Prompt structure: [Detailed subject] + [Action with natural
     physics] + [Environment with atmospheric details] +
     [Cinematography: lens, aperture] + [Film stock reference].
   - Include: "photorealistic", "natural lighting", "subtle film
     grain", "anamorphic bokeh".

C) **Kling 2.5** – Emphasizes dynamic camera movement and high-concept
   visuals.
   - Prompt structure: [Subject] + [Action with emphasis on motion] +
     [Camera movement: drone, crane, handheld] + [Lighting style] +
     [Mood].
   - Include: "dynamic camera", "sweeping motion", "high contrast",
     "epic scale".

All prompts must still meet the 150-word minimum and embed full
character appearance and environment details.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. VOICE GENERATION (if applicable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For scenes with dialogue, include "voice_generation": {text, emotion,
pacing, accent, voice_id_reference}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. BRAND RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Stay within Hungama content rating standards (U/A default)
- Use Hinglish where it feels natural
- Flag religious, political or sensitive topics for human review
- Thumbnails: bold, high-contrast, faces visible, exaggerated emotion,
  Hungama red (#E8002D) as accent

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. POST-PRODUCTION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Include "post_production_notes": {transition_type, subtitle_style,
audio_mix, export_ratios}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. PUBLISHING METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Include "publishing_metadata": {title_template, description, tags,
best_post_time}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. QA CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Include "qa_criteria": {min_resolution, max_artifacts, audio_clarity,
brand_safety_check, auto_approve_confidence (0.85)}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. SELF-EVALUATION (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After generating the JSON plan, mentally score it using this rubric:
- Originality (weight 0.25)
- Strategic Fit (weight 0.20)
- Emotional Response (weight 0.20)
- Feasibility (weight 0.15)
- Scalability (weight 0.10)
- Simplicity (weight 0.10)

If total weighted score < 7.5, improve the plan before outputting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return ONLY a valid JSON object with NO markdown, NO explanation,
NO backticks — just raw JSON. Required top-level keys:
- project_id, type, domain_mode, platform_targets
- visual_style_guide, continuity_notes, negative_prompt
- character_bible (REQUIRED), object_bible (REQUIRED),
  environment_details (REQUIRED)
- scenes, post_production_notes, publishing_metadata, qa_criteria
- audio_direction, talent, thumbnail_brief, thumbnail_prompt
- estimated_duration, priority_level

Each scene: scene_number, description, dialogue_notes, camera,
duration_seconds, generation_prompt (150+ words, self-contained),
and optionally act, beat_sync, voice_generation.

In the music video context, "scenes" array corresponds to shots, and
"generation_prompt" should be an object with three keys:
"seedance_2", "veo_3_1", "kling_2_5".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. CHARACTER CONSISTENCY & REFERENCE FRAMES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To ensure consistent character appearance across ALL scenes:

A) Every generation_prompt MUST begin with a CHARACTER ANCHOR prefix
   that identifies the same character(s) across scenes. Format:
   "[Same character: {name}] " followed by the FULL appearance
   description copied verbatim from character_bible.

B) Include a top-level "reference_frames" array in the output. For
   each main character, include an entry describing the ideal
   reference image:
   [
     {
       "character_name": "Priya",
       "reference_prompt": "A high-quality portrait photograph of
         Priya, age 24, oval face, shoulder-length wavy black hair...
         facing camera, neutral expression, chest-up, studio lighting,
         clean background, photorealistic, 8K",
       "aspect_ratio": "16:9"
     }
   ]

C) If a scene has multiple characters, the anchor prefix must list
   ALL characters: "[Same characters: {name1}, {name2}] "
```
---
## 6. State Management JSON Schema (Full Project State)
This is the complete project state saved after each step.
```
{
  "project_id": "uuid",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "current_step": 1,
  "song_metadata": {
    "title": "string",
    "artist": "string",
    "language": "string",
    "duration_sec": 230.1,
    "bpm": 103.4,
    "key_camelot": "2A",
    "energy": 0.78,
    "valence": 0.45,
    "danceability": 0.72,
    "instrumentalness": 0.15,
    "mood_tags": ["string"],
    "core_metaphor": "string",
    "lyrics": [
      { "start": 0.0, "end": 5.0, "text": "string" }
    ],
    "segments": [
      { "type": "Intro", "start": 0.0, "end": 19.2 }
    ]
  },
  "selected_concept": {
    "id": "uuid",
    "title": "string",
    "logline": "string",
    "visual_hook": "string",
    "legendary_attributes": [1, 8, 30],
    "is_custom": false,
    "thumbnail_url": "string"
  },
  "story_architecture": {
    "mode": "single" | "multi",
    "thread_count": 1,
    "thread_descriptions": ["string"]
  },
  "story_treatment": {
    "version": 1,
    "content": "string (markdown)",
    "approved": true
  },
  "character_bible": [
    {
      "id": "uuid",
      "name": "string",
      "age": 28,
      "gender": "string",
      "archetype": "string",
      "appearance": {
        "face_shape": "string",
        "hair": "string",
        "skin_tone": "string",
        "build": "string",
        "clothing": "string",
        "accessories": "string"
      },
      "voice_notes": "string",
      "performance_style": "string",
      "reference_image_url": "string",
      "consistency_locked": true
    }
  ],
  "world_bible": {
    "locations": [
      {
        "id": "uuid",
        "name": "string",
        "type": "string",
        "time_of_day": "string",
        "weather": "string",
        "cultural_markers": "string",
        "description": "string"
      }
    ],
    "time_period": "string",
    "physics_rules": "string",
    "atmosphere": ["string"],
    "dominant_colors": ["#hex"]
  },
  "visual_style_guide": {
    "color_palette": ["#hex"],
    "lighting": "string",
    "camera_language": "string",
    "lens_characteristics": "string",
    "film_grain": { "enabled": true, "intensity": 0.4 },
    "color_grading_style": "string",
    "reference_mood": "string",
    "key_frame_url": "string"
  },
  "beat_sheet": [
    {
      "beat_id": "uuid",
      "start_time": "00:00",
      "end_time": "00:08",
      "song_section": "Intro",
      "visual_action": "string",
      "emotion": "string",
      "characters": ["char_uuid"],
      "location": "loc_uuid"
    }
  ],
  "shot_list": [
    {
      "shot_id": "uuid",
      "beat_ref": "uuid",
      "start_time": "00:00",
      "end_time": "00:08",
      "shot_type": "string",
      "camera_movement": "string",
      "description": "string",
      "genai_tool": "kling_2_5 | seedance_2 | veo_3_1",
      "prompts": {
        "seedance_2": "string",
        "veo_3_1": "string",
        "kling_2_5": "string"
      },
      "negative_prompt": "string",
      "motion_bucket": 127,
      "seed": 12345,
      "character_refs": ["char_uuid"],
      "consistency_applied": true
    }
  ],
  "global_negative_prompt": "string",
  "publishing_metadata": {
    "title_template": "string",
    "description": "string",
    "tags": ["string"],
    "best_post_time": "string"
  }
}
```
---
## 7. API Endpoint Specifications
---
## 8. User Flows & Navigation
### 8.1 New Project Flow
```
Dashboard → Click "New Project" → Upload/WAVE Select → Screen 1 (Song Intelligence)
```
### 8.2 Resume Project Flow
```
Dashboard → Click existing project → Redirect to current_step screen
```
### 8.3 Complete Linear Flow
```
Screen 0 (Create) → Screen 1 → Screen 2 → Screen 3 → Screen 4 → Screen 5 → Screen 6 → Screen 6b → Screen 7 → Screen 8
```
### 8.4 Navigation Rules
- User can always go Back to previous step (data preserved).
- User cannot skip ahead unless step is completed and saved.
- Completed steps show green checkmark in stepper.
- Auto-save triggers on any field change (debounced 2s).
---
## 9. Developer Implementation Notes
### 9.1 Frontend Tech Stack Recommendations
- Framework: React 18+ with TypeScript
- State Management: Zustand or Redux Toolkit (for complex nested state)
- Rich Text Editor: TipTap or Slate (for Treatment, Beat descriptions)
- Waveform Visualizer: Wavesurfer.js
- Timeline Component: Custom React component using HTML Canvas
- Drag-and-Drop: React DnD or dnd-kit (for beat reordering)
### 9.2 Backend Tech Stack Recommendations
- API Framework: FastAPI (Python) or Node.js + Express
- Database: PostgreSQL (project state as JSONB)
- Cache: Redis (for temporary analysis results)
- Vector DB: Pinecone or pgvector (for RAG retrieval)
- File Storage: S3-compatible (for audio uploads, generated images)
### 9.3 LLM Integration
- Use Claude API (or equivalent) with the CDA system prompt.
- Inject KB context via RAG retrieval before each generation call.
- Implement retry logic with exponential backoff.
### 9.4 GenAI Tool Integrations
- Ideogram: For character reference images and style frames.
- Seedance 2 / Veo 3.1 / Kling 2.5: Prompts generated, but actual video rendering is external (export prompts for user to paste).
### 9.5 Performance Considerations
- Long-running generations (Story, Beat Sheet, Shot List) should use async tasks with polling or WebSocket updates.
- Cache RAG retrieval results per project to avoid repeated vector searches.
### 9.6 Security & Compliance
- Audio files must be scanned for malware.
- Generated content must be checked against Hungama content guidelines (U/A rating).
- User data must be encrypted at rest and in transit.
---
End of PRD
This document provides everything required for a development team to build the CineIQ Music Video Studio. For any clarifications or amendments, please contact the Product Team.