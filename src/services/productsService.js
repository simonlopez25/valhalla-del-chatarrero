import request from './apiClient';

const FAKE_PRODUCT_PATTERNS = [/^title-[a-f0-9-]+$/i, /^desc-[a-f0-9-]+$/i];
const MACHINE_TITLE_PATTERN =
  /^(title|titulo|desc|descripcion|name|nombre|test|prueba|producto|catalog[-_ ]?item|item|sku|node)(?:[-_ ]|$)/i;
const UUID_TAIL_PATTERN = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const SPAM_CHARS_PATTERN = /(.)\1{3,}/u;
const SLUG_TITLE_PATTERN = /^\S{40,}$/;
const HEX_FRAGMENT_PATTERN = /[a-f0-9]{8,}/i;
const GENERATED_CATEGORY_PATTERN = /^(catalog|test|fake|demo)[-_ ]/i;
const CAPS_KEBAB_PATTERN = /^[\p{Lu}0-9]+(?:-[\p{Lu}0-9]+){1,}$/u;

const hasGeneratedIdToken = (title) =>
  String(title)
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .some(
      (token) => token.length >= 8 && /[0-9]/.test(token) && !/[aeiou]/i.test(token)
    );

const INVALID_IMAGE_PATTERNS = [
  'placehold.co',
  'placeimg.com',
  'pravatar.cc',
  'api.escuelajs.co/api/v1/files/',
];

export const isValidImageUrl = (url) => {
  if (typeof url !== 'string' || url.trim().length === 0) return false;
  return !INVALID_IMAGE_PATTERNS.some((pattern) => url.includes(pattern));
};

const normalizeImages = (rawImages) => {
  const images = Array.isArray(rawImages) ? rawImages : [];
  const first = images[0];

  if (typeof first === 'string' && first.trimStart().startsWith('[')) {
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
  const usable = normalizeImages(product?.images).find((url) => isValidImageUrl(url));
  if (usable) return usable;
  return `https://picsum.photos/seed/${Number(product?.id) || 'desconocido'}/600/600`;
};

export const productPrice = (product) => {
  const price = Number(product?.price);
  return Number.isFinite(price) && price > 0 ? price : 0;
};

export const isJunkProduct = (product) => {
  if (!product || typeof product !== 'object') return true;

  const title = String(product.title ?? '').trim();
  const description = String(product.description ?? '').trim();
  const categoryName = String(product?.category?.name ?? '').trim();
  const patterns = [
    ...FAKE_PRODUCT_PATTERNS,
    MACHINE_TITLE_PATTERN,
    UUID_TAIL_PATTERN,
    SPAM_CHARS_PATTERN,
    SLUG_TITLE_PATTERN,
    HEX_FRAGMENT_PATTERN,
    CAPS_KEBAB_PATTERN,
  ];

  if (productPrice(product) === 0) return true;
  if (title.length < 6) return true;
  if (description.length < 40) return true;
  if (!categoryName || GENERATED_CATEGORY_PATTERN.test(categoryName)) return true;
  if (CAPS_KEBAB_PATTERN.test(categoryName)) return true;
  if (patterns.some((pattern) => pattern.test(title))) return true;
  if (hasGeneratedIdToken(title)) return true;

  return false;
};

export const getCategories = () => request('/categories');

export const getProducts = ({ limit = 50, offset = 0, signal, ...filters } = {}) => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('offset', String(offset));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });

  return request(`/products?${params.toString()}`, { signal });
};

export const getProduct = (id) => request(`/products/${id}`);

const PAGE_SIZE = 100;
const MAX_PRODUCTS = 400;

const fetchAllProducts = async () => {
  const collected = [];

  for (let offset = 0; offset < MAX_PRODUCTS; offset += PAGE_SIZE) {
    const batch = await getProducts({ limit: PAGE_SIZE, offset });

    if (!Array.isArray(batch) || batch.length === 0) break;
    collected.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return collected;
};

export const getVisibleProducts = async () => {
  const products = await fetchAllProducts();
  if (!Array.isArray(products)) return [];
  return products.filter((product) => !isJunkProduct(product));
};

