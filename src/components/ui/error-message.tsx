import { AlertCircle } from 'lucide-react';
import { Button } from './button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
}: ErrorMessageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div>
        <h3 className="mb-2 text-lg font-semibold text-destructive">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Reintentar
        </Button>
      )}
    </div>
  );
}

