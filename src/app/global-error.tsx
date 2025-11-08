'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Algo salió mal</h2>
            <button
              onClick={() => reset()}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
