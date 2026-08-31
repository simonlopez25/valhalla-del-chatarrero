import { useState } from "react";
import TrashIcon from "../../atoms/Icon/TrashIcon";
import ConfirmDialog from "../../molecules/ConfirmDialog/ConfirmDialog";
import useDeleteProduct from "../../../hooks/useDeleteProduct";

function DeleteProductButton({ productId, onDeleted }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { removeProduct, isDeleting, error } = useDeleteProduct();

  function handleConfirm() {
    removeProduct(productId, onDeleted);
    setShowConfirm(false);
  }

  return (
    <>
      <button onClick={() => setShowConfirm(true)} disabled={isDeleting}>
        <TrashIcon />
      </button>

      {showConfirm && (
        <ConfirmDialog
          message="¿Seguro que quieres eliminar este producto?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </>
  );
}

export default DeleteProductButton;