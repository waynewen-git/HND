"use client";

import AppImage from "@/components/ui/AppImage";
import { withBasePath } from "@/lib/assetPath";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/useI18n";

const THUMBS_VISIBLE = 4;

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  video?: string;
  videoPoster?: string;
}

export default function ProductImageGallery({
  images,
  productName,
  video,
  videoPoster,
}: ProductImageGalleryProps) {
  const { t } = useI18n();
  const [showVideo, setShowVideo] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const thumbScrollerRef = useRef<HTMLDivElement>(null);

  const detailImages = images.slice(1);
  const thumbCount = detailImages.length + (video ? 1 : 0);
  const maxThumbIndex = Math.max(0, thumbCount - THUMBS_VISIBLE);
  const poster = videoPoster ?? images[0];

  const openLightbox = (index: number) => {
    setShowVideo(false);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const syncThumbIndex = useCallback(() => {
    const el = thumbScrollerRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const gap = 12;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;
    setThumbIndex(
      Math.min(maxThumbIndex, Math.max(0, Math.round(el.scrollLeft / step))),
    );
  }, [maxThumbIndex]);

  const scrollThumbsTo = useCallback(
    (i: number) => {
      const el = thumbScrollerRef.current;
      const first = el?.children[0] as HTMLElement | undefined;
      if (!el || !first) return;
      const next = Math.min(maxThumbIndex, Math.max(0, i));
      const gap = 12;
      const step = first.offsetWidth + gap;
      setThumbIndex(next);
      el.scrollTo({ left: next * step, behavior: "smooth" });
    },
    [maxThumbIndex],
  );

  const thumbPrev = () => scrollThumbsTo(thumbIndex - 1);
  const thumbNext = () => scrollThumbsTo(thumbIndex + 1);

  useEffect(() => {
    const el = thumbScrollerRef.current;
    if (!el || thumbCount <= THUMBS_VISIBLE) return;
    syncThumbIndex();
    el.addEventListener("scroll", syncThumbIndex, { passive: true });
    window.addEventListener("resize", syncThumbIndex);
    return () => {
      el.removeEventListener("scroll", syncThumbIndex);
      window.removeEventListener("resize", syncThumbIndex);
    };
  }, [thumbCount, syncThumbIndex]);

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
        {showVideo && video ? (
          <div className="w-full overflow-hidden rounded-sm bg-hnd-gray-950">
            <video
              key={video}
              controls
              playsInline
              preload="metadata"
              poster={poster ? withBasePath(poster) : undefined}
              className="block h-auto w-full"
              style={{ aspectRatio: "13 / 6" }}
              onLoadedMetadata={(e) => {
                const el = e.currentTarget;
                if (el.videoWidth > 0 && el.videoHeight > 0) {
                  el.style.aspectRatio = `${el.videoWidth} / ${el.videoHeight}`;
                }
              }}
            >
              <source src={withBasePath(video)} type="video/mp4" />
            </video>
          </div>
        ) : (
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
        )}

        {thumbCount > 0 && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={thumbPrev}
              disabled={thumbCount <= THUMBS_VISIBLE || thumbIndex === 0}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:pointer-events-none disabled:opacity-0 sm:h-10 sm:w-10"
              aria-label={t("common.previous")}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
            </button>

            <div
              ref={thumbScrollerRef}
              className="flex min-w-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {detailImages.map((img, i) => {
                const index = i + 1;
                return (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative aspect-square w-[calc((100%-2.25rem)/4)] shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-sm bg-transparent"
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
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                );
              })}

              {video && (
                <button
                  type="button"
                  onClick={() => setShowVideo((v) => !v)}
                  className={cn(
                    "relative aspect-square w-[calc((100%-2.25rem)/4)] shrink-0 snap-start cursor-pointer overflow-hidden rounded-sm bg-hnd-gray-950 ring-2 ring-offset-2 ring-offset-hnd-white transition-all dark:ring-offset-hnd-black",
                    showVideo
                      ? "ring-hnd-red"
                      : "ring-transparent hover:ring-hnd-gray-300 dark:hover:ring-hnd-gray-700",
                  )}
                  aria-label={t("product.productDemo")}
                  aria-current={showVideo ? "true" : undefined}
                >
                  {poster && (
                    <AppImage
                      src={poster}
                      alt={t("product.productDemo")}
                      fill
                      unoptimized
                      className="object-cover opacity-80"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-hnd-black">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={thumbNext}
              disabled={
                thumbCount <= THUMBS_VISIBLE || thumbIndex >= maxThumbIndex
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:pointer-events-none disabled:opacity-0 sm:h-10 sm:w-10"
              aria-label={t("common.next")}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
            </button>
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
              src={images[lightboxIndex]}
              alt={t("gallery.enlargedView", {
                name: productName,
                n: lightboxIndex + 1,
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
                    setLightboxIndex(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === lightboxIndex ? "w-8 bg-white" : "w-3 bg-white/40",
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
