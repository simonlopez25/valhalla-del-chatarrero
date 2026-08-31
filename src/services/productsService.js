import request from "./apiClient";
import axios from "axios";
const fakeProductPatterns = [/^title-[a-f0-9-]+$/i, /^desc-[a-f0-9-]+$/i];
const machineTitlePattern =
  /^(title|titulo|desc|descripcion|name|nombre|test|prueba|producto|catalog[-_ ]?item|item|sku|node)(?:[-_ ]|$)/i;
const uuidTailPattern =
  /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const spamCharsPattern = /(.)\1{3,}/u;
const slugTitlePattern = /^\S{40,}$/;
const hexFragmentPattern = /[a-f0-9]{8,}/i;
const generatedCategoryPattern = /^(catalog|test|fake|demo)[-_ ]/i;
const capsKebabPattern = /^[\p{Lu}0-9]+(?:-[\p{Lu}0-9]+){1,}$/u;

const hasGeneratedIdToken = (title) =>
  String(title)
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .some(
      (token) =>
        token.length >= 8 && /[0-9]/.test(token) && !/[aeiou]/i.test(token),
    );

const invalidImagePatterns = [
  "placehold.co",
  "placeimg.com",
  "pravatar.cc",
  "api.escuelajs.co/api/v1/files/",
];

export const isValidImageUrl = (url) => {
  if (typeof url !== "string" || url.trim().length === 0) return false;
  return !invalidImagePatterns.some((pattern) => url.includes(pattern));
};

const normalizeImages = (rawImages) => {
  const images = Array.isArray(rawImages) ? rawImages : [];
  const first = images[0];

  if (typeof first === "string" && first.trimStart().startsWith("[")) {
    try {
      const parsed = JSON.parse(first);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return images;
    }
  }

  return images;
};

export const resolveProductImage = (product) => {
  const usable = normalizeImages(product?.images).find((url) =>
    isValidImageUrl(url),
  );
  if (usable) return usable;
  return `https://picsum.photos/seed/${Number(product?.id) || "desconocido"}/600/600`;
};

export const productPrice = (product) => {
  const price = Number(product?.price);
  return Number.isFinite(price) && price > 0 ? price : 0;
};

export const isJunkProduct = (product) => {
  if (!product || typeof product !== "object") return true;

  const title = String(product.title ?? "").trim();
  const description = String(product.description ?? "").trim();
  const categoryName = String(product?.category?.name ?? "").trim();
  const patterns = [
    ...fakeProductPatterns,
    machineTitlePattern,
    uuidTailPattern,
    spamCharsPattern,
    slugTitlePattern,
    hexFragmentPattern,
    capsKebabPattern,
  ];

  if (productPrice(product) === 0) return true;
  if (title.length < 6) return true;
  if (description.length < 40) return true;
  if (!categoryName || generatedCategoryPattern.test(categoryName)) return true;
  if (capsKebabPattern.test(categoryName)) return true;
  if (patterns.some((pattern) => pattern.test(title))) return true;
  if (hasGeneratedIdToken(title)) return true;

  return false;
};

export const getCategories = () => request("/categories");

export const getProducts = ({
  limit = 50,
  offset = 0,
  signal,
  ...filters
} = {}) => {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("offset", String(offset));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  });

  return request(`/products?${params.toString()}`, { signal });
};

export const getProduct = (id) => request(`/products/${id}`);

const pageSize = 100;
const maxProducts = 400;

const fetchAllProducts = async () => {
  const collected = [];

  for (let offset = 0; offset < maxProducts; offset += pageSize) {
    const batch = await getProducts({ limit: pageSize, offset });

    if (!Array.isArray(batch) || batch.length === 0) break;
    collected.push(...batch);
    if (batch.length < pageSize) break;
  }

  return collected;
};

export const getVisibleProducts = async (id) => {
  await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);

  const products = await fetchAllProducts();
  if (!Array.isArray(products)) return [];
  return products.filter((product) => !isJunkProduct(product));
};
