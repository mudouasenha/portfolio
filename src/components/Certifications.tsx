import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptCertifications } from "@/features/i18n/contentAdapters";
import { Certification } from "../models/Certification";
import branas_badge from "../assets/certifications/branas_badge.png";
import microsoft_certified_fundamentals_badge from "../assets/certifications/microsoft_certified_fundamentals_badge.svg";

const formatDate = (date: string) => {
    const userLocale = navigator.language || "en-US";
    return new Intl.DateTimeFormat(userLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
};

const imagesMap: Record<string, string> = {
    "azure-fundamentals": microsoft_certified_fundamentals_badge,
    "ai-for-devs-branas": branas_badge,
};

const Certifications = () => {
    const { t } = useTranslation();

    const { items: adaptedCertifications, invalidCount } = adaptCertifications(t("certifications", { returnObjects: true }));
    const certifications = adaptedCertifications.map((cert) => {
        const c = new Certification(cert);
        c.image = imagesMap[c.id] || "";
        return c;
    });
    const showFallback = certifications.length === 0 || invalidCount > 0;

    return (
        <SectionShell className="pt-4">
            <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("certificationsKicker")}
                    </p>
                    <SectionHeader>{t("certificationsTitle")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("certificationsSummary")}
                </p>
            </div>
            {showFallback ? (
                <p role="status" data-validation-fallback="certifications" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.certifications")}
                </p>
            ) : null}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {certifications.map((certification, index) => (
                    <motion.a
                        key={certification.id}
                        href={certification.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <SectionCard className="h-full border-border/70 bg-card/70 p-4 text-center sm:p-5">
                            <h4 className="mb-4 text-base font-semibold text-foreground sm:text-lg">{certification.name}</h4>
                            <div className="flex justify-center">
                                <img
                                    src={certification.image}
                                    alt={certification.name}
                                    className="mb-4 h-28 w-auto rounded-lg border border-border p-2 sm:h-32"
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-primary">{t("certificationsIssuedBy")}</span> {certification.issued_by}{" "}
                                {t("certificationsOn")}{" "}
                                <strong className="text-foreground">{formatDate(certification.date)}</strong>
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">{certification.description}</p>
                        </SectionCard>
                    </motion.a>
                ))}
            </div>
        </SectionShell>
    );
};

export default Certifications;
