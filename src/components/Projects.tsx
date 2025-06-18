import { motion } from "motion/react";
import Tag from "./Tag";
import { useTranslation } from 'react-i18next';
import { Project } from '../models/Project';
import cachara from "../assets/projects/cachara.jpg";
import ufsc_brasao from "../assets/projects/ufsc_brasao.jpg";
import portfolio from "../assets/projects/portfolio.jpg";

const Projects = () => {
    const { t } = useTranslation();

    const imagesMap: Record<string, string> = {
  'monography-data-serialization': ufsc_brasao,
  'cachara-social-platform': cachara,
  'cachara-ai-image-classifier': cachara,
  'portfolio-website': portfolio,
};

      const rawProjects = t('projectsList', { returnObjects: true }) as Project[] || [];
      const projects = rawProjects.map(cert => {
        const c = new Project(cert);
        c.image = imagesMap[c.id] || '';
        return c;
      });

      console.log('rawProjects:', projects);

    return (
        <div className="border-b border-neutral-900 pb-4">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-20 text-center text-4xl"
            >
                {t('projects')}
            </motion.h1>
            <div>
                {projects.map((project, index) => (
                      <a 
                      key={index}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-sm lg:max-w-md"
                    >
                    <div  className="mb-8 flex flex-wrap lg:justify-center">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-1/4"
                        >
                            <img
                                src={project.image}
                                width={300}
                                height={250}
                                alt={project.title}
                                className="mb-6 rounded"
                            />
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 100 }}
                            transition={{ duration: 1 }}
                            className="w-full max-w-xl lg:w-3/4"
                        >
                            <h6 className="mb-2 font-semibold">{project.title}</h6>
                            <p className="mb-1 text-neutral-400">{project.description}</p>
                            <div className="flex flex-wrap">
                                {project.technologies.map((tech, index) => (
                                    <Tag key={index} tagKey={index} text={tech} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    </a>
                ))}
                <div></div>
            </div>
        </div>
    );
};

export default Projects;
