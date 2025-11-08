import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query-client';
import { PurchaseForm } from '@/components/purchase-form';

const createWrapper = (): React.FC<{ children: React.ReactNode }> => {
  const queryClient = makeQueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryWrapper';
  return Wrapper;
};

describe('PurchaseForm', () => {
  it('should render form elements', () => {
    render(<PurchaseForm productId="1" availableQuantity={10} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument();
  });

  it('should disable form when out of stock', () => {
    render(<PurchaseForm productId="1" availableQuantity={0} />, {
      wrapper: createWrapper(),
    });

    const button = screen.getByRole('button', { name: /comprar/i });
    expect(button).toBeDisabled();
  });
});

