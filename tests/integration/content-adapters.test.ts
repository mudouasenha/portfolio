import { describe, expect, it } from "vitest";

import { adaptContact, adaptProjects, adaptSkills } from "@/features/i18n/contentAdapters";

describe("content adapters", () => {
  it("keeps valid structured payloads intact", () => {
    const payload = [
      {
        id: "project-a",
        title: "Project A",
        description: "Description",
        technologies: ["React", "TypeScript"],
        url: "https://example.com",
      },
    ];

    const result = adaptProjects(payload);

    expect(result.invalidCount).toBe(0);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      id: "project-a",
      title: "Project A",
    });
  });

  it("filters invalid entries from partially invalid arrays instead of crashing", () => {
    const mixedPayload = [
      {
        name: "Backend",
        skills: ["C#", ".NET"],
      },
      {
        name: "Invalid entry missing skills",
      },
      "not-an-object",
    ];

    const result = adaptSkills(mixedPayload);

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual({
      name: "Backend",
      skills: ["C#", ".NET"],
    });
    expect(result.invalidCount).toBe(2);
  });

  it("returns fallback metadata for malformed payloads", () => {
    const malformedPayload = "not-a-contact-object";
    const result = adaptContact(malformedPayload);
    const showFallback = result.items.length === 0 || result.invalidCount > 0;

    expect(result.items).toEqual([]);
    expect(result.invalidCount).toBe(1);
    expect(showFallback).toBe(true);
  });
});
