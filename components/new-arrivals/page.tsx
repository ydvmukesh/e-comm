import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCardSkeleton } from "@/components/product-section-skeleton";
import { NewArrivalsList } from "./new-arrivals-server";

export function NewArrivals() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-muted-foreground">
              Fresh finds just landed. Discover what&apos;s new this week.
            </p>
          </div>
          <Link
            href="/products?sortBy=newest"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            View All
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="flex -mx-4 px-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <NewArrivalsList />
        </Suspense>
      </div>
    </section>
  );
}