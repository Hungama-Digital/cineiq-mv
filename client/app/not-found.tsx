"use client"

import Link from "next/link"
import { Music, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm text-center">
        <div className="h-14 w-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
          <Music className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
          Lost in the mix
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          This page doesn&apos;t exist — or the project may have been deleted.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
