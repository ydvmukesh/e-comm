import { create } from 'zustand'

export type ViewMode = 'grid' | 'list'
export type SortBy = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'
export type AvailabilityFilter = 'all' | 'in-stock' | 'out-of-stock'

interface PriceRange {
  from: number
  to: number
}

interface FilterStore {
  searchQuery: string
  selectedCategory: string
  selectedSubcategory: string
  sortBy: SortBy
  viewMode: ViewMode
  activeFilters: Record<string, string[]>
  availability: AvailabilityFilter
  priceRange: PriceRange
  
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedSubcategory: (subcategory: string) => void
  setSortBy: (sort: SortBy) => void
  setViewMode: (mode: ViewMode) => void
  toggleFilter: (groupId: string, value: string) => void
  setAvailability: (availability: AvailabilityFilter) => void
  setPriceRange: (range: PriceRange) => void
  resetFilters: (keepCategory?: boolean) => void
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  searchQuery: '',
  selectedCategory: 'all',
  selectedSubcategory: '',
  sortBy: 'featured',
  viewMode: 'grid',
  activeFilters: {},
  availability: 'all',
  priceRange: { from: 0, to: 10000 },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setSelectedCategory: (category) => {
    set({ 
      selectedCategory: category, 
      selectedSubcategory: '',
      activeFilters: {} 
    })
  },

  setSelectedSubcategory: (subcategory) => {
    set({ selectedSubcategory: subcategory })
  },

  setSortBy: (sort) => {
    set({ sortBy: sort })
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  toggleFilter: (groupId, value) => {
    set((state) => {
      const currentGroup = state.activeFilters[groupId] || []
      const isSelected = currentGroup.includes(value)
      const newGroup = isSelected
        ? currentGroup.filter((v) => v !== value)
        : [...currentGroup, value]

      return {
        activeFilters: {
          ...state.activeFilters,
          [groupId]: newGroup.length > 0 ? newGroup : undefined,
        },
      }
    })
  },

  setAvailability: (availability) => {
    set({ availability })
  },

  setPriceRange: (range) => {
    set({ priceRange: range })
  },

  resetFilters: (keepCategory = false) => {
    const currentCategory = get().selectedCategory
    set({
      searchQuery: '',
      selectedCategory: keepCategory ? currentCategory : 'all',
      selectedSubcategory: '',
      sortBy: 'featured',
      activeFilters: {},
      availability: 'all',
      priceRange: { from: 0, to: 10000 },
    })
  },
}))
