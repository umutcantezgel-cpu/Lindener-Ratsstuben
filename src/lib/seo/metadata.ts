import { ACTIVE_LOCALES } from '@/lib/locales';

export function getAlternates(locale: string, path: string = '') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Create languages object mapping each locale to its specific path
  const languages = ACTIVE_LOCALES.reduce((acc, l) => {
    acc[l] = `/${l}${cleanPath ? `/${cleanPath}` : ''}`;
    return acc;
  }, {} as Record<string, string>);

  // Add x-default pointing to the default language (or root if it handles redirection)
  languages['x-default'] = `/de${cleanPath ? `/${cleanPath}` : ''}`;

  return {
    canonical: `/${locale}${cleanPath ? `/${cleanPath}` : ''}`,
    languages,
  };
}
