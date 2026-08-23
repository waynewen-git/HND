"use client";

import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";

/** Static showcase page — no server searchParams (required for GitHub Pages export). */
export default function OrderConfirmPage() {
  const { t } = useI18n();

  return (
    <div className="pt-12 md:pt-14">
      <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hnd-red/10">
          <svg
            className="h-8 w-8 text-hnd-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-8 font-bebas text-3xl md:text-4xl">
          {t("order.confirmed")}
        </h1>
        <p className="mt-4 text-hnd-gray-500">{t("order.thankYou")}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/shop" size="lg">
            {t("order.continueShopping")}
          </Button>
          <Button href="/account" variant="outline" size="lg">
            {t("order.viewAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
}
