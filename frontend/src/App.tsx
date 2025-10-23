import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AppRoutes from './routes/AppRoutes'
import HeroSection from './sections/HeroSection'
import FeaturedProperties from './sections/FeaturedProperties'
import WhyChooseUs from './sections/WhyChooseUs'
import Testimonials from './sections/Testimonials'
import TeamSection from './sections/TeamSection'

const LandingContent = () => (
  <div className="space-y-16">
    <HeroSection />
    <FeaturedProperties />
    <WhyChooseUs />
    <Testimonials />
    <TeamSection />
    <section className="rounded-3xl bg-gradient-to-r from-brand-500 via-brand-500/90 to-brand-600 p-10 text-white shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-2">
          <h3 className="font-display text-2xl font-semibold">Ready to tour your next property?</h3>
          <p className="text-sm text-white/80">
            Secure a personalized strategy session with a SquareFeet advisor. We’ll align inventory, timelines, and financing in a single call.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-slate-100"
        >
          Book a consultation
        </a>
      </div>
    </section>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes LandingOverride={LandingContent} />
    </BrowserRouter>
  )
}

export default App
