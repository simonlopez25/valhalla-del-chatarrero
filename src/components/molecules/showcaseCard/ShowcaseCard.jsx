import { resolveProductImage, productPrice } from '../../../services/productsService';
import './ShowcaseCard.css';

function ShowcaseCard({ item }) {
  const title = item?.title ?? 'Artefacto desconocido';
  const category = item?.category?.name ?? item?.categoryName ?? 'SIN CATEGORÍA';
  const price = productPrice(item);
  const description = item?.description ?? 'Sin descripción registrada.';
  const src = resolveProductImage(item);

  return (
    <article className="showcaseCard">
      <span className="showcaseCardCategory">{category}</span>

      <div className="showcaseCardMedia">
        <img src={src} alt={title} loading="lazy" />
      </div>

      <div className="showcaseCardBody">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="showcaseCardFooter">
        <span className="showcaseCardPrice">${price.toLocaleString('es-ES')}</span>
        <button type="button" className="showcaseAddButton">
          AÑADIR
        </button>
      </div>
    </article>
  );
}

export default ShowcaseCard;