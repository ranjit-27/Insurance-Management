import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Api_Url="http://localhost:5000/api/v1/auth"
  constructor(public http:HttpClient) { }
  register({name,email,password,role}:any):Observable<any>{
    console.log(name,email,password,role);
    return this.http.post<User>(`${this.Api_Url}/register`,{name,email,password,role});
  }
  login({email,password}:any):Observable<any>{
    return this.http.post(`${this.Api_Url}/login`,{email,password});
  }

  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  role$ = this.roleSubject.asObservable();

  setRole(role: string | null) {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
    this.roleSubject.next(role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.getItem('role')
    this.setRole(null);
  }

}
