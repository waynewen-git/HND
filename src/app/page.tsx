import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryDemoVideo from "@/components/home/CategoryDemoVideo";
import Button from "@/components/ui/Button";
import { heroSlides } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />

      {/* Category Highlights */}
      <section className="section-padding container-max py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Crafted for Heavy Rock
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-hnd-gray-500">
            Electric guitars, professional amp heads, and premium audio —
            engineered with cold metal precision for the stage and studio.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <CategoryDemoVideo />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hnd-black text-white">
        <div className="section-padding container-max flex flex-col items-center py-24 text-center md:py-32">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Build Your Sound
          </h2>
          <p className="mt-4 max-w-lg text-hnd-gray-500">
            Configure your perfect instrument. Choose your model, color, and
            components — coming soon in our visual configurator.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/configure" size="lg">
              Start Configuring
            </Button>
            <Button href="/shop" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Shop Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
