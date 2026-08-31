import { useState, useEffect, useRef } from 'react';
import useCategories from './hooks/useCategories.js';
import useCreateProduct from './hooks/useCreateProduct.js';
import ProductFormFields from '../Molecules/ProductFormFields/ProductFormFields.jsx';
import './ProductModal.css';

const LOCAL_PLACEHOLDER = '/product-placeholder.png';

function buildFormData(categoryId) {
  return {
    title: '',
    price: '',
    description: '',
    categoryId: categoryId || '',
    images: [''],
  };
}

export default function ProductModal({ isOpen, onClose }) {
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories();
  const { submitProduct, isSubmitting, submitError, success, resetState } = useCreateProduct(onClose);
  const [form, setForm] = useState(() => buildFormData());
  const [errors, setErrors] = useState({});
  const isFirstOpen = useRef(true);

  const categoryId = categories[0]?.id;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (isFirstOpen.current) {
      setForm(buildFormData(categoryId));
      setErrors({});
      resetState();
      isFirstOpen.current = false;
    }
  }, [isOpen, categoryId, resetState]);

  useEffect(() => {
    if (!isOpen) {
      isFirstOpen.current = true;
    }
  }, [isOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'El título es obligatorio';
    if (form.price === '' || Number(form.price) <= 0) next.price = 'El precio debe ser mayor a 0';
    if (!form.description.trim()) next.description = 'La descripción es obligatoria';
    if (!form.categoryId) next.categoryId = 'Seleccioná una categoría';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      categoryId: Number(form.categoryId),
      images: [form.images?.[0]?.trim() ? form.images[0].trim() : LOCAL_PLACEHOLDER],
    };

    await submitProduct(payload);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(event) => event.stopPropagation()}>
        <header className="product-modal-header">
          <h2>Nuevo producto</h2>
          <button type="button" className="product-modal-close" onClick={onClose}>
            ×
          </button>
        </header>

        <form className="product-modal-form" onSubmit={handleSubmit}>
          <ProductFormFields
            form={form}
            errors={errors}
            onChange={handleChange}
            categories={categories}
          />

          {categoriesError && <p className="form-message error">Error cargando categorías</p>}
          {submitError && <p className="form-message error">Error creando producto</p>}
          {success && <p className="form-message success">Producto creado con éxito</p>}

          <button type="submit" disabled={isSubmitting || isLoadingCategories || success}>
            {isSubmitting ? 'Guardando...' : 'Guardar producto'}
          </button>
        </form>
      </div>
    </div>
  );
}
