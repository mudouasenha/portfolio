import { Variants } from "framer-motion";
import { motion } from "motion/react";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import { GrGraphQl } from "react-icons/gr";
import { SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import { SKILLS } from "../constants";

const iconVariants = (duration: number): Variants => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
        },
    },
});

const Technologies = () => {
    return (
        <div className="border-b border-neutral-800 pb-24">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5 }}
                className="my-20 text-center text-4xl"
            >
                Technologies
            </motion.h1>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
            >
                <motion.div
                    variants={iconVariants(2.5)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <TbBrandCSharp className="text-7xl text-purple-400" />
                </motion.div>
                <motion.div
                    variants={iconVariants(5)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <DiMsqlServer className="text-7xl text-red-400" />
                </motion.div>
                <motion.div
                    variants={iconVariants(3)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <VscAzure className="text-7xl text-blue-400" />
                </motion.div>

                <motion.div
                    variants={iconVariants(2)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <SiTypescript className="text-7xl text-blue-400" />
                </motion.div>
                <motion.div
                    variants={iconVariants(6)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <GrGraphQl className="text-7xl text-pink-500" />
                </motion.div>
                <motion.div
                    variants={iconVariants(4)}
                    initial="initial"
                    animate="animate"
                    className="rounded-2xl border-4 border-neutral-800 p-4"
                >
                    <DiRedis className="text-7xl text-red-600" />
                </motion.div>
            </motion.div>
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
                className="mx-auto max-w-4xl space-y-6"
            >
                {SKILLS.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                        <h2 className="mb-3 text-lg font-semibold text-neutral-300">
                            {category.name}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((tech, index) => (
                                <span
                                    key={index}
                                    className="mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-900"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
        
    );
};

export default Technologies;
