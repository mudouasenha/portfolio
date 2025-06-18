export class ExperienceItem {
    date!: string;
    role!: string;
    company!: string;
    description!: string;
    technologies!: string[];
    //url?: string;
    
    constructor(data: Partial<ExperienceItem>) {
        Object.assign(this, data);
    }
}

