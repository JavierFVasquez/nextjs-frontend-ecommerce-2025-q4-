# Frontend E-commerce JSON:API

Modern e-commerce frontend built with Next.js 15, TypeScript, and TanStack Query, consuming JSON:API microservices.

## DEMO VIDEO 🎥
[JAM VIDEO](https://jam.dev/c/7e9ffd74-1dc8-4f91-b4bc-9a2963715cf3) 
[Jam Video.webm](https://github.com/user-attachments/assets/a67fae0b-8eff-429d-a896-8d3fc08f1d65)

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components, Node.js runtime)
- **Language**: TypeScript (strict mode)
- **State Management**: TanStack Query v5
- **UI Components**: shadcn/ui + Tailwind CSS
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl (Spanish)
- **Theme**: next-themes (dark/light mode)
- **Testing**: Vitest + Testing Library + MSW
- **Deployment**: Vercel

## Features

- Product listing with infinite scroll pagination
- Product detail pages with inventory information
- Purchase form with validation
- Real-time inventory updates
- Dark/light mode
- Fully responsive design
- Error handling and loading states
- Spanish localization

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_PRODUCTS_API_BASE=https://your-api.com/products
NEXT_PUBLIC_INVENTORY_API_BASE=https://your-api.com/inventory
NEXT_PUBLIC_API_KEY=your-api-key
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Build

```bash
npm run build
npm start
```

## Linting & Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui base components
│   ├── product-card.tsx   # Product card component
│   ├── product-grid.tsx   # Product grid with infinite scroll
│   ├── inventory-info.tsx # Inventory display
│   └── purchase-form.tsx  # Purchase form
├── hooks/                  # Custom React hooks
│   ├── useProducts.ts     # Product listing hook
│   ├── useProductDetail.ts # Product detail hook
│   ├── useInventory.ts    # Inventory hook
│   └── usePurchase.ts     # Purchase mutation hook
├── lib/                    # Utilities and configurations
│   ├── api/               # API client layer
│   │   ├── client.ts      # JSON:API fetch wrapper
│   │   ├── products.ts    # Products API
│   │   └── inventory.ts   # Inventory API
│   ├── schemas.ts         # Zod validation schemas
│   ├── query-client.ts    # TanStack Query configuration
│   └── utils.ts           # Utility functions
├── providers/              # React context providers
├── i18n/                   # Internationalization
└── tests/                  # Test files
```

## API Integration

This frontend consumes JSON:API compliant microservices with the following structure:

```json
{
  "data": {
    "type": "products",
    "id": "1",
    "attributes": {
      "name": "Product Name",
      "description": "Description",
      "price": 99.99
    }
  },
  "meta": {
    "page": {
      "number": 1,
      "size": 10,
      "total": 100
    }
  }
}
```

All requests include `x-api-key` header for authentication.

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The project is configured with `output: 'standalone'` for optimized deployment.

## License

MIT

