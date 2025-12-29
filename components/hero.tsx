"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SLIDES = [
  {
    id: 1,
    tag: "PREMIUM DESIGN",
    title: "Apple Watch Ultra",
    description: "Advanced imaging performance with a 200MP AI camera with Enhanced image quality.",
    cta: "Shop Now",
    image: "/test.webp",
    bgColor: "bg-[#0a0a0c]",
  },
  {
    id: 2,
    tag: "NEW ARRIVAL",
    title: "Smart Home Hub",
    description: "Connect and control your entire home with one sleek, minimalist interface.",
    cta: "Explore Now",
    image: "/smart-home-hub-hero.jpg",
    bgColor: "bg-[#0f1115]",
  },
  {
    id: 3,
    tag: "LIMITED EDITION",
    title: "Pro Audio Series",
    description: "Immersive sound engineering designed for professional studio environments.",
    cta: "View Series", 
    image: "/pro-audio-hero.jpg",
    bgColor: "bg-[#0c0d12]",
  },
]

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className={cn("relative flex-[0_0_100%] min-w-0 pt-10 pb-16 md:py-24", slide.bgColor)}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <div className="flex flex-col items-start space-y-6 text-white md:space-y-8">
                    <span className="text-xs font-bold tracking-widest text-white/70 uppercase lg:text-sm">
                      {slide.tag}
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">{slide.title}</h1>
                    <p className="max-w-md text-sm text-white/60 leading-relaxed sm:text-base lg:text-lg">
                      {slide.description}
                    </p>
                    <Link href="/products">
                      <Button
                        size="lg"
                        variant= "default"

                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                  <div className="relative flex justify-center md:justify-end">
                    <div className="relative aspect-square w-full max-w-[500px]">
                      <Image
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots as per image ref */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              selectedIndex === index ? "w-8 bg-primary" : "w-4 bg-white/20",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
