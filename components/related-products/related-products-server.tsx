import { products } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export async function RelatedProductsList({ productId }: { productId: string | undefined }) {
  // Simulate delay (or real fetch later)
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (!productId) {
    return null
  }

  const product = products.find((p) => p.id === productId)
  if (!product) {
    return null
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
   
  const shouldUseSlider = relatedProducts.length > 4
  return (
    <>
    

    {shouldUseSlider ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              
               
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-3">
                {relatedProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <div className="h-full">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="" />
              <CarouselNext className="" />
            </Carousel>
          </div>
        ) : (
          <div className="-mx-4 md:mx-0 px-4 md:px-0 flex overflow-x-auto md:overflow-visible scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="min-w-[240px] md:min-w-auto" />
            ))}
          </div>
        )}  
        </>
  )
}

