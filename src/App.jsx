import { useState } from 'react';
import ProductsView from './components/ProductsView';
import UsersView from './components/UsersView';
import './style/App.css';

export default function App() {
  const [view, setView] = useState('products');

  return (
    <div className="scrap-app">
      <header className="scrap-navbar">
        <div className="scrap-brand">
          <img src="https://i.imgur.com/skull-emblem.png" alt="Emblema" />
          <span>VALHALLA DEL CHATARRERO</span>
        </div>
        <nav>
          <button className={`scrap-nav__item ${view === 'products' ? 'scrap-nav__item--active' : ''}`} onClick={() => setView('products')}>
            VITRINA
          </button>
          <button className={`scrap-nav__item ${view === 'users' ? 'scrap-nav__item--active' : ''}`} onClick={() => setView('users')}>
            USUARIOS
          </button>
        </nav>
        <div className="scrap-nav-actions">
          <button className="scrap-button scrap-button--ghost">Buscar</button>
          <button className="scrap-button scrap-button--ghost">Carrito</button>
        </div>
      </header>

      <main className="scrap-main">
        {view === 'products' ? <ProductsView /> : <UsersView />}
      </main>

      <footer className="scrap-footer">
        <p>© 2024 VALHALLA DEL CHATARRERO - PROTOCOLO DE SUPERVIVENCIA ACTIVADO</p>
        <div className="scrap-footer__links">
          <a href="#">Términos de Chatarra</a>
          <a href="#">Privacidad del Páramo</a>
          <a href="#">Soporte Técnico</a>
        </div>
      </footer>
    </div>
  );
}
