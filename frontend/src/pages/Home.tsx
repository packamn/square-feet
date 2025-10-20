import FeaturedProperties from '../sections/FeaturedProperties'
import HeroSection from '../sections/HeroSection'
import WhyChooseUs from '../sections/WhyChooseUs'
import Testimonials from '../sections/Testimonials'
import TeamSection from '../sections/TeamSection'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const Home = () => {
  usePageMetadata({
    title: 'Squarefeet · Vetted Residential Plots in Hyderabad',
    description: 'Buy fully verified residential plots in Hyderabad, India. Purpose-built for NRIs with legal vetting, remote registration, and in-house construction services.',
  })

  return (
    <motion.div
      className="flex flex-col gap-16 pb-16 sm:gap-20 sm:pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </motion.section>
      <motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FeaturedProperties />
      </motion.section>
      <motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <WhyChooseUs />
      </motion.section>
      <motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </motion.section>
      <motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <TeamSection />
      </motion.section>
    </motion.div>
  )
}

export default Home
