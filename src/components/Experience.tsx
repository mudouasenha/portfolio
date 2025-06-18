import { motion } from "motion/react";
import Tag from "./Tag";
import { useTranslation } from 'react-i18next';
import { ExperienceItem } from '../models/ExperienceItem';

const Experience = () => {
    const { t } = useTranslation();

    const experiences = t('experiences', { returnObjects: true }) as ExperienceItem[];

    return (
        <div className="border-b border-neutral-900 pb-4">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-20 text-center text-4xl"
            >
                {t('experience')} 
            </motion.h1>
            <div>
                {experiences.map((experience, index) => (
                    <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-1/4"
                        >
                            <p className="mb-2 text-sm text-neutral-400">{experience.date}</p>
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 100 }}
                            transition={{ duration: 1 }}
                            className="w-full max-w-xl lg:w-3/4"
                        >
                            <h6 className="mb-2 font-semibold">
                                {experience.role} -{" "}
                                <span className="text-sm text-purple-100">
                                    {experience.company}
                                </span>
                            </h6>
                            <p className="mb-1 text-neutral-400">{experience.description}</p>
                            <div className="flex flex-wrap">
                                {experience.technologies.map((tech, index) => (
                                    <Tag key={index} tagKey={index} text={tech} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
