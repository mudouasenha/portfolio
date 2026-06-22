export interface ProjectCaseStudy {
    context: string;
    ownership: string;
    constraints: string;
    outcome: string;
}

export class Project {
    id!: string;
    title!: string;
    description!: string;
    technologies!: string[];
    image?: string;
    url?: string;
    caseStudy?: ProjectCaseStudy;

    constructor(data: Partial<Project>) {
        Object.assign(this, data);
    }
}