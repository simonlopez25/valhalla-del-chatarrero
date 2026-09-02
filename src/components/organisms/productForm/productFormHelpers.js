import {
  MIN_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "../../../services/productsService";

export const EMPTY_PRODUCT_FORM = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  image: "",
};

const IMAGE_URL_PATTERN = /^https?:\/\/.+/i;

export const getCategoryOptions = (categories) => [
  { value: "", label: "Selecciona una categoría" },
  ...categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  })),
];

export const getProductFieldErrors = (form) => {
  const errors = {};

  if (form.title.trim().length < MIN_TITLE_LENGTH) {
    errors.title = `El título debe tener al menos ${MIN_TITLE_LENGTH} caracteres.`;
  }

  const price = Number(form.price);
  if (!Number.isFinite(price) || price <= 0) {
    errors.price = "El precio debe ser un número mayor que 0.";
  }

  if (form.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `La descripción debe tener al menos ${MIN_DESCRIPTION_LENGTH} caracteres.`;
  }

  if (!form.categoryId) {
    errors.categoryId = "Selecciona una categoría.";
  }

  if (!IMAGE_URL_PATTERN.test(form.image.trim())) {
    errors.image = "Ingresa una URL de imagen válida (https://...).";
  }

  return errors;
};