import { motion } from "motion/react";
import profilePic from "../assets/MatheusGomesProfile.jpg";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

const container = (delay: number) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay },
    },
});

const Hero = () => {
    const { t } = useTranslation();
    const heroContent = t("hero.content");

    return (
        <section className="border-b border-border pb-10 sm:pb-14 lg:pb-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                    <div className="flex flex-col items-start">
                        <motion.h1
                            variants={container(0)}
                            initial="hidden"
                            animate="visible"
                            className="pt-2 text-4xl font-semibold tracking-tight text-foreground sm:pt-8 sm:text-5xl lg:pt-16 lg:text-6xl"
                        >
                            Matheus Gomes
                        </motion.h1>
                        <motion.span
                            variants={container(0.2)}
                            initial="hidden"
                            animate="visible"
                            className="mt-3 inline-flex items-center rounded-full border border-border bg-accent px-3 py-1 text-sm font-semibold tracking-wide text-accent-foreground"
                        >
                            Backend Developer
                        </motion.span>
                        <motion.p
                            variants={container(0.4)}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                        >
                            {heroContent}
                        </motion.p>
                        <motion.div
                            variants={container(0.6)}
                            initial="hidden"
                            animate="visible"
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <Button asChild size="lg">
                                <a href="#contact">Start a conversation</a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="#projects">See featured projects</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={container(0.8)}
                            initial="hidden"
                            animate="visible"
                            className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground"
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
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
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
