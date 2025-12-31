"use client"

import { useEffect, useMemo, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, SlidersHorizontal, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { products, categories } from "@/lib/mock-data"
import { useFilterStore } from "@/store/filter-store"

function ProductsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")
  const categoryQuery = searchParams.get("category")

  const {
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    availability,
    setAvailability,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useFilterStore()

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [priceError, setPriceError] = useState("")
  const [localSearch, setLocalSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  const PRODUCTS_PER_PAGE = 12

  // Set search from URL
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery)
      setLocalSearch(searchQuery)
    }
  }, [searchQuery, setSearchQuery])

  // Set category from URL
  useEffect(() => {
    if (categoryQuery && categoryQuery !== selectedCategory) {
      setSelectedCategory(categoryQuery)
    }
  }, [categoryQuery, selectedCategory, setSelectedCategory])

  const currentCategory = useMemo(() => categories.find((c) => c.slug === selectedCategory), [selectedCategory])

  const handleSubcategoryClick = (subcategorySlug: string) => {
    setSelectedSubcategory(subcategorySlug)
  }

  const toggleFilter = (groupId: string, value: string) => {
    setActiveFilters((prev) => {
      const currentGroup = prev[groupId] || []
      const isSelected = currentGroup.includes(value)
      const newGroup = isSelected ? currentGroup.filter((v) => v !== value) : [...currentGroup, value]

      return { ...prev, [groupId]: newGroup }
    })
  }

  const handlePriceApply = () => {
    const from = Number.parseFloat(priceFrom) || 0
    const to = Number.parseFloat(priceTo) || 10000

    if (from < 0 || to < 0) {
      setPriceError("Price cannot be negative")
      return
    }
    if (from > to) {
      setPriceError("'From' must be less than or equal to 'To'")
      return
    }

    setPriceError("")
    setPriceRange({ from, to })
  }

  const handleResetAll = () => {
    setActiveFilters({})
    setAvailability("all")
    setPriceFrom("")
    setPriceTo("")
    setPriceError("")
    setPriceRange({ from: 0, to: 10000 })
    setLocalSearch("")
    setSelectedSubcategory("")
    setCurrentPage(1)
    resetFilters()
  }

  useEffect(() => {
    setActiveFilters({})
    setSelectedSubcategory("")
    setCurrentPage(1)
  }, [selectedCategory, setSelectedSubcategory])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [localSearch, selectedCategory, selectedSubcategory, availability, priceRange, activeFilters, sortBy])

  const filteredProducts = useMemo(() => {
    const searchLower = localSearch.toLowerCase()
    
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)

        const productCategorySlug = product.category.toLowerCase().replace(/\s+/g, "-")
        const matchesCategory = selectedCategory === "all" || productCategorySlug === selectedCategory

        // Subcategory filter
        const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory

        // Availability filter
        const matchesAvailability =
          availability === "all" ||
          (availability === "in-stock" && product.inStock) ||
          (availability === "out-of-stock" && !product.inStock)

        // Price range filter
        const matchesPrice = product.price >= priceRange.from && product.price <= priceRange.to

        const matchesAttributes = Object.entries(activeFilters).every(([groupId, values]) => {
          if (values.length === 0) return true
          const attr = product.attributes?.find((a) => a.name.toLowerCase() === groupId.toLowerCase())
          return attr && values.includes(attr.value.toLowerCase())
        })

        return matchesSearch && matchesCategory && matchesSubcategory && matchesAvailability && matchesPrice && matchesAttributes
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        if (sortBy === "newest") return Number(b.id) - Number(a.id)
        return 0 // "featured" or default
      })
  }, [localSearch, selectedCategory, selectedSubcategory, sortBy, activeFilters, availability, priceRange])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden lg:block space-y-8 rounded-xl border p-4 bg-muted/30 sticky top-24 h-fit">
          <div className="">
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <div className="flex flex-col gap-1">
              {/* All Products Radio */}
              <div className="flex items-center gap-2 px-2 py-2">
                <div 
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedSubcategory("")
                  }}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <div className={cn(
                    "size-4 rounded-full border-2 flex items-center justify-center",
                    selectedCategory === "all" ? "border-primary" : "border-muted-foreground"
                  )}>
                    {selectedCategory === "all" && (
                      <div className="size-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium">All Products</span>
                </div>
              </div>
              {/* Category Items */}
              {categories.map((cat) => {
                const hasSubcategories = cat.subcategories && cat.subcategories.length > 0
                const isSelected = selectedCategory === cat.slug

                return hasSubcategories ? (
                  // Category with Subcategories (Accordion)
                  <Accordion key={cat.id} type="single" collapsible className="border-none">
                    <AccordionItem value={cat.slug} className="border-none">
                      <div className="flex items-center gap-2 px-2">
                        <div 
                          onClick={() => {
                            setSelectedCategory(cat.slug)
                            setSelectedSubcategory("")
                          }}
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <div className={cn(
                            "size-4 rounded-full border-2 flex items-center justify-center shrink-0",
                            isSelected ? "border-primary" : "border-muted-foreground"
                          )}>
                            {isSelected && (
                              <div className="size-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                        <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <div className="ml-6 mt-1 flex flex-col gap-1">
                          {cat.subcategories.map((sub) => (
                            <div
                              key={sub.id}
                              onClick={() => {
                                setSelectedCategory(cat.slug)
                                handleSubcategoryClick(sub.slug)
                              }}
                              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-muted/50 rounded"
                            >
                              <div className={cn(
                                "size-3 rounded-full border-2 flex items-center justify-center",
                                selectedSubcategory === sub.slug ? "border-primary" : "border-muted-foreground"
                              )}>
                                {selectedSubcategory === sub.slug && (
                                  <div className="size-1.5 rounded-full bg-primary" />
                                )}
                              </div>
                              <span className="text-sm">{sub.name}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  // Category without Subcategories (Simple Radio)
                  <div key={cat.id} className="flex items-center gap-2 px-2 py-2">
                    <div 
                      onClick={() => {
                        setSelectedCategory(cat.slug)
                        setSelectedSubcategory("")
                      }}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <div className={cn(
                        "size-4 rounded-full border-2 flex items-center justify-center",
                        isSelected ? "border-primary" : "border-muted-foreground"
                      )}>
                        {isSelected && (
                          <div className="size-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Availability</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="avail-all"
                  checked={availability === "all"}
                  onCheckedChange={() => setAvailability("all")}
                />
                <Label htmlFor="avail-all" className="text-sm cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="avail-in-stock"
                  checked={availability === "in-stock"}
                  onCheckedChange={() => setAvailability("in-stock")}
                />
                <Label htmlFor="avail-in-stock" className="text-sm cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="avail-out-of-stock"
                  checked={availability === "out-of-stock"}
                  onCheckedChange={() => setAvailability("out-of-stock")}
                />
                <Label htmlFor="avail-out-of-stock" className="text-sm cursor-pointer">
                  Out of Stock
                </Label>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Price Range</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="price-from" className="text-xs text-muted-foreground">
                  From
                </Label>
                <Input
                  id="price-from"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price-to" className="text-xs text-muted-foreground">
                  To
                </Label>
                <Input
                  id="price-to"
                  type="number"
                  min="0"
                  placeholder="10000"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="mt-1"
                />
              </div>
              {priceError && <p className="text-xs text-red-500">{priceError}</p>}
              <Button size="sm" className="w-full" onClick={handlePriceApply}>
                Apply
              </Button>
            </div>
          </div>

          {currentCategory && currentCategory.filterGroups.length > 0 && (
            <Accordion type="multiple" defaultValue={[]}>
              {currentCategory.filterGroups.map((group) => (
                <AccordionItem key={group.id} value={group.id} className="border-none">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-3 uppercase tracking-wider">
                    {group.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-1">
                      {group.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${group.id}-${option.value}`}
                            checked={(activeFilters[group.id] || []).includes(option.value)}
                            onCheckedChange={() => toggleFilter(group.id, option.value)}
                          />
                          <Label
                            htmlFor={`${group.id}-${option.value}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <Button
            variant="outline"
            className="w-full rounded-xl bg-transparent"
            onClick={handleResetAll}
          >
            Reset All
          </Button>
        </aside>

        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Header & Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {currentCategory ? currentCategory.name : "All Products"}
              </h1>
              <p className="text-muted-foreground mt-1">Discover {filteredProducts.length} premium products</p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-xl"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
            <div className="flex flex-wrapsitems-center gap-2 lg:hidden overflow-x-auto md:overflow-visible scrollbar-hide">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer rounded-lg px-4 py-1.5 transition-all hover:bg-primary/10 hover:text-primary"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.slug ? "default" : "outline"}
                  className="cursor-pointer rounded-lg px-4 py-1.5 transition-all hover:bg-primary/10 hover:text-primary"
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* <div className="hidden items-center rounded-lg border p-1 sm:flex">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon-sm"
                  className="rounded-md"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon-sm"
                  className="rounded-md"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </div> */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-lg">
                  <SlidersHorizontal className="mr-2 size-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-6"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-10 rounded-lg"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="size-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)

                        if (!showPage) {
                          // Show ellipsis
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <span key={page} className="px-2 text-muted-foreground">
                                ...
                              </span>
                            )
                          }
                          return null
                        }

                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            className="size-10 rounded-lg"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="size-10 rounded-lg"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                <Filter className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query.</p>
              <Button variant="outline" className="mt-6 rounded-xl bg-transparent" onClick={handleResetAll}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsListPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  )
}
