import { AppSidebar } from "@/components/app-sidebar"
import { StoreSeeder } from "@/components/store-seeder"

/**
 * Authenticated app shell — sidebar + main scroll area.
 * (Phase 1: no auth gate; Phase 2+ will redirect to /sign-in if no session.)
 * StoreSeeder populates localStorage on first visit.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <StoreSeeder />
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  )
}
