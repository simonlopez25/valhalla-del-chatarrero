import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../../../components/molecules/confirmDialog/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('should render the message', () => {
    render(
      <ConfirmDialog message="Are you sure?" onConfirm={() => {}} onCancel={() => {}} />
    );

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should render confirm and cancel buttons', () => {
    render(
      <ConfirmDialog message="Test" onConfirm={() => {}} onCancel={() => {}} />
    );

    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmDialog message="Test" onConfirm={handleConfirm} onCancel={() => {}} />
    );

    fireEvent.click(screen.getByText('Eliminar'));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(
      <ConfirmDialog message="Test" onConfirm={() => {}} onCancel={handleCancel} />
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('should render in a portal (document.body)', () => {
    render(
      <ConfirmDialog message="Test" onConfirm={() => {}} onCancel={() => {}} />
    );

    expect(document.body.querySelector('.ConfirmDialogOverlay')).toBeInTheDocument();
  });
});
