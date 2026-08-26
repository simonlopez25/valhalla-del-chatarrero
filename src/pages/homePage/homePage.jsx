import HeroSection from '../../components/heroSection/heroSection';
import FeaturedCarousel from '../../components/featuredCarousel/featuredCarousel';
import SystemLog from '../../components/systemLog/systemLog';
import './homePage.css';

const HomePage = () => {
  return (
    <div className="homeContainer">
      <HeroSection />
      <FeaturedCarousel />
      <SystemLog />
    </div>
  );
};

export default HomePage;