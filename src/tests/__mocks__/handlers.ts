import { http, HttpResponse } from 'msw';

const PRODUCTS_API_BASE = 'http://localhost:8080/products';
const INVENTORY_API_BASE = 'http://localhost:8080/inventory';

interface MockProduct {
  type: string;
  id: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    images: string[];
    created_at: string;
    updated_at: string;
  };
}

interface PurchaseRequestBody {
  quantity_delta: number;
}

// Generate mock products for testing pagination
const generateMockProducts = (
  page: number,
  size: number,
  total: number
): MockProduct[] => {
  const start = (page - 1) * size;
  const end = Math.min(start + size, total);
  const products: MockProduct[] = [];

  for (let i = start; i < end; i++) {
    const productId = i + 1;
    // Products with even IDs have multiple images to test carousel
    const images =
      productId % 2 === 0
        ? [
            `https://example.com/image${productId}-1.jpg`,
            `https://example.com/image${productId}-2.jpg`,
            `https://example.com/image${productId}-3.jpg`,
          ]
        : [`https://example.com/image${productId}.jpg`];

    products.push({
      type: 'products',
      id: `${productId}`,
      attributes: {
        name: `Test Product ${productId}`,
        description: `Test description ${productId}`,
        price: 99.99 + i * 10,
        images,
        created_at: '2025-11-08T10:30:00',
        updated_at: '2025-11-08T10:30:00',
      },
    });
  }

  return products;
};

export const handlers = [
  http.get(`${PRODUCTS_API_BASE}`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const size = parseInt(url.searchParams.get('size') ?? '8', 10);
    const total = 25; // Total mock products

    return HttpResponse.json({
      data: generateMockProducts(page, size, total),
      meta: {
        page: {
          number: page,
          size,
          total,
        },
      },
    });
  }),

  http.get(`${PRODUCTS_API_BASE}/:id`, ({ params }) => {
    const { id } = params;
    const productId = parseInt(id as string, 10);
    // Products with even IDs have multiple images to test carousel
    const images =
      productId % 2 === 0
        ? [
            `https://example.com/image${id}-1.jpg`,
            `https://example.com/image${id}-2.jpg`,
            `https://example.com/image${id}-3.jpg`,
          ]
        : [`https://example.com/image${id}.jpg`];

    return HttpResponse.json({
      data: {
        type: 'products',
        id,
        attributes: {
          name: `Test Product ${id}`,
          description: `Test description ${id}`,
          price: 99.99,
          images,
          created_at: '2025-11-08T10:30:00',
          updated_at: '2025-11-08T10:30:00',
        },
      },
    });
  }),

  http.get(`${INVENTORY_API_BASE}/:productId`, ({ params }) => {
    const { productId } = params;
    const id = parseInt(productId as string, 10);
    // Products with even IDs have multiple images to test carousel
    const images =
      id % 2 === 0
        ? [
            `https://example.com/image${productId}-1.jpg`,
            `https://example.com/image${productId}-2.jpg`,
            `https://example.com/image${productId}-3.jpg`,
          ]
        : [`https://example.com/image${productId}.jpg`];

    return HttpResponse.json({
      data: {
        type: 'inventory',
        id: productId,
        attributes: {
          quantity: 100,
          product: {
            id: productId as string,
            name: `Test Product ${productId}`,
            description: `Test description ${productId}`,
            price: 99.99,
            images,
          },
          created_at: '2025-11-08T10:30:00',
          updated_at: '2025-11-08T10:30:00',
        },
      },
    });
  }),

  http.patch(
    `${INVENTORY_API_BASE}/:productId`,
    async ({ params, request }) => {
      const { productId } = params;
      const body = (await request.json()) as PurchaseRequestBody;

      return HttpResponse.json({
        data: {
          type: 'inventory',
          id: productId,
          attributes: {
            quantity: 100 + body.quantity_delta,
            created_at: '2025-11-08T10:30:00',
            updated_at: '2025-11-08T12:15:00',
          },
        },
      });
    }
  ),
];
