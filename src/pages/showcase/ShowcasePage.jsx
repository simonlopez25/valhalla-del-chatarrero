import { useState, useEffect, useMemo } from 'react';
import { getVisibleProducts, productPrice } from '../../services/productsService';
import ShowcaseFilter from '../../components/showcaseFilter/ShowcaseFilter';
import ShowcaseCard from '../../components/showcaseCard/ShowcaseCard';
import ShowcasePagination from '../../components/showcasePagination/ShowcasePagination';
import ProductModal from '../../components/ProductModal/index.js';
import './ShowcasePage.css';

const itemsPerPage = 20;
const allCategories = '';

export default function ShowcasePage() {
  const [items, setItems] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(allCategories);
  const [lastCategoryId, setLastCategoryId] = useState(allCategories);
  const [sort, setSort] = useState('price-asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      activeCategoryId === allCategories
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

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading && !items.length) {
    return <div className="showcaseState">Cargando vitrina...</div>;
  }

  if (error && !items.length) {
    return (
      <div className="showcaseState showcaseState--error">
        Error al cargar: {error.message}
      </div>
    );
  }

  return (
    <div className="showcasePage">
      <header className="showcaseHeader">
        <div>
          <p className="showcaseKicker">MERCADO SCAVENGER // TRANSMISIÓN 07</p>
          <h1>VITRINA DEL CHATARRERO</h1>
          <p>
            Componentes vitales recuperados de la ruina del viejo mundo. Chips fritos, cables
            pelados y pantallas rajadas. Todo se vende &quot;tal cual&quot;.
          </p>
        </div>
        <div className="showcaseHeaderActions">
          <button type="button" className="showcaseCreateButton" onClick={() => setIsModalOpen(true)}>
            NUEVO PRODUCTO
          </button>
        </div>
      </header>

      <ShowcaseFilter
        categories={categories}
        activeCategoryId={activeCategoryId}
        sort={sort}
        onCategoryChange={setActiveCategoryId}
        onSortChange={setSort}
      />

      <div className="showcaseGrid">
        {pageItems.map((item) => (
          <ShowcaseCard key={item.id} item={item} />
        ))}
      </div>

      <ShowcasePagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
