import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private Api_Url = "http://localhost:5000/api/v1/admin";

  constructor(private http: HttpClient) {}

  // ✅ Add policy (send individual fields)
  addPolicy(code: string, title: string, description: string, premium: number, termMonths: number, minSumInsured: number): Observable<any> {
    console.log('Adding policy with data:', { code, title, description, premium, termMonths, minSumInsured });
    return this.http.post(`${this.Api_Url}/policy`, {
      code,
      title,
      description,
      premium,
      termMonths,
      minSumInsured
    });
  }

  // ✅ Get all policies
  getPolicies(): Observable<any> {
    return this.http.get(`${this.Api_Url}/policies`);
  }

  // ✅ Update policy
  updatePolicy(id: string, code: string, title: string, description: string, premium: number, termMonths: number, minSumInsured: number): Observable<any> {
    return this.http.patch(`${this.Api_Url}/policy/${id}`, {
      code,
      title,
      description,
      premium,
      termMonths,
      minSumInsured
    });
  }

  // ✅ Delete policy
  deletePolicy(id: string): Observable<any> {
    return this.http.delete(`${this.Api_Url}/policy/${id}`);
  }
}
