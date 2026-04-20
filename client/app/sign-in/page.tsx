"use client"

import Link from "next/link"
import { Music, ArrowRight } from "lucide-react"

/**
 * Phase 1 stub sign-in. Clicking "Continue" skips straight to dashboard.
 * Phase 2+: wire signIn("microsoft-entra-id") and protect the (app) group.
 */
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Music className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Hungama
            </div>
            <div className="text-base font-bold font-serif leading-none">
              CineIQ MV
            </div>
          </div>
        </div>

        <h1 className="text-xl font-serif font-bold text-foreground mb-1">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Music Video Studio — AI-powered creative workspace.
        </p>

        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Continue to dashboard
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-6 text-[11px] text-muted-foreground text-center">
          Phase 1 dev mode — SSO will be required in production.
        </p>
      </div>
    </div>
  )
}
