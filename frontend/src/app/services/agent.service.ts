import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AgentService {
  private baseUrl = 'http://localhost:5000/api/v1/agent';

  constructor(private http: HttpClient) {}

  // Get customers under this agent
  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers`);
  }
 
  // Approve/reject customer policy
  updatePolicyStatus(policyId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approvepolicy/${policyId}`, { status });
  }

  // Approve/reject claim
  updateClaimStatus(claimId: string, status: string, notes?: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approveclaim/${claimId}`, { status, notes });
  }

  // Get policies of a specific customer
  getCustomerPolicies(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${customerId}/policies`);
  }

  // Get claims assigned to this agent
  getClaims(): Observable<any> {
    return this.http.get(`${this.baseUrl}/claims`);
  }
}
