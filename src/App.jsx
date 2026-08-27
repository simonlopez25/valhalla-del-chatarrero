import { useState } from 'react';
import ProductsView from './components/ProductsView';
import UsersView from './components/UsersView';
import './style/App.css';

export default function App() {
  const [view] = useState('products');

  return (
    <div className="scrap-app">
      <main className="scrap-main">
        {view === 'products' ? <ProductsView /> : <UsersView />}
      </main>
    </div>
  );
}
