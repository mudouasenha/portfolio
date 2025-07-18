import { motion } from "motion/react";
import aboutImg from "../assets/MatheusGomesProfile.jpg";
import ReactMarkdown from "react-markdown";
import { Trans, useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
  
    const about = t("about.text");

    return (
        <div className="border-b border-neutral-800 pb-4">
            <h1 className="my-20 text-center text-4xl">
                <Trans i18nKey="aboutMe" defaults="About <1>Me</1>">
                    About <span className="text-neutral-500">Me</span>
                </Trans>
            </h1>
            <div className="flex flex-wrap">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2 lg:p-8"
                >
                    <div className="flex items-center justify-center">
                        <img className="rounded-2xl" src={aboutImg} alt="about" />
                    </div>
                </motion.div>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="flex justify-center lg:justify-start">
                    <div className="my-2 max-w-xl py-6 font-light text-justify leading-relaxed tracking-tighter">
                        <ReactMarkdown>{about}</ReactMarkdown>
                    </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
