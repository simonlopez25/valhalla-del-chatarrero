import { useState } from "react";
import ConfirmDialog from "../../molecules/confirmDialog/ConfirmDialog";
import "./DeleteButton.css";

function DeleteButton({
  itemId,
  onDelete,
  message = "¿Seguro que quieres eliminar este elemento?",
  title = "Eliminar",
  className = "",
  disabled = false,
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirm = async () => {
    if (typeof onDelete === "function") {
      await onDelete(itemId);
    }
    setIsConfirmOpen(false);
  };

  return (
    <>
      <button
        className={`actionButton deleteButton ${className}`.trim()}
        onClick={() => setIsConfirmOpen(true)}
        title={title}
        type="button"
        disabled={disabled}
        aria-label={title}
      >
        <svg
          className="actionIcon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>

      {isConfirmOpen && (
        <ConfirmDialog
          message={message}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  );
}

export default DeleteButton;