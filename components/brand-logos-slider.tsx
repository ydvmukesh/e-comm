"use client"

import { useEffect, useRef } from "react"

const brands = [
  { name: "VOGUE", style: "font-serif tracking-tighter" },
  { name: "GQ", style: "font-black tracking-wider" },
  { name: "FORBES", style: "font-bold" },
  { name: "WIRED", style: "font-bold tracking-wide" },
  { name: "ELLE", style: "font-serif italic tracking-tight" },
  { name: "VANITY FAIR", style: "font-serif tracking-tight" },
  { name: "ESQUIRE", style: "font-black" },
  { name: "WALL ST", style: "font-bold tracking-wider" },
]

export function BrandLogosSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // Clone items for infinite scroll effect
    const scrollerInner = scroller.querySelector(".scroller-inner")
    if (!scrollerInner) return

    const scrollerContent = Array.from(scrollerInner.children)
    
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      scrollerInner.appendChild(duplicatedItem)
    })
  }, [])

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
          As Featured In
        </p>
        
        <div className="overflow-hidden">
          <div 
            ref={scrollerRef}
            className="scroller group"
            data-animated="true"
          >
            <div className="scroller-inner flex gap-12 items-center animate-scroll group-hover:paused">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="shrink-0 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  <span className={`text-3xl ${brand.style}`}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }

        .scroller[data-animated="true"] .scroller-inner {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  )
}

