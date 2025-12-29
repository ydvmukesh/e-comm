"use client"

import { useState } from "react"
import { Mail, Sparkles, Gift, Bell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"

export function PromoBanner() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    toast({
      title: "Welcome to the Elegance Club! 🎉",
      description: "Check your email for your exclusive 20% discount code.",
    })
    setEmail("")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="relative overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-primary/5 via-background to-primary/5 p-4 sm:p-12 shadow-lg">
        {/* Background Decorative Elements */}
        <div className="absolute -top-32 -left-32 size-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Icon Row */}
          <div className="mb-8 flex items-center justify-center gap-3 sm:gap-4">
            <div className="group flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/20">
              <Sparkles className="size-6 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="group flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/20">
              <Gift className="size-6 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="group flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/20">
              <Bell className="size-6 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Join the <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Elegance Club</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto px-4">
              Get <span className="font-bold text-primary">20% off</span> your first order plus exclusive access to new collections and premium offers
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubscribe} className="mx-auto max-w-xl px-4 sm:px-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-13 rounded-xl border-2 border-primary/20 pl-12 pr-4 text-base focus:border-primary focus-visible:ring-primary/20 bg-background/80 backdrop-blur-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="h-13 rounded-xl px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-md hover:shadow-primary/30 hover:scale-105 gap-2 shrink-0"
              >
                Join Now
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <p className="mt-4 text-center text-xs sm:text-sm text-muted-foreground/80">
              <span className="inline-block">✨</span> Free to join • No spam • Unsubscribe anytime
            </p>
          </form>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-sm px-4 py-2 border border-primary/10">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Exclusive Deals</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-sm px-4 py-2 border border-primary/10">
              <div className="size-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-sm font-medium">Early Access</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-sm px-4 py-2 border border-primary/10">
              <div className="size-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
              <span className="text-sm font-medium">Premium Updates</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
