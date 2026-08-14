const DEMO_VIDEO = "/videos/products/Testing-Demo-1.MP4";

export default function CategoryDemoVideo() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-hnd-black">
        <video controls playsInline preload="metadata" className="h-full w-full object-contain">
          <source src={DEMO_VIDEO} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
