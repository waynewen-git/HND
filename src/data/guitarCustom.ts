export const guitarBodyOptions = [
  {
    id: "1",
    value: "Classic S-Style",
    description: "Balanced double-cut. Versatile stage geometry.",
    pocketX: 394,
    pocketY: 278,
  },
  {
    id: "2",
    value: "Faceted Custom",
    description: "Angular planes. Aggressive modern silhouette.",
    pocketX: 426,
    pocketY: 288,
  },
  {
    id: "3",
    value: "Superstrat",
    description: "Humbucker-ready body. Stage-cut access.",
    pocketX: 397,
    pocketY: 230,
  },
  {
    id: "4",
    value: "V-Wing",
    description: "Asymmetric V-cut. Maximum upper-fret access.",
    pocketX: 482,
    pocketY: 168,
  },
] as const;

/** File suffix in custom-{body}-{n}.png */
export const guitarBodyColorOptions = [
  {
    id: "sunburst",
    file: "6",
    label: "Sunburst",
    swatch:
      "linear-gradient(145deg, #f4c978 0%, #c8862a 38%, #6b3a12 68%, #1a1008 100%)",
  },
  {
    id: "white",
    file: "2",
    label: "White",
    swatch: "#ececeb",
  },
  {
    id: "black",
    file: "1",
    label: "Black",
    swatch: "#141413",
  },
  {
    id: "red",
    file: "3",
    label: "Red",
    swatch: "#c41e3a",
  },
  {
    id: "purple",
    file: "5",
    label: "Purple",
    swatch: "#7c5295",
  },
  {
    id: "light-blue",
    file: "4",
    label: "Light Blue",
    swatch: "#9ecae8",
  },
] as const;

export const guitarNeckOptions = [
  {
    id: "1",
    value: "Maple 6-in-line",
    image: "/images/custom/head-neck-1.png",
    native: 1000,
    heelX: 486,
    heelY: 987,
  },
  {
    id: "2",
    value: "Sharkfin pointed",
    image: "/images/custom/head-neck-2.png",
    native: 1000,
    heelX: 473,
    heelY: 973,
  },
] as const;

export type GuitarBodyColorId = (typeof guitarBodyColorOptions)[number]["id"];
export type GuitarNeckId = (typeof guitarNeckOptions)[number]["id"];

/** Composite stage in body-pixel space (body is 880×880). */
export const GUITAR_STAGE = {
  width: 880,
  height: 1640,
  extra: 760,
  body: 880,
} as const;

export const guitarCustomUpcoming = [
  "Fingerboard",
  "Pickups",
  "Bridge",
  "Scale Length",
  "Strings",
  "Others",
] as const;

export type GuitarSelections = {
  body: string;
  color: GuitarBodyColorId;
  neck: GuitarNeckId;
};

export function guitarBodyOption(value: string) {
  return (
    guitarBodyOptions.find((o) => o.value === value) ?? guitarBodyOptions[0]
  );
}

export function guitarColorOption(id: GuitarBodyColorId) {
  return (
    guitarBodyColorOptions.find((o) => o.id === id) ?? guitarBodyColorOptions[2]
  );
}

export function guitarNeckOption(id: GuitarNeckId) {
  return guitarNeckOptions.find((o) => o.id === id) ?? guitarNeckOptions[0];
}

/** `public/images/custom/custom-{body}-{color}.png` */
export function guitarPreviewImage(
  bodyValue: string,
  colorId: GuitarBodyColorId,
) {
  const body = guitarBodyOption(bodyValue);
  const color = guitarColorOption(colorId);
  return `/images/custom/custom-${body.id}-${color.file}.png`;
}

export function schematicLayers(selections: GuitarSelections): string[] {
  return [
    guitarNeckOption(selections.neck).image,
    guitarPreviewImage(selections.body, selections.color),
  ];
}

export function defaultGuitarSelections(): GuitarSelections {
  return {
    body: guitarBodyOptions[0].value,
    color: "black",
    neck: "1",
  };
}
