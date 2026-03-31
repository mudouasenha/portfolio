import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import { adaptProjects } from "@/features/i18n/contentAdapters";
import { Project } from "../models/Project";
import cachara from "../assets/projects/cachara.jpg";
import ufsc_brasao from "../assets/projects/ufsc_brasao.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
import Tag from "./Tag";

const Projects = () => {
    const { t } = useTranslation();

    const imagesMap: Record<string, string> = {
        "monography-data-serialization": ufsc_brasao,
        "cachara-social-platform": cachara,
        "cachara-ai-image-classifier": cachara,
        "portfolio-website": portfolio,
    };

    const outboundUrls: Record<string, string> = {
        "cachara-social-platform": "https://github.com/mudouasenha",
        "cachara-ai-image-classifier": "https://github.com/mudouasenha",
        "portfolio-website": "https://portfolio-matheus-miranda-torres-gomes-projects.vercel.app/",
        "monography-data-serialization": "https://github.com/mudouasenha",
    };

    const { items: adaptedProjects, invalidCount } = adaptProjects(t("projectsList", { returnObjects: true }));
    const projects = adaptedProjects.map((cert) => {
        const c = new Project(cert);
        c.image = imagesMap[c.id] || "";
        c.url = outboundUrls[c.id] || c.url;
        return c;
    });
    const showFallback = projects.length === 0 || invalidCount > 0;

    return (
        <SectionShell className="pt-4">
            <SectionHeader className="mb-12 text-center">{t("projects")}</SectionHeader>
            {showFallback ? (
                <p role="status" data-validation-fallback="projects" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.projects")}
                </p>
            ) : null}
            <div className="space-y-5">
                {projects.map((project, index) => (
                    <motion.a
                        key={project.id}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View project: ${project.title} (opens in a new tab)`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <SectionCard className="overflow-hidden p-5 sm:p-6">
                            <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                                <img
                                    src={project.image}
                                    width={300}
                                    height={250}
                                    alt={`${project.title} preview`}
                                    className="h-40 w-full rounded-lg border border-border object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                                    <p className="mt-3 text-sm font-medium text-primary">
                                        View project (opens in a new tab)
                                    </p>
                                    <div className="mt-2 flex flex-wrap">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Tag key={`${project.id}-${tech}`} tagKey={techIndex} text={tech} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </motion.a>
                ))}
            </div>
        </SectionShell>
    );
};

export default Projects;
