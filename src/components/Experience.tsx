import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptExperiences } from "@/features/i18n/contentAdapters";
import Tag from "./Tag";

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
            <SectionHeader className="mb-12 text-center">{t("experience")}</SectionHeader>
            {showFallback ? (
                <p role="status" data-validation-fallback="experience" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.experience")}
                </p>
            ) : null}
            <div className="space-y-5">
                {visibleExperiences.map((experience, index) => {
                    const displayPeriod = experience.date;

                    return (
                        <motion.div
                            key={`${experience.role}-${experience.company}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
                        >
                            <SectionCard className="p-6 sm:p-7">
                                <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:gap-8">
                                    <p className="text-sm font-medium text-muted-foreground">{displayPeriod}</p>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {experience.role}
                                            <span className="ml-2 text-sm font-medium text-muted-foreground">
                                                {experience.company}
                                            </span>
                                        </h3>
                                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                            {experience.description}
                                        </p>
                                        <div className="mt-2 flex flex-wrap">
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
