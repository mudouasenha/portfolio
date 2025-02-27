import cachara from "../assets/projects/cachara.jpg";
import ufsc_brasao from "../assets/projects/ufsc_brasao.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
import microsoft_certified_fundamentals_badge from "../assets/certifications/microsoft_certified_fundamentals_badge.svg";

export const HERO_CONTENT = `I'm a .NET Developer with professional experience in software development since 2020, specializing in C#, .NET, MS SQL, Azure, and related technologies. I have a strong passion for crafting clean, scalable, and maintainable solutions, always prioritizing concise and readable code. Experienced in agile environments, I excel at collaborating within diverse teams to deliver high-quality software efficiently. I'm fluent in English and adaptable to new challenges, and currently enhancing my expertise in microservices, Azure, and Domain-Driven Design (DDD) and IA programming to deliver even more robust and modern solutions.
`;

export const SKILLS = [
    {
        name: "Programming and Frameworks",
        skills: ["C#", ".NET 9", "Entity Framework Core", "GraphQL", "Node", "React", "R"]
    },
    {
        name: "Databases",
        skills: ["Microsoft SQL Server", "ElasticSearch", "Postgres", "TimescaleDB"]
    },
    {
        name: "Cloud & DevOps",
        skills: ["Azure", "CI/CD",  "Azure API Management", "Hangfire", "Docker"]
    },
    {
        name: "Software Architecture",
        skills: ["Microservices", "Distributed Systems", "Cloud Computing", "Clean Architecture", "Backend", "DDD", "SOLID", "OOP"]
    },
    {
        name: "Testing & Monitoring",
        skills: ["XUnit", "Unit Testing", "Integration Testing", "Grafana Load Testing", "BenchmarkDotNet"]
    },
    {
        name: "Languages and other Skills",
        skills: ["English", "Brazilian Portuguese", "Spanish", "Scrum", "Problem-Solving", "Git", "Agile"]
    }
];

export const ABOUT_TEXT = `I am a hard-working and versatile backend developer with a passion for building **robust, modern, and maintainable solutions**. With **5 years of professional experience**, I have worked across diverse systems and technologies, contributing to **the full Software Development Life Cycle (SDLC)** while ensuring **scalability and business value**.

My journey in development began in high school, where I earned a **technical degree in Telecommunications** and developed a deep curiosity for how the internet and software systems work. Starting in **technical support**, I transitioned into backend development, continuously striving to **learn, improve, and adapt to new challenges**.

I thrive in **collaborative, high-communication environments**, where I can exchange knowledge with teammates and other business areas. Experienced in **solving complex and critical problems**, I am dedicated to delivering **high-quality, robust solutions** that drive real impact. My tech stack includes **.NET, Azure, Entity Framework, MSSQL, PostgreSQL** and others.

Outside of coding, I enjoy **going to the gym, spending time with family and friends, and exploring new technologies**. I also love refining my code, researching best practices, and watching tech-related content on YouTube.
`;

export const EXPERIENCES = [
    {
        year: "2021 - Present",
        role: "Mid-Level Backend Developer",
        company: "Way2 Technology",
        description: `Designed and developed enterprise-level microservice applications of an Invoice Collection and Processing Engine, responsible for providing access to over 11k invoices/month via Azure API Management. Developed and maintained scalable systems and APIs for a telemetry data  management ecosystem. Enriched and analyzed system metrics by integrating microservices with telemetry using ElasticSearch. Pull requests, code reviews, QA testing, and deployment were part of the daily routine. Learned, put in practice and reinforced Domain Driven Design, Clean Architecture and SOLID concepts in daily basis development.`,
        technologies: [".NET", "Azure", "EF Core", "SQL Server", "GraphQL", "CI/CD", "Hangfire", "Testing"],
    },
    {
        year: "2020 - 2021",
        role: "Backend Developer Intern",
        company: "Way2 Technology",
        description: ` Developed and maintained APIs, databases and services to serve solutions inside and outside the product roadmap.`,
        technologies: ["Node.js", "SQL Server", ".NET"],
    },
    {
        year: "2020 - 2020",
        role: "Frontend Developer Intern",
        company: "Pipz Platform",
        description: `Developed and maintained frontend applications of a Marketing Automation SaaS Platform using React and AngularJS. Implemented marketing automation and contact segmentation using Python and Flask.`,
        technologies: ["Python", "Flask", "React", "Angular.js", "Postgres"],
    },
    {
        year: "2016 - 2020",
        role: "Technical Support Analyst",
        company: "Dígitro Technology",
        description: `Analyzed, and maintained high-security, critical telephony systems using UNIX and PostgreSQL. Developed automation and optimization scripts using Shell Script. Assisted non-technical clients with clear communication and support, simplifying complex technical concepts for end-users, in diagnosing and resolving urgent issues to minimize downtime.`,
        technologies: ["UNIX", "PostgreSQL", "Shell Script"],
    },
];

export const PROJECTS = [
    {
        title: "Cachara Social Platform (In Progress...)",
        image: cachara,
        description:
            "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
        technologies: [".NET", "SQL Server", "Microservices", "Redis", "DDD", "MongoDB"],
    },
    {
        title: "Cachara AI Image classifier and data extraction Platform (In Progress...)",
        image: cachara,
        description:
            "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
        technologies: [".NET", "OpenAI", "ML.NET", "Next.js", "React"],
    },
    {
        title: "Portfolio Website",
        image: portfolio,
        description:
            "A personal portfolio website showcasing projects, skills, and contact information.",
        technologies: ["HTML", "CSS", "React", "Tailwindcss"],
    },
    {
        title: "Monography - Data Serialization Techniques evaluation",
        image: ufsc_brasao,
        description:
            "Evaluation of Serialization Strategies for Communication in Distributed Systems.",
        technologies: [".NET", "R", "MessagePack", "Protobuf", "Grafana k6", "BenchmarkDotNet"],
    },
];

export const LANGUAGES = {
    "Portuguese": "Native",
    "English": "Advanced",
    "Spanish": "Intermediate",
}

export const CERTIFICATIONS = [{
    name: "Azure Fundamentals (AZ-900)",
    issued_by: "Microsoft",
    date: "2025-01-14T00:00:00.000-03:00",
    image: microsoft_certified_fundamentals_badge,
    description: "Demonstrate foundational knowledge of cloud concepts, core Azure services, plus Azure management and governance features and tools.",
    url: "https://learn.microsoft.com/pt-br/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification"
}]

export const CONTACT = {
    address: "Florianopolis, SC, Brazil",
    phoneNo: "Phone number: Contact me at LinkedIn",
    email: "Email: contact.me@linkedin",
};
