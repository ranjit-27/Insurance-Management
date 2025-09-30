import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:5000/api/v1/admin'; 


  constructor(private http: HttpClient) { }

  getAllAgents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agents`);
  }

 
  getAgentPolicies(agentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agent/${agentId}`);
  }
 
 
  assignAgent(agentId: string, userPolicyId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/agents/${userPolicyId}/assign`, { agentId });
  }

  getUnassignedUserPolicies(): Observable<any> {
  return this.http.get(`http://localhost:5000/api/v1/admin/policies/unassigned`);
  }

  createAgent(agentData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/agent`, agentData);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(`http://localhost:5000/api/v1/admin/customers`);
  }


  getCustomerPolicies(customerId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/v1/admin/customer/${customerId}`);
  }
}
