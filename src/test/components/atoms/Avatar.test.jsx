import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from '../../../components/atoms/avatar/Avatar';

describe('Avatar', () => {
  it('should render an image with the given src and alt', () => {
    render(<Avatar imageSrc="https://example.com/avatar.jpg" imageAlt="User Avatar" />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'User Avatar');
  });

  it('should have the avatar class on the container', () => {
    const { container } = render(<Avatar imageSrc="test.jpg" imageAlt="Test" />);

    expect(container.querySelector('.avatar')).toBeInTheDocument();
  });

  it('should have the avatarImage class on the img element', () => {
    render(<Avatar imageSrc="test.jpg" imageAlt="Test" />);

    const img = screen.getByRole('img');
    expect(img.className).toContain('avatarImage');
  });
});
