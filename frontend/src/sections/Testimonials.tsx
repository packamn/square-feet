import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'SquareFeet helped us shortlist three properties in two days and handled every negotiation nuance. We closed in under three weeks.',
    name: 'Amelia & Jordan Chen',
    role: 'Relocating founders · Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'As a first-time investor, the data room and rental projections gave me confidence. Their team coordinated financing flawlessly.',
    name: 'Lena Kapoor',
    role: 'Private investor · Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'From staging to closing, the SquareFeet concierge and partner network delivered. We accepted an above-ask offer in 48 hours.',
    name: 'Marcus and Devon Reyes',
    role: 'Sellers · San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80',
  },
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const testimonial = testimonials[index]

  return (
    <section className="grid gap-8 rounded-3xl bg-slate-50 p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">Client stories</p>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="text-xl leading-relaxed text-slate-700 sm:text-2xl">“{testimonial.quote}”</p>
              <footer className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover shadow"
                />
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-500 transition hover:border-brand-400 hover:text-brand-500"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-500 transition hover:border-brand-400 hover:text-brand-500"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-1">
          {testimonials.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`h-2 w-2 rounded-full ${dotIndex === index ? 'bg-brand-500' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
