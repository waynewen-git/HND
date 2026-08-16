import { withBasePath } from "@/lib/assetPath";

const DEMO_VIDEO = withBasePath("/videos/products/hero-Testing-Demo-1.mp4");

/** Intrinsic size of hero-Testing-Demo-1.mp4 */
const VIDEO_W = 568;
const VIDEO_H = 320;

export default function CategoryDemoVideo() {
  return (
    <div
      className="relative w-full max-w-[568px] shrink-0 overflow-hidden bg-hnd-gray-950"
      style={{ aspectRatio: `${VIDEO_W} / ${VIDEO_H}` }}
    >
      <video
        controls
        playsInline
        preload="metadata"
        width={VIDEO_W}
        height={VIDEO_H}
        className="h-full w-full object-contain"
      >
        <source src={DEMO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
