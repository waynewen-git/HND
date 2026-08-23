import type { CategoryInfo, Product, ProductColor, ProductSpec } from "@/types";
import type { Locale, MessageKey } from "@/i18n/dictionaries";
import { getMessage } from "@/i18n/dictionaries";
import { zhContent } from "@/i18n/zhContent";

export function formatLocalizedPrice(price: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

const specLabelKeys: Record<string, MessageKey> = {
  Body: "specs.body",
  Neck: "specs.neck",
  Fingerboard: "specs.fingerboard",
  Pickups: "specs.pickups",
  Bridge: "specs.bridge",
  "Scale Length": "specs.scaleLength",
  Strings: "specs.strings",
  Weight: "specs.weight",
  Power: "specs.power",
  Channels: "specs.channels",
  Tubes: "specs.tubes",
  Impedance: "specs.impedance",
  "Effects Loop": "specs.effectsLoop",
  Driver: "specs.driver",
  Bluetooth: "specs.bluetooth",
  Battery: "specs.battery",
  Inputs: "specs.inputs",
  Collection: "specs.collection",
  SKU: "specs.sku",
  Price: "specs.price",
};

const bodyEnLabels: Record<string, { value: string; description: string }> = {
  "Classic S-Style": {
    value: "Classic S-Style",
    description: "Balanced double-cut. Versatile stage geometry.",
  },
  "Faceted Custom": {
    value: "Faceted Custom",
    description: "Angular planes. Aggressive modern silhouette.",
  },
  Superstrat: {
    value: "Superstrat",
    description: "Humbucker-ready body. Stage-cut access.",
  },
  "V-Wing": {
    value: "V-Wing",
    description: "Asymmetric V-cut. Maximum upper-fret access.",
  },
};

const neckEnLabels: Record<string, string> = {
  "1": "Maple 6-in-line",
  "2": "Sharkfin pointed",
};

const upcomingEn: Record<string, string> = {
  Fingerboard: "Fingerboard",
  Pickups: "Pickups",
  Bridge: "Bridge",
  "Scale Length": "Scale Length",
  Strings: "Strings",
  Others: "Others",
};

export function localizeSpecLabel(label: string, locale: Locale): string {
  const key = specLabelKeys[label];
  return key ? getMessage(locale, key) : label;
}

export function localizeColor(color: ProductColor, locale: Locale): string {
  return getMessage(locale, `colors.${color}` as MessageKey);
}

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const zh = zhContent.products[product.id];
  if (!zh) return product;

  const specs: ProductSpec[] = product.specs.map((spec) => ({
    label: localizeSpecLabel(spec.label, locale),
    value: zh.specValues?.[spec.label] ?? spec.value,
  }));

  return {
    ...product,
    tagline: zh.tagline ?? product.tagline,
    description: zh.description ?? product.description,
    highlights: zh.highlights ?? product.highlights,
    specs,
  };
}

export function localizeCategory(
  info: CategoryInfo,
  locale: Locale,
): CategoryInfo {
  if (locale === "en") return info;
  const zh = zhContent.categories[info.slug];
  if (!zh) return info;
  return {
    ...info,
    name: zh.name ?? info.name,
    description: zh.description ?? info.description,
  };
}

export function localizeGuitarBodyValue(value: string, locale: Locale): string {
  if (locale === "en") return bodyEnLabels[value]?.value ?? value;
  return (
    (zhContent.configure.body as Record<string, { value: string }>)[value]
      ?.value ?? value
  );
}

export function localizeGuitarBodyDescription(
  value: string,
  locale: Locale,
): string {
  if (locale === "en") return bodyEnLabels[value]?.description ?? value;
  return (
    (zhContent.configure.body as Record<string, { description: string }>)[
      value
    ]?.description ?? value
  );
}

export function localizeGuitarColorLabel(id: string, locale: Locale): string {
  const keyMap: Record<string, MessageKey> = {
    sunburst: "colors.sunburst",
    white: "colors.white",
    black: "colors.black",
    red: "colors.red",
    purple: "colors.purple",
    "light-blue": "colors.lightBlue",
  };
  const key = keyMap[id];
  return key ? getMessage(locale, key) : id;
}

export function localizeGuitarNeckValue(id: string, locale: Locale): string {
  if (locale === "en") return neckEnLabels[id] ?? id;
  return (
    zhContent.configure.neck[id as "1" | "2"]?.value ?? neckEnLabels[id] ?? id
  );
}

export function localizeUpcomingStep(step: string, locale: Locale): string {
  if (locale === "en") return upcomingEn[step] ?? step;
  return (
    (zhContent.configure.upcoming as Record<string, string>)[step] ?? step
  );
}

export function getLocalizedCategoryLabel(
  category: ProductCategoryLike,
  locale: Locale,
): string {
  return getMessage(locale, `categories.${category}` as MessageKey);
}

type ProductCategoryLike = "guitars" | "amps" | "speakers" | "lifestyle";
