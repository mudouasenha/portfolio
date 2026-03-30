import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const LANGUAGES = [
    { code: "en", flag: "🇺🇸", label: "EN" },
    { code: "pt", flag: "🇧🇷", label: "PT" },
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
        <div className="inline-flex items-center rounded-lg border border-border bg-background p-0.5">
            {LANGUAGES.map((lang) => {
                const isActive = activeCode === lang.code;
                return (
                    <Button
                        key={lang.code}
                        type="button"
                        variant={isActive ? "default" : "ghost"}
                        size="xs"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-pressed={isActive}
                        aria-label={`Switch language to ${lang.label}`}
                    >
                        <span aria-hidden="true">{lang.flag}</span>
                        <span>{lang.label}</span>
                    </Button>
                );
            })}
        </div>
    );
};
