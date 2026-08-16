"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  if (!loggedIn) {
    return (
      <div className="pt-16 md:pt-20">
        <div className="section-padding container-max flex min-h-[60vh] flex-col items-center justify-center py-24">
          <h1 className="font-bebas text-3xl md:text-4xl">
            Account
          </h1>
          <p className="mt-4 text-hnd-gray-500">
            Sign in to view orders, saved configurations, and favorites.
          </p>
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
            />
            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-xs text-hnd-gray-500">
            Demo mode — any credentials will work
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <div className="section-padding container-max py-16 md:py-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bebas text-3xl md:text-4xl">
              My Account
            </h1>
            <p className="mt-2 text-hnd-gray-500">{email}</p>
          </div>
          <Button variant="ghost" onClick={() => setLoggedIn(false)}>
            Sign Out
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Orders",
              desc: "No orders yet. Your order history will appear here after your first purchase.",
            },
            {
              title: "Saved Configurations",
              desc: "No saved configurations. Use the configurator to build and save your custom instrument.",
            },
            {
              title: "Favorites",
              desc: "No favorites yet. Browse our shop and save products you love.",
            },
          ].map((section) => (
            <div
              key={section.title}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <h2 className="font-bebas text-xl">
                {section.title}
              </h2>
              <p className="mt-4 text-sm text-hnd-gray-500">{section.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
