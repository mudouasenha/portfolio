import { motion } from "motion/react";
import aboutImg from "../assets/MatheusGomesProfile.jpg";
import ReactMarkdown from "react-markdown";
import { Trans, useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
  
    const about = t("about.text");

    return (
        <div className="border-b border-border/80 py-14 sm:py-16">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.4fr_1fr] lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        {t("about.kicker")}
                    </p>
                </div>
                <div>
                    <h2 className="text-4xl font-semibold leading-none sm:text-5xl">
                        <Trans i18nKey="aboutMe" defaults="About <1>Me</1>">
                            About <span className="text-muted-foreground">Me</span>
                        </Trans>
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {t("about.summary")}
                    </p>
                </div>
            </div>
            <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:pr-8"
                >
                    <div className="flex items-center justify-center lg:justify-start">
                        <div className="rounded-[1.8rem] border border-border/90 bg-card p-3 shadow-[0_18px_50px_-34px_rgba(28,36,60,0.45)] ring-1 ring-primary/10">
                            <img className="w-full max-w-sm rounded-xl object-cover sm:max-w-md" src={aboutImg} alt="about" />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <div className="flex justify-center lg:justify-start">
                    <div className="max-w-2xl border-l border-border/80 pl-6 text-left text-[1.02rem] leading-8 text-muted-foreground sm:pl-8">
                        <ReactMarkdown>{about}</ReactMarkdown>
                    </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
