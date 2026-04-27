import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import enLocale from "@/locales/en/translation.json";
import ptLocale from "@/locales/pt/translation.json";

const readSource = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("ai portfolio structure refresh", () => {
    it("keeps about and skills in the page flow", () => {
        const appSource = readSource("src/App.tsx");

        expect(appSource).toContain('id="about"');
        expect(appSource).toContain('id="skills"');
        expect(appSource).toContain("<About />");
        expect(appSource).toContain("<Skills />");

        const sectionOrder = [
            "<Hero />",
            "<About />",
            "<Experience />",
            "<Projects />",
            "<Technologies />",
            "<Skills />",
            "<Certifications />",
            "<Contact />",
        ].map((token) => appSource.indexOf(token));

        expect(sectionOrder.every((index) => index >= 0)).toBe(true);
        for (let index = 1; index < sectionOrder.length; index += 1) {
            expect(sectionOrder[index - 1]).toBeLessThan(sectionOrder[index]);
        }
    });

    it("keeps about and skills in navbar navigation", () => {
        const navbarSource = readSource("src/components/Navbar.tsx");

        expect(navbarSource).toContain("#about");
        expect(navbarSource).toContain("#skills");
        expect(navbarSource).toContain("#experience");
        expect(navbarSource).toContain("#projects");
        expect(navbarSource).toContain("#technologies");
        expect(navbarSource).toContain("#certifications");
        expect(navbarSource).toContain("#contact");
    });

    it("keeps the hero proof strip and localized project heading", () => {
        const heroSource = readSource("src/components/Hero.tsx");

        expect(heroSource).toContain("R$4k/month infra cost reduction");
        expect(heroSource).toContain("hero.proofStrip");
        expect(heroSource).toContain("hero.subtitle");
    });

    it("keeps projects localized in both languages", () => {
        expect(enLocale.projects).toBe("AI Systems & Projects");
        expect(ptLocale.projects).toBe("Sistemas de IA e Projetos");
    });
});
