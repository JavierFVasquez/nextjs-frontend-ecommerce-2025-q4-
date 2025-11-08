import { z } from 'zod';

/**
 * JSON:API Response Types
 */
export interface JsonApiResource<T> {
  id: string;
  type: string;
  attributes: T;
}

export interface JsonApiResponse<T> {
  data: JsonApiResource<T> | JsonApiResource<T>[];
  meta?: {
    total?: number;
    page?: {
      number?: number;
      size?: number;
      total?: number;
    };
  };
}

/**
 * Product Types
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number | string; // API puede devolver como string o number
  images?: string[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Inventory Types
 */
export interface Inventory {
  id: string;
  productId?: string;
  quantity: number;
  product?: Product;
  created_at?: string;
  updated_at?: string;
}

/**
 * Pagination Types
 */
export interface PaginationParams {
  page?: number;
  size?: number;
}

/**
 * Form Validation Schemas
 */
export const purchaseSchema = z.object({
  quantity: z.coerce
    .number({
      required_error: 'La cantidad es requerida',
      invalid_type_error: 'La cantidad debe ser un número',
    })
    .int('La cantidad debe ser un número entero')
    .min(1, 'La cantidad mínima es 1')
    .positive('La cantidad debe ser mayor a 0'),
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;

