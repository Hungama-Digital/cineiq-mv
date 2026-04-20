# Beat Sheet — Automatic Character Assignment Design

**Date:** 2026-04-20  
**Status:** Approved  
**Scope:** `beats/page.tsx` (inline helper) + `lib/mock-data.ts` (data fix)

---

## Problem

When beats are generated/regenerated, `characterIds` on most beats is either empty or only contains the protagonist. If a project has 2+ characters (e.g. Aanya + Kabir), the beat table shows only one character across the entire video — giving no sense of character arc, screen time distribution, or scene composition.

The data field (`Beat.characterIds: string[]`) already exists and the Beat Detail panel already lets users manually toggle characters per beat. The gap is that the initial state after generation is unrealistic and tedious to fix manually.

---

## Solution

**Option A — Silent automatic assignment** (chosen): when beats are generated or regenerated, a pure `autoAssignCharacters` function maps each beat's `songSection` to character IDs from the project's `characterBible` before the beats are stored. No new UI element. Manual override via Beat Detail panel remains fully intact.

---

## Auto-assign Rules

| Song Section | Characters assigned |
|---|---|
| Intro | `chars[0]` only — protagonist establishes |
| Verse | `chars[0]` only — solo focus |
| Pre-Chorus | `chars[0]` only — building tension |
| Chorus | **All chars** — peak energy, full cast |
| Bridge | `chars[0]` + `chars[1]` if exists — intimate duet |
| Outro | `chars[0]` only — closing |
| Instrumental | `chars[1]` if exists, else `chars[0]` — secondary shines |

**Edge cases:**
- 0 characters → skip assignment, `characterIds` unchanged
- 1 character → all beats get that character
- 3+ characters → Chorus gets all, Bridge gets first two, others follow protagonist rule

---

## Trigger Points

1. **Regenerate button** (`regenerate()` in `beats/page.tsx`) — wraps `beatVariations[nextIdx]` with `autoAssignCharacters(beats, chars)` before calling `setBeats()`
2. **Mock data** (`lib/mock-data.ts` `mvMockBeats`) — updated directly with correct `characterIds` per beat section so Levitating demo looks correct on first load (no runtime logic needed for seed data)

**Not triggered by:**
- `addBeat()` — new beats start blank, user fills via Beat Detail panel
- Manual Beat Detail panel edits — user intent preserved

---

## Mock Data Fix (`mvMockBeats` — char-1=Dua Lipa, char-2=DaBaby, char-3=Ensemble)

| Beat | Section | Before | After |
|---|---|---|---|
| 1 | Intro | `["char-1"]` | `["char-1"]` |
| 2 | Intro | `["char-1"]` | `["char-1"]` |
| 3 | Verse | `["char-1"]` | `["char-1"]` |
| 4 | Chorus | `["char-1","char-3"]` | `["char-1","char-2","char-3"]` |
| 5 | Verse | `["char-1","char-3"]` | `["char-1"]` |
| 6 | Bridge | `["char-1"]` | `["char-1","char-2"]` |
| 7 | Chorus | `["char-1"]` | `["char-1","char-2","char-3"]` |
| 8 | Chorus | `["char-1","char-2","char-3"]` | unchanged |
| 9 | Outro | `["char-1"]` | `["char-1"]` |

---

## Implementation

**Files modified:** 2 (no new files)

### `client/app/(app)/project/[projectId]/beats/page.tsx`

Add inline helper after `toSeconds` / `characterColor` constants:

```ts
function autoAssignCharacters(beats: Beat[], chars: CharacterBibleEntry[]): Beat[] {
  if (chars.length === 0) return beats
  const all = chars.map((c) => c.id)
  const protagonist = [chars[0].id]
  const duet = chars.length >= 2 ? [chars[0].id, chars[1].id] : protagonist
  const secondary = chars.length >= 2 ? [chars[1].id] : protagonist
  return beats.map((b) => {
    let characterIds: string[]
    switch (b.songSection) {
      case "Chorus": characterIds = all; break
      case "Bridge": characterIds = duet; break
      case "Instrumental": characterIds = secondary; break
      default: characterIds = protagonist
    }
    return { ...b, characterIds }
  })
}
```

Modify `regenerate()`:
```ts
// before
setBeats(projectId, beatVariations[nextIdx])
// after
setBeats(projectId, autoAssignCharacters(beatVariations[nextIdx], chars))
```

### `client/lib/mock-data.ts`

Update `mvMockBeats` entries per the table above.

---

## Verification

1. **Levitating demo (fresh visitor):** Open dashboard → Levitating project → Beats. Beat 4, 7, 8 (Chorus) should show Dua Lipa + DaBaby + Ensemble chips. Beat 6 (Bridge) should show Dua Lipa + DaBaby. Verses/Intro/Outro show Dua Lipa only.
2. **Regenerate (user project):** User with 2 characters (Aanya + Kabir) clicks Regenerate → beat sheet refreshes → Chorus beats show both, Bridge shows both, Verse/Intro show Aanya only.
3. **Manual override preserved:** Click any beat in Beat Detail → toggle a character off → character disappears from table chip and timeline lane immediately. Regenerating again re-applies auto-assign (intentional — Regenerate is a full reset).
4. **1-character project:** Only 1 character added → all beats show that character after Regenerate.
5. **0-character project:** No characters added → Regenerate works, Characters column shows "—" for all beats.
