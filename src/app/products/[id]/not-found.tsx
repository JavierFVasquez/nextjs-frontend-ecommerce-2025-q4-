import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ProductNotFound(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">Producto no encontrado</h1>
      <p className="mb-8 text-muted-foreground">
        El producto que buscas no existe o ha sido eliminado.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Link>
      </Button>
    </div>
  );
}

