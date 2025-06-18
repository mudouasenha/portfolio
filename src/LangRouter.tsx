import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['en', 'pt'];

export default function LangRouter({ children }: { children: React.ReactNode }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang).then(() => setReady(true));
      } else {
        setReady(true);
      }
    } else {
      setReady(false);
    }
  }, [lang, i18n]);

  if (!lang || !SUPPORTED_LANGS.includes(lang)) {
    const rest = location.pathname.split('/').slice(2).join('/');
    return <Navigate to={`/en${rest ? '/' + rest : ''}${location.search}`} replace />;
  }

  if (!ready) {
    // Optionally, show a loading spinner here
    return null;
  }

  return <>{children}</>;
}
