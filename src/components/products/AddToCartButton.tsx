"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import ColorSwatch from "@/components/products/ColorSwatch";
import type { ProductColor } from "@/types";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";

interface AddToCartButtonProps {
  productId: string;
  defaultColor: ProductColor;
  colors: ProductColor[];
}

export default function AddToCartButton({
  productId,
  defaultColor,
  colors,
}: AddToCartButtonProps) {
  const { t, lcolor } = useI18n();
  const [color, setColor] = useState<ProductColor>(defaultColor);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(productId, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-medium tracking-wide uppercase">
            {t("product.color")}
          </p>
          <p className="text-sm text-hnd-gray-500">{lcolor(color)}</p>
        </div>
        <div className="mt-3">
          <ColorSwatch colors={colors} selected={color} onSelect={setColor} />
        </div>
      </div>
      <Button
        onClick={handleAdd}
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added ? t("product.addedToCart") : t("product.addToCart")}
      </Button>
    </div>
  );
}
