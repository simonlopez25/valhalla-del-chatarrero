import axios from "axios";

const usersApiUrl =
  import.meta.env?.VITE_USERS_API_URL ||
  "https://api.escuelajs.co/api/v1/users";

const defaultTimeoutMs = 10000;
const validUserRoles = ["admin", "customer"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserServiceError extends Error {
  constructor(message, { status = null, code = "userServiceError", cause } = {}) {
    super(message);
    this.name = "UserServiceError";
    this.status = status;
    this.code = code;
    if (cause) this.cause = cause;
  }
}

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const validateUserId = (id) => {
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new UserServiceError("Se requiere un ID de usuario válido.", {
      code: "missingUserId",
    });
  }

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new UserServiceError("El ID de usuario debe ser un número entero positivo.", {
      code: "invalidUserId",
    });
  }

  return numericId;
};

const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new UserServiceError("Los datos de actualización deben ser un objeto válido.", {
      code: "invalidPayload",
    });
  }

  const fields = {};

  if (payload.name !== undefined) {
    if (!isNonEmptyString(payload.name)) {
      throw new UserServiceError("El nombre de usuario debe ser un texto que no esté vacío.", {
        code: "invalidName",
      });
    }
    fields.name = payload.name.trim();
  }

  if (payload.email !== undefined) {
    const email = String(payload.email).trim();
    if (!emailPattern.test(email)) {
      throw new UserServiceError("La dirección de correo electrónico no es válida.", {
        code: "invalidEmail",
      });
    }
    fields.email = email;
  }

  if (payload.role !== undefined) {
    if (!validUserRoles.includes(payload.role)) {
      throw new UserServiceError(
        `El rol debe ser uno de los siguientes: ${validUserRoles.join(", ")}.`,
        { code: "invalidRole" }
      );
    }
    fields.role = payload.role;
  }

  if (payload.avatar !== undefined) {
    if (!isNonEmptyString(payload.avatar)) {
      throw new UserServiceError("El avatar debe ser una URL de texto válida y no vacía.", {
        code: "invalidAvatar",
      });
    }
    fields.avatar = payload.avatar.trim();
  }

  if (payload.password !== undefined) {
    if (typeof payload.password !== "string" || payload.password.length < 6) {
      throw new UserServiceError(
        "La contraseña debe tener al menos 6 caracteres.",
        { code: "invalidPassword" }
      );
    }
    fields.password = payload.password;
  }

  if (Object.keys(fields).length === 0) {
    throw new UserServiceError("Se debe proporcionar al menos un campo actualizable.", {
      code: "emptyPayload",
    });
  }

  return fields;
};

const normalizeError = (error) => {
  if (axios.isCancel(error)) throw error;

  if (error instanceof UserServiceError) return error;

  if (axios.isAxiosError(error)) {
    const { response, request } = error;

    if (response) {
      const { status, data } = response;
      const serverMessage =
        data?.message ||
        data?.error ||
        `El servidor rechazó la solicitud (estado ${status}).`;

      return new UserServiceError(serverMessage, {
        status,
        code: "httpError",
        cause: error,
      });
    }

    if (request) {
      const isTimeout = error.code === "ECONNABORTED";
      return new UserServiceError(
        isTimeout
          ? "La solicitud ha expirado (tiempo de espera agotado). Por favor, inténtalo de nuevo."
          : "Error de red: no se pudo contactar con el servidor. Comprueba tu conexión.",
        { code: isTimeout ? "timeout" : "networkError", cause: error }
      );
    }

    return new UserServiceError("No se pudo enviar la solicitud.", {
      code: "requestSetupError",
      cause: error,
    });
  }

  return new UserServiceError("Error inesperado al actualizar el usuario.", {
    code: "unexpectedError",
    cause: error,
  });
};

export const updateUser = async (
  id,
  payload,
  { timeout = defaultTimeoutMs, signal } = {}
) => {
  try {
    const userId = validateUserId(id);
    const data = validatePayload(payload);

    const response = await axios.put(`${usersApiUrl}/${userId}`, data, {
      timeout,
      signal,
      headers: { contentType: "application/json" },
    });

    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
};