import { motion, useReducedMotion } from "motion/react";

import About from "./components/About";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Technologies from "./components/Technologies";

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

function App() {
    const reduceMotion = useReducedMotion();
    const motionDurationMedium = getMotionDurationMedium();
    const motionEaseStandard = getMotionEaseStandard();

    return (
        <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-[26rem] opacity-25 [background:radial-gradient(circle_at_top,var(--primary)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 left-0 h-[20rem] w-[24rem] opacity-30 [background:radial-gradient(circle,var(--accent)_0%,transparent_72%)]" />
            </div>
            <motion.main
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: motionDurationMedium, ease: motionEaseStandard }}
                className="container mx-auto max-w-7xl px-4 pt-2 sm:px-6 sm:pt-0 lg:px-8"
            >
                <Navbar />
                <Hero />
                <section id="about" className="scroll-mt-28">
                    <About />
                </section>
                <section id="experience" className="scroll-mt-28">
                    <Experience />
                </section>
                <section id="projects" className="scroll-mt-28">
                    <Projects />
                </section>
                <section id="technologies" className="scroll-mt-28">
                    <Technologies />
                </section>
                <section id="skills" className="scroll-mt-28">
                    <Skills />
                </section>
                <section id="certifications" className="scroll-mt-28">
                    <Certifications />
                </section>
                <section id="contact" className="scroll-mt-28">
                    <Contact />
                </section>
            </motion.main>
        </div>
    );
}

export default App;
