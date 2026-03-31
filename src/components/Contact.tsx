import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { ContactInfo } from "../models/ContactInfo";

const Contact = () => {
    const { t } = useTranslation();
  
    const contact = t("contact", { returnObjects: true }) as ContactInfo;
    
    return (
        <SectionShell className="pt-4">
            <SectionHeader className="mb-10 text-center">{t("getInTouch")}</SectionHeader>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mx-auto max-w-3xl"
            >
                <SectionCard className="p-7 text-center">
                    <p className="text-base text-muted-foreground">{contact.address}</p>
                    <p className="mt-3 text-base text-muted-foreground">{contact.phoneNo}</p>
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <Button asChild size="lg">
                            <a
                                href="https://www.linkedin.com/in/matheus-gomes-98823b185"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact on LinkedIn
                            </a>
                        </Button>
                        <a
                            href="https://github.com/mudouasenha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            GitHub (opens in a new tab)
                        </a>
                        <a
                            href="mailto:contact.me@linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Email (opens in a new tab)
                        </a>
                    </div>
                </SectionCard>
            </motion.div>
        </SectionShell>
    );
};

export default Contact;
