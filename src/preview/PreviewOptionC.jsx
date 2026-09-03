import { useState } from 'react';
import ProductModal from '../components/Organisms/ProductModal/ProductModal.jsx';
import './PreviewOptionC.css';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Auriculares Bluetooth', price: 29.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
  { id: 2, title: 'Smartwatch', price: 49.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
  { id: 3, title: 'Cámara Deportiva', price: 39.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
];

function NavbarWithButton({ onOpen }) {
  return (
    <header className="preview-navbar">
      <div className="preview-navbar-inner">
        <div className="preview-logo">Platzi Store</div>
        <nav className="preview-nav">
          <a href="#">Productos</a>
          <button className="preview-btn-new" onClick={onOpen}>
            + Nuevo producto
          </button>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  return (
    <article className="preview-card">
      <div className="preview-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="preview-card-body">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </article>
  );
}

function ProductList({ onOpen }) {
  return (
    <main className="preview-content">
      <div className="preview-toolbar">
        <h1>Productos</h1>
        <button className="preview-btn-new" onClick={onOpen}>
          + Nuevo producto
        </button>
      </div>
      <div className="preview-grid">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default function PreviewOptionC() {
  const [open, setOpen] = useState(false);

  return (
    <div className="preview-page">
      <NavbarWithButton onOpen={() => setOpen(true)} />
      <ProductList onOpen={() => setOpen(true)} />
      <ProductModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
