import { Suspense } from "react";
import ChooseGuide from "@/components/tools/ChooseGuide";

export default function ChoosePage() {
  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">Help me Choose</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Two questions. One starting point. You can always compare from there.
        </p>
        <Suspense fallback={null}>
          <ChooseGuide />
        </Suspense>
      </section>
    </div>
  );
}
