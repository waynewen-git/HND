"use client";

import { useEffect, useRef } from "react";
import {
  guitarBodyOption,
  guitarNeckOption,
  guitarPreviewImage,
  GUITAR_STAGE,
  type GuitarBodyColorId,
  type GuitarNeckId,
} from "@/data/guitarCustom";
import { withBasePath } from "@/lib/assetPath";
import { cn } from "@/lib/utils";

interface GuitarPreviewProps {
  bodyValue: string;
  colorId: GuitarBodyColorId;
  neckId: GuitarNeckId;
  className?: string;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/** Pixel-aligned body + neck composite. */
export default function GuitarPreview({
  bodyValue,
  colorId,
  neckId,
  className,
}: GuitarPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const body = guitarBodyOption(bodyValue);
  const neck = guitarNeckOption(neckId);
  const bodySrc = withBasePath(guitarPreviewImage(bodyValue, colorId));
  const neckSrc = withBasePath(neck.image);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const { width, height, extra, body: bodySize } = GUITAR_STAGE;

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    Promise.all([loadImage(bodySrc), loadImage(neckSrc)]).then(
      ([bodyImg, neckImg]) => {
        if (cancelled || !canvasRef.current) return;

        const scale = bodySize / neck.native;
        const heelX = neck.heelX * scale;
        const heelY = neck.heelY * scale;
        const neckLeft = body.pocketX - heelX;
        const neckTop = extra + body.pocketY - heelY;
        const neckW = neck.native * scale;
        const neckH = neck.native * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bodyImg, 0, extra, bodySize, bodySize);
        ctx.drawImage(neckImg, neckLeft, neckTop, neckW, neckH);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [bodySrc, neckSrc, body, neck]);

  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        width={GUITAR_STAGE.width}
        height={GUITAR_STAGE.height}
        className="max-h-full max-w-full object-contain"
        aria-label={`${body.value} with ${neck.value}`}
      />
    </div>
  );
}
