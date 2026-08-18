"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import GuitarColorSwatch from "@/components/tools/GuitarColorSwatch";
import GuitarPreview from "@/components/tools/GuitarPreview";
import {
  defaultGuitarSelections,
  guitarBodyOptions,
  guitarColorOption,
  guitarCustomUpcoming,
  guitarNeckOption,
  guitarNeckOptions,
  type GuitarBodyColorId,
  type GuitarSelections,
} from "@/data/guitarCustom";
import { cn } from "@/lib/utils";

function optionCardClass(on: boolean) {
  return cn(
    "flex w-full items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-3 text-left transition-all duration-200 md:px-4 md:py-3.5",
    on
      ? "border-hnd-black bg-hnd-black/[0.03] dark:border-hnd-white dark:bg-hnd-white/[0.06]"
      : "border-hnd-gray-300/70 hover:border-hnd-gray-500 dark:border-hnd-gray-800 dark:hover:border-hnd-gray-500",
  );
}

function optionDotClass(on: boolean) {
  return cn(
    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
    on
      ? "border-hnd-black dark:border-hnd-white"
      : "border-hnd-gray-300 dark:border-hnd-gray-700",
  );
}

export default function GuitarCustomizer() {
  const [selections, setSelections] = useState<GuitarSelections>(() =>
    defaultGuitarSelections(),
  );

  const selectedBody = useMemo(
    () => guitarBodyOptions.find((o) => o.value === selections.body)!,
    [selections.body],
  );

  const selectedColor = useMemo(
    () => guitarColorOption(selections.color),
    [selections.color],
  );

  const selectedNeck = useMemo(
    () => guitarNeckOption(selections.neck),
    [selections.neck],
  );

  return (
    <div className="fixed inset-x-0 top-12 bottom-0 z-0 flex flex-col overflow-hidden bg-hnd-white text-hnd-black md:top-14 md:flex-row dark:bg-hnd-black dark:text-hnd-white">
      <section
        aria-label="Guitar preview"
        className="relative flex h-[46svh] min-h-0 shrink-0 items-center justify-center bg-hnd-gray-100 md:h-auto md:min-w-0 md:flex-1 dark:bg-hnd-gray-950"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_88%,rgba(196,30,58,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_88%,rgba(196,30,58,0.08),transparent_55%)]"
        />
        <div className="relative h-full w-full max-h-full max-w-[min(88vw,680px)] md:max-w-[min(72vh,760px)]">
          <GuitarPreview
            bodyValue={selectedBody.value}
            colorId={selections.color}
            neckId={selections.neck}
          />
        </div>
      </section>

      <aside className="flex min-h-0 flex-1 flex-col border-t border-hnd-gray-300/70 bg-hnd-white md:w-[min(100%,420px)] md:max-w-[420px] md:shrink-0 md:flex-none md:border-t-0 md:border-l dark:border-hnd-gray-800 dark:bg-hnd-black lg:w-[460px] lg:max-w-[460px]">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-7 md:py-8">
          <header>
            <h1 className="font-ui text-[1.75rem] font-bold tracking-tight md:text-[2rem]">
              Custom Guitar
            </h1>
            <p className="mt-1.5 text-sm text-hnd-gray-500">
              Built to order · Estimated 8–12 weeks
            </p>
          </header>

          <section className="mt-6 md:mt-8">
            <h2 className="font-ui text-lg font-bold md:text-xl">Body Shape</h2>
            <ul className="mt-3 space-y-2 md:mt-4">
              {guitarBodyOptions.map((option) => {
                const on = selections.body === option.value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setSelections((prev) => ({
                          ...prev,
                          body: option.value,
                        }))
                      }
                      className={optionCardClass(on)}
                    >
                      <span className="font-ui text-sm font-bold md:text-base">
                        {option.value}
                      </span>
                      <span aria-hidden className={optionDotClass(on)}>
                        {on ? (
                          <span className="h-2 w-2 rounded-full bg-hnd-black dark:bg-hnd-white" />
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-6 md:mt-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-ui text-lg font-bold md:text-xl">Paint</h2>
              <p className="font-ui text-sm text-hnd-gray-500">
                {selectedColor.label}
              </p>
            </div>
            <div className="mt-3 md:mt-4">
              <GuitarColorSwatch
                selected={selections.color}
                onSelect={(color: GuitarBodyColorId) =>
                  setSelections((prev) => ({ ...prev, color }))
                }
              />
            </div>
          </section>

          <section className="mt-6 md:mt-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-ui text-lg font-bold md:text-xl">Neck</h2>
              <p className="font-ui text-sm text-hnd-gray-500">
                {selectedNeck.value}
              </p>
            </div>
            <ul className="mt-3 space-y-2 md:mt-4">
              {guitarNeckOptions.map((option) => {
                const on = selections.neck === option.id;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setSelections((prev) => ({
                          ...prev,
                          neck: option.id,
                        }))
                      }
                      className={optionCardClass(on)}
                    >
                      <span className="font-ui text-sm font-bold md:text-base">
                        {option.value}
                      </span>
                      <span aria-hidden className={optionDotClass(on)}>
                        {on ? (
                          <span className="h-2 w-2 rounded-full bg-hnd-black dark:bg-hnd-white" />
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="mt-6 text-xs leading-relaxed text-hnd-gray-500 md:mt-8 md:text-sm">
            Next: {guitarCustomUpcoming.join(" · ")}. All choices update the
            preview above.
          </p>
        </div>

        <footer className="shrink-0 border-t border-hnd-gray-300/50 bg-hnd-white px-5 py-4 md:px-7 dark:border-hnd-gray-800 dark:bg-hnd-black">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-ui text-[11px] tracking-wide text-hnd-gray-500 uppercase">
                Your build
              </p>
              <p className="truncate font-ui text-sm font-bold md:text-base">
                {selectedBody.value} · {selectedColor.label} ·{" "}
                {selectedNeck.value}
              </p>
            </div>
            <Button
              type="button"
              size="md"
              className="shrink-0 rounded-full px-6 normal-case tracking-normal md:px-8"
              disabled
            >
              Continue
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
