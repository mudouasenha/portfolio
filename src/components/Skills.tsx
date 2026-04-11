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
            <SectionHeader className="mb-12 text-center">{t("skillsTitle")}</SectionHeader>
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
                {skills.map((category) => (
                    <motion.div
                        key={category.name}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        <SectionCard className="h-full p-6">
                            <h3 className="mb-3 text-lg font-semibold text-foreground">{category.name}</h3>
                            <div className="flex flex-wrap gap-1">
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
