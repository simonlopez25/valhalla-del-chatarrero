import { resolveProductImage, productPrice } from '../../services/productsService';
import './VitrinaCard.css';

function VitrinaCard({ item }) {
  const title = item?.title ?? 'Artefacto desconocido';
  const category = item?.category?.name ?? item?.categoryName ?? 'SIN CATEGORÍA';
  const price = productPrice(item);
  const description = item?.description ?? 'Sin descripción registrada.';
  const src = resolveProductImage(item);

  return (
    <article className="vitrinaCard">
      <span className="vitrinaCardCategory">{category}</span>

      <div className="vitrinaCardMedia">
        <img src={src} alt={title} loading="lazy" />
      </div>

      <div className="vitrinaCardBody">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="vitrinaCardFooter">
        <span className="vitrinaCardPrice">${price.toLocaleString('es-ES')}</span>
        <button type="button" className="vitrinaAddButton">
          AÑADIR
        </button>
      </div>
    </article>
  );
}

export default VitrinaCard;