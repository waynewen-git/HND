import { MapPin } from "lucide-react";
import { stores } from "@/data/products";

export default function StoresPage() {
  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">
          Experience Centers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Visit an HND Experience Center to try our instruments and gear in
          person. Our specialists are ready to help you find your sound.
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {stores.map((store) => (
            <div
              key={store.id}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-hnd-red" />
                <div>
                  <h2 className="font-bebas text-xl">
                    {store.name}
                  </h2>
                  <p className="mt-2 text-sm text-hnd-gray-500">
                    {store.address}
                  </p>
                  <p className="mt-1 text-sm text-hnd-gray-500">
                    {store.city}, {store.country}
                  </p>
                  <p className="mt-4 text-sm">
                    <span className="font-medium">Hours: </span>
                    {store.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
