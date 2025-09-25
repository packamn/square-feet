import FeaturedProperties from '../sections/FeaturedProperties'
import HeroSection from '../sections/HeroSection'
import WhyChooseUs from '../sections/WhyChooseUs'
import SearchBar from '../components/SearchBar'

const Home = () => {
  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <WhyChooseUs />
    </div>
  )
}

export default Home
