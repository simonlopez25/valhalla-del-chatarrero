import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SystemLog from '../../../components/organisms/systemLog/SystemLog';

describe('SystemLog', () => {
  it('should render the system log section', () => {
    render(<SystemLog />);

    expect(screen.getByText(/REGISTRO DE SUBSISTEMA/i)).toBeInTheDocument();
  });

  it('should render log entries', () => {
    render(<SystemLog />);

    expect(screen.getByText(/Inicializando protocolo/i)).toBeInTheDocument();
  });

  it('should have the systemLog class', () => {
    const { container } = render(<SystemLog />);

    expect(container.querySelector('.logWrapper')).toBeInTheDocument();
  });
});
