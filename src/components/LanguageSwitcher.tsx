import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Split the path and replace the first segment with the new language code
    const segments = location.pathname.split('/');
    if (segments[1] && LANGUAGES.some(l => l.code === segments[1])) {
      segments[1] = langCode;
    } else {
      segments.splice(1, 0, langCode);
    }
    navigate(segments.join('/') + location.search, { replace: true });
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 px-2 py-1 rounded border-purple-400 border bg-neutral-900 text-neutral-200 text-sm hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all duration-150"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul className="absolute right-0 z-10 mt-1 w-24 bg-neutral-900 border border-purple-400 rounded shadow-lg animate-fade-in" role="listbox">
          {LANGUAGES.map(lang => (
            <li
              key={lang.code}
              className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm hover:bg-neutral-800 rounded transition-colors duration-100 ${i18n.language === lang.code ? 'font-bold text-purple-300' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              role="option"
              aria-selected={i18n.language === lang.code}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') { handleLanguageChange(lang.code); }}}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.15s ease; }
      `}</style>
    </div>
  );
};