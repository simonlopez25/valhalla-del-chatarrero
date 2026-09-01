import React, { useState } from 'react';
import { resolveProductImage, productPrice } from '../../services/productsService';
import { FormProductsEdit } from '../editProductForm/FormProductsEdit'; // Ajusta la ruta si es necesario
import './ShowcaseCard.css';

function ShowcaseCard({ item, onProductUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const title = item?.title ?? 'Artefacto desconocido';
  const category = item?.category?.name ?? item?.categoryName ?? 'SIN CATEGORÍA';
  const price = productPrice(item);
  const description = item?.description ?? 'Sin descripción registrada.';
  const src = resolveProductImage(item);

  return (
    <article className="showcaseCard">
      {isEditing ? (
        // Si estamos editando, mostramos el formulario dentro de la tarjeta
        <div className="edit-mode-container">
          <FormProductsEdit 
            productId={item.id} 
            onProductUpdated={(updatedData) => {
              setIsEditing(false);
              if (onProductUpdated) onProductUpdated(updatedData);
            }} 
          />
          <button 
            type="button" 
            className="cancel-edit-btn" 
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        // Si no estamos editando, mostramos la tarjeta normal
        <>
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
            <div className="card-actions">
              <button 
                type="button" 
                className="showcaseEditButton" 
                onClick={() => setIsEditing(true)}
              >
                EDITAR
              </button>
              <button type="button" className="showcaseAddButton">
                AÑADIR
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

{products.map((item) => (
  <ShowCard 
    key={item.id} 
    item={item} 
    onProductUpdated={handleProductUpdated} 
  />
))}
export default ShowcaseCard;