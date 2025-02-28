import { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import { GrGraphQl } from "react-icons/gr";
import { SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

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
        <div className="border-b border-neutral-900 pb-24">
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
        </div>
    );
};

export default Technologies;
