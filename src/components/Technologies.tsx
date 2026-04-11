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
            <SectionHeader className="mb-12 text-center">{t("technologies")}</SectionHeader>
            <motion.ul
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
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
                        <SectionCard className="flex h-full flex-col items-center gap-3 p-5 text-center">
                            <tech.Icon className="text-5xl text-primary" aria-hidden />
                            <span className="text-sm font-medium text-muted-foreground">{tech.label}</span>
                        </SectionCard>
                    </motion.li>
                ))}
            </motion.ul>
        </SectionShell>
    );
};

export default Technologies;
