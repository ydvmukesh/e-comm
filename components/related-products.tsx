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
import { useParams } from "next/navigation"
import { useMemo } from "react"

export function RelatedProducts() {
    const params = useParams()
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id
    const product = useMemo(() => products.find((p) => p.id === id), [id])
  const relatedProducts = product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []

  const isMobile = useIsMobile()
  const shouldUseSlider = !isMobile && relatedProducts.length > 4
  
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Related Products</h2>
            <p className="text-muted-foreground">Our handpicked selection of this season&apos;s must-have items.</p>
          </div>
         
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
                {relatedProducts.map((product) => (
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
           {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="min-w-[240px] md:min-w-auto" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
