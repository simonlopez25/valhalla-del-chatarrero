import { useEffect, useState } from "react";
import { updateUser } from "../../services/updateUserService";
import { FormField } from "../molecules/formField/FormField";
import { CustomButton } from "../atoms/customButton/CustomButton";
import "./UpdateUserModal.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validUserRoles = ["admin", "customer"];
const formFields = ["name", "email", "role", "avatar", "password"];

const getInitialForm = (user) => ({
  name: user?.name || "",
  email: user?.email || "",
  role: user?.role || "customer",
  avatar: user?.avatar || "",
  password: "",
});

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

const getErrorMessage = (error) => {
  if (!error) return "No se pudo actualizar el registro. Inténtalo de nuevo.";
  const messageByCode = serviceErrorMessages[error.code];
  if (messageByCode) return messageByCode;

  if (error.status) return serviceErrorMessages[error.status] || error.message;

  return error.message || "No se pudo actualizar el registro. Inténtalo de nuevo.";
};
function UpdateUserModal({ user, onClose, onUserUpdated }) {
  const [form, setForm] = useState(() => getInitialForm(user));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onClose]);

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

    const validationErrors = validateAllFields(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Revisa los campos marcados en rojo.");
      return;
    }

    if (!hasChanges()) {
      setSubmitError("No hay cambios que guardar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

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
          <FormField
            id="updateName"
            labelText="Nombre"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.name}
          />

          <FormField
            id="updateEmail"
            labelText="Correo Electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.email}
          />

          <FormField
            id="updateRole"
            labelText="Clasificación"
            type="select"
            name="role"
            value={form.role}
            options={validUserRoles}
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.role}
          />

          <FormField
            id="updateAvatar"
            labelText="Avatar (URL)"
            type="url"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.avatar}
          />

          <FormField
            id="updatePassword"
            labelText="Nueva contraseña (opcional)"
            type="password"
            name="password"
            value={form.password}
            placeholder="Dejar vacío si no se cambia"
            onChange={handleChange}
            disabled={isSubmitting}
            error={errors.password}
          />

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
            <CustomButton
              label={isSubmitting ? "ACTUALIZANDO..." : "ACTUALIZAR"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateUserModal;