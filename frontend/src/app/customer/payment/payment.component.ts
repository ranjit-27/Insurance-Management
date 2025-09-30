import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
  newPayment = {
    userId: localStorage.getItem('userId'),        // will come from logged-in user (localStorage/session)
    userPolicyId: '',
    amount: 0,
    method: '',
    reference: ''
  };

  constructor(private ps: PaymentService,public activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    // Set userId from logged-in user
    this.newPayment.userPolicyId=this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.loadPayments();
  }

  loadPayments(): void {
    this.ps.getPayments().subscribe({
      next: (res: any) => {
        this.payments = res.payments || [];
      },
      error: (err) => console.error('Error fetching payments', err)
    });
  }

  makePayment(): void {
    if (!this.newPayment.userPolicyId || !this.newPayment.amount || !this.newPayment.method || !this.newPayment.reference) {
      alert('Please fill all fields');
      return;
    }

    this.ps.makePayment(
      this.newPayment.userId!,
      this.newPayment.userPolicyId,
      this.newPayment.amount,
      this.newPayment.method,
      this.newPayment.reference
    ).then((res) => {
      alert('Payment successful');
      this.loadPayments();
      this.newPayment.userPolicyId = '';
      this.newPayment.amount = 0;
      this.newPayment.method = '';
      this.newPayment.reference = '';
    }).catch((err) => {
      console.error('Payment error', err);
      alert('Payment failed');
    });
  }
}
