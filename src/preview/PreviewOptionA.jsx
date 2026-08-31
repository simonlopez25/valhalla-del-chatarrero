import { useState } from 'react';
import ProductModal from '../components/ProductModal/ProductModal.jsx';
import './PreviewOptionA.css';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Auriculares Bluetooth', price: 29.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
  { id: 2, title: 'Smartwatch', price: 49.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
  { id: 3, title: 'Cámara Deportiva', price: 39.99, image: 'https://i.imgur.com/ZANVnHE.jpeg' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="preview-navbar">
      <div className="preview-navbar-inner">
        <div className="preview-logo">Platzi Store</div>
        <nav className="preview-nav">
          <a href="#">Productos</a>
          <button className="preview-btn-new" onClick={() => setOpen(true)}>
            + Nuevo producto
          </button>
        </nav>
      </div>
      <ProductModal isOpen={open} onClose={() => setOpen(false)} />
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

export default function PreviewOptionA() {
  return (
    <div className="preview-page">
      <Navbar />
      <main className="preview-content">
        <h1>Productos</h1>
        <div className="preview-grid">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
