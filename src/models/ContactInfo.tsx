export class ContactInfo {
  address!: string;
  phoneNo!: string;
  email!: string;

  constructor(data: Partial<ContactInfo>) {
    Object.assign(this, data);
  }
}
