import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("phase 04-01 task 1 token migration contracts", () => {
  it("enforces stronger About image framing token classes", () => {
    const aboutSource = readSource("src/components/About.tsx");

    expect(aboutSource).toContain("ring-1 ring-primary/20");
    expect(aboutSource).toContain("rounded-2xl border border-border bg-card");
  });

  it("enforces Tag accent token classes", () => {
    const tagSource = readSource("src/components/Tag.tsx");

    expect(tagSource).toContain("bg-accent");
    expect(tagSource).toContain("text-accent-foreground");
  });

  it("removes legacy neutral/purple utility classes from About and Tag", () => {
    const aboutSource = readSource("src/components/About.tsx");
    const tagSource = readSource("src/components/Tag.tsx");
    const combinedSource = `${aboutSource}\n${tagSource}`;

    expect(combinedSource).not.toMatch(/neutral-|purple-/);
  });
});
