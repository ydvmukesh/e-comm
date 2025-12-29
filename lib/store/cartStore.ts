import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Cart } from '@/types';

interface CartStore extends Cart {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, variantValue?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantValue?: string) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const SHIPPING_COST = 5.99;
const TAX_RATE = 0.08; // 8%

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      couponCode: undefined,

      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.variant?.value === item.variant?.value
        );

        let newItems: CartItem[];
        if (existingItemIndex > -1) {
          newItems = items.map((i, index) =>
            index === existingItemIndex
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          newItems = [...items, { ...item, quantity: item.quantity || 1 }];
        }

        set({ items: newItems });
        get().calculateTotals();
      },

      removeItem: (productId, variantValue) => {
        const { items } = get();
        const newItems = items.filter(
          (item) =>
            !(
              item.productId === productId &&
              (variantValue === undefined || item.variant?.value === variantValue)
            )
        );
        set({ items: newItems });
        get().calculateTotals();
      },

      updateQuantity: (productId, quantity, variantValue) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId, variantValue);
          return;
        }

        const newItems = items.map((item) =>
          item.productId === productId &&
          (variantValue === undefined || item.variant?.value === variantValue)
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
        get().calculateTotals();
      },

      applyCoupon: (code) => {
        // Mock coupon logic - in real app, validate with backend
        const validCoupons: Record<string, number> = {
          SAVE10: 10,
          SAVE20: 20,
          WELCOME15: 15,
        };

        const discountPercent = validCoupons[code.toUpperCase()];
        if (discountPercent) {
          set({ couponCode: code.toUpperCase() });
          get().calculateTotals();
        }
      },

      removeCoupon: () => {
        set({ couponCode: undefined, discount: 0 });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          discount: 0,
          total: 0,
          couponCode: undefined,
        });
      },

      calculateTotals: () => {
        const { items, couponCode } = get();
        
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : SHIPPING_COST) : 0;
        
        let discount = 0;
        if (couponCode) {
          const validCoupons: Record<string, number> = {
            SAVE10: 10,
            SAVE20: 20,
            WELCOME15: 15,
          };
          const discountPercent = validCoupons[couponCode] || 0;
          discount = (subtotal * discountPercent) / 100;
        }

        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * TAX_RATE;
        
        const total = subtotal + shipping + tax - discount;

        set({
          subtotal,
          shipping,
          tax,
          discount,
          total: Math.max(0, total),
        });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
