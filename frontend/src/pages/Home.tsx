import FeaturedProperties from '../sections/FeaturedProperties'
import HeroSection from '../sections/HeroSection'
import WhyChooseUs from '../sections/WhyChooseUs'
import { usePageMetadata } from '../hooks/usePageMetadata'

const Home = () => {
  usePageMetadata({
    title: 'SquareFeet · Real Estate Platform',
    description: 'Browse curated properties, manage listings, and coordinate approvals with the SquareFeet real estate platform.',
  })

  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </div>
  )
}

export default Home
