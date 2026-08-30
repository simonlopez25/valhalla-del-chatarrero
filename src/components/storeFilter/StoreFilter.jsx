import './StoreFilter.css';

const ALL = '';

function StoreFilter({ categories, activeCategoryId, sort, onCategoryChange, onSortChange }) {
  const currentLabel =
    activeCategoryId === ALL
      ? 'TODAS'
      : categories.find((c) => String(c.id) === String(activeCategoryId))?.name || 'TODAS';

  return (
    <div className="storeFilter">
      <div className="storeGroup">
        <label className="storeFilterLabel" htmlFor="storeCategory">
          Filtrar por categoría:
        </label>
        <select
          id="storeCategory"
          className="storeSelect"
          value={activeCategoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value={ALL}>TODAS</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="storeActiveTag">{currentLabel.toUpperCase()}</span>
      </div>

      <div className="storeGroup">
        <label className="storeFilterLabel" htmlFor="storeSort">
          Ordenar por:
        </label>
        <select
          id="storeSort"
          className="storeSelect"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
}

export default StoreFilter;