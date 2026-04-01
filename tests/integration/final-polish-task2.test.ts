import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("phase 04-01 task 2 motion token contracts", () => {
  it("defines shared motion token variables in index.css", () => {
    const cssSource = readSource("src/index.css");

    expect(cssSource).toContain("--motion-duration-medium");
    expect(cssSource).toContain("--motion-ease-standard");
  });

  it("consumes shared motion tokens in App, Hero, and Navbar transitions", () => {
    const appSource = readSource("src/App.tsx");
    const heroSource = readSource("src/components/Hero.tsx");
    const navbarSource = readSource("src/components/Navbar.tsx");

    expect(appSource).toMatch(/--motion-duration-medium|--motion-ease-standard/);
    expect(heroSource).toMatch(/--motion-duration-medium|--motion-ease-standard/);
    expect(navbarSource).toMatch(/--motion-duration-medium|--motion-ease-standard/);
  });

  it("keeps reduced-motion hooks in Hero and Navbar", () => {
    const heroSource = readSource("src/components/Hero.tsx");
    const navbarSource = readSource("src/components/Navbar.tsx");

    expect(heroSource).toContain("useReducedMotion");
    expect(navbarSource).toContain("useReducedMotion");
  });
});
