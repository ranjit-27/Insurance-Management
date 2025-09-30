export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string; 
  role?: 'customer' | 'admin' | 'agent';
  createdAt?: Date;
  updatedAt?: Date;
}