export class SkillSet {
    name!: string;
    skills!: string[];

    constructor(data: Partial<SkillSet>) {
        Object.assign(this, data);
    }
}