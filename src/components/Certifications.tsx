import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { Certification } from "../models/Certification";
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
};

const Certifications = () => {
    const { t } = useTranslation();
  
  const rawCerts = (t("certifications", { returnObjects: true }) as Certification[]) || [];
  const certifications = rawCerts.map((cert) => {
    const c = new Certification(cert);
    c.image = imagesMap[c.id] || "";
    return c;
  });


    return (
        <SectionShell className="pt-4">
            <SectionHeader className="mb-12 text-center">Certifications</SectionHeader>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {certifications.map((certification, index) => (
              <motion.a
              key={certification.id}
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                  <SectionCard className="h-full p-6 text-center">
                      <h4 className="mb-4 text-lg font-semibold text-foreground">{certification.name}</h4>
                      <div className="flex justify-center">
                          <img
                              src={certification.image}
                              alt={certification.name}
                              className="mb-4 h-32 w-auto rounded-lg border border-border p-2"
                          />
                      </div>
                      <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">Issued by:</span> {certification.issued_by} on{" "}
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
