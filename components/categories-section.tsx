import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { categories } from "@/lib/mock-data"

export function CategoriesSection() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between flex-col sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground">
              Find exactly what you&apos;re looking for in our organized collections.
            </p>
          </div>
          <Link
            href="/products?category=all"
            className="group flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            View All
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="-mx-4 md:mx-0 px-4 md:px-0 flex overflow-x-auto md:overflow-visible scrollbar-hide md:grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative h-64 overflow-hidden rounded-2xl border bg-muted min-w-[155px] md:min-w-auto max-h-[150px] md:max-h-full"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm text-white/80">{category.productCount} Products</p>
              </div>
              <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-black shadow-lg">
                  <ArrowRight className="size-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
