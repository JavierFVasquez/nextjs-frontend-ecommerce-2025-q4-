import { ProductGridSkeleton } from '@/components/product-skeleton';

export default function Loading(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="h-9 w-32 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}
