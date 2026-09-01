import { useState } from 'react';
import DeleteButton from '../../atoms/deleteButton/DeleteButton';
import ConfirmDialog from '../confirmDialog/ConfirmDialog';
import { resolveProductImage, productPrice } from '../../../services/productsService';
import './ShowcaseCard.css';

function ShowcaseCard({ item, onDeleteProduct }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const title = item?.title ?? 'Artefacto desconocido';
  const category = item?.category?.name ?? item?.categoryName ?? 'SIN CATEGORÍA';
  const price = productPrice(item);
  const description = item?.description ?? 'Sin descripción registrada.';
  const src = resolveProductImage(item);

  const handleDelete = () => {
    if (typeof onDeleteProduct === 'function') {
      onDeleteProduct(item?.id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <>
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

          <div className="showcaseCardActions">
            <DeleteButton onClick={() => setShowDeleteConfirm(true)} />
            <button type="button" className="showcaseAddButton">
              AÑADIR
            </button>
          </div>
        </div>
      </article>

      {showDeleteConfirm && (
        <ConfirmDialog
          message="¿Seguro que quieres eliminar este producto de la vitrina?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}

export default ShowcaseCard;