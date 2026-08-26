import { Navbar } from '../Navbar/Navbar';
import { WeatherWidget } from '../WeatherWidget/WeatherWidget';
import logoType from '../../assets/img/logoType.png';
import './Header.css';

export function Header() {
  return (
    <header className="headerContainer">
      <div className="brandSection">
        <img src={logoType} alt="Valhalla Logo" className="brandLogo" />
        <span className="brandTitle">VALHALLA DEL CHATARRERO</span>
      </div>

      <Navbar />

      <div className="actionsSection">
        <WeatherWidget />
        <button className="userButton" aria-label="User Profile">
          <svg className="userIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;