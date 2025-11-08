'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Product } from '@/lib/schemas';
import { getProductById } from '@/lib/api/products';
import { queryKeys } from '@/lib/query-client';

export function useProductDetail(id: string): UseQueryResult<Product, Error> {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}
