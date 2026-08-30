import { useState, useEffect, useMemo } from 'react';
import { getVisibleProducts, productPrice } from '../../services/productsService';
import StoreFilter from '../../components/storeFilter/StoreFilter';
import StoreCard from '../../components/storeCard/Store';
import StorePagination from '../../components/storePagination/StorePagination';
import './StorePage.css';

const ITEMS_PER_PAGE = 20;
const ALL_CATEGORIES = '';

export default function StorePage() {
  const [items, setItems] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(ALL_CATEGORIES);
  const [lastCategoryId, setLastCategoryId] = useState(ALL_CATEGORIES);
  const [sort, setSort] = useState('price-asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (lastCategoryId !== activeCategoryId) {
    setLastCategoryId(activeCategoryId);
    setPage(1);
  }

  useEffect(() => {
    let ignore = false;

    getVisibleProducts()
      .then((products) => {
        if (!ignore) setItems(products);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    const byId = new Map();
    items.forEach((item) => {
      const category = item?.category;
      if (category?.id !== undefined && !byId.has(category.id)) {
        byId.set(category.id, category);
      }
    });
    return [...byId.values()].sort((a, b) =>
      String(a.name ?? '').localeCompare(String(b.name ?? ''))
    );
  }, [items]);

  const filteredItems = useMemo(
    () =>
      activeCategoryId === ALL_CATEGORIES
        ? items
        : items.filter(
            (item) => String(item?.category?.id) === String(activeCategoryId)
          ),
    [items, activeCategoryId]
  );

  const sortedItems = useMemo(() => {
    const arr = [...filteredItems];
    arr.sort((a, b) =>
      sort === 'price-desc'
        ? productPrice(b) - productPrice(a)
        : productPrice(a) - productPrice(b)
    );
    return arr;
  }, [filteredItems, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading && !items.length) {
    return <div className="storeState">Cargando vitrina...</div>;
  }

  if (error && !items.length) {
    return (
      <div className="storeState storeState--error">
        Error al cargar: {error.message}
      </div>
    );
  }

  return (
    <div className="storePage">
      <header className="storeHeader">
        <div>
          <p className="storeKicker">MERCADO SCAVENGER // TRANSMISIÓN 07</p>
          <h1>VITRINA DEL CHATARRERO</h1>
          <p>
            Componentes vitales recuperados de la ruina del viejo mundo. Chips fritos, cables
            pelados y pantallas rajadas. Todo se vende &quot;tal cual&quot;.
          </p>
        </div>
        <span className="storeCount">{sortedItems.length} ARTEFACTOS</span>
      </header>

      <StoreFilter
        categories={categories}
        activeCategoryId={activeCategoryId}
        sort={sort}
        onCategoryChange={setActiveCategoryId}
        onSortChange={setSort}
      />

      <div className="storeGrid">
        {pageItems.map((item) => (
          <StoreCard key={item.id} item={item} />
        ))}
      </div>

      <StorePagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}