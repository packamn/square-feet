import FeaturedProperties from '../sections/FeaturedProperties'
import HeroSection from '../sections/HeroSection'
import WhyChooseUs from '../sections/WhyChooseUs'
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
    title: 'SquareFeet · Real Estate Platform',
    description: 'Browse curated properties, manage listings, and coordinate approvals with the SquareFeet real estate platform.',
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
    </motion.div>
  )
}

export default Home
