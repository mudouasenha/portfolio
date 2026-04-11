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
    const [featuredProject, ...supportingProjects] = projects;

    return (
        <SectionShell className="pt-4">
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("projectsKicker")}
                    </p>
                    <SectionHeader>{t("projects")}</SectionHeader>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("projectsSummary")}
                </p>
            </div>
            {showFallback ? (
                <p role="status" data-validation-fallback="projects" className="mb-4 text-sm text-muted-foreground">
                    {t("validationFallback.projects")}
                </p>
            ) : null}
            <div className="space-y-5">
                {featuredProject ? (
                    <motion.a
                        key={featuredProject.id}
                        href={featuredProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View project: ${featuredProject.title} (opens in a new tab)`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        whileHover={{ scale: 1.01 }}
                        className="block rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <SectionCard className="overflow-hidden border-primary/15 bg-primary/[0.045] p-5 sm:p-6">
                            <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
                                <img
                                    src={featuredProject.image}
                                    width={300}
                                    height={250}
                                    alt={`${featuredProject.title} preview`}
                                    className="h-52 w-full rounded-[1.2rem] border border-border object-cover"
                                />
                                <div>
                                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                        {t("projectsFeaturedLabel")}
                                    </span>
                                    <h3 className="mt-4 text-3xl font-semibold leading-none text-foreground">{featuredProject.title}</h3>
                                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{featuredProject.description}</p>
                                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                                        {t("projectsViewProject")}
                                    </p>
                                    <div className="mt-3 flex flex-wrap">
                                        {featuredProject.technologies.map((tech, techIndex) => (
                                            <Tag key={`${featuredProject.id}-${tech}`} tagKey={techIndex} text={tech} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </motion.a>
                ) : null}
                <div className="grid gap-5 lg:grid-cols-3">
                    {supportingProjects.map((project, index) => (
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
                            className="block rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <SectionCard className="flex h-full flex-col overflow-hidden p-5">
                                <img
                                    src={project.image}
                                    width={300}
                                    height={250}
                                    alt={`${project.title} preview`}
                                    className="h-40 w-full rounded-[1rem] border border-border object-cover"
                                />
                                <div className="flex h-full flex-col">
                                    <h3 className="mt-4 text-2xl font-semibold leading-none text-foreground">{project.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                                        {t("projectsViewProject")}
                                    </p>
                                    <div className="mt-3 flex flex-wrap">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Tag key={`${project.id}-${tech}`} tagKey={techIndex} text={tech} />
                                        ))}
                                    </div>
                                </div>
                            </SectionCard>
                        </motion.a>
                    ))}
                </div>
            </div>
        </SectionShell>
    );
};

export default Projects;
