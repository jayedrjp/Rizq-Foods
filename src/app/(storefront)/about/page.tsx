import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import BrandSlider from "@/components/home/BrandSlider";

const values = [
  {
    title: "Sourced with Care",
    text: "We work directly with growers and small producers to bring authentic, seasonal provisions to your door.",
  },
  {
    title: "Nothing Hidden",
    text: "Every product is quality-checked before it reaches our shelves — no additives, no shortcuts.",
  },
  {
    title: "Built for Families",
    text: "From everyday cooking oils to festive gifting boxes, Rizq Foods is stocked for every kitchen occasion.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="bg-saffron-light">
        <div className="container-rizq flex flex-col items-center gap-4 py-16 text-center md:py-24">
          <p className="eyebrow flex items-center gap-2">
            <span className="rizq-drop" aria-hidden="true" />
            Our story
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-semibold text-ink md:text-5xl">
            Provision, the way it used to taste
          </h1>
          <p className="max-w-xl text-sm text-ink/70 md:text-base">
            Rizq Foods began with a simple idea: bring the honest, natural flavours of home —
            honey, dates, ghee, oil — to families across Bangladesh, without compromise.
          </p>
        </div>
      </div>

      <div className="container-rizq py-14 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-stone">
            <Image
              src="https://placehold.co/900x700/F0EDE6/22201B?text=Rizq+Foods+Kitchen"
              alt="Rizq Foods provisions"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-ink md:text-3xl">
              Why we started
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-ink/75">
              Too many pantry staples on the market today are diluted, over-processed, or shipped
              from unknown sources. We wanted something simpler — a place where every jar of honey,
              every litre of mustard oil, and every box of dates could be trusted.
            </p>
            <p className="text-sm leading-relaxed text-ink/75">
              Today, Rizq Foods works with trusted farms and small producers across Bangladesh to
              bring that same trust to thousands of homes.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="What guides us" title="Our Values" align="center" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl2 border border-ink/8 bg-white p-6">
                <span className="rizq-drop-lg mb-4 inline-block" aria-hidden="true" />
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="text-sm text-stone-dark">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Trusted partners" title="Brands We Work With" align="center" />
          <BrandSlider />
        </div>
      </div>
    </div>
  );
}
