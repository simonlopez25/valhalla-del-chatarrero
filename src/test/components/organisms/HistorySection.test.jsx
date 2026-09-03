import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HistorySection from '../../../components/organisms/historySection/HistorySection';

describe('HistorySection', () => {
  it('should render the history section', () => {
    render(<HistorySection />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render the history title', () => {
    render(<HistorySection />);

    expect(screen.getByText(/NUESTRA HISTORIA/i)).toBeInTheDocument();
  });

  it('should render the history content', () => {
    render(<HistorySection />);

    expect(screen.getByText(/Valhalla del Chatarrero/i)).toBeInTheDocument();
  });

  it('should have the historySection class', () => {
    const { container } = render(<HistorySection />);

    expect(container.querySelector('.historyComp')).toBeInTheDocument();
  });
});
