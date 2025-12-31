// app/products/loading.tsx
import { ProductCardSkeleton } from "@/components/product-section-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* ================= Sidebar (lg only) ================= */}
        <aside className="hidden lg:block space-y-8 rounded-xl border p-4 bg-muted/30 sticky top-24 h-fit">
          {/* Categories */}
          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <Skeleton className="h-4 w-28 mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Skeleton className="h-4 w-28 mb-3" />
            <Skeleton className="h-9 w-full mb-2" />
            <Skeleton className="h-9 w-full mb-3" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Reset */}
          <Skeleton className="h-9 w-full" />
        </aside>

        {/* ================= Main Content ================= */}
        <div className="lg:col-span-3 flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-44" />
            </div>

            <div className="relative w-full max-w-sm">
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="flex flex-wrap items-center gap-2 lg:hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-lg" />
            ))}
          </div>

          {/* Sort */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-[180px] rounded-lg" />
          </div>

          {/* Products Grid – EXACT SAME GRID */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton
                key={i}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
  