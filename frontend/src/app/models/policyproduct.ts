export interface PolicyProduct {
  _id?: string; 
  code: string;
  title: string;
  description: string;
  premium: number;
  termMonths: number;
  minSumInsured: number;
  createdAt?: Date;
  updatedAt?: Date;
}