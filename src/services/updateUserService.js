import axios from "axios";

const usersApiUrl =
  import.meta.env?.VITE_USERS_API_URL ||
  "https://api.escuelajs.co/api/v1/users";

const defaultTimeoutMs = 10000;
const validUserRoles = ["admin", "customer"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserServiceError extends Error {
  constructor(message, { status = null, code = "USER_SERVICE_ERROR", cause } = {}) {
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
    throw new UserServiceError("A valid user ID is required.", {
      code: "MISSING_USER_ID",
    });
  }

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new UserServiceError("The user ID must be a positive integer.", {
      code: "INVALID_USER_ID",
    });
  }

  return numericId;
};

const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new UserServiceError("The update payload must be a valid object.", {
      code: "INVALID_PAYLOAD",
    });
  }

  const fields = {};

  if (payload.name !== undefined) {
    if (!isNonEmptyString(payload.name)) {
      throw new UserServiceError("The user name must be a non-empty string.", {
        code: "INVALID_NAME",
      });
    }
    fields.name = payload.name.trim();
  }

  if (payload.email !== undefined) {
    const email = String(payload.email).trim();
    if (!emailPattern.test(email)) {
      throw new UserServiceError("The email address is not valid.", {
        code: "INVALID_EMAIL",
      });
    }
    fields.email = email;
  }

  if (payload.role !== undefined) {
    if (!validUserRoles.includes(payload.role)) {
      throw new UserServiceError(
        `The role must be one of: ${validUserRoles.join(", ")}.`,
        { code: "INVALID_ROLE" }
      );
    }
    fields.role = payload.role;
  }

  if (payload.avatar !== undefined) {
    if (!isNonEmptyString(payload.avatar)) {
      throw new UserServiceError("The avatar must be a non-empty URL string.", {
        code: "INVALID_AVATAR",
      });
    }
    fields.avatar = payload.avatar.trim();
  }

  if (payload.password !== undefined) {
    if (typeof payload.password !== "string" || payload.password.length < 6) {
      throw new UserServiceError(
        "The password must be at least 6 characters long.",
        { code: "INVALID_PASSWORD" }
      );
    }
    fields.password = payload.password;
  }

  if (Object.keys(fields).length === 0) {
    throw new UserServiceError("At least one updatable field must be provided.", {
      code: "EMPTY_PAYLOAD",
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
        `The server rejected the request (status ${status}).`;

      return new UserServiceError(serverMessage, {
        status,
        code: "HTTP_ERROR",
        cause: error,
      });
    }

    if (request) {
      const isTimeout = error.code === "ECONNABORTED";
      return new UserServiceError(
        isTimeout
          ? "The request timed out. Please try again."
          : "Network error: the server could not be reached. Check your connection.",
        { code: isTimeout ? "TIMEOUT" : "NETWORK_ERROR", cause: error }
      );
    }

    return new UserServiceError("The request could not be sent.", {
      code: "REQUEST_SETUP_ERROR",
      cause: error,
    });
  }

  return new UserServiceError("Unexpected error while updating the user.", {
    code: "UNEXPECTED_ERROR",
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
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
};