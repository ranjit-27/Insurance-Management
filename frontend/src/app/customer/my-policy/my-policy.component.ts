import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-policy',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './my-policy.component.html',
  styleUrls: ['./my-policy.component.css']
})
export class MyPolicyComponent implements OnInit {
  allPolicies: any[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPolicies();
  }

  fetchPolicies() {
    this.customerService.getMyPolicies().subscribe({
      next: (res) => {
        //console.log('Fetched my policies', res);
        this.allPolicies = res.policies;
      },
      error: (err) => console.error('Error fetching policies', err)
    });
  }

  purchasePolicy(id: string) {
    this.router.navigate(['/purchase', id]);
  }

  viewDetails(id: string) {
    this.router.navigate(['/policy', id]);
  }

  cancelPolicy(id: string) {
    if (confirm('Are you sure you want to cancel this policy?')) {
      this.customerService.cancelPolicy(id).subscribe({
        next: (res) => {
          alert('Policy cancelled successfully!');
          this.fetchPolicies(); // Refresh list
        },
        error: (err) => console.error('Error cancelling policy', err)
      });
    }
  }
  viewPolicyDetails(id: string): void {
    this.router.navigate(['/customer/userpolicy', id]);
  }

  claimPolicy(id:string): void {

    this.router.navigate([`/customer/my-policies/claims/${id}`]);
  }

  payPremium(id:string): void {
    this.router.navigate([`/customer/pay-premium/${id}`]);
  }
}
