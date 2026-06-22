import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const currentLanguageCode = i18n.resolvedLanguage ?? i18n.language;
    const activeCode = LANGUAGES.some((lang) => lang.code === currentLanguageCode)
        ? currentLanguageCode
        : LANGUAGES[0].code;

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem("portfolio.lang", langCode);

        const segments = location.pathname.split("/");
        if (segments[1] && LANGUAGES.some((lang) => lang.code === segments[1])) {
            segments[1] = langCode;
        } else {
            segments.splice(1, 0, langCode);
        }

        navigate(segments.join("/") + location.search, { replace: true });
    };

    return (
        <div className="inline-flex items-center rounded-full border border-border/80 bg-background/90 p-0.5 shadow-xs">
            {LANGUAGES.map((lang) => {
                const isActive = activeCode === lang.code;
                return (
                    <Button
                        key={lang.code}
                        type="button"
                        variant={isActive ? "default" : "ghost"}
                        size="xs"
                        className="h-7 rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-pressed={isActive}
                        aria-label={`Switch language to ${lang.label}`}
                    >
                        <span>{lang.label}</span>
                    </Button>
                );
            })}
        </div>
    );
};
