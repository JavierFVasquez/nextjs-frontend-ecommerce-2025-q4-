import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-commerce | Tienda Online',
  description: 'Plataforma moderna de comercio electrónico',
  icons: {
    icon: '/favicon.svg',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<JSX.Element> {
  const messages = await getMessages();

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-xl font-bold">
                      Javier&apos;s E-commerce
                    </h1>
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1">
                  <div className="container py-6">{children}</div>
                </main>
                <footer className="border-t py-6">
                  <div className="container text-center text-sm text-muted-foreground">
                    © 2025 E-commerce. Todos los derechos reservados.
                  </div>
                </footer>
              </div>
              <Toaster richColors position="top-right" />
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
