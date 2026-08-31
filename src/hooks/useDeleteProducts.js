import { useState } from "react";
import { deleteProduct } from "../services/productService";

function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function removeProduct(productId, onSuccess) {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteProduct(productId);
      if (onSuccess) onSuccess(productId);
    } catch (err) {
      setError("No se pudo eliminar el producto");
    } finally {
      setIsDeleting(false);
    }
  }

  return { removeProduct, isDeleting, error };
}

export default useDeleteProduct;