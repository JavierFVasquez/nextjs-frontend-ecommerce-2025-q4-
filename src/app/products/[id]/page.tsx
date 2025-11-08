'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useInventory } from '@/hooks/useInventory';
import { InventoryInfo } from '@/components/inventory-info';
import { PurchaseForm } from '@/components/purchase-form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { ImageCarousel } from '@/components/image-carousel';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps): JSX.Element {
  const { id } = use(params);
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isProductError,
    error: productError,
    refetch: refetchProduct,
  } = useProductDetail(id);

  const {
    data: inventory,
    isLoading: isLoadingInventory,
    isError: isInventoryError,
    error: inventoryError,
    refetch: refetchInventory,
  } = useInventory(id);

  if (isLoadingProduct || isLoadingInventory) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isProductError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <ErrorMessage
          message={productError?.message || 'Error al cargar el producto'}
          onRetry={() => refetchProduct()}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <ErrorMessage message="Producto no encontrado" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <ImageCarousel
            images={
              product.images && product.images.length > 1
                ? product.images
                : [product.images?.[0]]
            }
            alt={product.name}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          {isInventoryError ? (
            <ErrorMessage
              message={inventoryError?.message || 'Error al cargar inventario'}
              onRetry={() => refetchInventory()}
            />
          ) : inventory ? (
            <>
              <InventoryInfo inventory={inventory} />
              <Card>
                <CardHeader>
                  <CardTitle>Realizar compra</CardTitle>
                </CardHeader>
                <CardContent>
                  <PurchaseForm
                    productId={id}
                    availableQuantity={inventory.quantity}
                  />
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
