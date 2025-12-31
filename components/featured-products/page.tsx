import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCardSkeleton } from "@/components/product-section-skeleton";
import { FeaturedProductsList } from "./featured-products-server";

export function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-12 bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-8 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Our handpicked selection of this season&apos;s must-have items.
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Shop All
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
          <FeaturedProductsList />
        </Suspense>
      </div>
    </section>
  );
}
