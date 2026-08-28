import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'PORTAL' },
  { path: '/sellersPage', label: 'EQUIPO' },
  { path: '/history', label: 'HISTORIA' },
  { path: '/showcase', label: 'TIENDA' },
  { path: '/users', label: 'USUARIOS' },
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
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}