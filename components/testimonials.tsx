"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-slide functionality
  useEffect(() => {
    if (!api) return

    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          api.scrollNext()
        }
      }, 4000) // Auto-slide every 4 seconds
    }

    startAutoSlide()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api, isHovered])

  // Handle hover state
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <section className="py-12 sm:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-8 text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don&apos;t just take our word for it. Here are some real experiences from our global community.
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-2">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-3 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-none bg-background shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="group relative rounded-3xl bg-background p-8 transition-all dark:bg-card h-full flex flex-col">
                      <Quote className="absolute top-6 right-8 size-10 text-primary/10 transition-colors group-hover:text-primary/20" />
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < testimonial.rating ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="mb-8 text-base font-medium leading-relaxed italic flex-1">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative size-12 overflow-hidden rounded-full border-2 border-primary/20">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
