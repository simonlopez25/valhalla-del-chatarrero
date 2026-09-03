import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    put: vi.fn(),
    isCancel: vi.fn(() => false),
    isAxiosError: vi.fn(() => false),
  },
}));

import { updateUser, UserServiceError } from '../../../services/updateUserService';

describe('updateUserService - UserServiceError', () => {
  it('should create an error with message, status, and code', () => {
    const error = new UserServiceError('Test error', {
      status: 400,
      code: 'testCode',
    });

    expect(error.message).toBe('Test error');
    expect(error.status).toBe(400);
    expect(error.code).toBe('testCode');
    expect(error.name).toBe('UserServiceError');
  });

  it('should create an error with default values', () => {
    const error = new UserServiceError('Test error');

    expect(error.message).toBe('Test error');
    expect(error.status).toBeNull();
    expect(error.code).toBe('userServiceError');
  });

  it('should set cause when provided', () => {
    const cause = new Error('Original error');
    const error = new UserServiceError('Wrapped error', { cause });

    expect(error.cause).toBe(cause);
  });
});

describe('updateUserService - updateUser validation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should throw UserServiceError for missing user ID', async () => {
    await expect(updateUser(null, { name: 'Test' }))
      .rejects.toThrow('Se requiere un ID de usuario válido.');
  });

  it('should throw UserServiceError for empty string ID', async () => {
    await expect(updateUser('', { name: 'Test' }))
      .rejects.toThrow('Se requiere un ID de usuario válido.');
  });

  it('should throw UserServiceError for non-numeric ID', async () => {
    await expect(updateUser('abc', { name: 'Test' }))
      .rejects.toThrow('El ID de usuario debe ser un número entero positivo.');
  });

  it('should throw UserServiceError for negative ID', async () => {
    await expect(updateUser(-1, { name: 'Test' }))
      .rejects.toThrow('El ID de usuario debe ser un número entero positivo.');
  });

  it('should throw UserServiceError for zero ID', async () => {
    await expect(updateUser(0, { name: 'Test' }))
      .rejects.toThrow('El ID de usuario debe ser un número entero positivo.');
  });

  it('should throw UserServiceError for invalid payload', async () => {
    await expect(updateUser(1, null))
      .rejects.toThrow('Los datos de actualización deben ser un objeto válido.');
  });

  it('should throw UserServiceError for array payload', async () => {
    await expect(updateUser(1, []))
      .rejects.toThrow('Los datos de actualización deben ser un objeto válido.');
  });

  it('should throw UserServiceError for empty payload', async () => {
    await expect(updateUser(1, {}))
      .rejects.toThrow('Se debe proporcionar al menos un campo actualizable.');
  });

  it('should throw UserServiceError for invalid name', async () => {
    await expect(updateUser(1, { name: '' }))
      .rejects.toThrow('El nombre de usuario debe ser un texto que no esté vacío.');
  });

  it('should throw UserServiceError for whitespace-only name', async () => {
    await expect(updateUser(1, { name: '   ' }))
      .rejects.toThrow('El nombre de usuario debe ser un texto que no esté vacío.');
  });

  it('should throw UserServiceError for invalid email', async () => {
    await expect(updateUser(1, { email: 'invalid-email' }))
      .rejects.toThrow('La dirección de correo electrónico no es válida.');
  });

  it('should throw UserServiceError for invalid role', async () => {
    await expect(updateUser(1, { role: 'superadmin' }))
      .rejects.toThrow('El rol debe ser uno de los siguientes: admin, customer.');
  });

  it('should throw UserServiceError for empty avatar', async () => {
    await expect(updateUser(1, { avatar: '' }))
      .rejects.toThrow('El avatar debe ser una URL de texto válida y no vacía.');
  });

  it('should throw UserServiceError for short password', async () => {
    await expect(updateUser(1, { password: '123' }))
      .rejects.toThrow('La contraseña debe tener al menos 6 caracteres.');
  });
});
