"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";

export default function AccountPage() {
  const { t } = useI18n();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  if (!loggedIn) {
    return (
      <div className="pt-12 md:pt-14">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24">
          <h1 className="font-bebas text-3xl md:text-4xl">{t("account.title")}</h1>
          <p className="mt-4 text-hnd-gray-500">{t("account.signInPrompt")}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoggedIn(true);
            }}
            className="mt-8 w-full max-w-sm space-y-4"
          >
            <input
              required
              type="email"
              placeholder={t("account.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
            />
            <input
              required
              type="password"
              placeholder={t("account.password")}
              className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
            />
            <Button type="submit" size="lg" className="w-full">
              {t("account.signIn")}
            </Button>
          </form>
          <p className="mt-4 text-xs text-hnd-gray-500">{t("account.demoMode")}</p>
        </div>
      </div>
    );
  }

  const sections = [
    { title: t("account.orders"), desc: t("account.ordersDesc") },
    { title: t("account.savedConfigs"), desc: t("account.savedConfigsDesc") },
    { title: t("account.favorites"), desc: t("account.favoritesDesc") },
  ];

  return (
    <div className="pt-12 md:pt-14">
      <div className="section-padding container-max py-16 md:py-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bebas text-3xl md:text-4xl">
              {t("account.myAccount")}
            </h1>
            <p className="mt-2 text-hnd-gray-500">{email}</p>
          </div>
          <Button variant="ghost" onClick={() => setLoggedIn(false)}>
            {t("account.signOut")}
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <h2 className="font-bebas text-xl">{section.title}</h2>
              <p className="mt-4 text-sm text-hnd-gray-500">{section.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
