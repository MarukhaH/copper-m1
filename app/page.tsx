import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
} from "@/lib/copper/catalog";

// Alt text and captions for each lifestyle photo, keyed by its catalog path.
const SHOWCASE: Record<string, { alt: string; caption: string }> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    alt: "Copper Home smart speaker glowing on a shelf in a sunlit desert living room",
    caption: "Copper Home keeps the whole house in sync, even at sunset.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    alt: "Copper Notes clip-on recorder resting on a stone desk next to a notebook",
    caption: "Copper Notes turns every meeting into clear action items.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    alt: "Copper Notes clip-on recorder catching the golden-hour light outdoors",
    caption: "Take it from the lecture hall to the trailhead.",
  },
};

const CUTOUT_ALT: Record<string, string> = {
  "copper-home": "Copper Home smart speaker in Polished Copper",
  "copper-notes": "Copper Notes clip-on recorder in Brushed Copper",
};

export default function Home() {
  const products = getProducts();
  const [free, plus] = getPlans();
  const privacy = getPrivacySummary();

  const showcase = products.flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src })),
  );

  const comparison = [
    {
      label: "Memory kept",
      free: formatMemory(free.memoryDays),
      plus: formatMemory(plus.memoryDays),
    },
    {
      label: "Copper Notes recording",
      free: formatNotesHours(free.notesHoursPerMonth),
      plus: formatNotesHours(plus.notesHoursPerMonth),
    },
    {
      label: "Refined answers",
      free: free.refinedAnswers ? "Included" : "Not included",
      plus: plus.refinedAnswers ? "Included" : "Not included",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* 2. Hero */}
        <section
          id="top"
          data-testid="hero"
          className="bg-secondary text-secondary-foreground"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-4xl leading-tight font-bold md:text-5xl">
                Meet Copper: AI for your home and meetings
              </h1>
              <p className="text-xl font-medium">
                From raw ideas to refined answers.
              </p>
              <Button asChild size="lg" className="h-11 px-6 text-base">
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={CUTOUT_ALT[product.id] ?? product.name}
                  width={1254}
                  height={1254}
                  sizes="(min-width: 768px) 25vw, 45vw"
                  priority
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Products */}
        <section id="products" data-testid="products" className="scroll-mt-24">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-8 text-3xl font-bold">Meet the products</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <article
                  key={product.id}
                  data-testid="product-card"
                  data-product={product.id}
                  className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-6"
                >
                  <Image
                    src={product.cutout}
                    alt={CUTOUT_ALT[product.id] ?? product.name}
                    width={1254}
                    height={1254}
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="mx-auto h-auto w-full max-w-xs"
                  />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="text-primary text-2xl font-bold">
                      {formatUsd(product.priceUsd)}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{product.type}</p>
                  <ul className="flex flex-col gap-2">
                    {product.features.map((feature) => (
                      <li key={feature.name}>
                        <span className="font-semibold">{feature.name}.</span>{" "}
                        <span className="text-muted-foreground">
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Showcase */}
        <section id="showcase" data-testid="showcase" className="bg-muted">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-8 text-3xl font-bold">Made for Arizona life</h2>
            <div className="flex flex-col gap-12">
              {showcase.map(({ product, src }, index) => {
                const details = SHOWCASE[src] ?? {
                  alt: `${product.name} in everyday life`,
                  caption: product.name,
                };
                return (
                  <figure
                    key={src}
                    className="grid items-center gap-6 md:grid-cols-2"
                  >
                    <div
                      className={`relative aspect-video overflow-hidden rounded-xl ${
                        index % 2 === 1 ? "md:order-last" : ""
                      }`}
                    >
                      <Image
                        src={src}
                        alt={details.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-xl font-medium">
                      {details.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Copper Plus pricing */}
        <section id="plus" data-testid="plus-pricing" className="scroll-mt-24">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-2 text-3xl font-bold">
              Go further with Copper Plus
            </h2>
            <p className="text-muted-foreground mb-8">
              Longer memory, unlimited Notes and refined answers.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { plan: free, key: "free" as const, highlight: false },
                { plan: plus, key: "plus" as const, highlight: true },
              ].map(({ plan, key, highlight }) => (
                <div
                  key={plan.id}
                  className={`flex flex-col gap-4 rounded-xl border p-6 ${
                    highlight
                      ? "border-primary bg-primary text-primary-foreground border-2"
                      : "bg-card text-card-foreground"
                  }`}
                >
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-lg">
                    <span className="text-3xl font-bold">
                      {formatUsd(plan.monthlyUsd)}
                    </span>
                    /month
                    <span className="mx-2">·</span>
                    {formatUsd(plan.annualUsd)}/year
                  </p>
                  <dl className="flex flex-col gap-3">
                    {comparison.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-4 border-t pt-3"
                      >
                        <dt>{row.label}</dt>
                        <dd className="font-semibold">{row[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Privacy */}
        <section
          id="privacy"
          data-testid="privacy-summary"
          className="bg-accent/15 scroll-mt-24"
        >
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="mb-2 text-3xl font-bold">
              Your privacy, in plain language
            </h2>
            <p className="text-muted-foreground mb-6">
              How Copper handles your recordings under our {privacy.policy}{" "}
              policy.
            </p>
            <ul className="flex flex-col gap-3">
              {privacy.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="text-accent font-bold">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
