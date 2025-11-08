import { QueryClient } from '@tanstack/react-query';

interface ErrorWithStatus {
  status: number;
}

function isErrorWithStatus(error: unknown): error is ErrorWithStatus {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as ErrorWithStatus).status === 'number'
  );
}

export const queryConfig = {
  queries: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: (failureCount: number, error: unknown): boolean => {
      if (isErrorWithStatus(error)) {
        const status = error.status;
        if (status === 404 || status === 401) {
          return false;
        }
      }
      return failureCount < 2;
    },
  },
};

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

export const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (page: number) =>
      [...queryKeys.products.lists(), { page }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  inventory: {
    all: ['inventory'] as const,
    detail: (productId: string) =>
      [...queryKeys.inventory.all, productId] as const,
  },
};
