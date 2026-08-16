"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice, getProductById } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { COLOR_LABELS } from "@/types";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-28 md:pt-36">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Your Cart is Empty
          </h1>
          <p className="mt-4 text-hnd-gray-500">
            Explore our collection and find your perfect instrument.
          </p>
          <Button href="/shop" size="lg" className="mt-8">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36">
      <div className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Shopping Cart
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div
                  key={`${item.productId}-${item.color}`}
                  className="flex gap-6 border-b border-hnd-gray-300/20 pb-6 dark:border-hnd-gray-700/50"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-hnd-gray-100 dark:bg-hnd-gray-900">
                    <AppImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${product.category}/${product.slug}`}
                        className="font-display text-lg font-semibold hover:text-hnd-red"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-hnd-gray-500">
                        {COLOR_LABELS[item.color]}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                          className="rounded-sm border border-hnd-gray-300 p-1 dark:border-hnd-gray-700"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                          className="rounded-sm border border-hnd-gray-300 p-1 dark:border-hnd-gray-700"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.color)
                          }
                          className="text-hnd-gray-500 transition-colors hover:text-hnd-red"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-hnd-gray-300/20 pt-6 dark:border-hnd-gray-700/50">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <Button href="/checkout" size="lg" className="mt-8 w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
