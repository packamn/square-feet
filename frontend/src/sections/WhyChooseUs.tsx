const features = [
  {
    title: 'Family owned',
    description:
      'We are a fully family-owned business with each one of us heading a different department of the business.',
  },
  {
    title: 'Curated inventory',
    description:
      'All the properties listed here are either owned by us or are fully vetted by us, thereby eliminating the headache of unverified listings and online scams.',
  },
  {
    title: 'Partner network',
    description:
      'Financing, inspections, repairs, construction, material supply and legal—our vetted partners keep transactions effortless and transparent.',
  },
]

const WhyChooseUs = () => {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-card sm:p-10">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold text-slate-900">Why work with us?</h2>
          <p className="text-slate-600">
            Purpose-built for NRIs looking to buy vetted properties in Hyderabad.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-100 p-6 transition hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                <span className="text-lg font-semibold">•</span>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
