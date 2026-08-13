"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { ProductColor } from "@/types";
import Button from "@/components/ui/Button";

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
        <p className="mb-2 text-sm font-medium tracking-wide uppercase">
          Color
        </p>
        <div className="mt-2 flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`rounded-sm border px-4 py-2 text-sm capitalize transition-all ${
                color === c
                  ? "border-hnd-red bg-hnd-red/10 text-hnd-red"
                  : "border-hnd-gray-300 dark:border-hnd-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <Button
        onClick={handleAdd}
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </Button>
    </div>
  );
}
