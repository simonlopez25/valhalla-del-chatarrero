import './VitrinaFilter.css';

const allCategories = '';

function VitrinaFilter({ categories, activeCategoryId, sort, onCategoryChange, onSortChange }) {
  const currentLabel =
    activeCategoryId === allCategories
      ? 'TODAS'
      : categories.find((c) => String(c.id) === String(activeCategoryId))?.name || 'TODAS';

  return (
    <div className="vitrinaFilter">
      <div className="vitrinaGroup">
        <label className="vitrinaFilterLabel" htmlFor="vitrinaCategory">
          Filtrar por categoría:
        </label>
        <select
          id="vitrinaCategory"
          className="vitrinaSelect"
          value={activeCategoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value={allCategories}>TODAS</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="vitrinaActiveTag">{currentLabel.toUpperCase()}</span>
      </div>

      <div className="vitrinaGroup">
        <label className="vitrinaFilterLabel" htmlFor="vitrinaSort">
          Ordenar por:
        </label>
        <select
          id="vitrinaSort"
          className="vitrinaSelect"
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

export default VitrinaFilter;