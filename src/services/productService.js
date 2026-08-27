import axios from "axios";

const productsApiUrl =
  import.meta.env.VITE_PRODUCTS_API_URL || "https://api.escuelajs.co/api/v1/products";

export const fetchHighestPriceProducts = async () => {
  const response = await axios.get(productsApiUrl);

  const products = Array.isArray(response.data) ? response.data : [];

  return products
    .filter((product) => product.images?.[0])
    .map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      category: product.category?.name || "SIN CATEGORÍA",
      stock: product.stock ?? 0,
      condition: "DISPONIBLE",
      image: product.images[0],
    }))
    .sort((productA, productB) => productB.price - productA.price);
};