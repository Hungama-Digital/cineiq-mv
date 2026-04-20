"use client"

import { useEffect } from "react"
import { useProjectStore } from "@/lib/store"

/**
 * Runs once on first client mount. Checks if store is empty after hydration
 * (fresh localStorage) and seeds it with mvMockProjects.
 *
 * Placed in (app) layout so every authenticated route has the store ready.
 */
export function StoreSeeder() {
  const hydrated = useProjectStore((s) => s.hydrated)
  const projectCount = useProjectStore((s) => Object.keys(s.projects).length)
  const seedDefaults = useProjectStore((s) => s.seedDefaults)

  // Fallback: if localStorage is blocked and onRehydrateStorage never fires
  // with a valid state (state === undefined on error), force hydrated=true
  // so the UI doesn't stay wedged on "Loading projects…".
  useEffect(() => {
    const timer = setTimeout(() => {
      useProjectStore.setState({ hydrated: true })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (hydrated && projectCount === 0) {
      seedDefaults()
    }
  }, [hydrated, projectCount, seedDefaults])

  return null
}
