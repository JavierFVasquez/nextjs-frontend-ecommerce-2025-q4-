'use client';

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import type { Inventory } from '@/lib/schemas';
import { updateInventory } from '@/lib/api/inventory';
import { queryKeys } from '@/lib/query-client';
import { toast } from 'sonner';

interface PurchaseParams {
  productId: string;
  quantity: number;
}

export function usePurchase(): UseMutationResult<Inventory, Error, PurchaseParams> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: PurchaseParams) => {
      const currentInventory = await queryClient.fetchQuery<Inventory>({
        queryKey: queryKeys.inventory.detail(productId),
      });

      const newQuantity = currentInventory.quantity - quantity;

      if (newQuantity < 0) {
        throw new Error('Stock insuficiente');
      }

      return updateInventory(productId, -quantity);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.detail(variables.productId),
      });
      toast.success('Compra realizada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Error al realizar la compra');
    },
  });
}
