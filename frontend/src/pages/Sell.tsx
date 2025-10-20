const reasons = [
  {
    title: 'Concierge onboarding',
    description:
      'Professional staging, photography, and copywriting handled in days—not weeks. Your listing goes live faster, positioned to impress.',
  },
  {
    title: 'Precision pricing',
    description:
      'Live market data and AI-assisted valuations ensure you list at the sweet spot. Maximize offers without leaving money on the table.',
  },
  {
    title: 'Visibility that converts',
    description:
      'Targeted campaigns across buyer networks, relocation platforms, and investor channels. Focused attention where it matters.',
  },
]

const steps = [
  {
    title: '1. Strategy session',
    description: 'Meet your SquareFeet advisor, align on goals, timeline, and the data-backed plan for your property.',
  },
  {
    title: '2. Concierge prep',
    description: 'Staging, media, and launch materials executed by our in-house team while you stay in the loop.',
  },
  {
    title: '3. Launch & offers',
    description: 'Dynamic marketing, coordinated tours, and offer management—optimized for both speed and price.',
  },
  {
    title: '4. Close with confidence',
    description: 'Negotiations, inspections, and paperwork handled by our closing specialists and vetted partners.',
  },
]

const Sell = () => {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-r from-brand-500 via-brand-500/90 to-brand-600 p-10 text-white shadow-card">
        <div className="space-y-4 md:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">List with SquareFeet</p>
          <h1 className="font-display text-4xl font-semibold leading-tight">List with Squarefeet</h1>
          <p className="text-white/85">
            We combine premium marketing, real-time market intelligence, and a hands-on closing team. You focus on the next
            chapter—we handle every detail between.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-slate-100"
          >
            Start your listing
          </a>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-card sm:p-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-semibold text-slate-900">Your journey, managed end-to-end</h2>
            <p className="text-slate-600">
              Expert advisors, curated marketing, and seamless closing support designed to make selling effortless.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white"
              >
                <h3 className="mb-2 font-display text-lg font-semibold text-slate-900">{reason.title}</h3>
                <p className="text-sm text-slate-600">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-semibold text-slate-900">How it works</h2>
            <p className="text-slate-600">
              A focused, four-step launch plan to attract qualified buyers and secure the best possible terms.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-brand-500">{step.title}</p>
                <p className="mt-3 text-sm text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 p-10 text-white shadow-card">
        <div className="space-y-3 md:flex md:items-center md:justify-between">
          <div className="space-y-2 md:max-w-xl">
            <h3 className="font-display text-2xl font-semibold">We're ready when you are.</h3>
            <p className="text-sm text-white/80">
              Chat with a SquareFeet listing advisor to map pricing, staging, and go-live timelines in one call.
            </p>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-slate-100"
          >
            Schedule a strategy session
          </a>
        </div>
      </section>
    </div>
  )
}

export default Sell
