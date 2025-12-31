"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product-section-skeleton";
type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
};
export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    });
  };

  const handleMoveToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    removeItem(item.id);
    toast({
      title: "Moved to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-24 items-center justify-center rounded-full bg-muted">
            <Heart className="size-12 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="mt-2 text-muted-foreground max-w-md">
            Start adding products to your wishlist and keep track of items you
            love.
          </p>
          <Button asChild className="mt-8 gap-2 rounded-xl" size="lg">
            <Link href="/products">
              Browse Products
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""} saved for later
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 py-2">
          <Suspense
                 fallback={
                   <div className="flex -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide md:overflow-visible md:grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                     {Array.from({ length: 4 }).map((_, i) => (
                       <ProductCardSkeleton key={i} />
                     ))}
                   </div>
                 }
               >
  {items.map((item: WishlistItem) => (
          <Card
            key={item.id}
            className="overflow-hidden border-none bg-background shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card "
          >
            <Link href={`/products/${item.id}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {!item.inStock && (
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-muted/80 backdrop-blur-sm"
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>
            </Link>
            <CardContent className="pt-2 space-y-3">
              <Link href={`/products/${item.id}`}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <h3 className="line-clamp-1 font-medium hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="mt-1">
                  <span className="text-md sm:text-lg font-bold">
                    ₹{item.price}
                  </span>
                </div>
              </Link>
            </CardContent>
            <CardFooter className="">
              <div className="flex gap-2 w-full">
                <Button
                  size="sm"
                  className="flex-auto gap-2 rounded-lg"
                  disabled={!item.inStock}
                  onClick={() => handleMoveToCart(item)}
                >
                  <ShoppingCart className="size-4" />
                  <span className="hidden sm:block"> Add to Cart</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg flex-auto"
                  onClick={() => handleRemove(item.id, item.name)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}               </Suspense>
      
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 rounded-xl"
        >
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
