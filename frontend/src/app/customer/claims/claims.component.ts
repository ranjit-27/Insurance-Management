import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../services/claim.service';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Claim } from '../../models/claim';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet],
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: Claim[] = [];
  policyId: string = '';
  newClaim: any = {
    policyId: '',
    claimAmount: '',
    reason: '',
    status: 'Pending'
  };

  constructor(
    private claimService: ClaimService,
    public cs: CustomerService,
    public activatedRoute: ActivatedRoute,
    public router:Router
  ) {}

  ngOnInit(): void {
    // Load existing claims
    this.loadClaims();

    // Capture policyId from route param
    this.activatedRoute.params.subscribe(params => {
      this.policyId = params['id'];
      if (this.policyId) {
        this.newClaim.policyId = this.policyId;
      }
    });
  }

  loadClaims(): void {
    this.cs.getMyClaims().subscribe({
      next: (data) =>{
        this.claims = data.claims
      },
    
      error: (err) => console.error('Error fetching claims', err),
    });
  }

  addClaim(): void {
  if (!this.newClaim.policyId || !this.newClaim.incidentDate || !this.newClaim.description || !this.newClaim.amountClaimed) {
    alert('Please fill all required fields');
    return;
  }

  this.cs.submitClaim(
    this.newClaim.policyId,       
    this.newClaim.incidentDate,    
    this.newClaim.description,     
    this.newClaim.amountClaimed    
  ).subscribe({
    next: () => {
      alert('Claim added successfully');
      this.newClaim = {
        policyId: this.policyId,
        incidentDate: '',
        description: '',
        amountClaimed: ''
      };
      this.loadClaims();
    },
    error: (err) => console.error('Error adding claim', err),
  });
}
 
back(){
 this.router.navigate(['/customer/my-policies']);
}

}
