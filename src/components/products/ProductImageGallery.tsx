"use client";

import AppImage from "@/components/ui/AppImage";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/useI18n";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm bg-transparent"
          aria-label={t("gallery.enlargeMain", { name: productName })}
        >
          <AppImage
            src={images[0]}
            alt={productName}
            fill
            unoptimized
            className="object-contain transition-transform duration-300 hover:scale-[1.02]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
            {images.slice(1).map((img, i) => {
              const index = i + 1;
              return (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative aspect-square cursor-zoom-in overflow-hidden rounded-sm bg-transparent"
                  aria-label={t("gallery.enlargeView", {
                    name: productName,
                    n: index + 1,
                  })}
                >
                  <AppImage
                    src={img}
                    alt={t("gallery.view", {
                      name: productName,
                      n: index + 1,
                    })}
                    fill
                    unoptimized
                    className="object-contain transition-transform duration-300 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 33vw, 16vw"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.gallery", { name: productName })}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label={t("gallery.close")}
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 md:left-6"
                aria-label={t("gallery.previousImage")}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 md:right-6"
                aria-label={t("gallery.nextImage")}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative h-[min(85vh,900px)] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AppImage
              src={images[activeIndex]}
              alt={t("gallery.enlargedView", {
                name: productName,
                n: activeIndex + 1,
              })}
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeIndex ? "w-8 bg-white" : "w-3 bg-white/40",
                  )}
                  aria-label={t("gallery.goToImage", { n: i + 1 })}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
