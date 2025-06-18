import { Routes, Route, Navigate } from 'react-router-dom';
import LangRouter from './LangRouter';
import App from './App';

export default function MainRoutes() {
  return (
    <Routes>
      {/* Redirect / to /en */}
      <Route path="/" element={<Navigate to="/en" replace />} />
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
