import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/footer/Footer';

describe('Footer', () => {
  it('should render the footer element', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render the brand name', () => {
    render(<Footer />);

    expect(screen.getByText('VALHALLA DEL CHATARRERO')).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/Built from the Wreckage/i)).toBeInTheDocument();
  });

  it('should have the footer class', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('.footerContainer')).toBeInTheDocument();
  });
});
