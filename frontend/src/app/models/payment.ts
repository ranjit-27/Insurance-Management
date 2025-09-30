export interface Payment {
  _id?: string; 
  userId: string; 
  userPolicyId: string;
  amount: number;
  method: 'card' | 'net banking' | 'offline' | 'simulated';
  reference: string;
  createdAt?: Date;
}