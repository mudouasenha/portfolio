import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import aiBillExtractionPlatform from "../assets/projects/ai/ai-bill-extraction-platform.svg";
import claudeCodeAiEnablement from "../assets/projects/ai/claude-code-ai-enablement.svg";
import federatedGraphqlHotChocolateFusion from "../assets/projects/ai/federated-graphql-hotchocolate-fusion.svg";
import observabilitySignozOpenTelemetry from "../assets/projects/ai/observability-signoz-opentelemetry.svg";
import provaAiSystemsInfrastructure from "../assets/projects/ai/prova-ai-systems-infrastructure.svg";
import cachara from "../assets/projects/cachara.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
import ufsc_brasao from "../assets/projects/ufsc_brasao.jpg";
import { Project } from "../models/Project";
import SectionCard from "@/components/sections/SectionCard";
import SectionHeader from "@/components/sections/SectionHeader";
import SectionShell from "@/components/sections/SectionShell";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { adaptProjects } from "@/features/i18n/contentAdapters";
import Tag from "./Tag";

const Projects = () => {
    const { t } = useTranslation();

    const imagesMap: Record<string, string> = {
        "prova-ai-systems-infrastructure": provaAiSystemsInfrastructure,
        "claude-code-ai-enablement": claudeCodeAiEnablement,
        "ai-bill-extraction-platform": aiBillExtractionPlatform,
        "federated-graphql-hotchocolate-fusion": federatedGraphqlHotChocolateFusion,
        "observability-signoz-opentelemetry": observabilitySignozOpenTelemetry,
        "monography-data-serialization": ufsc_brasao,
        "cachara-social-platform": cachara,
        "cachara-ai-image-classifier": cachara,
        "portfolio-website": portfolio,
    };

    const outboundUrls: Record<string, string> = {
        "prova-ai-systems-infrastructure": "https://github.com/mudouasenha/prova-ai",
    };

    const { items: adaptedProjects, invalidCount } = adaptProjects(t("projectsList", { returnObjects: true }));
    const projects = adaptedProjects.map((project) => {
        const normalizedProject = new Project(project);
        normalizedProject.image = imagesMap[normalizedProject.id] || "";
        normalizedProject.url = outboundUrls[normalizedProject.id] || normalizedProject.url;
        return normalizedProject;
    });
    const showFallback = projects.length === 0 || invalidCount > 0;
    const [featuredProject, ...supportingProjects] = projects;

    return (
        <SectionShell className="pt-4">
            <div className="mb-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
            <div className="space-y-4">
                {featuredProject ? (
                    <motion.a
                        key={featuredProject.id}
                        href={featuredProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View project: ${featuredProject.title}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        whileHover={{ scale: 1.01 }}
                        className="block rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <SectionCard className="overflow-hidden border-primary/15 bg-primary/[0.045] p-4 sm:p-5">
                            <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-center">
                                <img
                                    src={featuredProject.image}
                                    width={300}
                                    height={250}
                                    alt={`${featuredProject.title} preview`}
                                    className="h-44 w-full rounded-[1.2rem] border border-border object-cover"
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
                <div className="grid gap-4 lg:grid-cols-3">
                    {supportingProjects.map((project, index) => {
                        if (project.url) {
                            return (
                                <motion.a
                                    key={project.id}
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View project: ${project.title}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                                    whileHover={{ scale: 1.02 }}
                                    className="block rounded-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <SectionCard className="flex h-full flex-col overflow-hidden p-4">
                                        <img
                                            src={project.image}
                                            width={300}
                                            height={250}
                                            alt={`${project.title} preview`}
                                            className="h-32 w-full rounded-[1rem] border border-border object-cover"
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
                            );
                        }

                        return (
                            <Dialog key={project.id}>
                                <DialogTrigger asChild>
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                                        whileHover={{ scale: 1.02 }}
                                        className="block rounded-[1.4rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        aria-label={`View case study: ${project.title}`}
                                    >
                                        <SectionCard className="flex h-full flex-col overflow-hidden p-4">
                                            <img
                                                src={project.image}
                                                width={300}
                                                height={250}
                                                alt={`${project.title} preview`}
                                                className="h-32 w-full rounded-[1rem] border border-border object-cover"
                                            />
                                            <div className="flex h-full flex-col">
                                                <h3 className="mt-4 text-2xl font-semibold leading-none text-foreground">{project.title}</h3>
                                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                                                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                                                    {t("projectsViewCaseStudy")}
                                                </p>
                                                <div className="mt-3 flex flex-wrap">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <Tag key={`${project.id}-${tech}`} tagKey={techIndex} text={tech} />
                                                    ))}
                                                </div>
                                            </div>
                                        </SectionCard>
                                    </motion.button>
                                </DialogTrigger>
                                <DialogContent className="border-primary/10 bg-background">
                                    <div className="overflow-y-auto p-6 sm:p-7">
                                        <div className="space-y-5 pr-1">
                                            <DialogHeader>
                                                <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                                    {t("projectsPrivateWorkLabel")}
                                                </span>
                                                <DialogTitle>{project.title}</DialogTitle>
                                                <DialogDescription>{project.description}</DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <Tag key={`${project.id}-dialog-${tech}`} tagKey={techIndex} text={tech} />
                                                ))}
                                            </div>
                                            {project.caseStudy ? (
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                            {t("projectsCaseStudyContext")}
                                                        </p>
                                                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.caseStudy.context}</p>
                                                    </div>
                                                    <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                            {t("projectsCaseStudyOwnership")}
                                                        </p>
                                                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.caseStudy.ownership}</p>
                                                    </div>
                                                    <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                            {t("projectsCaseStudyConstraints")}
                                                        </p>
                                                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.caseStudy.constraints}</p>
                                                    </div>
                                                    <div className="rounded-2xl border border-border/80 bg-card/60 p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                            {t("projectsCaseStudyOutcome")}
                                                        </p>
                                                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.caseStudy.outcome}</p>
                                                    </div>
                                                </div>
                                            ) : null}
                                            <p className="rounded-2xl border border-dashed border-border/80 bg-card/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                                {t("projectsCaseStudyNote")}
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        );
                    })}
                </div>
            </div>
        </SectionShell>
    );
};

export default Projects;
