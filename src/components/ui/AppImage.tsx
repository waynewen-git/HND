import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/assetPath";

type AppImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/** next/image wrapper that prefixes public paths for GitHub Pages (/HND). */
export default function AppImage({ src, alt, ...props }: AppImageProps) {
  return <Image src={withBasePath(src)} alt={alt} {...props} />;
}
