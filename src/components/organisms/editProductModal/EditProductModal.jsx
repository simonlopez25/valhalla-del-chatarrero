import { useEffect, useState } from "react";
import { updateProduct, getCategories } from "../../../services/productsService";
import { FormField } from "../../molecules/formField/FormField";
import { CustomButton } from "../../atoms/customButton/CustomButton";
import {
  getProductFieldErrors,
  getCategoryOptions,
} from "../productForm/productFormHelpers";
import "../updateUserModal/UpdateUserModal.css";

const getInitialForm = (product) => {
  const rawImages = product?.images;
  const firstImage = Array.isArray(rawImages)
    ? rawImages[0]
    : typeof rawImages === "string"
      ? rawImages
      : "";

  return {
    title: product?.title ?? "",
    price: product?.price ?? "",
    description: product?.description ?? "",
    categoryId: String(product?.category?.id ?? ""),
    image: firstImage ?? "",
  };
};

function EditProductModal({ product, onClose, onProductUpdated }) {
  const [form, setForm] = useState(() => getInitialForm(product));
  const [categories, setCategories] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    getCategories()
      .then((data) => {
        if (!ignore && Array.isArray(data)) setCategories(data);
      })
      .catch(() => {
        setSubmitError("No se pudieron cargar las categorías.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isSubmitting]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const errors = getProductFieldErrors(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      const updatedProduct = await updateProduct(product.id, {
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        categoryId: Number(form.categoryId),
        images: [form.image.trim()],
      });

      onProductUpdated(updatedProduct);
    } catch (error) {
      setSubmitError(error.message || "No se pudo actualizar el producto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modalOverlay" onClick={isSubmitting ? undefined : onClose}>
      <section
        className="updateModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editProductTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="updateModalHeader">
          <h2 id="editProductTitle">EDITAR ARTEFACTO #{product.id}</h2>
          <button
            type="button"
            className="closeModalButton"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Cerrar"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="editProductTitle"
            labelText="Título"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isSubmitting}
            error={fieldErrors.title}
          />

          <FormField
            id="editProductPrice"
            labelText="Precio (CR)"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            disabled={isSubmitting}
            error={fieldErrors.price}
          />

          <FormField
            id="editProductDescription"
            labelText="Descripción"
            type="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={4}
            error={fieldErrors.description}
          />

          <FormField
            id="editProductCategory"
            labelText="Categoría"
            type="select"
            name="categoryId"
            value={form.categoryId}
            options={getCategoryOptions(categories)}
            onChange={handleChange}
            disabled={isSubmitting}
            error={fieldErrors.categoryId}
          />

          <FormField
            id="editProductImage"
            labelText="URL de la imagen"
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            disabled={isSubmitting}
            error={fieldErrors.image}
          />

          {submitError && <p className="submitError">{submitError}</p>}

          <div className="updateModalActions">
            <button
              type="button"
              className="cancelButton"
              onClick={onClose}
              disabled={isSubmitting}
            >
              CANCELAR
            </button>
            <CustomButton
              label={isSubmitting ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditProductModal;