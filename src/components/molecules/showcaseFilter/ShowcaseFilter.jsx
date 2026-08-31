import './ShowcaseFilter.css';

const allCategories = '';

function ShowcaseFilter({ categories, activeCategoryId, sort, onCategoryChange, onSortChange }) {
  const currentLabel =
    activeCategoryId === allCategories
      ? 'TODAS'
      : categories.find((c) => String(c.id) === String(activeCategoryId))?.name || 'TODAS';

  return (
    <div className="showcaseFilter">
      <div className="showcaseGroup">
        <label className="showcaseFilterLabel" htmlFor="showcaseCategory">
          Filtrar por categoría:
        </label>
        <select
          id="showcaseCategory"
          className="showcaseSelect"
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
        <span className="showcaseActiveTag">{currentLabel.toUpperCase()}</span>
      </div>

      <div className="showcaseGroup">
        <label className="showcaseFilterLabel" htmlFor="showcaseSort">
          Ordenar por:
        </label>
        <select
          id="showcaseSort"
          className="showcaseSelect"
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

export default ShowcaseFilter;