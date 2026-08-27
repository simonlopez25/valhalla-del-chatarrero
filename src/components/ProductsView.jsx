import { useState, useEffect, useRef } from 'react';
import { useProducts } from '../hooks/useProducts';
import { getCategories } from '../services/productsService';
import './ProductsView.css';

const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60';
const ITEMS_PER_PAGE = 20;
const MIN_DESCRIPTION_LENGTH = 3;
const ELECTRONICS_CATEGORY_IMAGE = 'https://i.imgur.com/ZANVnHE.jpeg';

const getProductImage = (item) => {
  const images = item?.images ?? [];
  const validImages = images.filter((image) => {
    if (typeof image !== 'string' || image.trim().length === 0) return false;
    if (image.includes('placehold.co')) return false;
    if (image.includes('placeimg.com')) return false;
    if (image.includes('pravatar.cc')) return false;
    if (image.includes('api.escuelajs.co/api/v1/files/')) return false;
    return true;
  });

  const nonCategoryImages = validImages.filter((image) => image !== ELECTRONICS_CATEGORY_IMAGE);
  const firstImage = nonCategoryImages[0] ?? validImages[0];

  if (firstImage) {
    return firstImage;
  }

  const productId = Number(item?.id);
  return `https://picsum.photos/seed/${productId}/600/600`;
};

const ProductImage = ({ src, alt, fallbackSrc }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    setCurrentSrc(src);
    setIsLoaded(false);
    img.src = src;
  }, [src]);

  const handleLoad = () => setIsLoaded(true);

  const handleError = () => {
    setCurrentSrc((prev) => (prev !== fallbackSrc ? fallbackSrc : prev));
    setIsLoaded(false);
  };

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    img.src = currentSrc;
  }, [currentSrc]);

  return (
    <>
      {!isLoaded && <div className="scrap-card__placeholder">...</div>}
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};

const isValidDescription = (text) =>
  typeof text === 'string' &&
  text.trim().length > MIN_DESCRIPTION_LENGTH &&
  /\b[a-zA-Z]{3,}\b/.test(text) &&
  !/^[a-z0-9]+(-[a-f0-9-]+)?$/i.test(text);

const resolveDescription = (rawDescription, items, currentItem) => {
  if (isValidDescription(rawDescription)) {
    return rawDescription;
  }

  const sameTitle = items.find(
    (other) => other?.id !== currentItem?.id && other?.title === currentItem?.title
  );

  if (isValidDescription(sameTitle?.description)) {
    return sameTitle.description;
  }

  return items[0]?.description ?? 'Sin datos de registro.';
};

const ProductCard = ({ item, onEdit, onDelete }) => {
  const title = item?.title ?? 'Artefacto desconocido';
  const price = item?.price ?? 0;
  const src = getProductImage(item);
  const description = resolveDescription(item?.description ?? '', item._allItems || [], item);

  return (
    <div className="scrap-card" key={item.id}>
      <span className="scrap-badge">ESTADO_DESCONOCIDO</span>

      <div className="scrap-card__media">
        <ProductImage
          src={src}
          alt={title}
          fallbackSrc={DEFAULT_PRODUCT_IMAGE}
        />
      </div>

      <div className="scrap-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="scrap-card__footer">
        <span className="scrap-price">${price}</span>
        <div className="scrap-card__actions">
          <button className="scrap-button scrap-button--ghost" onClick={() => onEdit(item)}>Editar</button>
          <button className="scrap-button scrap-button--danger" onClick={() => onDelete(item)}>Borrar</button>
        </div>
      </div>
    </div>
  );
};

export default function ProductsView() {
  const { items, loading, error, load, create, update, remove } = useProducts();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', images: [] });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [page, setPage] = useState(1);

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', category: '', images: [] });
    setEditing(null);
    setMessage('');
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => {
        setMessage(err.message || 'No se pudo cargar las categorías.');
      });
  }, []);

  useEffect(() => {
    const params = { limit: ITEMS_PER_PAGE, offset: (page - 1) * ITEMS_PER_PAGE };
    if (categoryId) params.categoryId = Number(categoryId);
    if (sort) params.sort = sort;

    load(params);
  }, [page, categoryId, sort, load]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: Number(form.category) || 1,
      images: form.images?.length ? form.images : [DEFAULT_PRODUCT_IMAGE],
    };

    try {
      if (editing) {
        await update(editing.id, payload);
        setMessage('Artefacto actualizado correctamente.');
      } else {
        await create(payload);
        setMessage('Artefacto registrado en el inventario.');
      }
      resetForm();
    } catch (err) {
      setMessage(err.message || 'Error en el protocolo.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title ?? '',
      description: item.description ?? '',
      price: item.price ?? '',
      category: item.category?.id ?? item.category ?? '',
      images: item.images ?? [],
    });
    setMessage('');
  };

  const handleDelete = async (item) => {
    if (!confirm(`¿Eliminar "${item.title}" del inventario?`)) return;
    await remove(item.id);
  };

  if (loading && !items.length) {
    return <div className="scrap-state">Cargando inventario...</div>;
  }

  if (error) {
    return <div className="scrap-state scrap-state--error">Fallo de comunicación: {error.message}</div>;
  }

  return (
    <div className="products-view">
      <div className="scrap-header">
        <div>
          <h1>INVENTARIO SCAVENGER: ELECTRÓNICA</h1>
          <p>
            Componentes vitales recuperados de las ruinas del viejo mundo. Chips fritos, cables pelados y pantallas rotas.
            Todo se vende "tal cual". La garantía expiró hace 50 años.
          </p>
        </div>
        <button className="scrap-button scrap-button--accent" onClick={() => resetForm()}>
          + NUEVO ARTEFACTO
        </button>
      </div>

      <div className="scrap-controls">
        <div className="scrap-filters">
          <label>
            Categoría
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">TODOS</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>

          <label>
            Ordenar
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </label>
        </div>
      </div>

      <div className="scrap-panel">
        <form className="scrap-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Editar artefacto' : 'Registrar artefacto'}</h2>

          <label>
            Título
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </label>

          <label>
            Descripción
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </label>

          <label>
            Precio
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              required
            />
          </label>

          <label>
            Categoría
            <input
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              required
            />
          </label>

          <div className="scrap-form-actions">
            <button className="scrap-button scrap-button--accent" type="submit" disabled={saving}>
              {saving ? 'Procesando...' : editing ? 'Actualizar' : 'Crear'}
            </button>
            {editing && (
              <button className="scrap-button scrap-button--ghost" type="button" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {message && <div className="scrap-state">{message}</div>}

      <div className="scrap-grid">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={{ ...item, _allItems: items }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="scrap-pagination">
        <button className="scrap-button scrap-button--ghost" disabled={page <= 1 || loading} onClick={() => setPage((prev) => prev - 1)}>
          &lt;
        </button>
        <span className="scrap-page">{loading ? '...' : page}</span>
        <button className="scrap-button scrap-button--ghost" disabled={loading} onClick={() => setPage((prev) => prev + 1)}>
          &gt;
        </button>
      </div>
    </div>
  );
}
