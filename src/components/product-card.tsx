import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/schemas';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {product.name}
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <p className="text-xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
