import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { categories } from "@/data/categories";

const columns = [
  {
    title: "Information",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/track-order" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Shop By",
    links: categories
      .slice(0, 4)
      .map((c) => ({ label: c.name, href: `/category/${c.slug}` })),
  },
  {
    title: "Support",
    links: [
      { label: "Support Center", href: "/contact" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Return Policy", href: "/returns" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Consumer Policy",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Happy Return", href: "/returns" },
      { label: "Cancellation", href: "/cancellation" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/8 bg-white">
      <div className="container-rizq grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
        {/* Logo & About */}
        <div className="col-span-2">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Rizq Foods"
              width={400}
              height={100}
              className="mb-npm i h-24 w-auto cursor-pointer"
            />
          </Link>

          <p className="mb-5 max-w-xs text-sm text-stone-dark">
            Premium, natural grocery essentials delivered to families across
            Bangladesh — honey, dates, oils and ghee, sourced with care.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5F0] text-[#555555] transition-all duration-300 hover:bg-[#F68B1F] hover:text-white hover:scale-110"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5F0] text-[#555555] transition-all duration-300 hover:bg-[#F68B1F] hover:text-white hover:scale-110"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5F0] text-[#555555] transition-all duration-300 hover:bg-[#F68B1F] hover:text-white hover:scale-110"
            >
              <FaWhatsapp size={18} />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold text-ink">
              {col.title}
            </h3>

            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-ring text-sm text-stone-dark transition-colors duration-300 hover:text-saffron-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-ink/8 py-5">
        <div className="container-rizq flex flex-col items-center justify-between gap-3 text-xs text-stone-dark md:flex-row">
          <p>
            © {new Date().getFullYear()} Rizq Foods. All rights reserved. Developed by{" "}
            <a
              href="https://codestacksolutions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-medium text-saffron-deep transition-colors hover:text-ink"
            >
              CodeStack Solutions
            </a>
            .
          </p>

          <Image
            src="/images/payment.png"
            alt="Payment Methods"
            width={400}
            height={140}
            className="h-20 w-auto"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
