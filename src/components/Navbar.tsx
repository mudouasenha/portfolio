import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Menu } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import logo from "../assets/MgLogo.png";
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
    {
        href: "https://www.instagram.com/matheusmtgomes/",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        href: "https://x.com/MatheusmtgGomes",
        label: "X",
        icon: FaSquareXTwitter,
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
            className={`sticky top-0 z-40 mb-16 border-b backdrop-blur-sm supports-[backdrop-filter]:bg-background/75 ${
                isScrolled
                    ? "border-border/90 bg-background/95 shadow-sm"
                    : "border-border/70 bg-background/90"
            }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <a href="#top" className="flex flex-shrink-0 items-center gap-3">
                    <img className="h-10 w-10 rounded-md border border-border object-cover" src={logo} alt="Matheus Gomes logo" />
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-foreground">Matheus Gomes</p>
                        <p className="text-xs text-muted-foreground">{t("navigation.role")}</p>
                    </div>
                </a>

                <div className="hidden flex-1 items-center justify-center lg:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="gap-1">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink asChild>
                                        <a
                                            href={item.href}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </a>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                    {SOCIAL_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Button key={item.href} variant="ghost" size="icon-sm" asChild>
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
                    <Button asChild size="sm">
                        <a href="#contact">{t("navigation.cta")}</a>
                    </Button>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <LanguageSwitcher />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon-sm" aria-label="Open navigation menu">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[20rem]">
                            <SheetHeader>
                                <SheetTitle>{t("navigation.menu")}</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-4 pb-3">
                                {navItems.map((item) => (
                                    <SheetClose key={item.href} asChild>
                                        <a
                                            href={item.href}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {item.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </div>
                            <div className="px-4 pb-4">
                                <SheetClose asChild>
                                    <Button asChild className="w-full">
                                        <a href="#contact">{t("navigation.cta")}</a>
                                    </Button>
                                </SheetClose>
                            </div>
                            <div className="mt-auto border-t border-border px-4 pb-4 pt-4">
                                <div className="grid grid-cols-4 gap-2">
                                    {SOCIAL_ITEMS.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Button key={item.href} variant="ghost" size="icon-sm" asChild>
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
