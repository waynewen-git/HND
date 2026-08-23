"use client";

import { useCallback, useMemo } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/i18n/dictionaries";
import {
  formatLocalizedPrice,
  getLocalizedCategoryLabel,
  localizeCategory,
  localizeColor,
  localizeGuitarBodyValue,
  localizeGuitarColorLabel,
  localizeGuitarNeckValue,
  localizeProduct,
  localizeSpecLabel,
  localizeUpcomingStep,
} from "@/i18n/localize";
import { zhContent } from "@/i18n/zhContent";
import type { NewsArticle } from "@/data/news";
import type {
  CategoryInfo,
  FAQItem,
  Product,
  ProductCategory,
  ProductColor,
  StoreLocation,
} from "@/types";

export interface HomeDemoContent {
  role: string;
  instrument: string;
  tagline: string;
  quote: string;
}

export function localizeFaqs(faqs: FAQItem[], locale: Locale): FAQItem[] {
  if (locale === "en") return faqs;
  return faqs.map((faq, i) => ({
    question: zhContent.faqs[i]?.question ?? faq.question,
    answer: zhContent.faqs[i]?.answer ?? faq.answer,
  }));
}

export function localizeStore(
  store: StoreLocation,
  locale: Locale,
): StoreLocation {
  if (locale === "en") return store;
  const zh = (zhContent.stores as Record<string, {
    name?: string;
    city?: string;
    country?: string;
    hours?: string;
  }>)[store.id];
  if (!zh) return store;
  return {
    ...store,
    name: zh.name ?? store.name,
    city: zh.city ?? store.city,
    country: zh.country ?? store.country,
    hours: zh.hours ?? store.hours,
  };
}

export function localizeNewsArticle(
  article: NewsArticle,
  locale: Locale,
): NewsArticle {
  if (locale === "en") return article;
  const zh = (zhContent.news as Record<string, {
    title?: string;
    excerpt?: string;
    content?: string;
  }>)[article.slug];
  if (!zh) return article;
  return {
    ...article,
    title: zh.title ?? article.title,
    excerpt: zh.excerpt ?? article.excerpt,
    content: zh.content ?? article.content,
  };
}

export function localizeHomeDemo(
  model: string,
  demo: HomeDemoContent,
  locale: Locale,
): HomeDemoContent {
  if (locale === "en") return demo;
  const zh = (zhContent.homeDemos as Record<string, {
    role?: string;
    instrument?: string;
    tagline?: string;
    quote?: string;
  }>)[model];
  if (!zh) return demo;
  return {
    role: zh.role ?? demo.role,
    instrument: zh.instrument ?? demo.instrument,
    tagline: zh.tagline ?? demo.tagline,
    quote: zh.quote ?? demo.quote,
  };
}

export function useI18n() {
  const { locale, t, setLocale, toggleLocale } = useLocale();

  const lp = useCallback(
    (product: Product) => localizeProduct(product, locale),
    [locale],
  );

  const lcat = useCallback(
    (info: CategoryInfo) => localizeCategory(info, locale),
    [locale],
  );

  const lcolor = useCallback(
    (color: ProductColor) => localizeColor(color, locale),
    [locale],
  );

  const formatPrice = useCallback(
    (price: number) => formatLocalizedPrice(price, locale),
    [locale],
  );

  const lspec = useCallback(
    (label: string) => localizeSpecLabel(label, locale),
    [locale],
  );

  const lbody = useCallback(
    (value: string) => localizeGuitarBodyValue(value, locale),
    [locale],
  );

  const lguitarColor = useCallback(
    (id: string) => localizeGuitarColorLabel(id, locale),
    [locale],
  );

  const lneck = useCallback(
    (id: string) => localizeGuitarNeckValue(id, locale),
    [locale],
  );

  const lstep = useCallback(
    (step: string) => localizeUpcomingStep(step, locale),
    [locale],
  );

  const categoryLabel = useCallback(
    (category: ProductCategory) => getLocalizedCategoryLabel(category, locale),
    [locale],
  );

  const lfaqs = useCallback(
    (items: FAQItem[]) => localizeFaqs(items, locale),
    [locale],
  );

  const lstore = useCallback(
    (store: StoreLocation) => localizeStore(store, locale),
    [locale],
  );

  const lnews = useCallback(
    (article: NewsArticle) => localizeNewsArticle(article, locale),
    [locale],
  );

  const ldemo = useCallback(
    (model: string, demo: HomeDemoContent) =>
      localizeHomeDemo(model, demo, locale),
    [locale],
  );

  return useMemo(
    () => ({
      locale,
      t,
      setLocale,
      toggleLocale,
      lp,
      lcat,
      lcolor,
      formatPrice,
      lspec,
      lbody,
      lguitarColor,
      lneck,
      lstep,
      categoryLabel,
      lfaqs,
      lstore,
      lnews,
      ldemo,
    }),
    [
      locale,
      t,
      setLocale,
      toggleLocale,
      lp,
      lcat,
      lcolor,
      formatPrice,
      lspec,
      lbody,
      lguitarColor,
      lneck,
      lstep,
      categoryLabel,
      lfaqs,
      lstore,
      lnews,
      ldemo,
    ],
  );
}
