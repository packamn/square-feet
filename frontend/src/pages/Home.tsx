import FeaturedProperties from '../sections/FeaturedProperties'
import HeroSection from '../sections/HeroSection'
import WhyChooseUs from '../sections/WhyChooseUs'

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </div>
  )
}

export default Home
