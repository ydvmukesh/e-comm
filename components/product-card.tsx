"use client"

import type React from "react"
import Image from "next/image.js"
import Link from "next/link"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/mock-data"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
  className?: string
}

export function ProductCard({ product, viewMode = "grid", className }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { toast } = useToast()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  // List View Layout
  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.id}`} className="group block">
        <Card className="overflow-hidden border-none bg-background shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card">
          <div className="flex flex-col sm:flex-row gap-4 p-4">
            {/* Image */}
            <div className="relative aspect-square sm:aspect-auto sm:w-48 sm:h-48 overflow-hidden rounded-xl bg-muted shrink-0">
              <Image
                src={product.image || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.originalPrice && (
                <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">Sale</Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-3 left-3 bg-muted/80 backdrop-blur-sm">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                        <Star className="size-3 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary mb-2">
                      {product.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "shrink-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all",
                      inWishlist && "opacity-100"
                    )}
                    onClick={handleToggleWishlist}
                    aria-label={inWishlist ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={cn("size-5", inWishlist && "fill-red-500 text-red-500")} />
                  </Button>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="rounded-lg text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-base text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                  {product.inStock ? (
                    <Badge variant="secondary" className="rounded-lg">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="rounded-lg">Out of Stock</Badge>
                  )}
                </div>
                <Button 
                  className="gap-2 rounded-lg" 
                  disabled={!product.inStock} 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Grid View Layout (default)
  return (
    <Link href={`/products/${product.id}`} className="group block h-full py-1">
      <Card className="h-full overflow-hidden border-none bg-background shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">Sale</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-3 left-3 bg-muted/80 backdrop-blur-sm">
              Out of Stock
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-3 right-3 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all",
              inWishlist ? "opacity-100" : "opacity-100 group-hover:opacity-100"
            )}
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("size-5", inWishlist && "fill-red-500 text-red-500")} />
          </Button>
        </div>
        <CardContent className="pt-2 ">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              <Star className="size-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="line-clamp-1 font-medium transition-colors group-hover:text-primary">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-md sm:text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="">
          <Button className="w-full gap-2 rounded-lg" disabled={!product.inStock} onClick={handleAddToCart}>
            <ShoppingCart className="size-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
