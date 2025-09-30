import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private baseUrl = 'http://localhost:5000/api/v1/admin'; // Change to your backend URL

  constructor(private http: HttpClient) { }

  /**
   * Get audit logs
   * @param limit Optional number of logs to fetch
   */
  getAuditLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/audit`);
  }


  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`);
  }
}
