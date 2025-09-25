const features = [
  {
    title: "Verified Listings",
    description:
      "Every home undergoes a multi-point verification to ensure authentic details and pricing.",
  },
  {
    title: "Market Insights",
    description:
      "Stay ahead with data-driven analytics, neighborhood trends, and investment opportunities.",
  },
  {
    title: "Concierge Support",
    description:
      "Dedicated property specialists provide end-to-end guidance for buyers, sellers, and investors.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-card sm:p-10">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-slate-900">
            Why SquareFeet?
          </h2>
          <p className="text-slate-600">
            Built for modern real estate teams, investors, and homeowners to
            collaborate effortlessly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-100 p-6 transition hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                <span className="text-lg font-semibold">•</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
