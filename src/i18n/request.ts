import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale for now, or you can extend this with routing
  const locale = 'es';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

