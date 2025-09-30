import { PolicyProduct } from "./policyproduct";

export interface UserPolicy {
  _id?: string; 
  userId: string; 
  policyProductId: string | PolicyProduct 
  startDate: Date;
  endDate: Date;
  premiumPaid: number;
  status?: 'active' | 'expired' | 'cancelled';
  assignedAgentId?: string; 
  nominee: {
    name: string;
    relation: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}