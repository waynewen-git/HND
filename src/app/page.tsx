import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryDemoVideo from "@/components/home/CategoryDemoVideo";
import SocialLinks from "@/components/layout/SocialLinks";
import Button from "@/components/ui/Button";
import { heroSlides } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />

      {/* Category Highlights */}
      <section className="section-padding container-max pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.2em] text-hnd-steel uppercase">
            Bring Rock Closer to Life.
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Crafted for Heavy Rock
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-hnd-gray-500">
            Electric guitars, professional amp heads, and premium audio —
            engineered with cold metal precision for the stage and studio.
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <CategoryDemoVideo />
        </div>

        <div className="mt-10 flex flex-col items-center md:mt-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-hnd-gray-700 uppercase dark:text-hnd-gray-300">
            Follow HND
          </p>
          <SocialLinks variant="brand" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hnd-gray-300/40 bg-hnd-white text-hnd-black dark:border-hnd-gray-800 dark:bg-hnd-black dark:text-hnd-white">
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
            <Button
              href="/shop"
              variant="outline"
              size="lg"
              className="border-hnd-black text-hnd-black hover:bg-hnd-black/5 dark:border-hnd-white dark:text-hnd-white dark:hover:bg-hnd-white/10"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
