"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatPrice, getProductById } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { COLOR_LABELS } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-20">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Nothing to Checkout</h1>
          <Button href="/shop" size="lg" className="mt-8">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `HND-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    router.push(`/order/confirm?orderId=${orderId}`);
  };

  return (
    <div className="pt-20">
      <div className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <fieldset>
              <legend className="font-display text-xl font-bold">
                Shipping Information
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="First Name"
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder="Last Name"
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="col-span-2 rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder="Address"
                  className="col-span-2 rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder="City"
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder="ZIP / Postal Code"
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-xl font-bold">
                Payment
              </legend>
              <div className="mt-4 rounded-sm border border-dashed border-hnd-gray-300 p-8 text-center dark:border-hnd-gray-700">
                <p className="text-sm text-hnd-gray-500">
                  Payment integration placeholder
                </p>
                <p className="mt-2 text-xs text-hnd-gray-500">
                  Stripe / PayPal will be connected in production
                </p>
              </div>
            </fieldset>
          </div>

          <div>
            <div className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50">
              <h2 className="font-display text-xl font-bold">Order Summary</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <li
                      key={`${item.productId}-${item.color}`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {product.name} × {item.quantity}
                        <span className="ml-1 text-hnd-gray-500">
                          ({COLOR_LABELS[item.color]})
                        </span>
                      </span>
                      <span>
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-between border-t border-hnd-gray-300/20 pt-6 dark:border-hnd-gray-700/50">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-8 w-full"
                disabled={processing}
              >
                {processing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
