"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Check, CreditCard, Truck, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { cn } from "@/lib/utils"

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "Valid ZIP code required"),
})

const paymentSchema = z.object({
  paymentMethod: z.enum(["credit-card", "paypal", "cod"]),
})

type ShippingData = z.infer<typeof shippingSchema>
type PaymentData = z.infer<typeof paymentSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState(1)

  const shippingForm = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
  })

  const paymentForm = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit-card",
    },
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handlePlaceOrder = () => {
    // Mock order placement
    clearCart()
    router.push("/profile") // Redirect to order history in a real app
  }

  const steps = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Review" },
  ]

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting to cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-12 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border-2 transition-all font-bold",
                      step >= s.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted text-muted-foreground",
                    )}
                  >
                    {step > s.id ? <Check className="size-5" /> : s.id}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider text-center",
                      step >= s.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn("h-0.5 flex-1 mx-2 sm:mx-4 transition-all -mt-4", step > s.id ? "bg-primary" : "bg-muted")}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl md:rounded-[2.5rem] border bg-background p-4 md:p-12 shadow-sm">
            {step === 1 && (
              <form onSubmit={shippingForm.handleSubmit(nextStep)} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      {...shippingForm.register("fullName")}
                      placeholder="John Doe"
                      className="rounded-xl"
                    />
                    {shippingForm.formState.errors.fullName && (
                      <p className="text-xs text-destructive">{shippingForm.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...shippingForm.register("email")}
                      placeholder="john@example.com"
                      className="rounded-xl"
                    />
                    {shippingForm.formState.errors.email && (
                      <p className="text-xs text-destructive">{shippingForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      {...shippingForm.register("address")}
                      placeholder="123 Main St"
                      className="rounded-xl"
                    />
                    {shippingForm.formState.errors.address && (
                      <p className="text-xs text-destructive">{shippingForm.formState.errors.address.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...shippingForm.register("city")} placeholder="New York" className="rounded-xl" />
                    {shippingForm.formState.errors.city && (
                      <p className="text-xs text-destructive">{shippingForm.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      {...shippingForm.register("zipCode")}
                      placeholder="10001"
                      className="rounded-xl"
                    />
                    {shippingForm.formState.errors.zipCode && (
                      <p className="text-xs text-destructive">{shippingForm.formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
                <div className="pt-6">
                  <Button type="submit" className="w-full gap-2 rounded-2xl py-6 font-bold shadow-lg shadow-primary/20">
                    Continue to Payment
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={paymentForm.handleSubmit(nextStep)} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <RadioGroup
                  defaultValue="credit-card"
                  onValueChange={(v) => paymentForm.setValue("paymentMethod", v as any)}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <Label
                    htmlFor="credit-card"
                    className={cn(
                      "flex flex-col items-center justify-between gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all hover:border-primary/50",
                      paymentForm.watch("paymentMethod") === "credit-card"
                        ? "border-primary bg-primary/5"
                        : "border-muted",
                    )}
                  >
                    <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                    <CreditCard className="size-8 text-primary" />
                    <span className="font-bold">Credit Card</span>
                  </Label>
                  <Label
                    htmlFor="paypal"
                    className={cn(
                      "flex flex-col items-center justify-between gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all hover:border-primary/50",
                      paymentForm.watch("paymentMethod") === "paypal" ? "border-primary bg-primary/5" : "border-muted",
                    )}
                  >
                    <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                    <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white italic">
                      P
                    </div>
                    <span className="font-bold">PayPal</span>
                  </Label>
                  <Label
                    htmlFor="cod"
                    className={cn(
                      "flex flex-col items-center justify-between gap-4 rounded-2xl border-2 p-6 cursor-pointer transition-all hover:border-primary/50",
                      paymentForm.watch("paymentMethod") === "cod" ? "border-primary bg-primary/5" : "border-muted",
                    )}
                  >
                    <RadioGroupItem value="cod" id="cod" className="sr-only" />
                    <Truck className="size-8 text-primary" />
                    <span className="font-bold">COD</span>
                  </Label>
                </RadioGroup>

                <div className="flex gap-4 pt-6">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={prevStep}
                    className="flex-1 rounded-2xl py-6 font-bold bg-transparent"
                  >
                    <ChevronLeft className="size-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-[2] rounded-2xl py-6 font-bold shadow-lg shadow-primary/20">
                    Review Order
                    <ChevronRight className="size-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Review Order</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Shipping To</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-primary font-bold">
                      Edit
                    </Button>
                  </div>
                  <div className="rounded-2xl border bg-muted/30 p-4 text-sm">
                    <p className="font-bold">{shippingForm.getValues("fullName")}</p>
                    <p>
                      {shippingForm.getValues("address")}, {shippingForm.getValues("city")}{" "}
                      {shippingForm.getValues("zipCode")}
                    </p>
                    <p className="text-muted-foreground">{shippingForm.getValues("email")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Payment Method</h3>
                    <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-primary font-bold">
                      Edit
                    </Button>
                  </div>
                  <div className="rounded-2xl border bg-muted/30 p-4 text-sm flex items-center gap-3">
                    <CreditCard className="size-5 text-primary" />
                    <span className="font-bold capitalize">
                      {paymentForm.getValues("paymentMethod").replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 rounded-2xl py-6 font-bold bg-transparent"
                  >
                    <ChevronLeft className="size-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-[2] rounded-2xl py-6 font-bold shadow-lg shadow-primary/20"
                  >
                    Place Order Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Order Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl md:rounded-[2.5rem] border bg-muted/30 p-8 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4  scrollbar-thin
  scrollbar-thumb-primary/60
  scrollbar-track-transparent
  hover:scrollbar-thumb-primary">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border bg-background">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="size-full object-cover" />
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">₹{item.price.toFixed(2)}</p>
                  </div>
                  <span className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
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
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-primary">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
