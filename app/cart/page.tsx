"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { Card, CardContent } from "@/components/ui/card"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore()

  const getVariantKey = (variants?: Record<string, string>) => (variants ? JSON.stringify(variants) : undefined)

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
        </div>
        <Link href="/products">
          <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-bold">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const variantKey = item.selectedVariants ? JSON.stringify(item.selectedVariants) : undefined
            
            return (
              <div
                key={`${item.id}-${variantKey || 'default'}`}
                className="group relative flex flex-col gap-4 rounded-3xl border bg-muted/30 p-4 md:p-6 transition-all hover:shadow-md sm:flex-row sm:items-center dark:bg-card"
              >
                <div className="relative aspect-square size-28 overflow-hidden rounded-2xl border bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold transition-colors group-hover:text-primary">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id, variantKey)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                  {item.selectedVariants && (
                    <p className="text-xs text-muted-foreground">
                      {Object.entries(item.selectedVariants).map(([key, value]) => value).join(', ')}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between sm:mt-2">
                    <div className="flex items-center rounded-xl border p-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, variantKey)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, variantKey)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                    <span className="text-lg font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="rounded-3xl md:rounded-[2.5rem] border bg-muted/30 shadow-none">
            <CardContent className="p-4 md:p-8">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-primary">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button
                  size="lg"
                  className="mt-8 w-full gap-2 rounded-2xl shadow-lg shadow-primary/20 py-7 text-lg font-bold"
                >
                  Checkout Now
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-4 px-2">
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="size-5 text-primary" />
              <span className="text-muted-foreground">Secure encrypted checkout</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Truck className="size-5 text-primary" />
              <span className="text-muted-foreground">Free express shipping worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
