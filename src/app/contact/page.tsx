"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-12 md:pt-14">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">{t("contact.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          {t("contact.intro")}
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-bebas text-xl">{t("contact.email")}</h2>
              <p className="mt-2 text-hnd-gray-500">support@hndmusic.com</p>
            </div>
            <div>
              <h2 className="font-bebas text-xl">
                {t("contact.generalInquiries")}
              </h2>
              <p className="mt-2 text-hnd-gray-500">info@hndmusic.com</p>
            </div>
            <div>
              <h2 className="font-bebas text-xl">{t("contact.hours")}</h2>
              <p className="mt-2 text-hnd-gray-500">{t("contact.hoursValue")}</p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-sm border border-hnd-gray-300/20 p-12 text-center dark:border-hnd-gray-700/50">
              <h2 className="font-bebas text-2xl">{t("contact.messageSent")}</h2>
              <p className="mt-4 text-hnd-gray-500">
                {t("contact.thankYouMessage")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder={t("contact.name")}
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <input
                required
                type="email"
                placeholder={t("contact.email")}
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <input
                placeholder={t("contact.subject")}
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <textarea
                required
                rows={5}
                placeholder={t("contact.message")}
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <Button type="submit" size="lg" className="w-full">
                {t("contact.sendMessage")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
