"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-display text-4xl font-bold md:text-6xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Have a question or need assistance? Reach out and our team will respond
          within 24 hours.
        </p>
      </section>

      <section className="section-padding container-max pb-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold">Email</h2>
              <p className="mt-2 text-hnd-gray-500">support@hndmusic.com</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">General Inquiries</h2>
              <p className="mt-2 text-hnd-gray-500">info@hndmusic.com</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Hours</h2>
              <p className="mt-2 text-hnd-gray-500">
                Monday – Friday, 9:00 AM – 6:00 PM (PST)
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-sm border border-hnd-gray-300/20 p-12 text-center dark:border-hnd-gray-700/50">
              <h2 className="font-display text-2xl font-bold">
                Message Sent
              </h2>
              <p className="mt-4 text-hnd-gray-500">
                Thank you for reaching out. We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Name"
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <input
                placeholder="Subject"
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <textarea
                required
                rows={5}
                placeholder="Message"
                className="w-full rounded-sm border border-hnd-gray-300 bg-transparent px-4 py-3 text-sm dark:border-hnd-gray-700"
              />
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
