"use client"

import { useEffect, useMemo, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Filter, SlidersHorizontal, LayoutGrid, List, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { products, categories } from "@/lib/mock-data"
import { useFilterStore } from "@/store/filter-store"

function CategoriesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryQuery = searchParams.get("category")
  const subcategoryQuery = searchParams.get("subcategory")

  const {
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

  // Sync URL params with store
  useEffect(() => {
    if (categoryQuery && categoryQuery !== selectedCategory) {
      setSelectedCategory(categoryQuery)
    }
    if (subcategoryQuery && subcategoryQuery !== selectedSubcategory) {
      setSelectedSubcategory(subcategoryQuery)
    }
  }, [categoryQuery, subcategoryQuery, selectedCategory, selectedSubcategory, setSelectedCategory, setSelectedSubcategory])

  const currentCategory = useMemo(() => categories.find((c) => c.slug === selectedCategory), [selectedCategory])

  const toggleFilter = (groupId: string, value: string) => {
    setActiveFilters((prev) => {
      const currentGroup = prev[groupId] || []
      const isSelected = currentGroup.includes(value)
      const newGroup = isSelected ? currentGroup.filter((v) => v !== value) : [...currentGroup, value]
      return { ...prev, [groupId]: newGroup }
    })
  }

  const handleSubcategoryClick = (subcategorySlug: string) => {
    setSelectedSubcategory(subcategorySlug)
    router.push(`/categories?category=${selectedCategory}&subcategory=${subcategorySlug}`, { scroll: false })
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
    setSelectedSubcategory("")
    setSortBy("featured")
    // Keep category selected
    router.push(`/categories?category=${selectedCategory}`, { scroll: false })
  }

  // Clear filters when category changes
  useEffect(() => {
    setActiveFilters({})
    setSelectedSubcategory("")
    setAvailability("all")
    setPriceFrom("")
    setPriceTo("")
    setPriceError("")
    setPriceRange({ from: 0, to: 10000 })
  }, [selectedCategory, setSelectedSubcategory, setAvailability, setPriceRange])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        const productCategorySlug = product.category.toLowerCase().replace(/\s+/g, "-")
        const matchesCategory = productCategorySlug === selectedCategory

        // Subcategory filter
        const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory

        // Availability filter
        const matchesAvailability =
          availability === "all" ||
          (availability === "in-stock" && product.inStock) ||
          (availability === "out-of-stock" && !product.inStock)

        // Price range filter
        const matchesPrice = product.price >= priceRange.from && product.price <= priceRange.to

        // Attribute filters
        const matchesAttributes = Object.entries(activeFilters).every(([groupId, values]) => {
          if (values.length === 0) return true
          const attr = product.attributes?.find((a) => a.name.toLowerCase() === groupId.toLowerCase())
          return attr && values.includes(attr.value.toLowerCase())
        })

        return matchesCategory && matchesSubcategory && matchesAvailability && matchesPrice && matchesAttributes
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        if (sortBy === "newest") return Number(b.id) - Number(a.id)
        return 0
      })
  }, [selectedCategory, selectedSubcategory, availability, priceRange, activeFilters, sortBy])

  if (!currentCategory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <p className="mt-2 text-muted-foreground">Please select a valid category</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentCategory.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Category Hero Section */}
      <div className="mb-8 rounded-2xl bg-linear-to-r from-primary/10 to-primary/5 p-8">
        <h1 className="text-4xl font-bold tracking-tight">{currentCategory.name}</h1>
        {currentCategory.description && (
          <p className="mt-2 text-lg text-muted-foreground">{currentCategory.description}</p>
        )}
      </div>

      {/* Subcategory Quick Links */}
      {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Shop by Subcategory</h2>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant={!selectedSubcategory ? "default" : "outline"}
              className="cursor-pointer rounded-lg px-4 py-2 text-sm transition-all hover:bg-primary/10"
              onClick={() => {
                setSelectedSubcategory("")
                router.push(`/categories?category=${selectedCategory}`, { scroll: false })
              }}
            >
              All
            </Badge>
            {currentCategory.subcategories.map((sub) => (
              <Badge
                key={sub.id}
                variant={selectedSubcategory === sub.slug ? "default" : "outline"}
                className="cursor-pointer rounded-lg px-4 py-2 text-sm transition-all hover:bg-primary/10"
                onClick={() => handleSubcategoryClick(sub.slug)}
              >
                {sub.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filter Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Filters</h3>

            {/* Availability Filter */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold">Availability</Label>
              <div className="space-y-2">
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
            <div className="mb-6">
              <Label className="mb-3 block text-sm font-semibold">Price Range</Label>
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

            {/* Dynamic Filters */}
            {currentCategory.filterGroups.length > 0 && (
              <Accordion type="multiple" defaultValue={currentCategory.filterGroups.map((g) => g.id)}>
                {currentCategory.filterGroups.map((group) => (
                  <AccordionItem key={group.id} value={group.id} className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                      {group.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {group.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${group.id}-${option.value}`}
                              checked={(activeFilters[group.id] || []).includes(option.value)}
                              onCheckedChange={() => toggleFilter(group.id, option.value)}
                            />
                            <Label
                              htmlFor={`${group.id}-${option.value}`}
                              className="text-sm cursor-pointer"
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
          </div>

          <Button variant="outline" className="w-full rounded-xl" onClick={handleResetAll}>
            Reset All
          </Button>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Sorting & View */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex items-center gap-3">
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

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-6"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                <Filter className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters.</p>
              <Button variant="outline" className="mt-6 rounded-xl" onClick={handleResetAll}>
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Mobile Reset Button */}
          <div className="lg:hidden">
            <Button variant="outline" className="w-full rounded-xl" onClick={handleResetAll}>
              Reset All Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesContent />
    </Suspense>
  )
}

