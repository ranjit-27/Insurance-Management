import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http:HttpClient) { }

  makePayment(userId:string,userPolicyId:string,amount:number,method:string,reference:string): Promise<any> {
  
    return this.http.post('http://localhost:5000/api/v1/payments/payments', {userId,userPolicyId,amount,method,reference}).toPromise();
  }

  getPayments(){
    return this.http.get('http://localhost:5000/api/v1/payments/payments');
  }


}
