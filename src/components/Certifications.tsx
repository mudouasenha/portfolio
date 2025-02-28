import { motion } from "motion/react";
import { CERTIFICATIONS } from "../constants";

const formatDate = (date: string) => {
    const userLocale = navigator.language || "en-US";
    return new Intl.DateTimeFormat(userLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const cardHoverEffect = {
    hover: {
      scale: 1.07,
      boxShadow: "0px 8px 22px rgba(255, 255, 255, 0.15)",
      backgroundColor: "rgba(30, 30, 35, 0.85)",
      borderColor: "rgba(34, 211, 238, 1)",
      transition: { duration: 0.3 },
  },
};

const Certifications = () => {
    return (
        <div className="border-b border-neutral-800 pb-20 border-width-6">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-10 text-center text-4xl"
            >
                Certifications
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-6">
            {CERTIFICATIONS.map((certification, index) => (
              <a 
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm lg:max-w-md"
              >
                  <motion.div
                      key={index}
                      whileHover="hover"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      variants={cardHoverEffect}
                      className="rounded-xl border border-neutral-700 bg-neutral-900/70 p-6 text-center shadow-lg transition-all duration-100"
                  >
                      <h4 className="mb-4 text-lg font-semibold text-neutral-200">{certification.name}</h4>
                      <div className="flex justify-center">
                          <img
                              src={certification.image}
                              alt={certification.name}
                              className="mb-4 h-32 w-auto rounded-lg"
                          />
                      </div>
                      <p className="text-sm text-neutral-400">
                          <span className="font-semibold text-cyan-400">Issued by:</span> {certification.issued_by} on <strong>{formatDate(certification.date)}</strong>
                      </p>
                      <p className="mt-2 text-sm text-neutral-500">{certification.description}</p>
                  </motion.div>
              </a>
            ))}
            </div>
        </div>
    );
};

export default Certifications;
