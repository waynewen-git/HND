"use client";

import { useLocale } from "@/components/providers/LocaleProvider";

export default function AboutPage() {
  const { t } = useLocale();

  const values = [
    {
      title: t("about.precision"),
      desc: t("about.precisionDesc"),
    },
    {
      title: t("about.passion"),
      desc: t("about.passionDesc"),
    },
    {
      title: t("about.innovation"),
      desc: t("about.innovationDesc"),
    },
  ];

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("about.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("about.slogan")}
        </p>
      </section>

      <section className="bg-hnd-white dark:bg-transparent">
        <div className="section-padding container-max py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="label-condensed text-hnd-red">{t("about.theName")}</p>
            <h2 className="mt-3 font-bebas text-3xl tracking-tight md:text-4xl">
              {t("about.hopeAndDream")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-hnd-gray-500">
              {t("about.nameP1")}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-hnd-gray-500">
              {t("about.nameP2")}
            </p>
            <p className="mt-8 font-ui text-sm tracking-[0.14em] text-hnd-gray-700 uppercase dark:text-hnd-gray-300">
              {t("about.attitude")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding container-max py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-hnd-gray-500">
          <p>{t("about.bodyP1")}</p>
          <p>{t("about.bodyP2")}</p>
          <p>{t("about.bodyP3")}</p>
        </div>
      </section>

      <section className="section-padding container-max py-16 md:pb-24">
        <h2 className="font-bebas text-3xl md:text-4xl">{t("about.values")}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <h3 className="font-bebas text-xl">{v.title}</h3>
              <p className="mt-4 text-hnd-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
