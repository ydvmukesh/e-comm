import { Hero } from "@/components/hero"
import { TrustFeatures } from "@/components/trust-features"
import { FeaturedProducts } from "@/components/featured-products"
import { NewArrivals } from "@/components/new-arrivals"
import { CategoriesSection } from "@/components/categories-section"
import { PromoBanner } from "@/components/promo-banner"
import { Testimonials } from "@/components/testimonials"
import { BrandLogosSlider } from "@/components/brand-logos-slider"

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />
      <TrustFeatures />
      <CategoriesSection />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <Testimonials />
      <BrandLogosSlider />
    </div>
  )
}
