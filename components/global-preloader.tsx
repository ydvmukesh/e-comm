'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function GlobalPreloader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 600) // smooth delay (adjust if needed)

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-muted text-card-foreground flex-col gap-2 sm:gap-4 overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-primary/10 via-background to-primary/10 dark:bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/10 border-t-primary dark:border-t-white" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  )
}
  