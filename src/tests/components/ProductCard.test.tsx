import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/schemas';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 99.99,
  images: ['https://example.com/image.jpg'],
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should render without image', () => {
    const productWithoutImage = { ...mockProduct, images: undefined };
    render(<ProductCard product={productWithoutImage} />);

    expect(screen.getByText('No image')).toBeInTheDocument();
  });
});

