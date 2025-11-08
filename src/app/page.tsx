import { ProductGrid } from '@/components/product-grid';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
      </div>
      <ProductGrid />
    </div>
  );
}
