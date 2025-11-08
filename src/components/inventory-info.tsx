'use client';

import { Package, AlertCircle, CheckCircle } from 'lucide-react';
import type { Inventory } from '@/lib/schemas';
import { cn } from '@/lib/utils';

interface InventoryInfoProps {
  inventory: Inventory;
  className?: string;
}

type StatusVariant = 'success' | 'warning' | 'error';

interface StatusInfo {
  label: string;
  variant: StatusVariant;
}

export function InventoryInfo({
  inventory,
  className,
}: InventoryInfoProps): JSX.Element {
  const quantity = inventory.quantity;

  const getStatus = (): StatusInfo => {
    if (quantity === 0) {
      return { label: 'Sin stock', variant: 'error' };
    }
    if (quantity < 10) {
      return { label: 'Stock bajo', variant: 'warning' };
    }
    return { label: 'En stock', variant: 'success' };
  };

  const status = getStatus();

  const variantStyles: Record<StatusVariant, string> = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  const Icon =
    status.variant === 'success'
      ? CheckCircle
      : status.variant === 'warning'
        ? AlertCircle
        : Package;

  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <div className="mb-2 flex items-center gap-2">
        <Package className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Inventario</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Cantidad disponible:
          </span>
          <span className="text-lg font-bold">{quantity}</span>
        </div>
        <div
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium',
            variantStyles[status.variant]
          )}
        >
          <Icon className="h-4 w-4" />
          {status.label}
        </div>
      </div>
    </div>
  );
}
