import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);

export const skillsSchema = z.array(
  z
    .object({
      name: nonEmptyString,
      skills: z.array(nonEmptyString),
    })
    .strict(),
);

export const projectsSchema = z.array(
  z
    .object({
      id: nonEmptyString,
      title: nonEmptyString,
      description: nonEmptyString,
      technologies: z.array(nonEmptyString),
      url: nonEmptyString.optional(),
    })
    .strict(),
);

const experienceSchema = z
  .object({
    date: nonEmptyString.optional(),
    year: nonEmptyString.optional(),
    role: nonEmptyString,
    company: nonEmptyString,
    description: nonEmptyString,
    technologies: z.array(nonEmptyString),
  })
  .strict()
  .refine((item) => Boolean(item.date ?? item.year), {
    message: 'Either date or year is required.',
  });

export const experiencesSchema = z.array(experienceSchema);

export const certificationsSchema = z.array(
  z
    .object({
      id: nonEmptyString,
      name: nonEmptyString,
      issued_by: nonEmptyString,
      date: nonEmptyString,
      description: nonEmptyString,
      url: nonEmptyString,
    })
    .strict(),
);

export const contactSchema = z
  .object({
    address: nonEmptyString,
    phoneNo: nonEmptyString,
    email: nonEmptyString,
  })
  .strict();

export type SkillSchemaItem = z.infer<typeof skillsSchema>[number];
export type ProjectSchemaItem = z.infer<typeof projectsSchema>[number];
export type ExperienceSchemaItem = z.infer<typeof experiencesSchema>[number];
export type CertificationSchemaItem = z.infer<typeof certificationsSchema>[number];
export type ContactSchemaItem = z.infer<typeof contactSchema>;
