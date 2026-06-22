type SupportedLanguage = 'en' | 'pt';

function normalizeLanguage(value?: string | null): SupportedLanguage | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized.startsWith('pt')) {
    return 'pt';
  }

  if (normalized.startsWith('en')) {
    return 'en';
  }

  return null;
}

export function detectPreferredLanguage(): SupportedLanguage {
  if (typeof window !== 'undefined') {
    try {
      const storedLang = normalizeLanguage(window.localStorage.getItem('portfolio.lang'));
      if (storedLang) {
        return storedLang;
      }
    } catch {
      // Ignore localStorage errors and continue to browser preference.
    }

    const browserLang = normalizeLanguage(window.navigator.language);
    if (browserLang) {
      return browserLang;
    }
  }

  return 'en';
}
