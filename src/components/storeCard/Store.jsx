import { resolveProductImage, productPrice } from '../../services/productsService';
import './StoreCard.css';

function StoreCard({ item }) {
  const title = item?.title ?? 'Artefacto desconocido';
  const category = item?.category?.name ?? item?.categoryName ?? 'SIN CATEGORÍA';
  const price = productPrice(item);
  const description = item?.description ?? 'Sin descripción registrada.';
  const src = resolveProductImage(item);

  return (
    <article className="storeCard">
      <span className="storeCardCategory">{category}</span>
      <div className="storeCardMedia">
        <img src={src} alt={title} loading="lazy" />
      </div>

      <div className="storeCardBody">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="storeCardFooter">
        <span className="storeCardPrice">${price.toLocaleString('es-ES')}</span>
        <button type="button" className="storeAddButton">
          AÑADIR
        </button>
      </div>
    </article>
  );
}

export default StoreCard;