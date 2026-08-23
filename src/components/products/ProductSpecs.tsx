"use client";

import type { ReactNode } from "react";
import {
  CircuitBoard,
  Guitar,
  MoreHorizontal,
  Music2,
  Wrench,
} from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import type { MessageKey } from "@/i18n/dictionaries";
import type { ProductSpec } from "@/types";

const SECTION_ORDER = [
  "body",
  "neck",
  "electronics",
  "hardware",
  "other",
] as const;

type SpecSectionId = (typeof SECTION_ORDER)[number];

const SECTION_TITLE_KEY: Record<SpecSectionId, MessageKey> = {
  body: "specs.sectionBody",
  neck: "specs.sectionNeck",
  electronics: "specs.sectionElectronics",
  hardware: "specs.sectionHardware",
  other: "specs.sectionOther",
};

const SECTION_ICON: Record<SpecSectionId, ReactNode> = {
  body: <Guitar className="h-5 w-5" strokeWidth={1.6} />,
  neck: <Music2 className="h-5 w-5" strokeWidth={1.6} />,
  electronics: <CircuitBoard className="h-5 w-5" strokeWidth={1.6} />,
  hardware: <Wrench className="h-5 w-5" strokeWidth={1.6} />,
  other: <MoreHorizontal className="h-5 w-5" strokeWidth={1.6} />,
};

interface ProductSpecsProps {
  specs: ProductSpec[];
}

function isSectionId(value: string): value is SpecSectionId {
  return (SECTION_ORDER as readonly string[]).includes(value);
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const { t } = useI18n();
  const hasGroups = specs.some((s) => s.group);

  if (!hasGroups) {
    return (
      <dl className="mt-8 divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
        {specs.map((spec) => (
          <div
            key={`${spec.label}-${spec.value}`}
            className="flex justify-between gap-6 py-4 text-sm md:text-base"
          >
            <dt className="font-medium shrink-0">{spec.label}</dt>
            <dd className="text-right text-hnd-gray-500 whitespace-pre-line">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  const grouped = SECTION_ORDER.map((id) => ({
    id,
    items: specs.filter((s) => s.group === id),
  })).filter((section) => section.items.length > 0);

  const extras = specs.filter(
    (s) => s.group && !isSectionId(s.group),
  );

  return (
    <div className="mt-10 space-y-12 md:space-y-14">
      {grouped.map((section) => (
        <div key={section.id}>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hnd-gray-300/60 text-hnd-black dark:border-hnd-gray-700 dark:text-hnd-white">
              {SECTION_ICON[section.id]}
            </span>
            <h3 className="font-bebas text-xl tracking-wide md:text-2xl">
              {t(SECTION_TITLE_KEY[section.id])}
            </h3>
          </div>
          <dl className="divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
            {section.items.map((spec, index) => (
              <div
                key={`${section.id}-${spec.label}-${index}`}
                className="grid grid-cols-[minmax(7rem,10rem)_1fr] gap-4 py-3.5 text-sm md:grid-cols-[12rem_1fr] md:text-base"
              >
                <dt className="font-medium text-hnd-black dark:text-hnd-white">
                  {spec.label}
                </dt>
                <dd className="text-hnd-gray-500 whitespace-pre-line">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      {extras.length > 0 && (
        <dl className="divide-y divide-hnd-gray-300/20 dark:divide-hnd-gray-700/50">
          {extras.map((spec, index) => (
            <div
              key={`extra-${spec.label}-${index}`}
              className="grid grid-cols-[minmax(7rem,10rem)_1fr] gap-4 py-3.5 text-sm md:grid-cols-[12rem_1fr] md:text-base"
            >
              <dt className="font-medium">{spec.label}</dt>
              <dd className="text-hnd-gray-500 whitespace-pre-line">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
