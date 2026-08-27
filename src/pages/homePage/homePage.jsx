import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedCarousel from '../../components/FeaturedCarousel/FeaturedCarousel';
import SystemLog from '../../components/SystemLog/SystemLog';
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