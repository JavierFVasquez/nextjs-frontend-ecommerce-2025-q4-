'use client';

import { useEffect } from 'react';
import { ErrorMessage } from '@/components/ui/error-message';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <ErrorMessage
        title="Ocurrió un error"
        message={error.message || 'Error inesperado'}
        onRetry={reset}
      />
    </div>
  );
}
