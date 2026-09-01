import { useState } from "react";
import UpdateUserModal from "../updateUserModal/UpdateUserModal";
import "./EditButton.css";

/**
 * Edit button — opens the update user modal when clicked.
 * Reuses the existing visual style (.actionButton editButton + pencil icon).
 *
 * @param {object} props.user          - User object to update.
 * @param {function} props.onUserUpdated - (message, updatedUser) => void
 */
 
function EditButton({ user, onUserUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="actionButton editButton"
        onClick={handleClick}
        title="Editar"
        type="button"
        aria-label={`Actualizar usuario ${user?.name ?? ""}`}
      >
      <svg
        className="actionIcon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLineCap="round"
        strokeLineJoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      </button>

      {isModalOpen && user && (
        <UpdateUserModal
          user={user}
          onClose={handleClose}
          onUserUpdated={(message, updatedUser) => {
            handleClose();
            onUserUpdated?.(message, updatedUser);
          }}
        />
      )}
    </>
  );
}

export default EditButton;