import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query-client';
import { useProducts } from '@/hooks/useProducts';

const createWrapper = (): React.FC<{ children: React.ReactNode }> => {
  const queryClient = makeQueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryWrapper';
  return Wrapper;
};

describe('useProducts', () => {
  it('should fetch products successfully', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0].products).toHaveLength(8);
    expect(result.current.data?.pages[0].products[0].name).toBe(
      'Test Product 1'
    );
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});

