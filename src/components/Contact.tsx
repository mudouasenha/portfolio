import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptContact } from "@/features/i18n/contentAdapters";

const Contact = () => {
    const { t } = useTranslation();
  
    const { items: contacts, invalidCount } = adaptContact(t("contact", { returnObjects: true }));
    const contact = contacts[0];
    const showFallback = contacts.length === 0 || invalidCount > 0;
    
    return (
        <SectionShell className="pt-4">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("contact.kicker")}
                    </p>
                    <SectionHeader>{t("getInTouch")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("contact.summary")}
                </p>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mx-auto max-w-4xl"
            >
                <SectionCard className="p-7 sm:p-8">
                    {showFallback ? (
                        <p role="status" data-validation-fallback="contact" className="text-base text-muted-foreground">
                            {t("validationFallback.contact")}
                        </p>
                    ) : null}
                    {contact ? (
                        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                            <div>
                                <p className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                                    {t("contact.title")}
                                </p>
                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                                    {t("contact.body")}
                                </p>
                            </div>
                            <div className="rounded-[1.2rem] border border-border/80 bg-background/70 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {t("contact.locationLabel")}
                                </p>
                                <p className="mt-2 text-base text-foreground">{contact.address}</p>
                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {t("contact.responseLabel")}
                                </p>
                                <p className="mt-2 text-base text-foreground">{contact.phoneNo}</p>
                            </div>
                        </div>
                    ) : null}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Button asChild size="lg" className="rounded-full px-5">
                            <a
                                href="https://www.linkedin.com/in/matheus-gomes-98823b185"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contact on LinkedIn (opens in a new tab)"
                            >
                                {t("contact.linkedinCta")}
                            </a>
                        </Button>
                        <a
                            href="https://github.com/mudouasenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile (opens in a new tab)"
                            className="inline-flex items-center rounded-full border border-border/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-accent/70"
                        >
                            {t("contact.githubCta")}
                        </a>
                    </div>
                </SectionCard>
            </motion.div>
        </SectionShell>
    );
};

export default Contact;
