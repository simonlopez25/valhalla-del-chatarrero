import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'PORTAL', short: 'INICIO' },
  { path: '/sellersPage', label: 'EQUIPO', short: 'EQUIPO' },
  { path: '/history', label: 'HISTORIA', short: 'HISTORIA' },
  { path: '/showcase', label: 'TIENDA', short: 'TIENDA' },
  { path: '/users', label: 'USUARIOS', short: 'USUARIOS' },
];

export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navList">
        {navItems.map((item) => (
          <li key={item.path} className="navItem">
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
            >
              <span className="navLabel">{item.label}</span>
              <span className="navShort">{item.short}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}