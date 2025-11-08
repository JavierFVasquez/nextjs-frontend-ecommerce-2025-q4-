'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import type { Inventory } from '@/lib/schemas';
import { getInventory, updateInventory } from '@/lib/api/inventory';
import { queryKeys } from '@/lib/query-client';
import { toast } from 'sonner';

export function useInventory(productId: string): UseQueryResult<Inventory, Error> {
  return useQuery({
    queryKey: queryKeys.inventory.detail(productId),
    queryFn: () => getInventory(productId),
    enabled: !!productId,
  });
}

export function useUpdateInventory(productId: string): UseMutationResult<Inventory, Error, number> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quantity: number) => updateInventory(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.detail(productId),
      });
      toast.success('Compra realizada exitosamente');
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Error al realizar la compra');
    },
  });
}
