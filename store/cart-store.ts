import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
  variant?: Record<string, string>
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string, variantKey?: string) => void
  updateQuantity: (id: string, quantity: number, variantKey?: string) => void
  clearCart: () => void
  get totalItems(): number
  get totalPrice(): number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const quantity = item.quantity || 1
        const variantKey = item.variant ? `${item.id}-${Object.values(item.variant).sort().join("-")}` : item.id

        set((state) => {
          const existingItemIndex = state.items.findIndex((i) => {
            const iKey = i.variant ? `${i.id}-${Object.values(i.variant).sort().join("-")}` : i.id
            return iKey === variantKey
          })

          if (existingItemIndex > -1) {
            const newItems = [...state.items]
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
            }
            return { items: newItems }
          }

          return {
            items: [...state.items, { ...item, quantity }],
          }
        })
      },

      removeItem: (id, variantKey) => {
        set((state) => ({
          items: state.items.filter((item) => {
            const itemKey = item.variant ? `${item.id}-${Object.values(item.variant).sort().join("-")}` : item.id
            const targetKey = variantKey || id
            return itemKey !== targetKey
          }),
        }))
      },

      updateQuantity: (id, quantity, variantKey) => {
        if (quantity <= 0) {
          get().removeItem(id, variantKey)
          return
        }

        set((state) => ({
          items: state.items.map((item) => {
            const itemKey = item.variant ? `${item.id}-${Object.values(item.variant).sort().join("-")}` : item.id
            const targetKey = variantKey || id
            return itemKey === targetKey ? { ...item, quantity } : item
          }),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      get totalPrice() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: "elegance-cart-storage",
    },
  ),
)
