"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, User, Search, Heart, LogOut, UserCircle, Package, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useAuthStore } from "@/store/auth-store"
import { cn } from "@/lib/utils"
import { AuthModal } from "@/components/auth/auth-modal"
import { categories } from "@/lib/mock-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const totalItems = useCartStore((state) => state.totalItems)
  const wishlistTotal = useWishlistStore((state) => state.totalItems)
  const { user, isAuthenticated, authModalOpen, setAuthModalOpen, logout } = useAuthStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            {!searchOpen && (
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
                <span className="text-xl font-semibold hidden sm:inline">Elegance</span>
              </Link>
            )}

            {/* Desktop Navigation */}
            {!searchOpen && (
              <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Products
                </Link>
                
                {/* Categories Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground outline-none">
                    Categories     <ChevronDown className="h-4 w-4" />

                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link href={`/categories?category=${category.slug}`} className="cursor-pointer">
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/policies"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Policies
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </div>
            )}

            {/* Right Actions */}
            <div className={cn("flex items-center gap-2", searchOpen ? "flex-1" : "")}>
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
                  <Input
                    autoFocus
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-full rounded-full"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                    <X className="size-5" />
                  </Button>
                </form>
              ) : (
                <>
                  {/* Search Icon */}
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                    <Search className="size-5" />
                    <span className="sr-only">Search</span>
                  </Button>

                

                  {/* Account Dropdown */}
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <User className="size-5" />
                          <span className="sr-only">Account</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5 text-sm font-medium">
                          {user?.name || user?.email || "Guest User"}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">
                            <UserCircle className="mr-2 size-4" />
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile?tab=orders" className="cursor-pointer">
                            <Package className="mr-2 size-4" />
                            Order History
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                          <LogOut className="mr-2 size-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={handleAccountClick}>
                      <User className="size-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  )}
                  {/* Wishlist */}
                  <Link href="/wishlist">
                    <Button variant="ghost" size="icon" className="relative">
                      <Heart className="size-5" />
                      {wishlistTotal > 0 && (
                        <span className="absolute -top-2 -right-2 flex min-w-[20px] h-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white shadow-lg">
                          {wishlistTotal}
                        </span>
                      )}
                      <span className="sr-only">Wishlist ({wishlistTotal} items)</span>
                    </Button>
                  </Link>
                  {/* Cart */}
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="size-5" />
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 flex min-w-[20px] h-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white shadow-lg">
                          {totalItems}
                        </span>
                      )}
                      <span className="sr-only">Cart ({totalItems} items)</span>
                    </Button>
                  </Link>
                  

                  {/* Mobile Menu Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t md:hidden">
              <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex flex-1">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">E</span>
                </div>
                <span className="text-xl font-semibold">Elegance</span>
              </Link>
            </div>
            <div className="md:flex md:flex-1 md:justify-center md:space-x-4">
              <Link
                href="/"
                className="hidden md:flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="hidden md:flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                Products
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id}>
                      <Link href={`/categories?category=${category.slug}`}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/policies">Policies</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Favorites</span>
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Cart</span>
              </Button>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setAuthModalOpen(true)}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} >
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="text-left border-b pb-4">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                        <span className="text-lg font-bold text-primary-foreground">E</span>
                      </div>
                      <span className="text-xl font-semibold">Elegance</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 mt-4">
                    <Link
                      href="/"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="categories" className="border-none">
                        <AccordionTrigger className="px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:no-underline rounded-md">
                          Categories
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 pl-4">
                          <div className="flex flex-col gap-1 mt-1">
                            {categories.map((category) => (
                              <Link
                                key={category.id}
                                href={`/categories?category=${category.slug}`}
                                className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Link
                      href="/policies"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Policies
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
          </div>
        )}
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
