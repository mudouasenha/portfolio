import cachara from "../assets/projects/cachara.jpg";
import ufsc_brasao from "../assets/projects/ufsc_brasao.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
// import microsoft_certified_fundamentals_badge from "../assets/certifications/microsoft_certified_fundamentals_badge.svg";
 import { t } from "i18next";
// import { Certification } from '../models/Certification';
import { ContactInfo } from '../models/ContactInfo';
import { Languages } from '../models/Languages';

// export const HERO_CONTENT = t("hero.content");

// export const SKILLS = [
//     {
//         name: "Programming and Frameworks",
//         skills: ["C#", ".NET 9", "Entity Framework Core", "GraphQL", "Typescript", "React", "R", "Hangfire"]
//     },
//     {
//         name: "Databases",
//         skills: ["Microsoft SQL Server", "ElasticSearch", "Postgres", "Redis", "TimescaleDB"]
//     },
//     {
//         name: "Cloud & DevOps",
//         skills: ["Azure", "CI/CD",  "Azure API Management", "Docker", "Terraform"]
//     },
//     {
//         name: "Software Architecture",
//         skills: ["Microservices", "Distributed Systems", "Cloud Computing", "Clean Architecture", "Backend", "DDD", "SOLID", "OOP"]
//     },
//     {
//         name: "Testing & Monitoring",
//         skills: ["XUnit", "Unit Testing", "Integration Testing", "Grafana Load Testing", "BenchmarkDotNet"]
//     },
//     {
//         name: "Languages and other Skills",
//         skills: ["English", "Brazilian Portuguese", "Spanish", "Scrum", "Problem-Solving", "Git", "Agile"]
//     }
// ];

// export const ABOUT_TEXT = t("about.text")

// export const EXPERIENCES = [
//     {
//         year: "2021 - Present",
//         role: "Mid-Level Backend Developer",
//         company: "Way2 Technology",
//         description: `Designed and developed enterprise-level microservice applications of an Invoice Collection and Processing Engine, responsible for providing access to over 11k invoices/month via Azure API Management. Developed and maintained scalable systems and APIs for a telemetry data  management ecosystem. Enriched and analyzed system metrics by integrating microservices with telemetry using ElasticSearch. Pull requests, code reviews, QA testing, and deployment were part of the daily routine. Learned, put in practice and reinforced Domain Driven Design, Clean Architecture and SOLID concepts in daily basis development.`,
//         technologies: [".NET", "Azure", "EF Core", "SQL Server", "GraphQL", "CI/CD", "Hangfire", "Testing"],
//     },
//     {
//         year: "2020 - 2021",
//         role: "Backend Developer Intern",
//         company: "Way2 Technology",
//         description: ` Developed and maintained APIs, databases and services to serve solutions inside and outside the product roadmap.`,
//         technologies: ["Node.js", "SQL Server", ".NET"],
//     },
//     {
//         year: "2020 - 2020",
//         role: "Frontend Developer Intern",
//         company: "Pipz Platform",
//         description: `Developed and maintained frontend applications of a Marketing Automation SaaS Platform using React and AngularJS. Implemented marketing automation and contact segmentation using Python and Flask.`,
//         technologies: ["Python", "Flask", "React", "Angular.js", "Postgres"],
//     },
//     {
//         year: "2016 - 2020",
//         role: "Technical Support Analyst",
//         company: "Dígitro Technology",
//         description: `Analyzed, and maintained high-security, critical telephony systems using UNIX and PostgreSQL. Developed automation and optimization scripts using Shell Script. Assisted non-technical clients with clear communication and support, simplifying complex technical concepts for end-users, in diagnosing and resolving urgent issues to minimize downtime.`,
//         technologies: ["UNIX", "PostgreSQL", "Shell Script"],
//     },
// ];

export const PROJECTS = [
    {
        title: "Cachara Social Platform (In Progress...)",
        image: cachara,
        description:
            "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
        technologies: [".NET", "SQL Server", "Microservices", "Redis", "DDD", "MongoDB"],
        url: ""
    },
    {
        title: "Cachara AI Image classifier and data extraction Platform (In Progress...)",
        image: cachara,
        description:
            "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
        technologies: [".NET", "OpenAI", "ML.NET", "Next.js", "React"],
        url: ""
    },
    {
        title: "Portfolio Website",
        image: portfolio,
        description:
            "A personal portfolio website showcasing projects, skills, and contact information.",
        technologies: ["HTML", "CSS", "React", "Tailwindcss"],
        url: ""
    },
    {
        title: "Monography - Data Serialization Techniques evaluation",
        image: ufsc_brasao,
        description:
            "Evaluation of Serialization Strategies for Communication in Distributed Systems.",
        technologies: [".NET", "R", "MessagePack", "Protobuf", "Grafana k6", "BenchmarkDotNet"],
        url: ""
    },
];

// export const LANGUAGES = {
//     "Portuguese": "Native",
//     "English": "Advanced",
//     "Spanish": "Intermediate",
// }

// console.log('Language:', i18next.language);

// const certificationsRaw = t('certifications', { returnObjects: true });
// console.log('certificationsRaw:', certificationsRaw);
// const certifications = t('certifications', { returnObjects: true }) as Certification[];
// const imagesMap: { [key: string]: string } = {
//   "Azure Fundamentals (AZ-900)": microsoft_certified_fundamentals_badge,
//   "Fundamentos do Azure (AZ-900)": microsoft_certified_fundamentals_badge,
// };

// export function getCertifications(): Certification[] {
//   const raw = t('certifications', { returnObjects: true }) as Certification[] || [];
//   return raw.map(cert => {
//     const c = new Certification(cert);
//     c.image = imagesMap[c.name];
//     return c;
//   });
// }

// const certsTest = getCertifications();
// console.log('certsTest:', certsTest);

// console.log(t('certifications'));
// console.log(certifications);
// export const CERTIFICATIONS = certifications.map(cert => {
//   const c = new Certification(cert);
//   c.image = imagesMap[c.name];
//   return c;
// });

const contact = t('contact', { returnObjects: true }) as ContactInfo;
const languages = t('languages', { returnObjects: true }) as Languages;

//export const CERTIFICATIONS: Certification[] = certifications.map(cert => new Certification(cert));
export const CONTACT: ContactInfo = new ContactInfo(contact);
export const LANGUAGES: Languages = languages;

// export const CERTIFICATIONS = [{
//     name: "Azure Fundamentals (AZ-900)",
//     issued_by: "Microsoft",
//     date: "2025-01-14T00:00:00.000-03:00",
//     image: microsoft_certified_fundamentals_badge,
//     description: "Demonstrate foundational knowledge of cloud concepts, core Azure services, plus Azure management and governance features and tools.",
//     url: "https://learn.microsoft.com/pt-br/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification"
// }]

// export const CONTACT = {
//     address: "Florianopolis, SC, Brazil",
//     phoneNo: "Phone number: Contact me at LinkedIn",
//     email: "Email: contact.me@linkedin",
// };
