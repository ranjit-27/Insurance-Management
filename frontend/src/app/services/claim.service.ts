import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  // Get all claims
  getAllClaims(): Observable<any> {
    return this.http.get(`${this.baseUrl}/claims`);
  }

  // Update claim status
  updateClaimStatus(claimId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/claims/${claimId}/status`, { status });
  }
}
