import { jsonApiFetch } from './client';
import type { Product, PaginationParams, JsonApiResource } from '../schemas';

const PRODUCTS_API_BASE =
  process.env.NEXT_PUBLIC_PRODUCTS_API_BASE ??
  'http://localhost:8080/products';

interface GetProductsResponse {
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

export async function getProducts(
  params: PaginationParams = {}
): Promise<GetProductsResponse> {
  const { page = 1, size = 10 } = params;

  const response = await jsonApiFetch<Product>(PRODUCTS_API_BASE, {
    params: {
      page,
      size,
    },
  });

  const products = Array.isArray(response.data)
    ? response.data.map((item) => ({
        id: item.id || '',
        ...item.attributes,
      }))
    : [];

  return {
    products,
    meta: response.meta,
  };
}

export async function getProductById(id: string): Promise<Product> {
  const response = await jsonApiFetch<Product>(`${PRODUCTS_API_BASE}/${id}`);

  const data = response.data as JsonApiResource<Product>;

  return {
    id: data.id || id,
    ...data.attributes,
  };
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product> {
  const response = await jsonApiFetch<Product>(`${PRODUCTS_API_BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      data: {
        type: 'products',
        id,
        attributes: data,
      },
    }),
  });

  const responseData = response.data as JsonApiResource<Product>;

  return {
    id: responseData.id || id,
    ...responseData.attributes,
  };
}
