import { redirect } from 'next/navigation'

/**
 * Root splash. In Phase 1 we skip SSO and land directly on the dashboard.
 * Phase 2+ will redirect to /sign-in when there's no active session.
 */
export default function Home() {
  redirect('/dashboard')
}
