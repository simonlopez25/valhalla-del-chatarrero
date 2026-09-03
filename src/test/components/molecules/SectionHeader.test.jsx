import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from '../../../components/molecules/sectionHeader/SectionHeader';

describe('SectionHeader', () => {
  it('should render the category text', () => {
    render(
      <SectionHeader
        category="TEST CATEGORY"
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('TEST CATEGORY')).toBeInTheDocument();
  });

  it('should render the title as h1', () => {
    render(
      <SectionHeader
        category="CAT"
        title="Main Title"
        description="Desc"
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
  });

  it('should render the description as paragraph', () => {
    render(
      <SectionHeader
        category="CAT"
        title="Title"
        description="A detailed description"
      />
    );

    expect(screen.getByText('A detailed description')).toBeInTheDocument();
  });

  it('should have the sectionHeaderWithAccent class', () => {
    const { container } = render(
      <SectionHeader category="CAT" title="Title" description="Desc" />
    );

    expect(container.querySelector('.sectionHeaderWithAccent')).toBeInTheDocument();
  });
});
