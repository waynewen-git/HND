"use client";

import { withBasePath } from "@/lib/assetPath";
import { useI18n } from "@/i18n/useI18n";

interface ProductDemoVideoProps {
  src: string;
  title: string;
  poster?: string;
}

export default function ProductDemoVideo({
  src,
  title,
  poster,
}: ProductDemoVideoProps) {
  const { t } = useI18n();

  return (
    <section className="bg-hnd-white dark:bg-transparent">
      <div className="section-padding container-max py-16 md:py-24">
        <h2 className="font-bebas text-2xl md:text-3xl">
          {t("product.productDemo")}
        </h2>
        <p className="mt-2 text-hnd-gray-500">
          {t("product.seeAndHear", { name: title })}
        </p>
        <div
          className="relative mx-auto mt-8 overflow-hidden bg-hnd-gray-950"
          style={{
            width: "100%",
            maxWidth: 568,
            aspectRatio: "568 / 320",
          }}
        >
          <video
            controls
            playsInline
            preload="metadata"
            width={568}
            height={320}
            poster={poster ? withBasePath(poster) : undefined}
            className="h-full w-full object-contain"
          >
            <source src={withBasePath(src)} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
