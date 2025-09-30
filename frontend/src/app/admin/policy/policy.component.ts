import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy.service';
import { PolicyProduct } from '../../models/policyproduct';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet],
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  constructor(public policyService: PolicyService,public router:Router) {}

  policies: PolicyProduct[] = [];
  selectedPolicy: PolicyProduct | null = null;

  // form fields
  code: string = '';
  title: string = '';
  description: string = '';
  premium: number = 0;
  termMonths: number = 0;
  minSumInsured: number = 0;

  ngOnInit(): void {
    this.loadPolicies();
  }

  // Load all policies
  loadPolicies(): void {
    this.policyService.getPolicies().subscribe((res) => {
      this.policies = res.policies;   // ✅ FIX: unwrap policies array
    });
  }

  // Add a new policy
addPolicy(): void {
  this.policyService.addPolicy(
    this.code,
    this.title,
    this.description,
    this.premium,
    this.termMonths,
    this.minSumInsured
  ).subscribe(() => {
    this.loadPolicies();
    this.resetForm();
  });
}

// Update an existing policy
updatePolicy(): void {
  if (!this.selectedPolicy?._id) return;

  this.policyService.updatePolicy(
    this.selectedPolicy._id,
    this.code,
    this.title,
    this.description,
    this.premium,
    this.termMonths,
    this.minSumInsured
  ).subscribe(() => {
    this.loadPolicies();
    this.resetForm();
    this.selectedPolicy = null;
  });
}




  // Delete a policy
  deletePolicy(id: string): void {
    this.policyService.deletePolicy(id).subscribe(() => {
      this.loadPolicies();
    });
  }

  // Select a policy for editing
  selectPolicy(policy: PolicyProduct): void {
    this.selectedPolicy = policy;
    this.code = policy.code;
    this.title = policy.title;
    this.description = policy.description;
    this.premium = policy.premium;
    this.termMonths = policy.termMonths;
    this.minSumInsured = policy.minSumInsured;
  }

  admin(){
    this.router.navigate(['/admin'])
  }
  resetForm(): void {
    this.code = '';
    this.title = '';
    this.description = '';
    this.premium = 0;
    this.termMonths = 0;
    this.minSumInsured = 0;
    this.selectedPolicy = null;
  }
}
