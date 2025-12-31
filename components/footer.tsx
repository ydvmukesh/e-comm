"use client"

import type React from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Linkedin } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:gap-12 lg:grid-cols-12">
          {/* Brand - 3 columns */}
          <div className="space-y-6 lg:col-span-3 col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <span className="text-xl font-bold text-primary-foreground">E</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Elegance</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium quality products with a focus on minimal design and sustainable practices. Elevate your everyday
              experience.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-xl border bg-background transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop - 2 columns */}
          <div className="lg:col-span-2 col-span-1">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Shop</h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "All Products", href: "/products" },
                { label: "Electronics", href: "/categories?category=electronics" },
                { label: "Fashion", href: "/categories?category=fashion" },
                { label: "Home Decor", href: "/categories?category=home-decor" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - 2 columns */}
          <div className="lg:col-span-2 col-span-1">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/policies?tab=faq" },
                { label: "Shipping", href: "/policies?tab=shipping" },
                { label: "Returns", href: "/policies?tab=refund" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support - 5 columns */}
          <div className="lg:col-span-5 col-span-full">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Customer Support</h3>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-foreground mb-1">Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    685 Market Street,
                    Las Vegas, LA 95820
                    United States.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Phone</p>
                  <a href="tel:+099532786984" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    (+099) 532-786-9843
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Email</p>
                  <a href="mailto:support@example.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    support@example.com
                  </a>
                </div>
              </div>

          
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 border-t pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Elegance. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies?tab=terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/policies?tab=privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/policies?tab=shipping" className="hover:text-primary transition-colors">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
