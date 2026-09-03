import {
  minTitleLength,
  minDescriptionLength,
} from "../../../services/productsService";

export const emptyProductForm = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  image: "",
};

const imageUrlPattern = /^https?:\/\/.+/i;

export const getCategoryOptions = (categories) => [
  { value: "", label: "Selecciona una categoría" },
  ...categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  })),
];

export const getProductFieldErrors = (form) => {
  const errors = {};

  if (form.title.trim().length < minTitleLength) {
    errors.title = `El título debe tener al menos ${minTitleLength} caracteres.`;
  }

  const price = Number(form.price);
  if (!Number.isFinite(price) || price <= 0) {
    errors.price = "El precio debe ser un número mayor que 0.";
  }

  if (form.description.trim().length < minDescriptionLength) {
    errors.description = `La descripción debe tener al menos ${minDescriptionLength} caracteres.`;
  }

  if (!form.categoryId) {
    errors.categoryId = "Selecciona una categoría.";
  }

  if (!imageUrlPattern.test(form.image.trim())) {
    errors.image = "Ingresa una URL de imagen válida (https://...).";
  }

  return errors;
};