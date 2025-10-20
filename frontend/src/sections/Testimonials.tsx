import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Venkateshwarlu uncle is very knowledgeable, friendly and cared about our specific needs. Uncle and his team have helped us with the construction of our family home in Nagole, Hyderabad and also the purchase of another residential plot for investment. I highly recommend their services.',
    name: 'Karunakar Vanguru',
    role: 'IT Professional – Raleigh, NC',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'I\'ve worked with the Squarefeet team on multiple occasions. They are very approachable and trustworthy and always pay attention to detail. Will definitely be my first choice for any real estate or construction needs. It\'s my pleasure to recommend them.',
    name: 'Sundeep Kumar Ch',
    role: 'Data Architect – Antioch, CA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
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
              <p className="text-xl leading-relaxed text-slate-700 sm:text-2xl">"{testimonial.quote}"</p>
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
