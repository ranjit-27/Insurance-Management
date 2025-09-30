import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Claim } from '../../models/claim';

@Component({
  selector: 'app-claims',
  imports: [FormsModule,CommonModule],
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class AdminClaimsComponent implements OnInit {
  claims: any[] = [];
  pendingClaims: any[] = [];
  selectedStatus: { [key: string]: string } = {}; // claimId -> selected status

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  // Load all claims
  loadClaims(): void {
    this.claimService.getAllClaims().subscribe({
      next: (res) => {
        this.claims = res.claims || [];
        this.pendingClaims = this.claims.filter(c => c.status === 'pending');
        // Initialize selectedStatus for pending claims
        this.pendingClaims.forEach(c => this.selectedStatus[c._id] = 'approved');
      },
      error: (err) => console.error(err)
    });
  }

  // Update status of a claim
  updateStatus(claimId: string): void {
    const status = this.selectedStatus[claimId];
    if (!status) return;

    this.claimService.updateClaimStatus(claimId, status).subscribe({
      next: () => {
        alert(`Claim ${claimId} updated to ${status}`);
        this.loadClaims(); // refresh
      },
      error: (err) => console.error(err)
    });
  }
}
