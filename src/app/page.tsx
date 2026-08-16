import CategorySlideshow from "@/components/home/CategorySlideshow";
import HomeDemoSection from "@/components/home/HomeDemoSection";
import Reveal from "@/components/ui/Reveal";
import { categorySlides } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <CategorySlideshow slides={categorySlides} />

      <Reveal>
        <HomeDemoSection />
      </Reveal>
    </>
  );
}
