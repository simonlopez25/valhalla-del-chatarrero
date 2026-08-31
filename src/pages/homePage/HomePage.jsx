import HeroSection from '../../components/organisms/heroSection/HeroSection';
import FeaturedCarousel from '../../components/organisms/featuredCarousel/FeaturedCarousel';
import SystemLog from '../../components/organisms/systemLog/SystemLog';
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