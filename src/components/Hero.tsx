import { motion, useReducedMotion } from "motion/react";
import profilePic from "../assets/MatheusGomesProfile.jpg";
import { useTranslation } from "react-i18next";

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
    const heroContent = t("hero.content");
    const reduceMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? false;
    const motionDurationMedium = getMotionDurationMedium();
    const motionEaseStandard = getMotionEaseStandard();

    return (
        <section className="border-b border-border pb-10 pt-2 sm:pb-14 sm:pt-4 lg:pb-20 lg:pt-8">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                    <div className="flex flex-col items-start">
                        <motion.h1
                            variants={container(0, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="pt-0 text-4xl font-semibold tracking-tight text-foreground sm:pt-6 sm:text-5xl lg:pt-12 lg:text-6xl"
                        >
                            Matheus Gomes
                        </motion.h1>
                        <motion.span
                            variants={container(0.15, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-3 inline-flex items-center rounded-full border border-border bg-accent px-3 py-1 text-sm font-semibold tracking-wide text-accent-foreground"
                        >
                            Backend Developer
                        </motion.span>
                        <motion.p
                            variants={container(0.25, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                        >
                            {heroContent}
                        </motion.p>
                        <motion.div
                            variants={container(0.35, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
                        >
                            <Button asChild size="lg">
                                <a href="#contact">Start a conversation</a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="#projects">See featured projects</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={container(0.45, shouldReduceMotion, motionDurationMedium, motionEaseStandard)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 flex flex-wrap gap-4 text-sm text-foreground sm:mt-8"
                        >
                            <span className="rounded-md border border-border bg-background px-3 py-2">TypeScript + .NET focus</span>
                            <span className="rounded-md border border-border bg-background px-3 py-2">Production API architecture</span>
                            <span className="rounded-md border border-border bg-background px-3 py-2">Bilingual delivery (EN/PT)</span>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full lg:p-4">
                    <div className="flex justify-center lg:justify-end">
                        <motion.img
                            initial={reduceMotion ? { opacity: 1 } : { x: 72, opacity: 0 }}
                            animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={reduceMotion ? { duration: 0 } : { duration: motionDurationMedium, delay: 0.45, ease: motionEaseStandard }}
                            src={profilePic}
                            alt="Matheus Gomes"
                            className="w-full max-w-sm rounded-2xl border border-border bg-card object-cover p-2 shadow-sm sm:max-w-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
