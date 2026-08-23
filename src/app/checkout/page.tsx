"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { getProductById } from "@/data/products";
import { useI18n } from "@/i18n/useI18n";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { t, lp, lcolor, formatPrice } = useI18n();
  const { items, totalPrice, clearCart } = useCartStore();
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-12 md:pt-14">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <h1 className="font-bebas text-3xl">{t("checkout.empty")}</h1>
          <Button href="/shop" size="lg" className="mt-8">
            {t("checkout.continueShopping")}
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
    <div className="pt-12 md:pt-14">
      <div className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-5xl">{t("checkout.title")}</h1>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <fieldset>
              <legend className="font-bebas text-xl">
                {t("checkout.shippingInfo")}
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder={t("checkout.firstName")}
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder={t("checkout.lastName")}
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  type="email"
                  placeholder={t("checkout.email")}
                  className="col-span-2 rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder={t("checkout.address")}
                  className="col-span-2 rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder={t("checkout.city")}
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
                <input
                  required
                  placeholder={t("checkout.zip")}
                  className="rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-bebas text-xl">{t("checkout.payment")}</legend>
              <div className="mt-4 rounded-sm border border-dashed border-hnd-gray-300 p-8 text-center dark:border-hnd-gray-700">
                <p className="text-sm text-hnd-gray-500">
                  {t("checkout.paymentPlaceholder")}
                </p>
                <p className="mt-2 text-xs text-hnd-gray-500">
                  {t("checkout.paymentNote")}
                </p>
              </div>
            </fieldset>
          </div>

          <div>
            <div className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50">
              <h2 className="font-bebas text-xl">{t("checkout.orderSummary")}</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => {
                  const raw = getProductById(item.productId);
                  if (!raw) return null;
                  const product = lp(raw);
                  return (
                    <li
                      key={`${item.productId}-${item.color}`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {product.name} × {item.quantity}
                        <span className="ml-1 text-hnd-gray-500">
                          ({lcolor(item.color)})
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
                <span className="font-semibold">{t("checkout.total")}</span>
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
                {processing ? t("checkout.processing") : t("checkout.placeOrder")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
