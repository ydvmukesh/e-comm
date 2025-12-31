"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile"

export function NewArrivals() {
  // Get the newest products (sorting by ID in descending order)
  const newArrivals = [...products]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4)
     const isMobile = useIsMobile()
     const shouldUseSlider = !isMobile && newArrivals.length > 4

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-muted-foreground">Fresh finds just landed. Discover what&apos;s new this week.</p>
          </div>
          <Link
            href="/products?sortBy=newest"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            View All
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      
          {shouldUseSlider ? (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-3">
          {newArrivals.map((product) => (
            <CarouselItem key={product.id} className="pl-3 md:pl-6 basis-1/2 lg:basis-1/4">
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 size-12 border-2" />
        <CarouselNext className="right-0 size-12 border-2" />
      </Carousel>
    </div>
  ) : (
    <div className="-mx-4 md:mx-0 px-4 md:px-0  flex overflow-x-auto md:overflow-visible scrollbar-hide md:grid grid-cols-1 gap-3  md:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {newArrivals.map((product) => (
        <ProductCard key={product.id} product={product} className="min-w-[240px] md:min-w-auto" />
      ))}
      </div>
    
  )}
      </div>
    </section>

    
  )
}

