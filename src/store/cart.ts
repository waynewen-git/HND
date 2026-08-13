"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ProductColor } from "@/types";
import { getProductById } from "@/data/products";

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, color: ProductColor) => void;
  removeItem: (productId: string, color: ProductColor) => void;
  updateQuantity: (
    productId: string,
    color: ProductColor,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, color) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.color === color,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId && i.color === color
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { productId, color, quantity: 1 }],
          };
        });
      },

      removeItem: (productId, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color),
          ),
        }));
      },

      updateQuantity: (productId, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color
              ? { ...i, quantity }
              : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => {
          const product = getProductById(item.productId);
          return sum + (product?.price ?? 0) * item.quantity;
        }, 0),
    }),
    { name: "hnd-cart" },
  ),
);
