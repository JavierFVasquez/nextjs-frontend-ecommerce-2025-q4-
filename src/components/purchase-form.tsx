'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePurchase } from '@/hooks/usePurchase';
import { purchaseSchema, type PurchaseFormData } from '@/lib/schemas';

interface PurchaseFormProps {
  productId: string;
  availableQuantity: number;
}

export function PurchaseForm({
  productId,
  availableQuantity,
}: PurchaseFormProps): JSX.Element {
  const { mutate: purchase, isPending } = usePurchase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
  });

  const onSubmit = (data: PurchaseFormData): void => {
    const quantity =
      typeof data.quantity === 'string'
        ? parseInt(data.quantity, 10)
        : data.quantity;

    if (quantity > availableQuantity) {
      return;
    }

    purchase(
      { productId, quantity },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const isOutOfStock = availableQuantity === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="quantity">Cantidad</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max={availableQuantity}
          placeholder="Ingrese cantidad"
          disabled={isOutOfStock || isPending}
          {...register('quantity')}
        />
        {errors.quantity && (
          <p className="text-sm text-destructive">{errors.quantity.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isOutOfStock || isPending}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isPending ? 'Procesando...' : 'Comprar'}
      </Button>

      {isOutOfStock && (
        <p className="text-center text-sm text-muted-foreground">
          Producto sin stock disponible
        </p>
      )}
    </form>
  );
}
