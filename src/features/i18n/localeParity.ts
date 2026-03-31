const PARITY_WARNING_PREFIX = '[i18n-schema][parity]';

const STRUCTURED_SECTIONS = [
  'skills',
  'projectsList',
  'experiences',
  'certifications',
  'contact',
] as const;

type StructuredSection = (typeof STRUCTURED_SECTIONS)[number];
type SectionMode = 'array' | 'object';

type SectionConfig = {
  mode: SectionMode;
  requiredKeys: readonly string[];
  allowedKeys: readonly string[];
  alternatives?: readonly string[];
};

const SECTION_CONFIG: Record<StructuredSection, SectionConfig> = {
  skills: {
    mode: 'array',
    requiredKeys: ['name', 'skills'],
    allowedKeys: ['name', 'skills'],
  },
  projectsList: {
    mode: 'array',
    requiredKeys: ['id', 'title', 'description', 'technologies'],
    allowedKeys: ['id', 'title', 'description', 'technologies', 'url'],
  },
  experiences: {
    mode: 'array',
    requiredKeys: ['role', 'company', 'description', 'technologies'],
    allowedKeys: ['date', 'year', 'role', 'company', 'description', 'technologies'],
    alternatives: ['date', 'year'],
  },
  certifications: {
    mode: 'array',
    requiredKeys: ['id', 'name', 'issued_by', 'date', 'description', 'url'],
    allowedKeys: ['id', 'name', 'issued_by', 'date', 'description', 'url'],
  },
  contact: {
    mode: 'object',
    requiredKeys: ['address', 'phoneNo', 'email'],
    allowedKeys: ['address', 'phoneNo', 'email'],
  },
};

export type LocaleParityResult = {
  requiredShapeMismatches: string[];
  unknownKeyWarnings: string[];
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asRecordArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item) => typeof item === 'object' && item !== null && !Array.isArray(item)) as Record<
    string,
    unknown
  >[];
}

function hasOwnKey(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function getUnknownKeys(records: Record<string, unknown>[], allowedKeys: readonly string[]): Set<string> {
  const unknownKeys = new Set<string>();

  records.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        unknownKeys.add(key);
      }
    });
  });

  return unknownKeys;
}

function diffSet(source: Set<string>, target: Set<string>): string[] {
  return [...source].filter((entry) => !target.has(entry));
}

function boolLabel(value: boolean): string {
  return value ? 'present' : 'missing';
}

function validateArraySection(
  section: StructuredSection,
  config: SectionConfig,
  enSectionValue: unknown,
  ptSectionValue: unknown,
): LocaleParityResult {
  const requiredShapeMismatches: string[] = [];
  const unknownKeyWarnings: string[] = [];

  if (!Array.isArray(enSectionValue) || !Array.isArray(ptSectionValue)) {
    requiredShapeMismatches.push(
      `${PARITY_WARNING_PREFIX} required shape mismatch in "${section}": expected array in both locales.`,
    );

    return { requiredShapeMismatches, unknownKeyWarnings };
  }

  const enEntries = asRecordArray(enSectionValue);
  const ptEntries = asRecordArray(ptSectionValue);

  config.requiredKeys.forEach((requiredKey) => {
    const enHasKey = enEntries.every((entry) => hasOwnKey(entry, requiredKey));
    const ptHasKey = ptEntries.every((entry) => hasOwnKey(entry, requiredKey));

    if (enHasKey !== ptHasKey) {
      requiredShapeMismatches.push(
        `${PARITY_WARNING_PREFIX} required shape mismatch in "${section}": key "${requiredKey}" is ${boolLabel(
          enHasKey,
        )} in en and ${boolLabel(ptHasKey)} in pt.`,
      );
    }
  });

  if (config.alternatives && config.alternatives.length > 0) {
    const enHasAlternative = enEntries.every((entry) => config.alternatives!.some((key) => hasOwnKey(entry, key)));
    const ptHasAlternative = ptEntries.every((entry) => config.alternatives!.some((key) => hasOwnKey(entry, key)));

    if (enHasAlternative !== ptHasAlternative) {
      requiredShapeMismatches.push(
        `${PARITY_WARNING_PREFIX} required shape mismatch in "${section}": one of [${config.alternatives.join(
          ', ',
        )}] is ${boolLabel(enHasAlternative)} in en and ${boolLabel(ptHasAlternative)} in pt.`,
      );
    }
  }

  const enUnknownKeys = getUnknownKeys(enEntries, config.allowedKeys);
  const ptUnknownKeys = getUnknownKeys(ptEntries, config.allowedKeys);

  diffSet(enUnknownKeys, ptUnknownKeys).forEach((unknownKey) => {
    unknownKeyWarnings.push(
      `${PARITY_WARNING_PREFIX} unknown key drift in "${section}": "${unknownKey}" exists only in en.`,
    );
  });

  diffSet(ptUnknownKeys, enUnknownKeys).forEach((unknownKey) => {
    unknownKeyWarnings.push(
      `${PARITY_WARNING_PREFIX} unknown key drift in "${section}": "${unknownKey}" exists only in pt.`,
    );
  });

  return {
    requiredShapeMismatches,
    unknownKeyWarnings,
  };
}

function validateObjectSection(
  section: StructuredSection,
  config: SectionConfig,
  enSectionValue: unknown,
  ptSectionValue: unknown,
): LocaleParityResult {
  const requiredShapeMismatches: string[] = [];
  const unknownKeyWarnings: string[] = [];

  const enSection = asRecord(enSectionValue);
  const ptSection = asRecord(ptSectionValue);

  if (!enSection || !ptSection) {
    requiredShapeMismatches.push(
      `${PARITY_WARNING_PREFIX} required shape mismatch in "${section}": expected object in both locales.`,
    );

    return { requiredShapeMismatches, unknownKeyWarnings };
  }

  config.requiredKeys.forEach((requiredKey) => {
    const enHasKey = hasOwnKey(enSection, requiredKey);
    const ptHasKey = hasOwnKey(ptSection, requiredKey);

    if (enHasKey !== ptHasKey) {
      requiredShapeMismatches.push(
        `${PARITY_WARNING_PREFIX} required shape mismatch in "${section}": key "${requiredKey}" is ${boolLabel(
          enHasKey,
        )} in en and ${boolLabel(ptHasKey)} in pt.`,
      );
    }
  });

  const enUnknownKeys = getUnknownKeys([enSection], config.allowedKeys);
  const ptUnknownKeys = getUnknownKeys([ptSection], config.allowedKeys);

  diffSet(enUnknownKeys, ptUnknownKeys).forEach((unknownKey) => {
    unknownKeyWarnings.push(
      `${PARITY_WARNING_PREFIX} unknown key drift in "${section}": "${unknownKey}" exists only in en.`,
    );
  });

  diffSet(ptUnknownKeys, enUnknownKeys).forEach((unknownKey) => {
    unknownKeyWarnings.push(
      `${PARITY_WARNING_PREFIX} unknown key drift in "${section}": "${unknownKey}" exists only in pt.`,
    );
  });

  return {
    requiredShapeMismatches,
    unknownKeyWarnings,
  };
}

export function validateStructuredLocaleParity(enLocale: unknown, ptLocale: unknown): LocaleParityResult {
  const requiredShapeMismatches: string[] = [];
  const unknownKeyWarnings: string[] = [];

  const enRoot = asRecord(enLocale);
  const ptRoot = asRecord(ptLocale);

  if (!enRoot || !ptRoot) {
    return {
      requiredShapeMismatches: [
        `${PARITY_WARNING_PREFIX} required shape mismatch: locale roots must be objects.`,
      ],
      unknownKeyWarnings,
    };
  }

  STRUCTURED_SECTIONS.forEach((section) => {
    const config = SECTION_CONFIG[section];
    const enSectionValue = enRoot[section];
    const ptSectionValue = ptRoot[section];

    const sectionResult =
      config.mode === 'array'
        ? validateArraySection(section, config, enSectionValue, ptSectionValue)
        : validateObjectSection(section, config, enSectionValue, ptSectionValue);

    requiredShapeMismatches.push(...sectionResult.requiredShapeMismatches);
    unknownKeyWarnings.push(...sectionResult.unknownKeyWarnings);
  });

  return {
    requiredShapeMismatches,
    unknownKeyWarnings,
  };
}
