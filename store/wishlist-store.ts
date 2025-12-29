import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleItem: (item: WishlistItem) => void
  get totalItems(): number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id)
          if (exists) return state
          return { items: [...state.items, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },

      toggleItem: (item) => {
        const isInList = get().isInWishlist(item.id)
        if (isInList) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      get totalItems() {
        return get().items.length
      },
    }),
    {
      name: "elegance-wishlist-storage",
    },
  ),
)

