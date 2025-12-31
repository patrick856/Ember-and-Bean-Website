"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/app/shop/page"

export type CartItem = {
  product: Product
  size: "12oz" | "2lb"
  quantity: number
  price: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, size: "12oz" | "2lb", quantity: number) => void
  updateQuantity: (productId: string, size: "12oz" | "2lb", quantity: number) => void
  removeItem: (productId: string, size: "12oz" | "2lb") => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, quantity) => {
        const price = size === "12oz" ? product.price12oz : product.price2lb
        const existingItemIndex = get().items.findIndex((item) => item.product.id === product.id && item.size === size)

        if (existingItemIndex > -1) {
          const newItems = [...get().items]
          newItems[existingItemIndex].quantity += quantity
          set({ items: newItems })
        } else {
          set({
            items: [...get().items, { product, size, quantity, price }],
          })
        }
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.size === size ? { ...item, quantity } : item,
          ),
        })
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter((item) => !(item.product.id === productId && item.size === size)),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "ember-bean-cart",
    },
  ),
)
