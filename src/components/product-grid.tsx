'use client';

import { useEffect, useRef } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './product-card';
import { ProductGridSkeleton } from './product-skeleton';
import { ErrorMessage } from './ui/error-message';
import { LoadingSpinner } from './ui/loading-spinner';

export function ProductGrid(): JSX.Element {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts();

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  // Scroll infinito con IntersectionObserver
  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;

    if (!currentLoadMoreRef || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        // Solo cargar si está visible, hay más páginas y no estamos cargando
        if (
          firstEntry &&
          firstEntry.isIntersecting &&
          hasNextPage &&
          !isFetchingRef.current
        ) {
          isFetchingRef.current = true;
          fetchNextPage().finally(() => {
            isFetchingRef.current = false;
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
      }
    );

    observer.observe(currentLoadMoreRef);

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || 'Error al cargar los productos'}
        onRetry={() => refetch()}
      />
    );
  }

  // Obtener productos de todas las páginas
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <p className="text-lg text-muted-foreground">
          No hay productos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Elemento centinela para infinite scroll */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      )}

      {/* Message when no more results */}
      {!hasNextPage && products.length > 0 && (
        <div className="flex justify-center py-8">
          <p className="text-sm text-muted-foreground">
            No hay más resultados
          </p>
        </div>
      )}
    </div>
  );
}
