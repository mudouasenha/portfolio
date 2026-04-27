import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptExperiences } from "@/features/i18n/contentAdapters";
import Tag from "./Tag";

const splitExperienceDescription = (description: string) => {
    const lines = description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const [summary = "", ...bulletLines] = lines;

    return {
        summary,
        bullets: bulletLines.map((line) => line.replace(/^[-•]\s*/, "")),
    };
};

const Experience = () => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const { items: experiences, invalidCount } = adaptExperiences(t("experiences", { returnObjects: true }));
    const showFallback = experiences.length === 0 || invalidCount > 0;
    const defaultVisibleCount = 2;
    const hasHiddenItems = experiences.length > defaultVisibleCount;
    const visibleExperiences = isExpanded ? experiences : experiences.slice(0, defaultVisibleCount);
    const hiddenCount = Math.max(experiences.length - defaultVisibleCount, 0);

    return (
        <SectionShell className="pt-4">
            <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("experienceKicker")}
                    </p>
                    <SectionHeader>{t("experience")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("experienceSummary")}
                </p>
            </div>
            {showFallback ? (
                <p role="status" data-validation-fallback="experience" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.experience")}
                </p>
            ) : null}
            <div className="space-y-5">
                {visibleExperiences.map((experience, index) => {
                    const displayPeriod = experience.date;
                    const { summary, bullets } = splitExperienceDescription(experience.description);

                    return (
                        <motion.div
                            key={`${experience.role}-${experience.company}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                        >
                            <SectionCard className={index === 0 ? "border-primary/20 bg-primary/[0.045] p-5 sm:p-6" : "p-5 sm:p-6"}>
                                <div className="grid gap-4 lg:grid-cols-[170px_1fr] lg:gap-6">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{displayPeriod}</p>
                                        {index === 0 ? (
                                            <span className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                                {t("experienceCurrentRole")}
                                            </span>
                                        ) : null}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold leading-none text-foreground">{experience.role}</h3>
                                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                            {experience.company}
                                        </p>
                                        <p className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-[0.98rem]">{summary}</p>
                                        {bullets.length > 0 ? (
                                            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.96rem]">
                                                {bullets.map((bullet) => (
                                                    <li key={bullet} className="flex gap-2">
                                                        <span aria-hidden="true" className="mt-1.5 size-1.5 rounded-full bg-primary/70" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                        <div className="mt-4 flex flex-wrap">
                                            {experience.technologies.map((tech, techIndex) => (
                                                <Tag key={`${experience.role}-${tech}`} tagKey={techIndex} text={tech} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>
                        </motion.div>
                    );
                })}
            </div>
            {hasHiddenItems ? (
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setIsExpanded((current) => !current)}
                        className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? t("experienceCollapse.showLess") : t("experienceCollapse.showMore", { count: hiddenCount })}
                    </button>
                </div>
            ) : null}
        </SectionShell>
    );
};

export default Experience;
