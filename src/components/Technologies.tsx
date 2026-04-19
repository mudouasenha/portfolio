import { motion, useReducedMotion } from "motion/react";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import { GrGraphQl } from "react-icons/gr";
import { SiDotnet, SiGooglecloud, SiPostgresql, SiTypescript } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";

const technologies = [
    { id: "dotnet", label: ".NET", Icon: SiDotnet },
    { id: "sqlserver", label: "MS SQL Server", Icon: DiMsqlServer },
    { id: "postgresql", label: "PostgreSQL", Icon: SiPostgresql },
    { id: "azure", label: "Azure", Icon: VscAzure },
    { id: "google-cloud", label: "Google Cloud", Icon: SiGooglecloud },
    { id: "typescript", label: "TypeScript", Icon: SiTypescript },
    { id: "graphql", label: "GraphQL", Icon: GrGraphQl },
    { id: "redis", label: "Redis", Icon: DiRedis },
];

const Technologies = () => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? false;

    return (
        <SectionShell className="pt-4">
            <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("technologiesKicker")}
                    </p>
                    <SectionHeader>{t("technologies")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("technologiesSummary")}
                </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
                >
                    <SectionCard className="h-full p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            {t("technologiesLeadLabel")}
                        </p>
                        <h3 className="mt-4 text-3xl font-semibold leading-none text-foreground">
                            {t("technologiesLeadTitle")}
                        </h3>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                            {t("technologiesLeadBody")}
                        </p>
                    </SectionCard>
                </motion.div>
                <motion.ul
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                {technologies.map((tech, index) => (
                    <motion.li
                        key={tech.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.35, delay: index * 0.05, ease: "easeOut" }
                        }
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                    >
                        <SectionCard className="flex h-full flex-col items-center gap-3 p-4 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full border border-primary/15 bg-primary/10">
                                <tech.Icon className="text-[1.75rem] text-primary" aria-hidden />
                            </div>
                            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">{tech.label}</span>
                        </SectionCard>
                    </motion.li>
                ))}
                </motion.ul>
            </div>
        </SectionShell>
    );
};

export default Technologies;
