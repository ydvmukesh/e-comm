'use client'

import { Suspense } from "react"
import { ProductCardSkeleton } from "@/components/product-section-skeleton"
import { useParams } from "next/navigation"
import { RelatedProductsList } from "./related-products-server"  // ← Import from server file

export function RelatedProduct() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  return (
    <section className="pt-8 sm:pt-20">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          Related Products
        </h2>
      </div>

      <Suspense
        fallback={
          <div className="flex -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide md:overflow-visible md:grid grid-cols-1 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <RelatedProductsList productId={id} />
      </Suspense>
    </section>
  )
}