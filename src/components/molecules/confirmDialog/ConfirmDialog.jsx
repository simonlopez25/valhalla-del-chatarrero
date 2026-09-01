import { createPortal } from "react-dom";
import "./ConfirmDialog.css";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return createPortal(
    <div className="ConfirmDialogOverlay">
      <div className="ConfirmDialogBox">
        <p>{message}</p>
        <div className="ConfirmDialogActions">
          <button
            type="button"
            className="ConfirmDialogButton ConfirmDialogButtonSecondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="ConfirmDialogButton ConfirmDialogButtonDanger"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;
