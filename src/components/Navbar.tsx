import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Menu } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import logo from "../assets/mg-mark.svg";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const SOCIAL_ITEMS = [
    {
        href: "https://www.linkedin.com/in/matheus-gomes-98823b185",
        label: "LinkedIn",
        icon: FaLinkedin,
    },
    {
        href: "https://github.com/mudouasenha",
        label: "GitHub",
        icon: FaGithub,
    },
];

const DEFAULT_MOTION_DURATION_MEDIUM = 0.45;
const DEFAULT_MOTION_EASE_STANDARD: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const getMotionDurationMedium = () => {
    if (typeof window === "undefined") {
        return DEFAULT_MOTION_DURATION_MEDIUM;
    }

    const tokenValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--motion-duration-medium")
        .trim();
    const parsedValue = Number.parseFloat(tokenValue);

    if (!Number.isFinite(parsedValue)) {
        return DEFAULT_MOTION_DURATION_MEDIUM;
    }

    return tokenValue.endsWith("ms") ? parsedValue / 1000 : parsedValue;
};

const getMotionEaseStandard = (): [number, number, number, number] => {
    if (typeof window === "undefined") {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    const tokenValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--motion-ease-standard")
        .trim();

    if (!tokenValue.startsWith("cubic-bezier(") || !tokenValue.endsWith(")")) {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    const segments = tokenValue
        .slice("cubic-bezier(".length, -1)
        .split(",")
        .map((segment) => Number.parseFloat(segment.trim()));

    if (segments.length !== 4 || segments.some((segment) => !Number.isFinite(segment))) {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    return [segments[0], segments[1], segments[2], segments[3]];
};

const Navbar = () => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const motionDurationMedium = getMotionDurationMedium();
    const motionEaseStandard = getMotionEaseStandard();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = [
        { href: "#about", label: t("aboutNav") },
        { href: "#experience", label: t("experience") },
        { href: "#projects", label: t("projects") },
        { href: "#technologies", label: t("technologies") },
        { href: "#skills", label: t("skillsTitle") },
        { href: "#certifications", label: t("certificationsTitle") },
        { href: "#contact", label: t("getInTouch") },
    ];

    useMotionValueEvent(scrollY, "change", (value) => {
        if (reduceMotion) {
            setIsScrolled(false);
            return;
        }
        setIsScrolled(value > 20);
    });

    return (
        <motion.header
            initial={reduceMotion ? { opacity: 1 } : { y: -10, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: motionDurationMedium, ease: motionEaseStandard }}
            className={`sticky top-0 z-40 mb-14 border-b border-border/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 ${
                isScrolled
                    ? "bg-background/95 shadow-[0_20px_60px_-40px_rgba(31,38,56,0.45)]"
                    : "bg-background/80"
            }`}
        >
            <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 xl:px-8">
                <a href="#top" className="flex min-w-0 flex-shrink items-center gap-2.5">
                    <img
                        className="h-10 w-10 flex-none object-contain"
                        src={logo}
                        alt="Matheus Gomes logo"
                    />
                    <div className="hidden min-w-0 sm:block">
                        <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-foreground sm:text-sm sm:tracking-[0.2em]">
                            Matheus Gomes
                        </p>
                        <p className="hidden max-w-[11rem] truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground lg:block xl:max-w-[15rem] xl:text-[11px] xl:tracking-[0.18em]">
                            {t("navigation.role")}
                        </p>
                    </div>
                </a>

                <div className="hidden min-w-0 flex-1 items-center justify-center px-4 xl:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="flex-wrap justify-center gap-1">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink asChild>
                                        <a
                                            href={item.href}
                                            className="whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-card/80 hover:text-foreground 2xl:px-3 2xl:text-xs 2xl:tracking-[0.16em]"
                                        >
                                            {item.label}
                                        </a>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden items-center gap-2 xl:flex">
                    {SOCIAL_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Button key={item.href} variant="ghost" size="icon-sm" asChild className="rounded-full">
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${item.label} (opens in a new tab)`}
                                >
                                    <Icon className="size-4" />
                                </a>
                            </Button>
                        );
                    })}
                    <LanguageSwitcher />
                    <Button asChild size="sm" className="rounded-full px-4">
                        <a href="#contact">{t("navigation.cta")}</a>
                    </Button>
                </div>

                <div className="flex items-center gap-2 xl:hidden">
                    <LanguageSwitcher />
                    <Button asChild size="sm" className="hidden rounded-full px-3 sm:inline-flex lg:px-4">
                        <a href="#contact">{t("navigation.cta")}</a>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon-sm" className="rounded-full" aria-label="Open navigation menu">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[min(22rem,100vw)]">
                            <SheetHeader>
                                <SheetTitle>{t("navigation.menu")}</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-4 pb-3">
                                {navItems.map((item) => (
                                    <SheetClose key={item.href} asChild>
                                        <a
                                            href={item.href}
                                            className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {item.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </div>
                            <div className="px-4 pb-4">
                                <SheetClose asChild>
                                    <Button asChild className="w-full rounded-full">
                                        <a href="#contact">{t("navigation.cta")}</a>
                                    </Button>
                                </SheetClose>
                            </div>
                            <div className="mt-auto border-t border-border px-4 pb-4 pt-4">
                                <div className="grid grid-cols-2 gap-2">
                                {SOCIAL_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                            <Button key={item.href} variant="ghost" size="icon-sm" asChild className="rounded-full">
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${item.label} (opens in a new tab)`}
                                                >
                                                    <Icon className="size-4" />
                                                </a>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </motion.header>
    );
};

export default Navbar;
