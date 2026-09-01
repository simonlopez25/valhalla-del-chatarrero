import { useState } from "react";
import TrashIcon from "../../atoms/icon/TrashIcon";
import ConfirmDialog from "../../molecules/confirmDialog/ConfirmDialog";

const DeleteProductButton = ({ productId, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onDelete(productId);
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        <TrashIcon />
      </button>

      {showConfirm && (
        <ConfirmDialog
          message="¿Seguro que quieres eliminar este producto?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default DeleteProductButton;