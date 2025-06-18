import { motion } from "framer-motion";
import Tag from "./Tag";
import { SkillSet } from "../models/SkillSet";
import { useTranslation } from 'react-i18next';

const cardHoverEffect = {
    hover: {
        scale: 1.05,
        boxShadow: "0px 6px 18px rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(24, 24, 27, 0.85)",
        borderColor: "rgba(163, 163, 163, 0.2)",
        transition: { duration: 0.2 },
    },
};

const Skills = () => {
    const { t } = useTranslation();

    const skills = t('skills', { returnObjects: true }) as SkillSet[];

    return (
        <div className="border-b border-neutral-800 pb-24">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5 }}
                className="my-20 text-center text-4xl"
            >
                Skills
            </motion.h1>

            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {skills.map((category, categoryIndex) => (
                    <motion.div
                    key={categoryIndex}
                    whileHover="hover"
                    className="rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-lg transition-all duration-100"
                    variants={cardHoverEffect}
                    >
                        <h2 className="mb-3 text-lg font-semibold text-neutral-300">{category.name}</h2>
                        <div className="flex flex-wrap gap-1">
                            {category.skills.map((tech, index) => (
                                <Tag key={index} tagKey={index} text={tech} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;
