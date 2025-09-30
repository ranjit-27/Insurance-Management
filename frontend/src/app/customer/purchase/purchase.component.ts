import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  imports: [FormsModule, CommonModule,RouterOutlet],
  standalone: true,
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  policyId!: string;
  premiumPaid: number = 0;
  nomineeName: string = '';
  nomineeRelation: string = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.policyId = this.route.snapshot.paramMap.get('id')!;
  }

  confirmPurchase() {
    if (!this.nomineeName || !this.nomineeRelation || !this.premiumPaid) {
      alert('Please fill all fields');
      return;
    }

    const purchaseData = {
      premiumPaid: this.premiumPaid,
      nominee: { name: this.nomineeName, relation: this.nomineeRelation }
    };

    this.customerService.purchasePolicy(this.policyId, purchaseData).subscribe({
      next: (res) => {
        alert(`Policy purchased successfully! Paid Premium: ₹${this.premiumPaid}`);
        this.router.navigate(['/customer']);
      },
      error: (err) => {
        console.error('Error purchasing policy', err);
        alert(err.error?.message || 'Error purchasing policy');
      }
    });
  }

  cancel() {
    this.router.navigate(['/customer']);
  }
}
