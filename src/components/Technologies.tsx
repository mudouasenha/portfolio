import { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import { GrGraphQl } from "react-icons/gr";
import { SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import { SKILLS } from "../constants";
import Tag from "./Tag";

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

const cardHoverEffect = {
    hover: {
        scale: 1.1,
        boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.2)",
        transition: { duration: 0.3 },
    },
};

const Technologies = () => {
    return (
        <div className="border-b border-neutral-800 pb-24">
            {/* Technologies Section */}
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
                className="flex flex-wrap items-center justify-center gap-6"
            >
                {[ 
                    { icon: <TbBrandCSharp className="text-7xl text-purple-400" />, delay: 2.5 },
                    { icon: <DiMsqlServer className="text-7xl text-red-400" />, delay: 5 },
                    { icon: <VscAzure className="text-7xl text-blue-400" />, delay: 3 },
                    { icon: <SiTypescript className="text-7xl text-blue-400" />, delay: 2 },
                    { icon: <GrGraphQl className="text-7xl text-pink-500" />, delay: 6 },
                    { icon: <DiRedis className="text-7xl text-red-600" />, delay: 4 },
                ].map((tech, index) => (
                    <motion.div
                        key={index}
                        variants={iconVariants(tech.delay)}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-neutral-800 p-4"
                    >
                        {tech.icon}
                    </motion.div>
                ))}
            </motion.div>

            {/* Skills Section */}
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
                {SKILLS.map((category, categoryIndex) => (
                    <motion.div
                        key={categoryIndex}
                        whileHover="hover"
                        className="rounded-lg bg-neutral-900 p-6 shadow-md"
                        variants={cardHoverEffect}
                    >
                        <h2 className="mb-3 text-lg font-semibold text-neutral-300">
                            {category.name}
                        </h2>
                        <div className="flex flex-wrap">  {/* gap-1 */}
                        {category.skills.map((tech, index) => (
                            <Tag key={index} text={tech} />
                        ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Technologies;
