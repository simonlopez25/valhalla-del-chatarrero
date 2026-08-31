import Button from "../../atoms/Button/Button";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-box">
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <Button label="Cancelar" onClick={onCancel} variant="secondary" />
          <Button label="Eliminar" onClick={onConfirm} variant="danger" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;