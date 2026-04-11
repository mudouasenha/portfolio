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
    const heroLead = t("hero.lead");
    const heroHighlights = t("hero.highlights", { returnObjects: true });
    const heroProofStrip = t("hero.proofStrip", { returnObjects: true });
    const highlights = Array.isArray(heroHighlights) ? heroHighlights : [];
    const proofStrip = Array.isArray(heroProofStrip) ? heroProofStrip : [];
    const reduceMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? false;
    const motionDurationMedium = getMotionDurationMedium();
    const motionEaseStandard = getMotionEaseStandard();

    return (
        <Skeleton name="hero-section" loading={false}>
            <section className="border-b border-border/80 pb-12 pt-4 sm:pb-16 sm:pt-6 lg:pb-24 lg:pt-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-14">
                    <div className="max-w-3xl">
                        <motion.p
                            variants={container(0, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                        >
                            {t("hero.eyebrow")}
                        </motion.p>
                        <motion.h1
                            variants={container(0.08, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="max-w-4xl text-5xl font-semibold leading-[0.92] text-foreground sm:text-6xl lg:text-7xl"
                        >
                            {t("hero.title")}
                        </motion.h1>
                        <motion.span
                            variants={container(0.16, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-5 inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm"
                        >
                            {t("hero.subtitle")}
                        </motion.span>
                        <motion.p
                            variants={container(0.25, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
                        >
                            {heroLead}
                        </motion.p>
                        <motion.div
                            variants={container(0.35, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
                        >
                            <Button asChild size="lg" className="min-w-44 rounded-full px-5">
                                <a href="#contact">{t("hero.primaryCta")}</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="min-w-44 rounded-full px-5">
                                <a href="#projects">{t("hero.secondaryCta")}</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={container(0.45, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-10 grid gap-3 sm:grid-cols-3"
                        >
                            {highlights.map((item) => (
                                <div key={item} className="rounded-[1.2rem] border border-border/80 bg-card/70 px-4 py-4">
                                    <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            variants={container(0.55, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-8 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                        >
                            {proofStrip.map((item) => (
                                <span key={item} className="border-b border-border/80 pb-1">
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                    <div className="w-full lg:pt-6">
                        <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
                            <div className="absolute -inset-4 rounded-[2rem] border border-primary/15" />
                            <div className="absolute -right-5 top-8 h-20 w-20 rounded-full bg-accent/70 blur-2xl" />
                            <div className="absolute -left-4 bottom-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                            <div className="relative rounded-[2rem] border border-border/90 bg-card/90 p-3 shadow-[0_30px_80px_-40px_rgba(28,36,60,0.5)]">
                        <motion.img
                            initial={reduceMotion ? { opacity: 1 } : { x: 72, opacity: 0 }}
                            animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={reduceMotion ? { duration: 0 } : { duration: motionDurationMedium, delay: 0.45, ease: motionEaseStandard }}
                            src={profilePic}
                            alt="Matheus Gomes"
                                    className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                        />
                                <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                                            {t("hero.portraitLabel")}
                                        </p>
                                        <p className="mt-1 text-lg font-semibold text-foreground">Matheus Gomes</p>
                                    </div>
                                    <p className="max-w-[10rem] text-right text-sm leading-snug text-muted-foreground">
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
