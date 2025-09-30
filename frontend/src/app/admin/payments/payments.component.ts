import { Component } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentService } from '../../services/payment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  imports: [FormsModule,CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class AdminPaymentsComponent {
   payments:Payment[]=[]
   constructor(public ps:PaymentService){}
   ngOnInit():void{
    this.ps.getPayments().subscribe((res:any)=>{
      this.payments=res.payments;
    });
   }
  
}
