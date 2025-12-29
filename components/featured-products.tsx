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

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  const shouldUseSlider = featured.length > 4

  return (
    <section className="py-8 sm:py-12 bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">Our handpicked selection of this season&apos;s must-have items.</p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Shop All
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
                {featured.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
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
          <div className="flex overflow-x-auto md:overflow-visible scrollbar-hide md:grid grid-cols-1 gap-4  md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} className="min-w-[240px] md:min-w-auto" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
