"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, ChevronLeft, Minus, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/mock-data"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useToast } from "@/hooks/use-toast"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"
import { RelatedProduct } from "@/components/related-products/page"

export default function ProductDetailsPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const router = useRouter()
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toast } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  const product = useMemo(() => products.find((p) => p.id === id), [id])
  const inWishlist = product ? isInWishlist(product.id) : false

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => router.push("/products")}>Back to Products</Button>
      </div>
    )
  }


  const handleAddToCart = () => {
    // Check if all variants are selected
    const allVariantsSelected = product.variants?.every((v) => selectedVariants[v.id])
    if (product.variants && !allVariantsSelected) {
      toast({
        title: "Selection required",
        description: "Please select all options before adding to cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      ...product,
      quantity,
      selectedVariants,
    })
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    })
  }

  const handleToggleWishlist = () => {
    if (!product) return
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
    })
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 ">
      {/* ... existing breadcrumb ... */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronLeft className="size-4 rotate-180" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronLeft className="size-4 rotate-180" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-4xl border bg-muted shadow-inner">
            <Image
              src={product.images[activeImageIndex] || product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
            {product.originalPrice && (
              <Badge className="absolute top-6 left-6 scale-125 bg-destructive text-destructive-foreground">Sale</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {(product.images || [product.image]).map((img, i) => (
              <div
                key={i}
                className={cn(
                  "relative aspect-square cursor-pointer overflow-hidden rounded-xl border bg-muted transition-all",
                  activeImageIndex === i ? "border-primary border-2 ring-2 ring-primary/20" : "hover:opacity-80",
                )}
                onClick={() => setActiveImageIndex(i)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* ... existing header info ... */}
          <div className="space-y-4">
            <Badge variant="outline" className="rounded-lg uppercase tracking-wider">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                ))}
                <span className="ml-1 font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">({product.reviews} reviews)</span>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant={product.inStock ? "secondary" : "destructive"} className="rounded-lg">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && (
            <div className="space-y-6 py-2">
              {product.variants.map((variant) => (
                <div key={variant.id} className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{variant.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option.value}
                        disabled={!option.inStock}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.id]: option.value }))}
                        className={cn(
                          "px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all",
                          selectedVariants[variant.id] === option.value
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted hover:border-primary/50",
                          !option.inStock && "opacity-40 cursor-not-allowed grayscale",
                        )}
                      >
                        {option.label}
                        {!option.inStock && " (Sold Out)"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {/* ... existing action buttons ... */}
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center justify-between rounded-xl border p-1 shadow-sm order-1 flex-1 sm:flex-none">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 gap-2 rounded-xl shadow-lg shadow-primary/20 py-6 order-3 sm:order-2 "
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="size-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="size-12 rounded-xl border-2 bg-transparent order-2 sm:order-last"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("size-5", inWishlist && "fill-red-500 text-red-500")} />
              </Button>
            </div>
            {/* ... existing features cards ... */}
            <div className="grid grid-cols-auto gap-0 gap-y-4 sm:gap-4 rounded-2xl border bg-muted/30 py-5 p-3.5 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm sm:text-sm sm:mx-auto">
                <Truck className="size-5 text-primary" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-sm sm:mx-auto">
                <RotateCcw className="size-5 text-primary" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-sm sm:mx-auto">
                <ShieldCheck className="size-5 text-primary" />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </div>
          {/* ... existing tabs ... */}
          <Tabs defaultValue="details" className="mt-8">
            {/* ... existing tabs content ... */}
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="details"
                className="rounded-none  border-b-2  border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="py-6 text-sm text-muted-foreground leading-relaxed">
              We offer free express shipping on all orders over $100. Standard shipping typically takes 3-5 business
              days. If you&apos;re not completely satisfied with your purchase, you can return it within 30 days for a
              full refund.
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Customer Reviews ({product.reviews})</h3>
                  <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                    Write a Review
                  </Button>
                </div>
                <div className="rounded-xl border p-4 bg-muted/20">
                  <p className="text-sm italic">
                    &quot;Amazing product! Quality is even better than shown in pictures.&quot;
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold">Alex Thompson</span>
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Related Products Slider */}
    
  <RelatedProduct />    
    </div>
  );
}
