import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptSkills } from "@/features/i18n/contentAdapters";
import Tag from "./Tag";

const Skills = () => {
    const { t } = useTranslation();

    const { items: skills, invalidCount } = adaptSkills(t("skills", { returnObjects: true }));
    const showFallback = skills.length === 0 || invalidCount > 0;

    return (
        <SectionShell className="pt-4">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("skillsKicker")}
                    </p>
                    <SectionHeader>{t("skillsTitle")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("skillsSummary")}
                </p>
            </div>
            {showFallback ? (
                <p role="status" data-validation-fallback="skills" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.skills")}
                </p>
            ) : null}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2"
            >
                {skills.map((category, index) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <SectionCard className="h-full p-6 sm:p-7">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-semibold leading-none text-foreground">{category.name}</h3>
                                <span className="rounded-full border border-border/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    {category.skills.length} {t("skillsCountLabel")}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((tech, index) => (
                                    <Tag key={`${category.name}-${tech}`} tagKey={index} text={tech} />
                                ))}
                            </div>
                        </SectionCard>
                    </motion.div>
                ))}
            </motion.div>
        </SectionShell>
    );
};

export default Skills;
