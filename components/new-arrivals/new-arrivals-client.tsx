"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCard } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/lib/mock-data"; // adjust path/type as needed

interface NewArrivalsClientProps {
  newArrivals: Product[];
}

export function NewArrivalsClient({ newArrivals }: NewArrivalsClientProps) {
  const isMobile = useIsMobile();
  const shouldUseSlider = !isMobile && newArrivals.length > 4;

  // Always show only 4 items (as per original design)
  const displayedProducts = newArrivals
//   .slice(0, 4);
  // All items are always available

  if (shouldUseSlider) {
    return (
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
                  <CarouselItem
                    key={product.id}
                    className="pl-3 md:pl-6 basis-1/2 lg:basis-1/4"
                  >
                    <div className="h-full">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext  />
            </Carousel>
          </div>
    );
  }

  // Mobile: simple horizontal scroll (no carousel JS)
  return (
    <div className="flex -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide md:overflow-visible md:grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="min-w-[240px] flex-shrink-0 md:min-w-0"
        />
      ))}
    </div>
  );
}