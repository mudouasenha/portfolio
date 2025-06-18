export class Certification {
  id!: string;
  name!: string;
  issued_by!: string;
  date!: string;
  description!: string;
  url!: string;
  image?: string;

  constructor(data: Partial<Certification>) {
    Object.assign(this, data);
  }
}


