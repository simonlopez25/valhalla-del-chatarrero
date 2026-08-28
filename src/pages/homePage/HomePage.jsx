import HeroSection from '../../components/heroSection/HeroSection';
import FeaturedCarousel from '../../components/featuredCarousel/FeaturedCarousel';
import SystemLog from '../../components/systemLog/SystemLog';
import './HomePage.css';

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