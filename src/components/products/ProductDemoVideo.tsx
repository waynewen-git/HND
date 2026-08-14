import { withBasePath } from "@/lib/assetPath";

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
  return (
    <section className="bg-hnd-gray-100 dark:bg-hnd-gray-950">
      <div className="section-padding container-max py-16 md:py-24">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Product Demo
        </h2>
        <p className="mt-2 text-hnd-gray-500">
          See and hear {title} in action.
        </p>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-sm bg-hnd-black">
          <video
            controls
            playsInline
            preload="metadata"
            poster={poster ? withBasePath(poster) : undefined}
            className="h-full w-full object-cover"
          >
            <source src={withBasePath(src)} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
