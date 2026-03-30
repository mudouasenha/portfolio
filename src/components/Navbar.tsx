import {
    Github,
    Instagram,
    Linkedin,
    Menu,
    X,
} from "lucide-react";

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

const NAV_ITEMS = [
    { href: "#about", label: "About" },
    { href: "#technologies", label: "Technologies" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

const SOCIAL_ITEMS = [
    {
        href: "https://www.linkedin.com/in/matheus-gomes-98823b185",
        label: "LinkedIn",
        icon: Linkedin,
    },
    {
        href: "https://github.com/mudouasenha",
        label: "GitHub",
        icon: Github,
    },
    {
        href: "https://www.instagram.com/matheusmtgomes/",
        label: "Instagram",
        icon: Instagram,
    },
    {
        href: "https://x.com/MatheusmtgGomes",
        label: "X",
        icon: X,
    },
];

const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 mb-16 border-b border-border/70 bg-background/90 backdrop-blur-sm supports-[backdrop-filter]:bg-background/75">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <a href="#top" className="flex flex-shrink-0 items-center gap-3">
                    <img className="h-10 w-10 rounded-md border border-border object-cover" src={logo} alt="Matheus Gomes logo" />
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-foreground">Matheus Gomes</p>
                        <p className="text-xs text-muted-foreground">Backend Developer</p>
                    </div>
                </a>

                <div className="hidden flex-1 items-center justify-center lg:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="gap-1">
                            {NAV_ITEMS.map((item) => (
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
                                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                                    <Icon className="size-4" />
                                </a>
                            </Button>
                        );
                    })}
                    <LanguageSwitcher />
                    <Button asChild size="sm">
                        <a href="#contact">Let&apos;s talk</a>
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
                                <SheetTitle>Navigate</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-4 pb-3">
                                {NAV_ITEMS.map((item) => (
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
                            <div className="mt-auto border-t border-border px-4 pb-4 pt-4">
                                <div className="grid grid-cols-4 gap-2">
                                    {SOCIAL_ITEMS.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Button key={item.href} variant="ghost" size="icon-sm" asChild>
                                                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
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
        </header>
    );
};

export default Navbar;
