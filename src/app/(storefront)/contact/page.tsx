"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const contactPoints = [
  {
    title: "Call Us",
    value: "+880 1XXX-XXXXXX",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
  },
  {
    title: "Email Us",
    value: "support@rizqfoods.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    title: "Visit Us",
    value: "House 12, Road 5, Gulshan, Dhaka",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container-rizq py-8 md:py-12">
      <div className="mb-10 max-w-xl">
        <p className="eyebrow mb-2 flex items-center gap-2">
          <span className="rizq-drop" aria-hidden="true" />
          Get in touch
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Contact Us</h1>
        <p className="mt-2 text-sm text-stone-dark">
          Have a question about an order, a product, or a bulk request? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          {contactPoints.map((point) => (
            <div key={point.title} className="flex items-center gap-4 rounded-xl2 border border-ink/8 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron-light text-saffron-deep">
                {point.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{point.title}</p>
                <p className="text-sm text-stone-dark">{point.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl2 border border-ink/8 bg-white p-5">
            <p className="mb-1 text-sm font-semibold text-ink">Business Hours</p>
            <p className="text-sm text-stone-dark">Saturday – Thursday, 9:00 AM – 9:00 PM</p>
          </div>
        </div>

        <div className="rounded-xl2 border border-ink/8 bg-white p-6 md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="rizq-drop-lg" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold text-ink">Message sent</h2>
              <p className="text-sm text-stone-dark">We&apos;ll get back to you within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Name
                  <input
                    required
                    type="text"
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Phone
                  <input
                    type="tel"
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Email
                <input
                  required
                  type="email"
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Message
                <textarea
                  required
                  rows={5}
                  className="focus-ring resize-none rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                />
              </label>
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-fit">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
