import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import History from '../../pages/history/History';

describe('History', () => {
  it('should render the history page', () => {
    const { container } = render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    expect(container.querySelector('.historyPage')).toBeInTheDocument();
  });

  it('should render the history section', () => {
    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    expect(screen.getByText(/NUESTRA HISTORIA/i)).toBeInTheDocument();
  });

  it('should have the historyPage class', () => {
    const { container } = render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    expect(container.querySelector('.historyPage')).toBeInTheDocument();
  });
});
