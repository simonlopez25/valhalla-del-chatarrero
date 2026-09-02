import { useEffect, useState } from "react";
import { FormField } from "../../molecules/formField/FormField";
import { CustomButton } from "../../atoms/customButton/CustomButton";
import { createProduct, getCategories } from "../../../services/productsService";
import {
  EMPTY_PRODUCT_FORM,
  getProductFieldErrors,
  getCategoryOptions,
} from "./productFormHelpers";
import "./ProductForm.css";

export function ProductForm({ onProductCreated }) {
  const [form, setForm] = useState(EMPTY_PRODUCT_FORM);
  const [categories, setCategories] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    getCategories()
      .then((data) => {
        if (!ignore && Array.isArray(data)) setCategories(data);
      })
      .catch(() => {
        setFeedbackMessage("No se pudieron cargar las categorías.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedbackMessage("");

    const errors = getProductFieldErrors(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    try {
      const createdProduct = await createProduct({
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        categoryId: Number(form.categoryId),
        images: [form.image.trim()],
      });

      setForm(EMPTY_PRODUCT_FORM);
      setFieldErrors({});
      onProductCreated?.(createdProduct);
    } catch (error) {
      setFeedbackMessage(error.message || "No se pudo crear el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="productForm" noValidate>
      <h2>NUEVO ARTEFACTO</h2>

      <FormField
        id="productTitle"
        labelText="Título"
        type="text"
        name="title"
        value={form.title}
        placeholder="Ej: Fusor de plasma reciclado"
        onChange={handleInputChange}
        disabled={isLoading}
        error={fieldErrors.title}
      />

      <FormField
        id="productPrice"
        labelText="Precio (CR)"
        type="number"
        name="price"
        value={form.price}
        placeholder="Ej: 250"
        onChange={handleInputChange}
        disabled={isLoading}
        error={fieldErrors.price}
      />

      <FormField
        id="productDescription"
        labelText="Descripción"
        type="textarea"
        name="description"
        value={form.description}
        placeholder="Detalla el estado, origen y rareza del artefacto"
        onChange={handleInputChange}
        disabled={isLoading}
        rows={4}
        error={fieldErrors.description}
      />

      <FormField
        id="productCategory"
        labelText="Categoría"
        type="select"
        name="categoryId"
        value={form.categoryId}
        options={getCategoryOptions(categories)}
        onChange={handleInputChange}
        disabled={isLoading}
        error={fieldErrors.categoryId}
      />

      <FormField
        id="productImage"
        labelText="URL de la imagen"
        type="url"
        name="image"
        value={form.image}
        placeholder="https://..."
        onChange={handleInputChange}
        disabled={isLoading}
        error={fieldErrors.image}
      />

      {feedbackMessage && <p className="productFormError">{feedbackMessage}</p>}

      <CustomButton
        label={isLoading ? "CREANDO..." : "CREAR ARTEFACTO"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}