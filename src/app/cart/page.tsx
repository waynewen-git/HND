"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { getProductById } from "@/data/products";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/store/cart";

function TaobaoShopCard() {
  const { t } = useI18n();

  return (
    <div className="border border-hnd-gray-300/30 p-6 text-center dark:border-hnd-gray-700/50">
      <h1 className="font-bebas text-[clamp(2.1rem,6vw,3.75rem)] leading-none tracking-wide text-white">
        {t("cart.comingSoon")}
      </h1>
      <p className="mt-4 font-ui text-sm leading-relaxed text-hnd-gray-300">
        {t("cart.checkoutUnavailable")}
      </p>
      <p className="mt-5 font-ui text-xs tracking-[0.16em] text-hnd-gray-500 uppercase">
        {t("cart.shopTaobao")}
      </p>
      <p className="mt-1 font-ui text-sm text-hnd-black dark:text-hnd-white">
        {t("cart.scanQR")}
      </p>
      <div className="relative mx-auto mt-4 h-52 w-52 overflow-hidden bg-white p-2">
        <AppImage
          src="/images/QRcode.png"
          alt={t("cart.taobaoQR")}
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
  const { t, lp, lcolor, formatPrice } = useI18n();
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-12 md:pt-14">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24">
          <div className="w-full max-w-md">
            <TaobaoShopCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12 md:pt-14">
      <div className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-5xl">{t("cart.title")}</h1>
        <p className="mt-3 font-ui text-sm tracking-wide text-hnd-gray-500">
          {t("cart.checkoutUnavailable")}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => {
              const raw = getProductById(item.productId);
              if (!raw) return null;
              const product = lp(raw);

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
                        {lcolor(item.color)}
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
                          aria-label={t("cart.decreaseQty")}
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
                          aria-label={t("cart.increaseQty")}
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
                          aria-label={t("cart.removeItem")}
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
            <h2 className="font-bebas text-xl">{t("cart.orderSummary")}</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">{t("cart.subtotal")}</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hnd-gray-500">{t("cart.shipping")}</span>
                <span>{t("cart.comingSoon")}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-hnd-gray-300/20 pt-6 dark:border-hnd-gray-700/50">
              <span className="font-semibold">{t("cart.total")}</span>
              <span className="text-xl font-bold">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <Button size="lg" className="mt-8 w-full" disabled>
              {t("cart.checkoutComingSoon")}
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
