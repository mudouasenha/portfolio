import type { ZodType } from 'zod';

import enLocale from '@/locales/en/translation.json';
import ptLocale from '@/locales/pt/translation.json';
import {
  certificationsSchema,
  contactSchema,
  experiencesSchema,
  projectsSchema,
  skillsSchema,
  type CertificationSchemaItem,
  type ContactSchemaItem,
  type ExperienceSchemaItem,
  type ProjectSchemaItem,
  type SkillSchemaItem,
} from './contentSchemas';
import { validateStructuredLocaleParity } from './localeParity';

const WARNING_PREFIX = '[i18n-schema]';
const PARITY_WARNING_PREFIX = '[i18n-schema][parity]';

export const structuredLocaleParity = validateStructuredLocaleParity(enLocale, ptLocale);

structuredLocaleParity.unknownKeyWarnings.forEach((message) => {
  console.warn(message.startsWith(PARITY_WARNING_PREFIX) ? message : `${PARITY_WARNING_PREFIX} ${message}`);
});

type SectionName = 'skills' | 'projectsList' | 'experiences' | 'certifications' | 'contact';

export type AdapterResult<T> = {
  items: T[];
  invalidCount: number;
  unknownKeyWarnings: string[];
};

export type NormalizedExperience = Omit<ExperienceSchemaItem, 'date' | 'year'> & {
  date: string;
};

type ArrayAdapterOptions<TSchemaItem, TOutputItem> = {
  section: Exclude<SectionName, 'contact'>;
  raw: unknown;
  schema: ZodType<TSchemaItem>;
  allowedKeys: readonly string[];
  mapItem?: (item: TSchemaItem) => TOutputItem;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function unknownKeysForRecord(record: Record<string, unknown>, allowedKeys: readonly string[]): string[] {
  return Object.keys(record).filter((key) => !allowedKeys.includes(key));
}

function formatUnknownKeyWarning(section: SectionName, key: string, index?: number): string {
  if (typeof index === 'number') {
    return `${WARNING_PREFIX} ${section}[${index}] has unknown key "${key}".`;
  }

  return `${WARNING_PREFIX} ${section} has unknown key "${key}".`;
}

function valueType(value: unknown): string {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  return typeof value;
}

function adaptArray<TSchemaItem, TOutputItem = TSchemaItem>({
  section,
  raw,
  schema,
  allowedKeys,
  mapItem,
}: ArrayAdapterOptions<TSchemaItem, TOutputItem>): AdapterResult<TOutputItem> {
  const unknownKeyWarnings: string[] = [...structuredLocaleParity.unknownKeyWarnings];
  const items: TOutputItem[] = [];

  if (!Array.isArray(raw)) {
    return {
      items,
      invalidCount: 1,
      unknownKeyWarnings: [
        `${WARNING_PREFIX} ${section} expected an array but received ${valueType(raw)}.`,
      ],
    };
  }

  let invalidCount = 0;

  raw.forEach((candidate, index) => {
    if (isRecord(candidate)) {
      unknownKeysForRecord(candidate, allowedKeys).forEach((unknownKey) => {
        unknownKeyWarnings.push(formatUnknownKeyWarning(section, unknownKey, index));
      });
    }

    const parsedItem = schema.safeParse(candidate);

    if (!parsedItem.success) {
      invalidCount += 1;
      return;
    }

    if (mapItem) {
      items.push(mapItem(parsedItem.data));
      return;
    }

    items.push(parsedItem.data as unknown as TOutputItem);
  });

  return {
    items,
    invalidCount,
    unknownKeyWarnings,
  };
}

export function adaptSkills(raw: unknown): AdapterResult<SkillSchemaItem> {
  return adaptArray({
    section: 'skills',
    raw,
    schema: skillsSchema.element,
    allowedKeys: ['name', 'skills'],
  });
}

export function adaptProjects(raw: unknown): AdapterResult<ProjectSchemaItem> {
  return adaptArray({
    section: 'projectsList',
    raw,
    schema: projectsSchema.element,
    allowedKeys: ['id', 'title', 'description', 'technologies', 'url'],
  });
}

export function adaptExperiences(raw: unknown): AdapterResult<NormalizedExperience> {
  return adaptArray({
    section: 'experiences',
    raw,
    schema: experiencesSchema.element,
    allowedKeys: ['date', 'year', 'role', 'company', 'description', 'technologies'],
    mapItem: (item) => ({
      date: item.date ?? item.year ?? '',
      role: item.role,
      company: item.company,
      description: item.description,
      technologies: item.technologies,
    }),
  });
}

export function adaptCertifications(raw: unknown): AdapterResult<CertificationSchemaItem> {
  return adaptArray({
    section: 'certifications',
    raw,
    schema: certificationsSchema.element,
    allowedKeys: ['id', 'name', 'issued_by', 'date', 'description', 'url'],
  });
}

export function adaptContact(raw: unknown): AdapterResult<ContactSchemaItem> {
  const unknownKeyWarnings: string[] = [...structuredLocaleParity.unknownKeyWarnings];

  if (isRecord(raw)) {
    unknownKeysForRecord(raw, ['address', 'phoneNo', 'email']).forEach((unknownKey) => {
      unknownKeyWarnings.push(formatUnknownKeyWarning('contact', unknownKey));
    });
  }

  const parsedContact = contactSchema.safeParse(raw);

  if (!parsedContact.success) {
    return {
      items: [],
      invalidCount: 1,
      unknownKeyWarnings,
    };
  }

  return {
    items: [parsedContact.data],
    invalidCount: 0,
    unknownKeyWarnings,
  };
}
