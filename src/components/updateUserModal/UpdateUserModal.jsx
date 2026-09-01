import { useEffect, useState } from "react";
import { updateUser } from "../../services/updateUserService";
import "./UpdateUserModal.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validUserRoles = ["admin", "customer"];
const formFields = ["name", "email", "role", "avatar", "password"];

/** Builds the initial form prefilled with the current user data. */
const getInitialForm = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  role: user?.role || "customer",
  avatar: user?.avatar || "",
  password: "",
});

/**
 * Validates a single field and returns an error message or "" when valid.
 * @param {string} field - Field name.
 * @param {string} value - Entered value.
 * @returns {string} Error message or an empty string.
 */
const validateField = (field, value) => {
  switch (field) {
    case "name":
      if (!value.trim()) return "El nombre no puede estar vacío.";
      return "";
    case "email":
      if (!value.trim()) return "El email es obligatorio.";
      if (!emailPattern.test(value.trim()))
        return "Formato de email no válido (ej: nombre@dominio.com).";
      return "";
    case "role":
      if (!validUserRoles.includes(value)) return "Selecciona un rol válido.";
      return "";
    case "avatar":
      if (!value.trim()) return "El avatar (URL) es obligatorio.";
      return "";
    case "password":
      if (value && value.length < 6)
        return "La contraseña debe tener al menos 6 caracteres.";
      return "";
    default:
      return "";
  }
};

/**
 * Validates the whole form.
 * @param {object} form - Current form values.
 * @returns {object} Map of field -> error message (empty when valid).
 */
const validateAllFields = (form) => {
  const errors = {};
  formFields.forEach((field) => {
    const message = validateField(field, form[field]);
    if (message) errors[field] = message;
  });
  return errors;
};

const serviceErrorMessages = {
  MISSING_USER_ID: "El ID del usuario no es válido.",
  INVALID_USER_ID: "El ID del usuario no es válido.",
  INVALID_PAYLOAD: "Los datos enviados no son válidos.",
  INVALID_NAME: "El nombre no es válido.",
  INVALID_EMAIL: "El email no es válido.",
  INVALID_ROLE: "El rol seleccionado no es válido.",
  INVALID_AVATAR: "La URL del avatar no es válida.",
  INVALID_PASSWORD: "La contraseña no cumple los requisitos.",
  EMPTY_PAYLOAD: "No hay datos que enviar.",
  HTTP_ERROR: "El servidor rechazó la solicitud. Inténtalo de nuevo.",
  400: "Los datos enviados no son válidos. Revísalos.",
  404: "El usuario no existe o fue eliminado.",
  409: "Ya existe un usuario con esos datos.",
  500: "Error interno del servidor. Inténtalo más tarde.",
  TIMEOUT: "La solicitud tardó demasiado. Inténtalo de nuevo.",
  NETWORK_ERROR: "Error de conexión. Comprueba tu internet e inténtalo de nuevo.",
  REQUEST_SETUP_ERROR: "No se pudo enviar la solicitud.",
  UNEXPECTED_ERROR: "Ocurrió un error inesperado. Inténtalo de nuevo.",
};

/**
 * Translates a service error into a user-friendly message.
 * @param {unknown} error - Error thrown by the service or the request.
 * @returns {string} User-friendly error message.

 */
const getErrorMessage = (error) => {
  if (!error) return "No se pudo actualizar el registro. Inténtalo de nuevo.";
  const messageByCode = serviceErrorMessages[error.code];
  if (messageByCode) return messageByCode;

  if (error.status) return serviceErrorMessages[error.status] || error.message;

  return error.message || "No se pudo actualizar el registro. Inténtalo de nuevo.";
};
/**
 * Modal used to update a user.
 * Sends PUT via Axios (updateUser service, disables the button while
 * submitting and shows validation, error or success messages.
 */
function UpdateUserModal({ user, onClose, onUserUpdated }) {
  const [form, setForm] = useState(() => getInitialForm(user));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close with the Escape key (accessibility), never while submitting.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onClose]);

  /** Checks whether the form differs from the original values. */
  const hasChanges = () => {
    const initial = getInitialForm(user);
    return (
      form.name.trim() !== initial.name.trim() ||
      form.email.trim() !== initial.email.trim() ||
      form.role !== initial.role ||
      form.avatar.trim() !== initial.avatar.trim() ||
      form.password !== ""
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Live validation: clears the field error as soon as it is fixed.
    setErrors((prev) => {
      const next = { ...prev };
      const message = validateField(name, value);
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields before sending.
    const validationErrors = validateAllFields(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Revisa los campos marcados en rojo.");
      return;
    }

    // Avoid unnecessary calls when there are no real changes.
    if (!hasChanges()) {
      setSubmitError("No hay cambios que guardar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    // Only send the fields supported by the API; password is optional.
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      avatar: form.avatar.trim(),
    };
    if (form.password) payload.password = form.password;

    try {
      const updatedUser = await updateUser(user.id, payload);
      onUserUpdated(
        `Registro #${updatedUser.id} actualizado correctamente.`,
        updatedUser
      );
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modalOverlay" onClick={isSubmitting ? undefined : onClose}>
      <section
        className="updateModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="updateModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="updateModalHeader">
          <h2 id="updateModalTitle">ACTUALIZAR REGISTRO #{user.id}</h2>
          <button
            type="button"
            className="closeModalButton"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Cerrar"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="formField">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className="fieldError">{errors.name}</span>}
          </div>

          <div className="formField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="fieldError">{errors.email}</span>}
          </div>

          <div className="formField">
            <label htmlFor="role">Clasificación</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.role)}
            >
              {validUserRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && <span className="fieldError">{errors.role}</span>}
          </div>

          <div className="formField">
            <label htmlFor="avatar">Avatar (URL)</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              value={form.avatar}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.avatar)}
            />
            {errors.avatar && <span className="fieldError">{errors.avatar}</span>}
          </div>

          <div className="formField">
            <label htmlFor="password">Nueva contraseña (opcional)</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Dejar vacío si no se cambia"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <span className="fieldError">{errors.password}</span>
            )}
          </div>

          {submitError && <p className="submitError">{submitError}</p>}

          <div className="updateModalActions">
            <button
              type="button"
              className="cancelButton"
              onClick={onClose}
              disabled={isSubmitting}
            >
              CANCELAR
            </button>
            <button type="submit" className="submitButton" disabled={isSubmitting}>
              {isSubmitting ? "ACTUALIZANDO..." : "ACTUALIZAR"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateUserModal;