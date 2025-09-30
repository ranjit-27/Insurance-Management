export interface Claim {
  _id?: string; 
  userId: string;
  userPolicyId: string;
  incidentDate: Date;
  description: string;
  amountClaimed: number;
  status?: 'pending' | 'approved' | 'rejected';
  decisionNotes?: string;
  decidedByAgentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
