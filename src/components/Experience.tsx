import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { ExperienceItem } from "../models/ExperienceItem";
import Tag from "./Tag";

const Experience = () => {
    const { t } = useTranslation();

    const experiences = t("experiences", { returnObjects: true }) as ExperienceItem[];

    return (
        <SectionShell className="pt-4">
            <SectionHeader className="mb-12 text-center">{t("experience")}</SectionHeader>
            <div className="space-y-5">
                {experiences.map((experience, index) => {
                    const displayPeriod = (experience as ExperienceItem & { year?: string }).year ?? experience.date;

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
                                <p className="text-sm font-medium text-muted-foreground">
                                    {displayPeriod}
                                </p>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {experience.role}
                                        <span className="ml-2 text-sm font-medium text-muted-foreground">
                                            {experience.company}
                                        </span>
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
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
        </SectionShell>
    );
};

export default Experience;
