import { Routes, Route, Navigate } from 'react-router-dom';
import LangRouter from './LangRouter';
import App from './App';
import { detectPreferredLanguage } from './features/i18n/detectPreferredLanguage';

export default function MainRoutes() {
  return (
    <Routes>
      {/* Redirect / to detected language route */}
      <Route path="/" element={<Navigate to={`/${detectPreferredLanguage()}`} replace />} />
      {/* Main language routes */}
      <Route path=":lang/*" element={
        <LangRouter>
          <App />
        </LangRouter>
      } />
      {/* Fallback: redirect anything else to /en */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
