import Link from "next/link";
import { withBasePath } from "@/lib/assetPath";
import { categoryChapters } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="pt-24 md:pt-28">
      {categoryChapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={chapter.href}
          className="group relative block w-full max-w-[100vw] overflow-x-clip bg-transparent outline-none"
          aria-label={`${chapter.label}: ${chapter.title}`}
        >
          <div className="relative h-[42vh] min-h-[220px] overflow-hidden md:h-[44vh] lg:h-[48vh]">
            <img
              src={withBasePath(chapter.image)}
              alt={chapter.title}
              className="absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-300 group-hover:opacity-90"
              decoding="async"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
