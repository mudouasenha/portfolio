export class Project {
    id!: string;
    title!: string;
    description!: string;
    technologies!: string[];
    image?: string;
    url?: string;

    constructor(data: Partial<Project>) {
        Object.assign(this, data);
    }
}