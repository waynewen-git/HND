import { withBasePath } from "@/lib/assetPath";

interface CategoryDemoVideoProps {
  src: string;
  title: string;
}

export default function CategoryDemoVideo({
  src,
  title,
}: CategoryDemoVideoProps) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      aria-label={title}
    >
      <source src={withBasePath(src)} type="video/mp4" />
    </video>
  );
}
