import CategoryDemoVideo from "@/components/home/CategoryDemoVideo";

export default function HomeDemoSection() {
  return (
    <section className="border-t border-hnd-gray-300/70 bg-hnd-white py-8 md:py-10 dark:border-hnd-gray-800/50 dark:bg-hnd-black">
      <div className="section-padding container-max">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-rock text-[clamp(1.35rem,3vw,2.15rem)] leading-tight text-hnd-black dark:text-hnd-white">
            Crafted for Heavy <span className="text-hnd-red">Rock</span>
            {" - "}
            Built for the <span className="text-hnd-red">Stage</span>.
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-3xl md:mt-8">
          <CategoryDemoVideo />
        </div>
      </div>
    </section>
  );
}
