import { jsonApiFetch } from './client';
import type { Inventory, JsonApiResource } from '../schemas';

/**
 * Get the Inventory API base URL from environment variable
 * Falls back to localhost for development with v1 API versioning
 */
const INVENTORY_API_BASE =
  process.env.NEXT_PUBLIC_INVENTORY_API_BASE ?? 'http://localhost:8080/api/v1/inventory';

export async function getInventory(productId: string): Promise<Inventory> {
  const response = await jsonApiFetch<Inventory>(
    `${INVENTORY_API_BASE}/${productId}`
  );

  const data = response.data as JsonApiResource<Inventory>;

  return {
    ...data.attributes,
    id: data.id || productId,
    productId,
  };
}

export async function updateInventory(
  productId: string,
  quantityDelta: number
): Promise<Inventory> {
  const response = await jsonApiFetch<Inventory>(
    `${INVENTORY_API_BASE}/${productId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        quantity_delta: quantityDelta,
      }),
    }
  );

  const data = response.data as JsonApiResource<Inventory>;

  return {
    ...data.attributes,
    id: data.id || productId,
    productId,
  };
}
