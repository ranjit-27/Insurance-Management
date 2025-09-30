import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allPolicies: any[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllPolicies();
  }

  loadAllPolicies() {
    this.customerService.getAllPolicies().subscribe({
      next: (res: any) => {
        this.allPolicies = res.policies;
      },
      error: (err) => console.error('Error fetching policies', err)
    });
  }

  viewDetails(policyId: string) {
    this.router.navigate([`/policy/${policyId}`]);
  }

  purchasePolicy(policyId: string) {
    this.router.navigate([`/purchase/${policyId}`]);
  }
}
