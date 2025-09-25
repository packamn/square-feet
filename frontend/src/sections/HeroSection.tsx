import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700"
        >
          Luxury homes, smart investments
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Discover your next dream property with SquareFeet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-slate-600"
        >
          Explore curated listings across premier locations, access real-time
          market insights, and manage your investment portfolio with ease.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:shadow-xl hover:shadow-brand-500/35"
          >
            Browse Properties
          </Link>
          <Link
            to="/sell"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600"
          >
            List Your Property
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative h-[360px] overflow-hidden rounded-3xl bg-slate-900 shadow-card md:h-[420px]"
      >
        <img
          src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury property"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">
                Featured Listing
              </p>
              <h3 className="font-display text-2xl font-semibold">
                Skyline Residences
              </h3>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              New
            </span>
          </div>
          <p className="text-sm text-white/80">
            4 Bed · 3 Bath · 4,120 sq.ft · San Francisco, CA · $3,650,000
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
