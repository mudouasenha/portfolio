import { describe, expect, it } from "vitest";

import enLocale from "@/locales/en/translation.json";
import ptLocale from "@/locales/pt/translation.json";
import { validateStructuredLocaleParity } from "@/features/i18n/localeParity";

describe("structured locale parity", () => {
  it("keeps required structured keys aligned between en and pt", () => {
    const parity = validateStructuredLocaleParity(enLocale, ptLocale);

    expect(parity.requiredShapeMismatches).toEqual([]);
    expect(parity.unknownKeyWarnings).toEqual([]);
  });

  it("treats unknown-key drift as warning-only when required shape still matches", () => {
    const enWithUnknown = {
      ...enLocale,
      skills: enLocale.skills.map((item, index) =>
        index === 0 ? { ...item, unexpectedField: "warn-only" } : item,
      ),
    };

    const parity = validateStructuredLocaleParity(enWithUnknown, ptLocale);

    expect(parity.requiredShapeMismatches).toEqual([]);
    expect(parity.unknownKeyWarnings.some((warning) => warning.includes("skills"))).toBe(true);
    expect(parity.unknownKeyWarnings.some((warning) => warning.includes("unexpectedField"))).toBe(true);
  });

  it("covers required structured payload keys in parity assertions", () => {
    const structuredKeys = ["skills", "projectsList", "experiences", "certifications", "contact"] as const;

    structuredKeys.forEach((key) => {
      expect(enLocale).toHaveProperty(key);
      expect(ptLocale).toHaveProperty(key);
    });
  });
});
