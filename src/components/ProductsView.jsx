import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { getCategories } from '../services/productsService';
import './ProductsView.css';

export default function ProductsView() {
  const { items, loading, error, load, create, update, remove } = useProducts();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', images: [] });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [validCategoryImageMap, setValidCategoryImageMap] = useState({});
  const [sort, setSort] = useState('price-asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const resetForm = () => {
    setForm({ title: '', description: '', price: '', category: '', images: [] });
    setEditing(null);
    setMessage('');
  };

  useEffect(() => {
    getCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(data);
        const map = Object.fromEntries(
          data
            .filter((cat) => {
              const image = cat?.image;
              return (
                typeof image === 'string' &&
                image.trim().length > 0 &&
                !image.endsWith('/') &&
                !image.includes('placehold.co') &&
                !image.includes('placeimg.com') &&
                !image.includes('pravatar.cc')
              );
            })
            .map((cat) => [cat.id, cat.image]),
        );
        setValidCategoryImageMap(map);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const params = { limit, offset: (page - 1) * limit };
    if (categoryId) params.categoryId = Number(categoryId);
    if (sort) params.sort = sort;

    load(params);
  }, [page, categoryId, sort, limit, load]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: Number(form.category) || 1,
      images: form.images?.length ? form.images : ['https://i.imgur.com/QkIa5tT.jpeg'],
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

  const getProductImage = (item) => {
    const firstImage = item?.images?.[0];
    if (
      typeof firstImage === 'string' &&
      firstImage.trim().length > 0 &&
      !firstImage.includes('placehold.co') &&
      !firstImage.includes('placeimg.com') &&
      !firstImage.includes('pravatar.cc') &&
      !firstImage.includes('api.escuelajs.co/api/v1/files/')
    ) {
      return firstImage;
    }
    return validCategoryImageMap[item?.category?.id];
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
        {items.map((item) => {
          const title = item?.title ?? 'Artefacto desconocido';
          const price = item?.price ?? 0;
          const image = getProductImage(item);
          const rawDescription = item?.description ?? '';
          const fallbackDescription = items[0]?.description ?? 'Sin datos de registro.';
          const description =
            typeof rawDescription === 'string' && rawDescription.trim().length > 3
              ? rawDescription
              : (() => {
                  const sameTitle = items.find((other) => other?.id !== item?.id && other?.title === title);
                  const borrowed = sameTitle?.description;
                  return typeof borrowed === 'string' && borrowed.trim().length > 3 ? borrowed : fallbackDescription;
                })();

          return (
            <div className="scrap-card" key={item.id}>
              <span className="scrap-badge">ESTADO_DESCONOCIDO</span>

              <div className="scrap-card__media">
                <img src={image} alt={title} loading="lazy" />
              </div>

              <div className="scrap-card__body">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <div className="scrap-card__footer">
                <span className="scrap-price">${price}</span>
                <div className="scrap-card__actions">
                  <button className="scrap-button scrap-button--ghost" onClick={() => handleEdit(item)}>Editar</button>
                  <button className="scrap-button scrap-button--danger" onClick={() => handleDelete(item)}>Borrar</button>
                </div>
              </div>
            </div>
          );
        })}
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
