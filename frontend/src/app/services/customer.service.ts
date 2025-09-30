import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPolicy } from '../models/userpolicy';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = "http://localhost:5000/api/v1/customer";

  constructor(private http: HttpClient) {}

  // 1️⃣ Get all available policies
  getAllPolicies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/policies`); 
  }

  // 2️⃣ Get policy details by ID
  getPolicyById(id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/v1/customer/policies/${id}`)
  }

  // 3️⃣ Get policies purchased by current user
  getMyPolicies(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/my/policies`);
  }

  getuserPolicyById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/v1/customer/my/policies/${id}`);
  }


  // 4️⃣ Purchase a policy
  purchasePolicy(id: string, purchaseData: { nominee: { name: string; relation: string } }): Observable<any> {
  return this.http.post(`http://localhost:5000/api/v1/customer/policies/${id}/purchase`, purchaseData);
  }


  // 5️⃣ Cancel a purchased policy
  cancelPolicy(userPolicyId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/policies/${userPolicyId}/cancel`, {});
  }

  // customer.service.ts
submitClaim(UserPolicyId: string, incidentDate: string, description: string, amountClaimed: number): Observable<any> {
  return this.http.post(`http://localhost:5000/api/v1/claims`, {
    UserPolicyId,
    incidentDate,
    description,
    amountClaimed
  });
}

getMyClaims(): Observable<any> {
  return this.http.get(`http://localhost:5000/api/v1/claims`);
}


  // 9️⃣ Make payment for a purchased policy
  makePayment(userPolicyId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/policies/${userPolicyId}/pay`, { amount });
  }
}
