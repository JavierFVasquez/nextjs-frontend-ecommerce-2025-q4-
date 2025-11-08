'use client';

import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import type { Product } from '@/lib/schemas';
import { getProducts } from '@/lib/api/products';
import { queryKeys } from '@/lib/query-client';

const PAGE_SIZE = 8;

interface ProductsResponse {
  products: Product[];
  meta?: {
    total?: number;
    page?: {
      number?: number;
      size?: number;
      total?: number;
    };
  };
}

export function useProducts(): UseInfiniteQueryResult<InfiniteData<ProductsResponse, number>, Error> {
  return useInfiniteQuery<
    ProductsResponse,
    Error,
    InfiniteData<ProductsResponse, number>,
    readonly string[],
    number
  >({
    queryKey: queryKeys.products.lists(),
    queryFn: ({ pageParam }) => {
      return getProducts({ page: pageParam, size: PAGE_SIZE });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage.meta?.page?.total ?? 0;
      const pagesLoaded = allPages.length;
      const totalPages = Math.ceil(totalItems / PAGE_SIZE);

      // Si ya cargamos todas las páginas o no hay productos, no hay más
      if (pagesLoaded >= totalPages || lastPage.products.length === 0) {
        return undefined;
      }

      const nextPage = pagesLoaded + 1;
      return nextPage;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
