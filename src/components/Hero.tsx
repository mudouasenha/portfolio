import { motion, useReducedMotion } from "motion/react";
import profilePic from "../assets/MatheusGomesProfileMain.jpg";
import { useTranslation } from "react-i18next";
import { Skeleton } from "boneyard-js/react";

import { Button } from "@/components/ui/button";

const DEFAULT_MOTION_DURATION_MEDIUM = 0.45;
const DEFAULT_MOTION_EASE_STANDARD: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const getMotionDurationMedium = () => {
    if (typeof window === "undefined") {
        return DEFAULT_MOTION_DURATION_MEDIUM;
    }

    const tokenValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--motion-duration-medium")
        .trim();
    const parsedValue = Number.parseFloat(tokenValue);

    if (!Number.isFinite(parsedValue)) {
        return DEFAULT_MOTION_DURATION_MEDIUM;
    }

    return tokenValue.endsWith("ms") ? parsedValue / 1000 : parsedValue;
};

const getMotionEaseStandard = (): [number, number, number, number] => {
    if (typeof window === "undefined") {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    const tokenValue = getComputedStyle(document.documentElement)
        .getPropertyValue("--motion-ease-standard")
        .trim();

    if (!tokenValue.startsWith("cubic-bezier(") || !tokenValue.endsWith(")")) {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    const segments = tokenValue
        .slice("cubic-bezier(".length, -1)
        .split(",")
        .map((segment) => Number.parseFloat(segment.trim()));

    if (segments.length !== 4 || segments.some((segment) => !Number.isFinite(segment))) {
        return DEFAULT_MOTION_EASE_STANDARD;
    }

    return [segments[0], segments[1], segments[2], segments[3]];
};

const container = (
    delay: number,
    reduceMotion: boolean,
    motionDurationMedium: number,
    motionEaseStandard: [number, number, number, number],
) => ({
    hidden: { y: reduceMotion ? 0 : 18, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: reduceMotion
            ? { duration: 0 }
            : { duration: motionDurationMedium, delay, ease: motionEaseStandard },
    },
});

const Hero = () => {
    const { t } = useTranslation();
    const resumeUrl = "https://docs.google.com/document/d/1Jg-Sh3dTa0GUqQ-YPFxiOGZY-79yrDN8Bqc7HcrYDD4/edit?usp=sharing";
    const heroLead = t("hero.lead");
    const heroHighlights = t("hero.highlights", { returnObjects: true });
    const heroRecruiterSnapshot = t("hero.recruiterSnapshot", { returnObjects: true });
    const highlights = Array.isArray(heroHighlights) ? heroHighlights : [];
    const recruiterSnapshot = Array.isArray(heroRecruiterSnapshot) ? heroRecruiterSnapshot : [];
    const reduceMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? false;
    const motionDurationMedium = getMotionDurationMedium();
    const motionEaseStandard = getMotionEaseStandard();

    return (
        <Skeleton name="hero-section" loading={false}>
            <section className="border-b border-border/80 pb-8 pt-2 sm:pb-10 sm:pt-4 lg:pb-14 lg:pt-6">
                <div className="grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.82fr)] lg:items-start lg:gap-10">
                    <div className="max-w-3xl">
                        <motion.p
                            variants={container(0, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground"
                        >
                            {t("hero.eyebrow")}
                        </motion.p>
                        <motion.h1
                            variants={container(0.08, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="max-w-4xl text-4xl font-semibold leading-[0.94] text-foreground sm:text-5xl lg:text-6xl"
                        >
                            {t("hero.title")}
                        </motion.h1>
                        <motion.span
                            variants={container(0.16, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-4 inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs"
                        >
                            {t("hero.subtitle")}
                        </motion.span>
                        <motion.p
                            variants={container(0.25, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
                        >
                            {heroLead}
                        </motion.p>
                        <motion.div
                            variants={container(0.3, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-5 max-w-3xl rounded-[1.15rem] border border-border/80 bg-card/75 p-3.5 sm:p-4"
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                {t("hero.recruiterSnapshotLabel")}
                            </p>
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                {recruiterSnapshot.slice(0, 3).map((item) => (
                                    <li key={item} className="text-sm leading-snug text-foreground/90 sm:text-[0.92rem]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            variants={container(0.35, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap"
                        >
                            <Button asChild size="lg" className="min-w-40 rounded-full px-4">
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">{t("hero.primaryCta")}</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="min-w-40 rounded-full px-4">
                                <a href="#projects">{t("hero.secondaryCta")}</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={container(0.45, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-7 grid gap-2.5 sm:grid-cols-3"
                        >
                            {highlights.map((item) => (
                                <div key={item} className="rounded-[1rem] border border-border/80 bg-card/70 px-3 py-3">
                                    <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <div className="w-full lg:pt-2">
                        <div className="relative mx-auto max-w-[22rem] lg:ml-auto lg:mr-0">
                            <div className="absolute -inset-3 rounded-[1.75rem] border border-primary/15" />
                            <div className="absolute -right-4 top-6 h-16 w-16 rounded-full bg-accent/70 blur-2xl" />
                            <div className="absolute -left-3 bottom-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                            <div className="relative rounded-[1.75rem] border border-border/90 bg-card/90 p-2.5 shadow-[0_24px_70px_-42px_rgba(28,36,60,0.45)]">
                        <motion.img
                            initial={reduceMotion ? { opacity: 1 } : { x: 72, opacity: 0 }}
                            animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={reduceMotion ? { duration: 0 } : { duration: motionDurationMedium, delay: 0.45, ease: motionEaseStandard }}
                            src={profilePic}
                            alt="Matheus Gomes"
                                    className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
                        />
                                <div className="flex items-end justify-between gap-3 px-2 pb-1 pt-3">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                            {t("hero.portraitLabel")}
                                        </p>
                                        <p className="mt-1 text-base font-semibold text-foreground">Matheus Gomes</p>
                                    </div>
                                    <p className="max-w-[9rem] text-right text-xs leading-snug text-muted-foreground sm:text-sm">
                                        {t("hero.portraitCaption")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Skeleton>
    );
};

export default Hero;
