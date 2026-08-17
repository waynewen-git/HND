"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice, getProductById } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { COLOR_LABELS } from "@/types";

function TaobaoShopCard() {
  return (
    <div className="border border-hnd-gray-300/30 p-6 text-center dark:border-hnd-gray-700/50">
      <h1 className="font-bebas text-[clamp(2.1rem,6vw,3.75rem)] leading-none tracking-wide text-white">
        Coming Soon
      </h1>
      <p className="mt-4 font-ui text-sm leading-relaxed text-hnd-gray-300">
        本网站购物支付功能暂不可用，不便之处敬请谅解。
      </p>
      <p className="mt-2 font-ui text-sm leading-relaxed text-hnd-gray-400">
        Online checkout and payment are currently unavailable.
        We apologize for the inconvenience.
      </p>
      <p className="mt-5 font-ui text-xs tracking-[0.16em] text-hnd-gray-500 uppercase">
        Shop on Taobao
      </p>
      <p className="mt-1 font-ui text-sm text-hnd-black dark:text-hnd-white">
        扫描二维码进入淘宝网店
      </p>
      <div className="relative mx-auto mt-4 h-52 w-52 overflow-hidden bg-white p-2">
        <AppImage
          src="/images/QRcode.png"
          alt="HND Taobao store QR code"
          width={1000}
          height={1000}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-24 md:pt-28">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24">
          <div className="w-full max-w-md">
            <TaobaoShopCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-5xl">Shopping Cart</h1>
        <p className="mt-3 font-ui text-sm tracking-wide text-hnd-gray-500">
          本网站购物支付功能暂不可用，不便之处敬请谅解。
          <span className="mt-1 block">
            Online checkout and payment are currently unavailable. We apologize
            for the inconvenience.
          </span>
        </p>

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
                        className="font-bebas text-lg hover:text-hnd-red"
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
            <h2 className="font-bebas text-xl">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">Shipping</span>
                <span>Coming Soon</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-hnd-gray-300/20 pt-6 dark:border-hnd-gray-700/50">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <Button size="lg" className="mt-8 w-full" disabled>
              Checkout Coming Soon
            </Button>
            <div className="mt-8">
              <TaobaoShopCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
