'use client';

import { useEffect } from 'react';
import { ErrorMessage } from '@/components/ui/error-message';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <ErrorMessage
        title="Error al cargar el producto"
        message={error.message ?? 'Error inesperado'}
        onRetry={reset}
      />
      <Button variant="outline" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
}

