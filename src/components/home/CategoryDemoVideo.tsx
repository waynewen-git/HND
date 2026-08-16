import { withBasePath } from "@/lib/assetPath";

const DEMO_VIDEO = withBasePath("/videos/products/hero-Testing-Demo-1.mp4");

export default function CategoryDemoVideo() {
  return (
    <div className="relative mx-auto h-[220px] w-full overflow-hidden bg-hnd-gray-950 md:h-[280px] lg:h-[320px]">
      <video
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      >
        <source src={DEMO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
