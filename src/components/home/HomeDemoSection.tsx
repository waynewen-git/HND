import CategoryDemoVideo from "@/components/home/CategoryDemoVideo";

/** Placeholder artist quote — replace when real talent copy is ready */
const artistNote = {
  name: "Kai Mercer",
  role: "Lead Guitarist · Night Circuit",
  instrument: "Electric Guitar",
  model: "HND-G03 Vulture",
  quote:
    "Tight low end, cutting mids, and zero fluff on stage. This is the guitar that keeps up when the room gets loud.",
};

export default function HomeDemoSection() {
  return (
    <section className="bg-hnd-white py-8 md:py-10 dark:bg-transparent">
      <div className="section-padding container-max">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-rock text-[clamp(1.35rem,3vw,2.15rem)] leading-tight text-hnd-black dark:text-hnd-white">
            Crafted for Heavy <span className="text-hnd-red">Rock</span>
            {" - "}
            Built for the <span className="text-hnd-red">Stage</span>.
          </h2>
        </div>

        <div className="mx-auto mt-8 flex w-fit max-w-full flex-col items-stretch gap-5 md:mt-10 md:flex-row md:items-center md:gap-6 lg:gap-8">
          <CategoryDemoVideo />

          <aside className="w-full shrink-0 md:w-[min(100%,17.5rem)] lg:w-[18.5rem]">
            <p className="font-ui text-[10px] font-semibold tracking-[0.22em] text-hnd-red uppercase md:text-[11px]">
              On Stage
            </p>
            <h3 className="mt-2 font-bebas text-[clamp(1.75rem,4vw,2.35rem)] leading-[0.92] text-hnd-black dark:text-hnd-white">
              {artistNote.name}
            </h3>
            <p className="mt-2 font-ui text-xs tracking-[0.14em] text-hnd-gray-500 uppercase md:text-[13px]">
              {artistNote.role}
            </p>

            <div className="mt-4 border-t border-hnd-gray-300/50 pt-4 dark:border-hnd-gray-700/50">
              <p className="font-ui text-[10px] tracking-[0.2em] text-hnd-gray-500 uppercase">
                Instrument
              </p>
              <p className="mt-1.5 font-ui text-sm tracking-[0.08em] text-hnd-black dark:text-hnd-white">
                {artistNote.instrument}
              </p>
              <p className="mt-0.5 font-bebas text-xl tracking-wide text-hnd-red md:text-2xl">
                {artistNote.model}
              </p>
            </div>

            <blockquote className="mt-4 border-l-2 border-hnd-red pl-3">
              <p className="font-ui text-sm leading-relaxed tracking-wide text-hnd-gray-700 dark:text-hnd-gray-300">
                “{artistNote.quote}”
              </p>
            </blockquote>
          </aside>
        </div>
      </div>
    </section>
  );
}
