import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const supportCards = [
  {
    title: 'Personalized tours',
    description: 'Virtual and in-person walkthroughs guided by local experts tailored to your schedule.',
  },
  {
    title: 'Investment insights',
    description: 'Live market data, valuation forecasts, and rental projections built into every listing.',
  },
  {
    title: 'Concierge closing',
    description: 'Dedicated advisors orchestrate financing, inspections, and closing logistics end-to-end.',
  },
]

const HeroSection = () => {
  return (
    <section className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600 shadow-sm"
        >
          Elevated buying & selling journeys
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]"
        >
          Discover the properties that move your life forward
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-600 md:max-w-xl"
        >
          SquareFeet blends curated inventory, real-time analytics, and concierge-grade service so every buyer, seller, and
          investor feels confident from discovery to closing day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 hover:shadow-xl"
          >
            Browse listings
          </Link>
          <Link
            to="/sell"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600"
          >
            Request valuation
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {supportCards.map((card, index) => (
            <motion.li
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.35 }}
              className="hover-lift rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-brand-500">{card.title}</p>
              <p className="mt-2 text-sm text-slate-500">{card.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative h-[420px] overflow-hidden rounded-[32px] bg-slate-900 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)]"
      >
        <img
          src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80"
          alt="Luxury property"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/45 to-slate-900/10" />

        <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3 rounded-3xl bg-white/10 p-6 text-white backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/70">Featured listing</p>
              <h3 className="font-display text-2xl font-semibold">Pinnacle Collection</h3>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Virtual tour ready</span>
          </div>
          <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <p>5 Bed · 4.5 Bath · 5,200 sq.ft · Austin, TX</p>
            <p>$2,980,000 · Smart automation · Private rooftop lounge</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
