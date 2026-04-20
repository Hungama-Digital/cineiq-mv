"use client"

import { UsersRound, Mail, Plus } from "lucide-react"
import { toast } from "sonner"

const mockTeam = [
  {
    name: "Alok Kumar",
    role: "Director",
    email: "alok@hungama.com",
    avatar: "AK",
    color: "#4a6b3a",
    lastActive: "just now",
  },
  {
    name: "Priya Sharma",
    role: "Producer",
    email: "priya@hungama.com",
    avatar: "PS",
    color: "#6b3a4a",
    lastActive: "2h ago",
  },
  {
    name: "Rahul Mehta",
    role: "Editor",
    email: "rahul@hungama.com",
    avatar: "RM",
    color: "#3a4a6b",
    lastActive: "1d ago",
  },
]

export default function TeamPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 pt-8 pb-16">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UsersRound className="h-5 w-5 text-accent" />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Team</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {mockTeam.length} members collaborating on music video projects
          </p>
        </div>
        <button
          onClick={() => toast.info("Team invites coming in Phase 6")}
          className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Invite Member
        </button>
      </div>

      <div className="space-y-3">
        {mockTeam.map((m) => (
          <div
            key={m.email}
            className="rounded-xl border border-border bg-card shadow-md px-5 py-4 flex items-center gap-4"
          >
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: m.color }}
            >
              {m.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif font-semibold text-[15px] text-foreground">
                {m.name}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="font-semibold uppercase tracking-wider">{m.role}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {m.email}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{m.lastActive}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
          <UsersRound className="h-4 w-4 text-accent" />
          Collaboration is coming
        </div>
        <p className="text-xs text-muted-foreground">
          Multi-user editing, comments, and real-time cursor presence will be part of Phase 6.
          For now, projects are single-user with local persistence.
        </p>
      </div>
    </div>
  )
}
