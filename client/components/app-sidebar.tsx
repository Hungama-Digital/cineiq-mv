"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Music,
  LayoutDashboard,
  Library,
  Settings,
  UsersRound,
  History,
  Plus,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Library", href: "/library", icon: Library },
  { label: "Team", href: "/team", icon: UsersRound },
  { label: "Versions", href: "/versions", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col bg-sidebar border-r border-sidebar-border overflow-y-auto overflow-x-hidden">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-md bg-accent flex items-center justify-center">
            <Music className="h-3.5 w-3.5 text-accent-foreground" />
          </div>
          <div className="h-4 w-px bg-sidebar-border" />
          <span className="text-xs font-semibold tracking-wide text-sidebar-foreground/60 uppercase">
            CineIQ MV
          </span>
        </div>
      </div>

      {/* New Project CTA — navigates to /dashboard?new=1 which auto-opens the create dialog */}
      <div className="px-3 pb-3">
        <Link
          href="/dashboard?new=1"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          New Music Video
        </Link>
      </div>

      <div className="mx-3 h-px bg-sidebar-border" />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground/78 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-r-full bg-accent" />
              )}
              <item.icon
                className={cn(
                  "h-[15px] w-[15px] shrink-0",
                  active ? "text-accent" : ""
                )}
              />
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mx-3 h-px bg-sidebar-border" />

      {/* Footer brand bar */}
      <div className="mt-auto px-4 py-4 space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] text-sidebar-foreground/50">
          <Sparkles className="h-3 w-3" />
          <span className="uppercase tracking-wider font-semibold">Phase 1 · Preview</span>
        </div>
        <p className="text-[11px] text-sidebar-foreground/50 leading-relaxed">
          AI-powered music video pipeline. Upload → 8-step workflow → Seedance / Veo /
          Kling prompts.
        </p>
      </div>
    </aside>
  )
}
