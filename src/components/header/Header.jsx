import { Navbar } from '../navbar/Navbar';
import { WeatherWidget } from '../weatherWidget/WeatherWidget';
import logoType from '../../assets/img/logotype.png';
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
      </div>
    </header>
  );
}

export default Header;