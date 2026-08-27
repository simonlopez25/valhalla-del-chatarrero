import { getProducts, createProduct, updateProduct, patchProduct, deleteProduct } from '../services/productsService';
import { useCrud } from './useCrud';

const FAKE_PRODUCT_PATTERNS = [
  /^title-[a-f0-9-]+$/i,
  /^desc-[a-f0-9-]+$/i,
];

const isFakeProduct = (item) =>
  FAKE_PRODUCT_PATTERNS.some((pattern) => {
    const value = String(item?.title || item?.description || '').trim();
    return pattern.test(value);
  });

const normalizeCategoryId = (item) => {
  const category = item?.category;
  if (typeof category === 'object' && category !== null) {
    return category.id;
  }
  if (typeof category === 'number') {
    return category;
  }
  return item?.categoryId;
};

const productService = {
  list: ({ limit, offset, ...filters }) =>
    getProducts({ limit, offset, ...filters }).then((data) => {
      const rawItems = Array.isArray(data) ? data : data?.products ?? data;
      const normalized = Array.isArray(rawItems)
        ? rawItems.map((item) => ({ ...item, categoryId: normalizeCategoryId(item) }))
        : rawItems;

      return Array.isArray(data) ? normalized : { ...data, products: normalized };
    }),
  create: createProduct,
  update: (id, payload) => updateProduct(id, payload),
  patch: (id, payload) => patchProduct(id, payload),
  delete: deleteProduct,
};

export function useProducts({ limit = 10, offset = 0 } = {}) {
  const crud = useCrud({
    service: productService,
    limit,
    offset,
    isFakeItem: isFakeProduct,
  });

  const load = (options = {}) => crud.load({ ...options, limit, offset });

  return {
    ...crud,
    load,
  };
}
